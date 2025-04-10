import {
    DungeonGeneratorSettings,
    DungeonSize,
    DungeonContentType,
    DungeonTypeConfig
}
from '../settings/settings';
import {
    Room,
    SizeConfig,
    GeneratedDungeon,
    DungeonOptions,
    Direction,
    PathCoordinate,
    PotentialConnection,
    RoomShape,
    Door
}
from '../types';
import {
    SvgGenerator
}
from './svg';
import {
    GuideGenerator
}
from './guide';

export class DungeonGenerator {
    private settings: DungeonGeneratorSettings;
    private svgGenerator: SvgGenerator;
    private guideGenerator: GuideGenerator;

    constructor(settings: DungeonGeneratorSettings) {
        this.settings = settings;
        this.svgGenerator = new SvgGenerator(settings.mapStyle);
        this.guideGenerator = new GuideGenerator();
    }

    public generateDungeon(options: DungeonOptions): GeneratedDungeon {
        const dungeonType = this.settings.dungeonTypes[options.dungeonType];
        const sizeConfig = this.getSizeConfig(options.size);

        // Generate rooms
        const rooms: Room[] = [];
        let numRooms = sizeConfig.minRooms + Math.floor(Math.random() * (sizeConfig.maxRooms - sizeConfig.minRooms));

        // Ensure we have at least 3 rooms for a meaningful dungeon
        numRooms = Math.max(numRooms, 3);

        // Create initial grid-based layout with all walls
        const gridSize = sizeConfig.gridSize;
        const grid: boolean[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

        // Generate rooms with variable sizes
        this.generateVariableSizedRooms(rooms, grid, gridSize, numRooms, dungeonType, options.size);

        // Connect rooms with proper hallways
        this.connectRoomsWithHallways(rooms, grid, gridSize);

        // Place doors at appropriate locations (with limit of one door per wall)
        this.placeDoors(rooms, grid, gridSize);

        // Ensure corridors are 1x1
        this.enforceCorridorSize(grid, rooms, gridSize);

        // Post-process the grid to ensure hallways connect properly and remove dead ends
        this.cleanupGrid(grid, rooms, gridSize);

        // Generate SVG representation
        const svg = this.svgGenerator.generateSVG(rooms, grid, gridSize, sizeConfig.cellSize);

        // Generate DM guide
        const guide = this.guideGenerator.generateGuide(rooms, dungeonType.name);

        return {
            rooms: rooms,
            svg: svg,
            guide: guide
        };
    }

    private getSizeConfig(size: DungeonSize): SizeConfig {
        switch (size) {
        case 'Small':
            return {
                minRooms: 5,
                maxRooms: 8,
                gridSize: 24,
                cellSize: 20
            };
        case 'Medium':
            return {
                minRooms: 8,
                maxRooms: 12,
                gridSize: 32,
                cellSize: 16
            };
        case 'Large':
            return {
                minRooms: 12,
                maxRooms: 20,
                gridSize: 48,
                cellSize: 12
            };
        default:
            return {
                minRooms: 8,
                maxRooms: 12,
                gridSize: 32,
                cellSize: 16
            };
        }
    }

    /**
     * Generate rooms with variable sizes and different shapes
     */
    private generateVariableSizedRooms(
        rooms: Room[],
        grid: boolean[][],
        gridSize: number,
        numRooms: number,
        dungeonType: DungeonTypeConfig,
        size: DungeonSize): void {
        // Define possible room shapes and sizes
        const roomShapes: RoomShape[] = [{
                name: 'small-square',
                width: 2,
                height: 2,
                probability: 0.25
            }, {
                name: 'medium-square',
                width: 3,
                height: 3,
                probability: 0.2
            }, {
                name: 'large-square',
                width: 4,
                height: 4,
                probability: 0.1
            }, {
                name: 'small-rectangle-h',
                width: 3,
                height: 2,
                probability: 0.15
            }, {
                name: 'medium-rectangle-h',
                width: 4,
                height: 3,
                probability: 0.1
            }, {
                name: 'small-rectangle-v',
                width: 2,
                height: 3,
                probability: 0.15
            }, {
                name: 'medium-rectangle-v',
                width: 3,
                height: 4,
                probability: 0.05
            }
        ];

        // Add rooms with different shapes and sizes
        for (let i = 0; i < numRooms; i++) {
            // Try to place a room up to 50 attempts
            let attempts = 0;
            let placed = false;
            while (!placed && attempts < 50) {
                attempts++;

                // Select a random room shape based on probabilities
                const shape = this.selectRandomRoomShape(roomShapes);
                const width = shape.width;
                const height = shape.height;

                // Ensure padding from grid edges
                const maxX = gridSize - width - 3;
                const maxY = gridSize - height - 3;
                const minPadding = 3; // Minimum padding from edges

                // Pick a random position with padding from edges
                const x = Math.floor(Math.random() * (maxX - minPadding)) + minPadding;
                const y = Math.floor(Math.random() * (maxY - minPadding)) + minPadding;

                // Check if the entire room area + buffer is free
                if (this.isAreaFree(grid, x, y, width, height, 2)) {
                    // Mark the room area as occupied
                    for (let dy = 0; dy < height; dy++) {
                        for (let dx = 0; dx < width; dx++) {
                            grid[y + dy][x + dx] = true;
                        }
                    }

                    // Create the room
                    const room: Room = {
                        id: i + 1,
                        x: x,
                        y: y,
                        width: width,
                        height: height,
                        connections: [],
                        type: this.getRandomElement(dungeonType.possibleRooms),
                        content: '',
                        contentType: 'Empty',
                        shape: shape.name,
                        doors: [],
                        pathsTo: []
                    };

                    // Add room content based on probabilities
                    room.contentType = this.determineRoomContent(size);
                    room.content = this.getRoomContentByType(room.contentType, dungeonType);

                    // Ensure boss monsters and treasures are fairly distributed
                    if (room.contentType === 'Boss Monster' && rooms.some(r => r.contentType === 'Boss Monster')) {
                        // Don't allow too many boss monsters for small dungeons
                        if (numRooms < 8 || Math.random() < 0.7) {
                            room.contentType = 'Monster Mob';
                            room.content = this.getRandomElement(dungeonType.possibleMonsterMobs);
                        }
                    }

                    rooms.push(room);
                    placed = true;
                }
            }

            // If we couldn't place after 50 attempts, stop adding more rooms
            if (!placed) {
                break;
            }
        }
    }

    /**
     * Select a random room shape based on probabilities
     */
    private selectRandomRoomShape(shapes: RoomShape[]): RoomShape {
        // Calculate total probability
        const totalProb = shapes.reduce((sum, shape) => sum + shape.probability, 0);

        // Random value between 0 and total probability
        const rand = Math.random() * totalProb;

        // Find the selected shape
        let cumulativeProb = 0;
        for (const shape of shapes) {
            cumulativeProb += shape.probability;
            if (rand <= cumulativeProb) {
                return shape;
            }
        }

        // Fallback to first shape
        return shapes[0];
    }

    /**
     * Check if an area in the grid is free (including a buffer zone)
     */
    private isAreaFree(grid: boolean[][], x: number, y: number, width: number, height: number, buffer: number): boolean {
        // Check the area of the room plus a buffer zone around it
        for (let dy = -buffer; dy < height + buffer; dy++) {
            for (let dx = -buffer; dx < width + buffer; dx++) {
                const checkX = x + dx;
                const checkY = y + dy;

                // Skip checks outside the grid
                if (checkX < 0 || checkY < 0 || checkX >= grid[0].length || checkY >= grid.length) {
                    continue;
                }

                // If any cell is already occupied, the area is not free
                if (grid[checkY][checkX]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Connect rooms with proper hallways
     */
    private connectRoomsWithHallways(rooms: Room[], grid: boolean[][], gridSize: number): void {
        // Ensure we have rooms to connect
        if (rooms.length <= 1)
            return;

        // Create a minimum spanning tree to ensure all rooms are connected
        const connected = new Set < number > ([0]); // Start with the first room
        const unconnected = new Set < number > (rooms.map((_, i) => i).filter(i => i !== 0));

        // Connect all rooms
        while (unconnected.size > 0) {
            let bestDistance = Infinity;
            let bestConnectedRoom = -1;
            let bestUnconnectedRoom = -1;
            let bestPath: PathCoordinate[] = [];

            // Find the closest pair of rooms between connected and unconnected sets
            for (const connectedIdx of connected) {
                const connectedRoom = rooms[connectedIdx];

                for (const unconnectedIdx of unconnected) {
                    const unconnectedRoom = rooms[unconnectedIdx];

                    // Calculate the best path between these rooms
                    const path = this.findBestPath(connectedRoom, unconnectedRoom, grid, gridSize);

                    // Calculate the path length
                    const pathLength = path.length;

                    // If this is the shortest path so far, remember it
                    if (pathLength < bestDistance) {
                        bestDistance = pathLength;
                        bestConnectedRoom = connectedIdx;
                        bestUnconnectedRoom = unconnectedIdx;
                        bestPath = path;
                    }
                }
            }

            // Add the connection
            if (bestConnectedRoom !== -1 && bestUnconnectedRoom !== -1) {
                const room1 = rooms[bestConnectedRoom];
                const room2 = rooms[bestUnconnectedRoom];

                room1.connections.push(room2.id);
                room2.connections.push(room1.id);

                // Mark the path on the grid
                this.markPathOnGrid(bestPath, grid);

                // Store path information
                if (!room1.pathsTo)
                    room1.pathsTo = [];
                if (!room2.pathsTo)
                    room2.pathsTo = [];

                room1.pathsTo.push({
                    roomId: room2.id,
                    path: bestPath
                });

                room2.pathsTo.push({
                    roomId: room1.id,
                    path: [...bestPath].reverse() // Reverse for the other direction
                });

                // Update sets
                connected.add(bestUnconnectedRoom);
                unconnected.delete(bestUnconnectedRoom);
            }

            // Make sure all paths are marked on the grid
            rooms.forEach(room => {
                if (room.pathsTo) {
                    room.pathsTo.forEach(pathInfo => {
                        // Mark each coordinate in the path as a corridor
                        pathInfo.path.forEach(coord => {
                            // Ensure coordinate is within grid bounds
                            if (coord.x >= 0 && coord.x < gridSize &&
                                coord.y >= 0 && coord.y < gridSize) {
                                grid[coord.y][coord.x] = true;
                            }
                        });
                    });
                }
            });
        }

        // Add a few extra connections for loops (about 20% more connections)
        const extraConnections = Math.floor(rooms.length * 0.2) + 1;

        for (let i = 0; i < extraConnections; i++) {
            // Find two rooms that are close but not connected yet
            let bestDistance = Infinity;
            let bestRoom1 = -1;
            let bestRoom2 = -1;
            let bestPath: PathCoordinate[] = [];

            // Try all pairs of rooms
            for (let r1 = 0; r1 < rooms.length; r1++) {
                for (let r2 = r1 + 1; r2 < rooms.length; r2++) {
                    // Skip if already connected
                    if (rooms[r1].connections.includes(rooms[r2].id)) {
                        continue;
                    }

                    // Find the best path
                    const path = this.findBestPath(rooms[r1], rooms[r2], grid, gridSize);
                    const pathLength = path.length;

                    // If this is the shortest valid path so far, remember it
                    if (pathLength < bestDistance && pathLength < 15) { // Limit the distance for extra connections
                        bestDistance = pathLength;
                        bestRoom1 = r1;
                        bestRoom2 = r2;
                        bestPath = path;
                    }
                }
            }

            // If we found a good pair, connect them
            if (bestRoom1 !== -1 && bestRoom2 !== -1) {
                const room1 = rooms[bestRoom1];
                const room2 = rooms[bestRoom2];

                room1.connections.push(room2.id);
                room2.connections.push(room1.id);

                // Mark the path on the grid
                this.markPathOnGrid(bestPath, grid);

                // Store path information
                if (!room1.pathsTo)
                    room1.pathsTo = [];
                if (!room2.pathsTo)
                    room2.pathsTo = [];

                room1.pathsTo.push({
                    roomId: room2.id,
                    path: bestPath
                });

                room2.pathsTo.push({
                    roomId: room1.id,
                    path: [...bestPath].reverse() // Reverse for the other direction
                });
            }
        }
    }

    /**
     * Find the best path between two rooms
     */
    private findBestPath(room1: Room, room2: Room, grid: boolean[][], gridSize: number): PathCoordinate[]{
        // Find potential exit points from each room
        const exits1 = this.findPotentialExits(room1, grid, gridSize);
        const exits2 = this.findPotentialExits(room2, grid, gridSize);

        let bestPath: PathCoordinate[] = [];
        let bestDistance = Infinity;

        // Try all combinations of exits to find the shortest path
        for (const exit1 of exits1) {
            for (const exit2 of exits2) {
                // Generate a path from exit1 to exit2
                const path = this.generatePathBetweenPoints(exit1, exit2, grid, gridSize);

                // If this is the shortest path so far, remember it
                if (path.length < bestDistance) {
                    bestDistance = path.length;
                    bestPath = path;
                }
            }
        }

        return bestPath;
    }

    /**
     * Find potential exit points from a room
     */
    private findPotentialExits(room: Room, grid: boolean[][], gridSize: number): PathCoordinate[]{
        const exits: PathCoordinate[] = [];

        // Check all four sides of the room for potential exits

        // Top side
        for (let x = room.x; x < room.x + room.width; x++) {
            const y = room.y - 1;
            if (y >= 0 && !grid[y][x]) {
                exits.push({
                    x,
                    y,
                    isDoor: false
                });
            }
        }

        // Bottom side
        for (let x = room.x; x < room.x + room.width; x++) {
            const y = room.y + room.height;
            if (y < gridSize && !grid[y][x]) {
                exits.push({
                    x,
                    y,
                    isDoor: false
                });
            }
        }

        // Left side
        for (let y = room.y; y < room.y + room.height; y++) {
            const x = room.x - 1;
            if (x >= 0 && !grid[y][x]) {
                exits.push({
                    x,
                    y,
                    isDoor: false
                });
            }
        }

        // Right side
        for (let y = room.y; y < room.y + room.height; y++) {
            const x = room.x + room.width;
            if (x < gridSize && !grid[y][x]) {
                exits.push({
                    x,
                    y,
                    isDoor: false
                });
            }
        }

        // If no exits found, try corners as a fallback
        if (exits.length === 0) {
            // Top-left corner
            if (room.x > 0 && room.y > 0 && !grid[room.y - 1][room.x - 1]) {
                exits.push({
                    x: room.x - 1,
                    y: room.y - 1,
                    isDoor: false
                });
            }

            // Top-right corner
            if (room.x + room.width < gridSize && room.y > 0 && !grid[room.y - 1][room.x + room.width]) {
                exits.push({
                    x: room.x + room.width,
                    y: room.y - 1,
                    isDoor: false
                });
            }

            // Bottom-left corner
            if (room.x > 0 && room.y + room.height < gridSize && !grid[room.y + room.height][room.x - 1]) {
                exits.push({
                    x: room.x - 1,
                    y: room.y + room.height,
                    isDoor: false
                });
            }

            // Bottom-right corner
            if (room.x + room.width < gridSize && room.y + room.height < gridSize && !grid[room.y + room.height][room.x + room.width]) {
                exits.push({
                    x: room.x + room.width,
                    y: room.y + room.height,
                    isDoor: false
                });
            }
        }

        return exits;
    }

    /**
     * Generate a path between two points
     * Improved to ensure continuous corridors
     */
    private generatePathBetweenPoints(start: PathCoordinate, end: PathCoordinate, grid: boolean[][], gridSize: number): PathCoordinate[]{
        const path: PathCoordinate[] = [];

        // Always start with the start coordinate
        path.push({
            ...start,
            isDoor: false
        });

        // Decide whether to go horizontal first or vertical first (randomly)
        const goHorizontalFirst = Math.random() > 0.5;

        if (goHorizontalFirst) {
            // Go horizontal first
            let x = start.x;
            const stepX = x < end.x ? 1 : -1;
            while (x !== end.x) {
                x += stepX;
                if (x >= 0 && x < gridSize) {
                    path.push({
                        x,
                        y: start.y,
                        isDoor: false
                    });
                }
            }

            // Then go vertical
            let y = start.y;
            const stepY = y < end.y ? 1 : -1;
            while (y !== end.y) {
                y += stepY;
                if (y >= 0 && y < gridSize) {
                    path.push({
                        x: end.x,
                        y,
                        isDoor: false
                    });
                }
            }
        } else {
            // Go vertical first
            let y = start.y;
            const stepY = y < end.y ? 1 : -1;
            while (y !== end.y) {
                y += stepY;
                if (y >= 0 && y < gridSize) {
                    path.push({
                        x: start.x,
                        y,
                        isDoor: false
                    });
                }
            }

            // Then go horizontal
            let x = start.x;
            const stepX = x < end.x ? 1 : -1;
            while (x !== end.x) {
                x += stepX;
                if (x >= 0 && x < gridSize) {
                    path.push({
                        x,
                        y: end.y,
                        isDoor: false
                    });
                }
            }
        }

        // Add the end coordinate if not already in the path
        if (path.length === 0 || path[path.length - 1].x !== end.x || path[path.length - 1].y !== end.y) {
            path.push({
                ...end,
                isDoor: false
            });
        }

        return path;
    }

    /**
     * Mark a path on the grid
     */
    private markPathOnGrid(path: PathCoordinate[], grid: boolean[][]): void {
        path.forEach(coord => {
            if (coord.x >= 0 && coord.x < grid[0].length && coord.y >= 0 && coord.y < grid.length) {
                grid[coord.y][coord.x] = true;
            }
        });
    }

    /**
     * Place doors at appropriate hallway-room junctions, ensuring only one door per wall
     */
    private placeDoors(rooms: Room[], grid: boolean[][], gridSize: number): void {
        // First, clear any existing doors and ensure doors array is initialized
        rooms.forEach(room => {
            room.doors = [];
        });

        // For each room, examine all its sides to find corridor connections
        rooms.forEach(room => {
            // Ensure room.doors is initialized
            if (!room.doors) {
                room.doors = [];
            }

            // Store information about which walls already have doors
            const hasTopDoor = false;
            const hasBottomDoor = false;
            const hasLeftDoor = false;
            const hasRightDoor = false;

            // Track door placement on each wall
            const wallDoors = {
                top: false,
                bottom: false,
                left: false,
                right: false
            };

            // Find all possible door locations
            const possibleDoors: Door[] = [];

            // Check top side
            for (let x = room.x; x < room.x + room.width; x++) {
                const y = room.y - 1; // One cell above the room
                if (this.isValidDoorLocation(x, y, grid, gridSize)) {
                    possibleDoors.push({
                        x: x,
                        y: y,
                        isHorizontal: true,
                        connectsTo: this.findConnectedRoomId(x, y, room.id, rooms),
                        wall: 'top'
                    });
                }
            }

            // Check bottom side
            for (let x = room.x; x < room.x + room.width; x++) {
                const y = room.y + room.height; // One cell below the room
                if (this.isValidDoorLocation(x, y, grid, gridSize)) {
                    possibleDoors.push({
                        x: x,
                        y: y,
                        isHorizontal: true,
                        connectsTo: this.findConnectedRoomId(x, y, room.id, rooms),
                        wall: 'bottom'
                    });
                }
            }

            // Check left side
            for (let y = room.y; y < room.y + room.height; y++) {
                const x = room.x - 1; // One cell to the left of the room
                if (this.isValidDoorLocation(x, y, grid, gridSize)) {
                    possibleDoors.push({
                        x: x,
                        y: y,
                        isHorizontal: false,
                        connectsTo: this.findConnectedRoomId(x, y, room.id, rooms),
                        wall: 'left'
                    });
                }
            }

            // Check right side
            for (let y = room.y; y < room.y + room.height; y++) {
                const x = room.x + room.width; // One cell to the right of the room
                if (this.isValidDoorLocation(x, y, grid, gridSize)) {
                    possibleDoors.push({
                        x: x,
                        y: y,
                        isHorizontal: false,
                        connectsTo: this.findConnectedRoomId(x, y, room.id, rooms),
                        wall: 'right'
                    });
                }
            }

            // Choose one door per wall, preferring doors that connect to rooms
            // Try to ensure each connected room has a door

            // First, get all connected room IDs
            const connectedRoomIds = new Set(room.connections);
            const doorsByWall = {
                top: []as Door[],
                bottom: []as Door[],
                left: []as Door[],
                right: []as Door[]
            };

            // Group possible doors by wall
            possibleDoors.forEach(door => {
                if (door.wall) {
                    doorsByWall[door.wall].push(door);
                }
            });

            // Select one door per wall, preferring doors that connect to a room
            Object.keys(doorsByWall).forEach(wall => {
                const wallDoorOptions = doorsByWall[wall as keyof typeof doorsByWall];

                if (wallDoorOptions.length > 0) {
                    // First, try to find a door that connects to a room
                    const connectingDoors = wallDoorOptions.filter(d =>
                            connectedRoomIds.has(d.connectsTo));

                    if (connectingDoors.length > 0) {
                        // Prefer doors that connect to rooms
                        // Choose a random one among those that connect
                        const selectedDoor = this.getRandomElement(connectingDoors);
                        if (room.doors) {
                            room.doors.push(selectedDoor);
                        }
                        connectedRoomIds.delete(selectedDoor.connectsTo); // Mark this connection as handled
                    } else {
                        // No connecting door found, just choose a random one
                        const selectedDoor = this.getRandomElement(wallDoorOptions);
                        if (room.doors) {
                            room.doors.push(selectedDoor);
                        }
                    }
                }
            });

            // If there are still connected rooms without doors, try to add more doors
            // But still respect the one-door-per-wall limit
            if (connectedRoomIds.size > 0 && possibleDoors.length > (room.doors?.length || 0)) {
                const usedWalls = new Set(room.doors?.map(d => d.wall) || []);

                // Find doors to rooms that are still not connected
                for (const door of possibleDoors) {
                    if (connectedRoomIds.has(door.connectsTo) && door.wall && !usedWalls.has(door.wall)) {
                        if (room.doors) {
                            room.doors.push(door);
                        }
                        usedWalls.add(door.wall);
                        connectedRoomIds.delete(door.connectsTo);
                    }
                }
            }
        });
    }

    /**
     * Check if a location is valid for a door (corridor cell adjacent to a room)
     */
    private isValidDoorLocation(x: number, y: number, grid: boolean[][], gridSize: number): boolean {
        // Check if the point is within grid bounds
        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
            return false;
        }

        // A valid door location is a corridor (grid[y][x] is true)
        return grid[y][x];
    }

    /**
     * Find the ID of a room connected to a door location
     */
    private findConnectedRoomId(doorX: number, doorY: number, currentRoomId: number, rooms: Room[]): number {
        // Find the room that is closest to this door location and not the current room
        let closestRoom = null;
        let minDistance = Infinity;

        for (const room of rooms) {
            if (room.id === currentRoomId)
                continue;

            // Check if this door is on this room's perimeter
            const onPerimeter = this.isOnRoomPerimeter(doorX, doorY, room);

            if (onPerimeter) {
                return room.id;
            }

            // If not directly on perimeter, find the closest room
            const centerX = room.x + room.width / 2;
            const centerY = room.y + room.height / 2;
            const distance = Math.sqrt(Math.pow(doorX - centerX, 2) + Math.pow(doorY - centerY, 2));

            if (distance < minDistance) {
                minDistance = distance;
                closestRoom = room;
            }
        }

        return closestRoom ? closestRoom.id : 0;
    }

    /**
     * Check if a coordinate is on a room's perimeter
     */
    private isOnRoomPerimeter(x: number, y: number, room: Room): boolean {
        // Top edge
        if (y === room.y - 1 && x >= room.x && x < room.x + room.width) {
            return true;
        }

        // Bottom edge
        if (y === room.y + room.height && x >= room.x && x < room.x + room.width) {
            return true;
        }

        // Left edge
        if (x === room.x - 1 && y >= room.y && y < room.y + room.height) {
            return true;
        }

        // Right edge
        if (x === room.x + room.width && y >= room.y && y < room.y + room.height) {
            return true;
        }

        return false;
    }

    /**
     * Ensure corridors are 1x1 tiles by adding walls where needed
     */
    private enforceCorridorSize(grid: boolean[][], rooms: Room[], gridSize: number): void {
        // Build a map of room cells for quick lookup
        const roomCells = new Set < string > ();
        rooms.forEach(room => {
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    roomCells.add(`${x},${y}`);
                }
            }
        });

        // Mark door cells
        const doorCells = new Set < string > ();
        rooms.forEach(room => {
            if (!room.doors)
                return;
            room.doors.forEach(door => {
                doorCells.add(`${door.x},${door.y}`);
            });
        });

        // Function to check if a coordinate is in a room
        const isRoom = (x: number, y: number): boolean => {
            return roomCells.has(`${x},${y}`);
        };

        // Function to check if a coordinate is a door
        const isDoor = (x: number, y: number): boolean => {
            return doorCells.has(`${x},${y}`);
        };

        // Function to check if a coordinate is a corridor (not a room or wall)
        const isCorridor = (x: number, y: number): boolean => {
            if (x < 0 || y < 0 || x >= gridSize || y >= gridSize)
                return false;
            return grid[y][x] && !isRoom(x, y);
        };

        // First, identify horizontal corridors that are wider than 1 tile
        for (let y = 0; y < gridSize; y++) {
            let startX = -1;
            let corridorWidth = 0;

            for (let x = 0; x < gridSize; x++) {
                if (isCorridor(x, y)) {
                    if (startX === -1)
                        startX = x;
                    corridorWidth++;
                } else {
                    // End of corridor or hit a wall/room
                    if (corridorWidth > 1) {
                        // We have a wide corridor - add walls to make it 1 tile wide
                        // Keep only the middle section
                        const middleX = startX + Math.floor(corridorWidth / 2);

                        for (let i = startX; i < startX + corridorWidth; i++) {
                            if (i !== middleX && !isDoor(i, y)) {
                                grid[y][i] = false; // Convert to wall
                            }
                        }
                    }

                    // Reset for next corridor segment
                    startX = -1;
                    corridorWidth = 0;
                }
            }

            // Check for corridor at the end of the row
            if (corridorWidth > 1) {
                const middleX = startX + Math.floor(corridorWidth / 2);
                for (let i = startX; i < startX + corridorWidth; i++) {
                    if (i !== middleX && !isDoor(i, y)) {
                        grid[y][i] = false; // Convert to wall
                    }
                }
            }
        }

        // Then, identify vertical corridors that are taller than 1 tile
        for (let x = 0; x < gridSize; x++) {
            let startY = -1;
            let corridorHeight = 0;

            for (let y = 0; y < gridSize; y++) {
                if (isCorridor(x, y)) {
                    if (startY === -1)
                        startY = y;
                    corridorHeight++;
                } else {
                    // End of corridor or hit a wall/room
                    if (corridorHeight > 1) {
                        // We have a tall corridor - add walls to make it 1 tile tall
                        // Keep only the middle section
                        const middleY = startY + Math.floor(corridorHeight / 2);

                        for (let i = startY; i < startY + corridorHeight; i++) {
                            if (i !== middleY && !isDoor(x, i)) {
                                grid[i][x] = false; // Convert to wall
                            }
                        }
                    }

                    // Reset for next corridor segment
                    startY = -1;
                    corridorHeight = 0;
                }
            }

            // Check for corridor at the end of the column
            if (corridorHeight > 1) {
                const middleY = startY + Math.floor(corridorHeight / 2);
                for (let i = startY; i < startY + corridorHeight; i++) {
                    if (i !== middleY && !isDoor(x, i)) {
                        grid[i][x] = false; // Convert to wall
                    }
                }
            }
        }
    }

    /**
     * Clean up the grid to ensure hallways connect properly and remove dead ends
     */
    private cleanupGrid(grid: boolean[][], rooms: Room[], gridSize: number): void {
        // Collect all path and room coordinates
        const occupiedCells = new Set < string > ();

        // Mark room cells
        rooms.forEach(room => {
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    occupiedCells.add(`${x},${y}`);
                }
            }
        });

        // Mark path cells
        rooms.forEach(room => {
            if (room.pathsTo) {
                room.pathsTo.forEach(pathInfo => {
                    pathInfo.path.forEach(coord => {
                        const key = `${coord.x},${coord.y}`;
                        occupiedCells.add(key);
                    });
                });
            }
        });

        // Mark door cells
        rooms.forEach(room => {
            // Ensure room.doors is initialized
            if (!room.doors) {
                room.doors = [];
            } else {
                room.doors.forEach(door => {
                    const key = `${door.x},${door.y}`;
                    occupiedCells.add(key);
                });
            }
        });

        // Update grid based on occupied cells
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                grid[y][x] = occupiedCells.has(key);
            }
        }

        // Ensure doors have correct connections
        this.validateDoorConnections(rooms);
    }

    /**
     * Validate that doors have correct connection information
     */
    private validateDoorConnections(rooms: Room[]): void {
        // Create a map of room IDs to rooms for easier lookup
        const roomMap = new Map < number,
        Room > ();
        rooms.forEach(room => roomMap.set(room.id, room));

        // Check each room's doors
        rooms.forEach(room => {
            // Ensure room.doors is initialized
            if (!room.doors) {
                room.doors = [];
                return;
            }

            room.doors.forEach(door => {
                // If the target room doesn't exist, assign to the first other room
                if (!roomMap.has(door.connectsTo) || door.connectsTo === room.id) {
                    for (const otherRoom of rooms) {
                        if (otherRoom.id !== room.id) {
                            door.connectsTo = otherRoom.id;
                            break;
                        }
                    }
                }
            });
        });
    }

    /**
     * Get the room content type based on probabilities
     */
    private determineRoomContent(size: DungeonSize): DungeonContentType {
        // Probabilities for different content types
        const probabilityTable: Record < DungeonContentType,
        number >  = {
            'Empty': 15,
            'Trap': 10,
            'Minor Hazard': 15,
            'Solo Monster': 10,
            'NPC': 10,
            'Monster Mob': 15,
            'Major Hazard': 5,
            'Treasure': 15,
            'Boss Monster': size === 'Small' ? 5 : (size === 'Medium' ? 3 : 2) // Less common in bigger dungeons
        };

        // Convert to cumulative probabilities
        const contentTypes = Object.keys(probabilityTable)as DungeonContentType[];
        const probabilities = Object.values(probabilityTable);

        let sum = 0;
        const cumulativeProbabilities = probabilities.map(p => (sum += p));

        // Random roll
        const roll = Math.random() * sum;

        // Find the corresponding content type
        for (let i = 0; i < contentTypes.length; i++) {
            if (roll < cumulativeProbabilities[i]) {
                return contentTypes[i];
            }
        }

        return 'Empty';
    }

    /**
     * Get content description based on content type
     */
    private getRoomContentByType(contentType: DungeonContentType, dungeonType: DungeonTypeConfig): string {
        switch (contentType) {
        case 'Trap':
            return this.getRandomElement(dungeonType.possibleTraps);
        case 'Minor Hazard':
            return this.getRandomElement(dungeonType.possibleMinorHazards);
        case 'Solo Monster':
            return this.getRandomElement(dungeonType.possibleSoloMonsters);
        case 'NPC':
            return this.getRandomElement(dungeonType.possibleNPCs);
        case 'Monster Mob':
            return this.getRandomElement(dungeonType.possibleMonsterMobs);
        case 'Major Hazard':
            return this.getRandomElement(dungeonType.possibleMajorHazards);
        case 'Treasure':
            return this.getRandomElement(dungeonType.possibleTreasures);
        case 'Boss Monster':
            return this.getRandomElement(dungeonType.possibleBossMonsters);
        default:
            return 'Empty room';
        }
    }

    /**
     * Get a random element from an array
     */
    private getRandomElement < T > (array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
}
import { DungeonContentType, DungeonType, DungeonSize, DoorStyle } from './settings/settings';

// Room data structure
export interface Room {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    connections: number[];
    type: string;
    content: string;
    contentType: DungeonContentType;
    doors?: Door[];
    pathsTo?: PathInfo[];
    shape?: string; // Stores the shape type (e.g., 'small-square', 'medium-rectangle-h')
}

export interface RoomShape {
    name: string;
    width: number;
    height: number;
    probability: number;
}

// Door between rooms
export interface Door {
    x: number;
    y: number;
    isHorizontal: boolean;
    connectsTo: number;
    wall?: 'top' | 'bottom' | 'left' | 'right'; // Added wall property
}

// Path information between rooms
export interface PathInfo {
    roomId: number;
    path: PathCoordinate[];
}

// Coordinates for a path
export interface PathCoordinate {
    x: number;
    y: number;
    isDoor: boolean;
    isHorizontal?: boolean;
}

// Cell in the dungeon grid
export interface Cell {
    x: number;
    y: number;
    gridX: number;
    gridY: number;
    isWall: boolean;
    isRoom: boolean;
    roomId: number | null;
    roomType?: DungeonContentType;
    isDoor: boolean;
    isHorizontalDoor: boolean;
    isCorridorIntersection: boolean;
}

// Grid direction
export interface Direction {
    dx: number;
    dy: number;
}

// Size configuration for different dungeon sizes
export interface SizeConfig {
    minRooms: number;
    maxRooms: number;
    gridSize: number;
    cellSize: number;
}

// Generated dungeon result
export interface GeneratedDungeon {
    rooms: Room[];
    svg: string;
    guide: string;
}

// Options for dungeon generation
export interface DungeonOptions {
    dungeonType: DungeonType;
    size: DungeonSize;
}

// Potential connection between rooms
export interface PotentialConnection {
    room1: number;
    room2: number;
    distance: number;
}
import { DungeonContentType, MapStyle } from '../settings/settings';
import { Cell, Room, Door, PathCoordinate } from '../types';

export class SvgGenerator {
    private readonly mapStyle: MapStyle;

    constructor(mapStyle: MapStyle) {
        this.mapStyle = mapStyle;
    }

    public generateSVG(rooms: Room[], grid: boolean[][], gridSize: number, cellSize: number): string {
        const padding = 10;
        const svgWidth = gridSize * cellSize + padding * 2;
        const svgHeight = gridSize * cellSize + padding * 2;
        
        // Get colors from settings
        const wallColor = this.mapStyle?.wallColor || '#4a9ebd';
        const floorColor = this.mapStyle?.floorColor || '#ffffff';
        const corridorColor = this.mapStyle?.corridorColor || '#cccccc';
        const gridColor = this.mapStyle?.gridColor || '#dddddd';
        const textColor = this.mapStyle?.textColor || '#000000';
        const useColors = this.mapStyle?.useColors !== undefined ? this.mapStyle.useColors : true;
        const doorStyle = this.mapStyle?.doorStyle || 'line';
        
        // Create the SVG with a styled grid
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">`;
        
        // Add a background (dark background for dungeons)
        svg += `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="#000000" />`;
        
        // Create cell mappings for easier cell-type identification
        const cellTypes = this.createCellTypeMap(rooms, grid, gridSize);
        
        // Draw room floors with color coding
        if (useColors) {
            svg += `<g>`;
            rooms.forEach(room => {
                const roomColor = this.getRoomContentColor(room.contentType);
                // Draw the entire room area
                svg += `<rect x="${room.x * cellSize + padding}" y="${room.y * cellSize + padding}" 
                         width="${room.width * cellSize}" height="${room.height * cellSize}" 
                         fill="${roomColor}" />`;
            });
            svg += `</g>`;
        } else {
            // If not using color coding, just draw all rooms with floor color
            svg += `<g>`;
            rooms.forEach(room => {
                svg += `<rect x="${room.x * cellSize + padding}" y="${room.y * cellSize + padding}" 
                         width="${room.width * cellSize}" height="${room.height * cellSize}" 
                         fill="${floorColor}" />`;
            });
            svg += `</g>`;
        }
        
        // Draw corridors
        svg += `<g>`;
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                if (cellTypes[key] === 'corridor') {
                    svg += `<rect x="${x * cellSize + padding}" y="${y * cellSize + padding}" 
                             width="${cellSize}" height="${cellSize}" 
                             fill="${corridorColor}" />`;
                }
            }
        }
        svg += `</g>`;
        
        // Draw walls
        svg += `<g>`;
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                if (cellTypes[key] === 'wall') {
                    svg += `<rect x="${x * cellSize + padding}" y="${y * cellSize + padding}" 
                             width="${cellSize}" height="${cellSize}" 
                             fill="${wallColor}" />`;
                }
            }
        }
        svg += `</g>`;
        
        // Overlay doors
        // Draw door cells on top to ensure visibility
        if (doorStyle !== 'none') {
            svg += `<g>`;
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const key = `${x},${y}`;
                    if (cellTypes[key] === 'door') {
                        svg += `<rect x="${x * cellSize + padding}" y="${y * cellSize + padding}" 
                                 width="${cellSize}" height="${cellSize}" 
                                 fill="${corridorColor}" />`;
                    }
                }
            }
            svg += `</g>`;
        }
        
        // Draw door markers
        if (doorStyle !== 'none') {
            svg += `<g stroke="${wallColor}" stroke-width="2">`;
            rooms.forEach(room => {
                if (!room.doors) return;
                
                room.doors.forEach(door => {
                    // Draw door markers based on orientation
                    if (door.isHorizontal) {
                        // Horizontal door (on top/bottom of room)
                        const x = door.x * cellSize + padding;
                        // Place the line exactly at the boundary
                        const y = door.y < room.y ? 
                                 room.y * cellSize + padding :
                                 (room.y + room.height) * cellSize + padding;
                        
                        if (doorStyle === 'line') {
                            // Draw a line along the room edge
                            svg += `<line x1="${x}" y1="${y}" x2="${x + cellSize}" y2="${y}" stroke-width="3" />`;
                        } else if (doorStyle === 'gap') {
                            // Draw a gap (no visible marker, handled by the floorplan)
                        }
                    } else {
                        // Vertical door (on left/right of room)
                        const y = door.y * cellSize + padding;
                        // Place the line exactly at the boundary
                        const x = door.x < room.x ? 
                                 room.x * cellSize + padding :
                                 (room.x + room.width) * cellSize + padding;
                        
                        if (doorStyle === 'line') {
                            // Draw a line along the room edge
                            svg += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + cellSize}" stroke-width="3" />`;
                        } else if (doorStyle === 'gap') {
                            // Draw a gap (no visible marker, handled by the floorplan)
                        }
                    }
                });
            });
            svg += `</g>`;
        }
        
        // Draw grid lines if enabled
        if (this.mapStyle?.showGrid !== false) {
            svg += `<g stroke="${gridColor}" stroke-width="0.5">`;
            for (let i = 0; i <= gridSize; i++) {
                // Vertical lines
                svg += `<line x1="${i * cellSize + padding}" y1="${padding}" x2="${i * cellSize + padding}" y2="${svgHeight - padding}" />`;
                // Horizontal lines
                svg += `<line x1="${padding}" y1="${i * cellSize + padding}" x2="${svgWidth - padding}" y2="${i * cellSize + padding}" />`;
            }
            svg += `</g>`;
        }
        
        // Add room numbers
        svg += `<g font-family="Arial" font-size="${cellSize * 0.6}" text-anchor="middle" font-weight="bold" fill="${textColor}">`;
        rooms.forEach(room => {
            // Calculate center of the room
            const centerX = room.x * cellSize + (room.width * cellSize) / 2 + padding;
            const centerY = room.y * cellSize + (room.height * cellSize) / 2 + padding + 5; // Small offset for better centering
            svg += `<text x="${centerX}" y="${centerY}">${room.id}</text>`;
        });
        svg += `</g>`;
        
        // Close SVG
        svg += `</svg>`;
        
        return svg;
    }

    /**
     * Create a map of cell types for the entire grid
     * This helps determine what to draw at each position
     */
    private createCellTypeMap(rooms: Room[], grid: boolean[][], gridSize: number): Record<string, string> {
        const cellTypes: Record<string, 'room' | 'door' | 'corridor' | 'wall'> = {};
        
        // First mark all cells as walls initially
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                cellTypes[key] = 'wall';
            }
        }
        
        // Mark room cells
        rooms.forEach(room => {
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    const key = `${x},${y}`;
                    cellTypes[key] = 'room';
                }
            }
        });
        
        // Mark corridor cells
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const key = `${x},${y}`;
                // If it's not a room but is marked as true in the grid, it's a corridor
                if (cellTypes[key] !== 'room' && grid[y][x]) {
                    cellTypes[key] = 'corridor';
                }
            }
        }
        
        // Mark door cells
        rooms.forEach(room => {
            if (!room.doors) return;
            
            room.doors.forEach(door => {
                const key = `${door.x},${door.y}`;
                cellTypes[key] = 'door';
            });
        });
        
        return cellTypes;
    }

    private getRoomContentColor(contentType: DungeonContentType): string {
        // Return color based on content type for room highlighting
        switch (contentType) {
            case 'Empty': return '#ffffff'; // White
            case 'Trap': return '#ff9999';  // Light red
            case 'Minor Hazard': return '#ffcc99'; // Light orange
            case 'Solo Monster': return '#ffff99'; // Light yellow
            case 'NPC': return '#99ff99'; // Light green
            case 'Monster Mob': return '#99ccff'; // Light blue
            case 'Major Hazard': return '#ff99ff'; // Light purple
            case 'Treasure': return '#ffcc00'; // Gold
            case 'Boss Monster': return '#ff6666'; // Red
            default: return '#ffffff'; // White
        }
    }
}
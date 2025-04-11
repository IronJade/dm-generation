// Dungeon types
export type DungeonType = 'Cave' | 'Tomb' | 'Deep Tunnels' | 'Ruins';

// Dungeon sizes
export type DungeonSize = 'Small' | 'Medium' | 'Large';

// Door styles 
export type DoorStyle = 'line' | 'gap' | 'none';

// Content types that can appear in rooms
export type DungeonContentType = 
    'Empty' | 
    'Trap' | 
    'Minor Hazard' | 
    'Solo Monster' | 
    'NPC' | 
    'Monster Mob' | 
    'Major Hazard' | 
    'Treasure' | 
    'Boss Monster';

// Configuration for a dungeon type
export interface DungeonTypeConfig {
    name: string;
    possibleRooms: string[];
    possibleTraps: string[];
    possibleMinorHazards: string[];
    possibleSoloMonsters: string[];
    possibleNPCs: string[];
    possibleMonsterMobs: string[];
    possibleMajorHazards: string[];
    possibleTreasures: string[];
    possibleBossMonsters: string[];
}

// Map styling options
export interface MapStyle {
    wallColor: string;
    floorColor: string;
    corridorColor: string;
    gridColor: string;
    textColor: string;
    useColors: boolean;
    doorStyle: DoorStyle;
    showGrid?: boolean; // Optional flag to show/hide grid lines
}

// Create a default MapStyle configuration
export const DEFAULT_MAP_STYLE: MapStyle = {
    wallColor: '#4a9ebd',
    floorColor: '#ffffff',
    corridorColor: '#cccccc',
    gridColor: '#cccccc',
    textColor: '#000000',
    useColors: true,
    doorStyle: 'line',
    showGrid: true
};

// Plugin settings
export interface DungeonGeneratorSettings {
    dungeonTypes: Record<DungeonType, DungeonTypeConfig>;
    defaultDungeonType: DungeonType;
    mapStyle: MapStyle;
}
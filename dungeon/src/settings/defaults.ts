import { DungeonGeneratorSettings } from './settings';

export const DEFAULT_SETTINGS: DungeonGeneratorSettings = {
    dungeonTypes: {
        'Cave': {
            name: 'Cave',
            possibleRooms: ['Cavern', 'Grotto', 'Tunnel', 'Chamber', 'Pool', 'Crevasse', 'Stalagmite Forest'],
            possibleTraps: ['Pit Trap', 'Rock Fall', 'Poison Gas', 'Slippery Slope'],
            possibleMinorHazards: ['Slippery Ground', 'Low Ceiling', 'Unstable Floor'],
            possibleSoloMonsters: ['Cave Bear', 'Giant Bat', 'Slime', 'Troll'],
            possibleNPCs: ['Lost Miner', 'Hermit', 'Cultist', 'Refugee'],
            possibleMonsterMobs: ['Goblins', 'Kobolds', 'Giant Spiders', 'Bats'],
            possibleMajorHazards: ['Underground River', 'Lava Flow', 'Collapsing Ceiling'],
            possibleTreasures: ['Gem Vein', 'Ancient Cache', 'Forgotten Equipment', 'Crystal Formation'],
            possibleBossMonsters: ['Dragon', 'Giant', 'Chimera', 'Elder Slime']
        },
        'Tomb': {
            name: 'Tomb',
            possibleRooms: ['Crypt', 'Burial Chamber', 'Sarcophagus Room', 'Ceremonial Hall', 'Treasure Vault'],
            possibleTraps: ['Poison Dart', 'Swinging Blade', 'Collapsing Floor', 'Curse Tablet'],
            possibleMinorHazards: ['Cobwebs', 'Crumbling Stairs', 'Faded Inscriptions'],
            possibleSoloMonsters: ['Mummy', 'Skeleton Warrior', 'Cursed Statue', 'Ghost'],
            possibleNPCs: ['Archaeologist', 'Tomb Robber', 'Cursed Noble', 'Death Priest'],
            possibleMonsterMobs: ['Skeletons', 'Zombies', 'Scarabs', 'Animated Objects'],
            possibleMajorHazards: ['Soul-draining Mist', 'Time Loop', 'Magical Ward'],
            possibleTreasures: ['Royal Jewelry', 'Ancient Artifacts', 'Ceremonial Weapons', 'Burial Masks'],
            possibleBossMonsters: ['Lich', 'Mummy Lord', 'Death Knight', 'Ancient Guardian']
        },
        'Deep Tunnels': {
            name: 'Deep Tunnels',
            possibleRooms: ['Mine Shaft', 'Excavated Chamber', 'Natural Cavity', 'Crossroads', 'Storage Room'],
            possibleTraps: ['Mining Explosives', 'Elevator Malfunction', 'Flood Trap', 'Cave-in'],
            possibleMinorHazards: ['Poor Air Quality', 'Rickety Supports', 'Narrow Passage'],
            possibleSoloMonsters: ['Giant Worm', 'Rock Elemental', 'Deep One', 'Cave Fisher'],
            possibleNPCs: ['Lost Explorer', 'Mad Miner', 'Deep Cult Priest', 'Escaped Slave'],
            possibleMonsterMobs: ['Duergar', 'Troglodytes', 'Hook Horrors', 'Myconids'],
            possibleMajorHazards: ['Bottomless Chasm', 'Toxic Spore Cloud', 'Underground Lake'],
            possibleTreasures: ['Rare Minerals', 'Dwarven Artifact', 'Forgotten Cache', 'Ancient Technology'],
            possibleBossMonsters: ['Purple Worm', 'Stone Titan', 'Mind Flayer', 'Beholder']
        },
        'Ruins': {
            name: 'Ruins',
            possibleRooms: ['Collapsed Hall', 'Overgrown Chamber', 'Broken Tower', 'Former Library', 'Throne Room'],
            possibleTraps: ['Collapsing Wall', 'Hidden Pitfall', 'Ancient Magic Rune', 'Animated Statue'],
            possibleMinorHazards: ['Crumbling Floor', 'Overgrown Vegetation', 'Unstable Archway'],
            possibleSoloMonsters: ['Gargoyle', 'Animated Armor', 'Phase Spider', 'Wraith'],
            possibleNPCs: ['Historian', 'Treasure Hunter', 'Cultist Leader', 'Trapped Spirit'],
            possibleMonsterMobs: ['Bandits', 'Cultists', 'Animated Objects', 'Restless Dead'],
            possibleMajorHazards: ['Magical Anomaly', 'Reality Warp', 'Time Distortion'],
            possibleTreasures: ['Ancient Library', 'Royal Treasury', 'Magical Artifacts', 'Historical Records'],
            possibleBossMonsters: ['Ancient Construct', 'Forgotten Deity', 'Archmage Ghost', 'Demonic Entity']
        }
    },
    defaultDungeonType: 'Cave',
    mapStyle: {
        wallColor: '#4a9ebd',       // Blue wall color
        floorColor: '#ffffff',      // White floor color
        corridorColor: '#cccccc',   // Light gray for corridors
        gridColor: '#cccccc',       // Light gray grid lines
        textColor: '#000000',       // Black text for room numbers
        useColors: true,            // Whether to use color-coding for room content
        doorStyle: 'line'           // Could be 'line', 'gap', or 'none'
    }
};
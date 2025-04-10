import { Room } from '../types';

export class GuideGenerator {
    public generateGuide(rooms: Room[], dungeonType: string): string {
        let guide = `# ${dungeonType} Dungeon Master's Guide\n\n`;
        
        // Add a legend
        guide += `## Legend\n`;
        guide += `- White: Empty Room\n`;
        guide += `- Light Red: Trap\n`;
        guide += `- Light Orange: Minor Hazard\n`;
        guide += `- Light Yellow: Solo Monster\n`;
        guide += `- Light Green: NPC\n`;
        guide += `- Light Blue: Monster Mob\n`;
        guide += `- Light Purple: Major Hazard\n`;
        guide += `- Gold: Treasure\n`;
        guide += `- Red: Boss Monster\n\n`;
        
        guide += `## Room Details\n\n`;
        
        // Add details for each room
        rooms.sort((a, b) => a.id - b.id);
        
        for (const room of rooms) {
            guide += `### Room ${room.id}: ${room.type}\n`;
            guide += `**Content**: ${room.contentType} - ${room.content}\n`;
            guide += `**Connections**: Connects to rooms ${room.connections.join(', ')}\n\n`;
            
            // Add suggested descriptions based on room type and content
            guide += `**Suggested Description**: ${this.generateRoomDescription(room, dungeonType)}\n\n`;
        }
        
        return guide;
    }

    private generateRoomDescription(room: Room, dungeonType: string): string {
        const descriptions: Record<string, {base: string[]}> = {
            'Cave': {
                'base': [
                    "A damp cavern with stalactites hanging from the ceiling.",
                    "A narrow passage that opens into a wider space.",
                    "A rocky chamber with evidence of recent seismic activity.",
                    "A cave with luminescent fungi providing dim light."
                ],
            },
            'Tomb': {
                'base': [
                    "Ancient stone walls inscribed with forgotten symbols.",
                    "A burial chamber with ornate carvings depicting the deceased's life.",
                    "A dusty room with sarcophagi lining the walls.",
                    "A ceremonial space with faded murals depicting ancient rites."
                ],
            },
            'Deep Tunnels': {
                'base': [
                    "A mine shaft reinforced with aged wooden supports.",
                    "A tunnel that shows signs of both natural formation and artificial expansion.",
                    "An excavated chamber with abandoned mining equipment.",
                    "A dark passage with veins of unusual minerals in the walls."
                ],
            },
            'Ruins': {
                'base': [
                    "Crumbling stone walls partially reclaimed by nature.",
                    "A once-grand chamber now exposed to the elements.",
                    "The remains of what appears to have been an important structure.",
                    "Ancient architecture that has withstood the test of time, though barely."
                ],
            }
        };
        
        // Get base description for the dungeon type
        let baseDescriptions = descriptions[dungeonType]?.base || descriptions['Cave'].base;
        let baseDescription = this.getRandomElement(baseDescriptions);
        
        // Add content specific details
        let contentDescription = "";
        
        switch (room.contentType) {
            case 'Empty':
                contentDescription = "The room appears to be empty, though careful inspection might reveal subtle details or clues.";
                break;
            case 'Trap':
                contentDescription = `There's a ${room.content.toLowerCase()} here that might be triggered if adventurers aren't careful.`;
                break;
            case 'Minor Hazard':
                contentDescription = `Be wary of the ${room.content.toLowerCase()} that makes traversing this area more difficult.`;
                break;
            case 'Solo Monster':
                contentDescription = `A ${room.content.toLowerCase()} has made this place its lair.`;
                break;
            case 'NPC':
                contentDescription = `A ${room.content.toLowerCase()} can be found here, perhaps with information or a request.`;
                break;
            case 'Monster Mob':
                contentDescription = `A group of ${room.content.toLowerCase()} have claimed this area as their territory.`;
                break;
            case 'Major Hazard':
                contentDescription = `The ${room.content.toLowerCase()} presents a significant danger to anyone entering this area.`;
                break;
            case 'Treasure':
                contentDescription = `This area contains ${room.content.toLowerCase()} that might interest the adventurers.`;
                break;
            case 'Boss Monster':
                contentDescription = `Beware! A powerful ${room.content.toLowerCase()} awaits those who enter here.`;
                break;
            default:
                contentDescription = "The contents of this room are mysterious.";
        }
        
        return `${baseDescription} ${contentDescription}`;
    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
}
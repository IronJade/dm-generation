import { RandomGeneratorSettings } from './types';

// Default settings with pre-configured generators
export const DEFAULT_SETTINGS: RandomGeneratorSettings = {
    generators: [
        {
            name: "Tavern Generator",
            description: "Generates random tavern names and features",
            format: "{Beginning Name} {Ending Name}, known for {Known For}.",
            fields: {
                "Beginning Name": [
                    "The Rusty", "The Golden", "The Drunken", "The Silver", 
                    "The Laughing", "The Prancing", "The Dancing", "The Sleeping", 
                    "The Leaping", "The Broken", "The Wicked", "The Wayward",
                    "The Smiling", "The Crafty", "The Salty", "The Shining",
                    "The Howling", "The Wandering", "The Crimson", "The Gilded"
                ],
                "Ending Name": [
                    "Anchor", "Dragon", "Goblin", "Flagon", 
                    "Barrel", "Tankard", "Horse", "Pony", 
                    "Hound", "Knight", "Witch", "Sailor",
                    "Axe", "Sword", "Shield", "Crown",
                    "Piper", "Minstrel", "Cloak", "Lantern"
                ],
                "Known For": [
                    "its strong ale", "its mysterious patrons", "its rowdy brawls", "its magical drinks",
                    "its delicious stew", "its haunted cellar", "its beautiful barmaid", "its grumpy innkeeper",
                    "its secret meetings", "its exotic food", "its gambling tables", "its bardic competitions",
                    "its ancient history", "its unusual architecture", "its rare wines", "its monster trophies",
                    "its hidden treasure", "its enchanted fireplace", "its famous guests", "its storytelling nights"
                ]
            }
        },
        {
            name: "Fantasy Character Generator",
            description: "Generates random fantasy characters",
            format: "A {Personality} {Race} {Class} who was once a {Background}.",
            fields: {
                "Race": [
                    "Human", "Elf", "Dwarf", "Halfling", "Gnome",
                    "Half-Elf", "Half-Orc", "Tiefling", "Dragonborn", "Orc",
                    "Goblin", "Hobgoblin", "Lizardfolk", "Kenku", "Tabaxi",
                    "Firbolg", "Tortle", "Genasi", "Aasimar", "Changeling"
                ],
                "Class": [
                    "Fighter", "Wizard", "Cleric", "Rogue", "Bard",
                    "Barbarian", "Druid", "Monk", "Paladin", "Ranger",
                    "Sorcerer", "Warlock", "Artificer", "Blood Hunter", "Alchemist",
                    "Necromancer", "Knight", "Archer", "Summoner", "Assassin"
                ],
                "Background": [
                    "Noble", "Outlander", "Soldier", "Criminal", "Sage",
                    "Acolyte", "Entertainer", "Guild Artisan", "Hermit", "Sailor",
                    "Urchin", "Charlatan", "Folk Hero", "Merchant", "Knight",
                    "Pirate", "Gladiator", "Spy", "Scholar", "Explorer"
                ],
                "Personality": [
                    "Brave and reckless", "Cautious and methodical", "Arrogant and prideful", "Kind and generous",
                    "Sarcastic and witty", "Silent and brooding", "Cheerful and optimistic", "Cynical and pessimistic",
                    "Curious and inquisitive", "Loyal and honorable", "Greedy and selfish", "Wise and patient",
                    "Impulsive and emotional", "Calculating and cunning", "Eccentric and unpredictable", "Shy and reserved",
                    "Aggressive and confrontational", "Playful and mischievous", "Formal and proper", "Mysterious and secretive"
                ]
            }
        },
        {
            name: "Quest Generator",
            description: "Generates random quest hooks",
            format: "{Quest Giver} needs you to {Task} {Location}, {Complication}.",
            fields: {
                "Quest Giver": [
                    "A noble lord", "A shady merchant", "A desperate farmer", "A mysterious wizard",
                    "The town guard", "A crying child", "An elderly scholar", "A talking animal",
                    "A ghostly apparition", "A royal messenger", "A wounded soldier", "A traveling bard",
                    "A fortune teller", "A masked stranger", "A foreign diplomat", "A frightened innkeeper",
                    "A captured fairy", "A powerful oracle", "A village elder", "A drunken sailor"
                ],
                "Task": [
                    "retrieve a stolen artifact", "rescue a kidnapped person", "slay a dangerous monster", "investigate strange occurrences",
                    "deliver a secret message", "break a terrible curse", "find a lost treasure", "escort a valuable shipment",
                    "clear out a monster infestation", "negotiate a peace treaty", "sabotage an enemy operation", "win a competition",
                    "gather rare ingredients", "map an unexplored region", "solve an ancient puzzle", "stop a dark ritual",
                    "infiltrate a guarded location", "track down a fugitive", "protect a witness", "survive a deadly trial"
                ],
                "Location": [
                    "in a forgotten dungeon", "in a corrupt city", "in a haunted forest", "in the monster-infested wilderness",
                    "on a remote island", "in a foreign kingdom", "in the dangerous mountains", "in the scorching desert",
                    "in the frozen tundra", "in an ancient ruin", "in a wealthy estate", "in the lawless borderlands",
                    "in a magical academy", "in a sacred temple", "in the treacherous swamps", "in an underground network",
                    "in a floating fortress", "in a parallel dimension", "in a besieged settlement", "in a cursed valley"
                ],
                "Complication": [
                    "but it's all a trap", "but a rival group is also involved", "but the quest giver isn't telling the whole truth", "but there's a strict time limit",
                    "but supernatural forces are interfering", "but the weather is becoming dangerous", "but a traitor is working against you", "but the situation is morally complex",
                    "but the locals are hostile", "but the target is heavily guarded", "but the environment is hazardous", "but a curse is affecting the area",
                    "but magical anomalies distort reality there", "but a powerful enemy is watching", "but resources in the area are scarce", "but a disease is spreading",
                    "but political tensions complicate matters", "but the quest has unexpected cultural significance", "but an ancient prophecy is involved", "but nothing is as it first appears"
                ]
            }
        }
    ],
    customCSSEnabled: false,
    customCSSPath: ''
};

export const DEFAULT_CSS = `
/* Random Generator Plugin - Default Style with Enhanced Settings */
.random-generator-modal {
    padding: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
}

.random-generator-modal h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--background-modifier-border);
    color: var(--text-normal);
    font-size: 1.5rem;
    font-weight: 600;
}

.random-generator-modal h3 {
    margin-top: 1rem;
    margin-bottom: 0.75rem;
    color: var(--text-normal);
    font-size: 1.2rem;
    font-weight: 500;
}

.generator-select-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.generator-select-container span {
    font-weight: 500;
    margin-right: 0.75rem;
    color: var(--text-normal);
}

.generator-select {
    flex-grow: 1;
    background-color: var(--background-secondary);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s ease;
    width: 100%; /* Ensure full width */
    height: auto; /* Allow height to adjust to content */
    min-height: 2.5rem; /* Minimum height to prevent cut-off */
    text-overflow: ellipsis; /* Show ellipsis for overflow text */
}

.generator-select:hover {
    border-color: var(--interactive-accent);
}

.generator-select:focus {
    border-color: var(--interactive-accent);
    box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb), 0.2);
}

.generator-result-container {
    margin-bottom: 1.5rem;
}

.generator-result {
    background-color: var(--background-secondary);
    border: 1px solid var(--background-modifier-border);
    border-radius: 6px;
    padding: 1rem;
    min-height: 20rem; /* 5x taller than before (~4rem) */
    color: var(--text-normal);
    line-height: 1.5;
    font-size: 0.95rem;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s ease;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
}

.generator-result:hover {
    background-color: var(--background-secondary-alt);
}

.generator-button-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.generator-button-container button {
    background-color: var(--interactive-normal);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.generator-button-container button:hover {
    background-color: var(--interactive-hover);
}

.generator-button-container button:first-child {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
    border-color: var(--interactive-accent);
}

.generator-button-container button:first-child:hover {
    filter: brightness(1.1);
}

@keyframes highlight-result {
    0% {
        background-color: var(--interactive-accent);
        color: var(--text-on-accent);
    }
    100% {
        background-color: var(--background-secondary);
        color: var(--text-normal);
    }
}

.highlight-new-result {
    animation: highlight-result 1s ease;
}

/* Settings styles */
.field-settings {
    margin-left: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    border-left: 2px solid var(--background-modifier-border);
}

.field-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
}

.field-actions button {
    font-size: 0.8rem;
    padding: 2px 8px;
}

.generator-settings {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--background-modifier-border);
}
    
/* Improved Field Settings Styles */
.generator-settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--background-modifier-border);
}

.field-settings {
    display: grid;
    grid-template-columns: auto 1fr 200px;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
}

.field-settings label {
    color: var(--text-muted);
    text-align: right;
    white-space: nowrap;
}

.field-settings textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
    resize: vertical;
    font-family: inherit;
}

.field-settings textarea:focus {
    outline: 2px solid var(--interactive-accent);
    border-color: var(--interactive-accent);
}

.field-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.field-actions button {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.field-actions .rename-field-button {
    background-color: var(--background-secondary);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
}

.field-actions .delete-field-button {
    background-color: var(--text-accent);
    color: white;
    border: none;
}

.field-actions button:hover {
    filter: brightness(1.1);
}

.generator-settings .setting-name {
    font-weight: 600;
    color: var(--text-normal);
}

.generator-settings .setting-description {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

/* Styling for generator-level settings */
.generator-settings-header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
}

.generator-settings-header label {
    color: var(--text-muted);
    text-align: right;
    white-space: nowrap;
}

.generator-settings-header input,
.generator-settings-header textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
}

.generator-settings-header input:focus,
.generator-settings-header textarea:focus {
    outline: 2px solid var(--interactive-accent);
    border-color: var(--interactive-accent);
}

/* Buttons at the bottom of generator settings */
.generator-bottom-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.generator-bottom-actions button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.generator-duplicate-btn {
    background-color: var(--background-secondary);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
}

.generator-remove-btn {
    background-color: var(--text-accent);
    color: white;
    border: none;
}

.generator-bottom-actions button:hover {
    filter: brightness(1.1);
}

/* Styles for Add Generator Modal */
.add-generator-modal {
    max-width: 500px;
    width: 100%;
}

.add-generator-modal .modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.add-generator-modal .setting-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
    gap: 1rem;
}

.add-generator-modal .setting-row label {
    text-align: right;
    color: var(--text-muted);
}

.add-generator-modal .setting-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
}

.add-generator-modal .setting-control:focus {
    outline: 2px solid var(--interactive-accent);
    border-color: var(--interactive-accent);
}

.add-generator-modal .fields-section {
    border-top: 1px solid var(--background-modifier-border);
    padding-top: 1rem;
    margin-top: 1rem;
}

.add-generator-modal .field-row {
    display: grid;
    grid-template-columns: 150px 1fr 100px;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
}

.add-generator-modal .field-row input,
.add-generator-modal .field-row textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
}

.add-generator-modal .field-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.add-generator-modal .add-field-btn {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.add-generator-modal .add-field-btn:hover {
    filter: brightness(1.1);
}

.add-generator-modal .remove-field-btn {
    background-color: var(--text-accent);
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.add-generator-modal .remove-field-btn:hover {
    filter: brightness(1.1);
}

.add-generator-modal .modal-button-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.add-generator-modal .modal-button-container button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.add-generator-modal .create-btn {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
    border: none;
}

.add-generator-modal .cancel-btn {
    background-color: var(--background-secondary);
    color: var(--text-normal);
    border: 1px solid var(--background-modifier-border);
}

.add-generator-modal .create-btn:hover,
.add-generator-modal .cancel-btn:hover {
    filter: brightness(1.1);
}

/* Settings Tabs */
.nav-container {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--background-modifier-border);
}

.nav-container button {
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
    margin-right: 4px;
    transition: all 0.2s ease;
}

.nav-container button:hover {
    background-color: var(--background-modifier-hover);
}

/* Content container */
.content-container {
    max-height: 500px;
    overflow-y: auto;
    padding: 15px;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-primary);
}

/* Section headers */
.section-header h2 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.3em;
    color: var(--text-normal);
}

.section-header p {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text-muted);
    font-size: 0.9em;
}

/* Generator Cards */
.generators-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.generator-card {
    border: 1px solid var(--background-modifier-border);
    border-radius: 5px;
    padding: 15px;
    background-color: var(--background-secondary);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.generator-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.generator-header {
    border-bottom: 1px solid var(--background-modifier-border);
    padding-bottom: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.generator-header h3 {
    margin: 0;
    font-size: 1.1em;
}

.generator-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--background-modifier-border);
}

/* Modal Styling */
.modal-scroll-container {
    height: calc(80vh - 100px);
    overflow-y: auto;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
}

.fields-section {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid var(--background-modifier-border);
    width: 100%;
    box-sizing: border-box;
}

.field-container {
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid var(--background-modifier-border);
    border-radius: 5px;
    background-color: var(--background-primary-alt);
    width: 100%;
    box-sizing: border-box;
}

.field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
    padding: 15px 20px;
    border-top: 1px solid var(--background-modifier-border);
    background-color: var(--background-primary);
    position: sticky;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}

.button-container button {
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
}

.button-container button.mod-cta {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
    border: none;
}

/* Form Input Styling */
.setting-item {
    border-top: none !important;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
}

.setting-item input[type="text"],
.setting-item textarea {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
    box-sizing: border-box;
}

.setting-item textarea {
    min-height: 80px;
    font-family: inherit;
}

.setting-item input[type="text"]:focus,
.setting-item textarea:focus {
    border-color: var(--interactive-accent);
    box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb), 0.2);
}

/* Ensure text doesn't get cut off */
.setting-item-info {
    flex: 1 0 0; /* Allow this to grow but not shrink */
}

/* Form elements in modals */
.modal input[type="text"],
.modal textarea {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    background-color: var(--background-secondary);
    color: var(--text-normal);
    box-sizing: border-box;
}

.modal textarea {
    min-height: 80px;
    resize: vertical;
}

.modal input[type="text"]:focus,
.modal textarea:focus {
    border-color: var(--interactive-accent);
    box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb), 0.2);
    outline: none;
}

/* Fix for modal width */
.modal {
    max-width: 800px;
    width: auto !important;
}

.modal-content {
    padding: 0;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
}

/* Extra button styling */
.clickable-icon {
    padding: 4px;
    border-radius: 4px;
    color: var(--text-muted);
    transition: background-color 0.2s ease, color 0.2s ease;
}

.clickable-icon:hover {
    background-color: var(--background-modifier-hover);
    color: var(--text-normal);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
    .generators-container {
        grid-template-columns: 1fr;
    }
    
    .nav-container {
        flex-wrap: wrap;
    }
    
    .nav-container button {
        flex-grow: 1;
        text-align: center;
        margin-bottom: 5px;
    }
}`;
import { 
    App, 
    ButtonComponent,
    ExtraButtonComponent,
    PluginSettingTab, 
    Setting, 
    Modal,
    Notice
} from 'obsidian';

import DungeonGeneratorPlugin from '../main';
import { 
    DungeonType, 
    DungeonTypeConfig, 
    DEFAULT_MAP_STYLE,
    DungeonGeneratorSettings,
    DungeonContentType
} from './settings';

export class DungeonGeneratorSettingTab extends PluginSettingTab {
    private plugin: DungeonGeneratorPlugin;
    private activeTab: string = 'general';

    constructor(app: App, plugin: DungeonGeneratorPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        // Recreate the entire settings view
        const { containerEl } = this;
        containerEl.empty();

        // Title
        containerEl.createEl('h1', { text: 'Dungeon Generator Settings' });

        // Create navigation tabs
        const navContainer = containerEl.createDiv('nav-container');
        navContainer.style.display = 'flex';
        navContainer.style.marginBottom = '20px';
        navContainer.style.borderBottom = '1px solid var(--background-modifier-border)';

        const createTab = (id: string, label: string) => {
            const tab = navContainer.createEl('button', { text: label });
            tab.style.padding = '8px 16px';
            tab.style.border = 'none';
            tab.style.background = 'none';
            tab.style.cursor = 'pointer';
            tab.style.borderRadius = '4px 4px 0 0';
            tab.style.marginRight = '4px';

            if (id === this.activeTab) {
                tab.style.borderBottom = '2px solid var(--interactive-accent)';
                tab.style.fontWeight = 'bold';
                tab.style.color = 'var(--interactive-accent)';
            }

            tab.addEventListener('click', () => {
                this.activeTab = id;
                this.display();
            });

            return tab;
        };

        // Create the tabs
        createTab('general', 'General');
        createTab('map-style', 'Map Style');
        createTab('dungeon-types', 'Dungeon Types');
        createTab('color-legend', 'Color Legend');

        // Content container
        const contentContainer = containerEl.createDiv('content-container');
        contentContainer.style.maxHeight = '500px';
        contentContainer.style.overflowY = 'auto';
        contentContainer.style.padding = '10px';
        contentContainer.style.border = '1px solid var(--background-modifier-border)';
        contentContainer.style.borderRadius = '4px';

        // Display the active tab content
        switch (this.activeTab) {
            case 'general':
                this.addGeneralSettings(contentContainer);
                break;
            case 'map-style':
                this.addMapStyleSettings(contentContainer);
                break;
            case 'dungeon-types':
                this.addDungeonTypesSettings(contentContainer);
                break;
            case 'color-legend':
                this.addColorLegendSettings(contentContainer);
                break;
        }
    }

    /**
     * General settings tab content
     */
    private addGeneralSettings(containerEl: HTMLElement): void {
        containerEl.createEl('h2', { text: 'General Settings' });
        
        // Default dungeon type selection
        new Setting(containerEl)
            .setName('Default Dungeon Type')
            .setDesc('The default dungeon type when opening the generator')
            .addDropdown(dropdown => {
                const dungeonTypes = Object.keys(this.plugin.settings.dungeonTypes) as DungeonType[];
                
                dungeonTypes.forEach(type => {
                    dropdown.addOption(type, type);
                });
                
                dropdown.setValue(this.plugin.settings.defaultDungeonType);
                dropdown.onChange(async value => {
                    this.plugin.settings.defaultDungeonType = value as DungeonType;
                    await this.plugin.saveSettings();
                });
            });
            
        // Add a "Restore Default Data" button
        new Setting(containerEl)
            .setName("Restore Default Data")
            .setDesc("Restore all default dungeon types and content that may have been deleted.")
            .addButton((button) => {
                return button
                    .setButtonText("Restore Defaults")
                    .setCta()
                    .onClick(async() => {
                        await this.restoreDefaultData();
                    });
            });
    }

    /**
     * Map Style settings tab content
     */
    private addMapStyleSettings(containerEl: HTMLElement): void {
        containerEl.createEl('h2', { text: 'Map Style Settings' });
        containerEl.createEl('p', { 
            text: 'Customize the appearance of generated dungeon maps.',
            cls: 'setting-item-description'
        });
        
        // Wall color
        new Setting(containerEl)
            .setName('Wall Color')
            .setDesc('The color of walls and obstacles')
            .addText(text => {
                text.setPlaceholder('#4a9ebd')
                    .setValue(this.plugin.settings.mapStyle?.wallColor || '#4a9ebd')
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.wallColor = value;
                        await this.plugin.saveSettings();
                    });
                
                // Add a color picker if supported
                if (typeof text.inputEl.type === 'string') {
                    try {
                        text.inputEl.type = 'color';
                    } catch (e) {
                        // If browser doesn't support color input, keep as text
                    }
                }
            });
            
        // Floor color
        new Setting(containerEl)
            .setName('Floor Color')
            .setDesc('The color of open floor spaces')
            .addText(text => {
                text.setPlaceholder('#ffffff')
                    .setValue(this.plugin.settings.mapStyle?.floorColor || '#ffffff')
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.floorColor = value;
                        await this.plugin.saveSettings();
                    });
                
                // Add a color picker if supported
                if (typeof text.inputEl.type === 'string') {
                    try {
                        text.inputEl.type = 'color';
                    } catch (e) {
                        // If browser doesn't support color input, keep as text
                    }
                }
            });

        // Corridor color
        new Setting(containerEl)
            .setName('Corridor Color')
            .setDesc('The color of the corridors between rooms')
            .addText(text => {
                text.setPlaceholder('#cccccc')
                    .setValue(this.plugin.settings.mapStyle?.corridorColor || '#cccccc')
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.corridorColor = value;
                        await this.plugin.saveSettings();
                    });
                
                // Add a color picker if supported
                if (typeof text.inputEl.type === 'string') {
                    try {
                        text.inputEl.type = 'color';
                    } catch (e) {
                        // If browser doesn't support color input, keep as text
                    }
                }
            });        
            
        // Grid color
        new Setting(containerEl)
            .setName('Grid Color')
            .setDesc('The color of grid lines')
            .addText(text => {
                text.setPlaceholder('#cccccc')
                    .setValue(this.plugin.settings.mapStyle?.gridColor || '#cccccc')
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.gridColor = value;
                        await this.plugin.saveSettings();
                    });
                
                // Add a color picker if supported
                if (typeof text.inputEl.type === 'string') {
                    try {
                        text.inputEl.type = 'color';
                    } catch (e) {
                        // If browser doesn't support color input, keep as text
                    }
                }
            });
            
        // Text color
        new Setting(containerEl)
            .setName('Text Color')
            .setDesc('The color of room numbers and labels')
            .addText(text => {
                text.setPlaceholder('#000000')
                    .setValue(this.plugin.settings.mapStyle?.textColor || '#000000')
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.textColor = value;
                        await this.plugin.saveSettings();
                    });
                
                // Add a color picker if supported
                if (typeof text.inputEl.type === 'string') {
                    try {
                        text.inputEl.type = 'color';
                    } catch (e) {
                        // If browser doesn't support color input, keep as text
                    }
                }
            });
            
        // Use color-coding
        new Setting(containerEl)
            .setName('Use Color-Coding')
            .setDesc('Color-code rooms based on their content type')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.settings.mapStyle?.useColors !== undefined ? 
                               this.plugin.settings.mapStyle.useColors : true)
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.useColors = value;
                        await this.plugin.saveSettings();
                    });
            });
            
        // Door style
        new Setting(containerEl)
            .setName('Door Style')
            .setDesc('How to represent doors between rooms')
            .addDropdown(dropdown => {
                dropdown.addOption('line', 'Line');
                dropdown.addOption('gap', 'Gap');
                dropdown.addOption('none', 'None');
                
                dropdown.setValue(this.plugin.settings.mapStyle?.doorStyle || 'line');
                dropdown.onChange(async value => {
                    if (!this.plugin.settings.mapStyle) {
                        this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                    }
                    this.plugin.settings.mapStyle.doorStyle = value as 'line' | 'gap' | 'none';
                    await this.plugin.saveSettings();
                });
            });

        // Show/Hide Grid
        new Setting(containerEl)
            .setName('Show Grid')
            .setDesc('Toggle visibility of the grid lines on the dungeon map')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.settings.mapStyle?.showGrid !== false)
                    .onChange(async value => {
                        if (!this.plugin.settings.mapStyle) {
                            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
                        }
                        this.plugin.settings.mapStyle.showGrid = value;
                        await this.plugin.saveSettings();
                    });
            });
    }

    /**
     * Dungeon Types settings tab content
     */
    private addDungeonTypesSettings(containerEl: HTMLElement): void {
        const dungeonTypesSection = containerEl.createDiv('dungeon-types-section');

        // Section header with description
        const headerContainer = dungeonTypesSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'Dungeon Types' });
        headerContainer.createEl('p', { 
            text: 'Manage the available dungeon types and their content.',
            cls: 'setting-item-description'
        });

        // Add Dungeon Type Button
        new Setting(dungeonTypesSection)
            .setName('Add New Dungeon Type')
            .setDesc('Create a new dungeon type')
            .addButton((button: ButtonComponent): ButtonComponent => {
                return button
                    .setTooltip('Add Dungeon Type')
                    .setCta()
                    .setButtonText('+')
                    .onClick(() => this.openDungeonTypeModal());
            });

        // Existing Dungeon Types List
        const dungeonTypes = Object.keys(this.plugin.settings.dungeonTypes) as DungeonType[];
        
        if (dungeonTypes.length === 0) {
            dungeonTypesSection.createEl('p', {
                text: 'No dungeon types defined. Add one to get started.',
                attr: { style: 'font-style: italic; margin-top: 20px;' }
            });
        } else {
            // Create a collapsible list for dungeon types
            const typesContainer = dungeonTypesSection.createDiv('dungeon-types-container');
            typesContainer.style.marginTop = '15px';
            
            dungeonTypes.forEach(typeKey => {
                const dungeonType = this.plugin.settings.dungeonTypes[typeKey];
                
                const typeItem = typesContainer.createDiv('dungeon-type-item');
                typeItem.style.marginBottom = '10px';
                typeItem.style.border = '1px solid var(--background-modifier-border)';
                typeItem.style.borderRadius = '5px';
                typeItem.style.overflow = 'hidden';
                
                // Dungeon type header (always visible)
                const typeHeader = typeItem.createDiv('type-header');
                typeHeader.style.padding = '10px';
                typeHeader.style.backgroundColor = 'var(--background-secondary)';
                typeHeader.style.cursor = 'pointer';
                typeHeader.style.display = 'flex';
                typeHeader.style.justifyContent = 'space-between';
                typeHeader.style.alignItems = 'center';
                
                const typeTitle = typeHeader.createDiv('type-title');
                typeTitle.style.fontWeight = 'bold';
                typeTitle.textContent = dungeonType.name;
                
                const expandIcon = typeHeader.createDiv('expand-icon');
                expandIcon.textContent = '▼';
                expandIcon.style.marginLeft = '10px';
                
                // Dungeon type details (collapsible)
                const typeDetails = typeItem.createDiv('type-details');
                typeDetails.style.padding = '10px';
                typeDetails.style.borderTop = '1px solid var(--background-modifier-border)';
                typeDetails.style.display = 'none';
                
                // Create tabs for different content types
                const contentTabsContainer = typeDetails.createDiv('content-tabs');
                contentTabsContainer.style.display = 'flex';
                contentTabsContainer.style.flexWrap = 'wrap';
                contentTabsContainer.style.gap = '5px';
                contentTabsContainer.style.marginBottom = '10px';
                contentTabsContainer.style.borderBottom = '1px solid var(--background-modifier-border)';
                contentTabsContainer.style.paddingBottom = '5px';
                
                let activeContentTab = 'rooms';
                
                // Tab content container
                const contentTabContent = typeDetails.createDiv('content-tab-content');
                contentTabContent.style.padding = '10px 0';
                
                const showContentTab = (tabId: string) => {
                    activeContentTab = tabId;
                    
                    // Update tab buttons
                    const tabs = contentTabsContainer.querySelectorAll('button');
                    tabs.forEach(tab => {
                        if (tab.id === `tab-${tabId}`) {
                            tab.style.borderBottom = '2px solid var(--interactive-accent)';
                            tab.style.color = 'var(--interactive-accent)';
                            tab.style.fontWeight = 'bold';
                        } else {
                            tab.style.borderBottom = 'none';
                            tab.style.color = 'var(--text-normal)';
                            tab.style.fontWeight = 'normal';
                        }
                    });
                    
                    // Show correct content
                    contentTabContent.empty();
                    this.renderContentTypeList(contentTabContent, dungeonType, tabId as keyof DungeonTypeConfig, typeKey);
                };
                
                // Create content type tab buttons
                const createContentTab = (id: string, label: string) => {
                    const tab = contentTabsContainer.createEl('button', { 
                        text: label,
                        attr: { id: `tab-${id}` }
                    });
                    tab.style.padding = '5px 10px';
                    tab.style.border = 'none';
                    tab.style.borderRadius = '4px';
                    tab.style.background = 'var(--background-primary-alt)';
                    tab.style.cursor = 'pointer';
                    tab.style.fontSize = '0.85em';
                    
                    if (id === activeContentTab) {
                        tab.style.borderBottom = '2px solid var(--interactive-accent)';
                        tab.style.color = 'var(--interactive-accent)';
                        tab.style.fontWeight = 'bold';
                    }
                    
                    tab.addEventListener('click', () => {
                        showContentTab(id);
                    });
                };
                
                // Add content type tabs
                createContentTab('possibleRooms', 'Rooms');
                createContentTab('possibleTraps', 'Traps');
                createContentTab('possibleMinorHazards', 'Minor Hazards');
                createContentTab('possibleSoloMonsters', 'Solo Monsters');
                createContentTab('possibleNPCs', 'NPCs');
                createContentTab('possibleMonsterMobs', 'Monster Mobs');
                createContentTab('possibleMajorHazards', 'Major Hazards');
                createContentTab('possibleTreasures', 'Treasures');
                createContentTab('possibleBossMonsters', 'Boss Monsters');
                
                // Show initial content tab
                showContentTab('possibleRooms');
                
                // Dungeon type actions
                const typeActions = typeDetails.createDiv('type-actions');
                typeActions.style.display = 'flex';
                typeActions.style.justifyContent = 'flex-end';
                typeActions.style.marginTop = '10px';
                typeActions.style.borderTop = '1px solid var(--background-modifier-border)';
                typeActions.style.paddingTop = '10px';
                typeActions.style.gap = '5px';
                
                // Edit button
                new ExtraButtonComponent(typeActions.createDiv())
                    .setIcon('pencil')
                    .setTooltip('Edit Dungeon Type')
                    .onClick(() => {
                        this.openDungeonTypeModal(dungeonType, typeKey);
                    });
                
                // Delete button - no confirmation dialog
                new ExtraButtonComponent(typeActions.createDiv())
                    .setIcon('trash')
                    .setTooltip('Delete Dungeon Type')
                    .onClick(async() => {
                        // Direct deletion without confirmation
                        delete this.plugin.settings.dungeonTypes[typeKey];
                        await this.plugin.saveSettings();
                        this.display();
                    });
                
                // Toggle expansion on header click
                typeHeader.addEventListener('click', () => {
                    const expanded = typeDetails.style.display !== 'none';
                    typeDetails.style.display = expanded ? 'none' : 'block';
                    expandIcon.textContent = expanded ? '▼' : '▲';
                });
            });
        }
    }

    /**
     * Color Legend settings tab content
     */
    private addColorLegendSettings(containerEl: HTMLElement): void {
        containerEl.createEl('h2', { text: 'Room Color Legend' });
        containerEl.createEl('p', { 
            text: 'Preview the colors used for different room content types.',
            cls: 'setting-item-description'
        });
        
        const legendContainer = containerEl.createDiv('color-legend-container');
        legendContainer.style.display = 'grid';
        legendContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        legendContainer.style.gap = '15px';
        legendContainer.style.marginTop = '20px';
        
        // Define all room content types and their colors
        const contentTypes: Record<DungeonContentType, string> = {
            'Empty': '#ffffff',
            'Trap': '#ff9999',
            'Minor Hazard': '#ffcc99',
            'Solo Monster': '#ffff99',
            'NPC': '#99ff99',
            'Monster Mob': '#99ccff',
            'Major Hazard': '#ff99ff',
            'Treasure': '#ffcc00',
            'Boss Monster': '#ff6666'
        };
        
        // Create a color card for each content type
        Object.entries(contentTypes).forEach(([type, color]) => {
            const colorCard = legendContainer.createDiv('color-card');
            colorCard.style.border = '1px solid var(--background-modifier-border)';
            colorCard.style.borderRadius = '5px';
            colorCard.style.overflow = 'hidden';
            
            // Color swatch at top
            const colorSwatch = colorCard.createDiv('color-swatch');
            colorSwatch.style.height = '40px';
            colorSwatch.style.backgroundColor = color;
            colorSwatch.style.borderBottom = '1px solid var(--background-modifier-border)';
            
            // Type label
            const typeLabel = colorCard.createDiv('type-label');
            typeLabel.style.padding = '10px';
            typeLabel.style.textAlign = 'center';
            typeLabel.style.fontWeight = 'medium';
            typeLabel.textContent = type;
        });
    }
    
    /**
     * Render a list of content items for a dungeon type
     */
    private renderContentTypeList(
        container: HTMLElement, 
        dungeonType: DungeonTypeConfig, 
        propertyKey: keyof DungeonTypeConfig,
        dungeonTypeKey: string
    ): void {
        // Get the display name for the property
        let displayName = '';
        switch (propertyKey) {
            case 'possibleRooms': displayName = 'Room Types'; break;
            case 'possibleTraps': displayName = 'Traps'; break;
            case 'possibleMinorHazards': displayName = 'Minor Hazards'; break;
            case 'possibleSoloMonsters': displayName = 'Solo Monsters'; break;
            case 'possibleNPCs': displayName = 'NPCs'; break;
            case 'possibleMonsterMobs': displayName = 'Monster Mobs'; break;
            case 'possibleMajorHazards': displayName = 'Major Hazards'; break;
            case 'possibleTreasures': displayName = 'Treasures'; break;
            case 'possibleBossMonsters': displayName = 'Boss Monsters'; break;
            default: displayName = String(propertyKey);
        }
        
        // Header with add button
        const headerContainer = container.createDiv('content-header');
        headerContainer.style.display = 'flex';
        headerContainer.style.justifyContent = 'space-between';
        headerContainer.style.alignItems = 'center';
        headerContainer.style.marginBottom = '10px';
        
        headerContainer.createEl('h3', { 
            text: displayName,
            attr: { style: 'margin: 0; font-size: 1em;' }
        });
        
        const addItemButton = headerContainer.createEl('button', {
            text: 'Add Item',
            attr: { type: 'button' }
        });
        addItemButton.style.fontSize = '0.8em';
        addItemButton.style.padding = '2px 6px';
        
        addItemButton.addEventListener('click', () => {
            this.addContentItem(dungeonType, propertyKey, dungeonTypeKey);
        });
        
        // Items list
        const itemsList = container.createEl('ul');
        itemsList.style.margin = '0';
        itemsList.style.paddingLeft = '20px';
        
        const items = dungeonType[propertyKey] as string[];
        
        if (!items || items.length === 0) {
            container.createEl('p', {
                text: `No ${displayName.toLowerCase()} defined.`,
                attr: { style: 'color: var(--text-muted); font-style: italic; margin: 5px 0;' }
            });
        } else {
            items.forEach((item, index) => {
                const itemElement = itemsList.createEl('li');
                itemElement.style.marginBottom = '5px';
                itemElement.style.display = 'flex';
                itemElement.style.justifyContent = 'space-between';
                itemElement.style.alignItems = 'center';
                
                // Item name
                const itemText = itemElement.createSpan();
                itemText.textContent = item;
                
                // Action buttons
                const itemActions = itemElement.createDiv('item-actions');
                itemActions.style.display = 'flex';
                itemActions.style.gap = '5px';
                
                // Edit button
                new ExtraButtonComponent(itemActions.createDiv())
                    .setIcon('pencil')
                    .setTooltip('Edit')
                    .onClick(() => {
                        this.editContentItem(dungeonType, propertyKey, index, dungeonTypeKey);
                    });
                
                // Delete button
                new ExtraButtonComponent(itemActions.createDiv())
                    .setIcon('trash')
                    .setTooltip('Delete')
                    .onClick(async () => {
                        (dungeonType[propertyKey] as string[]).splice(index, 1);
                        await this.plugin.saveSettings();
                        
                        // Refresh just this content list
                        this.renderContentTypeList(container, dungeonType, propertyKey, dungeonTypeKey);
                    });
            });
        }
    }
    
    /**
     * Add a new content item to a dungeon type
     */
    private addContentItem(
        dungeonType: DungeonTypeConfig, 
        propertyKey: keyof DungeonTypeConfig,
        dungeonTypeKey: string
    ): void {
        // Get the display name for the property
        let itemType = '';
        switch (propertyKey) {
            case 'possibleRooms': itemType = 'Room Type'; break;
            case 'possibleTraps': itemType = 'Trap'; break;
            case 'possibleMinorHazards': itemType = 'Minor Hazard'; break;
            case 'possibleSoloMonsters': itemType = 'Solo Monster'; break;
            case 'possibleNPCs': itemType = 'NPC'; break;
            case 'possibleMonsterMobs': itemType = 'Monster Mob'; break;
            case 'possibleMajorHazards': itemType = 'Major Hazard'; break;
            case 'possibleTreasures': itemType = 'Treasure'; break;
            case 'possibleBossMonsters': itemType = 'Boss Monster'; break;
            default: itemType = 'Item';
        }
        
        const newValue = prompt(`Enter new ${itemType}:`);
        if (newValue && newValue.trim() !== '') {
            // Initialize the array if it doesn't exist
            if (!dungeonType[propertyKey]) {
                // Need to cast to any to avoid type error when assigning an empty array
                (dungeonType[propertyKey] as any) = [];
            }
            
            (dungeonType[propertyKey] as string[]).push(newValue.trim());
            this.plugin.saveSettings();
            
            // Refresh just the specific dungeon type section
            const contentTabContent = document.querySelector('.content-tab-content') as HTMLElement;
            if (contentTabContent) {
                contentTabContent.empty();
                this.renderContentTypeList(contentTabContent, dungeonType, propertyKey, dungeonTypeKey);
            } else {
                this.display();
            }
        }
    }
    
    /**
     * Edit an existing content item
     */
    private editContentItem(
        dungeonType: DungeonTypeConfig, 
        propertyKey: keyof DungeonTypeConfig,
        index: number,
        dungeonTypeKey: string
    ): void {
        const items = dungeonType[propertyKey] as string[];
        const currentValue = items[index];
        
        // Get the display name for the property
        let itemType = '';
        switch (propertyKey) {
            case 'possibleRooms': itemType = 'Room Type'; break;
            case 'possibleTraps': itemType = 'Trap'; break;
            case 'possibleMinorHazards': itemType = 'Minor Hazard'; break;
            case 'possibleSoloMonsters': itemType = 'Solo Monster'; break;
            case 'possibleNPCs': itemType = 'NPC'; break;
            case 'possibleMonsterMobs': itemType = 'Monster Mob'; break;
            case 'possibleMajorHazards': itemType = 'Major Hazard'; break;
            case 'possibleTreasures': itemType = 'Treasure'; break;
            case 'possibleBossMonsters': itemType = 'Boss Monster'; break;
            default: itemType = 'Item';
        }
        
        const updatedValue = prompt(`Edit ${itemType}:`, currentValue);
        if (updatedValue && updatedValue.trim() !== '') {
            items[index] = updatedValue.trim();
            this.plugin.saveSettings();
            
            // Refresh just the specific dungeon type section
            const contentTabContent = document.querySelector('.content-tab-content') as HTMLElement;
            if (contentTabContent) {
                contentTabContent.empty();
                this.renderContentTypeList(contentTabContent, dungeonType, propertyKey, dungeonTypeKey);
            } else {
                this.display();
            }
        }
    }
    
    /**
     * Open Dungeon Type Modal for Adding/Editing
     */
    private openDungeonTypeModal(existingType?: DungeonTypeConfig, typeKey?: string): void {
        const modal = new Modal(this.app);
        modal.titleEl.setText(existingType ? `Edit ${existingType.name} Dungeon Type` : 'Add New Dungeon Type');
        
        // Create a copy or initialize a new dungeon type
        let typeToEdit: DungeonTypeConfig = existingType ? JSON.parse(JSON.stringify(existingType)) : {
            name: '',
            possibleRooms: [],
            possibleTraps: [],
            possibleMinorHazards: [],
            possibleSoloMonsters: [],
            possibleNPCs: [],
            possibleMonsterMobs: [],
            possibleMajorHazards: [],
            possibleTreasures: [],
            possibleBossMonsters: []
        };
        
        // Type name
        new Setting(modal.contentEl)
            .setName('Dungeon Type Name')
            .setDesc('The name for this dungeon type (e.g., Cave, Tomb)')
            .addText(text => {
                text.setValue(typeToEdit.name || '')
                    .setPlaceholder('Enter dungeon type name')
                    .onChange(value => {
                        typeToEdit.name = value;
                    });
                
                // Set focus on the name field
                setTimeout(() => {
                    text.inputEl.focus();
                }, 50);
            });
        
        // Internal ID (only for editing, not for new types)
        if (typeKey) {
            new Setting(modal.contentEl)
                .setName('Internal ID')
                .setDesc('The internal identifier for this dungeon type (cannot be changed)')
                .addText(text => {
                    text.setValue(typeKey)
                        .setDisabled(true);
                });
        }
        
        // Save Button
        const footerEl = modal.contentEl.createDiv('button-container');
        footerEl.style.display = 'flex';
        footerEl.style.justifyContent = 'flex-end';
        footerEl.style.marginTop = '20px';
        footerEl.style.borderTop = '1px solid var(--background-modifier-border)';
        footerEl.style.paddingTop = '10px';
        footerEl.style.gap = '10px';
        
        const cancelButton = footerEl.createEl('button', { text: 'Cancel' });
        cancelButton.addEventListener('click', () => {
            modal.close();
        });
        
        const saveButton = footerEl.createEl('button', { 
            text: 'Save Dungeon Type',
            cls: 'mod-cta'
        });
        
        saveButton.addEventListener('click', async () => {
            // Validate name
            if (!typeToEdit.name || typeToEdit.name.trim() === '') {
                new Notice('Dungeon type name is required');
                return;
            }
            
            // For new dungeon types, generate a key
            let newTypeKey = typeKey;
            if (!newTypeKey) {
                // Create a key from the name (lowercase, no spaces)
                const generatedKey = typeToEdit.name
                    .replace(/\s+/g, '')
                    .replace(/[^a-zA-Z0-9]/g, '');
                
                // Make sure it's unique
                let counter = 0;
                let baseKey = generatedKey;
                newTypeKey = baseKey as DungeonType;
                
                // Check if key exists and generate a unique one if needed
                while (Object.prototype.hasOwnProperty.call(this.plugin.settings.dungeonTypes, newTypeKey)) {
                    counter++;
                    newTypeKey = `${baseKey}${counter}` as DungeonType;
                }
            }
            
            // Save the dungeon type with explicit type casting
            this.plugin.settings.dungeonTypes[newTypeKey as DungeonType] = typeToEdit;
            await this.plugin.saveSettings();
            
            // Close the modal and refresh the settings
            modal.close();
            this.display();
        });
        
        modal.open();
    }
    
    /**
     * Restore default dungeon types and content
     */
    private async restoreDefaultData(): Promise<void> {
        // Create a confirmation dialog
        const confirmModal = new Modal(this.app);
        confirmModal.titleEl.setText('Restore Defaults');
        
        confirmModal.contentEl.createEl('p', { 
            text: 'This will restore all default dungeon types and content. Any custom modifications to the default types will be overwritten, but your custom dungeon types will remain untouched. Continue?'
        });
        
        const buttonContainer = confirmModal.contentEl.createDiv('button-container');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.gap = '10px';
        
        const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
        cancelButton.addEventListener('click', () => {
            confirmModal.close();
        });
        
        const confirmButton = buttonContainer.createEl('button', { 
            text: 'Restore',
            cls: 'mod-warning'
        });
        
        confirmButton.addEventListener('click', async () => {
            // Import the default settings
            const { DEFAULT_SETTINGS } = await import('./defaults');
            
            // Update the dungeon types
            for (const typeKey in DEFAULT_SETTINGS.dungeonTypes) {
                this.plugin.settings.dungeonTypes[typeKey as DungeonType] = 
                    JSON.parse(JSON.stringify(DEFAULT_SETTINGS.dungeonTypes[typeKey as DungeonType]));
            }
            
            // Make sure the default map style is set
            this.plugin.settings.mapStyle = { ...DEFAULT_MAP_STYLE };
            
            // Make sure the default dungeon type is set
            this.plugin.settings.defaultDungeonType = DEFAULT_SETTINGS.defaultDungeonType;
            
            // Save settings
            await this.plugin.saveSettings();
            
            // Show confirmation
            new Notice('Default dungeon types and content have been restored!');
            
            // Close the confirmation modal and refresh the display
            confirmModal.close();
            this.display();
        });
        
        confirmModal.open();
    }

}
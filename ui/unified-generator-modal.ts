import { App, Modal } from 'obsidian';
import UnifiedGeneratorPlugin from '../main';
import { NPCGeneratorModal } from '../npc/ui/modal';
import { DungeonGeneratorModal } from '../dungeon/ui/modal';
import { GeneratorModal as RandomGeneratorModal } from '../random/generator-modal';

export type GeneratorType = 'npc' | 'dungeon' | 'random';

export class UnifiedGeneratorModal extends Modal {
    private plugin: UnifiedGeneratorPlugin;
    private activeTab: GeneratorType = 'npc';
    
    // Modal content elements
    private tabsContainer: HTMLElement;
    private contentContainer: HTMLElement;
    
    // Sub-modal instances
    private npcModal: NPCGeneratorModal;
    private dungeonModal: DungeonGeneratorModal;
    private randomModal: RandomGeneratorModal;

    constructor(app: App, plugin: UnifiedGeneratorPlugin, initialTab?: GeneratorType) {
        super(app);
        this.plugin = plugin;
        
        if (initialTab) {
            this.activeTab = initialTab;
        }
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('unified-generator-modal');
        
        // Make the modal wider
        contentEl.style.width = '100%';
        contentEl.style.maxWidth = '1280px';
        
        // Set modal title
        this.titleEl.setText('Unified Generator');
        
        // Create tabs container
        this.tabsContainer = contentEl.createDiv({ cls: 'generator-tabs' });
        this.tabsContainer.style.display = 'flex';
        this.tabsContainer.style.borderBottom = '1px solid var(--background-modifier-border)';
        this.tabsContainer.style.marginBottom = '15px';
        
        // Create content container for the active tab
        this.contentContainer = contentEl.createDiv({ cls: 'generator-content' });
        this.contentContainer.style.maxHeight = '1280px';
        this.contentContainer.style.overflow = 'auto';
        
        // Create tabs
        this.createTabs();
        
        // Initialize the sub-modals with our app and plugin
        this.npcModal = new NPCGeneratorModal(this.app, this.plugin);
        this.dungeonModal = new DungeonGeneratorModal(this.app, this.plugin);
        this.randomModal = new RandomGeneratorModal(this.app, this.plugin);
        
        // Show the active tab content
        this.showTabContent(this.activeTab);
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
    
    /**
     * Create the tab buttons
     */
    private createTabs(): void {
        const createTab = (id: GeneratorType, label: string) => {
            const tab = this.tabsContainer.createEl('button', { text: label });
            tab.style.flex = '1';
            tab.style.padding = '10px';
            tab.style.border = 'none';
            tab.style.backgroundColor = 'var(--background-secondary)';
            tab.style.cursor = 'pointer';
            
            if (id === this.activeTab) {
                tab.style.backgroundColor = 'var(--background-primary)';
                tab.style.borderBottom = '2px solid var(--interactive-accent)';
                tab.style.fontWeight = 'bold';
            }
            
            tab.addEventListener('click', () => {
                this.activeTab = id;
                
                // Update tab styling
                this.tabsContainer.querySelectorAll('button').forEach(button => {
                    button.style.backgroundColor = 'var(--background-secondary)';
                    button.style.borderBottom = 'none';
                    button.style.fontWeight = 'normal';
                });
                
                tab.style.backgroundColor = 'var(--background-primary)';
                tab.style.borderBottom = '2px solid var(--interactive-accent)';
                tab.style.fontWeight = 'bold';
                
                // Show the selected tab content
                this.showTabContent(id);
            });
            
            return tab;
        };
        
        createTab('npc', 'NPC Generator');
        createTab('dungeon', 'Dungeon Generator');
        createTab('random', 'Random Generator');
    }
    
    /**
     * Show the content for the selected tab
     */
    private showTabContent(tab: GeneratorType): void {
        // Clear the content container
        this.contentContainer.empty();
        
        // Add the appropriate content based on the selected tab
        switch (tab) {
            case 'npc':
                this.npcModal.renderContent(this.contentContainer);
                break;
                
            case 'dungeon':
                this.dungeonModal.renderContent(this.contentContainer);
                break;
                
            case 'random':
                this.randomModal.renderContent(this.contentContainer);
                break;
        }
    }
}
import { Modal, App, Notice, Setting, MarkdownView } from 'obsidian';
import UnifiedGeneratorPlugin from '../../main';
import { NPC, NPCGenerationOptions } from '../types';

export class NPCGeneratorModal extends Modal {
    private plugin: UnifiedGeneratorPlugin;
    private npc: NPC | null = null;

    constructor(app: App, plugin: UnifiedGeneratorPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        
        // Use the shared rendering method
        this.renderContent(contentEl);
    }

    /**
     * Render the modal content to a container
     * This allows the content to be rendered either in this modal
     * or in the unified generator modal
     */
    public renderContent(contentEl: HTMLElement) {
        // Clear any existing content
        contentEl.empty();
        
        // Apply modal styling
        contentEl.addClass('npc-generator-modal');
        
        // Create modal title with better styling
        const titleEl = contentEl.createEl('h2', {
            text: 'Generate NPC',
            cls: 'npc-generator-title'
        });
        titleEl.style.borderBottom = '1px solid var(--background-modifier-border)';
        titleEl.style.paddingBottom = '10px';
        titleEl.style.marginBottom = '20px';
        
        // Create generation options container with grid layout
        const optionsContainer = contentEl.createDiv('npc-generation-options');
        optionsContainer.style.display = 'grid';
        optionsContainer.style.gridTemplateColumns = '1fr 1fr';
        optionsContainer.style.gap = '12px';
        optionsContainer.style.marginBottom = '20px';
        
        // Level selection with better styling
        const levelContainer = this.createStyledInput(
            optionsContainer, 
            'Level', 
            'number', 
            '1', 
            { min: '1', max: '20' }
        );
        const levelInput = levelContainer.querySelector('input') as HTMLInputElement;
        
        // Race selection
        const raceContainer = this.createStyledSelect(
            optionsContainer, 
            'Race', 
            this.plugin.npcSettings.races.map(race => race.name)
        );
        const raceSelect = raceContainer.querySelector('select') as HTMLSelectElement;
        
        // Class selection
        const classContainer = this.createStyledSelect(
            optionsContainer, 
            'Class', 
            this.plugin.npcSettings.classes.map(characterClass => characterClass.name)
        );
        const classSelect = classContainer.querySelector('select') as HTMLSelectElement;
        
        // Subclass selection
        const subclassContainer = this.createStyledSelect(
            optionsContainer, 
            'Subclass',
            ['None'] // Default option
        );
        const subclassSelect = subclassContainer.querySelector('select') as HTMLSelectElement;
        
        // Update subclass options when class changes
        classSelect.addEventListener('change', () => {
            const selectedClass = this.plugin.npcSettings.classes.find(c => c.name === classSelect.value);
            
            // Clear existing options except "None"
            while (subclassSelect.options.length > 1) {
                subclassSelect.remove(1);
            }
            
            // Add subclass options if available
            if (selectedClass?.subclasses && selectedClass.subclasses.length > 0) {
                // Make the subclass container visible
                subclassContainer.style.display = 'block';
                
                // Add each subclass as an option
                selectedClass.subclasses.forEach(subclass => {
                    subclassSelect.add(new Option(subclass.name, subclass.name));
                });
            } else {
                // Hide the subclass container if no subclasses are available
                subclassContainer.style.display = 'none';
            }
        });
        
        // Trigger the change event to initialize subclass options
        classSelect.dispatchEvent(new Event('change'));
        
        // Custom parameters container with better styling
        const customParamsContainer = contentEl.createDiv('custom-parameters');
        customParamsContainer.style.marginTop = '20px';
        customParamsContainer.style.marginBottom = '20px';
        
        const customParamsTitle = customParamsContainer.createEl('h3', { text: 'Custom Parameters' });
        customParamsTitle.style.borderBottom = '1px solid var(--background-modifier-border)';
        customParamsTitle.style.paddingBottom = '8px';
        customParamsTitle.style.marginBottom = '12px';
        
        // Add custom parameter inputs based on plugin settings
        const enabledParams = this.plugin.npcSettings.customParameters.filter(p => p.enabled);
        
        if (enabledParams.length === 0) {
            customParamsContainer.createEl('p', { 
                text: 'No custom parameters enabled. Add parameters in plugin settings.',
                attr: { style: 'color: var(--text-muted); font-style: italic; text-align: center; padding: 10px 0;' }
            });
        } else {
            const customParamsGrid = customParamsContainer.createDiv('custom-params-grid');
            customParamsGrid.style.display = 'grid';
            customParamsGrid.style.gridTemplateColumns = '1fr 1fr';
            customParamsGrid.style.gap = '12px';
            
            enabledParams.forEach(param => {
                // Skip built-in parameters
                if (['spellcasting', 'possessions'].includes(param.name)) return;
                
                this.createStyledInput(
                    customParamsGrid, 
                    param.label, 
                    'text', 
                    '', 
                    { placeholder: `Enter ${param.label.toLowerCase()}` }
                );
            });
        }
        
        // Button container with better styling
        const buttonContainer = contentEl.createDiv('npc-generation-buttons');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.paddingTop = '15px';
        buttonContainer.style.borderTop = '1px solid var(--background-modifier-border)';
        
        // Generate NPC button
        const generateButton = buttonContainer.createEl('button', { 
            text: 'Generate NPC',
            cls: 'mod-cta'
        });
        generateButton.style.minWidth = '120px';
        
        generateButton.addEventListener('click', () => {
            // Prepare generation options
            const options: NPCGenerationOptions = {
                level: parseInt(levelInput.value, 10),
                race: raceSelect.value,
                class: classSelect.value,
                subclass: subclassSelect.value,
                customParameters: {}
            };
            
            // Generate NPC
            try {
                this.npc = this.plugin.npcGenerator.generateNPC(options);
                this.showResults(contentEl);
            } catch (error) {
                console.error('NPC Generation Error:', error);
                new Notice('Failed to generate NPC. Check console for details.');
            }
        });
        
        // Random NPC button
        const randomButton = buttonContainer.createEl('button', { text: 'Random NPC' });
        randomButton.style.minWidth = '120px';
        
        randomButton.addEventListener('click', () => {
            try {
                this.npc = this.plugin.npcGenerator.generateNPC();
                this.showResults(contentEl);
            } catch (error) {
                console.error('Random NPC Generation Error:', error);
                new Notice('Failed to generate random NPC. Check console for details.');
            }
        });
    }

    /**
     * Display generated NPC results
     */
    private showResults(contentEl: HTMLElement): void {
        if (!this.npc) return;
    
        contentEl.empty();
    
        // Create styled container
        const resultsContainer = contentEl.createDiv('npc-results-container');
        resultsContainer.style.padding = '0 10px';
    
        // NPC Title/Header with styling
        const headerContainer = resultsContainer.createDiv('npc-header');
        headerContainer.style.borderBottom = '2px solid var(--interactive-accent)';
        headerContainer.style.paddingBottom = '10px';
        headerContainer.style.marginBottom = '15px';
        
        const npcTitle = headerContainer.createEl('h2', { 
            text: this.npc.name,
            cls: 'npc-name'
        });
        npcTitle.style.margin = '0 0 5px 0';
        npcTitle.style.color = 'var(--text-accent)';
        
        const npcSubtitle = headerContainer.createEl('div', {
            text: `Level ${this.npc.level} ${this.npc.race} ${this.npc.class} • ${this.npc.alignment}`,
            cls: 'npc-subtitle'
        });
        npcSubtitle.style.fontSize = '1.1em';
        npcSubtitle.style.color = 'var(--text-muted)';
    
        // Ability Scores section with better styling
        const abilitiesContainer = resultsContainer.createDiv('npc-abilities');
        abilitiesContainer.style.marginBottom = '20px';
        
        const abilitiesTitle = abilitiesContainer.createEl('h3', { text: 'Ability Scores' });
        abilitiesTitle.style.marginBottom = '10px';
        abilitiesTitle.style.paddingBottom = '5px';
        abilitiesTitle.style.borderBottom = '1px solid var(--background-modifier-border)';
        
        const abilitiesGrid = abilitiesContainer.createDiv('abilities-grid');
        abilitiesGrid.style.display = 'grid';
        abilitiesGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
        abilitiesGrid.style.gap = '10px';
        abilitiesGrid.style.textAlign = 'center';
        
        const abilities = [
            { name: 'STR', key: 'str' },
            { name: 'DEX', key: 'dex' },
            { name: 'CON', key: 'con' },
            { name: 'INT', key: 'int' },
            { name: 'WIS', key: 'wis' },
            { name: 'CHA', key: 'cha' }
        ];
        
        abilities.forEach(ability => {
            const abilityBox = abilitiesGrid.createDiv('ability-box');
            abilityBox.style.padding = '8px';
            abilityBox.style.border = '1px solid var(--background-modifier-border)';
            abilityBox.style.borderRadius = '4px';
            abilityBox.style.backgroundColor = 'var(--background-secondary)';
            
            const abilityName = abilityBox.createDiv('ability-name');
            abilityName.style.fontWeight = 'bold';
            abilityName.style.marginBottom = '5px';
            abilityName.textContent = ability.name;
            
            const score = this.npc!.abilityScores[ability.key as keyof typeof this.npc.abilityScores];
            const modifier = this.npc!.abilityModifiers[ability.key as keyof typeof this.npc.abilityModifiers] || 0;
            
            const abilityScore = abilityBox.createDiv('ability-score');
            abilityScore.style.fontSize = '1.2em';
            abilityScore.textContent = score.toString();
            
            const abilityMod = abilityBox.createDiv('ability-mod');
            abilityMod.style.color = 'var(--text-accent)';
            abilityMod.textContent = `${modifier >= 0 ? '+' : ''}${modifier}`;
        });
    
        // Statblock with better styling
        const statblockContainer = resultsContainer.createDiv('npc-statblock');
        statblockContainer.style.marginBottom = '20px';
        
        const statblockTitle = statblockContainer.createEl('h3', { text: 'Statblock' });
        statblockTitle.style.marginBottom = '10px';
        statblockTitle.style.paddingBottom = '5px';
        statblockTitle.style.borderBottom = '1px solid var(--background-modifier-border)';
        
        const statblockText = statblockContainer.createEl('textarea', {
            text: this.plugin.npcGenerator.formatStatblock(this.npc)
        });
        statblockText.setAttribute('readonly', 'true');
        statblockText.style.width = '100%';
        statblockText.style.height = '300px';
        statblockText.style.padding = '10px';
        statblockText.style.fontFamily = 'var(--font-monospace)';
        statblockText.style.fontSize = '0.9em';
        statblockText.style.backgroundColor = 'var(--background-secondary)';
        statblockText.style.border = '1px solid var(--background-modifier-border)';
        statblockText.style.borderRadius = '4px';
        statblockText.style.resize = 'vertical';
    
        // Button container
        const buttonContainer = resultsContainer.createDiv('npc-action-buttons');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.paddingTop = '15px';
        buttonContainer.style.borderTop = '1px solid var(--background-modifier-border)';
    
        // Refresh NPC button
        const refreshButton = buttonContainer.createEl('button', { text: 'Refresh NPC' });
        refreshButton.style.minWidth = '80px';
        refreshButton.addEventListener('click', () => {
            // Get the same options but generate a new NPC
            const options = {
                level: this.npc!.level,
                race: this.npc!.race,
                class: this.npc!.class,
                subclass: this.npc!.subclass,
                alignment: this.npc!.alignment
            };
            
            this.npc = this.plugin.npcGenerator.generateNPC(options);
            this.showResults(contentEl);
        });

        // Regenerate NPC button
        const regenerateButton = buttonContainer.createEl('button', { text: 'Random NPC' });
        regenerateButton.style.minWidth = '80px';
        regenerateButton.addEventListener('click', () => {
            // Generate a completely random new NPC with no specific options
            this.npc = this.plugin.npcGenerator.generateNPC();
            this.showResults(contentEl);
        });
    
        // Insert into Note button
        const insertButton = buttonContainer.createEl('button', { 
            text: 'Insert into Current Note',
            cls: 'mod-cta'
        });
        insertButton.style.minWidth = '140px';
        insertButton.addEventListener('click', this.insertStatblockIntoNote.bind(this));
    
        // Back button
        const backButton = buttonContainer.createEl('button', { text: 'Generate Another NPC' });
        backButton.style.minWidth = '120px';
        backButton.addEventListener('click', () => {
            // Back to the generator form
            this.renderContent(contentEl);
        });
    }

    /**
     * Insert statblock into the current active note
     */
    private insertStatblockIntoNote(): void {
        if (!this.npc) return;

        try {
            // Get active file
            const activeFile = this.app.workspace.getActiveFile();
            if (!activeFile) {
                throw new Error('No active file');
            }

            // Get active editor
            const activeEditor = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!activeEditor) {
                throw new Error('No active editor');
            }

            // Insert statblock
            const editor = activeEditor.editor;
            editor.replaceSelection(this.plugin.npcGenerator.formatStatblock(this.npc));

            // Close modal and show success notice
            this.close();
            new Notice('NPC statblock inserted!');
        } catch (error) {
            console.error('Insert Statblock Error:', error);
            new Notice('Failed to insert statblock. Please ensure a note is open.');
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
    
    /**
     * Create a styled input element
     */
    private createStyledInput(
        container: HTMLElement, 
        label: string, 
        type: string, 
        defaultValue: string = '', 
        additionalAttributes: Record<string, string> = {}
    ): HTMLDivElement {
        const inputContainer = container.createDiv('labeled-input');
        inputContainer.style.display = 'flex';
        inputContainer.style.flexDirection = 'column';
        
        const labelEl = inputContainer.createEl('label', { text: label });
        labelEl.style.fontWeight = 'bold';
        labelEl.style.marginBottom = '4px';
        
        const input = inputContainer.createEl('input', {
            type,
            value: defaultValue,
            ...additionalAttributes
        });
        input.style.backgroundColor = 'var(--background-primary)';
        input.style.border = '1px solid var(--background-modifier-border)';
        input.style.borderRadius = '4px';
        input.style.padding = '6px 8px';
        
        return inputContainer;
    }
    
    /**
     * Create a styled select element
     */
    private createStyledSelect(
        container: HTMLElement, 
        label: string, 
        options: string[]
    ): HTMLDivElement {
        const selectContainer = container.createDiv('labeled-select');
        selectContainer.style.display = 'flex';
        selectContainer.style.flexDirection = 'column';
        
        const labelEl = selectContainer.createEl('label', { text: label });
        labelEl.style.fontWeight = 'bold';
        labelEl.style.marginBottom = '4px';
        
        const select = selectContainer.createEl('select');
        select.style.backgroundColor = 'var(--background-primary)';
        select.style.border = '1px solid var(--background-modifier-border)';
        select.style.borderRadius = '4px';
        select.style.padding = '6px 8px';
        
        options.forEach(option => {
            select.createEl('option', { 
                text: option, 
                value: option 
            });
        });
        
        return selectContainer;
    }
}
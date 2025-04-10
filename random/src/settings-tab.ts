import { App, PluginSettingTab, Setting, Notice, Modal, ButtonComponent, ExtraButtonComponent } from 'obsidian';
import { RandomGeneratorPlugin } from './plugin';
import { Generator } from './types';
import { duplicateGenerator, validateGenerator } from './utils/generator';
import { AddGeneratorModal } from './add-generator-modal';

/**
 * Settings tab for the Random Generator plugin
 */
export class RandomGeneratorSettingTab extends PluginSettingTab {
    private plugin: RandomGeneratorPlugin;
    private activeTab: string = 'general';

    constructor(app: App, plugin: RandomGeneratorPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        // Clear the container to rebuild the settings UI
        const { containerEl } = this;
        containerEl.empty();

        // Title
        containerEl.createEl('h1', { text: 'Random Generator Settings' });

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
        createTab('generators', 'Generators');
        createTab('appearance', 'Appearance');
        createTab('import-export', 'Import/Export');

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
                this.displayGeneralSettings(contentContainer);
                break;
            case 'generators':
                this.displayGeneratorsSettings(contentContainer);
                break;
            case 'appearance':
                this.displayAppearanceSettings(contentContainer);
                break;
            case 'import-export':
                this.displayImportExportSettings(contentContainer);
                break;
        }
    }

    /**
     * Display General Settings Tab
     */
    private displayGeneralSettings(containerEl: HTMLElement): void {
        const generalSection = containerEl.createDiv('general-section');

        // Section header with description
        const headerContainer = generalSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'General Settings' });
        headerContainer.createEl('p', { 
            text: 'Configure general settings for the Random Generator plugin.',
            cls: 'setting-item-description' 
        });

        // Restore defaults button
        new Setting(generalSection)
            .setName('Restore Default Generators')
            .setDesc('Reset to the default generators that come with the plugin.')
            .addButton((button: ButtonComponent): ButtonComponent => {
                return button
                    .setTooltip('Restore Defaults')
                    .setCta()
                    .setButtonText('Restore Defaults')
                    .onClick(async () => {
                        this.restoreDefaultGenerators();
                    });
            });
    }

    /**
     * Display Generators Settings Tab
     */
    private displayGeneratorsSettings(containerEl: HTMLElement): void {
        const generatorsSection = containerEl.createDiv('generators-section');

        // Section header with description
        const headerContainer = generatorsSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'Generators' });
        headerContainer.createEl('p', {
            text: 'Manage the available random content generators.',
            cls: 'setting-item-description'
        });

        // Add Generator Button
        new Setting(generatorsSection)
            .setName('Add New Generator')
            .setDesc('Create a new generator for random content')
            .addButton((button: ButtonComponent): ButtonComponent => {
                return button
                    .setTooltip('Add Generator')
                    .setCta()
                    .setButtonText('+')
                    .onClick(() => this.openGeneratorModal());
            });

        // Generator cards container with grid layout
        const generatorsContainer = generatorsSection.createDiv('generators-container');
        generatorsContainer.style.display = 'grid';
        generatorsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        generatorsContainer.style.gap = '15px';
        generatorsContainer.style.marginTop = '20px';

        // Display existing generators as cards
        this.plugin.settings.generators.forEach((generator, index) => {
            const generatorCard = generatorsContainer.createDiv('generator-card');
            generatorCard.style.border = '1px solid var(--background-modifier-border)';
            generatorCard.style.borderRadius = '5px';
            generatorCard.style.padding = '15px';
            generatorCard.style.backgroundColor = 'var(--background-secondary)';

            const generatorHeader = generatorCard.createDiv('generator-header');
            generatorHeader.style.borderBottom = '1px solid var(--background-modifier-border)';
            generatorHeader.style.paddingBottom = '8px';
            generatorHeader.style.marginBottom = '10px';
            generatorHeader.style.display = 'flex';
            generatorHeader.style.justifyContent = 'space-between';
            generatorHeader.style.alignItems = 'center';

            // Generator name and description
            const titleSection = generatorHeader.createDiv('title-section');
            titleSection.createEl('h3', {
                text: generator.name,
                attr: { style: 'margin: 0; font-size: 1.1em;' }
            });

            const descElement = generatorCard.createEl('p', {
                text: generator.description || 'No description provided.',
                attr: { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: var(--text-muted);' }
            });

            // Format pattern
            const formatElement = generatorCard.createEl('div', {
                cls: 'format-pattern',
                attr: { style: 'font-family: monospace; background: var(--background-primary-alt); padding: 8px; border-radius: 4px; margin-bottom: 10px; font-size: 0.9em; overflow-wrap: break-word;' }
            });
            formatElement.textContent = generator.format;

            // List of fields
            const fieldsElement = generatorCard.createDiv('fields-list');
            fieldsElement.style.marginBottom = '15px';
            
            if (generator.fields && Object.keys(generator.fields).length > 0) {
                fieldsElement.createEl('h4', {
                    text: 'Fields',
                    attr: { style: 'margin: 0 0 5px 0; font-size: 0.95em;' }
                });
                
                const fieldsList = fieldsElement.createEl('ul', {
                    attr: { style: 'margin: 0; padding-left: 20px;' }
                });
                
                Object.entries(generator.fields).forEach(([fieldName, values]) => {
                    const fieldItem = fieldsList.createEl('li', {
                        attr: { style: 'font-size: 0.85em;' }
                    });
                    fieldItem.textContent = `${fieldName}: ${Array.isArray(values) ? values.length : 0} options`;
                });
            }

            // Generator actions
            const generatorActions = generatorCard.createDiv('generator-actions');
            generatorActions.style.display = 'flex';
            generatorActions.style.justifyContent = 'flex-end';
            generatorActions.style.gap = '5px';
            generatorActions.style.marginTop = '5px';
            generatorActions.style.paddingTop = '8px';
            generatorActions.style.borderTop = '1px solid var(--background-modifier-border)';

            // Edit button with icon
            new ExtraButtonComponent(generatorActions.createDiv())
                .setIcon("pencil")
                .setTooltip("Edit")
                .onClick(() => {
                    this.openGeneratorModal(generator, index);
                });

            // Duplicate button with icon
            new ExtraButtonComponent(generatorActions.createDiv())
                .setIcon("copy")
                .setTooltip("Duplicate")
                .onClick(async () => {
                    const newGenerator = duplicateGenerator(generator);
                    this.plugin.settings.generators.push(newGenerator);
                    await this.plugin.saveSettings();
                    this.display();
                });

            // Delete button with icon - no confirmation dialog
            new ExtraButtonComponent(generatorActions.createDiv())
                .setIcon("trash")
                .setTooltip("Delete")
                .onClick(async () => {
                    this.plugin.settings.generators.splice(index, 1);
                    await this.plugin.saveSettings();
                    this.display();
                });
        });
    }

    /**
     * Display Appearance Settings Tab
     */
    private displayAppearanceSettings(containerEl: HTMLElement): void {
        const appearanceSection = containerEl.createDiv('appearance-section');

        // Section header with description
        const headerContainer = appearanceSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'Appearance' });
        headerContainer.createEl('p', {
            text: 'Customize the look and feel of the Random Generator.',
            cls: 'setting-item-description'
        });

        // Custom CSS toggle
        new Setting(appearanceSection)
            .setName('Use Custom CSS')
            .setDesc('Enable using a custom CSS file for styling the generator')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.customCSSEnabled)
                .onChange(async (value) => {
                    this.plugin.settings.customCSSEnabled = value;
                    await this.plugin.saveSettings();
                    this.plugin.loadCSS();
                }));
                
        // Custom CSS file path
        new Setting(appearanceSection)
            .setName('Custom CSS Path')
            .setDesc('Path to your custom CSS file in the vault (relative to vault root)')
            .addText(text => text
                .setPlaceholder('path/to/custom-style.css')
                .setValue(this.plugin.settings.customCSSPath)
                .onChange(async (value) => {
                    this.plugin.settings.customCSSPath = value;
                    await this.plugin.saveSettings();
                    if (this.plugin.settings.customCSSEnabled) {
                        this.plugin.loadCSS();
                    }
                }));
    }

    /**
     * Display Import/Export Settings Tab
     */
    private displayImportExportSettings(containerEl: HTMLElement): void {
        const importExportSection = containerEl.createDiv('import-export-section');

        // Section header with description
        const headerContainer = importExportSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'Import/Export' });
        headerContainer.createEl('p', {
            text: 'Import or export your generators for backup or sharing.',
            cls: 'setting-item-description'
        });

        // Export all generators
        new Setting(importExportSection)
            .setName('Export All Generators')
            .setDesc('Export all generators to a JSON file')
            .addButton(button => button
                .setButtonText('Export')
                .setCta()
                .onClick(async () => {
                    this.exportGenerators();
                }));
                
        // Import generators
        new Setting(importExportSection)
            .setName('Import Generators')
            .setDesc('Import generators from a JSON file (will append to existing generators)')
            .addText(text => text
                .setPlaceholder('path/to/import-file.json')
                .setValue(''))
            .addButton(button => button
                .setButtonText('Import')
                .onClick((evt) => {
                    this.importGenerators(evt);
                }));
    }

    /**
     * Export generators to a JSON file
     */
    private async exportGenerators(): Promise<void> {
        try {
            // Create a JSON string of all generators
            const exportData = JSON.stringify(this.plugin.settings.generators, null, 2);
            
            // Create filename with date
            const date = new Date();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const exportPath = `random-generators-export-${dateStr}.json`;
            
            // Write to file
            const adapter = this.plugin.app.vault.adapter;
            await adapter.write(exportPath, exportData);
            
            new Notice(`Generators exported to ${exportPath}`);
        } catch (error) {
            console.error('Failed to export generators:', error);
            new Notice('Failed to export generators');
        }
    }

    /**
     * Import generators from a JSON file
     */
    private async importGenerators(evt: MouseEvent): Promise<void> {
        try {
            // Find the input element for the file path
            const settingItem = (evt.target as HTMLElement).closest('.setting-item');
            if (!settingItem) return;
            
            const importPathEl = settingItem.querySelector('input');
            if (!importPathEl) return;
            
            const importPath = importPathEl.value.trim();
            
            if (!importPath) {
                new Notice('Please enter a file path');
                return;
            }
            
            // Read the file
            const adapter = this.plugin.app.vault.adapter;
            
            const fileExists = await adapter.exists(importPath);
            if (!fileExists) {
                new Notice(`File not found: ${importPath}`);
                return;
            }
            
            const importData = await adapter.read(importPath);
            
            try {
                const importedGenerators = JSON.parse(importData);
                
                if (!Array.isArray(importedGenerators)) {
                    new Notice('Invalid import file: not an array of generators');
                    return;
                }
                
                // Count valid generators
                let validCount = 0;
                
                // Process each generator
                for (const generator of importedGenerators) {
                    // Basic validation
                    if (validateGenerator(generator)) {
                        // Ensure no duplicate names by adding a suffix if needed
                        let baseName = generator.name;
                        let nameCounter = 1;
                        let finalName = baseName;
                        
                        // Check if name already exists
                        while (this.plugin.settings.generators.some(g => g.name === finalName)) {
                            finalName = `${baseName} (${nameCounter})`;
                            nameCounter++;
                        }
                        
                        // Update name if it was changed
                        generator.name = finalName;
                        
                        // Add to settings
                        this.plugin.settings.generators.push(generator);
                        validCount++;
                    }
                }
                
                if (validCount > 0) {
                    await this.plugin.saveSettings();
                    this.display(); // Refresh the display
                    new Notice(`Imported ${validCount} generators`);
                } else {
                    new Notice('No valid generators found in import file');
                }
                
            } catch (jsonError) {
                console.error('Failed to parse import file:', jsonError);
                new Notice('Failed to parse import file: invalid JSON');
            }
            
        } catch (error) {
            console.error('Import error:', error);
            new Notice('Failed to import generators');
        }
    }

    /**
     * Restore default generators
     */
    private async restoreDefaultGenerators(): Promise<void> {
        // Restore from default settings
        const defaultGenerators = JSON.parse(JSON.stringify(this.plugin.getDefaultSettings().generators));
        
        // For each default generator
        for (const defaultGenerator of defaultGenerators) {
            // Check if a generator with this name already exists
            const existingIndex = this.plugin.settings.generators.findIndex(g => g.name === defaultGenerator.name);
            
            if (existingIndex === -1) {
                // If no generator with this name exists, add it
                this.plugin.settings.generators.push(defaultGenerator);
            }
        }
        
        await this.plugin.saveSettings();
        new Notice('Default generators have been restored');
        this.display();
    }

    /**
     * Open Generator Modal for Adding/Editing
     */
    private openGeneratorModal(existingGenerator?: Generator, index?: number): void {
        const modal = new Modal(this.app);
        modal.titleEl.setText(existingGenerator ? `Edit ${existingGenerator.name} Generator` : 'Add New Generator');
        
        // Set modal width to be wider to prevent horizontal scrolling
        modal.contentEl.style.width = '600px';
        modal.contentEl.style.maxWidth = '80vw'; // Use viewport width for responsiveness
        modal.contentEl.style.maxHeight = '80vh';
        
        // Create a scrollable container with vertical scrolling only
        const modalScrollContainer = modal.contentEl.createDiv('modal-scroll-container');
        modalScrollContainer.style.height = 'calc(80vh - 100px)';
        modalScrollContainer.style.overflowY = 'auto';
        modalScrollContainer.style.overflowX = 'hidden'; // Prevent horizontal scrolling
        modalScrollContainer.style.padding = '0 20px'; // Add more horizontal padding
        
        // Create a copy of the generator or initialize a new one
        const generatorToEdit: Generator = existingGenerator 
            ? JSON.parse(JSON.stringify(existingGenerator)) 
            : {
                name: '',
                description: '',
                format: '',
                fields: {}
            };

        // Generator Name
        new Setting(modalScrollContainer)
            .setName('Generator Name')
            .addText(text => {
                text.setValue(generatorToEdit.name || '')
                    .setPlaceholder('Enter generator name')
                    .onChange(value => {
                        generatorToEdit.name = value;
                    });
                    
                // Add a small delay to make sure focus works properly
                setTimeout(() => {
                    text.inputEl.focus();
                }, 50);
            });

        // Generator Description
        new Setting(modalScrollContainer)
            .setName('Description')
            .setDesc('Brief description of what this generator creates')
            .addTextArea(text => {
                text.setValue(generatorToEdit.description || '')
                    .setPlaceholder('Description of the generator...')
                    .onChange(value => {
                        generatorToEdit.description = value;
                    });
                
                const textEl = text.inputEl;
                textEl.style.width = '100%';
                textEl.style.height = '80px';
            });

        // Format Template
        new Setting(modalScrollContainer)
            .setName('Format Template')
            .setDesc('Template with {Field} placeholders. Example: "The {Adjective} {Noun} is {Action}."')
            .addTextArea(text => {
                text.setValue(generatorToEdit.format || '')
                    .setPlaceholder('{Field1} {Field2}...')
                    .onChange(value => {
                        generatorToEdit.format = value;
                    });
                
                const textEl = text.inputEl;
                textEl.style.width = '100%';
                textEl.style.height = '60px';
                textEl.style.fontFamily = 'monospace';
            });

        // Fields section
        const fieldsSection = modalScrollContainer.createDiv('fields-section');
        fieldsSection.createEl('h3', { text: 'Fields' });
        fieldsSection.createEl('p', { 
            text: 'Define the fields used in the format template. Each field contains multiple options that will be randomly selected.',
            cls: 'setting-item-description'
        });
        
        const fieldsContainer = fieldsSection.createDiv('fields-container');
        
        // Function to add a field setting
        const addFieldSetting = (fieldName: string = '', values: string[] = ['']) => {
            const fieldContainer = fieldsContainer.createDiv('field-container');
            fieldContainer.style.marginBottom = '15px';
            fieldContainer.style.padding = '15px';
            fieldContainer.style.border = '1px solid var(--background-modifier-border)';
            fieldContainer.style.borderRadius = '5px';
            fieldContainer.style.background = 'var(--background-primary-alt)';
            fieldContainer.style.width = '100%'; // Ensure it takes full width
            
            // Field header with name and actions
            const fieldHeader = fieldContainer.createDiv('field-header');
            fieldHeader.style.display = 'flex';
            fieldHeader.style.justifyContent = 'space-between';
            fieldHeader.style.alignItems = 'center';
            fieldHeader.style.marginBottom = '10px';
            fieldHeader.style.width = '100%'; // Ensure it takes full width
            
            // Name input
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = fieldName;
            nameInput.placeholder = 'Field Name';
            nameInput.style.flex = '1';
            nameInput.style.marginRight = '10px';
            nameInput.style.padding = '6px 8px';
            nameInput.style.border = '1px solid var(--background-modifier-border)';
            nameInput.style.borderRadius = '4px';
            fieldHeader.appendChild(nameInput);
            
            // Delete button
            const deleteFieldBtn = document.createElement('button');
            deleteFieldBtn.textContent = '×';
            deleteFieldBtn.style.color = 'var(--text-error)';
            deleteFieldBtn.style.background = 'none';
            deleteFieldBtn.style.border = 'none';
            deleteFieldBtn.style.fontSize = '1.2em';
            deleteFieldBtn.style.cursor = 'pointer';
            deleteFieldBtn.style.padding = '4px 8px';
            deleteFieldBtn.title = 'Delete Field';
            deleteFieldBtn.addEventListener('click', () => {
                fieldContainer.remove();
            });
            fieldHeader.appendChild(deleteFieldBtn);
            
            // Values label
            const valuesLabel = fieldContainer.createEl('label', { 
                text: 'Values (one per line):',
                attr: { style: 'display: block; margin-bottom: 5px; font-size: 0.9em;' }
            });
            
            // Values textarea
            const valuesTextarea = fieldContainer.createEl('textarea', {
                attr: {
                    placeholder: 'Enter values, one per line'
                }
            });
            valuesTextarea.style.width = '100%';
            valuesTextarea.style.height = '100px';
            valuesTextarea.style.fontFamily = 'monospace';
            valuesTextarea.style.padding = '8px';
            valuesTextarea.style.border = '1px solid var(--background-modifier-border)';
            valuesTextarea.style.borderRadius = '4px';
            valuesTextarea.style.boxSizing = 'border-box';
            valuesTextarea.value = values.join('\n');
            
            return { container: fieldContainer, nameInput, valuesTextarea };
        };
        
        // Add existing fields
        const fieldElements: Array<{
            container: HTMLElement,
            nameInput: HTMLInputElement,
            valuesTextarea: HTMLTextAreaElement,
            originalName: string
        }> = [];
        
        if (generatorToEdit.fields) {
            Object.entries(generatorToEdit.fields).forEach(([fieldName, values]) => {
                const { container, nameInput, valuesTextarea } = addFieldSetting(fieldName, values);
                fieldElements.push({ container, nameInput, valuesTextarea, originalName: fieldName });
            });
        }
        
        // Add Field button
        const addFieldBtn = fieldsSection.createEl('button', {
            text: 'Add Field',
            cls: 'mod-cta'
        });
        addFieldBtn.style.marginTop = '10px';
        addFieldBtn.addEventListener('click', () => {
            const { container, nameInput, valuesTextarea } = addFieldSetting();
            fieldElements.push({ container, nameInput, valuesTextarea, originalName: '' });
        });
        
        // Add at least one field if there are none
        if (fieldElements.length === 0) {
            const { container, nameInput, valuesTextarea } = addFieldSetting();
            fieldElements.push({ container, nameInput, valuesTextarea, originalName: '' });
        }
        
        // Action buttons
        const buttonContainer = modal.contentEl.createDiv('button-container');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';
        buttonContainer.style.padding = '15px 20px';
        buttonContainer.style.borderTop = '1px solid var(--background-modifier-border)';
        buttonContainer.style.width = '100%';
        buttonContainer.style.boxSizing = 'border-box';

        // Cancel button
        const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
        cancelButton.style.padding = '6px 16px';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.border = '1px solid var(--background-modifier-border)';
        cancelButton.style.background = 'var(--background-secondary)';
        cancelButton.addEventListener('click', () => {
            modal.close();
        });
        
        // Save button
        const saveButton = buttonContainer.createEl('button', { 
            text: 'Save Generator',
            cls: 'mod-cta'
        });
        saveButton.style.padding = '6px 16px';
        saveButton.style.borderRadius = '4px';
        saveButton.style.background = 'var(--interactive-accent)';
        saveButton.style.color = 'var(--text-on-accent)';
        saveButton.style.border = 'none';
        
        saveButton.addEventListener('click', async () => {
            // Validate generator name
            if (!generatorToEdit.name.trim()) {
                new Notice('Generator name is required');
                return;
            }
            
            // Validate format
            if (!generatorToEdit.format.trim()) {
                new Notice('Format template is required');
                return;
            }
            
            // Build updated fields
            const updatedFields: Record<string, string[]> = {};
            
            for (const field of fieldElements) {
                const fieldName = field.nameInput.value.trim();
                const fieldValues = field.valuesTextarea.value.split('\n')
                    .map(v => v.trim())
                    .filter(v => v !== '');
                
                // Skip empty fields
                if (!fieldName || fieldValues.length === 0) continue;
                
                // Check for duplicate field names
                if (updatedFields[fieldName]) {
                    new Notice(`Duplicate field name: ${fieldName}`);
                    return;
                }
                
                updatedFields[fieldName] = fieldValues;
            }
            
            // Check if there are any fields
            if (Object.keys(updatedFields).length === 0) {
                new Notice('At least one field with values is required');
                return;
            }
            
            // Update the generator fields
            generatorToEdit.fields = updatedFields;
            
            // Save the generator
            if (index !== undefined) {
                this.plugin.settings.generators[index] = generatorToEdit;
            } else {
                this.plugin.settings.generators.push(generatorToEdit);
            }
            
            await this.plugin.saveSettings();
            modal.close();
            this.display();
        });
        
        modal.open();
    }
}
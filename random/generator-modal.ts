import { App, Modal, Notice } from 'obsidian';
import UnifiedGeneratorPlugin from '../main';
import { Generator } from './types';
import { generateFromTemplate } from './utils/generator';

/**
 * Modal for generating random content
 */
export class GeneratorModal extends Modal {
    private plugin: UnifiedGeneratorPlugin;
    private selectedGenerator: string = "";
    private resultEl: HTMLElement;

    constructor(app: App, plugin: UnifiedGeneratorPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.empty();
        
        this.renderContent(contentEl);
    }

    /**
     * Render the modal content to a container
     * This allows the content to be rendered either in this modal
     * or in the unified generator modal
     */
    public renderContent(contentEl: HTMLElement): void {
        // Clear any existing content
        contentEl.empty();
        contentEl.addClass('random-generator-modal');

        try {
            // Create header
            contentEl.createEl('h2', { text: 'Random Generator' });

            // Create generator selection dropdown
            const selectContainer = contentEl.createDiv({ cls: 'generator-select-container' });
            selectContainer.createEl('span', { text: 'Select Generator: ' });
            const selectEl = selectContainer.createEl('select', { cls: 'generator-select' });
            
            // Make sure we have generators before trying to populate dropdown
            if (this.plugin.randomSettings.generators && this.plugin.randomSettings.generators.length > 0) {
                this.plugin.randomSettings.generators.forEach(generator => {
                    selectEl.createEl('option', { value: generator.name, text: generator.name });
                });
                
                // Set initial selection
                this.selectedGenerator = this.plugin.randomSettings.generators[0].name;
            } else {
                selectEl.createEl('option', { value: "", text: "No generators available" });
                this.selectedGenerator = "";
            }

            selectEl.addEventListener('change', (e) => {
                this.selectedGenerator = (e.target as HTMLSelectElement).value;
            });

            // Create result container
            const resultContainer = contentEl.createDiv({ cls: 'generator-result-container' });
            resultContainer.createEl('h3', { text: 'Generated Result:' });
            this.resultEl = resultContainer.createDiv({ cls: 'generator-result' });

            // Create button container
            const buttonContainer = contentEl.createDiv({ cls: 'generator-button-container' });
            
            // Generate button
            const generateButton = buttonContainer.createEl('button', { text: 'Generate' });
            generateButton.addEventListener('click', () => {
                this.generateResult();
            });
            
            // Insert button
            const insertButton = buttonContainer.createEl('button', { text: 'Insert' });
            insertButton.addEventListener('click', () => {
                this.insertResult();
            });

            // Generate an initial result if we have generators
            if (this.selectedGenerator) {
                this.generateResult();
            }
        } catch (error) {
            console.error('Error in modal rendering:', error);
            contentEl.createEl('p', { text: 'An error occurred. Please check the console for details.' });
        }
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }

    /**
     * Generate a new random result
     */
    generateResult(): void {
        try {
            if (this.selectedGenerator && this.plugin.randomSettings.generators) {
                const generator = this.plugin.randomSettings.generators.find(g => g.name === this.selectedGenerator);
                if (generator) {
                    const result = generateFromTemplate(generator);
                    this.resultEl.setText(result);
                    
                    // Add animation class
                    this.resultEl.addClass('highlight-new-result');
                    
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        this.resultEl.removeClass('highlight-new-result');
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error generating result:', error);
            this.resultEl.setText('Error generating content');
        }
    }

    /**
     * Insert the current result into the active editor
     */
    insertResult(): void {
        try {
            // Get the active editor and insert the text at cursor position
            const activeLeaf = this.app.workspace.activeLeaf;
            if (activeLeaf && activeLeaf.view && this.resultEl.textContent) {
                const editor = this.getEditor(activeLeaf.view);
                if (editor) {
                    editor.replaceSelection(this.resultEl.textContent);
                    this.close();
                } else {
                    new Notice('No active editor found');
                }
            }
        } catch (error) {
            console.error('Error inserting result:', error);
            new Notice('Error inserting result');
        }
    }

    /**
     * Helper to get editor from view with type safety
     */
    private getEditor(view: any): any {
        return view.editor;
    }
}
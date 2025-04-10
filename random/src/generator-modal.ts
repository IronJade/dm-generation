import { App, Modal, Notice } from 'obsidian';
import { RandomGeneratorPlugin } from './plugin';
import { Generator } from './types';
import { generateFromTemplate } from './utils/generator';

/**
 * Modal for generating random content
 */
export class GeneratorModal extends Modal {
    private plugin: RandomGeneratorPlugin;
    private selectedGenerator: string = "";
    private resultEl: HTMLElement;

    constructor(app: App, plugin: RandomGeneratorPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen(): void {
        const { contentEl } = this;
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
            if (this.plugin.settings.generators && this.plugin.settings.generators.length > 0) {
                this.plugin.settings.generators.forEach(generator => {
                    selectEl.createEl('option', { value: generator.name, text: generator.name });
                });
                
                // Set initial selection
                this.selectedGenerator = this.plugin.settings.generators[0].name;
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
            console.error('Error in modal onOpen:', error);
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
            if (this.selectedGenerator && this.plugin.settings.generators) {
                const generator = this.plugin.settings.generators.find(g => g.name === this.selectedGenerator);
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
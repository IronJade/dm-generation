import { App, Modal, Notice } from 'obsidian';
import { Generator } from './types';
import { validateGenerator } from './utils/generator';

interface FieldInput {
    row: HTMLElement;
    nameInput: HTMLInputElement;
    valuesInput: HTMLTextAreaElement;
}

/**
 * Modal for creating new generators
 */
export class AddGeneratorModal extends Modal {
    private onSubmit: (generator: Generator) => void;
    private fieldInputs: FieldInput[] = [];

    constructor(app: App, onSubmit: (generator: Generator) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('add-generator-modal');
        
        this.buildModalContent();
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
        this.fieldInputs = [];
    }

    /**
     * Build the modal content
     */
    private buildModalContent(): void {
        const { contentEl } = this;
        
        const modalContent = contentEl.createDiv({ cls: 'modal-content' });
        
        // Name input
        const nameRow = modalContent.createDiv({ cls: 'setting-row' });
        nameRow.createEl('label', { text: 'Generator Name:' });
        const nameInput = nameRow.createEl('input', { 
            type: 'text', 
            cls: 'setting-control', 
            placeholder: 'Enter generator name' 
        });
        
        // Description input
        const descRow = modalContent.createDiv({ cls: 'setting-row' });
        descRow.createEl('label', { text: 'Description:' });
        const descInput = descRow.createEl('textarea', { 
            cls: 'setting-control', 
            placeholder: 'Brief description of the generator' 
        });
        
        // Format input
        const formatRow = modalContent.createDiv({ cls: 'setting-row' });
        formatRow.createEl('label', { text: 'Format Template:' });
        const formatInput = formatRow.createEl('input', { 
            type: 'text', 
            cls: 'setting-control', 
            placeholder: 'Template with {Field} placeholders' 
        });
        
        // Initial fields section
        const fieldsSection = modalContent.createDiv({ cls: 'fields-section' });
        fieldsSection.createEl('h3', { text: 'Initial Fields' });
        
        // Dynamic field inputs
        const dynamicFieldsContainer = fieldsSection.createDiv();
        
        // Button to add more fields
        const addFieldBtn = fieldsSection.createEl('button', { 
            text: 'Add Field', 
            cls: 'add-field-btn' 
        });
        
        // Add field button functionality
        addFieldBtn.addEventListener('click', () => {
            this.addFieldRow(dynamicFieldsContainer);
        });
        
        // Add an initial field
        this.addFieldRow(dynamicFieldsContainer);
        
        // Button container for actions
        const buttonContainer = modalContent.createDiv({ cls: 'modal-button-container' });
        
        // Create button
        const createBtn = buttonContainer.createEl('button', { 
            text: 'Create Generator', 
            cls: 'create-btn' 
        });
        
        createBtn.addEventListener('click', () => {
            this.createGenerator(nameInput.value, descInput.value, formatInput.value);
        });
        
        // Cancel button
        const cancelBtn = buttonContainer.createEl('button', { 
            text: 'Cancel', 
            cls: 'cancel-btn' 
        });
        cancelBtn.addEventListener('click', () => this.close());
    }

    /**
     * Add a new field input row
     */
    private addFieldRow(container: HTMLElement): void {
        const fieldRow = container.createDiv({ cls: 'field-row' });
        
        const fieldNameInput = fieldRow.createEl('input', { 
            type: 'text', 
            placeholder: 'Field Name' 
        });
        
        const fieldValuesInput = fieldRow.createEl('textarea', { 
            placeholder: 'Enter items (one per line)' 
        });
        
        const removeBtn = fieldRow.createEl('button', { 
            text: 'Remove', 
            cls: 'remove-field-btn' 
        });
        removeBtn.addEventListener('click', () => {
            fieldRow.remove();
            const index = this.fieldInputs.findIndex(f => f.row === fieldRow);
            if (index !== -1) {
                this.fieldInputs.splice(index, 1);
            }
        });
        
        this.fieldInputs.push({ 
            row: fieldRow, 
            nameInput: fieldNameInput, 
            valuesInput: fieldValuesInput 
        });
    }

    /**
     * Create a new generator from the form inputs
     */
    private createGenerator(name: string, description: string, format: string): void {
        // Validate inputs
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedFormat = format.trim();
        
        if (!trimmedName) {
            new Notice('Generator name is required');
            return;
        }
        
        // Collect fields
        const fields: Record<string, string[]> = {};
        let hasValidFields = false;
        
        this.fieldInputs.forEach(input => {
            const fieldName = input.nameInput.value.trim();
            const fieldValues = input.valuesInput.value.split('\n')
                .map(v => v.trim())
                .filter(v => v !== '');
            
            if (fieldName && fieldValues.length > 0) {
                fields[fieldName] = fieldValues;
                hasValidFields = true;
            }
        });
        
        if (!hasValidFields) {
            new Notice('At least one field with items is required');
            return;
        }
        
        // Create new generator
        const newGenerator: Generator = {
            name: trimmedName,
            description: trimmedDescription,
            format: trimmedFormat,
            fields: fields
        };
        
        // Validate the generator structure
        if (!validateGenerator(newGenerator)) {
            new Notice('Invalid generator configuration');
            return;
        }
        
        // Pass the new generator to the callback
        this.onSubmit(newGenerator);
        this.close();
    }
}
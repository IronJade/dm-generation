// Minimal type definitions for Obsidian core interfaces

export interface App {
    workspace: Workspace;
    setting: SettingManager;
    vault: Vault;
}

export interface Workspace {
    /**
     * Get the currently active file
     */
    getActiveFile(): TFile | null;

    /**
     * Get the active view of a specific type
     * @param type View type to retrieve
     */
    getActiveViewOfType<T extends View>(type: new (...args: any[]) => T): T | null;
}

export interface Vault {
    /**
     * Create a new file
     * @param path File path
     * @param data Initial file content
     */
    create(path: string, data: string): Promise<TFile>;

    /**
     * Read the contents of a file
     * @param file File to read
     * @param processBinary Whether to process binary files
     */
    read(file: TFile, processBinary?: boolean): Promise<string>;

    /**
     * Modify an existing file
     * @param file File to modify
     * @param data New file content
     */
    modify(file: TFile, data: string): Promise<void>;
}

export interface TFile {
    path: string;
    name: string;
    extension: string;
}

export interface View {
    editor?: CodeMirror.Editor;
}

export interface SettingManager {
    /**
     * Open the settings
     */
    open(): void;

    /**
     * Close the settings
     */
    close(): void;

    /**
     * Open a specific settings tab
     * @param tab Tab to open
     */
    openTab(tab: PluginSettingTab): void;

    /**
     * Get all registered setting tabs
     */
    settingTabs: PluginSettingTab[];
}

export interface PluginManifest {
    id: string;
    name: string;
    version: string;
    minAppVersion: string;
    description: string;
    author: string;
    authorUrl?: string;
    isDesktopOnly: boolean;
}

export interface PluginBase {
    /**
     * Add a ribbon icon to the left sidebar
     * @param icon Icon name
     * @param title Tooltip text
     * @param callback Click handler
     */
    addRibbonIcon(icon: string, title: string, callback: () => void): HTMLElement;

    /**
     * Add a command to the command palette
     * @param command Command definition
     */
    addCommand(command: {
        id: string;
        name: string;
        callback?: () => void;
        checkCallback?: (checking: boolean) => boolean;
        editorCallback?: (editor: CodeMirror.Editor) => void;
        modalClass?: new () => Modal;
    }): void;

    /**
     * Add a settings tab to the settings view
     * @param settingTab Settings tab to add
     */
    addSettingTab(settingTab: PluginSettingTab): void;

    /**
     * Load plugin data
     */
    loadData(): Promise<any>;

    /**
     * Save plugin data
     * @param data Data to save
     */
    saveData(data: any): Promise<void>;
}

export interface Modal {
    /**
     * Open the modal
     */
    open(): void;

    /**
     * Close the modal
     */
    close(): void;

    /**
     * App instance
     */
    app: App;

    /**
     * Modal content element
     */
    contentEl: HTMLElement;

    /**
     * Modal title element
     */
    titleEl: HTMLElement;
}

export interface PluginSettingTab {
    /**
     * App instance
     */
    app: App;

    /**
     * Container element for settings
     */
    containerEl: HTMLElement;

    /**
     * Display the settings
     */
    display(): void;
}

// Utility type for creating settings
export interface SettingConstructor {
    /**
     * Create a new setting
     * @param containerEl Container to add the setting to
     */
    new (containerEl: HTMLElement): Setting;
}

export interface Setting {
    /**
     * Set the name of the setting
     * @param name Setting name
     */
    setName(name: string): this;

    /**
     * Set the description of the setting
     * @param desc Setting description
     */
    setDesc(desc: string): this;

    /**
     * Add a text input to the setting
     * @param callback Callback to handle text input
     */
    addText(callback: (text: TextComponent) => void): this;

    /**
     * Add a dropdown to the setting
     * @param callback Callback to handle dropdown
     */
    addDropdown(callback: (dropdown: DropdownComponent) => void): this;

    /**
     * Add a toggle to the setting
     * @param callback Callback to handle toggle
     */
    addToggle(callback: (toggle: ToggleComponent) => void): this;

    /**
     * Add a button to the setting
     * @param callback Callback to handle button
     */
    addButton(callback: (button: ButtonComponent) => void): this;
}

// Component interfaces
export interface TextComponent {
    setValue(value: string): this;
    onChange(callback: (value: string) => void): this;
}

export interface DropdownComponent {
    addOption(value: string, display: string): this;
    setValue(value: string): this;
    onChange(callback: (value: string) => void): this;
}

export interface ToggleComponent {
    setValue(value: boolean): this;
    onChange(callback: (value: boolean) => void): this;
}

export interface ButtonComponent {
    setButtonText(text: string): this;
    onClick(callback: () => void): this;
}

// Utility interfaces
export interface Notice {
    /**
     * Create a new notice
     * @param message Message to display
     * @param duration Duration to show the notice (optional)
     */
    new (message: string, duration?: number): Notice;
}

import { App } from 'obsidian';

/**
 * CSS Loader utility for managing plugin styles
 */
export class CSSLoader {
    private styleElement: HTMLStyleElement | null = null;
    private app: App;
    
    constructor(app: App) {
        this.app = app;
    }
    
    /**
     * Load CSS - either default or custom
     * @param customCSSEnabled Whether custom CSS is enabled
     * @param customCSSPath Path to custom CSS file
     */
    public async loadCSS(customCSSEnabled: boolean, customCSSPath: string): Promise<void> {
        try {
            // Remove any previously loaded stylesheets
            this.removeExistingStyles();
            
            // Create new style element
            this.styleElement = document.createElement('style');
            this.styleElement.id = 'unified-generator-styles';
            
            if (customCSSEnabled && customCSSPath) {
                // Try to load custom CSS
                try {
                    const adapter = this.app.vault.adapter;
                    const css = await adapter.read(customCSSPath);
                    this.styleElement.textContent = css;
                    document.head.appendChild(this.styleElement);
                } catch (error) {
                    console.error('Failed to load custom CSS:', error);
                    // Fall back to default CSS
                    this.loadDefaultCSS();
                }
            } else {
                // Load default CSS
                this.loadDefaultCSS();
            }
        } catch (error) {
            console.error('Error in loadCSS:', error);
        }
    }
    
    /**
     * Load the default CSS
     */
    private loadDefaultCSS(): void {
        try {
            if (this.styleElement) {
                // Default CSS styles
                this.styleElement.textContent = `
                    /* Unified Generator Plugin Styles */
                    
                    /* Tab styles */
                    .generator-tabs {
                        display: flex;
                        border-bottom: 1px solid var(--background-modifier-border);
                        margin-bottom: 15px;
                    }
                    
                    .generator-tabs button {
                        flex: 1;
                        padding: 10px;
                        border: none;
                        background-color: var(--background-secondary);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .generator-tabs button:hover {
                        background-color: var(--background-secondary-alt);
                    }
                    
                    .generator-tabs button.active {
                        background-color: var(--background-primary);
                        border-bottom: 2px solid var(--interactive-accent);
                        font-weight: bold;
                    }
                    
                    /* Content container */
                    .generator-content {
                        max-height: 500px;
                        overflow: auto;
                        padding: 10px 0;
                    }
                    
                    /* NPC Generator styles */
                    .npc-generator-container {
                        padding: 10px;
                    }
                    
                    .npc-generation-options {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                        margin-bottom: 20px;
                    }
                    
                    /* Dungeon Generator styles */
                    .dungeon-generator-modal {
                        padding: 10px;
                    }
                    
                    .dungeon-settings-container {
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: var(--background-secondary);
                        border-radius: 5px;
                    }
                    
                    /* Random Generator styles */
                    .random-generator-modal {
                        padding: 10px;
                    }
                    
                    .generator-result {
                        background-color: var(--background-secondary);
                        border: 1px solid var(--background-modifier-border);
                        border-radius: 6px;
                        padding: 1rem;
                        min-height: 120px;
                        margin-bottom: 15px;
                    }
                    
                    .generator-button-container {
                        display: flex;
                        justify-content: flex-end;
                        gap: 10px;
                    }
                    
                    /* Settings tabs */
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
                    }
                    
                    .content-container {
                        max-height: 500px;
                        overflow-y: auto;
                        padding: 10px;
                        border: 1px solid var(--background-modifier-border);
                        border-radius: 4px;
                    }
                `;
                document.head.appendChild(this.styleElement);
            }
        } catch (error) {
            console.error('Error in loadDefaultCSS:', error);
        }
    }
    
    /**
     * Remove existing plugin styles
     */
    private removeExistingStyles(): void {
        const oldStyleElement = document.getElementById('unified-generator-styles');
        if (oldStyleElement) {
            oldStyleElement.remove();
        }
        this.styleElement = null;
    }
    
    /**
     * Clean up resources
     */
    public unload(): void {
        this.removeExistingStyles();
    }
}
import { App } from 'obsidian';
import { DEFAULT_CSS } from '../constants';

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
            this.styleElement.id = 'random-generator-styles';
            
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
                this.styleElement.textContent = DEFAULT_CSS;
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
        const oldStyleElement = document.getElementById('random-generator-styles');
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
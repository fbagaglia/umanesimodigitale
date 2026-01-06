/**
 * MAIN APPLICATION
 * Inizializza e coordina tutti i moduli dell'applicazione
 */

class UmanesimoDigitaleApp {
    constructor() {
        // Crea un nuovo DataManager se non esiste
        this.dataManager = window.dataManager || new window.DataManager();
        this.searchEngine = null;
        this.quizEngine = null;
        
        this.init();
    }

    async init() {
        try {
            // Inizializza il data manager PRIMA di mostrare il messaggio
            await this.dataManager.initialize();
            
            // Mostra messaggio di benvenuto
            this.showWelcomeMessage();
            
            // Inizializza i motori di ricerca e quiz
            this.searchEngine = new window.SearchEngine(this.dataManager);
            this.quizEngine = new window.QuizEngine();
            
            // Rendi il quiz engine disponibile globalmente per search engine
            window.quizEngine = this.quizEngine;
            
            // Inizializza la navigazione a tab
            this.initTabs();
            
            // Focus automatico sulla barra di ricerca
            document.getElementById('searchInput').focus();
            
            // Log successo
            console.log('✅ Applicazione inizializzata con successo');
            console.log(`📚 ${this.dataManager.posts.length} articoli caricati`);
            console.log(`📂 ${this.dataManager.getCategories().length} categorie disponibili`);
            
        } catch (error) {
            console.error('❌ Errore durante l\'inizializzazione:', error);
            this.showErrorMessage(error);
        }
    }

    /**
     * Mostra messaggio di benvenuto
     */
    showWelcomeMessage() {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = `
            <div class="welcome-message" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.5;">
                    <i class="fas fa-book-open"></i>
                </div>
                <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--primary-color);">
                    Benvenuto nel Motore di Ricerca dell'Umanesimo Digitale
                </h2>
                <p style="font-size: 1.1rem; color: var(--text-light); max-width: 600px; margin: 0 auto 30px; line-height: 1.7;">
                    Esplora oltre 1000 articoli su intelligenza artificiale, etica digitale, 
                    educazione e il futuro della tecnologia. Inizia digitando un argomento 
                    che ti interessa nella barra di ricerca qui sopra.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 30px;">
                    ${this.getSuggestedTopics().map(topic => `
                        <button class="suggested-topic-btn" data-topic="${this.escapeHtml(topic)}"
                            style="padding: 10px 20px; background: var(--secondary-color); color: white; 
                            border: none; border-radius: 25px; cursor: pointer; font-size: 0.9rem;
                            transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);">
                            ${this.escapeHtml(topic)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Event listeners per i topic suggeriti
        document.querySelectorAll('.suggested-topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = e.target.dataset.topic;
                document.getElementById('searchInput').value = topic;
                this.searchEngine.performSearch();
            });

            // Hover effect
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.background = '#2980B9';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.4)';
            });

            btn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'var(--secondary-color)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(52, 152, 219, 0.3)';
            });
        });
    }

    /**
     * Ottieni topic suggeriti
     */
    getSuggestedTopics() {
        const categories = this.dataManager.getCategories();
        const defaultTopics = [
            'Intelligenza Artificiale',
            'Etica Digitale',
            'Educazione',
            'Umanesimo Digitale',
            'Machine Learning'
        ];

        // Usa le categorie reali se disponibili, altrimenti i default
        if (categories.length > 0) {
            return categories.slice(0, 6);
        }
        return defaultTopics;
    }

    /**
     * Mostra messaggio di errore
     */
    showErrorMessage(error) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 20px; color: var(--accent-color); opacity: 0.5;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--accent-color);">
                    Errore di Inizializzazione
                </h2>
                <p style="font-size: 1.1rem; color: var(--text-light); line-height: 1.7; margin-bottom: 20px;">
                    Si è verificato un errore durante il caricamento dell'applicazione.
                    Ricarica la pagina per riprovare.
                </p>
                <details style="text-align: left; background: var(--bg-secondary); padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <summary style="cursor: pointer; font-weight: 500; margin-bottom: 10px;">
                        Dettagli tecnici
                    </summary>
                    <code style="font-size: 0.85rem; color: var(--text-color);">
                        ${this.escapeHtml(error.toString())}
                    </code>
                </details>
            </div>
        `;
    }

    /**
     * Inizializza la navigazione a tab
     */
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const searchSection = document.getElementById('searchSection');
        const quizSection = document.getElementById('quizSection');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;

                // Aggiorna bottoni attivi
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Mostra/nascondi sezioni
                if (tab === 'search') {
                    searchSection.style.display = 'block';
                    quizSection.style.display = 'none';
                    
                    // Scroll alla sezione ricerca
                    setTimeout(() => {
                        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else if (tab === 'quiz') {
                    searchSection.style.display = 'none';
                    quizSection.style.display = 'block';
                    
                    // Scroll alla sezione quiz
                    setTimeout(() => {
                        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        });
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inizializza l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new UmanesimoDigitaleApp();
});

// Log info quando tutto è caricato
window.addEventListener('load', () => {
    console.log('%c🚀 Chiedi all\'Umanesimo Digitale', 'font-size: 20px; font-weight: bold; color: #3498DB;');
    console.log('%cMotore di ricerca per il blog umanesimodigitale.info', 'font-size: 14px; color: #7F8C8D;');
    console.log('%c\n💡 Suggerimento: Prova a cercare "intelligenza artificiale", "etica", "educazione" o "tecnologia"', 'font-size: 12px; color: #27AE60;');
});

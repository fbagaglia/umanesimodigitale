/**
 * SEARCH MODULE
 * Gestisce la funzionalità di ricerca e visualizzazione risultati
 */

class SearchEngine {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        this.resultsInfo = document.getElementById('resultsInfo');
        this.summaryArticle = document.getElementById('summaryArticle');
        this.summaryContent = document.getElementById('summaryContent');
        this.loading = document.getElementById('loading');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        
        this.currentQuery = '';
        this.currentResults = [];
        this.aiSummaryGenerated = false;
        
        this.init();
    }

    init() {
        // Event listeners
        this.searchBtn.addEventListener('click', () => this.performSearch());
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Autocomplete suggestions
        this.searchInput.addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });

        // Chiudi suggerimenti quando si clicca fuori
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    /**
     * Mostra suggerimenti di ricerca
     */
    showSuggestions(query) {
        if (!query || query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.dataManager.getSuggestions(query);
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        const html = suggestions.map(suggestion => `
            <div class="suggestion-item" data-suggestion="${this.escapeHtml(suggestion)}">
                <i class="fas fa-search"></i>
                ${this.highlightMatch(suggestion, query)}
            </div>
        `).join('');

        this.searchSuggestions.innerHTML = html;
        this.searchSuggestions.classList.add('active');

        // Event listeners per suggerimenti
        this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.searchInput.value = item.dataset.suggestion;
                this.hideSuggestions();
                this.performSearch();
            });
        });
    }

    /**
     * Nascondi suggerimenti
     */
    hideSuggestions() {
        this.searchSuggestions.classList.remove('active');
    }

    /**
     * Evidenzia la corrispondenza nella stringa
     */
    highlightMatch(text, query) {
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return this.escapeHtml(text).replace(regex, '<strong>$1</strong>');
    }

    /**
     * Esegui ricerca
     */
    async performSearch() {
        const query = this.searchInput.value.trim();
        
        if (!query) {
            this.showError('Per favore, inserisci un termine di ricerca.');
            return;
        }

        this.currentQuery = query;
        this.showLoading();
        this.hideSuggestions();

        // Simula un piccolo delay per UX migliore
        await new Promise(resolve => setTimeout(resolve, 500));

        const results = this.dataManager.search(query);
        this.currentResults = results;

        this.hideLoading();
        this.displayResults(results, query);
        
        if (results.length > 0) {
            this.generateSummary(results, query);
            
            // Mostra il tab navigation se ci sono risultati
            document.getElementById('tabsNav').style.display = 'flex';
            
            // Genera quiz per questo argomento
            if (window.quizEngine) {
                window.quizEngine.generateQuiz(results, query);
            }
        }
    }

    /**
     * Mostra loading
     */
    showLoading() {
        this.loading.style.display = 'block';
        this.searchResults.innerHTML = '';
        this.resultsInfo.style.display = 'none';
        this.summaryArticle.style.display = 'none';
    }

    /**
     * Nascondi loading
     */
    hideLoading() {
        this.loading.style.display = 'none';
    }

    /**
     * Mostra errore
     */
    showError(message) {
        this.searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>${message}</h3>
            </div>
        `;
    }

    /**
     * Visualizza risultati
     */
    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>Nessun risultato trovato</h3>
                    <p>Non abbiamo trovato articoli relativi a "<strong>${this.escapeHtml(query)}</strong>".</p>
                    <p>Prova con termini diversi o più generici come "intelligenza artificiale", "etica", "educazione" o "tecnologia".</p>
                </div>
            `;
            this.resultsInfo.style.display = 'none';
            return;
        }

        // Mostra info risultati
        this.resultsInfo.style.display = 'block';
        this.resultsInfo.innerHTML = `
            Trovati <strong>${results.length}</strong> articol${results.length === 1 ? 'o' : 'i'} 
            per "<strong>${this.escapeHtml(query)}</strong>"
        `;

        // Genera HTML risultati
        const html = results.map(post => this.createResultCard(post, query)).join('');
        this.searchResults.innerHTML = html;

        // Smooth scroll ai risultati
        setTimeout(() => {
            this.resultsInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Crea card risultato
     */
    createResultCard(post, query) {
        // Evidenzia termini di ricerca nell'excerpt
        const highlightedExcerpt = this.highlightSearchTerms(post.excerpt, query);
        
        return `
            <article class="result-card">
                <img src="${post.image}" alt="${this.escapeHtml(post.title)}" class="result-image" loading="lazy">
                <div class="result-content">
                    <h3 class="result-title">
                        <a href="${post.url}" target="_blank" rel="noopener">
                            ${this.escapeHtml(post.title)}
                        </a>
                    </h3>
                    <div class="result-meta">
                        <span class="result-meta-item">
                            <i class="fas fa-calendar"></i>
                            ${post.date}
                        </span>
                        <span class="result-meta-item">
                            <i class="fas fa-user"></i>
                            ${this.escapeHtml(post.author)}
                        </span>
                        ${post.categories.length > 0 ? `
                            <span class="result-meta-item">
                                <i class="fas fa-tags"></i>
                                ${post.categories.slice(0, 2).map(cat => this.escapeHtml(cat)).join(', ')}
                            </span>
                        ` : ''}
                    </div>
                    <p class="result-excerpt">${highlightedExcerpt}</p>
                    <a href="${post.url}" class="result-link" target="_blank" rel="noopener">
                        Leggi l'articolo completo
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    /**
     * Evidenzia termini di ricerca nel testo
     */
    highlightSearchTerms(text, query) {
        const terms = query.toLowerCase().split(' ').filter(t => t.length > 2);
        let result = this.escapeHtml(text);
        
        terms.forEach(term => {
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        
        return result;
    }

    /**
     * Genera articolo riassuntivo
     */
    generateSummary(results, query) {
        if (results.length === 0) {
            this.summaryArticle.style.display = 'none';
            return;
        }

        this.aiSummaryGenerated = false;

        // Analizza i risultati per generare un riassunto intelligente
        const categories = new Set();
        const keyPoints = [];
        
        results.forEach(post => {
            post.categories.forEach(cat => categories.add(cat));
            
            // Estrai prime frasi significative
            const sentences = post.excerpt.split('.').filter(s => s.trim().length > 50);
            if (sentences[0]) {
                keyPoints.push({
                    point: sentences[0].trim() + '.',
                    title: post.title,
                    url: post.url
                });
            }
        });

        // Genera HTML riassunto BASE (algoritmo)
        const summaryHtml = `
            <div class="summary-intro">
                <p>
                    Basandoci sulla tua ricerca per <strong>"${this.escapeHtml(query)}"</strong>, 
                    abbiamo trovato <strong>${results.length}</strong> articol${results.length === 1 ? 'o' : 'i'} 
                    rilevanti che ${results.length === 1 ? 'copre' : 'coprono'} i seguenti temi:
                </p>
            </div>

            ${categories.size > 0 ? `
                <h3><i class="fas fa-bookmark"></i> Tematiche Principali</h3>
                <ul class="summary-categories">
                    ${Array.from(categories).slice(0, 5).map(cat => 
                        `<li><strong>${this.escapeHtml(cat)}</strong></li>`
                    ).join('')}
                </ul>
            ` : ''}

            <h3><i class="fas fa-lightbulb"></i> Punti Chiave</h3>
            <ul class="summary-points">
                ${keyPoints.slice(0, 5).map(item => `
                    <li>
                        ${item.point}
                        <br>
                        <small>
                            <i class="fas fa-link"></i> 
                            <a href="${item.url}" target="_blank" rel="noopener">
                                ${this.escapeHtml(item.title)}
                            </a>
                        </small>
                    </li>
                `).join('')}
            </ul>

            <h3><i class="fas fa-compass"></i> Approfondimento</h3>
            <p>
                Gli articoli trovati esplorano ${this.escapeHtml(query)} da diverse prospettive, 
                integrando aspetti ${Array.from(categories).slice(0, 3).map(c => 
                    '<strong>' + this.escapeHtml(c.toLowerCase()) + '</strong>'
                ).join(', ')}. 
                ${results.length > 1 ? 
                    'Ogni articolo offre un punto di vista unico e complementare, ' +
                    'permettendoti di sviluppare una comprensione approfondita e sfaccettata dell\'argomento.' :
                    'L\'articolo offre una prospettiva approfondita sull\'argomento.'
                }
            </p>

            ${results.length > 3 ? `
                <h3><i class="fas fa-graduation-cap"></i> Come Approfondire</h3>
                <p>
                    Per massimizzare il tuo apprendimento su questo argomento:
                </p>
                <ol>
                    <li>Inizia leggendo gli articoli in ordine, dal più recente al più datato</li>
                    <li>Prendi nota dei concetti chiave e delle connessioni tra gli articoli</li>
                    <li>Metti alla prova la tua comprensione con il <strong>Quiz Interattivo</strong> disponibile qui sotto</li>
                    <li>Rifletti su come questi concetti si applicano al tuo contesto personale o professionale</li>
                </ol>
            ` : ''}

            <!-- Bottone per Riassunto AI -->
            <div class="ai-summary-cta">
                <button id="generateAISummary" class="ai-summary-btn">
                    <i class="fas fa-magic"></i>
                    <span>Genera Riassunto AI Avanzato</span>
                    <small>Powered by Gemini</small>
                </button>
                <p class="ai-summary-note">
                    <i class="fas fa-info-circle"></i>
                    Il riassunto AI fornisce un'analisi più approfondita e collegamenti concettuali avanzati
                </p>
            </div>
        `;

        this.summaryContent.innerHTML = summaryHtml;
        this.summaryArticle.style.display = 'block';

        // Event listener per bottone AI
        const aiButton = document.getElementById('generateAISummary');
        if (aiButton) {
            aiButton.addEventListener('click', () => this.generateAISummary(results, query));
        }

        // Smooth scroll al riassunto
        setTimeout(() => {
            this.summaryArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    /**
     * Genera riassunto AI avanzato usando Gemini
     */
    async generateAISummary(results, query) {
        if (this.aiSummaryGenerated) {
            return; // Già generato
        }

        const button = document.getElementById('generateAISummary');
        const originalContent = this.summaryContent.innerHTML;
        let originalButtonContent = '';

        try {
            // Mostra loading (controlla che il bottone esista)
            if (button) {
                originalButtonContent = button.innerHTML; // Salva contenuto originale
                button.disabled = true;
                button.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Gemini sta generando il riassunto...</span>
                `;
            }

            this.summaryContent.innerHTML = `
                <div class="ai-loading">
                    <div class="ai-loading-icon">
                        <i class="fas fa-robot fa-3x"></i>
                    </div>
                    <h3>🤖 Gemini 2.5 Flash sta analizzando gli articoli...</h3>
                    <p>Sto generando un riassunto approfondito con analisi critica e collegamenti concettuali.</p>
                    <div class="loading-bar">
                        <div class="loading-bar-fill"></div>
                    </div>
                    <p class="loading-tip"><em>Questo richiede circa 5-10 secondi</em></p>
                </div>
            `;

            // Chiama Netlify Function con retry automatico
            const maxRetries = 3;
            let lastError;
            
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const response = await fetch('/.netlify/functions/summarize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            results: results.slice(0, 5), // Max 5 articoli
                            query: query
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        
                        // Se è 503 (overloaded), ritenta dopo un delay
                        if (response.status === 503 && attempt < maxRetries) {
                            console.log(`Tentativo ${attempt}/${maxRetries} fallito (503), riprovo tra 2 secondi...`);
                            await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Delay progressivo
                            lastError = new Error('Il modello è sovraccarico. Riprovo automaticamente...');
                            continue; // Riprova
                        }
                        
                        throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`);
                    }
                    
                    // Successo! Esci dal loop di retry
                    const data = await response.json();
                    
                    if (data.success && data.summary) {
                        // Mostra riassunto AI (codice esistente continua qui...)
                        this.summaryContent.innerHTML = `
                            <div class="ai-summary-header">
                                <div class="ai-badge">
                                    <i class="fas fa-magic"></i> Riassunto AI Avanzato
                                </div>
                                <div class="ai-metadata">
                                    <span><i class="fas fa-brain"></i> Powered by Gemini 2.5 Flash</span>
                                    <span><i class="fas fa-clock"></i> Generato in ${data.metadata.generationTimeMs}ms</span>
                                    <span><i class="fas fa-file-alt"></i> ${data.metadata.articlesAnalyzed} articoli analizzati</span>
                                </div>
                            </div>
                            
                            <div class="ai-summary-content">
                                ${data.summary}
                            </div>

                            <div class="ai-summary-footer">
                                <p>
                                    <i class="fas fa-lightbulb"></i>
                                    <strong>Nota:</strong> Questo riassunto è stato generato da un'intelligenza artificiale 
                                    e rappresenta un'interpretazione critica degli articoli. Ti invitiamo a leggere i testi 
                                    originali per una comprensione completa.
                                </p>
                                <button id="showBasicSummary" class="secondary-btn">
                                    <i class="fas fa-arrow-left"></i> Torna al riassunto base
                                </button>
                            </div>
                        `;

                        this.aiSummaryGenerated = true;

                        // Event listener per tornare al riassunto base
                        document.getElementById('showBasicSummary')?.addEventListener('click', () => {
                            this.summaryContent.innerHTML = originalContent;
                            this.aiSummaryGenerated = false;
                            const btn = document.getElementById('generateAISummary');
                            if (btn) {
                                btn.addEventListener('click', () => this.generateAISummary(results, query));
                            }
                        });

                        // Smooth scroll
                        setTimeout(() => {
                            this.summaryArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                        
                        return; // Successo! Esci dalla funzione
                        
                    } else {
                        throw new Error(data.error || 'Risposta non valida dal server');
                    }
                    
                } catch (fetchError) {
                    lastError = fetchError;
                    if (attempt < maxRetries) {
                        console.log(`Tentativo ${attempt}/${maxRetries} fallito, riprovo...`);
                        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                        continue;
                    }
                }
            }
            
            // Se arriviamo qui, tutti i retry sono falliti
            throw lastError;

        } catch (error) {
            console.error('Errore durante la generazione del riassunto AI:', error);

            // Riabilita il bottone originale
            if (button) {
                button.disabled = false;
                button.innerHTML = originalButtonContent || `<i class="fas fa-magic"></i> <span>Genera Riassunto AI Avanzato</span>`;
            }

            // Determina il messaggio di errore appropriato
            let errorMessage = error.message;
            let helpText = 'Il servizio AI potrebbe essere temporaneamente sovraccarico. Riprova tra qualche secondo.';
            let showRetry = true;
            
            // Errori specifici con messaggi più chiari
            if (error.message.includes('503') || error.message.includes('overloaded') || error.message.includes('UNAVAILABLE')) {
                errorMessage = 'Il modello Gemini è temporaneamente sovraccarico';
                helpText = 'Google limita le richieste gratuite. Riprova tra 10-30 secondi oppure usa il riassunto base.';
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage = 'Impossibile connettersi al servizio AI';
                helpText = 'Verifica la connessione internet oppure riprova tra qualche secondo.';
            } else if (error.message.includes('404')) {
                errorMessage = 'Servizio AI non trovato';
                helpText = 'Le Netlify Functions non sono configurate correttamente.';
                showRetry = false;
            } else if (error.message.includes('500')) {
                errorMessage = 'Errore del server AI';
                helpText = 'Controlla che la GEMINI_API_KEY sia configurata correttamente.';
                showRetry = false;
            }

            // Mostra errore con fallback
            this.summaryContent.innerHTML = `
                <div class="ai-error">
                    <div class="ai-error-icon">
                        <i class="fas fa-exclamation-triangle fa-3x"></i>
                    </div>
                    <h3>Impossibile generare il riassunto AI</h3>
                    <p><strong>Errore:</strong> ${this.escapeHtml(errorMessage)}</p>
                    <p>${helpText}</p>
                    ${showRetry ? `
                        <button id="retryAI" class="retry-btn">
                            <i class="fas fa-redo"></i> Riprova
                        </button>
                    ` : ''}
                    <button id="showBasicSummaryError" class="secondary-btn">
                        <i class="fas fa-list"></i> Mostra riassunto base
                    </button>
                </div>
            `;

            // Event listeners per i bottoni di errore
            const retryBtn = document.getElementById('retryAI');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                    this.aiSummaryGenerated = false;
                    this.generateAISummary(results, query);
                });
            }

            const showBasicBtn = document.getElementById('showBasicSummaryError');
            if (showBasicBtn) {
                showBasicBtn.addEventListener('click', () => {
                    this.summaryContent.innerHTML = originalContent;
                    this.aiSummaryGenerated = false;
                    // Riabilita il bottone originale
                    const btn = document.getElementById('generateAISummary');
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalButtonContent || `<i class="fas fa-magic"></i> <span>Genera Riassunto AI Avanzato</span>`;
                        btn.addEventListener('click', () => this.generateAISummary(results, query));
                    }
                });
            }
    }

    /**
     * Escape HTML per prevenire XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Escape caratteri speciali regex
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Esporta per uso globale
window.SearchEngine = SearchEngine;

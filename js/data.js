/**
 * DATA MANAGEMENT MODULE
 * Gestisce il caricamento dei dati dal blog WordPress
 * con fallback intelligente su dati di esempio
 */

class DataManager {
    constructor() {
        this.posts = [];
        this.isLoaded = false;
        this.useWordPressAPI = true;
        this.apiEndpoint = 'https://umanesimodigitale.info/wp-json/wp/v2/posts';
        this.statusElement = document.getElementById('apiStatus');
    }

    /**
     * Inizializza e carica i dati con caricamento progressivo
     */
    async initialize() {
        this.showStatus('🔄 Connessione al blog in corso...', 'info');
        
        try {
            // Prima prova a caricare dall'API WordPress (caricamento progressivo)
            await this.loadFromWordPress();
            // NON sovrascriviamo il messaggio - loadFromWordPress gestisce già lo status
        } catch (error) {
            console.warn('Impossibile caricare dall\'API WordPress:', error);
            // Fallback su dati di esempio
            this.loadSampleData();
            this.showStatus(
                '⚠️ Modalità Demo: Usando 8 articoli di esempio. Per caricare tutti i tuoi articoli, verifica le impostazioni CORS dell\'API WordPress', 
                'warning'
            );
        }
        
        this.isLoaded = true;
        return this.posts;
    }

    /**
     * Carica dati dall'API WordPress con caricamento progressivo
     */
    async loadFromWordPress() {
        const maxPosts = 100; // WordPress API limit per pagina
        let allPosts = [];
        let page = 1;
        const maxPages = 10; // Max 1000 post (10 pagine * 100)
        
        // FASE 1: Carica prima pagina IMMEDIATAMENTE (3-5 secondi)
        try {
            const firstPageUrl = `${this.apiEndpoint}?per_page=${maxPosts}&page=1&_embed`;
            const firstResponse = await fetch(firstPageUrl);
            
            if (!firstResponse.ok) {
                throw new Error(`HTTP error! status: ${firstResponse.status}`);
            }
            
            const firstPagePosts = await firstResponse.json();
            allPosts = this.processWordPressPosts(firstPagePosts);
            this.posts = allPosts; // Aggiorna subito con la prima pagina
            
            // Mostra interfaccia SUBITO con i primi 100 post
            this.showStatus(
                `✅ Connesso! ${allPosts.length} articoli caricati (caricamento in background...)`, 
                'success'
            );
            
            // FASE 2: Carica resto in BACKGROUND (non blocca l'interfaccia)
            if (firstPagePosts.length === maxPosts) {
                // Ci sono altre pagine, caricale in background
                this.loadRemainingPostsInBackground(maxPosts, maxPages);
            }
            
        } catch (error) {
            throw error; // Propaghiamo l'errore al chiamante
        }
    }
    
    /**
     * Carica il resto dei post in background senza bloccare l'UI
     */
    async loadRemainingPostsInBackground(maxPosts, maxPages) {
        let page = 2; // Iniziamo dalla seconda pagina
        let hasMore = true;
        
        while (hasMore && page <= maxPages) {
            try {
                const url = `${this.apiEndpoint}?per_page=${maxPosts}&page=${page}&_embed`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    console.warn(`Errore caricamento pagina ${page}:`, response.status);
                    hasMore = false;
                    continue;
                }
                
                const posts = await response.json();
                
                if (posts.length === 0) {
                    hasMore = false;
                } else {
                    const processedPosts = this.processWordPressPosts(posts);
                    this.posts = this.posts.concat(processedPosts);
                    
                    // Aggiorna il contatore in tempo reale
                    this.showStatus(
                        `✅ Connesso! ${this.posts.length} articoli disponibili`, 
                        'success'
                    );
                    
                    page++;
                    
                    // Se abbiamo ricevuto meno post del limite, non ci sono altre pagine
                    if (posts.length < maxPosts) {
                        hasMore = false;
                    }
                    
                    // Piccolo delay per non sovraccaricare il server (200ms)
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            } catch (error) {
                console.warn(`Errore caricamento pagina ${page}:`, error);
                hasMore = false;
            }
        }
        
        console.log(`✅ Caricamento completato: ${this.posts.length} articoli totali`);
    }

    /**
     * Processa i post dall'API WordPress nel formato interno
     */
    processWordPressPosts(wpPosts) {
        return wpPosts.map(post => {
            // Estrai l'immagine in evidenza
            let featuredImage = 'https://via.placeholder.com/600x400/3498db/ffffff?text=Umanesimo+Digitale';
            
            if (post._embedded && post._embedded['wp:featuredmedia']) {
                const media = post._embedded['wp:featuredmedia'][0];
                if (media && media.source_url) {
                    featuredImage = media.source_url;
                }
            }

            // Estrai le categorie
            let categories = [];
            if (post._embedded && post._embedded['wp:term']) {
                const terms = post._embedded['wp:term'];
                if (terms[0]) { // Categorie
                    categories = terms[0].map(cat => cat.name);
                }
            }

            // Pulisci l'excerpt da HTML
            const excerpt = this.stripHtml(post.excerpt.rendered);

            return {
                id: post.id,
                title: this.stripHtml(post.title.rendered),
                excerpt: excerpt,
                content: this.stripHtml(post.content.rendered),
                url: post.link,
                image: featuredImage,
                date: new Date(post.date).toLocaleDateString('it-IT'),
                categories: categories,
                author: post._embedded && post._embedded.author 
                    ? post._embedded.author[0].name 
                    : 'Franco Bagaglia'
            };
        });
    }

    /**
     * Rimuove tag HTML da una stringa
     */
    stripHtml(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    /**
     * Carica dati di esempio per la demo
     */
    loadSampleData() {
        this.posts = [
            {
                id: 1,
                title: "L'Intelligenza Artificiale e l'Etica del Consenso: Riflessioni sull'Uso dei Dati Creativi",
                excerpt: "Una riflessione approfondita sul dilemma etico dell'uso dei contenuti creativi per l'addestramento dell'IA. Fino a che punto possiamo accettare che i nostri dati vengano utilizzati senza consenso esplicito? Un'analisi da umanista digitale sul futuro della creatività nell'era dell'intelligenza artificiale.",
                content: "Il progresso tecnologico ci pone di fronte a domande fondamentali sui diritti digitali e la proprietà intellettuale. Come esperto di umanesimo digitale, credo fermamente che ogni innovazione debba mettere l'essere umano al centro. La questione non è se le aziende tech abbiano il diritto legale di usare i nostri contenuti, ma se dovremmo costruire il futuro dell'IA sulle spalle inconsapevoli dei creator.",
                url: "https://umanesimodigitale.info/etica-ia-consenso",
                image: "https://via.placeholder.com/600x400/2C3E50/ffffff?text=Etica+AI",
                date: "15 Gennaio 2025",
                categories: ["Intelligenza Artificiale", "Etica Digitale", "Diritti Creativi"],
                author: "Franco Bagaglia"
            },
            {
                id: 2,
                title: "Democratizzazione del Sapere: Come l'IA Può Rivoluzionare l'Educazione",
                excerpt: "L'intelligenza artificiale rappresenta un'opportunità straordinaria per democratizzare l'accesso alla conoscenza. Esploriamo come le tecnologie AI possono diventare strumenti di empowerment educativo, abbattendo barriere geografiche ed economiche nell'apprendimento continuo.",
                content: "La democratizzazione del sapere attraverso l'IA non è solo una questione tecnica, ma un atto culturale. Come docente universitario in Intelligenza Artificiale, vedo ogni giorno il potenziale trasformativo di queste tecnologie nell'educazione. L'alfabetizzazione sull'IA è un percorso di crescita e consapevolezza critica che può rafforzare l'apprendimento.",
                url: "https://umanesimodigitale.info/democratizzazione-sapere-ia",
                image: "https://via.placeholder.com/600x400/3498DB/ffffff?text=Educazione+AI",
                date: "10 Gennaio 2025",
                categories: ["Educazione", "Intelligenza Artificiale", "Democratizzazione"],
                author: "Franco Bagaglia"
            },
            {
                id: 3,
                title: "Umanesimo Digitale: Abitare con Responsabilità il Mondo Tecnologico",
                excerpt: "Cosa significa essere un umanista digitale nel 2025? Un viaggio tra tecnologia ed etica, dove la vocazione umanistica guida l'innovazione digitale verso un futuro più consapevole, inclusivo e rispettoso della dignità umana.",
                content: "L'umanesimo digitale è una disciplina che integra la tradizione umanistica con le sfide del mondo digitale. Credo profondamente che la tecnologia, se guidata da un'etica umanistica, possa diventare uno straordinario strumento per sostenere l'apprendimento continuo e la crescita personale. La mia missione è formare menti libere, curiose e capaci di abitare con responsabilità il mondo digitale.",
                url: "https://umanesimodigitale.info/umanesimo-digitale-responsabilita",
                image: "https://via.placeholder.com/600x400/E74C3C/ffffff?text=Umanesimo+Digitale",
                date: "5 Gennaio 2025",
                categories: ["Umanesimo Digitale", "Filosofia", "Tecnologia"],
                author: "Franco Bagaglia"
            },
            {
                id: 4,
                title: "L'IA Conversazionale e il Futuro dell'Interazione Umano-Macchina",
                excerpt: "Come l'intelligenza artificiale conversazionale sta trasformando il modo in cui comunichiamo con le macchine. Dall'assistenza virtuale all'apprendimento personalizzato, esploriamo le sfumature comunicative che rendono l'IA sempre più naturale e accessibile.",
                content: "Le IA conversazionali imparano linguaggi naturali e sfumature comunicative dai contenuti online. Questo processo accelera l'innovazione ma solleva questioni etiche sulla proprietà dei dati linguistici. Come possiamo bilanciare progresso tecnologico e rispetto per i creator che contribuiscono inconsapevolmente a questo apprendimento?",
                url: "https://umanesimodigitale.info/ia-conversazionale-futuro",
                image: "https://via.placeholder.com/600x400/9B59B6/ffffff?text=AI+Conversazionale",
                date: "28 Dicembre 2024",
                categories: ["Intelligenza Artificiale", "NLP", "Comunicazione"],
                author: "Franco Bagaglia"
            },
            {
                id: 5,
                title: "Trasparenza nell'AI: Il Diritto di Sapere Come Vengono Usati i Nostri Dati",
                excerpt: "La trasparenza totale nell'utilizzo dei dati per l'addestramento dell'IA non è solo una necessità etica, ma un diritto fondamentale. Esploriamo le proposte per dashboard dettagliate e sistemi di notifica che restituiscono controllo ai creatori di contenuti.",
                content: "Immagino un futuro dove creator e IA lavorano insieme in modo trasparente e mutuamente benefico. Un mondo dove i creator vengono valorizzati come partner nell'evoluzione dell'IA, le tecnologie diventano strumenti creativi potenzianti (non sostitutivi), e l'innovazione procede di pari passo con l'etica umana.",
                url: "https://umanesimodigitale.info/trasparenza-ai-dati",
                image: "https://via.placeholder.com/600x400/1ABC9C/ffffff?text=Trasparenza+AI",
                date: "20 Dicembre 2024",
                categories: ["Trasparenza", "Privacy", "Intelligenza Artificiale"],
                author: "Franco Bagaglia"
            },
            {
                id: 6,
                title: "L'Interprete nell'Era dell'IA: Nuove Competenze per un Mondo Digitale",
                excerpt: "Come l'intelligenza artificiale può rafforzare l'apprendimento linguistico degli interpreti e offrire strumenti preziosi per comprendere le dinamiche sociali contemporanee. Un approccio innovativo alla formazione linguistica nell'era digitale.",
                content: "Integrare l'AI nei percorsi formativi degli interpreti può rafforzare l'apprendimento linguistico e offrire strumenti preziosi per comprendere le dinamiche sociali del nostro tempo. Non si tratta di sostituire le competenze umane, ma di potenziarle attraverso la tecnologia, mantenendo sempre al centro la dimensione umana della comunicazione.",
                url: "https://umanesimodigitale.info/interprete-era-ia",
                image: "https://via.placeholder.com/600x400/F39C12/ffffff?text=Interpreti+AI",
                date: "15 Dicembre 2024",
                categories: ["Lingue", "Formazione", "Intelligenza Artificiale"],
                author: "Franco Bagaglia"
            },
            {
                id: 7,
                title: "Compensazione Equa per i Creator nell'Economia dell'IA",
                excerpt: "Sistemi di royalty e riconoscimento per chi contribuisce all'addestramento dell'intelligenza artificiale. Una proposta concreta per un ecosistema collaborativo dove l'innovazione tecnologica premia chi alimenta il progresso.",
                content: "Non possiamo permettere che l'innovazione corra più veloce della nostra capacità di comprenderla e controllarla. Dobbiamo essere protagonisti attivi, non spettatori passivi, di questa rivoluzione. Propongo sistemi di compensazione equa che riconoscano il valore del contributo creativo all'evoluzione dell'IA.",
                url: "https://umanesimodigitale.info/compensazione-creator-ia",
                image: "https://via.placeholder.com/600x400/E67E22/ffffff?text=Compensazione+Equa",
                date: "8 Dicembre 2024",
                categories: ["Economia Digitale", "Diritti", "Intelligenza Artificiale"],
                author: "Franco Bagaglia"
            },
            {
                id: 8,
                title: "Machine Learning Etico: Principi per un'IA Responsabile",
                excerpt: "Quali principi etici dovrebbero guidare lo sviluppo del machine learning? Un framework umanistico per garantire che l'intelligenza artificiale rispetti i valori fondamentali della società e della dignità umana.",
                content: "Il machine learning etico richiede un approccio multidisciplinare che integri competenze tecniche, filosofiche e sociali. Come umanista digitale, propongo un framework che mette al centro la trasparenza, l'accountability, la fairness e il rispetto per la privacy e l'autonomia individuale.",
                url: "https://umanesimodigitale.info/machine-learning-etico",
                image: "https://via.placeholder.com/600x400/16A085/ffffff?text=ML+Etico",
                date: "1 Dicembre 2024",
                categories: ["Machine Learning", "Etica", "Responsabilità"],
                author: "Franco Bagaglia"
            }
        ];
        
        this.useWordPressAPI = false;
    }

    /**
     * Mostra messaggio di stato
     */
    showStatus(message, type = 'info') {
        if (!this.statusElement) return;
        
        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle'
        };
        
        this.statusElement.className = `api-status ${type}`;
        this.statusElement.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    }

    /**
     * Ottieni tutti i post
     */
    getPosts() {
        return this.posts;
    }

    /**
     * Ricerca nei post
     */
    search(query) {
        if (!query || query.trim() === '') {
            return [];
        }

        const searchTerms = query.toLowerCase().trim().split(' ');
        
        return this.posts
            .map(post => {
                let score = 0;
                const titleLower = post.title.toLowerCase();
                const excerptLower = post.excerpt.toLowerCase();
                const contentLower = post.content.toLowerCase();
                const categoriesLower = post.categories.join(' ').toLowerCase();

                searchTerms.forEach(term => {
                    // Titolo ha peso maggiore
                    if (titleLower.includes(term)) score += 10;
                    
                    // Categorie hanno peso medio-alto
                    if (categoriesLower.includes(term)) score += 7;
                    
                    // Excerpt ha peso medio
                    if (excerptLower.includes(term)) score += 5;
                    
                    // Content ha peso minore
                    if (contentLower.includes(term)) score += 2;
                });

                return { post, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.post);
    }

    /**
     * Ottieni categorie uniche
     */
    getCategories() {
        const categoriesSet = new Set();
        this.posts.forEach(post => {
            post.categories.forEach(cat => categoriesSet.add(cat));
        });
        return Array.from(categoriesSet).sort();
    }

    /**
     * Suggerimenti di ricerca basati sui contenuti
     */
    getSuggestions(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const queryLower = query.toLowerCase();
        const suggestions = new Set();

        // Cerca nei titoli
        this.posts.forEach(post => {
            if (post.title.toLowerCase().includes(queryLower)) {
                suggestions.add(post.title);
            }
        });

        // Cerca nelle categorie
        this.getCategories().forEach(category => {
            if (category.toLowerCase().includes(queryLower)) {
                suggestions.add(category);
            }
        });

        return Array.from(suggestions).slice(0, 5);
    }
}

// Esporta classe e istanza globale
window.DataManager = DataManager;
const dataManager = new DataManager();
window.dataManager = dataManager;

# 🎓 Chiedi all'Umanesimo Digitale

**Motore di Ricerca Intelligente con AI per il Blog UmanesimoDigitale.info**

Un'applicazione web elegante e funzionale che permette di esplorare oltre 1000 articoli su intelligenza artificiale, etica digitale, educazione e tecnologia del blog [umanesimodigitale.info](https://umanesimodigitale.info).

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![AI](https://img.shields.io/badge/AI-Gemini_1.5-purple.svg)

> 🚀 **Quick Start**: Vuoi iniziare subito? Leggi [QUICK-START.md](QUICK-START.md)  
> 🤖 **Deploy con AI**: Guida completa [NETLIFY-DEPLOY.md](NETLIFY-DEPLOY.md)

---

## 🌟 Caratteristiche Principali

### ✨ Ricerca Semantica Avanzata
- **Ricerca full-text** intelligente nei titoli, contenuti, categorie ed excerpt
- **Algoritmo di scoring** che prioritizza i risultati più rilevanti
- **Suggerimenti automatici** mentre digiti
- **Highlighting dei termini** di ricerca nei risultati

### 🤖 **NOVITÀ: Riassunti AI Avanzati** (Powered by Gemini 1.5)
- **Riassunti generati da AI** con analisi critica approfondita
- **Collegamenti concettuali** tra articoli diversi
- **Tono umanistico** fedele alla filosofia di Franco Bagaglia
- **Modalità ibrida**: riassunto base sempre disponibile + AI opzionale
- **Fallback automatico** se l'AI non è disponibile

### 📊 Visualizzazione Risultati
- **Card eleganti** con immagine, titolo e abstract per ogni articolo
- **Metadati completi**: data, autore, categorie
- **Link diretti** agli articoli originali sul blog
- **Design responsive** ottimizzato per tutti i dispositivi

### 📝 Articolo Riassuntivo Generato
- **Sintesi automatica** basata sui risultati trovati
- **Tematiche principali** estratte automaticamente
- **Punti chiave** da ogni articolo rilevante
- **Suggerimenti di approfondimento** personalizzati

### 🎯 Quiz Interattivi
- **Quiz generati dinamicamente** in base all'argomento cercato
- **5 domande** per testare la comprensione
- **Feedback immediato** con spiegazioni dettagliate
- **Punteggio finale** con valutazione personalizzata

### 🔄 Integrazione WordPress API
- **Caricamento automatico** dall'API REST di WordPress
- **Supporto paginazione** per gestire 1000+ articoli
- **Fallback intelligente** con dati demo se l'API non è accessibile
- **Status indicator** che mostra la modalità di funzionamento

---

## 🚀 Funzionalità Implementate

### ✅ Completate

1. **Interfaccia Utente**
   - ✅ Design sobrio ed elegante
   - ✅ Titolo grande "Chiedi all'Umanesimo Digitale"
   - ✅ Campo di input con autocompletamento
   - ✅ Navigazione a tab (Ricerca / Quiz)
   - ✅ Footer informativo

2. **Sistema di Ricerca**
   - ✅ Ricerca semantica con scoring
   - ✅ Filtri multipli (titolo, contenuto, categorie)
   - ✅ Suggerimenti in tempo reale
   - ✅ Gestione "nessun risultato"

3. **Visualizzazione Risultati**
   - ✅ Card con immagine, titolo, abstract
   - ✅ Metadati (data, autore, categorie)
   - ✅ Link agli articoli originali
   - ✅ Evidenziazione termini di ricerca

4. **Articolo Riassuntivo**
   - ✅ Generazione automatica da risultati
   - ✅ Analisi tematiche
   - ✅ Estrazione punti chiave
   - ✅ Suggerimenti di approfondimento

5. **Quiz Interattivo**
   - ✅ 5 domande per argomento
   - ✅ Opzioni multiple
   - ✅ Feedback con spiegazioni
   - ✅ Punteggio finale

6. **Integrazione Dati**
   - ✅ Connessione WordPress REST API
   - ✅ Gestione paginazione (1000+ post)
   - ✅ Fallback con dati demo
   - ✅ Processing immagini e categorie

---

## 📁 Struttura del Progetto

```
chiedi-umanesimo-digitale/
├── index.html                  # Pagina principale con ricerca
├── guida.html                  # Guida completa all'utilizzo
├── netlify.toml                # 🆕 Configurazione Netlify
├── package.json                # 🆕 Dipendenze Node.js
├── .gitignore                  # 🆕 File da ignorare in Git
├── README.md                   # Documentazione principale
├── QUICK-START.md              # Guida rapida
├── NETLIFY-DEPLOY.md           # 🆕 Deploy con AI su Netlify
├── WORDPRESS-SETUP.md          # Guida configurazione WordPress API
├── DEPLOYMENT.md               # Guida pubblicazione
├── css/
│   └── style.css              # Stili completi (con AI features)
├── js/
│   ├── config.js              # File configurazione opzionale
│   ├── data.js                # Gestione dati e API WordPress
│   ├── search.js              # 🆕 Motore ricerca + AI integration
│   ├── quiz.js                # Sistema quiz interattivo
│   └── app.js                 # Inizializzazione e coordinamento
└── netlify/
    └── functions/
        └── summarize.js        # 🆕 Serverless function per AI
```

### File Principali

- **index.html**: Pagina principale dell'applicazione
- **guida.html**: Tutorial interattivo completo
- **netlify.toml**: 🆕 Configurazione deployment e functions
- **package.json**: 🆕 Dipendenze (Gemini AI SDK)
- **README.md**: Documentazione tecnica e manuale d'uso
- **NETLIFY-DEPLOY.md**: 🆕 Guida step-by-step deploy con AI
- **WORDPRESS-SETUP.md**: Guida troubleshooting WordPress API

### Moduli JavaScript

- **config.js**: Configurazioni personalizzabili (opzionale)
- **data.js**: Caricamento e gestione dati dal blog
- **search.js**: 🆕 Algoritmo di ricerca + integrazione AI
- **quiz.js**: Generazione e gestione quiz interattivi
- **app.js**: Coordinamento generale dell'applicazione

### 🆕 Netlify Functions

- **summarize.js**: Serverless function che:
  - Riceve risultati di ricerca dal browser
  - Chiama Gemini API in modo sicuro (API key server-side)
  - Genera riassunti AI approfonditi
  - Gestisce errori e fallback automatici

---

## 🎨 Design e UX

### Palette Colori
- **Primary**: `#2C3E50` (Blu scuro elegante)
- **Secondary**: `#3498DB` (Blu vivace)
- **Accent**: `#E74C3C` (Rosso per elementi importanti)
- **Background**: `#F8F9FA` (Grigio chiarissimo)

### Typography
- **Titoli**: Playfair Display (serif elegante)
- **Testo**: Inter (sans-serif moderna e leggibile)

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## 🤖 Riassunti AI con Gemini

### Come Funziona

Il sito offre una **modalità ibrida intelligente**:

#### Riassunto Base (Algoritmo)
- ✅ Sempre disponibile
- ✅ Veloce (istantaneo)
- ✅ Privacy totale (tutto client-side)
- ✅ Gratis (nessun costo)
- ℹ️ Usa algoritmi euristici per estrarre tematiche e punti chiave

#### Riassunto AI Avanzato (Gemini)
- 🤖 Opzionale (bottone "Genera Riassunto AI")
- ⚡ Veloce (~3-5 secondi)
- 🧠 Analisi approfondita e collegamenti concettuali
- 💰 Costo irrisorio (~$0.0003 per riassunto)
- 🔒 Sicuro (API key mai esposta al browser)

### Architettura

```
Browser                    Netlify Function              Google Gemini
┌──────────┐              ┌──────────────┐              ┌──────────┐
│          │              │              │              │          │
│  Cerca   │─────────────▶│  Risultati   │              │          │
│  "AI"    │              │              │              │          │
│          │              │              │              │          │
│  Click   │              │              │              │          │
│ "Gen AI" │─────POST────▶│ summarize.js │─────API────▶│ Gemini   │
│          │              │              │              │  1.5     │
│          │              │ + API KEY    │              │          │
│          │◀────JSON─────│ (sicura!)    │◀───HTML─────│          │
│          │              │              │              │          │
│ Mostra   │              │              │              │          │
│ Summary  │              │              │              │          │
└──────────┘              └──────────────┘              └──────────┘
```

### Setup Richiesto

Per abilitare i riassunti AI:

1. **Ottieni API Key Gemini** (gratuito):
   - Vai su https://aistudio.google.com
   - Clicca "Get API Key"
   - Copia la chiave

2. **Deploy su Netlify**:
   - Segui la guida [NETLIFY-DEPLOY.md](NETLIFY-DEPLOY.md)
   - Configura `GEMINI_API_KEY` nelle environment variables
   - Deploy automatico!

3. **Test**:
   - Cerca un argomento
   - Clicca "Genera Riassunto AI Avanzato"
   - Aspetta 3-5 secondi
   - Vedi il riassunto! 🎉

### Costi

**Gemini API Free Tier**:
- ✅ 15 richieste/minuto
- ✅ 1,500 richieste/giorno
- ✅ 1M token/giorno

**Esempio Reale**:
```
100 utenti/giorno che usano AI = 100 richieste/giorno
= GRATIS ✅ (ben sotto i limiti)

Costo stimato: $0/mese
```

Anche con 1000+ utenti/giorno rimani nel free tier!

### Fallback Automatico

Se l'AI non è disponibile (API key mancante, quota esaurita, errore):
- ⚠️ L'app mostra un messaggio chiaro
- ✅ Fallback automatico al riassunto base
- ✅ Nessun crash, esperienza utente sempre fluida

---

## ⚙️ Configurazione Avanzata (Opzionale)

Il file `js/config.js` permette di personalizzare vari aspetti dell'applicazione:

### Opzioni Disponibili

```javascript
// Cambia l'endpoint API WordPress
window.WORDPRESS_API_URL = 'https://tuoblog.com/wp-json/wp/v2/posts';

// Limita il numero di post caricati
window.MAX_POSTS = 500;

// Personalizza il numero di domande nei quiz
window.QUIZ_QUESTIONS_COUNT = 10;

// Modifica i pesi della ricerca
window.SEARCH_WEIGHT_TITLE = 15;  // Più peso al titolo
```

Consulta `js/config.js` per la lista completa delle opzioni configurabili.

---

## 🔧 Configurazione WordPress API

### Requisiti
Per caricare i dati reali dal blog WordPress, assicurati che:

1. **WordPress REST API sia abilitata** (di default lo è)
   ```
   https://umanesimodigitale.info/wp-json/wp/v2/posts
   ```

2. **CORS sia configurato** per permettere richieste dal browser

3. **La API non richieda autenticazione** per la lettura pubblica dei post

### 🆘 Problemi di Connessione?

Se vedi sempre "Modalità Demo", consulta la guida dettagliata: **[WORDPRESS-SETUP.md](WORDPRESS-SETUP.md)**

Questa guida include:
- Soluzioni per abilitare CORS
- Come verificare che l'API funzioni
- Troubleshooting completo
- Alternative se non puoi usare l'API

### Testing API
Testa l'accesso all'API aprendo nel browser:
```
https://umanesimodigitale.info/wp-json/wp/v2/posts?per_page=5&_embed
```

Se vedi un JSON con i post, l'API è accessibile! 🎉

---

## 💡 Come Funziona

### 1. Inizializzazione
All'avvio, l'applicazione:
- Tenta di connettersi all'API WordPress
- Carica i post in blocchi (max 100 per pagina)
- Processa immagini, categorie e metadati
- Mostra lo status della connessione

### 2. Ricerca
Quando l'utente cerca:
- I termini vengono analizzati e tokenizzati
- Ogni post riceve un punteggio di rilevanza
- I risultati vengono ordinati per punteggio
- Vengono visualizzati con evidenziazione

### 3. Quiz
Dopo una ricerca:
- Vengono generate 5 domande pertinenti
- Le domande testano comprensione e pensiero critico
- Ogni risposta fornisce feedback educativo
- Al termine viene calcolato il punteggio

### 4. Articolo Riassuntivo
Per ogni ricerca:
- Vengono estratte le tematiche comuni
- Si identificano i punti chiave di ogni articolo
- Viene generato un riassunto coerente
- Si forniscono suggerimenti di approfondimento

---

## 🎯 URI e Parametri Funzionali

### Pagina Principale
- **URI**: `index.html`
- **Descrizione**: Home page con ricerca e risultati

### WordPress API Endpoints (utilizzati internamente)
- **GET**: `https://umanesimodigitale.info/wp-json/wp/v2/posts`
- **Parametri**:
  - `per_page`: Numero di post per pagina (max 100)
  - `page`: Numero pagina
  - `_embed`: Include metadati embedded (immagini, autore, categorie)

### Esempio di chiamata completa:
```javascript
fetch('https://umanesimodigitale.info/wp-json/wp/v2/posts?per_page=100&page=1&_embed')
```

---

## 🚧 Sviluppi Futuri (Raccomandazioni)

### Funzionalità da Aggiungere

1. **Filtri Avanzati**
   - Filtro per data (ultimi 30 giorni, ultimo anno, ecc.)
   - Filtro per categorie multiple
   - Filtro per autore
   - Ordinamento (rilevanza, data, titolo)

2. **Salvataggio e Cronologia**
   - Salva ricerche recenti (localStorage)
   - Articoli preferiti
   - Cronologia quiz completati

3. **Condivisione Social**
   - Bottoni per condividere risultati
   - Share quiz score sui social
   - Condivisione diretta articoli

4. **Analisi Avanzata**
   - Statistiche di utilizzo
   - Termini più cercati
   - Grafico tematiche popolari

5. **Accessibilità Migliorata**
   - Navigazione completa da tastiera
   - Screen reader ottimizzato
   - Modalità ad alto contrasto
   - Dimensione testo personalizzabile

6. **Esportazione Dati**
   - Esporta risultati in PDF
   - Esporta lista articoli in CSV
   - Stampa-friendly version

7. **Multilingua**
   - Interfaccia in inglese
   - Traduzione automatica abstract
   - Quiz in multiple lingue

---

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Styling moderno con CSS Grid e Flexbox
- **JavaScript ES6+**: Logica applicativa
- **WordPress REST API**: Sorgente dati
- **🆕 Google Gemini 1.5 Flash**: AI generativa per riassunti
- **🆕 Netlify Functions**: Serverless backend per AI
- **Font Awesome 6**: Iconografia
- **Google Fonts**: Typography (Inter, Playfair Display)

### Librerie e Framework
- ❌ Nessuna dipendenza JavaScript client-side
- ✅ Vanilla JavaScript puro per massime performance
- ✅ Zero build process - funziona immediatamente
- 🆕 `@google/generative-ai` (solo server-side)

---

## 📊 Modelli Dati

### Struttura Post Interno
```javascript
{
    id: Number,              // ID univoco
    title: String,           // Titolo dell'articolo
    excerpt: String,         // Abstract/riassunto
    content: String,         // Contenuto completo (text only)
    url: String,            // URL articolo originale
    image: String,          // URL immagine in evidenza
    date: String,           // Data formattata (gg/mm/aaaa)
    categories: Array,      // Array di categorie
    author: String          // Nome autore
}
```

### Struttura Quiz
```javascript
{
    id: Number,
    question: String,
    options: [
        {
            text: String,
            correct: Boolean,
            explanation: String
        }
    ]
}
```

---

## 🎓 Best Practices Implementate

### Performance
- ✅ Lazy loading immagini
- ✅ Debouncing per autocomplete
- ✅ Paginazione API per grandi dataset
- ✅ Caching risultati ricerca

### Accessibilità
- ✅ Struttura HTML semantica
- ✅ Attributi ARIA dove necessario
- ✅ Contrasto colori WCAG AA
- ✅ Focus indicators visibili

### SEO-Friendly
- ✅ Meta tags appropriati
- ✅ Titoli gerarchici (H1-H3)
- ✅ Link descrittivi
- ✅ Alt text per immagini

### Sicurezza
- ✅ Escape HTML per prevenire XSS
- ✅ Validazione input utente
- ✅ Nessun eval() o innerHTML non sicuro
- ✅ HTTPS per tutte le risorse esterne

---

## 🐛 Troubleshooting

### Problema: "Modalità Demo" sempre attiva

**Causa**: CORS non abilitato su WordPress o API non accessibile

**Soluzione**:
1. Verifica che l'API sia raggiungibile aprendo:
   ```
   https://umanesimodigitale.info/wp-json/wp/v2/posts?per_page=1
   ```
2. Se non funziona, contatta l'hosting per abilitare CORS
3. Installa il plugin WordPress "REST API CORS"

### Problema: Immagini non si caricano

**Causa**: Featured image non impostata sui post WordPress

**Soluzione**:
1. Imposta un'immagine in evidenza per ogni post
2. L'app usa automaticamente un placeholder se manca

### Problema: Quiz sempre uguale

**Causa**: Quiz è generato dai risultati della ricerca

**Soluzione**:
- Cerca argomenti diversi per quiz diversi
- I quiz si adattano al contenuto trovato

---

## 🚀 Come Pubblicare il Sito

### Versione Base (Senza AI)
Per pubblicare il sito senza i riassunti AI, consulta: **[DEPLOYMENT.md](DEPLOYMENT.md)**

**Quick Start**: Usa la **Tab "Publish"** di GenSpark per un deployment con un click! 

### 🆕 Versione con AI (Consigliata)
Per pubblicare con i riassunti AI powered by Gemini, consulta: **[NETLIFY-DEPLOY.md](NETLIFY-DEPLOY.md)**

**Setup richiesto**:
1. Account Netlify (gratuito)
2. Account GitHub (gratuito)
3. API Key Gemini (gratuita)
4. 15-20 minuti

**Benefici**:
- 🤖 Riassunti AI avanzati
- 🚀 Deploy automatico da GitHub
- 💰 Gratis con uso normale
- ⚡ Veloce e scalabile
- 🔄 Aggiornamenti automatici

---

## 📄 Licenza e Crediti

**Progetto**: Chiedi all'Umanesimo Digitale  
**Versione**: 1.0.0  
**Data**: Gennaio 2025  
**Autore**: Sviluppato con ❤️ per Franco Bagaglia  
**Blog**: [umanesimodigitale.info](https://umanesimodigitale.info)

### Riconoscimenti
- Design ispirato ai principi dell'Umanesimo Digitale
- Contenuti dal blog di Franco Bagaglia
- Font: Google Fonts (Inter, Playfair Display)
- Icone: Font Awesome 6

---

## 📞 Contatti e Supporto

Per domande, suggerimenti o segnalazioni:
- **Blog**: [umanesimodigitale.info](https://umanesimodigitale.info)
- **Tema**: Intelligenza Artificiale, Etica Digitale, Educazione

---

## 🎯 Obiettivi Raggiunti

✅ Motore di ricerca funzionante e intelligente  
✅ Design elegante e professionale  
✅ Visualizzazione risultati completa (titolo, immagine, abstract)  
✅ Articolo riassuntivo generato automaticamente  
✅ Sistema quiz interattivo ed educativo  
✅ Integrazione WordPress API con fallback  
✅ Responsive design per tutti i dispositivi  
✅ Accessibilità e best practices web  

---

**Democratizzare il sapere, una ricerca alla volta.** 🚀📚

*"La mia missione è formare menti libere, curiose e capaci di abitare con responsabilità il mondo digitale." - Franco Bagaglia*

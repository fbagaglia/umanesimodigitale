/**
 * CONFIGURATION FILE (OPTIONAL)
 * 
 * Questo file permette di personalizzare il comportamento dell'applicazione.
 * È completamente opzionale - se non specificato, vengono usati i valori di default.
 */

// ===========================
// CONFIGURAZIONE WORDPRESS API
// ===========================

/**
 * URL dell'endpoint API WordPress
 * Default: https://umanesimodigitale.info/wp-json/wp/v2/posts
 */
// window.WORDPRESS_API_URL = 'https://tuoblog.com/wp-json/wp/v2/posts';

/**
 * Numero massimo di post da caricare
 * Default: 1000 (10 pagine * 100 post)
 */
// window.MAX_POSTS = 1000;

/**
 * Timeout per le richieste API (in millisecondi)
 * Default: 10000 (10 secondi)
 */
// window.API_TIMEOUT = 10000;


// ===========================
// CONFIGURAZIONE RICERCA
// ===========================

/**
 * Numero minimo di caratteri per mostrare suggerimenti
 * Default: 2
 */
// window.MIN_SEARCH_CHARS = 2;

/**
 * Numero massimo di suggerimenti da mostrare
 * Default: 5
 */
// window.MAX_SUGGESTIONS = 5;

/**
 * Peso della ricerca nel titolo (maggiore = più importante)
 * Default: 10
 */
// window.SEARCH_WEIGHT_TITLE = 10;

/**
 * Peso della ricerca nelle categorie
 * Default: 7
 */
// window.SEARCH_WEIGHT_CATEGORIES = 7;

/**
 * Peso della ricerca nell'excerpt
 * Default: 5
 */
// window.SEARCH_WEIGHT_EXCERPT = 5;

/**
 * Peso della ricerca nel contenuto
 * Default: 2
 */
// window.SEARCH_WEIGHT_CONTENT = 2;


// ===========================
// CONFIGURAZIONE QUIZ
// ===========================

/**
 * Numero di domande per quiz
 * Default: 5
 */
// window.QUIZ_QUESTIONS_COUNT = 5;

/**
 * Numero di opzioni per domanda
 * Default: 4
 */
// window.QUIZ_OPTIONS_COUNT = 4;


// ===========================
// CONFIGURAZIONE UI
// ===========================

/**
 * Abilita animazioni smooth scroll
 * Default: true
 */
// window.ENABLE_SMOOTH_SCROLL = true;

/**
 * Durata animazioni (in millisecondi)
 * Default: 300
 */
// window.ANIMATION_DURATION = 300;

/**
 * Delay della ricerca dopo l'ultimo input (debounce)
 * Default: 300 (millisecondi)
 */
// window.SEARCH_DEBOUNCE_DELAY = 300;


// ===========================
// ESEMPIO: PERSONALIZZAZIONE COMPLETA
// ===========================

/*
// Per usare un blog diverso e personalizzare l'esperienza:
window.WORDPRESS_API_URL = 'https://mio-blog.com/wp-json/wp/v2/posts';
window.MAX_POSTS = 500;
window.QUIZ_QUESTIONS_COUNT = 10;
window.MIN_SEARCH_CHARS = 3;
window.SEARCH_WEIGHT_TITLE = 15; // Dai più peso al titolo
*/

/**
 * NETLIFY SERVERLESS FUNCTION
 * Genera riassunti AI avanzati usando Google Gemini
 * 
 * Endpoint: /.netlify/functions/summarize
 * Method: POST
 * 
 * Body: {
 *   results: Array<Post>,
 *   query: string
 * }
 * 
 * NOTA: Usa chiamate REST dirette all'API v1 per accedere a gemini-1.5-flash
 */

exports.handler = async (event, context) => {
    // Gestisci CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Accetta solo POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Method Not Allowed. Use POST.' 
            })
        };
    }

    try {
        // Parse request body
        const { results, query } = JSON.parse(event.body);

        // Validazione input
        if (!results || !Array.isArray(results) || results.length === 0) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Invalid or empty results array' 
                })
            };
        }

        if (!query || typeof query !== 'string') {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Invalid or missing query' 
                })
            };
        }

        // Verifica API key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY non configurata');
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'API key not configured. Please set GEMINI_API_KEY environment variable.' 
                })
            };
        }

        // Limita a max 5 articoli per non superare token limit
        const articlesToSummarize = results.slice(0, 5);

        // Crea prompt strutturato per articolo completo e approfondito
        const prompt = `Sei Franco Bagaglia, docente universitario in Intelligenza Artificiale e umanista digitale. La tua missione è formare menti libere, curiose e capaci di abitare con responsabilità il mondo digitale.

Un utente ha cercato sul tuo blog il termine: "${query}"

Sono stati trovati questi articoli rilevanti dal blog UmanesimoDigitale.info:

${articlesToSummarize.map((article, index) => `
=== ARTICOLO ${index + 1}: "${article.title}" ===
Data: ${article.date}
URL: ${article.url}
Categorie: ${article.categories.join(', ')}
Estratto: ${article.excerpt}
${article.content ? 'Contenuto completo (estratto): ' + article.content.substring(0, 800) + '...' : ''}
`).join('\n')}

---

COMPITO:
Scrivi un articolo COMPLETO e APPROFONDITO (minimo 800 parole) che sintetizzi questi contenuti secondo i valori dell'Umanesimo Digitale.

L'articolo DEVE:

1. **INTRODUZIONE CONTESTUALE** (2-3 paragrafi)
   - Contestualizza la ricerca dell'utente nel panorama dell'Umanesimo Digitale
   - Spiega perché questo tema è rilevante oggi
   - Anticipa i temi chiave che saranno trattati

2. **COLLEGAMENTI CROSS-ARTICOLI** (fondamentale!)
   - Evidenzia i collegamenti concettuali tra i diversi articoli
   - Cita titoli specifici e date degli articoli
   - Mostra come le idee si sviluppano attraverso i diversi testi
   - Esempio: "Come evidenziato nell'articolo '[TITOLO]' del [DATA]..."

3. **ANALISI CRITICA APPROFONDITA** (4-5 paragrafi)
   - Analizza le tematiche principali emerse
   - Usa il tuo tono critico, umanistico e accessibile
   - Evidenzia l'importanza etica degli argomenti
   - Collega teoria e pratica, AI e umanesimo

4. **TEMI CHIAVE E CONNESSIONI** (sezione strutturata)
   - Identifica 3-5 temi chiave emersi
   - Per ogni tema, mostra i collegamenti tra articoli diversi
   - Usa citazioni e riferimenti specifici

5. **PERCORSI DI APPROFONDIMENTO** (sezione finale)
   - Suggerisci letture specifiche tra gli articoli analizzati
   - Proponi un percorso logico di approfondimento
   - Stimola il pensiero critico con domande aperte

6. **CONCLUSIONE ISPIRANTE**
   - Sintetizza il messaggio principale
   - Richiama la missione dell'Umanesimo Digitale
   - Invita all'azione o alla riflessione

STILE:
- Usa il tuo tono caratteristico: spiritoso, diretto, innovativo, loquace
- Includi riferimenti culturali e filosofici quando appropriato
- Mantieni un equilibrio tra rigore accademico e accessibilità
- Non aver paura di prendere posizioni chiare

FORMATO HTML:
Usa SOLO questi tag (NO <html>, <body>, <head>):
- <h3> per titoli di sezione principali
- <h4> per sottotitoli
- <p> per paragrafi (almeno 10-15 paragrafi!)
- <ul> e <li> per liste
- <strong> per enfasi importanti
- <em> per citazioni, termini tecnici o concetti chiave
- <blockquote> per citazioni letterali dagli articoli

LUNGHEZZA:
L'articolo deve essere COMPLETO e SOSTANZIOSO. Non interromperti a metà. Scrivi almeno 800-1000 parole.

Inizia ADESSO con un'introduzione coinvolgente e prosegui fino alla conclusione.`;


        // Log per debugging (visibile in Netlify logs)
        console.log(`Generating AI summary for query: "${query}" with ${articlesToSummarize.length} articles`);

        // Chiama direttamente l'API REST v1 di Gemini
        // NOTA: Usiamo gemini-2.5-flash (il più recente e performante della famiglia Flash)
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192, // Aumentato per articoli completi e dettagliati
            }
        };

        const startTime = Date.now();
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', response.status, errorData);
            throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        const endTime = Date.now();
        
        // Estrai il testo dalla risposta
        const summary = data.candidates[0].content.parts[0].text;

        // Log performance
        console.log(`AI summary generated in ${endTime - startTime}ms`);
        console.log(`Summary length: ${summary.length} characters`);

        // Risposta di successo
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600' // Cache 1 ora
            },
            body: JSON.stringify({ 
                success: true,
                summary: summary,
                metadata: {
                    articlesAnalyzed: articlesToSummarize.length,
                    query: query,
                    generationTimeMs: endTime - startTime,
                    timestamp: new Date().toISOString()
                }
            })
        };

    } catch (error) {
        // Log errore completo
        console.error('Error in summarize function:', error);
        console.error('Error stack:', error.stack);

        // Risposta di errore
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: error.message,
                type: error.name,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            })
        };
    }
};

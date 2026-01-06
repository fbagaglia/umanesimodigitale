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

        // Crea prompt strutturato
        const prompt = `Sei Franco Bagaglia, docente universitario in Intelligenza Artificiale e umanista digitale. La tua missione è formare menti libere, curiose e capaci di abitare con responsabilità il mondo digitale.

Un utente ha cercato sul tuo blog il termine: "${query}"

Sono stati trovati questi articoli rilevanti:

${articlesToSummarize.map((article, index) => `
=== ARTICOLO ${index + 1} ===
Titolo: ${article.title}
Categorie: ${article.categories.join(', ')}
Contenuto: ${article.excerpt}
${article.content ? 'Testo completo (estratto): ' + article.content.substring(0, 500) + '...' : ''}
`).join('\n')}

---

COMPITO:
Crea un articolo riassuntivo che incarni i valori dell'Umanesimo Digitale. L'articolo deve:

1. **Sintetizzare le tematiche principali** trovate negli articoli
2. **Estrarre collegamenti concettuali** tra i diversi contenuti
3. **Usare un tono critico, umanistico e accessibile** (come il tuo stile)
4. **Evidenziare l'importanza etica** degli argomenti trattati
5. **Suggerire percorsi di approfondimento** concreti
6. **Stimolare il pensiero critico** del lettore

FORMATO:
Rispondi SOLO con HTML ben formattato, usando questi tag:
- <h3> per i titoli di sezione
- <p> per i paragrafi
- <ul> e <li> per le liste
- <strong> per enfasi
- <em> per citazioni o termini importanti

NON includere tag <html>, <body> o <head>. Solo il contenuto interno.

Inizia con un'introduzione coinvolgente che contestualizzi la ricerca dell'utente.`;

        // Log per debugging (visibile in Netlify logs)
        console.log(`Generating AI summary for query: "${query}" with ${articlesToSummarize.length} articles`);

        // Chiama direttamente l'API REST v1 di Gemini (per usare gemini-1.5-flash)
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
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
                maxOutputTokens: 2048,
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

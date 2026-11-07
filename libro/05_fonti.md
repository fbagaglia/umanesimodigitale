# Fonti

Tutte le fonti di questo capitolo sono state consultate direttamente nella giornata del **7 novembre 2026**. Per ogni elemento è indicato che cosa è stato verificato lì.

## Fonti primarie — dati dei plugin

**API pubblica del repository di WordPress.org** (`api.wordpress.org/plugins/info/1.2/`), interrogata per singolo slug e per ricerca.

Valori verificati (installazioni attive, versione, valutazione, data dell'ultimo aggiornamento):

| Slug | Installazioni | Versione | Ultimo agg. |
|---|---|---|---|
| `vibe-ai` (WPVibe) | 100.000 | 1.21.7 | 05/11/2026 |
| `ai-engine` | 90.000 | 3.9.2 | 06/11/2026 |
| `mcp-adapter` | 60.000 | 0.7.1 | 16/10/2026 |
| `uncanny-automator` | 40.000 | 8.0.2 | 06/11/2026 |
| `easy-mcp-ai` | 30.000 | 2.4.0 | 05/11/2026 |
| `royal-mcp` | 10.000 | 1.5.15 | 06/11/2026 |
| `miniorange-secure-mcp-server` | 9.000 | 1.5.6 | 05/11/2026 |
| `enable-abilities-for-mcp` | 5.000 | 2.15.0 | 06/11/2026 |
| `wsp-mcp-ai-agents-connector` | 3.000 | 2.9.7 | 29/10/2026 |
| `cowboy-mcp` | 2.000 | 1.7.7 | 07/11/2026 |
| `agent-abilities-for-mcp` | 900 | 1.11.0 | 06/11/2026 |
| `stifli-flex-mcp` | 900 | 3.6.1 | 13/10/2026 |
| `jetpack` | 3.000.000 | 16.4 | 03/11/2026 |
| `aicom` | **70** | 3.24.1 | 05/11/2026 |
| `synapost` | **10** | 3.6.6 | 28/10/2026 |
| `dpa-ai-assistant` | **10** | 0.4.1 | 24/06/2026 |
| `members` | 300.000 | 3.3.1 | 30/10/2026 |
| `aryo-activity-log` | 200.000 | 2.18.0 | 28/10/2026 |
| `code-snippets` | 1.000.000+ | 4.1.0 | 06/11/2026 |

**Slug inesistenti sul repository** (verificati con esito 404): `wpvibe` (il nome reale è `vibe-ai`), `ai-commander`, `wordpress-mcp-adapter`, **`ai-engine-pro`** — la versione Pro di AI Engine è commerciale e non è distribuita su WordPress.org.

Dati letti anche per AI Engine: valutazione **98/100** su **876 recensioni**, **19 thread di supporto su 19 risolti**, richiede **PHP 8.1**, dichiarato testato fino a **WordPress 7.1.4**.

## Fonti primarie — documentazione e pagine ufficiali di AI Engine

- **Scheda del plugin sul repository** (`wordpress.org/plugins/ai-engine/`) — descrizione delle funzionalità, elenco degli strumenti MCP, FAQ, numero di strumenti (oltre 140 con gli add-on; «66 nella versione gratuita»).
- **Changelog di AI Engine Pro** (`meowapps.com/products/ai-engine-pro/changelog`) — verifica della versione **3.9.2 del 6 novembre 2026**, e delle novità introdotte con la 3.9.0 e 3.9.1 (MCP Undo, approvazioni, modifica blocco per blocco, supporto ai plugin SEO, correzioni di sicurezza).
- **«AI Engine MCP: The Facts»** (`meowapps.com/ai-engine/mcp-facts/`) — pagina dichiarata come verificata sul codice della versione 3.9.1 il 6 novembre 2026. Da qui: 66 strumenti nella versione gratuita, oltre 100 con la Pro, oltre 200 con la famiglia Meow; gratis senza account né limiti giornalieri; undo a 30 giorni; «Ask Before»; Drafts Only; read-only; Editor Access.
- **Documentazione tecnica** (`ai.thehiddendocs.com`), con la struttura delle pagine ricavata dalla *sitemap* del sito:
  - `/mcp/` — server MCP, accesso e autorizzazione, Read-only, Editor Access, Bearer Token e suoi Access Level, Connessioni, Undo e Change History, filtri PHP `mwai_allow_mcp` e `mwai_mcp_callback`;
  - `/functions-or-mcp/` — la distinzione tra **funzioni**, **MCP server** e **MCP client** (Orchestration) e la tabella decisionale;
  - `/knowledge/` — che cos'è un embedding, il funzionamento del RAG, la precisazione che *non* è addestramento del modello;
  - `/services/wordpress-locally-hosted/` — l'ambiente **Internal (WordPress DB)**, i vantaggi, lo svantaggio e il limite dichiarato di circa **20.000 frammenti**;
  - `/add-embeddings/` — il modello di embedding e le **dimensioni** dei vettori, le sincronizzazioni automatiche;
  - `/limits/` — la scheda **Insights**, i limiti per **Utenti / Ospiti / Sistema**, la distinzione tra finestra *assoluta* e *scorrevole*;
  - `/public-rest-api/` — l'API pubblica `/wp-json/mwai/v1/…`, il modulo **Public API**, il Bearer Token in Settings → REST API;
  - `/add-engine/` — come si aggiunge un ambiente per provider non supportati (filtri `mwai_engines` e `mwai_init_engine`).

## Fonti primarie — prezzi dei modelli

**API di OpenRouter** (`openrouter.ai/api/v1/models`), interrogata il 7 novembre 2026: **460 modelli** in catalogo. Da qui i prezzi per milione di token e l'osservazione — verificata e rilevante — che **nel catalogo non figura alcun modello di embedding**.

Prezzi riportati nel capitolo (input/output per milione di token):

| Modello | Prezzo |
|---|---|
| `deepseek/deepseek-v4-pro` | 0.698 / 1.395 |
| `deepseek/deepseek-v4.1-flash` | 0.051 / 0.567 |
| `deepseek/deepseek-v4-flash` | 0.091 / 0.182 |
| `deepseek/deepseek-v4-flash-vision-exp` | 0.440 / 1.320 |
| `google/gemini-3.5-flash-lite` | 0.300 / 2.500 |
| `google/gemini-3.1-flash-image` | 0.500 / 3.000 |
| `google/gemini-nano-banana-2.1` | 1.500 / 7.500 |

## Fonti primarie — misure sul sito del caso di studio

Rilevate direttamente su `umanesimodigitale.info` il **7 novembre 2026, ore 13:32–13:40 CET**, attraverso il collegamento MCP:

- **Ping e identità del server**: risposta del server «Umanesimo Digitale».
- **Elenco dei plugin installati** con le rispettive versioni (AI Engine Pro 3.9.2, WPBot 8.9.2, WPBot Pro 15.7.1, Visitor Form 0.1.7, Web Search 1.0.3, Rank Math SEO 1.0.278, Code Snippets 3.10.2, UpdraftPlus 2.26.1.0, e altri).
- **Conteggi dei contenuti**: 606 articoli pubblicati, 541 bozze, 18 pagine, 44 categorie, 0 tag.
- **Inventario degli strumenti MCP** esposti al momento della misura: **54** (elenco completo letto e raggruppato per famiglia).
- **Cronologia delle modifiche via MCP** degli ultimi 30 giorni: nessuna.
- **Elenco dei namespace REST** pubblici, letto dalla radice `/wp-json/`.
- **Presenza dei chatbot nella pagina pubblica**: conteggio delle occorrenze dei marcatori `wp-chatbot` (294), `wpbot` (68) e `mwai` (0) nell'HTML della home.
- **Generazione di tre link di anteprima condivisibili** per altrettante bozze (ID 20044, 20006, 17779), con scadenza a 7 giorni e non indicizzati.

## Nota sulle fonti non primarie

Il capitolo non cita come fonte articoli divulgativi, elenchi di plugin, né conversazioni con modelli linguistici. Dove il testo confronta le proprie conclusioni con quelle di un testo divulgativo precedente — in particolare sugli elenchi di plugin «da prendere in considerazione» — lo fa misurando i numeri sul repository ufficiale, che è l'unico modo per distinguere un prodotto adottato da un prodotto soltanto pubblicato.

---

*Verifica dei dati: 7 novembre 2026. Le versioni dei plugin e i prezzi dei modelli cambiano rapidamente: prima di riutilizzare queste informazioni, ripetete le tre interrogazioni indicate qui sopra — repository WordPress.org, documentazione AI Engine, catalogo OpenRouter.*

---

## Fonti aggiunte per la Parte V

**Documentazione di WPBot Pro** (`wpbot.pro/docs/`) — struttura dei moduli, categorie della knowledge base (Chat Session Module, Conversational Form Builder Pro, Chatbot STR Pro, Messenger/WhatsApp/Telegram module, Webhook Integration, Live Chat, Voice, Multi-Language, WooCommerce, Export/Import), e la pagina comparativa **«WPBot Free vs Pro 2026»**, da cui provengono i tre piani (Starter ~39 $/anno, Professional ~99 $/anno, Master ~189 $/anno) e la tabella di ciò che ciascuno sblocca.

**Repository ufficiale di WordPress.org** — `chatbot` (WPBot, QuantumCloud): versione 8.9.2, **5.000 installazioni attive**, 94/100 su 124 recensioni, aggiornato il 06/11/2026. Verificato anche `wpbot` (WPBot Automator, prodotto distinto, versione 1.3.2, 10 installazioni): **da non confondere con WPBot**.

**Meow Apps** (`meowapps.com`) — presentazione della casa produttrice («l'azienda AI per WordPress», oltre 350.000 siti) e la famiglia di plugin: AI Engine, SEO Engine, Code Engine, Media Cleaner, Database Cleaner, Media File Renamer, Perfect Images, Social Engine, Meow Lightbox, Photo Engine. Pagina dei download (`meowapps.com/products/`) per l'elenco degli **add-on**: User Memory, DeepSeek, Content Parser, Visitor Form, Woo Basics, Quick Actions, Dynamic Keys, Web Search.

**Misure sul sito del caso di studio, 7 novembre 2026, ore 14:40–15:00 CET** — conteggio delle rotte REST per namespace, letto da `/wp-json/`: `mwai/v1` 122 rotte, `mwai-ui/v1` 14, `mwai-visitor-form/v1` 8, `meow-licenser/mwaiweb/v1` 3, `wpbot/v1` 4, `qcwpbot/v1` **75** (di cui 73 sotto `/email/…` e 1 `leadfinder/settings`), `mcp` + `mcp/v1` 27. Registrazione OAuth riverificata sull'endpoint `/wp-json/mcp/v1/oauth/register`.

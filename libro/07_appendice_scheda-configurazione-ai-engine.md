# Appendice A — Scheda di configurazione di AI Engine

**Sito**: umanesimodigitale.info · **Plugin**: AI Engine (Pro) 3.9.2 · **Riempita il**: 7 novembre 2026
**Must dichiarati**: OpenRouter come unico provider · DeepSeek *flash* come modello di lavoro

> In questa scheda **non compare alcuna credenziale**, per scelta: le chiavi API vivono in un solo posto (l'Environment del plugin), non nei documenti. Dove serve una chiave, la riga dice *«già presente»*.

---

## A. Che cosa è accertato (misurato dall'esterno, senza entrare in bacheca)

| Voce | Stato verificato |
|---|---|
| Plugin attivo e aggiornato | **AI Engine (Pro) 3.9.2** — è l'ultima release (6/11/2026) |
| Server MCP | **Attivo**: risponde all'handshake, 54 strumenti esposti |
| Modalità di scrittura | **Drafts Only** — l'agente crea bozze, non pubblica |
| Autenticazione dell'agente | Bearer token condiviso, **dentro il percorso** dell'URL (`/wp-json/mcp/v1/<token>`) |
| Attività dell'agente | **Zero scritture via MCP** negli ultimi 30 giorni |
| Add-on con licenza registrata | **Web Search** e **Visitor Form** (entrambi hanno registrato il proprio endpoint di licenza) |
| API del plugin | `mwai/v1` (122 rotte) e `mwai-ui/v1` (14 rotte) **registrate** |
| Public API verso l'esterno | **Chiusa**: le rotte rispondono `401 rest_forbidden` agli anonimi → *default corretto, da mantenere* |
| Chatbot verso i visitatori | **AI Engine non è attivo sul frontend** (nessuno script `mwai` nella home) |
| Sottosistema attività/cron | Presente: `helpers/task_run`, `run_cron`, `cron_events`, `create_post`, `generate_image_meta`, `approve_media` |
| OAuth MCP | **Ora utilizzabile**: la registrazione dinamica dei client risponde e rilascia un `client_id` |

**In una riga**: il plugin è installato bene, aggiornato, e con i default di sicurezza corretti. Il canale verso l'agente funziona. Quello che manca non è il funzionamento: è la **taratura**.

---

## B. Che cosa non è leggibile da fuori e va verificato in bacheca

Le nove voci che seguono sono l'intera configurazione sensibile di AI Engine. Per ciascuna: dove si trova e il valore da impostare **dato il must OpenRouter + DeepSeek flash**.

| # | Voce | Dove | Valore da impostare / verifica |
|---|---|---|---|
| 1 | **Environment OpenRouter** | Settings → AI → *Environments for AI* | Uno solo, di tipo **OpenRouter**; chiave *già presente*; elenco modelli aggiornato con **Refresh models**. Se esistono altri environment non usati, vanno rimossi: un provider in più è una superficie in più |
| 2 | **Slot Default** | Settings → AI → *Default Environments for AI* | **`deepseek/deepseek-v4.1-flash`** — multimodale, contesto 1M, 0.051 / 0.567 per milione di token. È il modello di lavoro |
| 3 | **Slot Fast** | come sopra | **`deepseek/deepseek-v4-flash`** — 0.091 / 0.182. Per riassunti, categorie, tag, classificazioni |
| 4 | **Slot Vision** | come sopra | Lasciare **`deepseek/deepseek-v4.1-flash`** (vede già le immagini) oppure `deepseek/deepseek-v4-flash-vision-exp` |
| 5 | **Slot Images** | come sopra | **`google/gemini-3.1-flash-image`** (0.500 / 3.000) se serve generare copertine; altrimenti **vuoto** |
| 6 | **Slot Embeddings** | come sopra | **Risulta già configurato** con `Qwen/Qwen3-Embedding-0.6B`, **1024 dimensioni** — quindi esiste un ambiente di embeddings separato (l'API modelli di OpenRouter non espone alcun modello di embedding). Da confermare, e da **non cambiare** senza mantenere le 1024 dimensioni |
| 7 | **Slot Audio / JSON** | come sopra | Audio: **vuoto** (il vocale realtime richiede OpenAI). JSON: `deepseek/deepseek-v4-flash` |
| 8 | **Moduli** | Modules | Accesi: **AI Copilot**, **AI Assistant**, **Workspace**, **MCP**, **Insights**. Spento: **Chatbot** (il pubblico lo serve WPBot). Knowledge: spento finché non c'è un modello di embedding. Forms: attivo solo se si usa Visitor Form |
| 9 | **MCP Tool Sets** | Settings → MCP → *Tool Sets* | Oggi risultano **54 strumenti** contro i 66 dichiarati nella versione gratuita: alcuni gruppi sono spenti. Decidere quali **lasciare spenti** (utenti, plugin, temi, database, opzioni: bene spenti) e quali accendere |
| 10 | **Access Level del Bearer Token** | Settings → MCP → *Bearer Token* | Verificare che **non** sia `Admin`. Con Drafts Only attivo, `Read-Write` è sufficiente; `Read-Only` per l'analisi |
| 11 | **Insights e limiti** | Modules → *Tools & Insights*, poi scheda Insights | **Accendere** (senza, i limiti non vengono applicati) e impostare i tre livelli: **Utenti**, **Ospiti**, **Sistema**. Unità: dollari o token. Finestra: *assoluta* per il calendario, altrimenti scorrevole |
| 12 | **Dati delle query** | Settings → Others → *Queries Data* | Accendere per avere i log delle richieste; impostare la **Retention** |
| 13 | **Public API** | Settings → REST API | **Lasciare chiusa** (verificato: risponde 401 agli anonimi). È il comportamento giusto |
| 14 | **Undo e cronologia** | Settings → MCP | Verificare che la cronologia a **30 giorni** e le approvazioni siano attive, e che l'agente veda `mcp_undo_change` |
| 15 | **Knowledge / archivio vettoriale** | scheda Knowledge + Settings → Knowledge | Ambiente impostato su **Chroma** (servizio esterno): **in errore da 56 giorni**, messaggio *«Billing limit exceeded»*. Min Score 30%, Max Results 10, auto-sync attivo. `Query Mode` è una **modalità di prova**, non un interruttore: a decidere l'uso della memoria è la selezione dell'ambiente **nelle impostazioni del chatbot** |
| 16 | **Orchestration** (il secondo MCP) | Modules → *MCP & Agents* → Orchestration (Pro) → Settings → Orchestration | Se spento: bene così. Se si volesse accendere, **richiede che il chatbot usi un modello OpenAI o Anthropic** — quindi non funziona con DeepSeek via OpenRouter. Da decidere solo se un assistente deve chiamare servizi esterni |

**Le sei voci che contano davvero**, in ordine di priorità: **15** (Knowledge: l'archivio è in errore e la memoria del sito è ferma), **11** (Insights e limiti), **9** (Tool Sets), **10** (Access Level), **2-3** (slot Default e Fast), **8** (decisione sul modulo Chatbot).

---

## C. Il must «DeepSeek flash»: come si traduce in configurazione

Il modello flash è la scelta giusta per questo sito, e i numeri lo confermano. Costi calcolati sui prezzi OpenRouter del 7 novembre 2026:

| Scenario | `deepseek-v4.1-flash` | `deepseek-v4-flash` | `deepseek-v4-pro` |
|---|---|---|---|
| Classificare una bozza (1.500 token letti / 250 scritti) | 0.0002 $ | 0.0002 $ | 0.0014 $ |
| Un lotto da 20 bozze con sintesi (30k / 3k) | 0.0032 $ | 0.0033 $ | 0.0251 $ |
| **Triage completo delle 541 bozze** (28 lotti, 840k / 84k) | **0.0905 $** | 0.0917 $ | 0.7035 $ |
| Riscrivere un articolo lungo (12k / 9k) | 0.0057 $ | **0.0027 $** | 0.0209 $ |
| Generare 5 tag su tutti i 606 articoli (545k / 73k) | 0.0690 $ | **0.0629 $** | 0.4821 $ |

Due conclusioni operative:

1. **Il costo non è il problema.** Il triage completo dell'arretrato editoriale costa **nove centesimi**. Il vincolo non è economico: è di configurazione e di metodo.
2. **I due flash vanno divisi per compito.** Per lavori a **input lungo e output corto** (classificare, etichettare, riassumere) i due modelli sono equivalenti, e `v4-flash` è marginalmente migliore. Per lavori a **output lungo** (riscrivere, generare) `v4.1-flash` conviene — e vede le immagini. Da qui l'assegnazione degli slot: **Default = v4.1-flash, Fast = v4-flash**.

---

## D. Che cosa manca, in sintesi

| Manca | Perché conta |
|---|---|
| **Insights acceso + limiti impostati** | Senza, i limiti non si applicano: l'impianto è aperto a sorprese |
| **Tool Sets decisi** (54 vs 66) | Oggi sono spenti per caso, non per scelta |
| **Access Level del token verificato** | Il token condiviso agisce come amministratore e non appare tra le connessioni |
| **Slot dei modelli tarati** | Un modello unico per tutto è la ricetta per spendere dieci volte il necessario |
| **Decisione sul chatbot di AI Engine** | Oggi il pubblico è servito da WPBot: va confermato o cambiato, non lasciato ambiguo |
| **Knowledge: archivio vettoriale in errore** | Configurato su Chroma (servizio esterno) e fermo dal 12/09/2026: la memoria del sito non è aggiornata. Tre strade: passare all'archivio interno di WordPress, sistemare Chroma, o spegnere Knowledge |
| **Dati delle query + retention** | Senza, non c'è storico su cui correggere |

**Nota di metodo**: questa scheda è stata scritta dall'esterno. Le voci della sezione B sono le uniche che richiedono una verifica a mano, e ognuna si controlla in meno di un minuto. Alla prossima misura, l'unica riga che cambia è quella — e il resto della scheda resta valido.

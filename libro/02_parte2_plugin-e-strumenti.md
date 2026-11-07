# Parte II — Gli strumenti: quali plugin, scelti come

## 1. Come sono stati verificati i plugin di questo capitolo

Prima di elencare, il metodo. Perché un capitolo sui plugin WordPress invecchia male, e invecchia *male in modo insidioso*: i nomi restano, le installazioni cambiano di ordine di grandezza, e un plugin consigliato con entusiasmo due anni fa oggi può avere settanta installazioni e nessuna recensione.

Ogni plugin citato qui è stato interrogato sul **repository ufficiale di WordPress.org** (l'API pubblica dei plugin), e per ciascuno sono state lette quattro cose:

1. **installazioni attive** — quante persone lo usano davvero;
2. **data dell'ultimo aggiornamento** — se è fermo da mesi, è un problema;
3. **numero di recensioni e voto medio** — una media alta su una recensione sola non dice nulla;
4. **versione di WordPress su cui è dichiarato testato**.

I plugin commerciali non stanno su WordPress.org: se qualcuno ve ne propone il download da un sito terzo, state guardando una copia non autorizzata. Vale anche per AI Engine **Pro**: sul repository esiste solo `ai-engine`, la versione gratuita. Chi propone la «Pro» a quattro dollari la sta distribuendo illegalmente, e insieme al plugin viaggia spesso qualcosa che non era previsto.

*Tutti i dati di questa parte sono verificati il 7 novembre 2026.*

## 2. Tre famiglie, tre mestieri diversi

La confusione più comune quando si parla di «plugin AI per WordPress» è mettere nello stesso elenco cose che non fanno lo stesso mestiere. Le famiglie sono tre, e vanno tenute separate perché si scelgono con criteri diversi.

**Famiglia A — Server MCP.** Trasformano il sito in qualcosa che un agente esterno (Claude, ChatGPT, un agente personale) può comandare. Il loro valore è la *superficie di strumenti* che espongono e le *garanzie di sicurezza* che offrono (permessi, undo, approvazioni). Non scrivono articoli da soli.

**Famiglia B — Automazione e connettori.** Collegano WordPress ad altre applicazioni e costruiscono flussi: quando accade X, fai Y. Non sono pensati per un agente conversazionale, ma per il lavoro ripetitivo.

**Famiglia C — AI editoriale dentro la bacheca.** Chatbot per i visitatori, assistenti di scrittura, generatori di contenuti. Lavorano *dentro* il sito, dove tu li vedi. Sono i più visibili, e sono anche quelli che si sovrappongono più facilmente tra loro.

Un plugin della famiglia A e uno della famiglia C possono convivere benissimo — anzi, i migliori plugin moderni fanno entrambe le cose. Due plugin della famiglia C, invece, quasi sempre si pestano i piedi: due chatbot nello stesso angolo dello schermo sono un errore di progettazione, non una ricchezza.

## 3. I server MCP per WordPress

La tabella che segue è il risultato della ricerca sul repository per i plugin che espongono un server MCP. Li riporto tutti, anche i piccoli, perché *il numero di installazioni è l'informazione più utile che c'è*: distingue in un secondo ciò che è adottato da ciò che è solo pubblicato.

| Plugin | Slug | Versione | Installazioni | Ultimo agg. |
|---|---|---|---|---|
| **WPVibe – MCP Server for WordPress** | `vibe-ai` | 1.21.7 | 100.000 | 05/11/2026 |
| **AI Engine – MCP Server & AI Chatbot** | `ai-engine` | 3.9.2 | 90.000 | 06/11/2026 |
| **MCP Adapter** (progetto ufficiale WordPress) | `mcp-adapter` | 0.7.1 | 60.000 | 16/10/2026 |
| **Uncanny Automator – MCP Server + Automation** | `uncanny-automator` | 8.0.2 | 40.000 | 06/11/2026 |
| **Easy MCP AI – Connect Claude to WordPress** | `easy-mcp-ai` | 2.4.0 | 30.000 | 05/11/2026 |
| **Royal MCP – Secure AI Connector** | `royal-mcp` | 1.5.15 | 10.000 | 06/11/2026 |
| **Secure MCP Server** (miniOrange) | `miniorange-secure-mcp-server` | 1.5.6 | 9.000 | 05/11/2026 |
| **Enable Abilities for MCP** | `enable-abilities-for-mcp` | 2.15.0 | 5.000 | 06/11/2026 |
| **WSP MCP – Free MCP Plugin for WordPress** | `wsp-mcp-ai-agents-connector` | 2.9.7 | 3.000 | 29/10/2026 |
| **Cowboy MCP – Free MCP Server with Undo** | `cowboy-mcp` | 1.7.7 | 2.000 | 07/11/2026 |
| **Agent Abilities for MCP** | `agent-abilities-for-mcp` | 1.11.0 | 900 | 06/11/2026 |
| **Flex MCP – Connect ChatGPT, Claude** | `stifli-flex-mcp` | 3.6.1 | 900 | 13/10/2026 |

E una menzione a parte, per un motivo che si capisce dal nome esteso: **Jetpack**, il plugin generalista con **3 milioni di installazioni attive**, nella sua versione 16.4 si presenta ormai come *«AI Agents & MCP, Security…»*. Non è la strada elegante per collegare un agente, ma è la dimostrazione di un fatto: **il server MCP dentro WordPress è diventato una funzionalità attesa, non una nicchia**. Quando un plugin generalista lo integra nel proprio posizionamento, la partita è chiusa.

Tre osservazioni che valgono più della tabella.

**Primo: la differenza vera non è il numero di strumenti, sono le garanzie.** Chi espone 60 strumenti ma non permette di annullare le modifiche, non supporta la sola lettura o non chiede approvazione prima di cancellare, ha costruito un'interfaccia — non un sistema. Il numero di strumenti è la parte facile; la parte difficile è cosa succede quando uno strumento fa la cosa sbagliata.

**Secondo: l'ecosistema si sta consolidando su due standard** — il **protocollo MCP** sul lato agenti, e la **Abilities API** sul lato WordPress. I plugin che resteranno sono quelli che si appoggiano a questi due, invece di inventarsi un formato proprietario.

**Terzo: WPVibe e AI Engine sono i due nomi che si contendono il primo posto**, con numeri vicini (100.000 contro 90.000 installazioni) e strategie diverse. È interessante notare che la documentazione di AI Engine dedica una pagina esplicita al confronto con WPVibe: quando due prodotti si citano a vicenda, significa che si considerano avversari veri.

## 4. I plugin «consigliati» che quasi nessuno usa

Questa sezione è la più utile di tutto il capitolo, ed è quella che di solito manca.

In giro si trovano elenchi di plugin AI «da prendere seriamente in considerazione». Alcuni di quei nomi esistono davvero, ma i numeri raccontano una storia diversa da quella dell'elenco:

| Plugin | Installazioni | Recensioni | Ultimo agg. | Che cosa significa |
|---|---|---|---|---|
| **AICOM – AI Commander** | **70** | 1 | 05/11/2026 | Esiste, è aggiornato, ma non è adottato: non è un pilastro |
| **SynaPost** | **10** | 0 | 28/10/2026 | Progetto agli inizi, nessun riscontro reale |
| **DPA AI Assistant** | **10** | 0 | 24/06/2026 | Fermo da mesi e testato su una versione vecchia |

Nessuno di questi è «falso». Ma consigliare un plugin con **70 installazioni e una recensione** come se fosse una delle scelte principali è un errore di giudizio, non un'opinione. Un plugin del genere può anche diventare importante — ma oggi lo stai installando come *beta tester*, e nello specifico stai dando accesso ai tuoi contenuti a un codice che quasi nessuno ha ancora messo sotto stress.

**La regola che se ne ricava**: prima di installare un plugin che gestisce i tuoi contenuti, guardate tre numeri in questa sequenza — installazioni, data dell'ultimo aggiornamento, numero di recensioni. Sotto le mille installazioni si sta sperimentando; fermo da più di sei mesi su un plugin che tocca contenuti si sta ereditando un problema; una media perfetta su una recensione non è un dato.

## 5. L'AI editoriale dentro la bacheca

La famiglia che lavora dentro il sito merita una trattazione diversa, perché i suoi rischi sono diversi. Un server MCP si giudica da quanto sa *limitarsi*; un assistente editoriale si giudica da quanto è *utile mentre scrivi*.

Le funzionalità che contano davvero sono sempre le stesse quattro:

1. **Riscrivere e correggere** un testo già scritto, senza perdere la voce dell'autore. È la funzione più richiesta e la più delicata: un modello che «migliora» uno stile personale lo cancella.
2. **Generare una prima stesura** da un'idea, che poi l'autore riscrive.
3. **Tradurre**, mantenendo il registro. Per un magazine multilingue è la funzione che fa risparmiare più tempo.
4. **Proporre metadati**: titolo, occhiello, categoria, parole chiave. È il lavoro noioso che nessuno vuole fare e che l'AI fa oggettivamente bene.

A queste si aggiungono due funzioni di sistema: la **memoria del sito** (una base di conoscenza sui tuoi contenuti, di cui parleremo nella Parte III) e i **moduli per i visitatori** (chatbot, form intelligenti, ricerca semantica).

Qui però va detto con chiarezza un problema che si vede raramente affrontare: **avere due assistenti AI installati sullo stesso sito non raddoppia il valore, raddoppia i costi e dimezza la coerenza.** Due chatbot diversi rispondono in modo diverso alla stessa domanda; due generatori diversi scrivono in due stili diversi; entrambi consumano token, e le metriche di consumo si dividono tra due cruscotti. La scelta giusta, nella pratica, è quasi sempre una sola: **un unico strato AI editoriale**, e tutto il resto delegato ad altri strumenti.

## 6. I plugin che non sono AI ma servono all'agente

C'è una categoria che nessun elenco di «plugin AI» riporta mai, e che invece è la più importante quando il progetto smette di essere una prova e diventa un sistema in produzione. Sono i plugin che rendono l'agente **governabile**.

| Plugin | Installazioni | Perché serve con un agente |
|---|---|---|
| **Members** | 300.000 | Comporre ruoli e capacità su misura: il modo pulito di dare a un agente esattamente i permessi che gli servono |
| **Activity Log** | 200.000 | Registro delle modifiche, orientato esplicitamente anche ai cambi fatti dagli agenti: l'audit trail |
| **Code Snippets** | 1.000.000+ | Registrare funzionalità e *Abilities* senza toccare i file del tema: il modo per dare all'agente nuovi strumenti su misura |
| **UpdraftPlus** (o equivalente) | oltre 2.000.000 | Il backup serio prima di qualunque operazione massiva |
| **WP Bulk Delete** | — | Igiene: quando le bozze sono cinquecento, serve una scopa |

Questa tabella contiene una tesi: **il valore di un'integrazione AI non si misura sugli strumenti che aggiunge, ma sui controlli che permette.** Un progetto che installa cinque plugin AI e nessun plugin di ruoli, registro e backup non è un progetto più ricco: è più fragile.

## 7. Tre regole per scegliere senza accumulare

Chiudo la parte con tre regole pratiche, che sono la sintesi di tutto quanto precede.

**Uno: un mestiere, un plugin.** Prima di installare, dite a voce alta quale dei tre mestieri state coprendo (server MCP, automazione, AI editoriale). Se non sapete rispondere, non serve. Se la risposta è «tutti e tre», state per duplicare qualcosa che avete già.

**Due: verificare prima di installare, non dopo.** Installazioni, ultimo aggiornamento, numero di recensioni: trenta secondi che evitano un mese di problemi. E per ciò che ha accesso ai contenuti, leggete *cosa fa* il plugin quando cancella: cestino o eliminazione definitiva.

**Tre: leggere la politica di reversibilità prima della politica di potenza.** Un plugin che dichiara «posso fare 140 cose» racconta la propria potenza; un plugin che dichiara «ogni modifica si annulla per trenta giorni, le cancellazioni aspettano la tua approvazione, e puoi collegare un agente in sola lettura» racconta le proprie garanzie. Nella scelta tra due candidati, la seconda frase pesa più della prima — perché descrive un sistema progettato per essere usato davvero, da qualcuno che un giorno sbaglierà.

---

*Continua nella Parte III: AI Engine, l'anatomia.*

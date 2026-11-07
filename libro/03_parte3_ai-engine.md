# Parte III — AI Engine: anatomia di un plugin che collega due mondi

## 1. Che cos'è, in una frase che regge

**AI Engine** è un plugin WordPress di Meow Apps che collega il sito all'intelligenza artificiale **nelle due direzioni**: porta l'AI dentro il sito (chatbot, assistente di scrittura, moduli, ricerca semantica, immagini) e porta il sito dentro l'AI (gli agenti esterni lo leggono e lo modificano attraverso un server MCP integrato).

I numeri, verificati al 7 novembre 2026:

| | |
|---|---|
| Installazioni attive | **90.000+** |
| Valutazione sul repository | **98/100**, su **876 recensioni** |
| Versione | **3.9.2**, pubblicata il **6 novembre 2026** |
| Richiede | WordPress con PHP 8.1+, dichiarato testato fino a WordPress 7.1.4 |
| Primo rilascio | dicembre 2022 — tre settimane dopo l'arrivo di ChatGPT |
| Server MCP integrato | da aprile 2025, due mesi prima che il progetto WordPress iniziasse il proprio |
| Strumenti MCP | **66** nella versione gratuita, oltre **100** con la Pro, oltre **200** con gli altri plugin della famiglia |

Ci sono due dettagli che spiegano perché questo plugin merita un capitolo e non una riga in un elenco.

**Il primo è l'anzianità del server MCP.** Non è una funzionalità aggiunta per cavalcare una moda: è dentro da aprile 2025, prima che esistesse un progetto ufficiale di WordPress. Chi arriva per ultimo su uno standard tende a implementarlo come lo immagina; chi c'è arrivato prima lo ha implementato come serviva.

**Il secondo è il modello di costo.** Il plugin non rivende nulla: il server MCP è gratuito e non ha limiti giornalieri né account da creare (Claude e ChatGPT si collegano con OAuth e usano il piano che hai già); i chatbot e gli strumenti di scrittura usano la tua chiave del provider, quindi i token si pagano al prezzo di listino, senza ricarichi. È una scelta commerciale che ha una conseguenza tecnica importante: **la fattura dell'AI non dipende dal plugin, dipende dalle tue scelte sui modelli.** Il che ci riporta, come sempre, alla configurazione.

## 2. La mappa dell'interfaccia

Prima di toccare un parametro, conviene avere in testa dove sono le cose, perché AI Engine ha molta più superficie di quanto ci si aspetti.

```
Meow Apps → AI Engine
│
├── Dashboard           panorama, stato dei servizi, percorso guidato
├── Settings
│   ├── AI              → Environments (i collegamenti ai provider)
│   │                     Default Environments for AI (quale modello per quale lavoro)
│   ├── MCP             → Connect an AI assistant · Connections · Bearer Token
│   │                     MCP Tool Sets · Undo e Change History · MCP Logs
│   ├── REST API        → Public API, Bearer Token, elenco degli endpoint
│   ├── Knowledge       → Environments for Embeddings · Sync Settings
│   ├── Orchestration   → MCP Servers esterni usabili dai chatbot (Pro)
│   └── Others          → dati delle query, retention, backup automatici
│
├── Modules             le funzionalità si accendono qui, per schede
│   ├── Chatbots
│   ├── AI Copilot (Magic Wand) e AI Assistant
│   ├── Workspace
│   ├── MCP & Agents    → MCP · Public API · Orchestration
│   ├── Knowledge
│   ├── Forms
│   └── Tools & Insights → Insights
│
├── Chatbots            le configurazioni dei singoli assistenti per i visitatori
├── Knowledge           le basi di conoscenza e le loro sincronizzazioni
├── Insights            consumi, token, costi, limiti
├── MCP                 attività degli agenti, modifiche, approvazioni
├── Workspace           la chat AI dentro la bacheca
└── Discussions         le conversazioni registrate dei chatbot
```

Due avvertenze su questa mappa, che valgono come metodo.

**I nomi cambiano tra le versioni.** Un libro che fissa i menu invecchia in tre mesi; quello che resta stabile sono le *funzioni* — collegare un provider, decidere i modelli, accendere i moduli, governare i permessi. Leggete la mappa come una mappa concettuale, e verificate i nomi esatti nella vostra installazione.

**Le impostazioni sensibili non sono leggibili da fuori.** Chiavi API, environment configurati, moduli accesi: nessuno di questi dati passa dal canale MCP, ed è giusto così — sono il contenuto di un pannello di amministrazione, non strumenti. Un agente potrà dirvi *cosa* configurare e *perché*, ma non «vedere» la vostra configurazione a meno che voi non gliela mostriate o non costruiate, con lo strumento giusto, una via di lettura dedicata.

## 3. Il primo settaggio: gli Environment e i modelli

### a) Collegare un provider

Il plugin non contiene modelli. Fa da intermediario tra il sito e i servizi AI che scegliete voi. Il primo passo è quindi creare un **Environment** — che è semplicemente *una configurazione di collegamento a un provider*:

**Settings → AI → Environments for AI → +**

I parametri sono tre: un **nome** (per voi, «OpenRouter» va benissimo), il **tipo** di servizio, la **chiave API**. Dopo aver salvato, il plugin scarica l'elenco dei modelli disponibili — su OpenRouter sono centinaia, e la lista può metterci qualche decina di secondi.

Se usate OpenRouter, tutto il resto diventa semplice: una sola chiave, un solo conto, e la possibilità di passare da un modello all'altro senza cambiare configurazione. **DeepSeek** lo potete usare in due modi: *attraverso* OpenRouter (scegliendo un modello DeepSeek dall'elenco), oppure con l'add-on nativo DeepSeek di Meow Apps, che serve solo se volete il collegamento diretto (prezzi reali nel cruscotto, contesto pieno, `deepseek-reasoner` pronto all'uso). **Per usare DeepSeek non è obbligatorio comprare l'add-on**: passando da OpenRouter funziona già.

### b) Decidere quale modello per quale lavoro

Il passaggio che quasi tutti sbagliano è il secondo: **Settings → AI → Default Environments for AI**. Qui non si sceglie «il modello», si sceglie **un modello per ciascun tipo di operazione**. Gli slot principali:

| Slot | A che cosa serve | Nota |
|---|---|---|
| **Default** | Conversazioni e generazione di testo | È il modello che lavora di più |
| **Fast** | Operazioni semplici, riassunti, classificazioni | Qui si risparmia sul serio |
| **Vision** | Analisi di immagini | Serve un modello multimodale |
| **Images** | Generazione di immagini | Costa per immagine, non per token |
| **Embeddings** | Trasformare testi in vettori (Knowledge) | **Nessun modello di embedding risulta esposto dall'API modelli di OpenRouter** (verificato il 7/11/2026): quel modello va cercato altrove |
| **Audio** | Elaborazioni audio | Solo se usate funzioni vocali |
| **JSON** | Risposte strutturate | Meglio un modello non «ragionante» |

Sull'ultima riga c'è un dettaglio pratico che vale la pena verificare di persona, perché è controintuitivo: nell'API dei modelli di OpenRouter interrogata il 7 novembre 2026 — **460 modelli**, oltre 800 KB di dati — la parola *embedding* **non compare mai**. Nessun modello di embedding è esposto da quella via. Va però detto con precisione, perché la piattaforma pubblica una pagina dedicata a *Qwen3 Embedding 8B*: un'offerta di embedding potrebbe quindi esistere su un canale diverso da quello che ho interrogato. La conseguenza operativa non cambia: **se volete attivare Knowledge, quel modello di embedding va cercato altrove — o in un engine locale — e verificato sull'installazione**, non dato per scontato.

### c) Una proposta di configurazione, con i prezzi veri

Quella che segue è una configurazione ragionata per chi usa OpenRouter e vuole DeepSeek come cavallo di battaglia. Gli identificativi sono quelli **esatti** da incollare nel campo *Model*: i prezzi sono in dollari per milione di token, **input/output**, rilevati dall'API di OpenRouter il 7 novembre 2026.

| Slot | Modello (id da incollare) | Prezzo | Perché |
|---|---|---|---|
| **Default** | `deepseek/deepseek-v4-pro` | 0.698 / 1.395 | Contesto da un milione di token: regge articoli lunghi e revisioni complesse |
| *Alternativa multimodale* | `deepseek/deepseek-v4.1-flash` | 0.051 / 0.567 | Vede anche le immagini, costa una frazione |
| **Fast** | `deepseek/deepseek-v4-flash` | 0.091 / 0.182 | Riassunti, categorie, tag, classificazioni |
| **Vision** | `deepseek/deepseek-v4-flash-vision-exp` | 0.440 / 1.320 | Legge immagini senza costare come i modelli di punta |
| **Vision (ricco)** | `google/gemini-3.5-flash-lite` | 0.300 / 2.500 | Accetta anche audio, video e file |
| **Images** | `google/gemini-3.1-flash-image` | 0.500 / 3.000 | Copertine e immagini editoriali |
| **Images (top)** | `google/gemini-nano-banana-2.1` | 1.500 / 7.500 | Il livello delle copertine più curate |
| **Embeddings** | *(nessuno su OpenRouter)* | — | Serve un altro provider |

La differenza tra la prima e la seconda riga dello slot Fast è, in ordine di grandezza, di venti volte. È il motivo per cui la scelta dei modelli per slot non è un dettaglio da smanettoni: **è la differenza tra una bolletta da pochi euro al mese e una da cento.** E il principio generale è questo: non esiste «il modello migliore», esiste il modello giusto per quel compito. Un modello economico è spesso *migliore* per un riassunto, perché risponde in un secondo e non divaga.

## 4. I moduli, uno per uno

I **Modules** sono gli interruttori. La raccomandazione è accenderli quando servono, non tutti insieme: ogni modulo attivo consuma risorse, espone superficie, e aggiunge cose da capire.

| Modulo | Che cosa fa | Quando accenderlo |
|---|---|---|
| **Chatbot** | Assistenti conversazionali per i visitatori: temi, voce, upload di file, memoria | Quando hai le risposte da dare e vuoi dare un volto al sito |
| **AI Copilot (Magic Wand)** | Azioni AI direttamente nell'editor: riscrivi, correggi, traduci, titoli, riassunti | Sempre, se scrivi dentro WordPress |
| **AI Assistant** | Assistente AI apribile nell'editor | Insieme al Copilot |
| **Workspace** | Una chat AI completa dentro la bacheca, con tutti i tuoi modelli, e app per iPhone e Android | Quando vuoi usare l'AI *mentre* amministri il sito |
| **MCP** | Trasforma il sito in un server MCP per agenti esterni | Quando colleghi un agente |
| **Public API** | Espone le funzioni del plugin via REST (`/wp-json/mwai/v1/…`) | Per integrazioni con altri programmi |
| **Orchestration** (Pro) | Permette ai *tuoi* chatbot di usare server MCP esterni | Quando un assistente deve parlare con servizi fuori dal sito |
| **Knowledge** | Base di conoscenza sui contenuti del sito (embedding, RAG) | Quando il sito ha molto contenuto e vuoi che l'AI lo conosca |
| **Forms** | Moduli che elaborano le richieste con l'AI | Moduli di contatto intelligenti, preventivi, questionari |
| **Insights** (in *Tools & Insights*) | Consumi, token, costi, limiti per utente/ospite/sistema | **Subito**: è lo strumento con cui controlli la spesa |
| **Discussions** | Registro delle conversazioni dei chatbot | Quando hai un chatbot pubblico |

Tre note su questa tabella.

**Insights non è un optional.** Ha un doppio ruolo: misurare *e* limitare. Se lo spegnete, i limiti smettono di essere applicati — è scritto nella documentazione, ed è controintuitivo abbastanza da meritare di essere ricordato.

**Workspace è la funzione più sottovalutata.** È un ambiente conversazionale dentro la bacheca che può anche *usare gli strumenti del sito*: chiedere di analizzare gli ultimi articoli pubblicati e proporre tre argomenti non ancora trattati, o preparare una bozza e salvarla negli articoli. È, di fatto, un agente editoriale già pronto, senza installare nient'altro.

**Il Copilot è dove si guadagna tempo ogni giorno.** Non è una funzione spettacolare, è una funzione frequente: riscrivere un paragrafo, correggere una bozza, tradurre un testo, proporre un titolo. Vale la pena configurarlo bene, perché è quello che userete cento volte al mese.

## 5. Che cosa può fare un agente, concretamente

Quando il modulo MCP è attivo, il sito espone a un agente esterno un catalogo di strumenti. La scala, verificata sulla documentazione:

- **66 strumenti** nella versione gratuita: articoli e pagine (modificati **blocco per blocco**), media, commenti, utenti, categorie e tag, menu, impostazioni, stili e template del sito, campi ACF, i campi SEO di **sette** plugin SEO diversi (Yoast, Rank Math, All in One SEO, SEOPress, The SEO Framework, Slim SEO, SEO Engine), pagine di Divi, Avada, WPBakery e SiteOrigin, redirezioni, voci dei moduli, generazione di immagini e visione;
- **oltre 100** con la Pro, in funzione dei plugin installati: plugin, temi, database, WooCommerce, Elementor, Beaver Builder, Polylang, WPML;
- **oltre 200** con gli altri plugin della famiglia Meow (SEO Engine, Code Engine, Social Engine…).

A queste si aggiunge la possibilità di **registrare strumenti propri** tramite la Abilities API di WordPress: qualunque capacità registrata può entrare nel server MCP e diventare uno strumento per l'agente. È il modo elegante di colmare una lacuna: se qualcosa che vi serve non esiste, si aggiunge.

L'elenco delle cose che un agente può fare concretamente, nella pratica quotidiana di un magazine:

- leggere e **contare** i contenuti per stato (pubblicati, bozze, programmati);
- aprire un articolo e leggerne i blocchi, non solo il testo;
- **modificare un blocco specifico** senza riscrivere l'articolo;
- scrivere i campi SEO nel plugin già installato;
- gestire categorie e tag, media, menu, note dell'editor;
- controllare **come appare la pagina a un visitatore** (non come appare nell'editor);
- leggere il log degli errori e lo stato di salute del sito;
- **annullare** ciò che ha fatto.

L'ultima riga è quella che distingue un esperimento da uno strumento.

## 6. La sicurezza fatta bene: bozze, sola lettura, approvazioni, undo

Se un agente di un'altra azienda dovesse spiegare come si progetta l'accesso di un'AI a un sito, questa sezione sarebbe il modello. Quattro meccanismi, che potete accendere insieme.

**Drafts Only — solo bozze.** L'agente può creare e modificare bozze, ma non pubblicare e non toccare ciò che è live. È il compromesso migliore per un lavoro editoriale: *si delega la fatica, si mantiene la decisione.*

**Read-only — sola lettura.** La connessione può essere aperta in modo che l'agente *veda* il sito senza poter cambiare niente. Non è una limitazione per difetto: è la modalità giusta per far analizzare, diagnosticare, controllare, senza rischi.

**Ask Before — chiedi prima.** Per le cancellazioni (o, se preferite, per qualunque modifica al sito) l'agente si ferma e la richiesta compare in attesa della vostra approvazione in bacheca. Una riga di consenso vale più di dieci raccomandazioni nella buona volontà del modello.

**Undo e Change History — annulla e cronologia.** Ogni modifica fatta da un agente viene registrata **con ciò che ha sostituito**, e conservata **30 giorni**. Si annulla con un clic dalla scheda MCP, oppure semplicemente chiedendolo all'agente. E c'è un dettaglio di progettazione che vale la pena ammirare: *l'annullamento si ferma se qualcuno ha modificato la stessa cosa nel frattempo*, invece di cancellare il lavoro altrui. Anche i contenuti nel cestino tornano indietro. Fanno eccezione solo le cose che WordPress elimina definitivamente — file media, categorie e tag.

A completare il quadro, due filtri per chi sa metterci mano. `mwai_allow_mcp` decide **quali utenti** possono usare MCP; `mwai_mcp_callback` permette di **rifiutare strumenti specifici** a determinate condizioni — per esempio: «nessuno tranne l'utente 1 può modificare le opzioni del sito o creare utenti». Sono venti righe di PHP che trasformano un permesso generico in una politica.

E infine **Editor Access**: gli editori possono collegare un agente con il proprio account e ottenere accesso *ai soli contenuti*. Impostazioni, utenti, plugin, temi e cancellazioni restano agli amministratori. È la traduzione tecnica di una frase semplice: ognuno risponde di ciò che è suo.

## 7. Il token condiviso: come funziona e dove va tenuto

OAuth è la strada elegante: l'assistente apre una pagina di autorizzazione sul vostro sito, voi scegliete l'accesso (completo o sola lettura) e approvate. Ogni azione poi gira con i permessi dell'account che ha approvato.

Ma molti client — script, integrazioni personalizzate, agenti che vivono su una macchina o in un terminale — non hanno un browser da mostrare. Per loro c'è il **Bearer Token**: un segreto condiviso, generato dal plugin nella scheda MCP.

Tre cose da sapere, che sono anche tre avvertenze:

1. **Agisce come amministratore.** Il token condiviso non «è» un utente: agisce con i permessi pieni. È la ragione per cui il suo **Access Level** va scelto con cura: *Admin*, *Read-Write*, *Read-Only*. Se un agente deve solo leggere, mettete Read-Only e chiudete la questione.
2. **È un segreto: trattatelo come tale.** Non nel codice, non in un file di configurazione condiviso, non in uno screenshot. In una variabile d'ambiente, o in un file di credenziali con permessi ristretti.
3. **Esiste anche la forma «con il token dentro l'URL»**, pensata per i client che non riescono a inviare header personalizzati. È supportata e funziona, ma ha un difetto strutturale di cui bisogna essere consapevoli: **finisce nei log del server, nella cronologia, nei riferimenti**. È l'ultima risorsa, non la prima.

Quest'ultimo punto non è teorico: nella Parte IV vedremo un caso in cui la forma «normale» non ha funzionato e il passaggio dal token nell'URL è stata l'unica via percorribile. Quando accade, la contromisura sensata è quella che è stata adottata: **il segreto non sta nel codice dell'agente, ma in un file di variabili d'ambiente**, referenziato indirettamente dal nome.

## 8. Knowledge: la memoria del sito, e i suoi limiti fisici

**Knowledge** merita un paragrafo a sé perché è la funzione più fraintesa dell'intero ecosistema.

Che cosa fa: prende i contenuti del sito (articoli, pagine, PDF, URL remoti), li spezza in frammenti, li converte in **vettori** — rappresentazioni numeriche del *significato* — e li conserva in un archivio vettoriale. Quando qualcuno fa una domanda, la domanda viene convertita a sua volta e il sistema cerca i frammenti **semanticamente più vicini**, che vengono passati al modello come contesto. Questa tecnica si chiama **RAG** (*Retrieval-Augmented Generation*, generazione aumentata dal recupero).

**Non è addestramento.** Il modello non impara nulla: gli viene semplicemente mostrato il materiale giusto al momento giusto. È una distinzione che vale la pena ripetere ogni volta, perché il malinteso opposto («gli ho insegnato il mio sito») porta a delusioni prevedibili.

Due proprietà che derivano dalla meccanica del sistema, e che conviene conoscere prima di progettare qualunque cosa:

- la ricerca è per **prossimità concettuale, non per parole chiave**: la presenza di una parola nella domanda non garantisce che il contenuto corrispondente venga trovato;
- ciò che non è nel contesto non esiste per il modello: il chatbot non «sa» che gli embedding esistono e non può interrogare l'archivio a richiesta.

**Dove si conservano i vettori.** Cinque possibilità, in ordine di semplicità: **WordPress stesso** (database interno), **Chroma**, **OpenAI Vector Store**, **Qdrant**, **Pinecone**. L'opzione interna si configura in pochi clic e non richiede account né chiavi: tutto resta nel database del sito. Ha però un limite che è dichiarato nella documentazione e va preso sul serio: **funziona bene fino a circa 20.000 frammenti**, oltre i quali un archivio vettoriale dedicato è più adatto. Un magazine con centinaia di articoli può restare tranquillamente nella fascia locale; un archivio molto grande, no.

**E il modello?** Qui torna il dettaglio di cui sopra: servono *due* cose, un archivio vettoriale *e* un modello di embedding. Il modello si sceglie in **Settings → AI → Default Environments for AI → Embeddings**, oppure per singolo ambiente di conoscenza, e ha un parametro delicato: le **dimensioni** (*Dimensions*) del vettore, che devono coincidere con quelle dell'indice. È l'errore che genera più confusione quando si migra da un provider a un altro.

Infine la parte operativa che fa risparmiare tempo: la **sincronizzazione automatica**. Si attiva dal pannello dell'ambiente, e da quel momento gli articoli modificati aggiornano il proprio embedding da soli, mentre quelli cancellati lo perdono. Si può scegliere anche *quali* tipi di contenuto sincronizzare — e, con un tipo di contenuto dedicato, costruire basi di conoscenza separate da quelle dei contenuti normali.

## 9. Workspace, Forms, Insights

**Workspace** è la chat AI dentro la bacheca, con due caratteristiche che la rendono diversa da una normale interfaccia verso un modello: usate i *vostri* modelli con le *vostre* chiavi, e potete farle usare gli strumenti del sito. Ha anche app gratuite per iPhone e Android: è il modo più diretto per lavorare al sito senza essere al computer.

**Forms** trasforma il modulo di contatto in qualcosa che capisce le richieste invece di limitarsi a inoltrarle. Il modulo dei visitatori integrato è disponibile come add-on.

**Insights** è il cruscotto economico. Mostra l'elenco delle richieste con token e prezzo, un grafico di attività, e — aprendo una riga — anche i **token in cache** (quelli che il provider ha fatturato a prezzo ridotto). Da qui si impostano i **limiti**, e la granularità è la cosa interessante: i limiti si configurano separatamente per **Utenti**, **Ospiti** e **Sistema**, scegliendo l'unità di misura (richieste, token o dollari) e la finestra temporale. E attenzione a una sottigliezza: se la finestra è «assoluta» segue il calendario (oggi, questo mese), se non lo è è una finestra scorrevole (le ultime 24 ore). Per un chatbot pubblico, il limite di **Ospiti** è quello che vi tiene al riparo dalle sorprese.

## 10. Funzioni o MCP? La tabella che decide

La domanda che torna più spesso, e a cui la documentazione stessa dà una risposta secca:

| Che cosa vuoi fare | Scegli |
|---|---|
| Far modificare al chatbot il tuo WordPress (creare articoli, aggiornare dati) | **Funzioni** |
| Far parlare il chatbot con Google Analytics, Stripe, un servizio esterno | **MCP (client)** — in AI Engine: *Orchestration* |
| Comandare WordPress da Claude o ChatGPT, dal computer o dal telefono | **MCP (server)** |
| Collegare tra loro più siti WordPress | **MCP** |
| Costruire tutto dentro un solo WordPress | **Funzioni**: più veloci e più semplici |

La regola di fondo, che nella documentazione è scritta come consiglio ed è in realtà un principio: **se qualcosa avviene tutto dentro lo stesso sito, non serve passare da un protocollo esterno.** Le funzioni sono più rapide, più semplici e fatte per questo. MCP serve a valicare un confine — tra il sito e un agente, o tra il sito e un altro sistema.

## 11. Il costo: come si legge e come si tiene basso

Chiudo la parte con la domanda che, prima o poi, tutti fanno: quanto costa? La risposta onesta è che **dipende da tre scelte, tutte nelle vostre mani** — e nessuna delle tre è «il plugin».

1. **Il modello per slot.** È la variabile dominante. Assegnare il modello di punta alle operazioni banali è il modo più rapido di spendere dieci volte il necessario.
2. **La frequenza delle chiamate.** Un agente che rilegge ogni volta cento articoli interi costa molto più di un agente a cui si chiede di leggere solo ciò che serve. La stessa cosa vale per la sincronizzazione di Knowledge su un archivio grande.
3. **Chi può chiamare.** Un chatbot aperto ai visitatori e senza limiti, su un sito pubblico, è un invito a spendere il vostro budget al posto vostro.

I limiti in Insights non sono una funzione di sicurezza marginale: sono **il freno a mano di tutto l'impianto**. E, per esperienza, sono la prima cosa da configurare e l'ultima a cui si pensa.

---

*Continua nella Parte IV: un sito reale, misurato dall'interno.*

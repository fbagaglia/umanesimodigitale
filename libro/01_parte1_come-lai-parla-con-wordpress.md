# Parte I — Come un'AI parla con un sito WordPress

## 1. Il malinteso da chiarire: l'AI non «entra» nel sito

Quando diciamo che un'intelligenza artificiale «lavora sul sito», immaginiamo qualcosa di simile a una persona che apre la bacheca di WordPress, clicca su *Nuovo articolo* e comincia a scrivere. Non è così che funziona, e capire perché è la chiave di tutto il capitolo.

Un modello linguistico, per sua natura, non vede niente. Non naviga pagine, non ha un browser, non ha un account. È un sistema che trasforma testo in altro testo. Se gli chiediamo «quanti articoli ho pubblicato?», lui non ha modo di saperlo: inventerà un numero plausibile, perché il suo unico strumento è la verosimiglianza.

Perché l'AI possa agire davvero su un sito serve una seconda cosa, diversa dal modello: serve una **interfaccia** — una porta attraverso la quale un programma esterno possa chiedere dati e ricevere risposte, e con la quale il modello possa interagire. Quel ponte si chiama, in generale, **API** (Application Programming Interface, interfaccia di programmazione).

Questa è la prima distinzione da tenere a mente per tutto il capitolo:

| | Il modello | L'agente |
|---|---|---|
| Che cos'è | Il motore che genera testo e ragiona | Un programma che usa il modello **e** strumenti esterni |
| Cosa può fare da solo | Scrivere, riassumere, tradurre, classificare | Anche leggere e scrivere su un sito, inviare email, cercare sul web |
| Di che cosa ha bisogno | Un contesto (le informazioni nel prompt) | Un contesto **e** un canale tecnico verso il mondo |

Un modello senza canale è un ottimo scrittore bendato. Un agente è uno scrittore a cui sono state date mani, occhi e un mazzo di chiavi. La qualità del lavoro dipende dal modello; il *potere* che ha dipende dalle chiavi. Ed è sulle chiavi che si gioca quasi tutta la parte delicata.

## 2. Che cos'è davvero il backend, e che cosa sono le sue API

Ogni sito WordPress è composto da due metà che gli utenti vedono come una sola:

- il **frontend**: ciò che appare nel browser (le pagine, i menu, le immagini);
- il **backend**: ciò che sta dietro — il database dei contenuti, la logica che decide cosa mostrare, i permessi degli utenti.

Aprire un sito dal browser significa che il frontend ha chiesto qualcosa al backend e ha ricevuto una pagina HTML già pronta. Ma il backend può rispondere anche in altri modi, a interlocutori diversi dal browser: è qui che entrano in scena le API.

**Le API di un backend sono le interfacce attraverso le quali altri programmi possono usare le sue funzionalità.** È un concetto generale. «REST» invece è una cosa più specifica: è *uno stile* con cui un'API può essere progettata — uno stile tra i tanti. Le relazioni corrette sono queste, e vale la pena fissarle perché quasi tutti i fraintendimenti nascono qui:

> Backend → espone delle **API** → che possono essere progettate nello stile **REST** → e possono essere rese disponibili a un agente tramite un protocollo come **MCP**.

Nessuno di questi tre livelli sostituisce l'altro. Un backend può esporre API REST, ma anche:

- **GraphQL**, dove è il cliente a chiedere esattamente i campi che gli servono, invece di ricevere tutto il contenuto di una risorsa;
- **gRPC**, un protocollo binario molto efficiente, usato soprattutto per far parlare tra loro i servizi di un sistema;
- **WebSocket**, che tiene aperto un canale bidirezionale continuo, per applicazioni in tempo reale (chat, notifiche live);
- API interne o localizzate, come le **funzioni PHP** di un plugin WordPress, che non passano nemmeno dalla rete.

Quando in WordPress parliamo di «REST API», quindi, non stiamo parlando di un magico canale per l'AI: stiamo parlando di una parte del backend di WordPress che è sempre stata lì, da anni, e che semplicemente l'AI può usare come la userebbe qualsiasi applicazione.

## 3. REST API: la porta standard di WordPress

Da WordPress 4.7 il sito espone pubblicamente un insieme di indirizzi sotto `/wp-json/`. Quella è la sua REST API. Le regole dello stile REST sono semplici:

- **un URL identifica una risorsa** (gli articoli, un articolo specifico, le categorie);
- **il metodo HTTP dice l'operazione**;
- **il formato di scambio è il JSON**;
- **il codice di stato HTTP dice com'è andata**.

| Metodo | Endpoint | Operazione |
|---|---|---|
| GET | `/wp-json/wp/v2/posts` | Legge l'elenco degli articoli |
| GET | `/wp-json/wp/v2/posts/123` | Legge l'articolo 123 |
| POST | `/wp-json/wp/v2/posts` | Crea un articolo |
| POST | `/wp-json/wp/v2/posts/123` | Modifica l'articolo 123 |
| DELETE | `/wp-json/wp/v2/posts/123` | Elimina l'articolo 123 |

Un esempio reale, sul sito di cui parleremo nella Parte IV:

```
GET https://umanesimodigitale.info/wp-json/wp/v2/posts?per_page=5
```

Non serve nessuna autenticazione per **leggere** contenuti pubblici: la REST API di WordPress è aperta in lettura per default. Serve invece autenticarsi per **scrivere**, e qui sta il primo malinteso ricorrente: «allora chiunque può pubblicare sul mio sito». No. La lettura è pubblica, la scrittura richiede che il richiedente dimostri di essere un utente autorizzato — esattamente come entrare nella bacheca.

**Il vantaggio della REST API** è che è diretta, universale e completa: qualsiasi linguaggio, qualsiasi programma, qualsiasi agente può usarla. **Il limite** è che chi la usa deve *conoscere la mappa*: quali endpoint esistono, quali parametri accettano, come si pagina un elenco di 606 articoli, come si legge un errore, come si costruisce un corpo JSON valido per un articolo con blocchi Gutenberg. È conoscenza che va scritta da qualche parte — e nel caso di un agente AI, quella conoscenza va scritta nella sua **skill**, cioè nell'istruzione che gli dice come comportarsi.

### Il caso interessante: la REST API dentro un plugin

WordPress ha una REST API nel suo nucleo, ma un plugin può aggiungerne una propria. Non è un dettaglio teorico: nel sito del caso di studio la radice `/wp-json/` espone, tra gli altri, questi namespace:

```
wp/v2 · wp-abilities/v1 · mcp · mcp/v1 · mwai/v1 · mwai-ui/v1 · rankmath/v1 · wpbot/v1 · code-snippets/v1
```

Ognuno di questi è un mondo separato: `wp/v2` è il nucleo (articoli, pagine, media, utenti), `rankmath/v1` è il plugin SEO, `mwai/v1` è l'API del plugin AI Engine, `wpbot/v1` è quella dell'altro chatbot installato, `mcp` e `mcp/v1` sono gli endpoint MCP, `wp-abilities/v1` è l'API delle *Abilities*, di cui riparleremo.

Il punto pratico è questo: **quando colleghiamo un agente a un sito, dobbiamo sapere quali di questi mondi gli stiamo aprendo.** Un conto è «può leggere gli articoli pubblici», un altro è «può modificare le opzioni del sito».

## 4. Autenticazione: credenziali, token, e la differenza che salva i siti

**Autenticazione** significa: dimostrare chi sei. **Autorizzazione** significa: stabilire che cosa ti è permesso fare. Sono due cose diverse, e WordPress le gestisce separatamente. Confonderle è l'errore che genera quasi tutti i problemi di sicurezza.

Per autenticarsi a WordPress esistono diverse strade. Le più importanti:

### a) Username e password
Il metodo tradizionale, quello della bacheca. Funziona, ma significa consegnare a un programma esterno le chiavi di casa. Se quel programma viene compromesso, o se qualcuno legge il file di configurazione, ha accesso al tuo account — e cambiare la password diventa l'unica difesa.

### b) Application Password (nativo, da WordPress 5.6)
WordPress permette di generare **password dedicate per applicazione**: una stringa separata, pensata per essere usata da un programma esterno tramite autenticazione HTTP Basic protetta da HTTPS. La cosa che le rende preziose è che si possono **revocare singolarmente**, senza toccare la password principale del tuo account. Se domani vuoi togliere l'accesso all'agente, elimini quella riga e il resto della tua vita digitale non cambia.

### c) JWT — JSON Web Token
Un sistema di autenticazione verifica le credenziali una volta e rilascia un **token firmato**, che il client usa nelle richieste successive:

```
Authorization: Bearer eyJhbGciOi...
```

Il vantaggio: la password non viaggia più, il token può avere una scadenza. L'attenzione: **non è una funzionalità nativa di WordPress**, richiede un plugin o un sistema aggiuntivo. Va detto chiaramente, perché è uno degli equivoci più frequenti quando si legge un tutorial.

### d) OAuth 2.0
L'utente concede il consenso a un'applicazione tramite una pagina di autorizzazione, e l'applicazione riceve un token con permessi limitati (**scope**). È il metodo che usano Claude e ChatGPT per collegarsi a un sito WordPress: tu approvi in una pagina, e da quel momento l'assistente agisce. È il più elegante dal punto di vista della delega, ed è anche il più delicato da implementare bene.

### e) Cookie e nonce
È il sistema che usa la bacheca quando sei già dentro: la sessione è riconosciuta dai cookie e, per le operazioni di modifica, da un **nonce** di sicurezza. Serve per gli script interni al sito, non per un agente esterno.

Vale però la pena tornare sulla distinzione iniziale, perché è il punto che un testo divulgativo tende a saltare:

| Elemento | A che cosa serve |
|---|---|
| Credenziali | Dimostrano **chi sei** |
| Token | Rappresenta **un'autorizzazione o una sessione** |
| Ruolo | Raggruppa le **capacità** di un utente |
| Capacità (*capability*) | Determina **che operazioni** sono consentite |
| REST API / MCP | Espone **come** raggiungere le operazioni |

Un token non è un permesso. Anche presentando un token perfettamente valido, WordPress verificherà poi **le capacità dell'utente** a cui quel token è associato. E c'è una conseguenza che riguarda direttamente gli agenti: **anche un token può essere rubato**. Non è una garanzia di sicurezza: è solo una chiave con una forma diversa. Va protetto, limitato, e revocabile.

## 5. Autorizzazione: ruoli e capacità, ovvero quanto potere diamo all'agente

WordPress non assegna «permessi» in blocco: assegna **capacità** (*capabilities*), piccole autorizzazioni atomiche, e le raggruppa in **ruoli**. I cinque ruoli standard:

| Ruolo | Che cosa può fare |
|---|---|
| Amministratore | Praticamente tutto sul sito |
| Editore (*Editor*) | Gestisce e pubblica gli articoli di tutti |
| Autore (*Author*) | Scrive, modifica e pubblica **i propri** articoli |
| Collaboratore (*Contributor*) | Scrive articoli, ma non li pubblica |
| Sottoscrittore (*Subscriber*) | Gestisce il proprio profilo e legge |

Alcune capacità, per capire la granularità:

| Capacità | Significato |
|---|---|
| `read` | Leggere i contenuti consentiti |
| `edit_posts` | Modificare articoli |
| `publish_posts` | Pubblicare articoli |
| `delete_posts` | Eliminare articoli |
| `edit_others_posts` | Modificare gli articoli altrui |
| `manage_options` | Gestire le impostazioni del sito |

Da qui discende una possibilità concreta e, per chi progetta agenti, molto interessante: **creare un ruolo su misura**. Immaginiamo di voler dare a un agente editoriale esattamente ciò che serve, e niente di più:

- leggere tutti gli articoli ✅
- creare nuove bozze ✅
- modificare i propri contenuti ✅
- **non** pubblicare ❌
- **non** cancellare ❌
- **non** toccare utenti e impostazioni ❌

Tecnicamente è fattibile (plugin come *Members* permettono di comporre ruoli e capacità; nel repository ufficiale ha oltre 300.000 installazioni attive). Concettualmente è la cosa più importante di questo capitolo.

## 6. MCP: un livello diverso, non un concorrente

Fin qui abbiamo parlato di «come si parla» con un sito. **MCP** (*Model Context Protocol*) affronta una domanda diversa: **come si fa sapere a un agente quali strumenti esistono, e come si invocano.**

La differenza si capisce meglio con un esempio concreto. Supponiamo di voler cambiare il titolo dell'articolo 123.

**Con REST API**, l'agente deve sapere tutto: che esiste un endpoint `/wp-json/wp/v2/posts/123`, che l'operazione si fa con POST, che il campo si chiama `title`, che serve un token con capacità sufficienti, che l'errore 401 va gestito in un certo modo.

**Con MCP**, l'agente chiede al server «che strumenti hai?» e riceve un **catalogo autodescritto**: nomi, descrizioni, parametri accettati, con schemi formali. Poi invoca `update_post` con `post_id` e `title`. Chi conosce l'endpoint, il metodo HTTP e l'autenticazione è il **server MCP** — che nel caso di WordPress è un plugin installato dentro il sito stesso.

| | REST API | MCP |
|---|---|---|
| Natura | Interfaccia HTTP | Protocollo per agenti AI |
| Come si usa | Richieste HTTP + JSON | Invocazione di strumenti descritti |
| Chi conosce i dettagli | Chi chiama (l'agente) | Il server MCP |
| Scoperta | Fuori banda, da documentazione | La fa il server, in tempo reale |
| Flessibilità | Massima | Dipende dagli strumenti esposti |
| Trasporto | HTTP | HTTP «Streamable» su un solo endpoint |

La frase che vale la pena portarsi a casa è questa: **MCP non sostituisce REST, e MCP non rende un agente più intelligente.** Mette a disposizione strumenti standardizzati e descritti. Un server MCP che espone uno strumento capace di pubblicare qualsiasi cosa senza approvazione non è una buona soluzione tecnica: è un rischio ben confezionato.

### E le «funzioni»? Il terzo modo

C'è una terza via, che la documentazione di AI Engine spiega con molta chiarezza e che spesso viene confusa con MCP. Le **funzioni** (*function calling*) sono azioni locali che il sito può compiere — creare un articolo, aggiornare un metadato, leggere una categoria — esposte al modello perché le invochi *durante* una conversazione interna al sito.

La differenza pratica:

- se il lavoro avviene **tutto dentro lo stesso WordPress** → funzioni: più semplici, più veloci;
- se un agente **esterno** (Claude, ChatGPT, un agente personale) deve comandare il sito → **MCP (server)**;
- se un chatbot del sito deve dialogare con **servizi esterni** (analytics, pagamenti, un altro sito) → **MCP (client)**, che in AI Engine si chiama Orchestration.

## 7. Le quattro domande da farsi prima di collegare qualsiasi cosa

Ogni volta che colleghiamo un'AI a un sito, stiamo rispondendo — consapevolmente o no — a quattro domande. Tenerle separate è il modo più semplice per non fare pasticci:

| Livello | Domanda | Esempio di risposta |
|---|---|---|
| **Autenticazione** | Chi sei? | Application Password · Token · OAuth |
| **Autorizzazione** | Che cosa ti è permesso? | Ruolo, capacità, scope |
| **Interazione** | Attraverso che cosa comunichi? | REST API · MCP |
| **Esecuzione** | Che cosa succede davvero? | Leggere · creare bozze · modificare · pubblicare |

Quasi tutti gli errori che si vedono in giro nascono da una domanda saltata. Il più comune: si risponde bene alla terza (il canale funziona, l'agente legge gli articoli) e non ci si pone mai la seconda. Così un agente «di lettura» viene collegato con un token da amministratore, e per mesi nessuno se ne accorge — finché un giorno non cancella qualcosa.

## 8. Il principio del privilegio minimo

**Least privilege**, privilegio minimo: dare a un sistema solo i permessi strettamente necessari a fare il suo lavoro, e niente di più.

Applicato a un agente editoriale si traduce in scelte molto concrete:

- **Un account dedicato**, non il tuo. Se l'agente è «HermesBot», nella lista utenti vedi cosa ha fatto HermesBot, e puoi spegnerlo senza rinominare te stesso.
- **Un permesso di sola lettura** finché non è chiaro che serve scrivere.
- **La creazione di bozze al posto della pubblicazione**, almeno all'inizio: si delega la fatica, non la decisione.
- **Mai il permesso di amministrazione**, che comprende utenti, plugin e impostazioni, se non in casi esplicitamente necessari.
- **Un livello di accesso dichiarato e scritto**, non implicito.

C'è un secondo principio, complementare, che riguarda la reversibilità: **preferire operazioni annullabili**. WordPress e i plugin seri hanno revisioni, cestino, cronologia delle modifiche. Un agente che cancella definitivamente è un agente con cui non si sperimenta volentieri; un agente le cui azioni si possono annullare con un clic è un collaboratore con cui si lavora davvero.

## 9. Dove sta andando WordPress

Due sviluppi recenti meritano una nota, perché spostano il terreno su cui stiamo camminando.

Il primo è la **Abilities API**, introdotta nel nucleo di WordPress: un modo standard con cui i plugin possono *registrare* le proprie capacità, descritte con uno schema. Il sito del caso di studio, come si è visto, espone già il namespace `wp-abilities/v1`. L'idea è che una capacità registrata una volta possa essere usata da più strumenti, senza essere riscritta per ognuno.

Il secondo è il **MCP Adapter**, il progetto ufficiale di WordPress (presente nel repository con oltre 60.000 installazioni attive) che traduce in strumenti MCP le capacità registrate tramite le Abilities. Si tratta di un componente infrastrutturale, non di un generatore di contenuti: da solo non aggiunge nulla che si veda, ma è il terreno comune su cui i plugin possono appoggiarsi.

La conseguenza pratica per chi scrive di questi temi è una raccomandazione di metodo: **verificare sempre dal sito, non dalla documentazione**. La mappa reale degli endpoint di un'installazione (`/wp-json/`) è la fonte più affidabile che esista, più di qualsiasi tutorial — compreso questo.

---

*Continua nella Parte II: gli strumenti concreti, verificati uno per uno.*

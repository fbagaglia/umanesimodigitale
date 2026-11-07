# Quando l'AI incontra WordPress

**Come un agente intelligente legge, scrive e lavora dentro un sito — e come farlo in sicurezza**
*Capitolo del libro / Umanesimo Digitale*

---

## Nota di metodo (da leggere prima)

Questo capitolo non è una traduzione della documentazione ufficiale, e non è nemmeno la trascrizione di una conversazione con un modello. È un testo scritto con un criterio preciso:

1. **Ogni dato tecnico è stato verificato sulla fonte primaria**, con la data della verifica accanto. Le versioni dei plugin vengono dal repository ufficiale WordPress.org, le funzionalità di AI Engine dalla sua documentazione e dal suo codice pubblico, i prezzi dei modelli dall'API di OpenRouter.
2. **Le cifre del caso di studio sono misure reali**, prese dal vivo sul sito `umanesimodigitale.info` il 7 novembre 2026 attraverso il collegamento MCP attivo. Non sono stime.
3. **Ciò che non è verificabile è dichiarato come tale.** Dove il capitolo descrive un pannello che non è leggibile da fuori, lo dice invece di inventare una schermata.

Il motivo di questa insistenza è che l'argomento si presta a un errore tipico: quando si parla di AI applicata a un sito, è facilissimo scrivere cose plausibili e false — plugin che esistono solo nel nome, versioni inventate, funzionalità confuse con altre. Un libro che vuole durare dieci anni non può permetterselo.

*Dati verificati il 7 novembre 2026.*

---

## Indice

### Parte I — Come un'AI parla con un sito WordPress
1. Il malinteso da chiarire: l'AI non «entra» nel sito
2. Che cos'è davvero il backend, e che cosa sono le sue API
3. REST API: la porta standard di WordPress
4. Autenticazione: credenziali, token, e la differenza che salva i siti
5. Autorizzazione: ruoli e capacità, ovvero quanto potere diamo all'agente
6. MCP: un livello diverso, non un concorrente
7. Le quattro domande da farsi prima di collegare qualsiasi cosa
8. Il principio del privilegio minimo
9. Dove sta andando WordPress

### Parte II — Gli strumenti: quali plugin, scelti come
1. Come sono stati verificati i plugin di questo capitolo
2. Tre famiglie, tre mestieri diversi
3. I server MCP per WordPress (tabella verificata)
4. I plugin «consigliati» che quasi nessuno usa
5. L'AI editoriale dentro la bacheca
6. I plugin che non sono AI ma servono all'agente
7. Tre regole per scegliere senza accumulare

### Parte III — AI Engine: anatomia di un plugin che collega due mondi
1. Che cos'è, in una frase che regge
2. La mappa dell'interfaccia
3. Il primo settaggio: gli Environment e i modelli
4. I moduli, uno per uno
5. Che cosa può fare un agente, concretamente
6. La sicurezza fatta bene: bozze, sola lettura, approvazioni, undo
7. Il token condiviso: come funziona e dove va tenuto
8. Knowledge: la memoria del sito, e i suoi limiti fisici
9. Workspace, Forms, Insights
10. Funzioni o MCP? La tabella che decide
11. Il costo: come si legge e come si tiene basso

### Parte IV — Il caso di studio: un sito reale
1. Metodo: che cosa ho guardato, e come
2. La fotografia dell'installazione
3. Il canale MCP, come è fatto davvero
4. Perché l'OAuth non ha funzionato (e la lezione)
5. L'inventario di ciò che l'agente sa fare oggi
6. Lo stato dei contenuti: le 541 bozze
7. La sovrapposizione: due chatbot sullo stesso sito
8. La checklist di ciò che manca
9. Che cosa fare adesso, in ordine
10. Capacità, autonomia, responsabilità

### Parte V — Quattro nomi che sembrano la stessa cosa
1. Il malinteso da sciogliere: due aziende, quattro nomi
2. Meow Apps: una casa, non un inquilino
3. AI Engine: il centro di un sistema
4. WPBot: l'altro mondo
5. I tre moduli che generavano confusione (Extended Search, Form Builder, Sessions)
6. Che cosa risulta attivo, sul tuo sito
7. La confusione, sciolta in sette domande
8. La decisione che ti conviene prendere
9. Glossario minimo

### Parte VI — MCP in pratica: i due MCP di AI Engine, e che cosa posso farci
1. Perché un capitolo su MCP
2. I due MCP: server e client (la tabella che li distingue)
3. Il nostro server MCP, com'è fatto
4. Che cosa ci posso fare: sei mestieri, tradotti dal sito reale
5. Perché un agente dovrebbe (o non dovrebbe) toccare le impostazioni — i Tool Set, uno per uno
6. Il governo del potere: quattro freni, non uno (+ i tre filtri PHP)
7. Relazione riassuntiva

### Parte VII — WPBot: il chatbot che parla con i tuoi lettori
1. Che cos'è, in due righe
2. Con quali intelligenze parla (OpenRouter nativo, DeepSeek compreso)
3. Le funzionalità, spiegate una per una
4. I piani: cosa apre la licenza
5. Procedura di setup, passo per passo (10 fasi)
6. WPBot e AI Engine: il confronto — perché AI Engine interagisce più completamente con il sito

### Appendice A — Scheda di configurazione di AI Engine
A. Che cosa è accertato dall'esterno · B. Le quattordici voci da verificare in bacheca · C. Il must «OpenRouter + DeepSeek flash» tradotto in configurazione, con i costi reali · D. Che cosa manca, in sintesi

### Appendice B — Tour delle schermate di AI Engine
Le schermate reali dell'installazione, spiegate una per una: il Playground (la sala prove) e il Content Studio (la scrivania), con le voci da controllare

### Appendice C — Procedura: portare gli embedding nel database di WordPress
Runbook in 10 fasi (0–9) con durate, punti di controllo, rimedi agli errori e checklist finale

### Fonti


---

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


---

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


---

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


---

# Parte IV — Il caso di studio: un sito reale

## 1. Metodo: che cosa ho guardato, e come

Questa parte non è un'ipotesi. È una misurazione.

Il sito `umanesimodigitale.info` è collegato a un agente AI (un'istanza di Hermes, con il profilo chiamato `umanesimo`) tramite il server MCP di AI Engine. Nella giornata del **7 novembre 2026** l'agente ha interrogato il sito direttamente e ha raccolto i dati che seguono. Il comando di verifica più semplice, e il più utile, è questo:

```
mcp_ping → { "time": "2026-11-07 13:32:54", "name": "Umanesimo Digitale" }
```

Se il «ping» non risponde, niente di ciò che segue è affidabile: è la prima cosa da controllare quando un'agente «non funziona».

Due avvertenze di onestà intellettuale, che valgono come istruzioni per chiunque rifaccia questo esercizio su un altro sito.

**La prima**: si vedono solo le cose che gli strumenti espongono. Articoli, pagine, tassonomie, media, plugin, modifiche recenti, resa delle pagine: tutto accessibile. Impostazioni del plugin, chiavi, environment configurati, moduli accesi: **non leggibili**, e giustamente. Dove il testo dice «da verificare», significa che serve aprire la bacheca — o costruire, con le Abilities, una via di lettura dedicata.

**La seconda**: i valori che seguono sono una fotografia, non una proprietà. Il numero delle bozze cambierà, i plugin si aggiorneranno. Ciò che resta è il *metodo* della diagnosi.

## 2. La fotografia dell'installazione

**Piattaforma.** WordPress 7.1, tema **Astra Pro** con **Spectra Legacy**, PHP 8.1, hosting IONOS.

**Strato AI installato.** Qui c'è la prima sorpresa, e non è piacevole:

| Plugin | Versione | Ruolo |
|---|---|---|
| **AI Engine (Pro)** | 3.9.2 | Il framework AI e il server MCP |
| **AI ChatBot – WPBot** | 8.9.2 | Secondo chatbot |
| **WPBot Pro (Master)** | 15.7.1 | Versione Pro del precedente |
| **Visitor Form (AI Engine)** | 0.1.7 | Add-on Meow: moduli intelligenti |
| **Web Search (AI Engine)** | 1.0.3 | Add-on Meow: ricerca web |

**Strato editoriale e infrastrutturale.** Rank Math SEO 1.0.278, GTranslate 5.0.2 (traduzione), Feedzy RSS + Feedzy Premium (importazione da feed), WP Telegram + WP Telegram Pro (pubblicazione su Telegram), Make Connector 1.6.6 (automazione), UpdraftPlus 2.26.1.0 (backup), WP-Optimize Premium (cache), Complianz Privacy Suite GDPR (conformità), Code Snippets 3.10.2, Converter for Media (immagini WebP), WP Bulk Delete, WP Import Export Lite.

**Lo stato dei contenuti — la misura che conta.**

| Tipo | Pubblicati | Bozze |
|---|---|---|
| Articoli (*post*) | **606** | **541** |
| Pagine | 18 | 1 |

| Tassonomia | Termini |
|---|---|
| Categorie | 44 |
| **Tag** | **0** |

E la rete di namespace REST esposta pubblicamente, che è la *vera* carta d'identità tecnica del sito:

```
wp/v2 · wp-abilities/v1 · mcp · mcp/v1 · mwai/v1 · mwai-ui/v1
rankmath/v1 · wpbot/v1 · qcwpbot/v1 · code-snippets/v1
mwai-visitor-form/v1 · meow-licenser/mwaiweb/v1 · enable-cors · complianz/v1
```

Leggendo questa riga si capisce tutto: il sito espone l'API del nucleo, quella di un plugin AI (`mwai`), quella di un **altro** plugin AI (`wpbot`, `qcwpbot`), quella del SEO, quella delle Abilities di WordPress, e due endpoint MCP. Non è un sito con un'integrazione AI: è un sito con **due** integrazioni AI, in parallelo.

## 3. Il canale MCP, come è fatto davvero

**Il server.** AI Engine espone un endpoint MCP raggiungibile a un indirizzo che, in questa installazione, ha una forma particolare:

```
https://umanesimodigitale.info/wp-json/mcp/v1/<token-condiviso>
```

Il **Bearer Token è dentro il percorso dell'URL**, non in un header. Non è una scelta di stile: è stata l'unica forma funzionante (vedi il paragrafo seguente). Il token, coerentemente, **non vive nella configurazione dell'agente**: sta in un file di variabili d'ambiente (`WP_UMANESIMO_MCP_TOKEN`) ed è richiamato per nome. Chi legge la configurazione dell'agente non trova il segreto.

**Il livello di accesso.** La connessione lavora in **Drafts Only**: l'agente crea e modifica bozze, non pubblica, non tocca il live. È la configurazione giusta per un lavoro editoriale, ed è verificabile dall'esterno in modo indiretto ma solido.

**L'attività.** Interrogando la cronologia delle modifiche fatte via MCP negli ultimi 30 giorni:

```
mcp_list_changes → "No changes were made through MCP in the last 30 days."
```

Zero. Il canale è aperto, autenticato, funzionante — e **mai usato per scrivere**. È una fotografia che dice più di mille parole sul divario tra «avere una capacità» e «usarla»: l'agente legge il sito da giorni, ma nessuna bozza è ancora nata da lì.

**L'inventario degli strumenti.** Il server espone oggi **54 strumenti**. Non sono un elenco generico: sono *questi*, e si raggruppano così:

| Famiglia | N. | Esempi |
|---|---|---|
| Lettura di contenuti | 18 | `wp_get_post`, `wp_get_blocks`, `wp_get_rendered`, `wp_get_revisions`, `wp_get_post_snapshot` |
| Modifica | 7 | `wp_update_post`, `wp_update_seo`, `wp_update_post_meta`, `wp_update_media` |
| Creazione | 4 | `wp_create_post`, `wp_create_term`, `wp_create_comment`, `wp_create_note` |
| Conteggi | 3 | `wp_count_posts`, `wp_count_terms`, `wp_count_media` |
| Blocchi Gutenberg | 3 | `wp_write_blocks`, `wp_edit_blocks`, `wp_insert_block_pattern` |
| Media | 4 | `wp_get_media`, `wp_upload_media`, `wp_upload_request`, `wp_set_featured_image` |
| Tassonomie, menu, stili, template | 8 | `wp_get_terms`, `wp_update_term`, `wp_get_menus`, `wp_get_site_style`, `wp_get_templates` |
| SEO (Rank Math) | 2 | `wp_get_seo`, `wp_update_seo` |
| Manutenzione e controllo | 4 | `wp_site_maintenance`, `wp_preview_link`, `wp_restore_revision`, `wp_moderate_comments` |
| Governo delle modifiche | 3 | `mcp_list_changes`, `mcp_undo_change`, `mcp_ping` |
| Generazione immagini e visione | 2 | `mwai_image`, `mwai_vision` |

**Che cosa manca, e che cosa significa.** La documentazione dichiara **66 strumenti** nella versione gratuita e **oltre 100** con la Pro. Qui ne risultano **54**. La differenza si spiega con i **MCP Tool Sets** — i gruppi di strumenti che si scelgono nella scheda MCP — e con i set legati ai plugin: in questo elenco, per esempio, **non ci sono strumenti per utenti, plugin, temi, database o opzioni**. È una buona notizia dal punto di vista della sicurezza, ma è un fatto da *decidere*, non da subire: quei set sono spenti, e vale la pena chiedersi se lo sono per scelta o per omissione.

## 4. Perché l'OAuth non ha funzionato (e la lezione)

La strada normale per collegare un agente a un sito è OAuth: l'agente apre una pagina di autorizzazione sul sito, tu scegli l'accesso e approvi. In questa installazione, quella strada **non ha funzionato**, e il motivo è istruttivo.

Il plugin pubblica correttamente i propri documenti di scoperta OAuth e dichiara di supportare i `client_id` presentati sotto forma di URL (la cosiddetta *Client ID Metadata Document*). Ma la pagina di consenso, anche con l'amministratore regolarmente autenticato, rispondeva:

```
OAuth Error: Unknown OAuth client.
```

Dunque il rifiuto era **lato plugin**: il `client_id` non veniva risolto.

**Aggiornamento del 7 novembre 2026, ore 14:55.** Riverificando l'endpoint mentre si scriveva questo capitolo, il quadro è cambiato. Il plugin, nella versione installata, **espone ormai la registrazione dinamica dei client** e risponde:

```
POST /wp-json/mcp/v1/oauth/register
→ { "client_id": "2459bc67…", "client_name": "hermes-test", … }
```

I documenti di scoperta dichiarano `registration_endpoint`, `authorization_endpoint`, `token_endpoint`, `revocation_endpoint`, i grant `authorization_code` e `refresh_token`, e la protezione PKCE (`S256`). In altre parole: **la strada standard OAuth, che non funzionava quando fu tentata, oggi è percorribile**, e vale la pena ritentarla. La configurazione attualmente in uso — il token condiviso nel percorso — resta valida come alternativa, e come tale va considerata: una soluzione che funziona, non l'unica possibile.

E qui c'è l'errore che questo capitolo vuole mettere in guardia: davanti a un errore come quello iniziale, la reazione istintiva è cambiare *client* — «provo con un altro agente». Sbagliato. Sei ore spese a cambiare client non avrebbero prodotto nulla, perché il difetto era dall'altra parte. E c'è una seconda lezione, complementare: **una diagnosi è una fotografia, non una proprietà.** Questo stesso paragrafo è stato riscritto perché la misura è cambiata di un giorno in un altro; chi legge un resoconto tecnico vecchio di mesi dovrebbe sempre chiedersi se qualcuno ha aggiornato il plugin nel frattempo.

La seconda cosa da sapere è che l'**header** `Authorization: Bearer <token-condiviso>` viene validato dal plugin come **JWT di OAuth**, non come token condiviso. Quindi la forma «canonica» del token fallisce con:

```
401 { "code": "mcp_unauthorized", "message": "JWT signature invalid or token expired." }
```

Mentre la stessa credenziale **nel percorso dell'URL** funziona immediatamente. La verifica è semplice e va fatta sempre così: un token corretto produce un handshake; un token sbagliato produce `404 rest_no_route`, perché quella rotta esiste *solo* per un token valido. Tre esiti diversi, tre diagnosi diverse.

**La lezione, generalizzata.** Di fronte a un'integrazione che non funziona:

1. **verificate dal sito, non dalla documentazione** — la mappa degli endpoint (`/wp-json/`) è la fonte più affidabile che esista;
2. **un errore anonimo può essere la risposta giusta** — un `401` su quell'endpoint dice che il server c'è e chiede autenticazione;
3. **non cambiate il client prima di aver capito quale lato rifiuta.**

E una nota di igiene che discende dal punto precedente: quando siete costretti a mettere un segreto **nell'URL** (perché un client non può inviare header), quel segreto finirà nei log. Le contromisure sono due: limitare il livello di accesso del token al minimo indispensabile, e ruotarlo periodicamente.

## 5. L'inventario di ciò che l'agente sa fare oggi

Vale la pena tradurre le 54 voci in *capacità*, perché è così che si progetta un lavoro editoriale.

**Sa leggere.** Gli ultimi articoli con titolo, occhiello e link; un articolo completo, blocco per blocco, con i meta e le tassonomie; le revisioni; le categorie e i termini; i menu; gli stili del tema; i template.

**Sa vedere il sito come lo vede un visitatore.** `wp_get_rendered` non restituisce l'HTML dell'editor: restituisce **la pagina così come esce**, dopo il tema. È lo strumento che permette di dire «l'articolo è a posto» invece di «i blocchi sono validi», ed è la differenza tra una verifica vera e una presunzione.

**Sa scrivere.** Creare una bozza, modificarla, aggiungere o cambiare **singoli blocchi** (non riscrivere tutto), scrivere i campi SEO dentro **Rank Math** — che è il plugin SEO effettivamente installato —, assegnare categorie e tag, caricare e impostare immagini in evidenza, creare commenti e note dell'editor, generare un'immagine.

**Sa controllare la resa.** Generare un **link di anteprima condivisibile**, non indicizzato, valido alcuni giorni: è così che un articolo in bozza si fa leggere da qualcuno che non ha un account WordPress. Nella stesura di questo capitolo lo strumento è stato usato tre volte, e ha funzionato al primo colpo.

**Sa manutenere.** Svuotare la cache, rigenerare i permalink, ripristinare una revisione, moderare i commenti.

**Sa annullare.** Elencare le proprie modifiche e disfarne una.

**Non sa (e non deve).** Toccare utenti, plugin, temi, opzioni, database. Quel recinto non è una limitazione tecnica: è *la* ragione per cui vale la pena avere un server MCP separato dai privilegi di amministrazione.

## 6. Lo stato dei contenuti: le 541 bozze

Il dato più importante del caso di studio non è tecnologico. È questo:

> **606 articoli pubblicati. 541 bozze.**

Un archivio con quasi tante bozze quanti articoli pubblicati non ha un problema di *produzione*: ha un problema di **decisione**. Le bozze che sono state aperte a campione — «Gli agenti stanno arrivando. E noi non siamo pronti.», «L'AI non sta solo migliorando: sta cambiando forma», «Il Digital Minimalism 2.0» — sono articoli veri, con titolo, occhiello, testo strutturato, e nei casi recenti anche la copertina già generata. Non sono residui automatici: sono **lavoro fermo**.

Questo cambia radicalmente la proposta di valore di un agente editoriale su questo sito. La richiesta istintiva è «scrivimi un nuovo articolo»; ma la prima cosa utile che un agente può fare qui è un **triage**:

- raggruppare le 541 bozze per tema e periodo;
- distinguere quelle **quasi pronte** da quelle solo abbozzate;
- segnalare quelle **superate dagli eventi** (l'AI cambia in fretta: una bozza di un anno fa su un modello specifico spesso non regge più);
- trovare i **doppioni** e le sovrapposizioni con ciò che è già pubblicato;
- proporre un ordine di pubblicazione.

Tutto questo in **sola lettura**, senza rischi, e in lotti: cinquanta bozze per volta, scrivendo i risultati su file, invece di chiedere all'agente di «analizzare 541 articoli» in una volta sola. È anche il modo tecnicamente corretto di lavorare con un agente: **un compito ripetitivo su molti elementi si fa a lotti, e si consolida in un file**, non a memoria.

E c'è una seconda misura che merita di essere guardata: **zero tag su 606 articoli**. Su un magazine con 44 categorie e nessuna etichetta, la navigazione trasversale è affidata interamente al caso e ai motori di ricerca. Per un agente editoriale è un lavoro perfetto: leggere un articolo, proporre cinque tag pertinenti, scriverli. Noioso per una persona, istantaneo per una macchina.

## 7. La sovrapposizione: due chatbot sullo stesso sito

Il secondo dato rivelatore viene dalla pagina pubblica. Nel codice HTML della home, il 7 novembre 2026:

| Marcatore cercato | Occorrenze |
|---|---|
| `wp-chatbot` (WPBot) | **294** |
| `wpbot` (WPBot) | **68** |
| `mwai` (AI Engine) | **0** |

Letto senza giri di parole: **il chatbot che serve i visitatori è WPBot. AI Engine, sul frontend, non è attivo.** Il plugin che ha il server MCP, la gestione dei ruoli, la cronologia annullabile e le garanzie di sicurezza è quello *spento* verso l'esterno; quello che parla con il pubblico è l'altro.

Non è di per sé un errore — sono strumenti diversi e possono convivere — ma è una sovrapposizione che va **decisa consapevolmente**, perché ha tre conseguenze concrete:

1. **Doppio costo.** Due stack AI significa due cruscotti di consumo, due tariffe, nessuna visione unica della spesa.
2. **Doppia identità.** Se in futuro entrambi rispondessero ai visitatori, la stessa domanda otterrebbe due voci diverse.
3. **Doppia superficie di rischio.** Due plugin che parlano con il pubblico sono due cose da aggiornare, configurare, limitare e — sul piano della conformità — due cose da dichiarare.

## 8. La checklist di ciò che manca

Ecco, in forma di lista, ciò che in questa installazione risulta **da fare o da decidere**. Le prime voci sono verificabili solo dall'interno: vanno guardate in bacheca.

| # | Voce | Perché conta | Dove si interviene |
|---|---|---|---|
| 1 | **MCP Tool Sets**: decidere quali gruppi esporre (oggi 54 strumenti invece di 66+) | È la differenza tra «spento per caso» e «spento per scelta» | Settings → MCP → Tool Sets |
| 2 | **Access Level del token condiviso**: verificare che non sia `Admin` | Il token condiviso agisce come amministratore: se non serve, va abbassato | Settings → MCP → Bearer Token |
| 3 | **Utente e ruolo dedicati** all'agente, invece del token amministratore | *Least privilege*: il token non è un utente, non lascia traccia distinguibile | Plugin *Members* + un account dedicato |
| 4 | **Insights**: accendere e impostare i limiti (Utenti / Ospiti / Sistema) | Senza Insights i limiti **non** si applicano | Modules → Tools & Insights |
| 5 | **Slot dei modelli**: Default, Fast, Vision, Images | Un modello unico per tutto è la ricetta per spendere dieci volte il necessario | Settings → AI → Default Environments |
| 6 | **Knowledge / Embeddings**: decidere se serve, e con quale provider | L'API modelli di OpenRouter non espone embedding: risulta configurato `Qwen/Qwen3-Embedding-0.6B` da un ambiente separato, con l'archivio su Chroma **in errore** | Settings → AI + Knowledge |
| 7 | **Chatbot**: decidere quale stack resta (AI Engine o WPBot) | Due chatbot sono una sovrapposizione, non una ricchezza | Modules → Chatbots |
| 8 | **Registro delle attività** degli agenti | C'è la cronologia di AI Engine (30 giorni), ma è interna al plugin | Plugin *Activity Log* |
| 9 | **Code Snippets aggiornato** (3.10.2 → 4.1.0) | È lo strumento con cui si registrano nuove Abilities: va tenuto in salute | Aggiornamenti |
| 10 | **Triage delle 541 bozze** | È il lavoro a più alto valore immediato | Lavoro dell'agente, in sola lettura |
| 11 | **Igiene delle tassonomie**: 0 tag su 606 articoli | Navigazione trasversale e SEO interna | Lavoro dell'agente |
| 12 | **Backup prima delle operazioni massive** | UpdraftPlus è installato: va *usato*, non solo posseduto | UpdraftPlus |
| 13 | **Informativa per i visitatori** sul chatbot AI | Un assistente automatico che parla con le persone va dichiarato | Complianz (installato) |

Tre di queste voci meritano una riga in più.

**La #2 e la #3 sono la stessa questione.** Un token condiviso «agisce come amministratore» e non compare nell'elenco delle connessioni, perché non effettua mai un accesso. Significa che ogni azione dell'agente è indistinguibile, nei registri, da un'azione fatta da un amministratore umano. Un account dedicato con un ruolo su misura risolve entrambe le cose: **tracciabilità** e **privilegio minimo**. È il singolo miglioramento più alto di questo elenco.

**La #4 è la più silenziosa.** Un impianto AI senza limiti non è «aperto»: è *in attesa* del primo abuso o del primo errore di programmazione. I tre livelli di limite — utente, ospite, sistema — esistono esattamente per questo.

**La #10 è la più redditizia.** Non aggiunge tecnologia: usa quella che c'è, in sola lettura, su lavoro già fatto. Ed è la dimostrazione di una tesi che vale per tutto il capitolo: **il valore di un agente non si misura su ciò che produce da zero, ma su ciò che recupera.**

## 9. Che cosa fare adesso, in ordine

Un piano in quattro mosse, ordinato per rapporto tra valore e rischio. Le prime due non toccano nulla che sia live.

**Prima mossa — Triage delle 541 bozze.** In sola lettura, a lotti di cinquanta, con i risultati scritti in un file man mano. Prodotto finale: un inventario con, per ogni bozza, tema, stato di completezza, eventuale obsolescenza, sovrapposizioni con il pubblicato, e una proposta di priorità. **Rischio: zero. Valore: immediato.**

**Seconda mossa — Chiusura della configurazione di AI Engine.** Slot dei modelli con gli identificativi e i prezzi della Parte III; Insights acceso; limiti impostati; Tool Sets decisi; Access Level del token verificato. È il lavoro che rende tutto il resto sostenibile dal punto di vista dei costi. Serve una sessione insieme, davanti alla bacheca, perché questi pannelli non sono leggibili dall'esterno.

**Terza mossa — Riduzione della superficie.** Decidere il chatbot; valutare l'installazione di **Members** (ruoli) e **Activity Log** (registro); aggiornare Code Snippets. È la mossa che trasforma un insieme di plugin in un sistema governabile.

**Quarta mossa — Igiene editoriale.** I tag sui 606 articoli, i collegamenti interni, le immagini mancanti. Lavoro ripetitivo, perfetto per una macchina, sempre in bozza e sempre con approvazione umana.

E poi, finalmente, **scrivere**. Non prima: perché il primo articolo prodotto da un agente editoriale su questo sito sarà tanto più utile quanto più saprà parlare con la voce di ciò che c'è già.

## 10. Capacità, autonomia, responsabilità

Chiudo tornando alla domanda da cui eravamo partiti: che cosa significa collegare un'AI a un sito? La risposta si organizza su tre livelli, e il caso di studio li esemplifica tutti e tre.

**Capacità — che cosa l'agente *può* fare.** Qui la risposta è tecnica e misurabile: 54 strumenti esposti, blocco per blocco, campi SEO nel plugin giusto, anteprime condivisibili, undo. È la parte che si legge nei manuali, ed è anche la più facile.

**Autonomia — che cosa gli *consentiamo* di fare senza chiedere.** Qui la risposta è una scelta di progetto: bozze invece di pubblicazioni, sola lettura per l'analisi, approvazione per le cancellazioni, 30 giorni di cronologia annullabile. È la parte che distingue un sistema progettato da uno montato.

**Responsabilità — che cosa *deve restare* nelle mani dell'uomo.** Qui la risposta non è tecnica. È la decisione di pubblicare, la voce del sito, la validità di un'affermazione, il giudizio su ciò che merita di esistere. Nessuna delle tre mosse elencate sopra tocca questo livello, ed è esattamente il motivo per cui si possono fare con tranquillità.

La conclusione, per un sito come questo, è meno spettacolare di quanto la parola «intelligenza artificiale» faccia sperare e più solida di quanto il suo uso corrente lasci credere: **un agente ben collegato a WordPress non serve a pubblicare al posto nostro; serve a toglierci di dosso tutto ciò che non è pubblicare** — leggere, confrontare, contare, classificare, preparare, verificare, e riportare in ordine.

Le 541 bozze sono lì che aspettano la prima dimostrazione di questa tesi.


---

# Parte V — Quattro nomi che sembrano la stessa cosa

## Il malinteso da sciogliere

Su un sito come quello di questo caso di studio convivono, in questo momento, **due mondi AI diversi**, prodotti da **due aziende diverse**, sotto **quattro nomi** che si somigliano abbastanza da generare confusione: *AI Engine*, *Chatbot Pro*, *Bot Form Builder / Bot Sessions / Bot Extended Search*, *Meow Apps*.

Il primo passo per uscirne è una constatazione semplice e liberatoria: **non è un unico sistema con nomi diversi. Sono due sistemi separati, con filosofie opposte, che per caso vivono nello stesso WordPress.**

| Nome | Che cos'è | Chi lo produce |
|---|---|---|
| **Meow Apps** | **Non è un plugin.** È la casa produttrice — e anche il nome del menu in bacheca sotto cui finiscono i suoi plugin | Jordy Meow, Tokyo |
| **AI Engine** | Il plugin centrale di quella casa: AI dentro il sito e sito dentro l'AI | Meow Apps |
| **WPBot** (e il suo «Pro») | Il plugin della *seconda* casa: chatbot per i visitatori, lead, sessioni | QuantumCloud |
| **Bot Extended Search · Conversational Form Builder · Bot Sessions** | **Non sono plugin.** Sono *moduli* — componenti interne di WPBot Pro | QuantumCloud |

Detto in una riga sola: **Meow Apps produce AI Engine; QuantumCloud produce WPBot. «Chatbot Pro» è WPBot Pro, e Form Builder, Sessions ed Extended Search sono suoi pezzi interni.** Il resto di questo capitolo spiega che cosa fa ciascuno, e — soprattutto — quale dei due sta lavorando davvero sul sito.

## 1. Meow Apps: una casa, non un inquilino

La prima fonte di confusione è la parola «Meow Apps» in bacheca. Non indica un plugin: indica **il produttore**, e insieme il menu sotto cui i suoi prodotti si raggruppano.

Meow Apps si presenta come «l'azienda AI per WordPress», con sede a Tokyo, e dichiara di girare su **oltre 350.000 siti**. La sua famiglia comprende:

| Plugin | Che cosa fa |
|---|---|
| **AI Engine** | Il centro: chatbot, scrittura assistita in editor, e agenti AI che lavorano sul sito via MCP |
| **SEO Engine** | SEO moderna con *AI Visibility*, tracciamento dei bot AI, MCP, correzioni in un clic |
| **Code Engine** | Gestione intelligente di frammenti PHP |
| **Media Cleaner** | Rimozione di media e file non usati |
| **Database Cleaner** | Pulizia del database WordPress |
| **Media File Renamer** | Rinomina dei file media |
| **Perfect Images** | Gestione dimensioni, retina, WebP/AVIF, CDN |
| **Social Engine** | Pianificazione e automazione dei post social |
| **Meow Lightbox** | Lightbox per immagini con dati EXIF |

Sopra a questa famiglia esistono gli **add-on di AI Engine**, venduti separatamente e visibili come voci a sé nella lista plugin. Sono pezzi che estendono il plugin centrale in una direzione precisa:

| Add-on | Che cosa aggiunge |
|---|---|
| **Web Search** | Ricerca web usata dai chatbot e dagli strumenti |
| **Visitor Form** | Raccolta di informazioni dal visitatore prima della chat: form, cronologia, avvisi via email |
| **DeepSeek** | Collegamento nativo ai modelli DeepSeek (prezzi reali, contesto pieno, `reasoner`) |
| **User Memory** | Memoria per utente e conoscenza globale condivisa |
| **Content Parser** | Lettura di contenuti da ACF, Metabox, JetEngine, WooCommerce, Gravity Forms |
| **Woo Basics** | Il chatbot come assistente WooCommerce: ricerca prodotti, stato ordini |
| **Quick Actions** | Pulsanti di suggerimento nel chatbot, con trigger e callback |
| **Dynamic Keys** | Rotazione di più chiavi API per evitare i limiti di frequenza |
| **Ollama** | Un tipo di ambiente per modelli eseguiti in locale |

**Perché questo conta.** Quando in bacheca vedi «Meow Apps» e sotto tre o quattro voci, non stai guardando tre o quattro candidati alternativi: stai guardando un prodotto principale e i suoi accessori. Si valutano separatamente — e si pagano separatamente.

## 2. AI Engine: il centro di un sistema

Il ruolo di AI Engine in questa architettura è **fare da ponte in due direzioni**, e conviene ripeterlo perché è la chiave di tutto il resto:

- **l'AI entra nel sito**: chatbot per i visitatori, assistente di scrittura nell'editor, form intelligenti, ricerca semantica, generazione di immagini;
- **il sito entra nell'AI**: gli agenti esterni (un assistente personale, Claude, ChatGPT, un agente che vive su una macchina) possono leggere e modificare il sito attraverso un **server MCP** integrato, con strumenti descritti, cronologia annullabile e permessi limitabili.

È il plugin che nella Parte III di questo libro abbiamo smontato pezzo per pezzo. Qui bastano gli estremi: **90.000 installazioni, 98/100 su 876 recensioni, versione 3.9.2, server MCP integrato da aprile 2025**, chatbot e scrittura assistita che usano *le tue* chiavi dei provider senza ricarichi.

La cosa da tenere a mente è una sola: **AI Engine è l'unico, dei due, che sa lavorare *sul* sito** — leggere centinaia di articoli, modificarli blocco per blocco, scrivere i campi SEO, gestire categorie e menu. Il suo mestiere non è intrattenere il visitatore: è **eseguire lavoro editoriale**.

## 3. WPBot: l'altro mondo

Il secondo sistema si chiama **WPBot** ed è prodotto da **QuantumCloud**. È un chatbot per WordPress, e la sua filosofia è opposta a quella di AI Engine: **parlare con le persone che passano dal sito** — rispondere alle domande, raccogliere contatti, prenotare appuntamenti, assistere su WooCommerce, e quando serve passare la conversazione a un essere umano.

I numeri, al 7 novembre 2026, raccontano bene la differenza di scala:

| | AI Engine | WPBot |
|---|---|---|
| Produttore | Meow Apps | QuantumCloud |
| Installazioni (versione gratuita su WordPress.org) | **90.000** | **5.000** |
| Valutazione | 98/100 su 876 recensioni | 94/100 su 124 recensioni |
| Ultimo aggiornamento | 06/11/2026 | 06/11/2026 |
| Dove sta la versione a pagamento | Non esiste su WordPress.org: la Pro è commerciale sul sito del produttore | Idem: i piani Pro sono venduti su `wpbot.pro` |
| Mestiere prevalente | Eseguire lavoro sul sito (contenuti, media, SEO) | Parlare con i visitatori (supporto, lead, form) |

**«Chatbot Pro» è questo**: la versione a pagamento di WPBot. I piani sono tre, e — attenzione — **sono i piani a decidere quali dei moduli di cui parlavi esistono o no**:

| Piano | Prezzo indicativo | Che cosa sblocca, in sintesi |
|---|---|---|
| **Starter** | ~39 $/anno | Funzioni Pro di base, **sessioni di chat e cronologia**, **modulo di ricerca estesa**, AI di base e Dialogflow, base di conoscenza RAG basilare |
| **Professional** | ~99 $/anno | Tutto quanto sopra più **form conversazionali**, **modulo WooCommerce**, AI avanzata (fine-tuning, assistenti), RAG e caricamento documenti migliori |
| **Master** | ~189 $/anno | Tutto quanto sopra più **passaggio a operatore umano** (live chat), multilinguismo avanzato, white-label |

Da qui discende la risposta alla prima metà della confusione: **i nomi che ti confondono non sono prodotti separati da acquistare. Sono voci interne di un unico prodotto a licenza, e la licenza decide quali sono attive.** Nella lista plugin del tuo sito, infatti, compaiono due voci distinte — `AI ChatBot – WPBot` (la base gratuita, 8.9.2) e `WPBot Pro WordPress Chatbot (Master)` (15.7.1) — perché il Pro si installa *sopra* la versione gratuita, estendendola. Non si sostituiscono: convivono.

## 4. I tre moduli che generavano confusione

### Bot Extended Search — «cerca dentro il sito»
È il modulo che permette al chatbot di **cercare nei contenuti del sito** per costruire la risposta, invece di limitarsi a un elenco fisso di domande e risposte preparate. Nella versione gratuita la ricerca è basilare; il modulo la estende, e nei piani superiori si combina con la base di conoscenza vettoriale (RAG), cioè con la stessa tecnica di «prossimità di significato» descritta nella Parte III.

In pratica: è ciò che separa un **menù di risposte predefinite** da un assistente che va a leggere i tuoi articoli per rispondere.

### Conversational Form Builder — «il modulo dentro la chat»
È il modulo che trasforma la conversazione in un **form**: calcolatori, prenotazioni, quiz, raccolta di dati con **logica condizionale** (una domanda compare solo se la precedente ha una certa risposta). I dati raccolti finiscono nel database del sito e ti arrivano via email.

La differenza rispetto a un form normale è che qui il form *è* la conversazione: il visitatore risponde in chat, un campo alla volta, e la conversazione può essere guidata da pulsanti — costruendo di fatto un albero decisionale.

### Bot Sessions — «la memoria delle conversazioni»
È il modulo che conserva le **sessioni di chat**: chi ha parlato, quando, che cosa ha chiesto, con quale esito. Serve a tre cose concrete:

1. **vedere** che cosa chiedono davvero i visitatori, e quindi correggere le risposte;
2. **riprendere** una conversazione, e rispondere anche a distanza;
3. **passare la conversazione a una persona** quando la macchina non basta (funzione che nei piani WPBot arriva con il livello più alto, insieme alla live chat).

Senza sessioni, un chatbot è una scatola nera: risponde e non lascia traccia.

### E gli altri moduli
Per completezza, il resto della dotazione di WPBot Pro, che è più ampia di quanto l'uso attuale richieda:

| Modulo | Che cosa fa |
|---|---|
| **Bot Woo Settings** | Integrazione WooCommerce: prodotti, stato ordini, carrelli abbandonati |
| **Bot Mailing List Integration** | Iscrizione dei visitatori a liste email (integrazione tipo Mailchimp) |
| **Messenger / WhatsApp / Telegram** | Lo stesso bot su altri canali di conversazione |
| **Webhook Integration** | Invio dei dati raccolti a servizi esterni |
| **Live Chat** | Passaggio a operatore umano |
| **Voice Module** | Conversazione vocale |
| **Multi-Language** | Gestione multilingua avanzata |
| **Simple Text Response** | Risposte testuali rapide, in versione Pro |
| **Dialogflow / AI Integrations** | Collegamento a servizi AI esterni e a RAG |
| **Export / Import delle impostazioni** | Portare la configurazione da un sito a un altro |
| **Lead Finder** | Ricerca e gestione dei contatti raccolti |

Va detto con chiarezza: **avere un modulo disponibile non significa averlo configurato, e non significa che serva.** Un pulsante di WhatsApp nel chatbot, un modulo vocale, un albero conversazionale: sono tutte cose che richiedono decisioni e manutenzione. La dotazione di un piano Master è un *catalogo*, non una lista di cose da fare.

## 5. Che cosa risulta attivo, sul tuo sito

Questa è la parte che scioglie la confusione in modo definitivo, perché non si basa sulla documentazione ma su ciò che il sito espone pubblicamente. Ogni plugin che registra funzionalità le annuncia nella propria *API*: contando le rotte, si vede quali moduli sono effettivamente attivi.

Misura del 7 novembre 2026:

| Namespace REST | Rotte | Che cosa racconta |
|---|---|---|
| `mwai/v1` | **122** | AI Engine: sessioni, workspace, task, stato MCP, orchestrazione |
| `mwai-ui/v1` | **14** | L'interfaccia di AI Engine: caricamento file, invio chat, ricerca, **realtime vocale**, editor (Copilot), form |
| `mwai-visitor-form/v1` | **8** | L'add-on **Visitor Form** di Meow Apps |
| `meow-licenser/mwaiweb/v1` | **3** | L'add-on **Web Search** di Meow Apps |
| `wpbot/v1` | **4** | WPBot: `chatkit/session`, `dialogflow_api`, `dialogflow_webhook` |
| `qcwpbot/v1` | **75** | WPBot Pro — e qui c'è il dato interessante |
| `mcp` + `mcp/v1` | **27** | Il server MCP di AI Engine: registrazione OAuth, token, autorizzazione, server |

E il dettaglio dentro `qcwpbot/v1`, che è la risposta alle tua domanda:

```
73 rotte  →  /qcwpbot/v1/email/subscribers, /notes, /export, /import,
             /webhook/subscribe, /webhook/bounce, /webhook/complaint …
 1 rotta  →  /qcwpbot/v1/leadfinder/settings
 1 rotta  →  la radice del namespace
```

Tradotto: **il modulo che risulta attivo con più peso è quello delle liste email** — settantatré rotte per gestire iscritti, note, esportazione, importazione e notifiche di consegna, rimbalzo e segnalazione. C'è poi un modulo di *lead finder*. Non compaiono rotte dedicate a WooCommerce, a WhatsApp o a Telegram: quei moduli, su questo sito, non stanno lavorando.

E c'è la misura complementare, già vista: nella pagina pubblica, `wp-chatbot` compare **294 volte** e `mwai` **zero**. Dunque:

> **Il chatbot che parla con i tuoi visitatori è WPBot. AI Engine è installato, aggiornato, e non è attivo verso il pubblico.**

## 6. La confusione, sciolta in sette domande

**Il chatbot che vedono i visitatori è AI Engine?**
No. È WPBot. AI Engine, sul frontend, non carica nulla.

**AI Engine è allora inutile?**
No: è il pezzo che **sa lavorare sul sito** — leggere centinaia di articoli, modificarli blocco per blocco, gestire SEO, tassonomie, media. E soprattutto è l'unico, tra i due, che espone un **server MCP** con cui un agente esterno può operare.

**WPBot può scrivere articoli?**
No, non è il suo mestiere. Serve a conversare, raccogliere contatti, assistere i visitatori.

**«Chatbot Pro» è un altro plugin?**
No: è la versione a pagamento di WPBot, con tre piani, installata *sopra* la versione gratuita.

**Form Builder, Sessions, Extended Search sono tre cose da comprare a parte?**
No. Sono moduli interni di WPBot Pro, e sono i **piani** (Starter / Professional / Master) a decidere quali sono disponibili.

**Meow Apps è un quarto prodotto?**
No: è la **casa produttrice di AI Engine**, ed è anche il nome del menu in bacheca sotto cui vivono i suoi plugin e i suoi add-on.

**Possono convivere?**
Tecnicamente sì, e stanno convivendo. Ma la domanda giusta non è «possono», è **«chi fa il pubblico e chi fa il lavoro interno?»** — perché due chatbot che rispondono agli stessi visitatori sono un errore di progettazione, non una ricchezza.

## 7. La decisione che ti conviene prendere

Tolta la confusione, resta una scelta, e ha un ordine logico preciso.

**Primo: stabilisci chi parla al pubblico.** Oggi è WPBot. Se il suo ruolo è reale — rispondere ai lettori, raccogliere iscritti alla newsletter, e le 73 rotte email dicono che quel lavoro esiste — **tieni WPBot per il pubblico e spegni il chatbot di AI Engine**. Non perché sia peggiore, ma perché due chatbot in un sito si annullano a vicenda.

**Secondo: usa AI Engine per il lavoro interno.** È lì che questo sito ha il suo problema più grande — 606 articoli pubblicati e **541 bozze** — e nessun chatbot risolverà mai un arretrato editoriale. Lo fa un agente che legge, classifica e prepara. Quello è AI Engine, ed è già collegato.

**Terzo: verifica, dei tuoi due stack, che cosa stai pagando per nulla.** Le voci da controllare sono poche e concrete:

| Da verificare | Dove |
|---|---|
| I moduli WPBot attivi e utili (mailing list sì; Woo, WhatsApp, Telegram no) | Bacheca → WPBot Pro |
| Le sessioni di chat: ci sono conversazioni reali? | WPBot → Sessioni |
| La ricerca estesa: risponde dai tuoi articoli o da risposte fisse? | WPBot → Extended Search |
| Il chatbot di AI Engine è spento o solo disattivato in pagina? | AI Engine → Chatbots |
| Gli add-on Meow sono usati o solo installati? | Web Search, Visitor Form |

**Quarto: ricorda una regola che vale per entrambi i mondi.** Un modulo attivo è una superficie in più da aggiornare, configurare, limitare e — per i chatbot che parlano con le persone — dichiarare nella informativa sulla privacy. La domanda non è «che cosa potrei attivare», ma **«che cosa sono disposto a mantenere»**.

## 8. Glossario minimo

**Environment / Ambiente** — Una configurazione di collegamento a un provider AI (o a un archivio vettoriale). In AI Engine è l'unità di base: un nome, un tipo, una chiave.
**Modulo** — Una funzionalità interna di un plugin che si accende e si spegne. I moduli di WPBot Pro sono componenti interne, non plugin separati.
**Add-on** — Un prodotto aggiuntivo, a sé, che estende un plugin (gli add-on di Meow Apps per AI Engine).
**Licenza** — Il livello di piano acquistato (Starter, Professional, Master per WPBot). Determina quali moduli esistono sulla tua installazione.
**Embedding / RAG** — La tecnica con cui l'AI «consulta» i contenuti del sito: frammenti convertiti in vettori, ricerca per prossimità di significato. Non è addestramento del modello.
**MCP** — Il protocollo che permette a un agente esterno di usare gli strumenti di un sito in modo standardizzato.
**Sessione** — Una conversazione salvata tra visitatore e chatbot, con il suo storico.
**Lead** — Un contatto raccolto (nome, email, preferenze) durante una conversazione.
**Handover** — Il passaggio di una conversazione dal bot a una persona.
**Provider** — L'azienda che fornisce il modello AI (OpenRouter, OpenAI, DeepSeek…). Il plugin non è il provider: è il ponte verso di esso.

---

*Questo capitolo chiude la parte tecnica del libro. La confusione che ha generato non era un errore di chi l'ha vissuta: era l'effetto naturale di due case produttrici, due filosofie e quattro nomi simili che finiscono nello stesso pannello di amministrazione. Distinguere «chi produce che cosa» e «chi parla a chi» è, in pratica, tutto il lavoro.*


---

# Parte VI — MCP in pratica: i due MCP di AI Engine, e che cosa posso farci

## 1. Perché un capitolo su MCP, dopo tutti gli altri

Le parti precedenti hanno spiegato che cos'è MCP, come è fatto il server di AI Engine e come si collega un agente. Questa parte risponde a una domanda più concreta, che nasce da una situazione reale: **`umanesimodigitale.info` è già un nodo MCP.** Il plugin espone il sito, un agente è collegato, il canale funziona. Quindi la domanda non è più «si può fare?», ma:

- **che cosa ci posso fare**, esattamente, con questo sito?
- **di quanto potere ha bisogno** quell'agente, e dove si decide quanto gliene do?
- **perché dovrebbe** mettere mano alle impostazioni — e perché, quasi sempre, **non dovrebbe**?

E c'è un secondo equivoco da sciogliere, che riguarda la parola «due»: AI Engine non ha *un* MCP. Ne ha **due, e vanno in direzioni opposte**.

## 2. I due MCP: server e client

| | **MCP Server** | **MCP Client** (in AI Engine: *Orchestration*) |
|---|---|---|
| Direzione | Il sito **espone sé stesso** a un agente esterno | I **chatbot del sito usano** strumenti che stanno altrove |
| Chi chiama chi | Claude, ChatGPT, un agente personale **chiamano il sito** | Il sito **chiama** un altro server MCP (un servizio, un altro WordPress) |
| Dove si accende | Modules → *MCP & Agents* → **MCP** | Modules → *MCP & Agents* → **Orchestration** (Pro) |
| Dove si configura | Settings → **MCP** (connessioni, token, tool set) | Settings → **Orchestration** → *MCP Servers* (nome, URL https, token) |
| A che cosa serve | Far **lavorare un agente sul sito**: leggere, scrivere bozze, gestire media, SEO | Far **parlare l'assistente del sito con il mondo**: analytics, pagamenti, un altro sito |
| Condizione tecnica | Un client MCP qualunque | Il chatbot deve usare un modello **OpenAI o Anthropic** (non «Default» o «None») |

Il primo è quello che sta funzionando sul sito di questo libro. Il secondo è una possibilità **non ancora attivata**, e c'è una ragione pratica che spiega perché: **l'Orchestrazione richiede un modello OpenAI o Anthropic**, mentre questo sito lavora con DeepSeek attraverso OpenRouter. È una di quelle condizioni che si scoprono leggendo la documentazione *prima* di progettare, e che se sfuggono fanno perdere una serata.

**La relazione tra i due, in una frase**: il *server* mette il sito a disposizione degli agenti; il *client* mette gli agenti a disposizione del sito. Sono la stessa medaglia vista dai due lati — e **nessuno dei due sostituisce le funzioni** interne, che restano la via più semplice e veloce per far fare qualcosa allo stesso sito (§6).

## 3. Il nostro server MCP, com'è fatto

Ricapitolando le misure della Parte IV, con le aggiunte di questa:

| Elemento | Stato |
|---|---|
| Endpoint | `https://umanesimodigitale.info/wp-json/mcp/v1/<token>` |
| Registrazione OAuth | **Ora funzionante**: la registrazione dinamica dei client rilascia un `client_id`, con PKCE `S256` |
| Autenticazione in uso | Bearer token condiviso **dentro il percorso** (per i client che non inviano header) |
| Livello di scrittura | **Drafts Only** — l'agente crea e modifica bozze, non pubblica e non tocca il live |
| Cronologia | Undo e Change History, **30 giorni**, con registrazione di ciò che è stato sostituito |
| Attività | **Zero scritture via MCP** negli ultimi 30 giorni |
| Strumenti esposti | **54** (contro i 66 dichiarati per la versione gratuita, oltre 100 con la Pro) |
| Logging delle chiamate | Configurabile (registra ogni chiamata in *Insights → MCP Logs*; richiede il modulo Insights) |

Un dettaglio che vale la pena leggere due volte, perché è il cuore della sicurezza di questo impianto: **ogni modifica fatta da un agente viene registrata insieme a ciò che ha sostituito, e resta lì per trenta giorni.** E l'annullamento ha una proprietà rara: **non cancella il lavoro più recente altrui.** Se la stessa cosa è stata modificata dopo, l'undo si ferma e la riga segnala *«Changed since»*. Un annullamento che si comporta così è un annullamento progettato da qualcuno che ha visto un disastro sul campo.

## 4. Che cosa ci posso fare, tradotto in mestieri

Le 54 voci tecniche diventano sei mestieri concreti. Questi sono, in ordine di utilità per un magazine con 606 articoli e 541 bozze.

**Mestiere 1 — Leggere in massa.** Aprire articoli e bozze, leggerne i blocchi, contarli per stato, confrontarli fra loro, leggerne categorie e metadati. È il mestiere che serve per il triage dell'arretrato: cinquanta pezzi per volta, con i risultati scritti in un file. **A rischio zero, perché è sola lettura.**

**Mestiere 2 — Scrivere e correggere senza rovinare.** Creare una bozza; modificare **un singolo blocco** invece di riscrivere tutto l'articolo (che su un pezzo lungo è la differenza tra una correzione e un disastro); aggiungere categorie e tag; scrivere i campi SEO **dentro Rank Math**, il plugin che il sito usa davvero.

**Mestiere 3 — Tradurre.** Il sito è un magazine multilingue con GTranslate attivo: la stessa fonte, in lingue diverse. Un agente che traduce un articolo in bozza, con lo stesso registro, è uno dei risparmi di tempo maggiori che questa dotazione permette.

**Mestiere 4 — Controllare.** Questa è la funzione che quasi nessuno usa e che cambia la qualità del lavoro: **guardare la pagina come la vede un visitatore**, non come appare nell'editor. Più: leggere le revisioni, ripristinarne una, moderare i commenti, controllare lo stato di salute del sito, svuotare cache e permalink.

**Mestiere 5 — Preparare e condividere.** Generare un **link di anteprima condivisibile**, che scade e non viene indicizzato: è il modo in cui un articolo in bozza arriva a un lettore di fiducia senza farlo entrare in WordPress.

**Mestiere 6 — Disfare.** Elencare le proprie modifiche e annullarne una. È il mestiere che rende tutti gli altri praticabili senza paura.

E c'è un **non-mestiere** che vale la pena dichiarare: **l'agente non usa la base di conoscenza.** Gli embedding di Knowledge non entrano in questo canale: l'agente legge i contenuti con i propri strumenti, non interroga l'archivio vettoriale. Sono due meccanismi separati, e confonderli porta a chiedersi perché «la memoria» non serve a nulla quando invece è l'agente a non averne bisogno.

## 5. Perché un agente dovrebbe (o non dovrebbe) toccare le impostazioni

Qui si arriva al punto che genera più confusione, ed è una domanda doppia: *le impostazioni di chi?* Perché «impostazioni» significa due cose molto diverse.

**Significato A — i Tool Set di MCP.** Cioè: *quali gruppi di strumenti il sito decide di esporre*. Questo non è un potere dell'agente: è un potere **tuo**, e sta in *Settings → MCP → MCP Tool Sets*. Non è l'agente che accede alle impostazioni: sei tu che scegli quanto aprire il rubinetto.

**Significato B — le impostazioni di WordPress.** Cioè: *gli strumenti che permettono di leggere e cambiare la configurazione del sito*. E qui la risposta è sorprendente per chi non ha letto la documentazione: **fanno parte del set WordPress, quello gratuito e acceso di default.**

Vediamo in concreto che cosa contiene ciascun set.

| Tool Set | Contenuto | Costo |
|---|---|---|
| **WordPress** | Articoli e pagine (**blocco per blocco**), media, commenti, **utenti**, tassonomie, menu, CSS aggiuntivo e stili del sito, pattern, note dell'editor, **impostazioni di WordPress**; campi SEO nel plugin SEO installato; campi ACF; template dei temi a blocchi; widget dei temi classici; controllo della pagina come la vedono i visitatori; **lettura del log degli errori PHP, cron e Site Health**; **svuotamento di cache e permalink**; ripristino revisioni; moderazione commenti; anteprime condivisibili; redirezioni; voci dei moduli | **Gratuito, acceso di default** |
| **Plugins** e **Themes** | Installare, attivare, cambiare, aggiornare; **leggere e modificare i file** di plugin e temi | Pro, spento di default |
| **Database** | Eseguire **query SQL** sul database | Pro, spento di default |
| **Elementor** / **Beaver Builder** | Leggere le pagine come struttura e modificarne un elemento alla volta | Pro |
| **Polylang / WPML / WooCommerce** | Traduzioni; prodotti, varianti, coupon, ordini, scorte, clienti, recensioni | Pro, quando il plugin è installato |
| **Abilities** (sotto *From WordPress*) | Trasforma in strumenti MCP le *Abilities* registrate da altri plugin, **ognuna con i propri controlli di permesso** | — |
| **Dynamic REST** | Accesso grezzo alla REST API di WordPress: più tecnico, da usare solo se serve | — |

Il set WordPress include anche gli **strumenti per utenti** e per le **impostazioni**: è la risposta secca alla tua domanda. Un agente collegato, con quel set attivo, *può* leggere la configurazione del sito e — con i permessi giusti — cambiarla. Non è una falla: è una scelta di prodotto, ed è governata da tre freni che stanno tutti dalla tua parte.

**E allora perché dovrebbe?** Per tre ragioni legittime, e una sola sbagliata.

Le ragioni legittime: (1) **manutenzione** — svuotare la cache, rigenerare i permalink, controllare Site Health e il log degli errori sono operazioni che un agente fa meglio di un essere umano annoiato; (2) **diagnosi** — quando una pagina mostra qualcosa di strano, la sequenza «log errori → stato del sito → resa della pagina» è esattamente il lavoro di un agente; (3) **configurazione guidata** — lasciare che l'agente ti dica *cosa* cambiare e *dove*, che è diverso dal farlo al posto tuo.

La ragione sbagliata è una sola, ed è quella che si sente più spesso: **«tanto è comodo»**. Il set Database e il set Plugins/Temi sono potenti e pericolosi nello stesso modo, e su un sito in produzione non servono a un lavoro editoriale. Un agente che può eseguire query SQL arbitrarie e riscrivere i file di un tema **non è un agente più capace: è un agente con cui nessuno sperimenta volentieri.** E la cronologia di 30 giorni non ti salva: la documentazione è esplicita nel dire che le query SQL, i file dei plugin e dei temi modificati, le cancellazioni definitive e i nuovi utenti **non sono annullabili**.

**Su questo sito, in sintesi**: il set **WordPress** resta acceso (è quello che fa il mestiere editoriale); **Plugins, Temi e Database restano spenti**, non perché non funzionino, ma perché il loro rischio non è compensato da alcun lavoro che questo sito debba fare. Se un giorno servisse una riparazione, si accendono **per quella sessione**, si fa il lavoro, si spengono.

## 6. Il governo del potere: quattro freni, non uno

La domanda «quanto potere diamo all'agente» non ha una risposta sola: ha quattro manopole, e conviene sapere che esistono tutte, perché usarne una sola è come chiudere una porta e lasciare tre finestre aperte.

| Freno | Dove sta | Che cosa limita |
|---|---|---|
| **1. Tool Sets** | Settings → MCP | **Quali strumenti esistono** nella sessione dell'agente: è il freno più potente, perché ciò che non è esposto non è invocabile |
| **2. Access Level del token** | Settings → MCP → Bearer Token | **Quanto può fare** ciò che è esposto: `Admin`, `Read-Write`, `Read-Only` |
| **3. Ask Before** | Settings → MCP → Access → Settings | **Che cosa deve chiedere prima**: *Never*, *Deleting* (default), *Deleting and site changes* (impostazioni, plugin, temi, utenti, file, SQL). La richiesta compare in *Waiting for You*, in parole chiare, con *Approve* e *Decline*; aspetta un'ora, l'approvazione vale 15 minuti |
| **4. Drafts Only** | Settings → MCP → Access → Settings | **Dove può scrivere**: solo bozze, mai il pubblicato |

A questi si aggiungono, per chi mette mano al PHP, tre filtri che trasformano un permesso generico in una politica: **`mwai_allow_mcp`** (quali utenti possono usare MCP, anche fra gli amministratori), **`mwai_mcp_callback`** (quali *strumenti* rifiutare: la documentazione porta l'esempio «nessuno tranne l'utente 1 può modificare le opzioni o creare utenti») e **`mwai_mcp_oauth_user_can_authorize`** (chi può approvare una connessione).

E una regola che riassume tutto: **acceso non significa usato.** Un tool set attivo è una superficie da aggiornare, da capire e da sorvegliare; un tool set spento è una preoccupazione in meno. La domanda giusta non è «che cosa potrei accendere», ma **«che cosa sono disposto a mantenere»**.

Due ultime note operative, piccole ma che fanno perdere tempo:

- dopo aver cambiato i tool set, **l'agente deve rileggere l'elenco**: va fatto un *Refresh* o una riconnessione, altrimenti continua a lavorare con la mappa vecchia;
- e l'elenco completo degli strumenti effettivamente attivi si legge in **MCP Tools & Abilities**, raggruppato per plugin: è la fonte di verità, non la documentazione — compreso questo libro.

## 7. Relazione riassuntiva

**I due MCP**

| | Server MCP | Client MCP (*Orchestration*) |
|---|---|---|
| Chi lo usa | Un agente esterno | I chatbot del sito |
| Serve a | Far lavorare l'AI **sul** sito | Far usare all'AI strumenti **fuori** dal sito |
| Stato su questo sito | **Attivo e configurato**, 54 strumenti, Drafts Only | **Non attivo** — e richiede un modello OpenAI o Anthropic, non DeepSeek |

**Che cosa ci posso fare (server MCP)**

1. Leggere in massa — l'arretrato delle bozze, a lotti, in sola lettura.
2. Scrivere e correggere blocco per blocco, con i campi SEO in Rank Math.
3. Tradurre articoli in bozza.
4. Controllare: resa reale della pagina, revisioni, log errori, Site Health, cache e permalink.
5. Preparare anteprime condivisibili, non indicizzate.
6. Annullare ciò che è stato fatto.

**Perché (e quando) toccare le impostazioni**

- Gli strumenti per **utenti** e **impostazioni di WordPress** sono nel set **WordPress**, gratuito e acceso di default: la possibilità esiste per scelta di prodotto.
- Servono per **manutenzione**, **diagnosi** e **configurazione guidata**; non servono per «comodità».
- Il set **Database** e i set **Plugins/Temi** restano spenti: il loro rischio non è compensato da nulla, e le loro modifiche **non sono annullabili**.
- Quattro freni, quattro: tool set, access level, approvazioni, bozze soltanto. E — per chi vuole di più — tre filtri PHP.

**E la frase da portarsi via**: *un server MCP ben governato non è quello che può fare di più: è quello di cui sai dire esattamente che cosa può fare, e che cosa no.*

---

*Fine della parte tecnica. Le due appendici che seguono raccolgono la scheda di configurazione e il tour delle schermate.*


---

# Parte VII — WPBot: il chatbot che parla con i tuoi lettori

## 1. Che cos'è, in due righe

**WPBot** è un plugin per WordPress prodotto da **QuantumCloud** che mette un assistente conversazionale sul sito: risponde ai visitatori, raccoglie contatti, li accompagna verso un contenuto o un modulo, e quando serve passa la conversazione a una persona.

È l'**altro mondo** rispetto ad AI Engine, e sul sito di questo libro è quello che **parla davvero con il pubblico**: nella pagina pubblica il widget di WPBot è caricato in ogni pagina, mentre l'assistente di AI Engine non è mai attivo verso i visitatori. Non è un dettaglio tecnico: è la ripartizione dei ruoli che questo capitolo vuole rendere esplicita.

| | |
|---|---|
| Produttore | **QuantumCloud** |
| Versione gratuita | sul repository WordPress come `chatbot` — versione **8.9.2**, **5.000 installazioni**, **94/100** su **124 recensioni**, aggiornata il **6 novembre 2026** |
| Versione a pagamento | venduta su `wpbot.pro`, con tre piani (Starter, Professional, Master) |
| Installazione su questo sito | `AI ChatBot – WPBot` **8.9.2** + `WPBot Pro WordPress Chatbot (Master)` **15.7.1** |

**Perché due voci nella lista plugin**: il Pro **si installa sopra** la versione gratuita e la estende. Non si sostituiscono: convivono, e la licenza Master è quella che apre l'intero catalogo di moduli.

**Un avvertimento sui numeri**, per onestà intellettuale: 5.000 installazioni attive sono un ordine di grandezza in meno delle 90.000 di AI Engine. Non significa che WPBot sia peggiore *nel suo mestiere* — significa che è un prodotto più di nicchia, scelto da chi vuole un chatbot ricco di funzioni commerciali. Il voto però è alto (94/100) e le recensioni sono 124: chi lo usa, lo usa volentieri.

## 2. Con quali intelligenze parla

Questa è la parte che ti riguarda direttamente, perché spiega perché il tuo setup funziona bene.

WPBot **integra nativamente** OpenAI, Gemini, Grok, Claude, Mistral e Ollama. E — questo è il punto — **tutti gli altri modelli passano da OpenRouter**: GPT, Claude, Grok, Cohere, **DeepSeek**, Mistral, Llama e così via. Non è un ripiego: è una via supportata, e **funziona anche con RAG**, cioè con la base di conoscenza del sito.

Quindi la tua configurazione — **OpenRouter come porta unica, DeepSeek come modello** — non è un adattamento: è **uno dei percorsi previsti dal prodotto**. La stessa chiave che usi per AI Engine serve WPBot, e i due cruscotti dei consumi restano separati (è il lato meno piacevole di avere due stack: due bollette da leggere).

Oltre ai modelli, WPBot supporta **Dialogflow** (Google), per chi preferisce un approccio a *intenti* invece che a linguaggio naturale: si definiscono intenti, entità e contesti, e il bot instrada l'input del visitatore di conseguenza. È una strada più rigida e più prevedibile — utile quando la conversazione deve seguire uno schema fisso.

## 3. Le funzionalità, spiegate una per una

**Rispondere con l'AI.** Inserita la chiave del provider, il chatbot risponde a domande di ogni tipo con il modello scelto, scegliendolo dall'elenco dei modelli disponibili.

**Istruzioni di comportamento.** Si possono dare **istruzioni al modello** su come comportarsi come «agente del sito» e su come rispondere: è l'equivalente del *system prompt* di AI Engine, ed è il campo che determina la voce del bot.

**Risultati pertinenti dal sito.** WPBot mostra le **pagine del tuo sito più rilevanti** accanto alle risposte del modello. È una funzione interessante e poco comune: invece di limitarsi a rispondere, il bot **rimanda al tuo contenuto** — che per un magazine è esattamente ciò che si vuole (il lettore legge l'articolo, non solo la risposta).

**Filtri per parole chiave.** Si può limitare l'attivazione dell'AI a determinate parole chiave, per **inclusione o esclusione**. Serve a evitare che il modello consumi token su domande fuori tema, o che risponda a certe categorie di richieste.

**RAG e base di conoscenza vettoriale.** Si scelgono **pagine, articoli e tipi di contenuto personalizzati** da trasformare in vettori, e quella base viene usata dal modello per rispondere con accuratezza. L'archivio si gestisce dal backend di WordPress. La documentazione è esplicita sul fatto che **l'aggiornamento della base** va tenuto in considerazione quando si modificano pagine e articoli.

**Caricamento di documenti.** Si possono caricare **PDF, file Word e dati JSON** perché il modello li usi come fonte. Attenzione a una limitazione dichiarata: questa funzione è disponibile **solo con OpenAI e GPT Assistant**, e richiede la licenza **Professional o Master**.

**Sessioni e cronologia.** Le conversazioni vengono conservate: si vede cosa chiedono i visitatori, si possono riprendere, e si può rispondere anche a distanza. Senza sessioni un chatbot è una scatola nera: risponde e non lascia traccia.

**Passaggio a operatore umano.** La conversazione può essere trasferita a una persona (live chat), nei piani più alti.

**Moduli conversazionali.** Il *Conversational Form Builder* trasforma la chat in un modulo: calcolatori, prenotazioni, quiz, campi con **logica condizionale**. I dati finiscono nel database e arrivano via email.

**Canali.** Lo stesso bot può vivere su **Messenger, WhatsApp e Telegram**, oltre che sul sito.

**Liste email.** Iscrizione dei visitatori a liste di contatti, con integrazione verso servizi esterni. **Sul tuo sito questo è il modulo più attivo**: il plugin registra settantatré rotte dedicate proprio alla gestione degli iscritti — note, importazione, esportazione, notifiche di consegna, rimbalzi, segnalazioni.

**Multilingua, voce, webhook, export/import.** Gestione di più lingue, conversazione vocale, invio dei dati raccolti a servizi esterni, e esportazione/importazione della configurazione fra siti.

**Lead finder.** Un modulo di ricerca e gestione dei contatti raccolti.

## 4. I piani: cosa apre la licenza

Qui c'è un concetto che vale più di ogni elenco: **i moduli non si comprano singolarmente. È la licenza a decidere quali esistono sulla tua installazione.**

| Piano | Prezzo indicativo | Che cosa sblocca |
|---|---|---|
| **Starter** | ~39 $/anno | Funzioni Pro di base, **sessioni e cronologia**, **ricerca estesa**, AI di base e Dialogflow, RAG basilare |
| **Professional** | ~99 $/anno | Tutto quanto sopra, più **form conversazionali**, **modulo WooCommerce**, AI avanzata (fine-tuning, assistenti), RAG e caricamento documenti migliori |
| **Master** | ~189 $/anno | Tutto quanto sopra, più **live chat con operatore umano**, multilinguismo avanzato, white-label |

La tua installazione è **Master**: hai il catalogo completo. E questo è il motivo per cui, davanti a un modulo spento, la domanda giusta non è «come lo attivo» ma **«mi serve davvero?»** — perché attivarlo è gratis in termini di licenza, ma non in termini di manutenzione, superficie esposta e cose che possono rompersi.

## 5. Procedura di setup, passo per passo

La procedura che segue è il percorso completo, dall'installazione alla messa online. **Dove è il wizard a lavorare, è indicato**: WPBot offre un percorso guidato che accorcia diversi di questi passaggi, e se lo hai già usato con OpenRouter, la sequenza ti risulterà familiare — questo capitolo serve a capire **cosa** quel wizard ha configurato, e cosa resta da decidere.

### Fase 0 — Prima di cominciare
1. **Aggiorna il backup** (su questo sito: UpdraftPlus, che ha un avviso di compatibilità aperto) e fai un backup completo.
2. **Tieni a portata di mano la chiave OpenRouter**: si genera nell'account OpenRouter e **non** è la stessa cosa della chiave di DeepSeek. *(Nel libro questa chiave non compare e non deve comparire: vive solo nelle impostazioni del plugin.)*
3. **Decidi il nome del bot e la lingua**: sono le due scelte che si vedono di più e si cambiano malvolentieri dopo.

### Fase 1 — Installazione
4. Da WordPress: **Plugin → Aggiungi nuovo** → cerca `chatbot` (WPBot) → installa e **attiva la versione gratuita**.
5. Nel menu di WordPress compare la voce **WPBot**. Da lì si procede.

### Fase 2 — La licenza Pro
6. Carica il pacchetto Pro (*Plugin → Aggiungi nuovo → Carica plugin*) e attivalo: si affianca alla versione gratuita, non la sostituisce.
7. Inserisci la **chiave di licenza** nella sezione dedicata e verifica che risulti attiva: è il passaggio che fa comparire i moduli del piano acquistato.

### Fase 3 — Il wizard di configurazione (il percorso guidato)
8. Avvia il **wizard**. È il percorso che hai usato: chiede le cose essenziali in sequenza e le scrive al posto tuo nelle impostazioni del plugin. In sintesi fa quattro cose:
   - **scegliere il servizio AI** (qui: **OpenRouter**);
   - **collegare la chiave** del servizio;
   - **scegliere il modello** da usare per le risposte;
   - **impostare le basi dell'aspetto e del saluto** del bot.
9. **Punto di controllo**: se il wizard funziona, nella schermata del bot c'è un modello selezionato e il widget compare sul sito. Se non compare, il problema è quasi sempre nella fase 3 o 4 — chiave o modello — non nell'aspetto.

### Fase 4 — Rifinire il collegamento AI (a mano)
Il wizard imposta il minimo. Qui si completa il lavoro, nelle impostazioni di WPBot → sezione **AI Integrations**:
10. Conferma **OpenRouter** come servizio e **il modello** desiderato (per DeepSeek: il modello DeepSeek dell'elenco OpenRouter).
11. Scrivi le **istruzioni di comportamento**: chi è il bot, di cosa parla, come risponde, cosa **non** deve fare. Per un magazine umanistico la regola d'oro è: *rispondi citando gli articoli del sito e invita a leggerli*, invece di riassumere tutto in chat.
12. Attiva, se la vuoi, la **visualizzazione delle pagine pertinenti** accanto alle risposte.
13. Valuta i **filtri per parole chiave**: includere solo certi argomenti, o escluderne altri.

### Fase 5 — La base di conoscenza (RAG)
14. Nella sezione della knowledge base, **seleziona pagine, articoli e tipi di contenuto** da trasformare in vettori.
15. Avvia l'**indicizzazione** e attendi che finisca: richiede tempo, come tutte le operazioni di questo tipo.
16. Se vuoi aggiungere **PDF o documenti**, verifica di essere nel piano giusto e con il provider giusto (OpenAI/GPT Assistant, Professional o Master).

### Fase 6 — Aspetto e conversazione
17. Personalizza **posizione, colori, avatar, messaggio di benvenuto** del widget.
18. Configura il **menù iniziale**: i pulsanti che il visitatore può premere per partire (le domande più frequenti, il contatto, la newsletter).
19. Definisci le **risposte rapide** per le richieste che non devono passare dall'AI — e che quindi non costano token.

### Fase 7 — Sessioni, limiti, canali
20. Verifica che le **sessioni** siano attive: senza, non vedrai mai cosa chiedono i lettori.
21. Imposta i **limiti d'uso**, se il bot è aperto a tutti: è la protezione contro la sera in cui qualcuno decide di fargli centomila domande.
22. Attiva i **canali** che ti servono davvero. Messenger, WhatsApp e Telegram esistono, ma ognuno è un canale da presidiare: attivare tutto e non guardare nessuno è peggio che non attivare nulla.

### Fase 8 — Test prima della messa online
23. Apri il sito in **finestra anonima** (per non vedere il bot come amministratore) e fai **le domande che farebbe un lettore**: tre facili, tre difficili, una fuori tema, una in un'altra lingua.
24. Controlla che le risposte **citino il sito** quando è il caso, che i pulsanti funzionino, che il modulo raccolga i dati.
25. Controlla le **sessioni**: la conversazione appena fatta deve comparire.

### Fase 9 — Manutenzione
26. **Guarda le sessioni una volta a settimana** e correggi le risposte sbagliate: è il lavoro che distingue un chatbot utile da uno che dà fastidio.
27. **Ri-indicizza** la base di conoscenza quando pubblichi contenuti importanti.
28. **Aggiorna** plugin e licenza, e tieni d'occhio i consumi sul conto OpenRouter.
29. **Dichiara il bot** nell'informativa privacy: è un assistente automatico che parla con le persone, e va detto.

## 6. WPBot e AI Engine: il confronto

Entrambi possono fare il chatbot, e qui sta la confusione da sciogliere. La differenza non è di qualità: è di **baricentro**.

| | **WPBot** | **AI Engine** |
|---|---|---|
| Produttore | QuantumCloud | Meow Apps |
| Installazioni (versione gratuita) | 5.000 | 90.000 |
| Il suo mestiere | **Conversare con i visitatori** | **Far lavorare l'AI sul sito** — e il chatbot è una delle sue funzioni |
| Dove vive il valore | Sessioni, contatti, form conversazionali, canali, handover umano | Strumenti sul contenuto: blocchi, media, SEO, tassonomie, menu |
| Chi lo comanda | Il visitatore | Anche **un agente esterno**, via **MCP** |
| Cosa può toccare | La conversazione | Gli articoli, le pagine, i media, i campi SEO, le revisioni, la cache |
| Reversibilità | — | **Draft bozze, Ask Before, Undo 30 giorni** |
| Base di conoscenza | **Sua** (RAG proprio) | **Sua** (Knowledge, archivio separato) |
| Modelli | OpenRouter, OpenAI, Gemini, Grok, Claude, Mistral, Ollama, Dialogflow | Qualunque provider, incluso OpenRouter |

### Perché «AI Engine interagisce più completamente con il sito» è vero

Questa è l'osservazione centrale, e regge. Il motivo si può riassumere in **quattro differenze strutturali**.

**1. La direzione.** WPBot è costruito per un flusso *verso il visitatore*: qualcuno arriva, chiede, riceve. AI Engine è costruito per un flusso *verso il sito*: qualcuno — o qualcosa — decide di fare un lavoro **sui contenuti**. È la differenza tra un centralinista e un redattore.

**2. La superficie.** WPBot tocca la conversazione. AI Engine tocca **articoli e pagine blocco per blocco**, media, commenti, tassonomie, menu, CSS e stili, template, campi SEO nel plugin SEO installato, campi personalizzati, revisioni. Sono due ordini di grandezza di superficie diversi, e si vede in qualunque compito reale: «trova le 541 bozze superate» è un lavoro che WPBot non può nemmeno iniziare.

**3. L'apertura verso l'esterno.** AI Engine espone un **server MCP**: il sito diventa qualcosa che un agente esterno può comandare, con strumenti descritti, permessi limitabili e cronologia annullabile. WPBot parla con i visitatori; non è progettato per essere comandato da un agente che lavora al posto tuo.

**4. I guardrail.** Non è un dettaglio: in AI Engine esistono **Drafts Only**, **Read-only**, **Ask Before** e **Undo a 30 giorni**, cioè un impianto pensato per *delegare senza perdere il controllo*. È l'unico, tra i due, che può essere messo in mano a una macchina senza che la macchina possa pubblicare al posto tuo.

### E il rovescio della medaglia

Sarebbe disonesto fermarsi qui. **Su un terreno WPBot è più avanti, e di parecchio**: tutto ciò che riguarda *gestire persone che conversano*. Sessioni con storico, ripresa di una conversazione a distanza, **passaggio a un operatore umano**, moduli conversazionali con logica condizionale, presenza su Messenger/WhatsApp/Telegram, raccolta di contatti e liste email. AI Engine ha un chatbot — lo ha, ed è onesto — ma non ha questo apparato commerciale e di assistenza.

Detto in una riga: **WPBot è un ottimo strumento di relazione; AI Engine è uno strumento di produzione.** Il primo serve a chi arriva; il secondo serve a chi scrive.

### Che cosa farne, su questo sito

La ripartizione che il sito già realizza — e che questo libro propone di rendere consapevole — è questa:

- **WPBot resta il volto pubblico**: è installato, configurato, attivo, usa OpenRouter e ha la mailing list che lavora. Il suo compito è accogliere, rispondere e raccogliere.
- **AI Engine resta il motore interno**: legge, classifica, prepara bozze, sistema tassonomie, scrive i campi SEO. Il suo compito è il lavoro che nessuno vuole fare.
- **Le due basi di conoscenza restano separate** — sono due archivi diversi con due modelli di embedding diversi — e va bene così: una serve a rispondere a un lettore, l'altra a un lavoro editoriale. Ma va **saputo**, altrimenti si perde tempo a cercare di far leggere all'uno la memoria dell'altro. *(Non è possibile: sono sistemi indipendenti.)*

L'unico errore da evitare, avendoli entrambi: **accendere due chatbot verso lo stesso pubblico.** Due finestre di chat con due voci diverse, sullo stesso sito, non sono una ricchezza: sono la prova che nessuno ha deciso chi parla.

---

*Con questo capitolo la parte tecnica è completa: sei mondi — la teoria del collegamento, gli strumenti, AI Engine, il caso di studio, i nomi che si confondono, l'MCP in pratica — più i due protagonisti messi a confronto. Le appendici che seguono sono la cassetta degli attrezzi.*


---

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


---

# Appendice B — Tour delle schermate di AI Engine

*Le schermate reali dell'installazione, spiegate una per una. Ogni sezione è autonoma: si può leggere in qualunque ordine, e serve a chi apre AI Engine per la prima volta e vuole capire che cosa sta guardando.*

---

## Schermata 1 — Il Playground

**Come ci si arriva**: dalla barra in alto di AI Engine, la voce **Playground** (accanto a *Content* e all'icona della chiave inglese, che porta alle impostazioni). La targhetta verde dice che siamo lì, e in basso a destra compare la versione: **3.9.2 - latest**, cioè l'ultima disponibile.

**Che cos'è, in una frase**: è **la sala prove**. Un posto dove parlare con un modello senza conseguenze — niente articoli, niente modifiche al sito: solo una conversazione, per capire come risponde un modello e quanto costa.

### Che cosa si vede

**In alto**, un invito a lasciare una recensione (*Write a review*, con *Later* per rimandare) e — più interessante — il percorso guidato: **«Exploring AI Engine — Goal 1 of 10: Connect your AI»**, con dieci puntini di avanzamento e un collegamento *Open AI settings*.

> **Da notare**: il primo dei dieci obiettivi è *«collega la tua AI»*, e risulta ancora da chiudere. Non è un errore: significa che il percorso guidato non è stato completato — probabilmente perché la chiave c'è già e il tutorial è rimasto lì. È una spia da controllare, non un problema.

**Nel pannello di sinistra**, trovano posto tre gruppi di comandi:

| Gruppo | Che cosa contiene | A che cosa serve |
|---|---|---|
| **Preset** | Un menù (*Default Template*), un pulsante *Save*, uno *Save as...* | Salvare una combinazione di impostazioni e ritrovarla pronta. Il "preset" è la ricetta: system prompt, parametri e strumenti insieme |
| **System prompt** | Una casella di testo, con dentro un esempio: *«You are a friendly assistant for a WordPress site. Answer in short paragraphs.»* | È **l'istruzione di ruolo**: dice al modello chi è e come deve parlare. È il campo più importante di tutta la schermata |
| **Parameters** | *Max tokens* (con un pulsante *Model default*), la spunta **Stream the replies**, e la nota *«Temperature and reasoning are set per model, with the sliders icon»* | *Max tokens* limita la lunghezza della risposta; *Stream* fa comparire il testo mentre viene scritto. I parametri fini (temperatura, ragionamento) **non sono qui**: stanno dietro l'icona a cursori, accanto al nome del modello |
| **Tools** | Una spunta **Web search**, con la nota *«Only models that support it use it»* | Abilita la ricerca web per quella conversazione — è l'add-on *Web Search* di Meow Apps, che risulta installato |

**Nel pannello centrale**, l'area della conversazione: tre comandi in alto — **Compare** (confronta due modelli sulla stessa domanda), **Copy as Markdown** (copia la conversazione in formato testo), **Clear** (pulisci) — poi la casella *Message the model...* con l'avvertenza *«Enter to send. Shift+Enter for a new line»*.

**In basso**, due selettori che vale la pena guardare insieme:

- un primo menù impostato su **Default**, che sceglie *quale slot di modello* usare (Default, Fast, Vision…): è il collegamento diretto con la configurazione che si fa in *Settings → AI*;
- il **selettore del modello vero e proprio**, che in questa installazione mostra: **«DeepSeek: DeepSeek V4.1 Flash 1017»**, con il prezzo **$0.10 in / $0.50 out per milione di token**.

**Il pannello vuoto** ripete, per chiarezza, il nome del modello e il suo costo, e invita: *«Send a message to start»*.

### Le due cose da sapere su questa schermata

**Primo: il nome del modello è preceduto dall'ambiente.** La forma è *Ambiente: Modello*. Il prefisso «DeepSeek» **non indica il produttore del modello: indica il nome dell'ambiente configurato** in *Settings → AI*. È il motivo per cui due siti possono avere lo stesso modello elencato con prefissi diversi.

**Secondo: il prezzo scritto qui è una stima interna del plugin, non il listino ufficiale del provider.** Vale la pena saperlo perché lo stesso modello, letto da provider diversi, mostra cifre diverse — e perché esiste un add-on (DeepSeek) il cui scopo dichiarato è proprio *rendere i costi esatti*. Se i numeri in *Insights* dovessero sembrare strani, la spiegazione è spesso qui.

---

## Schermata 2 — Il Content Studio

**Come ci si arriva**: dalla barra in alto, voce **Content**. La targhetta verde dice **CONTENT STUDIO**.

**Che cos'è, in una frase**: è **la scrivania**. A differenza del Playground — dove si conversa — qui si **produce un articolo**, e lo si fa passando per gradi: prima la traccia, poi il testo.

### Il flusso, che è la cosa più importante da capire

In alto c'è una fila di schede che **è** il metodo di lavoro:

| Scheda | Che cosa succede |
|---|---|
| **Brief** | Si descrive l'articolo: argomento, pubblico, tono, lunghezza. È la scheda attiva in questa schermata |
| **Outline** | Compare la **traccia**, e la si può rimodellare **prima** che venga scritto un solo paragrafo |
| **Draft** | Si genera la stesura vera e propria |
| **Save Draft** | Si salva il risultato come bozza |

La spiegazione sta scritta nella schermata stessa, ed è la sintesi migliore di tutta la funzione: *«Describe the article. An outline comes first, you can reshape it before a single paragraph is written.»* A destra, il pannello vuoto anticipa il resto: *«Your article will take shape here — first the outline, then every section as it is written.»*

Questo è il punto che distingue un generatore di articoli serio da un pulsante magico: **la traccia viene prima del testo**, e la traccia si corregge. Chi scrive per mestiere sa che il valore di un articolo sta lì, non nella stesura.

### I campi della scheda Brief

| Campo | Valore nell'esempio | A che cosa serve |
|---|---|---|
| **Template** | *Not using a template* (con *Save* e *Save as new*) | Salvare un modulo di istruzioni riutilizzabile: utile quando si scrive sempre lo stesso *tipo* di articolo |
| **Topic** | «How to prepare your garden for winter, with a checklist for the last weekend of autumn» | L'argomento. Nota: questo è un **esempio di prova**, non contenuto del sito |
| **Audience** | «Beginner gardeners with a small backyard» | A chi è rivolto il testo: cambia lessico, esempi, livello di dettaglio |
| **Tone** | **Friendly** selezionato; disponibili *Professional, Expert, Playful, Persuasive, Neutral* | Il registro. Per un magazine umanistico «Friendly» o «Expert» sono i due poli utili |
| **Length** | *(campo visibile solo in parte nella schermata)* | La lunghezza desiderata |

### Le due segnalazioni in alto (che non riguardano AI Engine, ma vanno lette)

**Rank Math** avverte che ha trovato un nuovo tipo di contenuto — `astra-advanced-hook`, cioè gli elementi del *Site Builder* di Astra — e invita a controllare la pagina *Titoli e Meta* e la *Sitemap*. **È un avviso da non ignorare alla leggera**: quei contenuti servono a costruire pezzi di layout (intestazioni, footer, hook), non sono articoli, e non devono finire indicizzati dai motori di ricerca.

**UpdraftPlus** è l'avviso più importante della schermata, ed è di colore rosso: la versione installata **non è dichiarata compatibile con WordPress 7.1.4** (è testata fino alla 6.9) e chiede di aggiornare. Su un sito dove si programmano operazioni massive sui contenuti — e dove il backup è la rete di sicurezza — questo va sistemato **prima** di tutto il resto.

---

## Schermata 3 — Knowledge (la memoria del sito)

**Come ci si arriva**: si attiva il modulo **Knowledge** in *Modules*, e compare la scheda **Knowledge**. In alto a sinistra c'è il **selettore dell'ambiente**: in questa installazione è impostato su **Chroma**.

**Che cos'è, in una frase**: è **la memoria del sito**. Prende i contenuti — articoli, pagine, PDF — li spezza in frammenti, li trasforma in numeri (i *vettori*) e li conserva in un archivio, così che l'AI possa ritrovare i pezzi pertinenti quando qualcuno fa una domanda.

**L'analogia più utile**: immagina una biblioteca dove ogni pagina di ogni libro viene tagliata in foglietti e ogni foglietto riceve una **scheda che ne descrive il significato**. Quando arriva una domanda, non si cerca la parola esatta: si cercano i foglietti il cui *significato* assomiglia di più alla domanda. È per questo che si chiama ricerca *semantica* e non ricerca per parole chiave.

**E una cosa che vale sempre la pena ripetere**: questa non è una forma di addestramento. Il modello non impara nulla di nuovo: gli viene semplicemente mostrato il materiale giusto al momento giusto. La tecnica si chiama **RAG**.

### L'elenco dei frammenti

A sinistra, una tabella con una riga per ogni contenuto indicizzato:

| Colonna | Che cosa contiene |
|---|---|
| **Status** | Una spunta verde **OK** se il frammento è stato creato e salvato; un punto esclamativo rosso **ERROR** se qualcosa è andato storto |
| **Title / Model** | Il titolo del contenuto e, se lo stato è OK, **il modello di embedding usato e le sue dimensioni** |
| **Ref** | Il collegamento all'elemento originale, per esempio *ID #37476 POST* |
| **Updated** | Quando è stato aggiornato l'ultima volta |
| **Azioni** | Tre icone per riga: matita (modifica), fulmine (rigenera il frammento), cestino (elimina) |

I frammenti che funzionano risultano generati con **`Qwen/Qwen3-Embedding-0.6B`, 1024 dimensioni** — un modello di embedding, non un modello conversazionale.

### Il pannello di destra

| Voce | Valore qui | Che cosa significa |
|---|---|---|
| **Query Mode** | *No* | **È una modalità di prova, non un interruttore.** Attivandola si scrive una domanda come la scriverebbe un visitatore (*«What do you know about…»*) e si vede **quali frammenti vengono trovati e con quale punteggio**: serve a tarare Min Score e Max Results. A decidere se il chatbot *usa* la memoria è un'altra cosa — la selezione dell'ambiente di conoscenza **nelle impostazioni del chatbot** |
| **Expert Mode** | *No* | Modalità avanzata: mostra e permette di regolare ogni dettaglio tecnico |
| **Min Score (%)** | **30** | La **soglia di pertinenza**: sotto il 30% di somiglianza, un frammento viene scartato |
| **Max Results** | **10** | Quanti frammenti al massimo vengono passati al modello come contesto |

Il plugin lo spiega da solo, con una frase che è la sintesi migliore dei due parametri: *«The best **10** embeddings with a score of **30%** or more will provide additional context to your AI queries.»*

Sotto, un banner verde annuncia: **«Auto-sync is on for Chroma.»** — la sincronizzazione automatica è attiva. E un promemoria: le impostazioni di sincronizzazione e ricerca si configurano globalmente in *Settings → Knowledge*.

Infine, la sezione **Build Knowledge**, con tre comandi: **Add Manually** (aggiunge un frammento a mano), **Push All (606) Articoli** (indicizza tutti gli articoli pubblicati, con un menù per scegliere il tipo di contenuto), **Upload PDF** (indicizza un PDF).

### La diagnosi di questa installazione

Guardando le date invece dei titoli, la schermata racconta una storia precisa.

- Le righe con stato **OK** sono tutte aggiornate **al 12 settembre 2026**. Da allora — **56 giorni** — la memoria non si è arricchita.
- Le due righe più recenti, del **7 novembre 2026 alle 01:26 e 01:31**, sono in **errore**. E non è un caso che siano proprio i **due articoli pubblicati più di recente** (ID 37476 e 37466).
- Il messaggio è esplicito: *«Failed to add vector to Chroma: **Billing limit exceeded.** Log into trychroma.com or contact hello@trychroma.com to raise it.»*

**Che cosa significa, senza gergo**: la sincronizzazione automatica *funziona* — si è svegliata da sola quando hai pubblicato i due articoli nuovi e ha provato a schedarli. Ma la biblioteca dove deve metterli (**Chroma**, un servizio esterno, con un suo conto e un suo limite) ha esaurito il credito disponibile. Quindi respinge tutto.

Tre cose che ne discendono:

1. **La memoria del sito è ferma al 12 settembre.** Tutto ciò che hai pubblicato dopo non è indicizzato.
2. **Chi usa davvero la memoria è un'altra domanda** — e non la decide `Query Mode`. Il consumatore naturale della knowledge è **un chatbot di AI Engine**, e la documentazione è esplicita: *«Don't forget to select your Knowledge environment in your chatbot settings to actually use it. If you do not do this, your knowledge environment will never be used when you query your chatbot.»* L'agente collegato via MCP **non la usa affatto**: legge e scrive con i suoi strumenti. E WPBot ha una base di conoscenza **separata** (suo archivio, suo meccanismo). Oggi, su questo sito, **nessun chatbot di AI Engine è attivo verso il pubblico**: la memoria sta lavorando per nessuno.
3. **Non premere `Push All (606)` adesso.** Ripeterebbe 606 volte un'operazione che oggi fallisce; e anche risolto il credito, va deciso *dove* indicizzare prima di indicizzare.

### Che cosa fare: tre strade, in ordine di sensatezza

**Prima strada (consigliata) — spostare l'archivio dentro WordPress.** In *Settings → AI* si crea un ambiente di tipo **Internal (WordPress DB)**: nessun conto, nessuna chiave, nessun costo, tutto nel database del sito. Il limite dichiarato è di circa **20.000 frammenti**, e 606 articoli ne producono — a seconda di come vengono spezzati — **tra 1.800 e 17.000**. Ci sta. In cambio si perde in velocità quando la base diventa molto grande, che qui non è il caso.

**Seconda strada — sistemare Chroma.** Basta aumentare il limite su `trychroma.com`. È la via giusta se un giorno la base di conoscenza diventerà grande davvero (migliaia di documenti).

**Terza strada — spegnere Knowledge, deliberatamente.** Se nessun chatbot di AI Engine la interroga — e oggi non ce n'è nessuno attivo — tenerla accesa significa mantenere un servizio esterno che fallisce a ogni pubblicazione, per una memoria che non ha lettori.

**Una nota tecnica da conservare**: il modello usato è `Qwen/Qwen3-Embedding-0.6B` con **1024 dimensioni**. L'API modelli di OpenRouter **non espone alcun modello di embedding** (verificato il 7/11/2026 su 460 modelli): esiste quindi, da qualche parte nella configurazione, un **ambiente di embeddings separato**. E se un domani lo si cambia, le **dimensioni devono restare 1024**, altrimenti i frammenti nuovi non sono più confrontabili con quelli vecchi.

### Procedura: come si sposta la memoria da Chroma a WordPress

**Prima la precisazione che scioglie il dubbio: «spostare» non è la parola giusta.** I frammenti non sono un file da copiare: sono il **risultato di un calcolo** fatto da un modello. Cambiando archivio, si **rigenerano** — è un lavoro in più, non un trasloco.

I passi concreti, nell'ordine:

1. **Crea l'archivio interno.** In *Settings → AI* → **Environments for Embeddings** → pulsante **+** → scegli il tipo **Internal (WordPress DB)**. Non c'è nient'altro da configurare: nessun account, nessuna chiave, nessun costo di archivio.
2. **Seleziona il nuovo ambiente** nella scheda Knowledge, dal menù in alto a sinistra. Attenzione a un dettaglio che genera spesso perplessità: **finché non selezioni un ambiente, i pulsanti *Create New*, *Push All* e *Upload PDF* restano grigi.** Non è un guasto.
3. **Attiva la sincronizzazione sul nuovo ambiente** (scheda **Sync** → *Enable Sync* → conferma con *Use Current Environment*).
4. **Chiudi il rubinetto di Chroma.** Se l'ambiente Chroma resta lì con l'auto-sync attivo, continuerà a tentare di scrivere e a fallire a ogni pubblicazione. Va disattivato — o svuotato.
5. **Lancia `Push All (606)`** sul nuovo ambiente: è questo il passo che genera i frammenti nella nuova sede.
6. **Verifica i costi.** Le chiamate le paghi al provider del modello di embedding (`Qwen/Qwen3-Embedding-0.6B`, 1024 dimensioni); Chroma non c'entra più nulla.

E per controllare che tutto funzioni: accendi **Query Mode**, scrivi una domanda come la scriverebbe un lettore, e guarda quali frammenti rispondono e con quale punteggio. Se non ne trova nessuno, il parametro da muovere è **Min Score** (un valore troppo alto scarta tutto).

### Domande frequenti su questa schermata

**L'archivio è su Chroma e ho appena pagato: devo rifare tutti i 606 articoli?**
No, non necessariamente. `Push All` è un'**azione di massa**: serve quando l'archivio è vuoto o incompleto. Dopo aver alzato il limite, la sequenza giusta è: (1) rigenerare **le due righe in errore** con il fulmine accanto alla riga; (2) lasciare che l'**auto-sync** riprenda da solo sui nuovi articoli; (3) usare `Push All` **solo se** il conteggio delle voci è molto inferiore al numero di articoli pubblicati — cioè se la precedente sincronizzazione si è interrotta a metà.

**Come faccio a sapere quante voci ci sono già?**
Nella scheda Knowledge, con l'ambiente selezionato: l'elenco è il catalogo, e si può leggere per stato. Attenzione a non confondere due numeri: il **`(606)` accanto a `Push All`** è il numero di **articoli pubblicati**, non di voci indicizzate. Sono due cose diverse.

**Quanto costa rifare tutto?**
Poco, ed è la parte che non deve preoccupare. Il modello usato è `Qwen/Qwen3-Embedding-0.6B`, che su DeepInfra è listato a **0,010 $ per milione di token**. Seiocentosei articoli producono all'incirca **tra 0,9 e 2,1 milioni di token**: cioè **tra uno e due centesimi** per l'intero corpus. Il costo non è il vincolo.

**E quanto tempo ci vuole?**
Questo, invece, va messo in conto. I timestamp visibili nella schermata procedono a **circa cinque minuti di distanza l'uno dall'altro**: se il ritmo è quello, una ricostruzione completa può durare **ore**. Da qui una regola pratica: **non interrompere una sincronizzazione a metà**. Un archivio parziale è peggio di un archivio vuoto, perché non sai più che cosa c'è dentro.

**E se nessuno la interroga?**
Allora la domanda giusta non è «come la riparo», ma **«per chi la riparo»**. Oggi su questo sito la memoria non ha lettori: nessun chatbot di AI Engine è attivo verso il pubblico, l'agente MCP non usa gli embeddings, WPBot ha una base di conoscenza sua. Pagare Chroma in questa situazione significa pagare un servizio esterno per una memoria che non risponde a nessuno. La sequenza sensata è: **prima decidi chi chiederà, poi scegli dove conservare**.

---

*(Le prossime schermate si aggiungono qui sotto, in ordine, man mano che vengono raccolte.)*


---

# Appendice C — Procedura: portare gli embedding nel database di WordPress

*Runbook operativo. Ogni fase ha una durata indicativa, un esito atteso e un punto di controllo. Le fasi 0 e 1–4 durano in tutto una decina di minuti; la fase 5 lavora in background per ore senza di te.*

---

## Premessa: due dipendenze, non una

Prima di toccare qualsiasi cosa, va fissato un punto che quasi tutti sbagliano, e che cambia il senso di tutta la procedura.

Una base di conoscenza ha **due dipendenze distinte**:

| Dipendenza | Che cos'è | Che fine fa con questa procedura |
|---|---|---|
| **L'archivio vettoriale** | Dove vengono conservati i frammenti (Chroma, oggi) | **Cambia**: passa nel database di WordPress |
| **Il modello di embedding** | Il calcolo che trasforma un testo in numeri (`Qwen/Qwen3-Embedding-0.6B`, 1024 dimensioni) | **Resta**: continua a servire un provider esterno |

Cioè: questa procedura **elimina Chroma, non elimina il modello**. Il calcolo degli embedding continuerà a essere una chiamata a un servizio (o a un engine locale, ma senza GPU non è una strada praticabile). Chi crede di «rendere tutto locale» con un clic rimane sorpreso: si rende locale **la conservazione**, non il calcolo.

**Che cosa si guadagna**: nessun conto esterno, nessuna chiave, nessun limite di fatturazione, nessun costo di archivio.
**Che cosa si perde**: velocità di ricerca su basi molto grandi (il limite dichiarato è di circa **20.000 frammenti**), e qualche chilo di database in più da amministrare.

---

## Fase 0 — Pre-volo (15 minuti)

Da fare **prima** di qualsiasi modifica, in quest'ordine.

1. **Aggiorna UpdraftPlus.** Sulla tua installazione pende un avviso rosso: la versione presente non è dichiarata compatibile con WordPress 7.1.4 (è testata fino alla 6.9). Il backup è la rete di sicurezza di tutta questa procedura: va messo in grado di funzionare.
2. **Fai un backup completo** (file + database) e verifica che sia completato, non solo avviato.
3. **Annota la configurazione attuale su un foglio** — serve se si torna indietro:
   - ambiente dell'archivio: **Chroma**
   - modello di embedding: **`Qwen/Qwen3-Embedding-0.6B`**, **1024 dimensioni**
   - **Min Score: 30%** · **Max Results: 10** · auto-sync: **attivo**
4. **Non cancellare nulla.** Niente viene rimosso da Chroma in questa procedura, se non alla fase 7 — a cose verificate.

> **Punto di controllo**: il backup esiste, è completo, e i cinque valori sono scritti da qualche parte che non è la tua memoria.

---

## Fase 1 — Creare l'archivio interno (2 minuti)

1. Vai in **Settings → Knowledge**.
2. Cerca la sezione **Environments for Embeddings** e clicca il **pulsante verde «+»**.
3. Nel selettore del tipo, scegli **Internal (WordPress DB)**.

**Non c'è nient'altro da configurare**: nessun endpoint, nessuna chiave, nessun account. Tutto viene gestito nel database del sito.

> **Punto di controllo**: nell'elenco degli ambienti compaiono ora **due** voci: `Chroma` (il vecchio) e il nuovo ambiente interno.

---

## Fase 2 — Confermare il modello di embedding (2 minuti)

L'archivio è nuovo, ma il calcolo resta lo stesso: va verificato che il modello in uso sia ancora quello, per una ragione tecnica precisa — **le dimensioni devono combaciare con l'indice**.

1. Vai in **Settings → AI → Default Environments for AI → Embeddings**.
2. Verifica: modello **`Qwen/Qwen3-Embedding-0.6B`**, **Dimensions: 1024**.

**Non cambiarlo adesso.** Se un domani lo cambi, la dimensione scritta deve restare **1024**, altrimenti i frammenti nuovi non saranno più confrontabili con quelli vecchi — è l'errore che nella documentazione compare come *«Vector dimension 1536 does not match the dimension of the index 1024»*, e si risolve solo rifacendo tutto da capo.

> **Punto di controllo**: modello e dimensioni letti e confermati.

---

## Fase 3 — Selezionare il nuovo ambiente (1 minuto)

1. Torna nella scheda **Knowledge**.
2. In alto a sinistra c'è il **selettore dell'ambiente**: aprirlo e scegliere **il nuovo ambiente interno** (non più Chroma).

**Un dettaglio che genera inutili allarmi**: finché non selezioni un ambiente, i pulsanti *Create New*, *Push All* e *Upload PDF* restano **grigi**. Non è un guasto: è il plugin che aspetta di sapere dove lavorare.

> **Punto di controllo**: i tre pulsanti della sezione *Build Knowledge* sono diventati attivi.

---

## Fase 4 — Attivare la sincronizzazione sul nuovo ambiente (2 minuti)

1. Nel pannello di destra, sezione **Environment**, apri la scheda **Sync**.
2. Clicca **Enable Sync**.
3. Conferma con **Use Current Environment** (cioè: sincronizza l'ambiente che hai davanti).

**Attenzione a una nota che sta nel pannello stesso**: i **filtri** di sincronizzazione (quali tipi di contenuto entrano) sono **condivisi fra tutti gli ambienti**. Se un domani cambiassero, cambiano per entrambi.

> **Punto di controllo**: compare il banner verde *«Auto-sync is on for …»* riferito al **nuovo** ambiente.

---

## Fase 5 — Riempire il nuovo archivio (da pochi minuti a ore)

**5a — Prima una prova minima (5 minuti).** Non lanciare subito i 606 articoli. Aggiungi **una voce manuale** con *Add Manually* (o rigenera **una** riga esistente col fulmine). Serve a verificare in trenta secondi che la catena funzioni: modello raggiungibile → vettore calcolato → vettore scritto nell'archivio locale.

> **Punto di controllo**: la voce nuova compare con **spunta verde OK** e le dimensioni **1024**. Se compare **rossa**, leggi il messaggio d'errore *prima* di procedere: 9 volte su 10 è il modello di embedding non raggiungibile, non l'archivio.

**5b — Poi la massa.** Clicca **`Push All (606)`** con il tipo di contenuto impostato su **Articoli**.

Tre cose da sapere **prima** di premerlo:

- **Costa pochi centesimi.** Il conto lo paga il provider del modello di embedding: con `Qwen3-Embedding-0.6B` listato a **0,010 $ per milione di token**, i 606 articoli valgono all'incirca **0,9–2,1 milioni di token**, cioè **1–2 centesimi**. Il costo non è un motivo di esitazione.
- **Richiede tempo.** I timestamp del tuo archivio attuale procedono a circa **cinque minuti di distanza l'uno dall'altro**: se il ritmo è quello, una ricostruzione completa può durare **ore**. Lavora in background: non restare lì a guardare.
- **Non interromperla a metà.** Un archivio parziale è peggio di uno vuoto, perché non sai più che cosa contiene. Se qualcosa si blocca, si riprende: l'operazione è ripetibile.

**Se la sincronizzazione si ferma**: nella quasi totalità dei casi è **WP-Cron** che non gira. La documentazione indica di controllare che in `wp-config.php` non ci sia `define('DISABLE_WP_CRON', true);` e, per i lavori lunghi, di affiancare un **cron di sistema** che chiami `wp-cron.php` a intervalli regolari.

> **Punto di controllo**: le righe si accumulano con stato **OK**; il conteggio cresce; l'elenco non ha zone rosse.

---

## Fase 6 — Verificare che la memoria *funzioni* (5 minuti)

Avere l'archivio pieno e avere una memoria che *serve* sono due cose diverse. Qui si controlla la seconda.

1. Accendi **Query Mode** nella scheda Knowledge.
2. Scrivi una domanda **come la scriverebbe un lettore** — per esempio una domanda su un tema che sai essere trattato in almeno tre articoli.
3. Guarda **quali frammenti vengono trovati e con quale punteggio**.

Come si legge il risultato:

| Che cosa vedi | Che cosa significa | Che cosa si fa |
|---|---|---|
| Ritornano frammenti pertinenti, punteggi sopra 30% | Tutto in ordine | Nulla |
| Ritornano frammenti, ma poco pertinenti | **Min Score troppo basso** | Alzare la soglia (da 30 a 40–50) |
| **Non ritorna nulla** | **Min Score troppo alto** oppure domanda troppo generica | Abbassare la soglia e riformulare: la ricerca è per **significato**, non per parole |
| Errori rossi | Modello o archivio | Rileggere il messaggio: indica quale dei due |

Poi **spegni Query Mode**: era una prova, non un'impostazione da lasciare accesa.

---

## Fase 7 — Spegnere Chroma (5 minuti)

Solo **dopo** aver verificato la fase 6.

1. Seleziona di nuovo l'ambiente **Chroma** nel selettore e **disattivane la sincronizzazione** (scheda Sync → disabilita). Finché resta attiva, il sito continuerà a tentare di scrivere su Chroma — e continuerà a fallire a ogni pubblicazione.
2. **Le voci già dentro Chroma**: puoi svuotarle dall'elenco (selezione + elimina) o lasciarle lì. Non danno fastidio a WordPress; occupano spazio nel tuo conto Chroma. Se hai smesso di pagare, non c'è nulla da fare: resteranno finché non torna il credito.
3. **Non cancellare l'ambiente Chroma dalla configurazione** finché non sei sicuro: tenerlo qualche giorno costa zero e permette un confronto fra i due archivi.

> **Punto di controllo**: pubblicando un articolo di prova, **nessun errore rosso** comparso da nessuna parte.

---

## Fase 8 — Accendere il consumatore (5 minuti)

Questo è il passaggio che, da solo, decide se tutto il lavoro serve a qualcosa.

**La memoria non viene usata se non la si assegna a qualcuno.** Nelle impostazioni di un **chatbot di AI Engine** c'è la sezione dove si sceglie l'ambiente di conoscenza: se resta vuota, la documentazione è esplicita — *«your knowledge environment will never be used when you query your chatbot»*.

Quindi, in ordine di domanda:

1. **C'è un chatbot di AI Engine attivo verso il pubblico?** Oggi no: il pubblico è servito da WPBot, che ha una base di conoscenza sua e separata. Quindi la fase 8, su questo sito, è **una decisione**, non un'operazione: o si accende un chatbot di AI Engine e gli si assegna la memoria, o la memoria resta senza lettori.
2. **L'agente MCP la usa?** No. Legge e scrive con i suoi strumenti: gli embedding non passano da lì.

> **Punto di controllo**: se la risposta alla prima domanda è «no», questa procedura va bene lo stesso — ma allora la si sta facendo per tenere in vita una base di conoscenza in attesa di un lettore. Va deciso consapevolmente, non per inerzia.

---

## Fase 9 — Manutenzione e guardrail

Tre cose da mettere in calendario, e una da evitare con cura.

1. **Prova dell'articolo nuovo.** Pubblica (o salva) un articolo e verifica entro qualche ora che il frammento compaia con stato OK: è la prova che l'auto-sync lavora.
2. **Controllo periodico dei conteggi.** Il numero delle voci deve seguire quello degli articoli pubblicati. Se si allontanano, è il momento di rileggere la schermata, non di premere pulsanti.
3. **Dimensione del database.** L'archivio interno vive nei tuoi dati: tienilo d'occhio insieme alla crescita del sito, soprattutto su hosting condiviso.

E la cosa da evitare: **non lasciare che un plugin di pulizia del database tocchi le tabelle degli embedding.** Hai WP-Optimize Premium installato, e un domani potresti aggiungere un *Database Cleaner*: quegli strumenti cancellano per mestiere le tabelle che non riconoscono. Vanno istruiti a **escludere** quelle di AI Engine — altrimenti, in un clic, sparisce la memoria del sito e nessuno collega il guasto alla causa.

---

## Checklist finale

- [ ] UpdraftPlus aggiornato
- [ ] Backup completo, **verificato**
- [ ] Configurazione attuale annotata (Chroma · Qwen3-Embedding-0.6B · 1024 · Min 30% · Max 10)
- [ ] Nuovo ambiente **Internal (WordPress DB)** creato
- [ ] Modello di embedding confermato (Qwen3-Embedding-0.6B, 1024 dimensioni)
- [ ] Nuovo ambiente **selezionato** nella scheda Knowledge
- [ ] **Enable Sync** attivo sul nuovo ambiente
- [ ] Prova minima: una voce, stato **OK**
- [ ] **Push All (606)** lanciato, a rilascio automatico
- [ ] Conteggio verificato, nessuna riga rossa
- [ ] **Query Mode** provato e poi spento
- [ ] Sync di **Chroma disattivato**
- [ ] Deciso **chi usa** la memoria (chatbot AI Engine: sì o no)
- [ ] WP-Optimize istruito a **escludere** le tabelle degli embedding

---

*Questa procedura estende il riassunto in sei passi dell'Appendice B con i dettagli operativi, i punti di controllo e i rimedi. Prima di eseguirla, rileggi la Fase 0: in questo tipo di lavoro, il tempo speso a preparare il ritorno è il tempo meglio speso.*


---

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

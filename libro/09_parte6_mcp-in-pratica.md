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

### Le mani, il ponte, la conoscenza: i tre pezzi di una vetrina

Meow Apps — lo stesso autore di AI Engine — racconta la propria architettura su una pagina divulgativa (`vibewithwp.ai`) con una metafora azzeccata: **tu dici, il tuo AI è il cervello, AI Engine sono le mani, il tuo sito è WordPress**. Vale la pena tradurre quella vetrina nel vocabolario di questo libro, perché il lettore la incontrerà di sicuro e perché i suoi tre pezzi **non fanno la stessa cosa**.

| Pezzo della vetrina | Il ruolo | Nel vocabolario di questo libro |
|---|---|---|
| **AI Engine** | *le mani*: esegue con i tuoi permessi WordPress | il **server MCP** del sito (§2) |
| **Connect WP** (`connectwp.ai/mcp`) | *il ponte*: passa le richieste dal tuo AI al sito. «Firma l'accesso, passa ogni richiesta, non conserva nulla»; e se non hai AI Engine, lo installa durante il collegamento | la via **indiretta**, alternativa al collegamento diretto (Parte III §7) |
| **Today WP** (`todaywp.com/mcp`) | *la conoscenza*: versioni, vulnerabilità (Wordfence, Patchstack, WPScan), notizie e documentazione, sincronizzate da fonti ufficiali | un **MCP esterno in sola lettura**, che non tocca il sito |

Il punto architetturale è illustrato bene dalla pagina di Today WP: **le connessioni sono due, e sono separate.** L'agente lavora sul tuo sito *attraverso il connettore del sito*; chiede conoscenza a Today WP *attraverso un'altra porta*. Today WP **legge e basta**: non entra nel tuo WordPress. E la ragione per cui esiste è concreta — un modello addestrato mesi fa non sa quale plugin è sicuro **oggi** — con un guadagno dichiarato e misurabile in **meno chiamate e meno token**, e ogni fatto datato al giorno.

Tre precisazioni che una vetrina non fa, e che qui servono.

**Il ponte è un passaggio in più, su un server che non è il tuo.** Connect WP dichiara di non conservare né la password né il contenuto delle richieste, e l'accesso si revoca dal proprio WordPress: sono garanzie ragionevoli, ma la connessione diretta (§3) resta preferibile quando si può configurare, perché il traffico non esce dal perimetro.

**«Tutto gratis» va letto con precisione.** Sono gratuiti il plugin e il server MCP — esattamente ciò che questa parte descrive. Chatbot, scrittura assistita, Knowledge, set di strumenti Pro e registrazione delle chiamate si pagano altrove: al provider dei modelli (Parte III §3) o con la licenza Pro (§6).

**La vetrina racconta la capacità, non il governo.** Di *Drafts Only*, *Access Level*, *Ask Before*, cronologia annullabile e Tool Set non parla. È la parte che questo libro aggiunge — e non è un dettaglio da addetti ai lavori: è ciò che distingue un agente a cui si affida un sito da un agente con cui si scherza una sera.

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

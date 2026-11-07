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

*Le altre schermate dell'installazione — Workspace, Insights, MCP, Chatbots — si aggiungono qui con la stessa forma: che cosa si vede, a che cosa serve, che cosa va segnalato.*

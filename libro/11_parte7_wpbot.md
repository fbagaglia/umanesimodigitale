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

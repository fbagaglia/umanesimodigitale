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

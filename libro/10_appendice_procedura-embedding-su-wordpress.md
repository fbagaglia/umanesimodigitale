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

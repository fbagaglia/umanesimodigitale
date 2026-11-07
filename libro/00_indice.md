# Quando l'AI incontra WordPress

**Come un agente intelligente legge, scrive e lavora dentro un sito — e come farlo in sicurezza**
*Testo tecnico · Umanesimo Digitale*

---

## Nota di metodo (da leggere prima)

Questo volume non è una traduzione della documentazione ufficiale, e non è nemmeno la trascrizione di una conversazione con un modello. È un testo scritto con un criterio preciso:

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
4. L'OAuth: perché non funzionava, e la lezione
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
2. I due MCP: server e client — e i tre pezzi di una vetrina: le mani, il ponte, la conoscenza
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
A. Che cosa è accertato dall'esterno · B. Le sedici voci da verificare in bacheca · C. Il must «OpenRouter + DeepSeek flash» tradotto in configurazione, con i costi reali · D. Che cosa manca, in sintesi

### Appendice B — Tour delle schermate di AI Engine
Le schermate reali dell'installazione, spiegate una per una: il **Playground** (la sala prova), il **Content Studio** (la scrivania) e **Knowledge** (la memoria del sito), con le domande frequenti e la procedura per spostare la memoria su WordPress

### Appendice C — Procedura: portare gli embedding nel database di WordPress
Runbook in 10 fasi (0–9) con durate, punti di controllo, rimedi agli errori e checklist finale

### Fonti

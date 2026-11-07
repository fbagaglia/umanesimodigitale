# Quando l'AI incontra WordPress

**Come un agente intelligente legge, scrive e lavora dentro un sito — e come farlo in sicurezza**

Capitolo/libro su come un'AI si collega a un sito WordPress: la teoria del collegamento (REST API, API di backend, MCP, autenticazione, autorizzazioni), l'ecosistema dei plugin, un'analisi approfondita di **AI Engine** (Meow Apps) e di **WPBot** (QuantumCloud), e il **caso di studio misurato dal vivo** su `umanesimodigitale.info`.

## Struttura

| File | Contenuto |
|---|---|
| `00_indice.md` | Indice, nota di metodo, avvertenze |
| `01_parte1_*` | Parte I — Come un'AI parla con un sito WordPress (backend, API, REST, autenticazione, ruoli, MCP) |
| `02_parte2_*` | Parte II — Gli strumenti: i plugin per collegare WordPress all'AI, verificati sul repository ufficiale |
| `03_parte3_*` | Parte III — AI Engine: anatomia del plugin, configurazione, moduli, sicurezza, Knowledge |
| `04_parte4_*` | Parte IV — Il caso di studio: un sito reale, misurato dall'interno via MCP |
| `06_parte5_*` | Parte V — Quattro nomi che sembrano la stessa cosa (Meow Apps, AI Engine, WPBot, i suoi moduli) |
| `09_parte6_*` | Parte VI — MCP in pratica: i due MCP di AI Engine, i Tool Set, il governo dei permessi |
| `11_parte7_*` | Parte VII — WPBot: il chatbot che parla con i lettori, e il confronto con AI Engine |
| `07_appendice_*` | Appendice A — Scheda di configurazione di AI Engine (stato e voci da verificare) |
| `08_appendice_*` | Appendice B — Tour delle schermate reali di AI Engine |
| `10_appendice_*` | Appendice C — Procedura: portare gli embedding nel database di WordPress |
| `05_fonti.md` | Fonti, con la data di verifica di ogni dato |

I prefissi numerici indicano l'ordine di **creazione**, non di lettura: l'ordine di lettura è quello di `build.py`.

## Ricostruire il file completo

```bash
python build.py
```

Genera `libro-completo-ai-wordpress.md` (tutti i capitoli in ordine di lettura). Solo libreria standard, nessuna dipendenza.

## Metodo

Ogni dato tecnico del libro è verificato su una **fonte primaria** con la data accanto: repository ufficiale di WordPress.org per i plugin, documentazione dei produttori per le funzionalità, API di OpenRouter per i prezzi dei modelli. Le cifre del caso di studio sono **misure reali** prese sul sito, non stime.

Ciò che non è verificabile è dichiarato come tale — comprese due correzioni fatte durante la stesura, annotate nel testo.

*Verifica dei dati: 7 novembre 2026.*

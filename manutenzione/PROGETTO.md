# Progetto Umanesimo Digitale — manutenzione e gestione del sito

**Che cos'è questo progetto.** Non è un libro. È l'**infrastruttura operativa** che permette a un agente di supportare tutte le attività di manutenzione di `umanesimodigitale.info`: caricare e modificare pagine e articoli del blog, gestire media, tassonomie, SEO, anteprime, revisioni, commenti e la manutenzione ordinaria del sito.

Il libro *«Quando l'AI incontra WordPress»* (cartella `libro/` del repository `fbagaglia/umanesimodigitale`) è il **primo prodotto** di questo progetto: la sua documentazione tecnica. Non è il fine.

*Impostato il 7 novembre 2026.*

---

## 1. Le regole che non si discutono

| Regola | Perché |
|---|---|
| **L'agente lavora in bozza. Pubblica l'utente.** | Nessuna pubblicazione automatica, mai. È una scelta dell'utente, non un limite tecnico da aggirare |
| **Il sito è la fonte di verità.** Prima di affermare che una modifica è a posto, si guarda la pagina con `wp_get_rendered` | I blocchi validi non sono la stessa cosa di una pagina che si legge |
| **Niente è "fatto" senza una lettura di ritorno.** | Vale per i file, per il PDF e per il sito: si verifica il risultato, non l'uscita del comando |
| **Prima di un'operazione massiva: backup.** | Su questo sito UpdraftPlus è installato — e la sua versione va tenuta aggiornata |
| **Le credenziali non passano dalla chat.** | Vivono nell'ambiente o nelle impostazioni del plugin, e si citano solo per nome |

---

## 2. Catalogo dei lavori — che cosa si può fare oggi, e con che cosa

Stato reale del canale MCP su questo sito: **54 strumenti esposti**, connessione in **Drafts Only**, bearer token nel percorso dell'URL. Aggiornare questa tabella quando cambiano i Tool Set.

### Contenuti

| Lavoro | Si può fare? | Strumenti | Note |
|---|---|---|---|
| Nuovo articolo (bozza) | **Sì** | `wp_create_post`, `wp_write_blocks`, `wp_update_seo`, `wp_set_featured_image` | È il percorso standard: contenuto + campi SEO + immagine, poi anteprima |
| Nuova pagina | **Sì** | `wp_create_post` (`post_type=page`) | Stessa catena, con tipo pagina |
| Leggere un articolo (per intero, con metadati) | **Sì** | `wp_get_post_snapshot`, `wp_get_blocks`, `wp_get_post_meta`, `wp_get_post_terms` | Lo *snapshot* è la lettura completa in una chiamata |
| Correggere/tradurre una **bozza** | **Sì** | `wp_edit_blocks` (blocco per blocco), `wp_alter_post` (trova/sostituisci) | **Non riscrivere tutto**: si tocca il blocco |
| Modificare un articolo **pubblicato** | **No** — bloccato da *Drafts Only* | — | «Non cambiare ciò che è live» è la definizione stessa del freno. Vedi §3 |
| Categorie e tag | **Sì** | `wp_create_term`, `wp_add_post_terms`, `wp_update_term`, `wp_get_terms`, `wp_count_terms` | Sul sito: 44 categorie, **0 tag** |
| Note dell'editor (per il lavoro in squadra) | **Sì** | `wp_create_note`, `wp_update_note`, `wp_delete_note` | L'unico strumento di cancellazione disponibile |
| Anteprima condivisibile (non indicizzata, scade) | **Sì** | `wp_preview_link` | Il modo per far leggere una bozza a chi non ha un account |
| Programmare la pubblicazione | **No** | — | «Never publish, **schedule**…»: anche la programmazione è esclusa |
| Eliminare/cestinare articoli e pagine | **No** | nessuno strumento | La cancellazione è volutamente fuori dal canale: si fa in bacheca (WP Bulk Delete è installato) |

### Media

| Lavoro | Si può fare? | Strumenti |
|---|---|---|
| Caricare un'immagine | **Sì** | `wp_upload_media`, `wp_upload_request` |
| Aggiornarne i metadati (alt, titolo, didascalia) | **Sì** | `wp_update_media` |
| Impostarla come immagine in evidenza | **Sì** | `wp_set_featured_image` |
| Generare un'immagine | **Sì** | `mwai_image` (costa per immagine) |
| **Guardare** un'immagine (leggere testo in una figura, controllare una copertina) | **Sì** | `mwai_vision` |
| Elencare e contare i media | **Sì** | `wp_get_media`, `wp_count_media` |

### SEO e resa

| Lavoro | Si può fare? | Strumenti |
|---|---|---|
| Titolo SEO, meta description, focus keyword, slug | **Sì** | `wp_get_seo`, `wp_update_seo` — i campi di **Rank Math**, il plugin installato |
| Controllare come esce la pagina per un visitatore | **Sì** | `wp_get_rendered` |
| Svuotare cache e rigenerare i permalink | **Sì** | `wp_site_maintenance` |
| Revisioni: leggere e ripristinare | **Sì** | `wp_get_revisions`, `wp_restore_revision` |

### Struttura del sito

| Lavoro | Si può fare? | Note |
|---|---|---|
| Menu di navigazione | **Solo lettura** (`wp_get_menus`) | **Non si possono modificare**: si fa in bacheca |
| Stili e template del sito | **Solo lettura** (`wp_get_site_style`, `wp_get_templates`, `wp_open_template`) | Nessuna scrittura |
| Widget | **Lettura e scrittura** (`wp_get_widgets`, `wp_edit_widgets`) | Solo temi classici |
| Pattern di blocchi | **Sì** (`wp_list_block_patterns`, `wp_insert_block_pattern`) | Utile per impaginare in modo coerente |
| Commenti | **Sì** (`wp_get_comments`, `wp_moderate_comments`, `wp_update_comment`, `wp_create_comment`) | Nessuna cancellazione definitiva |

### Manutenzione ordinaria

| Lavoro | Si può fare? | Note |
|---|---|---|
| Contare contenuti per stato | **Sì** (`wp_count_posts`, `wp_count_terms`, `wp_count_media`) | La misura più utile per capire «a che punto siamo» |
| Elencare i plugin installati | **Sì, solo lettura** (`wp_list_plugins`) | **Aggiornare plugin e temi è un'operazione umana** |
| Utenti e ruoli | **No** | Nessuno strumento: si fa in bacheca (o con *Members*) |
| Opzioni, database, SQL | **No** | Volutamente fuori dalla portata dell'agente |
| Annullare una modifica fatta dall'agente | **Sì** (`mcp_list_changes`, `mcp_undo_change`) | La cronologia dura **30 giorni**, e l'annullamento non cancella il lavoro più recente altrui |
| Verificare che il canale risponda | **Sì** (`mcp_ping`) | **La prima chiamata, sempre**, quando qualcosa non funziona |

---

## 3. Le scoperte operative (da sapere prima di promettere qualcosa)

### Con quale protocollo agisce l'agente: MCP, non REST

Tre livelli, spesso confusi in uno:

| Livello | Che cos'è qui |
|---|---|
| **Protocollo** | **MCP** — l'agente non chiama endpoint REST: chiede il **catalogo degli strumenti** e invoca quelli (`wp_create_post`, `wp_update_seo`, …) |
| **Trasporto** | **HTTP**, su un solo endpoint: `/wp-json/mcp/v1/<token>` |
| **Perché sta sotto `/wp-json/`** | Perché WordPress registra lì le proprie rotte. È l'indirizzo, non il protocollo |

Conseguenze pratiche, e sono il motivo per cui la distinzione conta:

- la **REST API del nucleo** (`/wp/v2/posts`) **non è il canale** usato dall'agente: nessuna richiesta passa da lì;
- la **Public API di AI Engine** (`mwai/v1`, 122 rotte) è **chiusa** agli anonimi — verificato: risponde `401 rest_forbidden`;
- **è il fatto di usare MCP** a portare con sé il catalogo di strumenti, i **Tool Set**, l'**Access Level**, le approvazioni, `Drafts Only` e la **cronologia annullabile a 30 giorni**. Se l'agente scrivesse con la REST API nuda, quei freni non esisterebbero: avrebbe un token e i permessi dell'utente, e basta.

### Che cosa significa «non modificare il pubblicato»

La distinzione corretta **non è** «creare sì, modificare no»: è **bozza sì, live no**.

| Operazione | Si può? |
|---|---|
| **Creare** un nuovo articolo o una pagina | **Sì** — nasce come **bozza** |
| **Modificare una bozza** — quante volte serve, anche riscrivendola da capo | **Sì**, senza limiti |
| Modificare un articolo **pubblicato** o programmato | **No** — «non cambiare ciò che è live» |
| Pubblicare o programmare | **No** — pubblica l'utente |
| Cestinare o eliminare articoli, pagine, commenti | **No** — nessuno strumento: si fa in bacheca |

**Quindi una bozza si crea *e* si modifica all'infinito.** Il limite non è sull'articolo nuovo: è sul confine fra ciò che è pubblicato e ciò che non lo è.

**E per correggere qualcosa di pubblicato**, tre strade — in ordine di sensatezza:

1. **la bozza corretta** *(consigliata)*: l'agente legge il pubblicato, ne prepara una **versione corretta come nuova bozza** (o il testo pronto in chat) e l'utente lo applica o lo sostituisce. Nessun accesso al live, nessuna configurazione da cambiare;
2. **spegnere temporaneamente `Drafts Only`**, decidendolo *prima* di iniziare e riaccendendolo subito dopo: l'agente lavora direttamente sul pubblicato, ma perde la rete di sicurezza che rende tutto il resto tranquillo;
3. **`wp_restore_revision`**: ripristinare una revisione di un articolo pubblicato **cambia ciò che è live**, quindi ricade con ogni probabilità nella stessa regola. Da verificare sul campo, su un caso vero e con il consenso dell'utente, non per ipotesi.

### Mettere in bozza e ripubblicare: funziona, ma non è gratis

**La mossa**: si porta l'articolo da *pubblicato* a *bozza*, lo si modifica, lo si ripubblica. Funziona, e il fondamento è chiaro: `Drafts Only` protegge **ciò che è live**; se il contenuto non è più live, è modificabile come qualsiasi bozza. Il confine è **lo stato**, non l'età dell'articolo.

**Ma il cambio di stato va fatto dall'utente**: portare un pubblicato in bozza *è* una modifica al live, quindi per l'agente è bloccata come tutto il resto. Un clic in bacheca — oppure lo spegnimento temporaneo di `Drafts Only` (strada 2), che a quel punto è la stessa cosa vista da un'altra porta.

**E nel frattempo l'articolo non esiste più.** Per un magazine con storia SEO questo non è un dettaglio:

| Cosa succede mentre è in bozza | Perché conta |
|---|---|
| L'URL risponde **404** | Chi arriva da un link — interno, social, newsletter, backlink — trova una pagina vuota |
| Esce dal **feed** e dalla **sitemap** | I lettori abbonati al feed e i motori lo perdono di vista |
| Esce dalla **home** e dalle liste | Se era in evidenza o in una serie, si rompe la composizione |
| I **commenti** spariscono (tornano al ripubblicare) | Su un articolo discusso è un'interruzione visibile |
| La **cache** può conservare il 404 | WP-Optimize è installato: il vuoto può restare anche dopo |

E un rischio da verificare caso per caso: **la ripubblicazione può essere letta come una nuova pubblicazione dalle automazioni**. Con **WP Telegram Pro** e **Feedzy** installati, l'invio al canale o l'importazione possono ripartire. Va controllato **prima** di ripubblicare, non dopo.

### La strada migliore: lo scambio sul posto

Sfrutta una libertà che non ha controindicazioni: **le bozze separate non toccano il live.**

1. L'agente legge l'articolo pubblicato (blocchi, metadati, campi SEO) e prepara una **nuova bozza** con la versione corretta — o la sola parte da correggere.
2. L'utente apre l'articolo pubblicato e **sostituisce il contenuto** con quello della bozza (in Gutenberg: seleziona tutto nella bozza, copia, incolla nel pubblicato).
3. **ID, slug e URL restano intatti**: nessun 404, nessuna uscita da feed e sitemap, nessun commento nascosto, nessuna automazione che riparte.
4. La bozza di servizio si cestina in bacheca (o si tiene come copia di lavoro).

Costa un copia-e-incolla in più e in cambio non c'è un solo secondo in cui il sito mostra un buco. **Per un articolo pubblicato da mesi, è la strada da preferire sempre.** Il "metti in bozza e ripubblica" resta sensato solo per contenuti recenti, poco linkati, o quando la modifica è così profonda che rifare l'articolo è più semplice che correggerlo.

### La cancellazione non passa da qui

Fra i 54 strumenti l'unico `delete` è quello delle note dell'editor. Non esiste alcuno strumento per cestinare un articolo, una pagina o un commento. È una scelta di progetto coerente con il privilegio minimo — e significa che l'igiene dei contenuti (bozze vecchie, doppioni) resta un'operazione umana, in bacheca.

---

## 4. In stand-by (deciso dall'utente, 7 novembre 2026)

- **Il triage delle 541 bozze.** Messo esplicitamente in attesa: non è il momento. Resta annotato perché è la voce a più alto valore quando si riapre.
- Conseguenza: finché è in stand-by, **non si contano le bozze come "lavoro da fare"** nei riepiloghi. Si nominano solo se l'utente li riapre.

---

## 5. Il ciclo di lavoro

**Per un lavoro sul sito** (pagina, articolo, media, SEO):

1. leggere lo stato reale (`mcp_ping`, poi gli strumenti di lettura);
2. eseguire in **bozza**;
3. **guardare il risultato** (`wp_get_rendered`) e, se serve, generare un'**anteprima condivisibile**;
4. consegnare l'anteprima e aspettare la pubblicazione dell'utente;
5. in caso di errore, `mcp_list_changes` → `mcp_undo_change`.

**Per un lavoro sul libro** (cartella `libro/`):

```bash
python build.py              # manoscritto unico
py -3.14 costruisci_pdf.py   # impaginato
py -3.14 verifica_pdf.py     # verifica del PDF prodotto (esito verde/rosso)
```

poi commit e push su `fbagaglia/umanesimodigitale`, **verificando dal remoto** (hash del PDF identico ai due lati).

---

## 6. Dove sono le cose

| Cosa | Dove |
|---|---|
| Lavoro locale | `C:\Users\ASUS\Desktop\Test\umanesimodogitale\` |
| **Questo documento** | `fbagaglia/umanesimodigitale` → cartella **`manutenzione/`** (`manutenzione/PROGETTO.md`) |
| **La skill di scrittura dell'articolo** | `scrittura-con-stile-umano`. **Si invoca in due modi, entrambi validi sempre**: da sola (la descrizione è il grilletto — basta una richiesta con uno dei tre ingressi: *«trasforma questo testo in un articolo»*, *«parti da questo link»*, *«scrivi un articolo su…»*) oppure per nome: *«usa la skill scrittura-con-stile-umano»*. **La forma dell'articolo non sta lì**: sta in `manutenzione/MODELLO-ARTICOLO.md` |
| **La procedura di pubblicazione** | `manutenzione/PROCEDURA-PUBBLICAZIONE.md` — i ruoli, le nove fasi del ciclo, il podcast **dopo** la pubblicazione, le modifiche a un live (scambio sul posto), i cinque pezzi della consegna |
| Manoscritto e impaginato | `libro/` — 12 file sorgente + PDF + i tre script |
| Repository | `fbagaglia/umanesimodigitale` (pubblico) |
| Canale verso il sito | server MCP `umanesimo`, token in ambiente, **Drafts Only** |
| Documentazione tecnica del progetto | il libro stesso: Parti I–VII e Appendici A–C |

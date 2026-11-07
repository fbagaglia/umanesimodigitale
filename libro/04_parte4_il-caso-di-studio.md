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

## 4. L'OAuth: perché non funzionava, e la lezione

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

# Come pubblichiamo insieme una bozza

**Procedura operativa — Umanesimo Digitale** · prima stesura: 7 novembre 2026

---

## In una riga

**L'agente scrive, impagina e misura; l'utente fornisce le immagini, decide e pubblica.** La bozza resta bozza finché non arriva il *«pubblica la bozza»*.

---

## 1. I ruoli, senza ambiguità

| Chi | Che cosa fa | Che cosa non fa **mai** |
|---|---|---|
| **L'agente** (Hermes, via MCP) | Legge la fonte per intero, scrive, crea la bozza, la impagina, colloca le immagini e ne scrive l'**alt**, compila la SEO, controlla la resa, prepara **titoli deflagranti, tweet e la didascalia Spotify** | Non pubblica, non cambia lo stato di un articolo, non tocca un contenuto **live**, non inventa fatti, immagini o esperienze personali |
| **L'utente** | Fornisce l'**immagine 1:1** e le altre immagini, dà il **«pubblica la bozza»**, pubblica, crea l'**episodio Spotify** con il link dell'articolo, inserisce il **podcast in testa**, decide ogni correzione | — |

**La regola che tiene tutto in piedi:** l'agente non è mai l'ultimo anello. L'ultimo anello è umano, sempre.

---

## 2. Il ciclo, in nove fasi

| # | Fase | Chi | Che cosa accade | Il segno che è finita |
|---|---|---|---|---|
| **0** | **Ingresso** | utente | Un **testo**, un **link** o un **tema**. Con le immagini: la **1:1** (copertina) e quelle da spalmare | la richiesta è chiara; la fonte è leggibile |
| **1** | **Bozza** | agente | `wp_create_post` — titolo, occhiello (`post_excerpt`), stato **bozza**, corpo in Markdown | torna l'**ID del post** |
| **2** | **Categorie** | agente | `wp_add_post_terms`, **copiate dagli articoli simili**, mai indovinate | le categorie sono quelle del blog |
| **3** | **Impaginazione** | agente | `wp_get_blocks` per la mappa, poi `wp_edit_blocks` **in una sola operazione**: apertura (Spectra, container + info-box), FAQ (`<details>`), Approfondimenti (card con miniatura), pattern invito | l'outline mostra le nove parti nell'ordine |
| **4** | **Immagini** | utente fornisce, agente colloca | Caricamento in libreria, **alt scritto dall'agente**, copertina in apertura **e** in evidenza, le altre una ogni due o tre sezioni con didascalia | la resa dice quante immagini **senza alt** (e sono solo quelle del pattern) |
| **5** | **SEO** | agente | `wp_update_seo` in **Rank Math**: titolo **≤ 60**, descrizione **≤ 160**, focus keyword, slug | i campi sono scritti, non lasciati al plugin |
| **6** | **Controllo** | agente | `wp_get_rendered`: ordine dei titoli (h1 → h2), immagini senza alt, inizio del testo. Poi `wp_preview_link` | la pagina regge come la vede un visitatore |
| **7** | **Consegna** | agente | Quattro pezzi, sempre: **bozza + anteprima**, **titoli deflagranti**, **tweet**, **SEO** | l'utente ha tutto per decidere |
| **8** | **Dialogo** | entrambi | L'utente corregge o chiede; l'agente riapplica e **riconsegna**. Se il testo cambia, **titoli, tweet e SEO si rifanno** | l'utente è soddisfatto |
| **9** | **Pubblicazione** | **utente** | Su richiesta esplicita: *«pubblica la bozza»*. Poi l'URL, l'episodio Spotify, il podcast in testa | l'articolo è live |

**Le fasi 1-7 sono un giro.** La 8 può ripetersi quante volte serve. La 9 accade **una volta**, e solo su richiesta.

---

## 3. Perché il podcast arriva **dopo** la pubblicazione

Nella **didascalia dell'episodio Spotify** deve comparire il **link dell'articolo**: e quel link esiste solo dopo la pubblicazione. Quindi:

1. si pubblica l'articolo (senza podcast in testa);
2. l'utente prende l'URL e crea l'episodio con il link in didascalia;
3. l'utente inserisce il **podcast in testa** all'articolo, in **21:9**.

L'agente **prepara il testo della didascalia** (vedi §6), ma l'inserimento del podcast è dell'utente. È l'unico caso previsto in cui si tocca un pubblicato.

---

## 4. Modificare un articolo già pubblicato

- **Mai sul live.** Si prepara una **bozza separata** con il contenuto nuovo.
- **Scambio sul posto:** l'utente sostituisce il contenuto lasciando intatti **ID, slug e URL**.
- Perché: evitare il **404**, l'uscita da feed e sitemap, i commenti che spariscono, la cache che conserva il 404, la ripartenza automatica delle automazioni (WP Telegram Pro, Feedzy).
- Le operazioni fatte via MCP restano **annullabili per 30 giorni** — ma la cronologia **non** copre query SQL, file di plugin e temi, cancellazioni e nuovi utenti.

---

## 5. I freni accesi (da non spegnere)

| Freni | Serve a |
|---|---|
| **Drafts only** sul server MCP | impedire che l'agente tocchi il live |
| **Anteprima condivisibile** (a scadenza, non indicizzata) | far vedere la bozza senza pubblicarla |
| **Credenziali mai in chat** e mai nei documenti | le chiavi vivono solo dove servono |
| **Pattern invito sincronizzato** (ref 5923) | vale per tutti gli articoli: modificarlo li cambia tutti |
| **Una fonte per ogni numero** | nessun dato senza attribuzione |

---

## 6. I quattro pezzi della consegna (dettaglio)

1. **La bozza + il link di anteprima.** Non il testo incollato in chat: l'articolo *dove sarà*, così si vede la resa vera.
2. **I titoli deflagranti** — da 4 a 6, per blog, social e newsletter. Non sostituiscono il titolo: sono le sue versioni ad alta voce.
3. **I tweet** — un **pacchetto da riusare** sui social, ognuno con un angolo diverso: il dato, la tesi, il meccanismo, la citazione, il numero, la domanda. Con gli hashtag. *(In preparazione qui sotto.)*
4. **La didascalia Spotify** — perché servirà dopo la pubblicazione:

> **Modello:** *[due o tre righe che presentano l'episodio, in tono di voce del blog]* — L'articolo completo: **[URL dell'articolo]** — *[hashtag]*

---

## 7. Il registro delle correzioni

Ogni correzione dell'utente diventa una **regola scritta con la data** nella skill di scrittura (`scrittura-con-stile-umano`, sezione *registro delle correzioni*). È così che la voce si affina nel tempo: la correzione di oggi è la regola di domani.

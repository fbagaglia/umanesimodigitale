# Modello dell'articolo — Umanesimo Digitale

**Che cos'è.** La forma reale degli articoli del blog, estratta dai blocchi veri (non dedotta dal testo), da riusare nella creazione di un nuovo articolo e da **migliorare nel tempo**. Ogni modifica a questo file è datata e motivata in fondo, nella sezione *Registro dei miglioramenti*: è l'unico posto dove vive la forma dell'articolo.

**Articoli esaminati** (7 novembre 2026, lettura dei blocchi via MCP):

| ID | Articolo | Perché è qui |
|---|---|---|
| **37476** | Tokenomics: Economia dei Token tra opportunità e Trappole | **Il modello corrente** (l'articolo più recente completo) |
| **37466** | Il Fronte Comune dei Tre | La versione precedente: serve a vedere che cosa è cambiato |

---

## 1. L'anatomia, in ordine

| # | Parte | Che cos'è tecnicamente | Chi la produce |
|---|---|---|---|
| 1 | **Podcast** *(dopo la pubblicazione)* | blocco `embed`, Spotify, **aspect 21:9** | **l'utente**, quando l'articolo è live: la didascalia dell'episodio deve contenere l'URL dell'articolo |
| 2 | *spaziatore* | `paragraph` vuoto | — |
| 3 | **Apertura (il «modulo info»)** | `uagb/container` (fondo `var(--ast-global-color-4)`) con dentro un `uagb/info-box`: **copertina + titolo-gancio (h3, colore #379557) + occhiello** | Spectra |
| 4 | *separatore* | `separator` | — |
| 5 | **Corpo** | sezioni: titolo di sezione + 2-4 paragrafi; eventuale immagine dentro il testo | testo dell'autore |
| 6 | **FAQ** | `uagb/advanced-heading` con il titolo di sezione + blocco `html` con **`<details><summary>`** | il markup è nel modello (§3) |
| 7 | **Approfondimenti** | blocco `html` con **card dei link e miniatura** | il markup è nel modello (§3) |
| 8 | **Video** *(facoltativo)* | blocco `embed`, YouTube, **aspect 16:9** | — |
| 9 | **Invito** | `block` con `ref: 5923` → il pattern sincronizzato **«pattern invito»** | pattern condiviso (§4) |

**Che cosa è cambiato fra il vecchio e il nuovo** (37466 → 37476), perché è la direzione in cui il modello sta andando:

| | 37466 (più vecchio) | 37476 (corrente) |
|---|---|---|
| Titoli di sezione | `heading` **h3** | **h2** (il primo è un `uagb/advanced-heading`) |
| Titolo della FAQ | dentro l'HTML (`<h3>Domande frequenti`) | `uagb/advanced-heading` separato |
| Card dei link | link semplici, senza miniatura | **miniature** come immagine di sfondo, palette del sito |
| Video | **due** embed YouTube | uno |
| Immagine nel corpo | assente | presente (la copertina, ripetuta) |

---

## 2. Che cosa cambia e che cosa non cambia

**Cambia, articolo per articolo**: titolo, occhiello (il lede), immagine di copertina, URL dell'episodio Spotify, numero e titolo delle sezioni del corpo, numero di domande (3-5) e di link (4-5), eventuale video, eventuale immagine dentro il testo, categorie e campi SEO.

**Non cambia, mai**: l'**ordine** delle nove parti, il **pattern invito in fondo** (con `ref: 5923`), i **colori** delle card (`#D9E1DA` fondo, `#5B5F5C` bordo, `#379557` bordo sinistro), il **21:9** del podcast e il **16:9** del video, i titoli di sezione in **h2** (l'h1 è il titolo, lo mette WordPress), i link esterni con `target="_blank" rel="noopener"`.

---

## 3. I pezzi riutilizzabili, pronti da incollare

### 3.1 Podcast (parte 1)

```
<!-- wp:embed {"url":"URL_EPISODIO_SPOTIFY","type":"rich","providerNameSlug":"spotify","className":"wp-embed-aspect-21-9 wp-has-aspect-ratio"} -->
...
<!-- /wp:embed -->
```

In pratica: si inserisce **l'URL dell'episodio** con il blocco Embed e si imposta la proporzione a **21:9**.

### 3.2 Apertura — il «modulo info» (parte 3)

È il pezzo che nel gergo di casa si chiama *info*: un `uagb/container` con fondo `var(--ast-global-color-4)` che contiene un `uagb/info-box` con **tre cose**, nell'ordine in cui appaiono:

1. l'**immagine di copertina** dell'articolo (mostrata sopra il titolo);
2. il **titolo-gancio**: un `h3` breve, in colore `#379557` — nell'esempio *«Il valore oltre i token»*;
3. l'**occhiello**: il paragrafo d'apertura, che comincia in *corsivo* con la frase-sintesi e prosegue con altri due capoversi di aggancio.

**Nota operativa importante**: `uagb/info-box` e `uagb/advanced-heading` sono blocchi **Spectra**, e non sono fra i tipi che lo strumento di impaginazione sa generare (che conosce paragrafi, titoli, liste, citazioni, immagini, pulsanti, gruppi, colonne, separatori, spaziatori, codice, HTML). Questo pezzo si inserisce quindi come **markup**, non come specifica: è la ragione per cui il modello conserva il markup esatto.

### 3.3 FAQ (parte 6)

Titolo di sezione (`uagb/advanced-heading`, testo **«Domande frequenti»**) e poi, nel blocco HTML, **una riga per domanda**:

```html
<details><summary>Domanda?</summary><p>Risposta in due o tre frasi, autosufficiente.</p></details>
```

- `<details>` nativo: si apre e si chiude **senza JavaScript**, e funziona per i lettori con screen reader.
- Le domande **non** si inventano: o sono realmente frequenti, o non ci sono.
- Da 3 a 5 per articolo. Ognuna con la risposta completa, senza rimandare ad altre domande.

### 3.4 Approfondimenti (parte 7)

Titolo di sezione (**«Approfondimenti»**) e poi una card per link:

```html
<a href="URL" target="_blank" rel="noopener"
   style="display:block;text-decoration:none;background:#D9E1DA;border:1px solid #5B5F5C;
          border-left:4px solid #379557;border-radius:10px;padding:14px 16px;margin:0 0 12px 0;">
  <span style="display:block;height:150px;background:#5B5F5C;
               background-image:url(IMMAGINE_ANTEPRIMA);background-size:cover;
               background-position:center;border-radius:6px;margin-bottom:10px;"></span>
  <span style="display:block;color:#0C0D0D;font-weight:600;font-size:1rem;line-height:1.35;">Titolo della pagina</span>
  <span style="display:block;color:#818484;font-size:0.85rem;margin-top:4px;">dominio.it</span>
</a>
```

Tutte le card vanno dentro un contenitore `<div style="font-family:inherit;max-width:760px;">`. La **miniatura** è un'immagine di sfondo: se il sito di destinazione cambia o toglie l'immagine, la card resta con il fondo grigio — è il modo giusto di degradare, ma va **controllata** prima di consegnare.

### 3.5 Video (parte 8, facoltativo)

Come il podcast, ma YouTube e proporzione **16:9**.

### 3.6 Invito (parte 9) — il pattern condiviso

```html
<!-- wp:block {"ref":5923} /-->
```

**Avvertenza che vale più delle altre**: 5923 è un **pattern sincronizzato**. Contiene la newsletter, la rivista digitale, il canale WhatsApp e la *nota di trasparenza sull'uso dell'AI* — e **modificarlo cambia tutti gli articoli che lo usano**. È una qualità (si aggiorna una volta sola) e un rischio (una modifica sbagliata tocca l'intero archivio). Prima di toccarlo: backup, e un articolo di prova.

---

## 4. Come si costruisce l'articolo nuovo, con gli strumenti di oggi

1. **`wp_create_post`** — titolo, occhiello (`post_excerpt`), categoria, stato **bozza**; il corpo in Markdown semplice (paragrafi e titoli).
2. **`wp_write_blocks`** — per impaginare davvero: sezioni in `heading` di livello **2**, paragrafi, eventuale immagine.
3. **`wp_edit_blocks`** — per inserire i tre pezzi che l'impaginatore non genera:
   - l'**apertura** (container + info-box) come *markup*, in testa;
   - la **FAQ** come blocco `html`, dopo il corpo;
   - gli **Approfondimenti** come blocco `html`;
   - il **pattern invito** come `<!-- wp:block {"ref":5923} /-->` in fondo.
4. **`wp_set_featured_image`** — immagine in evidenza (la stessa copertina dell'apertura).
5. **`wp_update_seo`** — titolo SEO, meta description, focus keyword, slug, in **Rank Math**.
6. **`wp_get_rendered`** — la pagina **come la vede un visitatore**: titolo, meta, titoli (h1 → h2 → h3 in ordine), immagini **senza alt**, inizio del testo.
7. **`wp_preview_link`** — l'anteprima condivisibile da mandare all'utente. Pubblica l'utente.

---

## 5. Checklist prima di consegnare un articolo

- [ ] Il podcast **non è ancora in testa**: si aggiunge **dopo** la pubblicazione (la didascalia Spotify richiede l'URL dell'articolo)
- [ ] L'apertura ha **copertina + titolo-gancio + occhiello**, e l'occhiello comincia con la frase-sintesi in corsivo
- [ ] I titoli di sezione sono **h2** (mai h3, mai due h1)
- [ ] La sezione FAQ si chiama **«Domande frequenti»** — non il nome dell'argomento
- [ ] La sezione link si chiama **«Approfondimenti»** — non è senza titolo
- [ ] Ogni card ha **miniatura** e dominio visibili
- [ ] Le domande FAQ sono 3-5, con risposte autosufficienti
- [ ] **Tutte le immagini hanno l'alt** (verificato con `wp_get_rendered`: «immagini senza alt»)
- [ ] Il **pattern invito** è in fondo
- [ ] Campi SEO compilati in Rank Math (titolo ≤ 60, description ≤ **160**)
- [ ] Occhiello e slug coerenti con il titolo
- [ ] Anteprima generata e **resa controllata** prima della consegna

---

## 6. Che cosa migliorare — il registro

### 7 novembre 2026 — il podcast è **post-pubblicazione** (cambio d'ordine)

| Che cosa cambia | Perché |
|---|---|
| Il **podcast** (parte 1) **non** si mette alla consegna: si aggiunge **dopo** la pubblicazione, a cura dell'utente | Nella didascalia dell'episodio Spotify deve comparire il **link dell'articolo**, che esiste solo dopo la pubblicazione. Metterlo prima significherebbe lavorare due volte sullo stesso punto |
| In consegna il podcast **non c'è**, quindi la checklist verifica il contrario di prima: che **non** sia in testa | coerenza con il punto sopra |
| L'agente prepara il **testo della didascalia** dell'episodio | così l'utente, appena pubblicato, ha già tutto pronto |

**Procedura completa, con i ruoli e le nove fasi:** `manutenzione/PROCEDURA-PUBBLICAZIONE.md`.

### 7 novembre 2026 — difetti trovati nell'articolo 37476 (corrente)

| Difetto | Che cosa si vede | Cosa fare |
|---|---|---|
| **La FAQ si chiama «Tokenomics»** | nell'articolo, sopra le domande a scomparsa, il titolo di sezione è il nome dell'argomento invece di «Domande frequenti» | correggere in 37476; nel modello il titolo è fissato a «Domande frequenti» |
| **Gli Approfondimenti sono senza titolo** | le card dei link compaiono direttamente dopo il testo, senza etichetta | aggiungere il titolo di sezione; nel modello è fissato |
| **Titoli di sezione incoerenti** | 37466 usa h3, 37476 usa h2 (e il primo titolo è un blocco diverso dagli altri) | adottare **sempre h2**; il primo titolo come gli altri |
| **La copertina appare più volte** | in 37476 la stessa immagine è in evidenza, nell'apertura **e** dentro il corpo | decidere: due volte basta (in evidenza + apertura), togliere quella nel corpo |

### Aperte, da decidere insieme

- **Da dove arriva l'episodio Spotify** *(deciso il 7 novembre 2026)*: lo produce **l'utente**, **dopo** la pubblicazione, perché nella didascalia dell'episodio deve comparire il link dell'articolo. Non è una domanda aperta: è il flusso stabilito.
- **Da dove arriva la miniatura** delle card: presa dall'anteprima del sito di destinazione. Va verificata **prima** di consegnare, e per le immagini di terzi è opportuno citare la fonte.
- **Link esterni e SEO**: oggi sono `rel="noopener"`. Aggiungere `nofollow` è una scelta di SEO, non un obbligo: decisione dell'utente, non dell'agente.
- **Accessibilità delle miniature**: sono immagini di *sfondo*, quindi invisibili agli screen reader. Va bene se sono decorative — e lo sono, perché il titolo della card dice già tutto. Se un giorno portassero informazione, servirà un `<img alt="…">`.

---

## 7. Regola di crescita del modello

1. **Un articolo nuovo si scrive seguendo questo file.** Se serve qualcosa che non c'è, **prima** si aggiorna il modello, poi si scrive l'articolo: così la variante non resta in un articolo solo.
2. **Ogni miglioramento si annota qui**, con la data e il motivo — in fondo, non sparsa nel testo.
3. **Il modello non si tocca in fretta.** Il pattern invito vale per tutti gli articoli: le modifiche che toccano i pezzi condivisi si provano su un articolo di prova, in bozza, con backup fatto.

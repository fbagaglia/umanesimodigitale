# 🚀 Deployment Guide

## Come Pubblicare il Sito

### Opzione 1: Tab "Publish" di GenSpark (Raccomandato)

Il modo più semplice per pubblicare il sito:

1. Clicca sulla tab **"Publish"** in alto
2. Clicca su **"Deploy Project"**
3. Ricevi l'URL del sito pubblicato
4. Il sito è live e accessibile da chiunque! 🎉

### Opzione 2: Hosting Statico (GitHub Pages, Netlify, Vercel)

#### GitHub Pages

1. Crea un repository su GitHub
2. Carica tutti i file del progetto
3. Vai su Settings → Pages
4. Seleziona branch `main` e cartella `/ (root)`
5. Clicca "Save"
6. Il sito sarà disponibile su `https://tuousername.github.io/nome-repo`

#### Netlify

1. Crea account su [Netlify](https://www.netlify.com)
2. Trascina la cartella del progetto nel drop zone
3. Il sito è live in pochi secondi!
4. URL automatico tipo `https://nome-random.netlify.app`

#### Vercel

1. Crea account su [Vercel](https://vercel.com)
2. Clicca "New Project"
3. Importa repository Git o carica file
4. Deploy automatico!

### Opzione 3: Hosting Tradizionale (cPanel, FTP)

1. Connettiti via FTP al tuo hosting
2. Carica tutti i file nella cartella `public_html` o `www`
3. Assicurati che `index.html` sia nella root
4. Visita il tuo dominio

---

## ⚙️ Configurazioni Post-Deployment

### 1. Configura l'URL dell'API WordPress

Se hai pubblicato su un dominio diverso, aggiorna `js/config.js`:

```javascript
window.WORDPRESS_API_URL = 'https://umanesimodigitale.info/wp-json/wp/v2/posts';
```

### 2. Verifica CORS

Dopo il deployment, testa se l'API WordPress è accessibile:

1. Apri la Console del browser (F12)
2. Vai sul sito pubblicato
3. Controlla se vedi "✅ Connesso al blog!" o "⚠️ Modalità Demo"

Se vedi "Modalità Demo", consulta [WORDPRESS-SETUP.md](WORDPRESS-SETUP.md)

### 3. Custom Domain (Opzionale)

#### GitHub Pages
- Vai su Settings → Pages → Custom domain
- Inserisci il tuo dominio
- Configura DNS con CNAME record

#### Netlify/Vercel
- Vai su Domain Settings
- Aggiungi custom domain
- Segui le istruzioni per configurare DNS

---

## 📊 Monitoraggio e Analytics (Opzionale)

### Google Analytics

Aggiungi prima del `</head>` in `index.html` e `guida.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Sostituisci `GA_MEASUREMENT_ID` con il tuo ID di Google Analytics.

---

## 🔒 Sicurezza

### Content Security Policy (Raccomandato)

Aggiungi nel `<head>` per maggiore sicurezza:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; 
               font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; 
               img-src 'self' https: data:; 
               connect-src 'self' https://umanesimodigitale.info;">
```

### HTTPS

- GitHub Pages: HTTPS automatico ✅
- Netlify/Vercel: HTTPS automatico ✅
- Hosting tradizionale: Attiva SSL/TLS nelle impostazioni

---

## 🎨 Personalizzazione Branding

### Favicon

Crea un file `favicon.ico` e aggiungilo alla root del progetto.

In `<head>`:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### Open Graph (per condivisioni social)

Aggiungi nel `<head>`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://tuosito.com/">
<meta property="og:title" content="Chiedi all'Umanesimo Digitale">
<meta property="og:description" content="Esplora oltre 1000 articoli su AI, etica digitale e tecnologia">
<meta property="og:image" content="https://tuosito.com/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://tuosito.com/">
<meta property="twitter:title" content="Chiedi all'Umanesimo Digitale">
<meta property="twitter:description" content="Esplora oltre 1000 articoli su AI, etica digitale e tecnologia">
<meta property="twitter:image" content="https://tuosito.com/og-image.jpg">
```

---

## 🧪 Test Pre-Deployment

Prima di pubblicare, verifica:

- [ ] Tutti i link funzionano (index.html ↔ guida.html)
- [ ] Le immagini si caricano correttamente
- [ ] Il CSS è applicato
- [ ] JavaScript funziona (apri Console, nessun errore)
- [ ] Responsive: testa su mobile, tablet, desktop
- [ ] Browser cross-compatibility (Chrome, Firefox, Safari)
- [ ] Performance: caricamento veloce (<3 secondi)

---

## 📈 Performance Optimization (Avanzato)

### Minify CSS/JS

Usa strumenti online per ridurre la dimensione:
- [CSS Minifier](https://cssminifier.com/)
- [JavaScript Minifier](https://javascript-minifier.com/)

### Image Optimization

Comprimi le immagini usate:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### CDN

Considera l'uso di Cloudflare per:
- Cache globale
- CDN gratuito
- Protezione DDoS
- SSL/TLS gratuito

---

## 🐛 Troubleshooting Post-Deployment

### Il sito non si carica

1. Controlla che `index.html` sia nella root
2. Verifica i log del server
3. Controlla DNS (se hai custom domain)

### CSS/JS non applicati

1. Verifica che i path siano corretti (relativi, non assoluti)
2. Controlla la Console del browser per errori 404
3. Assicurati che le cartelle `css/` e `js/` siano caricate

### API WordPress non funziona

1. Leggi [WORDPRESS-SETUP.md](WORDPRESS-SETUP.md)
2. Verifica CORS
3. Controlla che l'URL dell'API sia corretto

---

## 💡 Pro Tips

1. **Usa Git** per versioning del codice
2. **Testa sempre** prima del deployment
3. **Backup regolari** dei file
4. **Monitor performance** con Google PageSpeed Insights
5. **Aggiorna regolarmente** le librerie CDN

---

## 🎉 Congratulazioni!

Il tuo sito è ora live e accessibile a chiunque nel mondo!

Prossimi passi:
1. Condividi il link sui social
2. Aggiungi Google Analytics per monitorare le visite
3. Raccogli feedback dagli utenti
4. Implementa nuove funzionalità (vedi README.md → "Sviluppi Futuri")

---

**Buon deployment!** 🚀

Se hai problemi, consulta:
- [README.md](README.md) - Documentazione completa
- [WORDPRESS-SETUP.md](WORDPRESS-SETUP.md) - Problemi API WordPress
- [guida.html](guida.html) - Tutorial per utenti finali

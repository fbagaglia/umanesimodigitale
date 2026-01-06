# 🔧 Guida Configurazione WordPress REST API

## Problema: "Modalità Demo" sempre attiva

Se vedi sempre il messaggio **"Modalità Demo: Usando dati di esempio"**, significa che l'applicazione non riesce a connettersi all'API WordPress. Ecco come risolvere.

---

## ✅ Soluzione 1: Abilitare CORS su WordPress

Il problema più comune è che WordPress blocca le richieste cross-origin (CORS) dal browser.

### Metodo A: Plugin WordPress (Più Semplice)

1. Installa il plugin **"REST API CORS"** o **"WP CORS"**
2. Attivalo
3. Nelle impostazioni, abilita CORS per tutti i domini (`*`) o solo per il dominio del tuo sito

### Metodo B: File .htaccess (Server Apache)

Aggiungi queste righe al file `.htaccess` nella root di WordPress:

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</IfModule>
```

### Metodo C: functions.php del tema

Aggiungi questo codice al file `functions.php` del tuo tema WordPress:

```php
<?php
// Abilita CORS per REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
?>
```

---

## ✅ Soluzione 2: Verificare che l'API sia Abilitata

1. Vai su `https://tuoblog.com/wp-json/wp/v2/posts` (sostituisci con il tuo dominio)
2. Se vedi un JSON con i post → **API attiva** ✅
3. Se vedi un errore 404 → **API disabilitata** ❌

### Come Abilitare l'API REST

L'API REST è abilitata di default in WordPress. Se è disabilitata:

1. Verifica che non ci siano plugin che la disabilitano (es: "Disable REST API")
2. Controlla il file `.htaccess` per regole che bloccano `/wp-json/`
3. Assicurati di avere WordPress 4.7 o superiore

---

## ✅ Soluzione 3: Verificare i Permalink

L'API REST richiede i permalink "pretty" (SEO-friendly).

1. Vai su **Impostazioni → Permalink** in WordPress
2. Seleziona una struttura diversa da "Semplice"
3. Salva le modifiche

---

## ✅ Soluzione 4: Testare l'API con Parametri

Prova ad accedere a:

```
https://tuoblog.com/wp-json/wp/v2/posts?per_page=5&_embed
```

Il parametro `_embed` include metadati importanti (immagini, autore, categorie).

Se questa URL funziona, l'app dovrebbe caricare i dati automaticamente.

---

## 🧪 Test Rapido

Apri la Console del Browser (F12) e incolla questo codice:

```javascript
fetch('https://umanesimodigitale.info/wp-json/wp/v2/posts?per_page=1')
    .then(r => r.json())
    .then(d => console.log('✅ API funziona!', d))
    .catch(e => console.error('❌ Errore:', e));
```

- Se vedi `✅ API funziona!` → tutto ok
- Se vedi `❌ Errore:` → problema di connessione/CORS

---

## 🔐 Sicurezza: API Pubblica vs Privata

### Post Pubblici (✅ Raccomandato)

L'app accede solo ai post pubblici, non servono autenticazioni.

### Post Privati/Protetti (⚠️ Non Supportato)

Se vuoi accedere a contenuti privati, dovrai:

1. Implementare autenticazione OAuth
2. Usare Application Passwords (WordPress 5.6+)
3. Modificare il codice in `js/data.js`

**Nota**: Per un sito statico, è consigliato limitarsi ai contenuti pubblici.

---

## 📊 Limitazioni dell'API WordPress

### Paginazione

- L'API restituisce max 100 post per richiesta
- L'app carica automaticamente più pagine (fino a 1000 post)
- Per blog molto grandi (>1000 post), configura `MAX_POSTS` in `js/config.js`

### Rate Limiting

Alcuni hosting limitano le richieste API. Se hai problemi:

1. Contatta il tuo hosting provider
2. Aumenta i limiti nelle configurazioni server
3. Usa un piano hosting più performante

---

## 🆘 Ancora Problemi?

### Check List Finale

- [ ] L'API REST è abilitata su WordPress
- [ ] CORS è configurato correttamente
- [ ] I permalink sono SEO-friendly
- [ ] L'URL dell'API è corretto in `js/config.js` (se personalizzato)
- [ ] Il browser non blocca le richieste (controlla Console)
- [ ] Il firewall/hosting non blocca l'API

### Modalità Demo

Se non riesci a risolvere, l'app funziona comunque in **Modalità Demo** con dati di esempio. Puoi:

1. Usarla per testare le funzionalità
2. Mostrare il prototipo agli utenti
3. Decidere in seguito come integrare i dati reali

---

## 💡 Alternative all'API REST

Se non puoi usare l'API REST, puoi:

### Opzione 1: Export Statico

1. Esporta i post da WordPress in JSON
2. Carica il file JSON sul server
3. Modifica `js/data.js` per caricare dal file locale

### Opzione 2: Feed RSS

1. Usa il feed RSS di WordPress (`/feed/`)
2. Parsa l'XML invece del JSON
3. Modifica `js/data.js` per supportare RSS

### Opzione 3: Dati Manuali

1. Modifica `loadSampleData()` in `js/data.js`
2. Aggiungi manualmente i tuoi articoli
3. Aggiorna periodicamente quando pubblichi

---

## 📚 Risorse Utili

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [CORS su WordPress](https://developer.wordpress.org/rest-api/frequently-asked-questions/#why-is-authentication-not-working)
- [WP-CLI per test API](https://wp-cli.org/)

---

**Hai risolto?** Perfetto! Ora l'app caricherà automaticamente tutti gli articoli dal tuo blog WordPress. 🎉

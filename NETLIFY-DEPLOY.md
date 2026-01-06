# 🚀 Guida Deploy su Netlify con AI

## Panoramica

Questa guida ti accompagna step-by-step nel deployment del sito su Netlify con la funzionalità AI avanzata powered by Gemini.

---

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:

- [ ] Account GitHub (gratuito)
- [ ] Account Netlify (gratuito)
- [ ] API Key di Google Gemini (gratuito)
- [ ] Git installato sul tuo computer

---

## 🎯 Step 1: Ottieni l'API Key di Gemini

### 1.1 Vai su Google AI Studio

Apri il browser e vai su: **https://aistudio.google.com**

### 1.2 Accedi con Account Google

Usa il tuo account Google personale o di lavoro.

### 1.3 Ottieni l'API Key

1. Clicca su **"Get API Key"** nel menu in alto
2. Seleziona **"Create API key in new project"**
3. Copia la chiave che appare (tipo: `AIzaSyA...`)
4. **IMPORTANTE**: Salva questa chiave in un posto sicuro!

### 1.4 Verifica Limiti Gratuiti

Il tier gratuito di Gemini include:
- ✅ 15 richieste al minuto
- ✅ 1,500 richieste al giorno
- ✅ 1M token al giorno

**Per il tuo uso**: Più che sufficienti! Anche con 100 utenti/giorno.

---

## 🐙 Step 2: Carica su GitHub

### 2.1 Crea Repository

1. Vai su **https://github.com**
2. Clicca su **"New repository"** (o `+` in alto a destra)
3. Compila:
   - **Nome**: `chiedi-umanesimo-digitale`
   - **Descrizione**: `Motore di ricerca per UmanesimoDigitale.info con AI`
   - **Visibilità**: Public (o Private, funziona ugualmente)
4. **NON** aggiungere README, .gitignore o license (li abbiamo già)
5. Clicca **"Create repository"**

### 2.2 Inizializza Git Locale

Apri il terminale nella cartella del progetto:

```bash
# Inizializza repository
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Initial commit: Motore di ricerca con AI"

# Collega a GitHub (sostituisci TUOUSERNAME)
git remote add origin https://github.com/TUOUSERNAME/chiedi-umanesimo-digitale.git

# Push su GitHub
git branch -M main
git push -u origin main
```

### 2.3 Verifica su GitHub

Ricarica la pagina del repository su GitHub. Dovresti vedere tutti i file!

---

## 🌐 Step 3: Deploy su Netlify

### 3.1 Vai su Netlify

Apri: **https://www.netlify.com**

### 3.2 Signup/Login

- Clicca **"Sign up"** (o "Log in" se hai già un account)
- Seleziona **"Continue with GitHub"**
- Autorizza Netlify ad accedere ai tuoi repository

### 3.3 Crea Nuovo Sito

1. Clicca **"Add new site"** → **"Import an existing project"**
2. Seleziona **"GitHub"**
3. Trova e seleziona il repository `chiedi-umanesimo-digitale`
4. Configurazione build:
   - **Branch to deploy**: `main`
   - **Build command**: Lascia vuoto (o `echo "Static site"`)
   - **Publish directory**: Lascia vuoto (o `.`)
5. Clicca **"Deploy site"**

### 3.4 Aspetta il Deploy (30-60 secondi)

Vedrai un log in tempo reale. Quando vedi:
```
✓ Site is live
```

Il sito è online! 🎉

### 3.5 Ottieni l'URL

Netlify assegna un URL tipo:
```
https://random-name-12345.netlify.app
```

Copia questo URL e testalo nel browser!

---

## 🔐 Step 4: Configura API Key Gemini

**IMPORTANTE**: Questo step è FONDAMENTALE per far funzionare l'AI!

### 4.1 Vai nelle Impostazioni

Nel dashboard Netlify del tuo sito:
1. Clicca su **"Site configuration"** (o "Site settings")
2. Nel menu laterale, clicca **"Environment variables"**

### 4.2 Aggiungi la Variabile

1. Clicca **"Add a variable"** → **"Add a single variable"**
2. Compila:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: La tua API key di Gemini (es: `AIzaSyA...`)
   - **Scopes**: Seleziona tutto (o solo "Functions")
3. Clicca **"Create variable"**

### 4.3 Re-Deploy (Importante!)

Perché le variabili d'ambiente siano attive, devi rifare il deploy:

1. Vai su **"Deploys"**
2. Clicca su **"Trigger deploy"** → **"Deploy site"**
3. Aspetta 30-60 secondi

**ORA L'AI FUNZIONA!** 🤖✨

---

## ✅ Step 5: Testa il Sito

### 5.1 Test Base

1. Apri il sito (`https://tuo-sito.netlify.app`)
2. Cerca un argomento (es: "intelligenza artificiale")
3. Verifica che appaiano i risultati

### 5.2 Test AI

1. Scorri fino all'articolo riassuntivo
2. Clicca su **"Genera Riassunto AI Avanzato"**
3. Aspetta 3-5 secondi
4. **Dovresti vedere** il riassunto generato da Gemini! 🎉

### 5.3 Se l'AI Non Funziona

Apri la Console del browser (F12) e controlla errori. Poi:

**Controlla i Logs di Netlify:**
1. Dashboard Netlify → **"Functions"**
2. Clicca su **"summarize"**
3. Clicca su **"Function log"**
4. Cerca errori (es: "GEMINI_API_KEY not configured")

**Problemi Comuni:**
- ❌ API key non configurata → Ricontrolla Step 4
- ❌ API key invalida → Genera nuova key su AI Studio
- ❌ Quota esaurita → Aspetta 24h (reset giornaliero)

---

## 🎨 Step 6: Personalizza URL (Opzionale)

### 6.1 Cambia Nome Netlify

1. Dashboard → **"Site configuration"** → **"Site details"**
2. Clicca **"Change site name"**
3. Inserisci un nome (es: `umanesimo-digitale-search`)
4. URL diventa: `https://umanesimo-digitale-search.netlify.app`

### 6.2 Custom Domain (Avanzato)

Se hai un dominio tuo (es: `search.umanesimodigitale.info`):

1. Dashboard → **"Domain management"**
2. Clicca **"Add custom domain"**
3. Inserisci il dominio
4. Segui le istruzioni DNS
5. Netlify fornisce automaticamente HTTPS! ✅

---

## 🔄 Step 7: Aggiornamenti Futuri

Ogni volta che modifichi il sito:

```bash
# Modifica i file...
# Poi:

git add .
git commit -m "Descrizione modifiche"
git push origin main
```

**Netlify fa il re-deploy automaticamente!** 🚀

Non devi fare nulla, in 30-60 secondi le modifiche sono live.

---

## 📊 Step 8: Monitoraggio (Opzionale)

### 8.1 Controlla Utilizzo Functions

Dashboard → **"Functions"** → **"summarize"**

Vedrai:
- Numero invocazioni
- Durata media
- Errori

### 8.2 Controlla Bandwidth

Dashboard → **"Site analytics"**

Vedrai:
- Visite
- Bandwidth usato
- Top pages

### 8.3 Limiti Free Tier

Netlify Free include:
- ✅ 125,000 function invocations/mese
- ✅ 100GB bandwidth/mese
- ✅ 300 build minutes/mese

**Per il tuo uso**: Più che sufficienti!

---

## 💰 Costi Stimati

### Netlify
- **Free**: 0€/mese (fino ai limiti sopra)
- Se superi: ~25€/mese per 1M invocations extra

### Gemini API
- **Free**: 0€/mese fino a:
  - 15 RPM (requests per minute)
  - 1,500 RPD (requests per day)
  - 1M tokens/day
- Oltre: ~$0.075 per 1M input tokens

### Esempio Reale
```
100 utenti/giorno × 30 giorni = 3,000 richieste/mese
= GRATIS su Netlify ✅
= GRATIS su Gemini ✅
= TOTALE: 0€/mese 🎉
```

Con 1000 utenti/giorno: ~$0-5/mese (ancora free tier!)

---

## 🐛 Troubleshooting

### Problema: "Site not found"
**Causa**: Deploy fallito o URL sbagliato  
**Soluzione**: Controlla **"Deploys"** per errori nei log

### Problema: "AI button doesn't work"
**Causa**: GEMINI_API_KEY non configurata  
**Soluzione**: Ricontrolla Step 4, poi re-deploy

### Problema: "Functions error 500"
**Causa**: Errore nel codice o API key invalida  
**Soluzione**: Controlla Function logs in Netlify

### Problema: "CORS error"
**Causa**: Configurazione headers sbagliata  
**Soluzione**: Verifica che `netlify.toml` sia stato committato

### Problema: "Module not found"
**Causa**: Dependencies non installate  
**Soluzione**: Verifica che `package.json` sia committato

---

## 📚 Risorse Utili

- **Netlify Docs**: https://docs.netlify.com
- **Gemini AI Docs**: https://ai.google.dev/docs
- **GitHub Docs**: https://docs.github.com
- **Netlify Functions**: https://docs.netlify.com/functions/overview/

---

## ✅ Checklist Finale

Prima di considerare il deploy completo:

- [ ] Sito accessibile all'URL pubblico
- [ ] Ricerca funziona correttamente
- [ ] Risultati vengono visualizzati
- [ ] Riassunto base appare
- [ ] Bottone "Genera Riassunto AI" presente
- [ ] Cliccando il bottone, appare il riassunto AI
- [ ] Nessun errore nella console
- [ ] Quiz funzionano
- [ ] Design responsive su mobile
- [ ] GEMINI_API_KEY configurata
- [ ] Function logs senza errori

---

## 🎉 Congratulazioni!

Hai deployato con successo il tuo motore di ricerca con AI avanzata!

Il sito ora:
- ✅ È live e accessibile da chiunque
- ✅ Si aggiorna automaticamente quando fai push su GitHub
- ✅ Ha riassunti AI generati da Gemini
- ✅ Costa 0€/mese (con uso normale)
- ✅ Ha HTTPS automatico
- ✅ È veloce grazie alla CDN globale di Netlify

**Prossimi Passi:**
1. Condividi l'URL con i tuoi studenti/lettori
2. Monitora l'utilizzo nel dashboard Netlify
3. Raccogli feedback e migliora
4. Aggiungi Google Analytics (vedi README)

---

**Buon lavoro! 🚀📚✨**

*Se hai problemi, controlla prima i logs di Netlify, poi consulta la sezione Troubleshooting.*

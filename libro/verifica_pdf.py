# -*- coding: utf-8 -*-
"""
Verifica il PDF costruito: si legge il PDF, non il resoconto della costruzione.
Uso:  py -3.14 verifica_pdf.py
Esito: 0 se tutti i controlli passano, 1 se almeno uno è rosso.
"""
import os, re, sys, unicodedata

QUI = os.path.dirname(os.path.abspath(__file__))
PDF = os.path.join(QUI, "Quando l'AI incontra WordPress.pdf")

# frasi corte, una per sezione nuova: devono comparire nell'impaginato
FRASI = [
    "malinteso da chiarire",                       # Parte I
    "Il caso interessante: la REST API dentro un plugin",
    "privilegio minimo",                           # Parte I, least privilege
    "Come sono stati verificati i plugin",         # Parte II
    "I plugin «consigliati» che quasi nessuno usa",# Parte II
    "Il token condiviso: come funziona e dove va tenuto",  # Parte III
    "Knowledge: la memoria del sito",              # Parte III
    "Il canale MCP, come è fatto davvero",         # Parte IV
    "Lo stato dei contenuti: le 541 bozze",        # Parte IV
    "Meow Apps: una casa, non un inquilino",       # Parte V
    "I tre moduli che generavano confusione",      # Parte V
    "Il governo del potere: quattro freni, non uno",  # Parte VI
    "WPBot e AI Engine: il confronto",             # Parte VII
    "Procedura: come si sposta la memoria da Chroma a WordPress",  # App. B
    "Fase 6 — Verificare che la memoria funzioni", # App. C
    "Misure sul sito del caso di studio",          # Fonti
]


def piatto(t):
    return re.sub(r"\s+", " ", t)


def main():
    try:
        import fitz
    except ImportError:
        print("ROSSO — PyMuPDF non disponibile in questo interprete (usa: py -3.14)")
        return 1

    if not os.path.exists(PDF):
        print("ROSSO — PDF non trovato:", PDF)
        return 1

    d = fitz.open(PDF)
    pagine = d.page_count
    testo = "\n".join(p.get_text() for p in d)
    p = piatto(testo)
    toc = d.get_toc()
    d.close()

    rossi = []

    # 1. marcatori markdown rimasti in pagina: tabelle, grassetti, blocchi di codice
    if "|" in testo:
        n = testo.count("|")
        esempi = [l.strip()[:70] for l in testo.split("\n") if "|" in l][:3]
        rossi.append("barre verticali in pagina (%d): tabella non resa → %s" % (n, esempi))
    if "**" in testo:
        n = testo.count("**")
        esempi = [l.strip()[:70] for l in testo.split("\n") if "**" in l][:3]
        rossi.append("doppi asterischi in pagina (%d): grassetto non reso → %s" % (n, esempi))
    if "```" in testo:
        rossi.append("triple virgolette in pagina: blocco di codice non reso")

    # 2. frasi chiave
    assenti = [f for f in FRASI if piatto(f) not in p]
    if assenti:
        rossi.append("frasi assenti (%d): %s" % (len(assenti), assenti))

    # 3. indice navigabile
    if not toc:
        rossi.append("nessun segnalibro")
    else:
        liv1 = [v for v in toc if v[0] == 1]
        if len(liv1) != 12:
            rossi.append("capitoli di livello 1: %d (attesi 12)" % len(liv1))
        pagine_toc = [v[2] for v in toc]
        if pagine_toc != sorted(pagine_toc):
            rossi.append("le pagine dei segnalibri non crescono")
        lunghe = [v[1] for v in toc if len(v[1]) > 90]
        if lunghe:
            rossi.append("voci di indice troppo lunghe: %s" % lunghe[:2])

    # 4. il volume deve chiudersi con le Fonti
    if toc and "Fonti" not in toc[-1][1] and "fonti" not in toc[-1][1].lower():
        rossi.append("l'ultima voce dell'indice non è «Fonti»: %s" % toc[-1][1])

    # 5. copertina e piede
    if "Edizione del 7 novembre 2026" not in piatto(testo):
        rossi.append("manca la data di edizione in copertina")

    print("PDF: %s" % os.path.basename(PDF))
    print("pagine: %d | caratteri: %d | segnalibri: %d (livello 1: %d)"
          % (pagine, len(testo), len(toc), len([v for v in toc if v[0] == 1])))
    print("controlli: %d" % (5 if not rossi else 5))
    if rossi:
        print()
        for r in rossi:
            print("  ROSSO —", r)
        return 1
    print("ESITO: verde — tabelle rese, nessun marcatore in pagina, %d/%d frasi trovate, "
          "indice coerente." % (len(FRASI), len(FRASI)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

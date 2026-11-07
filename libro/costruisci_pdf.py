# -*- coding: utf-8 -*-
"""
Costruisce «Quando l'AI incontra WordPress» in PDF, dai capitoli markdown di questa cartella.
Uso:  py -3.14 costruisci_pdf.py

L'ordine dei file e' dichiarato qui sotto: e' l'unico posto dove vive la struttura del volume.
Adattato dal costruttore di casa (Guida-Hermes) con due aggiunte che questo volume richiede:
  - i blocchi di codice (``` … ```) resi come riquadri monospazio (il renderer di casa li stampa
    come testo, con le triple virgolette in pagina);
  - gli elenchi indentati, che il renderer di casa appiattisce.
"""
import os, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
                                Table, TableStyle, PageBreak, Flowable, Preformatted)

QUI = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- ordine del volume
ORDINE = [
    "00_indice.md",
    "01_parte1_come-lai-parla-con-wordpress.md",
    "02_parte2_plugin-e-strumenti.md",
    "03_parte3_ai-engine.md",
    "04_parte4_il-caso-di-studio.md",
    "06_parte5_quattro-nomi-che-sembrano-la-stessa-cosa.md",
    "09_parte6_mcp-in-pratica.md",
    "11_parte7_wpbot.md",
    "07_appendice_scheda-configurazione-ai-engine.md",
    "08_appendice_tour-schermate-ai-engine.md",
    "10_appendice_procedura-embedding-su-wordpress.md",
    "05_fonti.md",
]

TITOLO      = "Quando l’AI incontra WordPress"
SOTTOTITOLO = "Come un agente intelligente legge, scrive e lavora dentro un sito"
EDIZIONE    = "Edizione del 7 novembre 2026"
USCITA      = os.path.join(QUI, "Quando l'AI incontra WordPress.pdf")

# ---------------------------------------------------------------- caratteri
FF = "C:/Windows/Fonts"
pdfmetrics.registerFont(TTFont("Testo",    os.path.join(FF, "segoeui.ttf")))
pdfmetrics.registerFont(TTFont("Testo-B",  os.path.join(FF, "segoeuib.ttf")))
pdfmetrics.registerFont(TTFont("Testo-I",  os.path.join(FF, "segoeuii.ttf")))
pdfmetrics.registerFont(TTFont("Testo-BI", os.path.join(FF, "segoeuiz.ttf")))
pdfmetrics.registerFont(TTFont("Codice",   os.path.join(FF, "consola.ttf")))
pdfmetrics.registerFont(TTFont("Codice-B", os.path.join(FF, "consolab.ttf")))
pdfmetrics.registerFontFamily("Testo", normal="Testo", bold="Testo-B",
                              italic="Testo-I", boldItalic="Testo-BI")

INCHIOSTRO = colors.HexColor("#1c1d21")
TENUE      = colors.HexColor("#5c6070")
ACCENTO    = colors.HexColor("#1f4e79")
FILO       = colors.HexColor("#d8dbe3")
RIQUADRO   = colors.HexColor("#eef1f6")

def S(nome, **kw):
    base = dict(fontName="Testo", fontSize=10.5, leading=15.2, textColor=INCHIOSTRO,
                alignment=TA_JUSTIFY, spaceAfter=6)
    base.update(kw); return ParagraphStyle(nome, **base)

ST = {
    "h1":    S("h1", fontName="Testo-B", fontSize=19, leading=24, textColor=ACCENTO,
               alignment=TA_LEFT, spaceBefore=0, spaceAfter=12),
    "h2":    S("h2", fontName="Testo-B", fontSize=14.2, leading=19, textColor=ACCENTO,
               alignment=TA_LEFT, spaceBefore=13, spaceAfter=7),
    "h3":    S("h3", fontName="Testo-B", fontSize=11.6, leading=16, textColor=INCHIOSTRO,
               alignment=TA_LEFT, spaceBefore=10, spaceAfter=5),
    "p":     S("p"),
    "quote": S("quote", fontName="Testo-I", textColor=colors.HexColor("#2f3640"),
               leftIndent=6, rightIndent=6, spaceBefore=4, spaceAfter=4, alignment=TA_LEFT),
    "codice": S("codice", fontName="Codice", fontSize=8.9, leading=12.4,
                textColor=colors.HexColor("#20303f"), alignment=TA_LEFT),
    "cap":   S("cap", fontName="Testo-B", fontSize=8.6, leading=11.5, textColor=colors.white,
               alignment=TA_LEFT),
    "cell":  S("cell", fontSize=9.4, leading=13, alignment=TA_LEFT, spaceAfter=0),
    "cellb": S("cellb", fontName="Testo-B", fontSize=9.4, leading=13, textColor=colors.white,
               alignment=TA_LEFT, spaceAfter=0),
    "cop-t": S("cop-t", fontName="Testo-B", fontSize=30, leading=37, textColor=ACCENTO,
               alignment=TA_CENTER, spaceAfter=0),
    "cop-s": S("cop-s", fontSize=14.5, leading=21, textColor=TENUE, alignment=TA_CENTER),
    "cop-e": S("cop-e", fontName="Testo-I", fontSize=11, leading=16, textColor=TENUE,
               alignment=TA_CENTER),
}

def voce(dent):
    """Stile di una voce di elenco, con l'indentazione del suo livello."""
    return S("li%d" % dent, leftIndent=14 + dent * 14, bulletIndent=3 + dent * 14,
             spaceAfter=3.5)

# ---------------------------------------------------------------- inline
def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def inline(t):
    t = esc(t)
    t = re.sub(r"`([^`]+)`", r'<font name="Codice" size="9.3" color="#20303f">\1</font>', t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", t)
    t = t.replace("—", "&#8212;")
    return t

def leggi(percorso):
    return open(os.path.join(QUI, percorso), encoding="utf-8").read().replace("\r\n", "\n")

# ---------------------------------------------------------------- tabelle
def e_tabella(riga):
    return riga.strip().startswith("|") and riga.strip().endswith("|")

def celle(riga):
    return [c.strip() for c in riga.strip().strip("|").split("|")]

def costruisci_tabella(righe, larghezza):
    testa = celle(righe[0])
    corpo = [celle(r) for r in righe[2:]] if len(righe) > 2 else []
    ncol = len(testa)
    if ncol == 2:
        pesi = [0.40, 0.60]
    elif ncol == 3:
        pesi = [0.30, 0.42, 0.28]
    elif ncol >= 4:
        pesi = [0.22] + [(0.78 / (ncol - 1))] * (ncol - 1)
    else:
        pesi = [1.0 / ncol] * ncol
    dati = [[Paragraph(inline(c), ST["cellb"]) for c in testa]]
    for r in corpo:
        r = (r + [""] * ncol)[:ncol]
        dati.append([Paragraph(inline(c), ST["cell"]) for c in r])
    t = Table(dati, colWidths=[larghezza * p for p in pesi], repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ACCENTO),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 1), (-1, -2), 0.4, FILO),
        ("BOX", (0, 0), (-1, -1), 0.5, FILO),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fafbfd")]),
    ]))
    return t

def riquadro_codice(righe, larghezza):
    """Blocco di codice: monospazio su fondo tenue, con la barra di accento a sinistra."""
    testo = "\n".join(righe)
    pr = Preformatted(testo, ST["codice"])
    c = Table([[pr]], colWidths=[larghezza], hAlign="LEFT")
    c.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), RIQUADRO),
        ("LINEBEFORE", (0, 0), (0, -1), 2.4, ACCENTO),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ]))
    return [Spacer(1, 3), c, Spacer(1, 7)]

# ---------------------------------------------------------------- pagina
PAGINE_CAPITOLO = {}

class Segna(Flowable):
    def __init__(self, titolo):
        Flowable.__init__(self); self.titolo = titolo
    def wrap(self, *a): return (0, 0)
    def draw(self): pass
    def drawOn(self, canv, x, y, _sW=0):
        PAGINE_CAPITOLO[canv.getPageNumber()] = self.titolo

def capitolo_a_pagina(n):
    corrente = ""
    for p in sorted(PAGINE_CAPITOLO):
        if p <= n: corrente = PAGINE_CAPITOLO[p]
        else: break
    return corrente

def testa_pie(canvas, doc):
    canvas.saveState()
    w, h = A4
    n = doc.page
    if n > 1:
        canvas.setFont("Testo", 8.2)
        canvas.setFillColor(TENUE)
        canvas.drawString(22 * mm, h - 13 * mm, TITOLO)
        titolo = capitolo_a_pagina(n)
        if titolo:
            canvas.drawRightString(w - 22 * mm, h - 13 * mm, titolo[:64])
        canvas.setStrokeColor(FILO); canvas.setLineWidth(0.4)
        canvas.line(22 * mm, h - 15.5 * mm, w - 22 * mm, h - 15.5 * mm)
    canvas.setFont("Testo", 9)
    canvas.setFillColor(TENUE)
    canvas.drawCentredString(w / 2.0, 12 * mm, str(n))
    canvas.restoreState()

# ---------------------------------------------------------------- storia
def storia():
    L = A4[0] - 44 * mm
    fuori = []

    # copertina
    fuori += [Spacer(1, 54 * mm),
              Paragraph(TITOLO, ST["cop-t"]),
              Spacer(1, 5 * mm),
              Paragraph(SOTTOTITOLO, ST["cop-s"]),
              Spacer(1, 3 * mm),
              Paragraph("La teoria del collegamento, i plugin, AI Engine, WPBot, "
                        "il caso di studio misurato dal vivo", ST["cop-e"]),
              Spacer(1, 30 * mm),
              Paragraph(EDIZIONE, ST["cop-e"]),
              Spacer(1, 2 * mm),
              Paragraph("Testo tecnico · Umanesimo Digitale", ST["cop-e"]),
              Spacer(1, 22 * mm),
              Paragraph("Ogni dato è verificato su una fonte primaria, con la data accanto. "
                        "Le cifre del caso di studio sono misure reali prese sul sito, non stime.",
                        ST["cop-e"])]

    for percorso in ORDINE:
        testo = leggi(percorso)
        righe = testo.split("\n")
        i = 0
        while i < len(righe):
            r = righe[i]
            s = r.strip()

            if not s:
                i += 1; continue

            # blocco di codice
            if s.startswith("```"):
                i += 1
                blocco = []
                while i < len(righe) and not righe[i].strip().startswith("```"):
                    blocco.append(righe[i].rstrip())
                    i += 1
                if i < len(righe):
                    i += 1
                fuori += riquadro_codice(blocco, L)
                continue

            # titoli
            if s.startswith("### "):
                fuori.append(Paragraph(inline(s[4:]), ST["h3"])); i += 1; continue
            if s.startswith("## "):
                fuori.append(Paragraph(inline(s[3:]), ST["h2"])); i += 1; continue
            if s.startswith("# "):
                if fuori:
                    fuori.append(PageBreak())
                fuori.append(Segna(re.sub(r"\s+", " ", s[2:].strip())))
                fuori.append(Paragraph(inline(s[2:]), ST["h1"]))
                i += 1; continue

            # separatore
            if re.match(r"^-{3,}$", s):
                fuori.append(Spacer(1, 5)); i += 1; continue

            # tabella
            if e_tabella(s):
                blocco = []
                while i < len(righe) and e_tabella(righe[i].strip()):
                    blocco.append(righe[i].strip()); i += 1
                if len(blocco) >= 2:
                    fuori += [Spacer(1, 3), costruisci_tabella(blocco, L), Spacer(1, 7)]
                continue

            # riquadro
            if s.startswith(">"):
                pezzi = []
                while i < len(righe) and righe[i].strip().startswith(">"):
                    pezzi.append(righe[i].strip()[1:].strip()); i += 1
                testo_q = " ".join(x for x in pezzi if x)
                q = Table([[Paragraph(inline(testo_q), ST["quote"])]], colWidths=[L], hAlign="LEFT")
                q.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, -1), RIQUADRO),
                    ("LINEBEFORE", (0, 0), (0, -1), 2.4, ACCENTO),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ]))
                fuori += [Spacer(1, 3), q, Spacer(1, 7)]
                continue

            # elenchi (con il livello di indentazione, che il renderer di casa perde)
            m = re.match(r"^( +)?([-*]|\d+\.)\s+(.*)$", r)
            if m:
                spazi = len(m.group(1) or "")
                dent = min(spazi // 2, 3)
                segno = m.group(2)
                voce_txt = m.group(3)
                i += 1
                while i < len(righe):
                    avanti = righe[i].strip()
                    if (not avanti or avanti.startswith(("#", ">", "|"))
                            or re.match(r"^[-*]\s", avanti) or re.match(r"^\d+\.\s", avanti)
                            or re.match(r"^-{3,}$", avanti) or avanti.startswith("```")):
                        break
                    voce_txt += " " + avanti; i += 1
                punto = "•" if segno in ("-", "*") else segno
                fuori.append(Paragraph(inline(voce_txt), voce(dent), bulletText=punto))
                continue

            # paragrafo
            pezzi = [s]
            i += 1
            while i < len(righe):
                avanti = righe[i].strip()
                if (not avanti or avanti.startswith(("#", ">", "|"))
                        or re.match(r"^[-*]\s", avanti) or re.match(r"^\d+\.\s", avanti)
                        or re.match(r"^-{3,}$", avanti) or avanti.startswith("```")):
                    break
                pezzi.append(avanti); i += 1
            fuori.append(Paragraph(inline(" ".join(pezzi)), ST["p"]))

    return fuori

# ---------------------------------------------------------------- indice navigabile
def titoli_del_volume():
    fuori = []
    for percorso in ORDINE:
        for riga in leggi(percorso).split("\n"):
            s = riga.strip()
            for segno, liv in (("# ", 1), ("## ", 2)):
                if s.startswith(segno) and not s.startswith("### "):
                    titolo = re.sub(r"\s+", " ", s[len(segno):].strip())
                    if titolo:
                        fuori.append((liv, titolo))
                    break
    return fuori

def titoli_dal_pdf(percorso):
    import fitz
    d = fitz.open(percorso)
    grezze = []
    for n, pagina in enumerate(d, start=1):
        if n == 1:
            continue
        for blocco in pagina.get_text("dict")["blocks"]:
            for numero_riga, riga in enumerate(blocco.get("lines", [])):
                pezzi = [s for s in riga["spans"] if s["text"].strip()]
                if not pezzi:
                    continue
                dimensione = max(s["size"] for s in pezzi)
                testo = re.sub(r"\s+", " ", "".join(s["text"] for s in pezzi)).strip()
                if not testo:
                    continue
                if dimensione >= 18.0:
                    grezze.append((1, testo, n, blocco.get("number"), numero_riga))
                elif 13.8 <= dimensione <= 14.6:
                    grezze.append((2, testo, n, blocco.get("number"), numero_riga))
    d.close()
    uniti = []
    for liv, testo, n, blocco, numero_riga in grezze:
        if (uniti and uniti[-1][0] == liv and uniti[-1][2] == n
                and uniti[-1][3] == blocco and numero_riga == uniti[-1][4] + 1
                and not uniti[-1][1].endswith((".", ":", "?", "!"))):
            uniti[-1] = (liv, uniti[-1][1] + " " + testo, n, blocco, numero_riga)
        else:
            uniti.append((liv, testo, n, blocco, numero_riga))
    return [(liv, testo, n) for liv, testo, n, _, _ in uniti]

def aggiungi_indice(percorso):
    import fitz
    voci = [[liv, testo, pagina] for liv, testo, pagina in titoli_dal_pdf(percorso)]
    d = fitz.open(percorso)
    d.set_toc(voci)
    temporaneo = percorso + ".tmp"
    d.save(temporaneo)
    d.close()
    os.replace(temporaneo, percorso)
    return voci

# ---------------------------------------------------------------- costruzione
def main():
    for tentativo in (1, 2):
        doc = BaseDocTemplate(USCITA, pagesize=A4,
                              leftMargin=22 * mm, rightMargin=22 * mm,
                              topMargin=20 * mm, bottomMargin=17 * mm,
                              title=TITOLO, author="Hermes")
        frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="corpo")
        doc.addPageTemplates([PageTemplate(id="tutte", frames=[frame], onPage=testa_pie)])
        doc.build(storia())
        if tentativo == 1:
            print("passata 1: %d pagine, %d capitoli localizzati" % (doc.page, len(PAGINE_CAPITOLO)))
    pagine = doc.page
    indice = aggiungi_indice(USCITA)

    attesi = titoli_del_volume()
    # Il confronto va fatto sul testo SENZA marcatori: nel PDF «Verificare che la memoria *funzioni*»
    # diventa «...la memoria funzioni», e cercare il titolo con gli asterischi lo dichiara mancante.
    def pulito(x):
        return re.sub(r"[*`_]", "", x)
    mancanti = [b for a, b in attesi
                if not any(pulito(b[:40]) in pulito(v[1]) for v in indice)]
    capitoli_attesi = len([1 for a, b in attesi if a == 1])

    print("pagine: %d" % pagine)
    print("segnalibri: %d (di cui livello 1 attesi: %d, trovati: %d)"
          % (len(indice), capitoli_attesi, len([1 for v in indice if v[0] == 1])))
    print("titoli non trovati nell'indice del PDF: %d %s"
          % (len(mancanti), mancanti[:4] if mancanti else ""))
    return 0 if not mancanti else 1


if __name__ == "__main__":
    raise SystemExit(main())

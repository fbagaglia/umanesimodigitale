#!/usr/bin/env python3
"""
Costruisce libro-completo-ai-wordpress.md a partire dai capitoli.

Uso:  python build.py
Nessuna dipendenza esterna: solo libreria standard.

L'ordine di lettura è quello della lista ORDER qui sotto: i prefissi numerici
dei file indicano l'ordine di *creazione*, non quello di lettura (le appendici
e le fonti portano numeri bassi perché sono nate prima di alcune parti).
"""

from pathlib import Path

BASE = Path(__file__).resolve().parent
OUT = BASE / "libro-completo-ai-wordpress.md"

ORDER = [
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


def main() -> int:
    missing = [n for n in ORDER if not (BASE / n).exists()]
    if missing:
        print("ATTENZIONE — file mancanti, build interrotta:")
        for n in missing:
            print("  -", n)
        return 1

    extra = sorted(
        p.name
        for p in BASE.glob("*.md")
        if p.name not in ORDER and p.name != OUT.name
    )
    if extra:
        print("Nota — file .md presenti ma NON inclusi nella build:")
        for n in extra:
            print("  -", n)

    chunks = []
    for i, name in enumerate(ORDER):
        text = (BASE / name).read_text(encoding="utf-8").rstrip("\n")
        chunks.append(text)
        if i < len(ORDER) - 1:
            chunks.append("\n\n---\n")

    OUT.write_text("\n".join(chunks) + "\n", encoding="utf-8")

    words = len(OUT.read_text(encoding="utf-8").split())
    print(f"OK — {OUT.name}")
    print(f"  capitoli: {len(ORDER)}")
    print(f"  parole:   {words:,}".replace(",", "."))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

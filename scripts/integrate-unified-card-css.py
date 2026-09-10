#!/usr/bin/env python3
"""Integrate PRODUCT-CARD-UNIFIED-v1 into mega-menu.css; remove legacy card patches."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "assets" / "mega-menu.css"
UNIFIED = ROOT / "pages" / "product-card-unified-system.css"

MARKERS_REMOVE = [
    ("/* ========== Card mobile — redesign conversão (CARD-MOBILE-REDESIGN-v1) ========== */", None),
    ("/* ========== Card desktop — grid 4 col alinhado (CARD-DESKTOP-REDESIGN-v3.1) ========== */", None),
]

MARKERS_TRIM = [
    (
        "  .showcase-search.showcase-search_grid--mobile-2col .showcase-product {",
        "/* ========== Dock inferior — catálogo 1 toque (MOBILE-CATALOG-DOCK-v1) ========== */",
    ),
    (
        "  /* --- Cards iguais: Promoção + Os mais vendidos (só conteúdo interno) --- */",
        "/* ========== Card mobile — redesign conversão (CARD-MOBILE-REDESIGN-v1) ========== */",
    ),
    (
        "@media (min-width: 992px) {\n  /* --- Home vitrine: só tipografia — NÃO alterar layout/Slick --- */",
        "/* ==========================================================\n   HOME MOBILE — vitrine grid 2 col",
    ),
    (
        "  .showcase-product .card-header {",
        "  .showcase-product_image .showcase-offer {",
        "  }\n}\n\n@media (max-width: 480px)",
    ),
    (
        ".showcase-search.showcase-search_grid--mobile-2col .showcase-card-actions .showcase-product_buy.btn {",
        ".product-compare-data,",
    ),
]


def remove_between(text: str, start: str, end: str | None) -> str:
    i = text.find(start)
    if i == -1:
        return text
    if end is None:
        return text[:i].rstrip() + "\n"
    j = text.find(end, i)
    if j == -1:
        return text[:i].rstrip() + "\n"
    return text[:i].rstrip() + "\n\n" + text[j:].lstrip()


def remove_between_exclusive(text: str, start: str, end: str) -> str:
    i = text.find(start)
    if i == -1:
        return text
    j = text.find(end, i)
    if j == -1:
        return text
    return text[:i].rstrip() + "\n\n" + text[j:].lstrip()


def main() -> None:
    text = CSS.read_text(encoding="utf-8")

    text = remove_between_exclusive(
        text,
        "  /* --- Cards iguais: Promoção + Os mais vendidos (só conteúdo interno) --- */",
        "}\n\n\n/* ========== PRODUCT-CARD-UNIFIED-v1",
    )

    for start, end in MARKERS_REMOVE:
        text = remove_between(text, start, end)

    text = remove_between_exclusive(
        text,
        "  .showcase-search.showcase-search_grid--mobile-2col .showcase-product {",
        "/* ========== Dock inferior — catálogo 1 toque (MOBILE-CATALOG-DOCK-v1) ========== */",
    )

    text = remove_between_exclusive(
        text,
        "  /* --- Cards iguais: Promoção + Os mais vendidos (só conteúdo interno) --- */",
        "/* ========== Card mobile — redesign conversão (CARD-MOBILE-REDESIGN-v1) ========== */",
    )

    text = remove_between_exclusive(
        text,
        "@media (min-width: 992px) {\n  /* --- Home vitrine: só tipografia — NÃO alterar layout/Slick --- */",
        "/* ==========================================================\n   HOME MOBILE — vitrine grid 2 col",
    )

    # Remove legacy mobile card typography inside @media (max-width: 767px)
    block767_start = "  .showcase-product .card-header {\n    padding: 8px 10px 0;"
    block767_end = "  .showcase-product_image .showcase-offer {\n    z-index: 6;"
    i = text.find(block767_start)
    if i != -1:
        j = text.find(block767_end, i)
        if j != -1:
            k = text.find("\n  }", j)
            if k != -1:
                text = text[:i] + text[k + 1 :]

    # Remove product-compare mobile button overrides
    pc_start = ".showcase-search.showcase-search_grid--mobile-2col .showcase-card-actions .showcase-product_buy.btn {"
    pc_end = ".product-compare-data,"
    text = remove_between_exclusive(text, pc_start, pc_end)

    unified = UNIFIED.read_text(encoding="utf-8")

    # Desktop extras: theme-all neutralization + slick + product-compare img specificity
    desktop_extras = """
  .showcase-search.showcase-search_grid .showcase-list.slick-initialized .slick-track,
  .showcase-search.showcase-search_list .showcase-list.slick-initialized .slick-track {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    width: 100% !important;
    transform: none !important;
    left: 0 !important;
    opacity: 1 !important;
  }

  .showcase-search.showcase-search_grid .showcase-item,
  .showcase-search.showcase-search_list .showcase-item {
    float: none !important;
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    clear: none !important;
  }

  .showcase-search.showcase-search_grid .showcase-product_image,
  .showcase-search.showcase-search_list .showcase-product_image {
    float: none !important;
    max-width: 100% !important;
    margin-right: 0 !important;
  }

  .showcase-search.showcase-search_grid .showcase-product .card-header,
  .showcase-search.showcase-search_list .showcase-product .card-header {
    position: static !important;
    left: auto !important;
    top: auto !important;
    margin-top: 0 !important;
  }

  .showcase-search.showcase-search_grid .showcase-product .card-footer,
  .showcase-search.showcase-search_list .showcase-product .card-footer {
    float: none !important;
    max-width: 100% !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .showcase-search.showcase-search_grid .showcase-product_link__image,
  .showcase-search.showcase-search_list .showcase-product_link__image {
    height: auto !important;
    margin-bottom: 0 !important;
  }

  .showcase-search.showcase-search_grid .showcase-product_link_title,
  .showcase-search.showcase-search_list .showcase-product_link_title {
    text-align: left !important;
    height: auto !important;
  }

  .showcase-search.showcase-search_grid .showcase-product_buy,
  .showcase-search.showcase-search_list .showcase-product_buy {
    float: none !important;
    position: static !important;
  }

  .showcase-search .showcase-product_link__image,
  .showcase-search .product-hover-wrap {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .showcase-search .showcase-product .product-hover-wrap img,
  .showcase-search .showcase-product .showcase-product_link__image > img,
  .showcase-search .showcase-product .showcase-product_link__image > img.lazy,
  .showcase-search .showcase-product .showcase-product_link__image > img.product-hover-swap {
    width: auto !important;
    max-width: 92% !important;
    max-height: var(--sda-card-img-inner-max) !important;
    object-fit: contain !important;
    visibility: visible !important;
  }
"""

    home_grid = """
@media (max-width: 575px) {
  main.home-main section.showcase .showcase-products_grid.showcase-home_grid--mobile-2col .showcase-list {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 0 !important;
    width: 100% !important;
    margin: 0 !important;
  }

  main.home-main section.showcase .showcase-products_grid.showcase-home_grid--mobile-2col .showcase-item {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 0 12px !important;
  }
}

@media (min-width: 576px) and (max-width: 991px) {
  main.home-main section.showcase .showcase-products_grid.showcase-home_grid--mobile-2col .showcase-list {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 4px !important;
    box-sizing: border-box !important;
  }

  main.home-main section.showcase .showcase-products_grid.showcase-home_grid--mobile-2col .showcase-item {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 0 12px !important;
    padding: 0 !important;
  }
}
"""

    # Inject desktop extras before closing brace of min-width 992 block in unified
    unified = unified.replace(
        "  /* Neutraliza layout lista horizontal do theme-all */",
        desktop_extras + "\n  /* Neutraliza layout lista horizontal do theme-all */",
    )
    unified = unified.rstrip() + "\n" + home_grid

    text = text.rstrip() + "\n\n\n" + unified.strip() + "\n"
    CSS.write_text(text, encoding="utf-8")

    depth = 0
    for ch in text:
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
    print(f"Written {CSS} ({len(text.splitlines())} lines, brace depth {depth})")


if __name__ == "__main__":
    main()

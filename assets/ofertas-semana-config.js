/**
 * Ofertas da semana — produtos escolhidos por você
 *
 * Como preencher (copie do card na vitrine ou da página do produto):
 *   url       → link do produto (obrigatório)
 *   title     → nome
 *   image     → URL da foto (salescdn)
 *   price     → opcional, ex: "R$ 2.769,68"
 *   productId → opcional, para favoritos (data-product-id)
 *
 * products: [] → só vitrine do admin + confete (nada muda na lista).
 * Com itens → destaque no TOPO (reordena se já existir; inclui card extra se não estiver na vitrine).
 * A vitrine do admin NUNCA é apagada.
 */
window.SDA_OFERTAS_SEMANA = window.SDA_OFERTAS_SEMANA || {
  /** Página imersiva (banner do header). Não altere sem criar redirect no admin. */
  immersivePageUrl: '/pagina/oferta-da-semana',
  sectionTitleMatch: /ofertas/i,
  products: []
};

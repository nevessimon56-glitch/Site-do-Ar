/**
 * Ofertas da semana — produtos escolhidos por você
 *
 * Como preencher (copie do card na vitrine ou da página do produto):
 *   url       → link do produto (obrigatório)
 *   title     → nome
 *   image     → URL da foto (salescdn)
 *   price     → opcional, ex: "R$ 2.769,68"
 *   productId → opcional, para favoritos (data-product-id)
 *   compareAtPrice, discountLabel, category, btus, room, features → opcional (cards PMN)
 * edition → texto do kicker, ex: "— EDIÇÃO 03 · CURADORIA DE CLIMATIZAÇÃO"
 *
 * products: [] → só vitrine do admin + confete (nada muda na lista).
 * Com itens → destaque no TOPO (reordena se já existir; inclui card extra se não estiver na vitrine).
 * A vitrine do admin NUNCA é apagada.
 */
window.SDA_OFERTAS_SEMANA = window.SDA_OFERTAS_SEMANA || {
  /** Hash do overlay (banner do header). */
  immersiveHash: 'sda-oferta-immersiva',
  edition: '— EDIÇÃO 03 · CURADORIA DE CLIMATIZAÇÃO',
  sectionTitleMatch: /ofertas/i,
  products: []
};

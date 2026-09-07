// ── Catálogo de marcas — dados compartilhados entre a landing page e a página de Moda ──
// Cada marca tem sua pasta em public/, organizada por subcoleção. Pra adicionar
// fotos novas: só soltar o arquivo na pasta e incluir o caminho no array abaixo.

export const brandNames = ["LÉZ אתפתח", "Maiah Bear Cub", "N.K Apex"];

export const brandImages: string[][] = [
  // Curadoria editorial: poucas imagens fortes preservam hierarquia e performance.
  // LÉZ אתפתח — alfaiataria, cor e atmosfera
  [
    "/lez-efata/ternos/terno3.png",
    "/lez-efata/ternos/terno1.png",
    "/lez-efata/ternos/terno5.png",
  ],
  // Maiah Bear Cub — lifestyle, afeto e símbolo visual
  [
    "/maiah-bear-cub/criancas/crianca4.png",
    "/maiah-bear-cub/bebes/fotobebe1.png",
    "/maiah-bear-cub/estampas/estampa1.png",
  ],
  // N.K Apex — movimento, feminino e masculino
  [
    "/nk-apex/esportiva/esportiva1.png",
    "/nk-apex/esportiva/esportiva4.png",
    "/nk-apex/esportiva/esportiva6.png",
  ],
];

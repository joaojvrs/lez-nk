// ── Catálogo de marcas — dados compartilhados entre a landing page e a página de Moda ──
// Cada marca tem sua pasta em public/, organizada por subcoleção. Pra adicionar
// fotos novas: só soltar o arquivo na pasta e incluir o caminho no array abaixo.

export const brandNames = ["LÉZ אתפתח", "Maiah Bear Cub", "N.K Apex"];

export const brandImages: string[][] = [
  // Curadoria editorial: poucas imagens fortes preservam hierarquia e performance.
  // LÉZ אתפתח — alfaiataria masculina + a Liä (fundadora) representando o lado feminino da marca
  [
    "/lez-efata/ternos/terno3.png",
    "/lez-efata/ternos/terno1.png",
    "/lia/lia4.png",
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

// Galeria completa da Maiah Bear Cub (todas as fotos das subpastas), pro carrossel
// da página de Moda. Pra adicionar foto nova: só soltar o arquivo na pasta certa
// (bebes/roupinhas/criancas/estampas) e incluir o caminho aqui.
export const maiahBearCubGallery: string[] = [
  "/maiah-bear-cub/bebes/fotobebe1.png",
  "/maiah-bear-cub/bebes/fotobebe2.png",
  "/maiah-bear-cub/bebes/fotobebe3.png",
  "/maiah-bear-cub/bebes/fotobebe4.png",
  "/maiah-bear-cub/criancas/crianca1.png",
  "/maiah-bear-cub/criancas/crianca2.png",
  "/maiah-bear-cub/criancas/crianca3.png",
  "/maiah-bear-cub/criancas/crianca4.png",
  "/maiah-bear-cub/criancas/crianca5.png",
  "/maiah-bear-cub/criancas/crianca6.png",
  "/maiah-bear-cub/criancas/crianca7.png",
  "/maiah-bear-cub/criancas/crianca8.png",
  "/maiah-bear-cub/criancas/crianca9.png",
  "/maiah-bear-cub/criancas/crianca10.png",
  "/maiah-bear-cub/roupinhas/roupinha1.png",
  "/maiah-bear-cub/roupinhas/roupinha2.png",
  "/maiah-bear-cub/roupinhas/roupinha3.png",
  "/maiah-bear-cub/roupinhas/roupinha4.png",
  "/maiah-bear-cub/roupinhas/roupinha5.png",
  "/maiah-bear-cub/roupinhas/roupinha6.png",
  "/maiah-bear-cub/roupinhas/roupinha7.png",
  "/maiah-bear-cub/roupinhas/roupinha8.png",
  "/maiah-bear-cub/roupinhas/roupinha9.png",
  "/maiah-bear-cub/roupinhas/roupinha10.png",
  "/maiah-bear-cub/estampas/estampa1.png",
  "/maiah-bear-cub/estampas/estampa2.png",
];

// Galeria completa da LÉZ אתפתח: os 5 ternos + fotos da Liä (fundadora) que também
// vestem a marca — mesclado a pedido do usuário. Pra adicionar foto nova: incluir
// o caminho aqui.
export const lezEfataGallery: string[] = [
  "/lez-efata/ternos/terno1.png",
  "/lez-efata/ternos/terno2.png",
  "/lez-efata/ternos/terno3.png",
  "/lez-efata/ternos/terno4.png",
  "/lez-efata/ternos/terno5.png",
  "/lia/lia1.png",
  "/lia/lia2.png",
  "/lia/lia4.png",
];

// N.K Apex tem 6 fotos esportivas ao todo; a curadoria (brandImages[2]) mostra só 3.
// Essas duas páginas (a curada + as outras 3) alimentam a seta de navegação da
// galeria da marca em ModaPage. Pra adicionar foto nova: incluir o caminho aqui.
export const nkApexGalleryPages: string[][] = [
  [
    "/nk-apex/esportiva/esportiva1.png",
    "/nk-apex/esportiva/esportiva4.png",
    "/nk-apex/esportiva/esportiva6.png",
  ],
  [
    "/nk-apex/esportiva/esportiva2.png",
    "/nk-apex/esportiva/esportiva3.png",
    "/nk-apex/esportiva/esportiva5.png",
  ],
];

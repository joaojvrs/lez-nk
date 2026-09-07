# Ajustes do site — LÉZ.NK Capital

Arquivo de acompanhamento vivo. Conforme o material for chegando (PDF, áudios, componentes, imagens), vou entendendo o projeto e registrando aqui o que muda, onde mexer no código e o status de cada item. Nada aqui é implementado até o status virar "pronto para implementar" **e** receber sinal verde.

Status possíveis: `pronto para implementar` · `aguardando material do usuário` · `pendente decisão` · `em andamento` · `feito`

---

## 1. Missão, Visão e Valores

- **Origem:** página 4 do PDF (Grupo LÉZ.NK — Planejamento Estratégico), pedido explícito de trocar o conteúdo da seção mantendo o layout em quadros lado a lado.
- **Onde mexer:** `src/translations.ts` → chave `mvv.mission` / `mvv.vision` / `mvv.values`, nos 3 idiomas (`pt`, `en`, `it`). Layout em `src/App.tsx` (~linha 483, grid de 3 colunas) já está correto, não precisa mudar.
- **Texto novo (PT, referência para traduzir en/it):**
  - Missão: "Criar, transformar e conectar negócios que gerem valor para pessoas, para a sociedade e para o futuro."
  - Visão: "Construir um ecossistema empresarial plural, inovador e humano, capaz de crescer sem perder propósito."
  - Valores (6): Coragem para criar · Verdade para conduzir · Respeito pelas pessoas · Responsabilidade pelo impacto · Liberdade para pensar · Resiliência para avançar.
- **Status:** ✅ feito. Layout simplificado pra 1 parágrafo por quadro (removido o `p2` que não existe mais no texto novo).

## 2. Modelo de negócio — Moda

- **Origem:** página 4 do PDF.
- **Onde mexer:** `src/translations.ts` → `portfolios.s01.modelItems` (pt/en/it).
- **Mudança:**
  - Fabricação: de "Internacional — China" → "América Latina, Ásia, Europa".
  - Vendas: de "Online + Loja física em São Paulo, SP" → "Online + escalonamento de loja física em cada país selecionado, meta de 39 lojas".
- **Status:** ✅ feito.

## 3. Reativação de pilares ocultos (Real Estate, Hotelaria, Tecnologia)

- **Origem:** página 3 do PDF cita os 4 eixos ativos do grupo (Moda & Têxtil, Real Estate, Hospitalidade, Tecnologia); hoje 3 desses estão escondidos no código.
- **Onde mexer:** `src/App.tsx` linhas 8-10 — flags `SHOW_REAL_ESTATE`, `SHOW_HOSPITALITY`, `SHOW_TECHNOLOGY` (mudar de `false` para `true`).
- **Confirmado com o usuário:** reativar as 3.
- **Status:** ✅ feito.

## 4. Expansão Global — 39 países + projeção de lojas físicas

- **Origem:** página 2 do PDF — lista de países-alvo por região (América do Sul, América Central/Norte, Oriente Médio, Ásia, Europa) para moda de luxo, e projeção de expansão de loja física para os próximos 5 anos.
- **Onde mexer:** virou seção própria `src/GlobalExpansion.tsx` (id `expansao`), inserida em `App.tsx` logo depois da seção "Objetivos" — junto com o globo do item 5, já que os dois falam da mesma coisa (mesma lista de países).
- **Status:** ✅ feito — texto, estatísticas (meta 39 países / 39 lojas em 5 anos) e lista por região renderizados ao lado do globo.

## 5. Seção "Globo" — pré-marketing global

- **Origem:** página 5 do PDF — referência ao vídeo feito para a "PL" (apresentacaopatrizia.vercel.app), adaptado para o Grupo LÉZ.NK: globo com os países-alvo, marcas do grupo (LÉZ אפתח, Maiah Bear Cub, N.K Apex — já existem em `src/Portfolios.tsx` linha 80) e prédios de referência para imobiliário.
- **Decisão confirmada:** vai ser um componente React que o próprio usuário vai enviar pronto — meu trabalho é integrar ao site (posicionamento na página, dados que alimentam o componente: países, marcas, imagens).
- **Imagens de referência já existentes no projeto que podem ser reaproveitadas:** `src/desenvolvimento imobiliario.jpeg`, `src/hotelaria.jpeg`, `src/agronegocio.jpeg`.
- **Componente recebido:** `Globe` em cobe-globe.jsx (projeto de referência `apresentacaopatrizia`), usando a lib **`cobe`** (globo WebGL leve, renderiza em `<canvas>`). Props principais: `markers` (pontos no globo, `{ location: [lat, lng], id, label }`), `arcs` (linhas conectando dois pontos, `{ from, to, id, label }`), cores (`markerColor`, `baseColor`, `arcColor`, `glowColor`), e parâmetros de física/interação (arrastar com o mouse, rotação automática com `speed`, inércia, etc.). Os labels de marker/arc usam **CSS Anchor Positioning** (`positionAnchor`/`anchor()`) pra grudar o texto no ponto do globo.
- **O que precisa de adaptação pra rodar no `lez-nk` (não é só copiar e colar):**
  1. **Dependência nova:** `cobe` não está no `package.json` do projeto — precisa `npm install cobe` antes de tudo.
  2. **Tokens de tema:** o componente usa `var(--sans)` e `var(--gold-dark)`, que não existem no `src/index.css` daqui. Aqui os tokens são `--font-sans`, `--color-gold`, `--color-gold-light`, `--color-dark` (ver `@theme` em `src/index.css`). Preciso trocar essas referências pelos tokens reais do projeto (ou adicionar um `--color-gold-dark` se quisermos um tom mais escuro pro texto dos labels).
  3. **Compatibilidade de navegador:** CSS Anchor Positioning é recurso bem recente (Chrome/Edge 125+, ainda sem suporte no Safari/Firefox estável). Como é uma seção de "pré-marketing", isso significa que os labels dos marcadores podem simplesmente não aparecer em parte dos visitantes — vou avaliar se vale portar esse tooltip pra um cálculo de posição via JS (mais trabalho, mas funciona em todo navegador) ou aceitar a limitação.
  4. **Dados que vão alimentar `markers`/`arcs`:** ainda preciso definir a lista final de coordenadas — cruzar com o item 4 (39 países da expansão de moda) e decidir se os `arcs` saem de um ponto-base (ex: Goiânia/Brasil, sede do grupo) até cada país-alvo, e se cada marca (LÉZ אתפתח, Maiah Bear Cub, NK APEX) e os prédios de referência imobiliária entram como markers extras ou como cards ao lado do globo.
- **Confirmado pelo usuário:** a lista de países do globo é a mesma do item 4 (os 39 países do PDF), e as marcas a destacar são LÉZ אתפתח, Maiah Bear Cub e NK Apex — já documentadas com texto+fotos completos na seção 6.
- **Implementado:**
  - `src/components/Globe.tsx` — porte em TypeScript do componente recebido, adaptado à API real do `cobe@2` instalado (o snippet de referência usava um padrão de `onRender` que não existe nessa versão; troquei pelo loop `requestAnimationFrame` + `globe.update()`, que é o correto pra essa lib), cores trocadas pro dourado do tema (`--color-gold`), e **sem** o sistema de tooltip via CSS Anchor Positioning do original (não tem suporte em Safari/Firefox e o próprio snippet não define os elementos-âncora necessários pra funcionar — os países aparecem como lista de texto ao lado do globo em vez de tooltip no hover).
  - `src/countries.ts` — coordenadas (capital ou cidade de referência) dos 39 países + ponto de origem em Goiânia/GO (sede do grupo).
  - `src/GlobalExpansion.tsx` — junta tudo: texto + estatísticas + lista de países por região + tags das 3 marcas, ao lado do globo com arcos saindo de Goiânia até cada país.
  - Testado no navegador (Playwright) — globo renderiza, gira, arrasta, sem erros de console.
- **Decisões tomadas sem confirmação explícita seguindo o "implementar tudo", que valem revisão:**
  1. **Prédios de referência imobiliária** — não entraram nessa seção. Como a reativação da seção "Desenvolvimento Imobiliário" (item 3) já mostra um prédio de referência, não dupliquei imagem aqui pra não sobrecarregar a seção do globo. Se quiser prédios específicos aqui também, me avisa.
  2. Coordenadas usadas são cidades de referência (ex: Nova York pros EUA, Milão pra Itália por ser polo de moda) — não uma lista oficial, é minha melhor estimativa.
  3. Os vídeos de banco de stock (mencionados na correção anterior) não entraram ainda — a seção está só com o globo + texto, sem vídeo de fundo. Posso adicionar depois se você mandar/escolher os clipes.
  4. Áudio mencionado ainda não foi recebido/analisado — se tiver algo importante nele que mude o que já foi feito, é só falar que ajusto.
- **Status:** ✅ implementado e testado. Pontos 1-4 acima ficam abertos pra ajuste fino se você quiser mudar alguma decisão.
- **Sobre os vídeos citados na referência (apresentacaopatrizia):** usuário confirmou que não são vídeos gravados sob demanda — são clipes de banco de vídeos estilo "Unsplash, só que de vídeo" (ex: Pexels Videos, Coverr, Mixkit, Videvo — bancos gratuitos de stock video). Ou seja, pra reproduzir esse estilo na seção do globo/expansão, a ideia é usar clipes de banco de vídeo (cidades, viagem, moda/lifestyle) como vídeo de fundo ou complemento visual, igual já é feito hoje no Hero (`src/videomp_.mp4`, ver `App.tsx` linha ~252) — não precisa de produção própria. Falta o usuário escolher/mandar os clipes específicos que quer usar.

## 6. Catálogo de marcas — descrições completas (Moda)

- **Origem:** mensagem do Jairo Alves (WhatsApp, não está no PDF) — pedido direto: "Atualizar o catálogo e colocar as descrições das marcas".
- **Primeira marca recebida — NK APEX:**
  > NK APEX nasce do movimento de quem escolhe não parar. Uma marca esportiva para quem entende que força não é apenas chegar mais longe — é superar a si mesmo todos os dias. É disciplina, liberdade, energia e identidade. NK APEX veste movimento. Transforma esforço em conquista. E lembra que o verdadeiro desafio nunca foi ser melhor que alguém, mas descobrir até onde você pode chegar.
- **Fotos:** `public/esportiva/esportiva1.png` até `esportiva6.png` — ensaio lifestyle/streetwear da marca (conjuntos moletom + legging preto com detalhe vermelho, conjunto jogger cinza, cenários urbanos e de academia).
- **Onde já existe hoje:** `src/Portfolios.tsx` — Setor 01 "Moda", array `brandNames` (linha 80: `"N.K Apex"` é a 3ª marca), com descrição curta em `src/translations.ts` → `portfolios.s01.brandDescs[2]` (hoje só "Moda fitness"/"Fitness fashion"/"Moda fitness"). É o lugar certo pra entrar esse texto completo — não achei nada no PDF detalhando esse catálogo, então a organização de layout é decisão nossa.
- **Como pretendo fazer:**
  1. Estender o schema de `portfolios.s01` em `translations.ts`: cada marca passa a ter descrição curta (badge/card compacto, como já é hoje) **e** uma descrição longa (o texto de manifesto da marca), nos 3 idiomas.
  2. No `Portfolios.tsx`, transformar o card de cada marca que já tiver descrição longa + fotos num bloco expandido (texto completo + galeria das fotos, no estilo dos `TechImage`/`ProjectCard` já usados nas outras seções do site), mantendo o card compacto atual como fallback para marcas que ainda não têm material.
  3. Isso evita mexer estruturalmente antes de ter as 3 marcas (LÉZ אתפתח, Maiah Bear Cub, N.K Apex) com descrição — o componente já nasce pronto pra registrar as outras assim que chegarem.
- **Segunda marca recebida — MAIAH BEAR CUB** (linha infantil/baby, hoje `brandDescs[1]` = "Moda infantil"):
  > Uma coleção que nasceu para eternizar uma memória. O símbolo do São Bernardo nesta coleção não representa apenas uma espécie. Representa Maiah — uma companheira que me ensinou que existem formas de amor que não precisam de palavras. Maiah carrega uma história de superação, mas também de aconchego, carinho, proteção e uma lealdade que permanece para sempre. Foi desse sentimento que nasceu Maiah Bear Cub: do desejo de transformar amor em algo que se possa vestir, tocar e guardar. Assim como queremos proteger e cuidar dos nossos pequenos, cada peça carrega essa mesma intenção: acolher, proteger e expressar amor. Maiah Bear é amor transformado em vestir. É proteção como gesto. É carinho como identidade. É a lealdade canina transformada em símbolo. Porque algumas histórias não terminam. Elas permanecem — eternizadas naquilo que carregamos conosco.
  - **Fotos — organizadas em `public/maiah-bear-cub/`** (pasta pai criada para a marca, como o usuário sugeriu):
    - `maiah-bear-cub/bebes/fotobebe1.png` a `fotobebe4.png` — bebês vestindo a coleção (tons neutros/rosa, malha macia, estampas de coração/poá).
    - `maiah-bear-cub/roupinhas/roupinha1.png` a `roupinha10.png` — peças soltas em flat-lay (fundo neutro, sem modelo).
    - `maiah-bear-cub/criancas/crianca1.png`, `crianca2.png` — pasta extra que apareceu durante o ajuste (crianças vestindo a coleção), também reorganizada aqui.
    - Usuário avisou que vai adicionar mais fotos depois — o componente deve ler a lista de imagens de forma fácil de estender (array de nomes de arquivo por subpasta, ou varrer a pasta), sem precisar de novo ajuste de código a cada foto nova.
- **Terceira marca recebida — LÉZ אֶתְפְּתַח (EFATA)** (hoje `brandDescs[0]` = "Moda masculina, feminina e acessórios"):
  > LÉZ nasce para despertar aquilo que existe dentro de cada pessoa. EFATA (אֶתְפְּתַח) significa abre-te. Abre-te para quem você é. Para a sua identidade, sua essência, sua coragem de existir sem se moldar ao olhar dos outros. Porque antes de ter, é preciso ser. E quando você se reconhece, tudo aquilo que conquista passa a carregar a sua verdadeira identidade. LÉZ não veste pessoas. LÉZ revela quem elas são.
  - **Fotos:** `public/lez-efata/ternos/terno1.png` a `terno5.png` — editorial de alfaiataria (blazers/ternos em tons neutros, still em manequim, styling premium).
  - **Nota:** a pasta `public/estampa/` que também estava solta no `public/` **não é da LÉZ** — são estampas do São Bernardo e de corações/poá que batem com as fotos de bebê da Maiah Bear Cub, então reclassifiquei ela pra lá.
- **Organização final de pastas em `public/`:**
  - `lez-efata/ternos/` — LÉZ אתפתח
  - `maiah-bear-cub/bebes/`, `maiah-bear-cub/roupinhas/`, `maiah-bear-cub/criancas/`, `maiah-bear-cub/estampas/` — Maiah Bear Cub (a pasta `criancas/` está crescendo em tempo real, já tem 10 fotos)
  - `esportiva/` — NK APEX (ainda solta na raiz do `public/`; posso mover para `nk-apex/esportiva/` também, pra manter o padrão de pasta por marca — só não fiz ainda porque não foi pedido)
- **Status:** ✅ feito. Cada marca agora é um bloco com nome + tagline curta + descrição completa + galeria de fotos (grid responsivo, `loading="lazy"`), no `src/Portfolios.tsx` (Setor 01). Removido o badge "Teste"/"Test" que era placeholder. Testado no navegador — as 3 marcas renderizam com todas as fotos (LÉZ אתפתח: 5, Maiah Bear Cub: 26, NK Apex: 6).

## 7. Planejamento Estratégico — narrativa (página 1 do PDF)

- **Origem:** usuário apontou que a seção "Objetivos Estratégicos" do site só tinha as fases de execução (curto/médio/longo prazo), mas faltava a narrativa da página 1 do PDF ("Da moda para um ecossistema de negócios e experiências", "Visão de Longo Prazo", "Direção Estratégica") que dá o contexto/porquê por trás dessas fases.
- **Onde mexer:** dentro da própria `<Section id="objetivos">` em `src/App.tsx` — **não é uma seção separada** (isso foi corrigido depois de uma tentativa errada de criar `id="planejamento"` como bloco próprio, o usuário pediu pra juntar tudo numa seção só, com um único `<h2>`). Traduções em `src/translations.ts` → `strategicPlanning` (pt/en/it).
- **Como ficou:** a narrativa (história da fundadora/moda como ecossistema, Visão de Longo Prazo, Direção Estratégica, frase de fechamento com borda dourada) entra como texto introdutório acima do layout de duas colunas; embaixo, o par "2026—2036 / Objetivos Estratégicos" + resumo voltou a ficar `sticky` do lado das fases (Curto/Médio/Longo Prazo), restaurando a animação de scroll que existia antes.
- **Status:** ✅ feito. Testado no navegador (inclusive o comportamento sticky no scroll), sem erros de console.

## 8. Página dedicada de Moda (`/moda`)

- **Origem:** usuário pediu que a Moda fosse a primeira entre os pilares (Imobiliário/Hotelaria/Tecnologia) e abrisse "outra página" com os detalhes das coleções — depois corrigiu que não deveria nem ser uma seção da landing page, e sim uma página própria com URL dedicada.
- **O que mudou:**
  - Instalado `react-router-dom` (não existia roteamento no projeto antes — era tudo scroll de página única).
  - `src/main.tsx` agora envolve o app em `<BrowserRouter>` com duas rotas: `/` (o site, `App.tsx`, sem mudança de conteúdo) e `/moda` (`src/pages/ModaPage.tsx`, página nova).
  - `src/brands.ts` — novo módulo compartilhado com `brandNames` e `brandImages` (antes viviam dentro de `Portfolios.tsx`).
  - `src/pages/ModaPage.tsx` — página nova e independente: nav própria (logo, link "Voltar ao site", seletor de idioma), hero, e o catálogo completo das 3 marcas (LÉZ אתפתח, Maiah Bear Cub, NK Apex) com descrição + galeria de fotos + modelo de negócio — esse conteúdo foi **removido** do Setor 01 de `Portfolios.tsx` (não existe mais na landing page).
  - O menu do site (desktop e mobile) ganhou "Moda" como **primeiro item**, apontando para `/moda` via `<Link>`.
  - `GlobalExpansion.tsx` atualizado para importar `brandNames` de `./brands` (antes vinha de `./Portfolios`).
- **Atenção pra quando for pro ar:** como agora é uma rota de verdade (não uma âncora `#`), o servidor de produção precisa de uma regra de rewrite pra SPA (qualquer URL cair em `index.html`), senão `/moda` dá 404 ao dar refresh direto ou compartilhar o link. Isso depende de onde o site for hospedado (Vercel/Netlify fazem isso automaticamente pra projetos Vite detectados; se for outro serviço, pode precisar configurar manualmente).
- **Status:** ✅ feito. Testado: link do menu leva pra `/moda`, navegação direta pela URL funciona no dev server, "Voltar ao site" retorna pra `/`, catálogo completo renderiza sem erros.

## 9. Próximos ajustes

_(vou adicionando aqui conforme você for mandando mais coisa)_

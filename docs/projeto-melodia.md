# Melodia no MeloThing

## Descrição e propósito

A Melodia é a assistente de aprendizagem musical do MeloThing. Sua função é orientar estudantes na escolha de trilhas, esclarecer conceitos, apoiar a prática e ajudar na retomada dos estudos. Ela também orienta criadores sobre a organização de conteúdos. A participação ativa de quem aprende e de quem ensina permanece no centro da experiência.

O MeloThing é uma proposta de plataforma de ensino de instrumentos e produção musical, com trilhas progressivas, exercícios, acompanhamento individual e conteúdos oficiais ou publicados pela comunidade. O escopo completo prevê criação e comercialização de trilhas e planos com diferentes recursos de IA. Esses serviços comerciais não são implementados nesta versão da landing page. A precificação foi retirada da entrega por orientação do responsável pelo projeto.

Esta primeira versão reúne uma landing page, cinco fluxos conversacionais demonstrativos, uma atividade de pulsação, uma galeria de mockups e uma apresentação guiada. Não requer conta e pode ser aberta diretamente pelo arquivo index.html.

## Objetivos

- Apresentar a identidade, o papel e o comportamento da Melodia.
- Demonstrar cinco funções coerentes com o escopo musical do MeloThing.
- Permitir percorrer conversas completas com escolhas, esclarecimentos e retomadas.
- Demonstrar a regra pedagógica de oferecer orientação sem realizar a atividade pelo estudante.
- Tornar a proposta apresentável em computador e celular.
- Documentar os fluxos, as tecnologias, a arquitetura atual e a evolução prevista.

## Público

Estudantes iniciantes e músicos interessados em aperfeiçoamento, além de músicos, professores e produtores que desejem organizar e compartilhar conhecimento. O conteúdo desta demonstração usa exemplos introdutórios de piano, violão, produção musical e pulsação.

## Persona digital

**Nome:** Melodia.

**Idade aparente:** não se aplica. A personagem é uma presença digital formada por som.

**Corpo e expressões:** ondas sonoras vermelhas; não possui pele ou anatomia humana. Os olhos são representações gráficas de ondas sonoras. Não se atribui uma cor de olhos humana.

**Cabelos:** partituras que se enrolam e flutuam, representando melodias em construção.

**Vestuário:** vestido inspirado na moda clássica, com estampas musicais, camadas que lembram teclas de piano, laços e acessórios em vermelho, preto e creme.

**Expressão:** acolhedora, curiosa e encorajadora. A ficha original também apresenta variações alegre, surpresa, pensativa e determinada.

**Comunicação:** linguagem simples, perguntas curtas e exemplos concretos. Oferece uma dica, convida a uma tentativa e responde à dificuldade sem constranger o estudante.

**Limites pedagógicos:** não realiza exercícios pelo aluno, não declara ter ouvido uma execução quando não há áudio recebido, não inventa progresso e não publica conteúdo automaticamente.

Não há um módulo específico de inclusão visual da persona nesta etapa, conforme o recorte definido. A página emprega recursos usuais de navegação por teclado, rótulos e redução de movimento.

## Cinco funcionalidades demonstradas

| Função | O que a demonstração permite | Relação com o projeto |
| --- | --- | --- |
| Escolha de trilha | Escolher área e nível, receber uma sugestão e confirmar o próximo passo | RF03, RF04, RF05 |
| Explicação de conceito | Entender ritmo e pulsação, responder uma pergunta e receber uma pista | Suporte por IA previsto no escopo e no caso de uso |
| Prática guiada | Receber dicas, experimentar quatro toques e relatar dificuldades | RF06 e RN10 |
| Retomada de estudos | Consultar progresso fictício e entender a próxima etapa disponível | RF07, RN02, RN03 e RN08 |
| Orientação a criadores | Planejar tema, público, etapas e compreender as condições de publicação | RF08, RN04, RN07 e RN11 |

As cinco funções da assistente são uma proposta para este protótipo, fundamentada no documento-base. Os requisitos originais descrevem a plataforma de modo mais amplo e não especificam todos esses diálogos.

## Arquitetura implementada

```text
Navegador
  index.html          estrutura e conteúdo da apresentação
  styles.css          identidade visual e adaptação às telas
  app.js              estados e transições de conversa
                      galeria, modais e apresentação
                      atividade local de pulsação
  assets/             personagem e cinco mockups
  docs/               documentação e roteiro
```

Cada fluxo possui um estado inicial, mensagens, sugestões de resposta, aliases para respostas digitadas e transições. O estudante pode trocar de fluxo ou recomeçar a conversa. Uma entrada desconhecida produz uma explicação do limite da demonstração e apresenta as opções disponíveis.

As mensagens digitadas são inseridas como texto, sem interpretar HTML. A página não solicita credenciais, não faz chamadas externas, não usa armazenamento persistente e não envia mensagens a servidores. O progresso é inteiramente ilustrativo; recarregar a página reinicia a experiência.

## Tecnologias utilizadas

- HTML5 semântico para estrutura, navegação, formulários e diálogos.
- CSS com variáveis de identidade, grids, breakpoints e preferências de movimento.
- JavaScript sem dependências externas para estado e interatividade.
- Web Audio API para quatro batidas sintetizadas a 80 BPM, iniciadas por ação do usuário.
- performance.now para comparar os intervalos entre quatro toques na prática.
- Imagens PNG geradas por IA, com a personagem original como referência.

Não há compilação nem instalação de pacotes para utilizar o protótipo. É possível abrir o arquivo index.html ou servir a pasta com um servidor estático.

## Atividade de pulsação

O exemplo sonoro contém quatro batidas separadas por 750 ms. O estudante escuta e depois registra quatro toques no botão ou com a tecla espaço. A demonstração calcula três intervalos, compara sua proximidade de 750 ms e avalia a variação entre eles.

O feedback distingue uma tentativa próxima do exemplo, uma sequência regular em outra velocidade e uma sequência com intervalos variáveis. A tolerância é apenas demonstrativa e não constitui uma avaliação musical validada. Não há microfone, análise de voz, detecção de notas ou avaliação de instrumento. O resultado não altera as etapas da trilha.

## Evolução para IA generativa

A IA generativa é obrigatória na atividade adaptada e ainda não está integrada. O chat atual simula o comportamento por meio de fluxos preparados. Uma evolução proposta é:

```text
Interface de conversa
  → serviço de aplicação
    → regras pedagógicas e contexto autorizado
      → provedor de IA
    → serviços de trilhas e progresso
      → banco de dados
```

O serviço de aplicação deverá proteger as credenciais do provedor, aplicar as regras de suporte pedagógico e verificar autorização antes de consultar dados pessoais. A escolha do provedor, o modelo, os limites de uso e a estratégia de recuperação de conteúdo ainda serão definidos. Nenhuma chave deve ser incorporada ao JavaScript entregue ao navegador.

Para dados reais, a modelagem existente fornece usuários, trilhas, etapas, conteúdos, exercícios, matrículas, progresso e interações com a IA. Outras entidades do projeto, como assinaturas e pagamentos, pertencem ao produto mais amplo. O DER e o MER apresentados no documento contêm níveis diferentes de detalhamento; será necessário consolidá-los antes de implementar um banco real.

## Casos de uso considerados

**Estudante:** visualizar e iniciar trilhas, realizar atividades, acompanhar progresso e consultar a IA.

**Criador:** criar, editar e publicar trilhas quando autorizado.

**Administrador:** gerenciar usuários, trilhas e moderação de conteúdos.

**Sistema de IA:** explicar conteúdos, responder dúvidas e auxiliar nos estudos.

A página simula as interações da assistente, sem executar cadastros, matrículas, publicação, moderação ou operações comerciais.

## Estado dos entregáveis de 1 a 5

1. **Documento do projeto:** este arquivo descreve a assistente, os objetivos, a arquitetura e as tecnologias.
2. **Imagem da assistente gerada por IA:** ficha original preservada e uma ilustração transparente derivada para a página.
3. **Protótipo do sistema:** landing page navegável com conversas, galeria e prática musical. Representa o recorte da assistente, não a plataforma completa.
4. **Demonstração do chatbot:** apresentação guiada na página e roteiro para demonstrar o chat ao vivo. Não foi gravado um vídeo.
5. **Fluxos documentados:** cinco fluxos completos com caminhos principais, alternativas, tratamento de entrada e critérios de conclusão.

O requisito técnico de IA generativa permanece pendente de integração. O protótipo deve ser apresentado como simulação até essa etapa ser concluída.

## Fontes do escopo

- MeloThing_10.docx: escopo geral, RF, RNF, regras de negócio, caso de uso, DER e MER.
- melodia_apresentacao_IA.pptx: conceito visual e ficha da personagem.
- Atividade Avaliativa - Assistente Virtual para Academia.pdf: estrutura de requisitos e entregáveis, adaptada ao domínio musical.
- Orientações do responsável pelo projeto nesta conversa: retirada do domínio de academia, ausência de idade humana, tom amigável, adiamento dos elementos específicos de inclusão da persona, entrega em HTML e retirada da precificação.

As instruções da atividade foram adaptadas conforme as decisões do responsável pelo projeto, que prevalecem sobre os exemplos de academia.

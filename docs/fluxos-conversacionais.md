# Cinco fluxos conversacionais da Melodia

Este documento descreve os fluxos implementados no protótipo. As respostas são preparadas; a conversa não utiliza um modelo de IA nesta versão. Os exemplos de trilha e progresso são ilustrativos.

## Convenções de interação

- O estudante pode escolher sugestões ou digitar respostas reconhecidas pelo contexto.
- Cada situação pode ser reiniciada pelo botão de recomeçar conversa.
- As cinco situações podem ser selecionadas a qualquer momento.
- Entradas não reconhecidas recebem uma explicação e as sugestões permanecem disponíveis.
- O texto digitado não é enviado nem salvo em armazenamento persistente.
- Pedidos para executar a atividade pelo estudante recebem uma orientação para tentar com ajuda.

## Fluxo 01 Escolha de trilha

**Objetivo:** orientar a escolha de uma trilha a partir do interesse e do nível.

**Pré-condição:** nenhuma conta é necessária no protótipo. No produto completo, catálogo, disponibilidade e matrícula dependerão dos serviços e regras da plataforma.

**Conversa principal**

1. Melodia: “Oi! Eu sou a Melodia. Vamos encontrar um caminho para você? O que gostaria de aprender?”
2. Estudante: “Tocar piano.”
3. Melodia: “Piano, que boa descoberta! Como está sua experiência com o instrumento?”
4. Estudante: “Estou começando do zero.”
5. Melodia: “A trilha demonstrativa ‘Piano do zero’ começa pelo instrumento, segue pelas notas e chega ao ritmo. Podemos explorar a primeira etapa?”
6. Estudante: “Quero começar.”
7. Melodia: “Combinado! Na primeira etapa, observe os grupos de duas e três teclas pretas. Eles ajudam você a se localizar no piano. Sua trilha está escolhida nesta demonstração; nenhuma matrícula foi criada.”
8. Ações disponíveis: ver a trilha demonstrativa, escolher outra trilha ou tirar uma dúvida.

**Alternativas implementadas**

- Violão: primeiro contato leva à sugestão “Primeiros acordes no violão”; experiência básica leva a uma sugestão de ritmo e percepção.
- Produção musical: primeiro contato leva a “Produção musical essencial”; experiência anterior leva à sugestão “Seu primeiro beat”.
- Piano com experiência prévia: sugere explorar “Harmonia na prática” ou revisar o início.
- Recusa ou mudança de área: retorna à escolha inicial sem registrar matrícula.

**Conclusão:** uma direção de estudo foi confirmada e o estudante recebeu um próximo passo. Não há compra, matrícula ou avaliação automatizada de nível.

**Referências:** RF03, RF04 e RF05.

## Fluxo 02 Esclarecimento de conceito

**Objetivo:** explicar ritmo e pulsação e verificar a compreensão com uma pergunta.

**Conversa principal**

1. Melodia: “Vamos descomplicar uma ideia musical? Você quer entender ritmo e pulsação ou já tem uma dúvida sobre isso?”
2. Estudante: “Qual é a diferença?”
3. Melodia: “A pulsação é a batida regular que você pode acompanhar com o pé. O ritmo é a combinação de sons e pausas organizada sobre essa referência. Quer experimentar um exemplo?”
4. Estudante: “Sim, me mostra.”
5. Melodia: “Experimente contar ‘1, 2, 3, 4’ em intervalos iguais, repetindo a contagem. Essa referência regular é a pulsação. Se você cantar sons longos e curtos sobre ela, estará criando um ritmo. Posso te fazer uma pergunta?”
6. Estudante: “Pode perguntar.”
7. Melodia: “Quando você acompanha uma música com batidas regulares do pé, o que está marcando?”
8. Estudante: “A pulsação.”
9. Melodia: “Isso! Você identificou a pulsação. Agora pode usar essa referência para explorar ritmos diferentes, mantendo as batidas regulares. Vamos sentir isso na prática?”
10. Ações disponíveis: abrir prática de pulsação, rever explicação ou continuar a jornada.

**Alternativas implementadas**

- Dificuldade inicial: oferece a analogia de uma caminhada regular e de palmas com durações diferentes.
- Resposta incorreta: explica que sons e pausas correspondem ao ritmo e convida a identificar novamente as batidas regulares.
- Nova dificuldade: permite rever o exemplo ou ouvir a atividade.

**Conclusão:** o estudante identifica a pulsação e pode iniciar uma prática. A pergunta não altera o progresso da trilha.

**Referência:** suporte pedagógico previsto no escopo e no caso de uso; RN10.

## Fluxo 03 Orientação durante a prática

**Objetivo:** oferecer pistas e incentivar a execução pelo estudante.

**Conversa principal**

1. Melodia: “Vamos praticar juntos. Em que parte você precisa de ajuda?”
2. Estudante: “Não consigo acompanhar as batidas.”
3. Melodia: “Primeiro, ouça sem tentar acertar. Imagine um relógio marcando intervalos iguais. Na atividade, você ouvirá quatro batidas a 80 BPM. Depois, poderá fazer quatro toques no seu ritmo.”
4. Estudante: “Abrir atividade e experimentar.”
5. Melodia: “A atividade vai abrir agora. Ouça primeiro e tente depois. Quando voltar à conversa, você pode me contar como foi.”
6. Estudante abre a atividade, ouve as batidas e registra quatro toques. O feedback compara os intervalos; o aluno fecha a janela e retorna ao chat.
7. Estudante: “Já fiz uma tentativa.”
8. Melodia: “Como foi sua tentativa? Aqui no chat, vou me basear no que você contar; não estou ouvindo sua execução.”
9. Estudante: “Consegui manter a regularidade.”
10. Melodia: “Boa descoberta! Manter intervalos regulares é a base desta prática. Você pode repetir para ganhar confiança. O relato desta conversa não altera o progresso da sua trilha.”

**Alternativas implementadas**

- Pedido “Faça a atividade por mim”: oferece uma pista e pede uma tentativa do aluno.
- Pedido de nova dica: sugere contar de modo regular, ouvir novamente e manter espaços iguais entre os toques.
- Relato de aceleração ou desaceleração: orienta repetir com menos pressão e permite voltar ao conceito.
- Áudio indisponível: a atividade informa o limite e sugere contar em intervalos regulares.

**Conclusão:** uma tentativa foi relatada e há orientação para repetir ou avançar. Não há análise de áudio, instrumento ou voz, nem atribuição de nota musical.

**Referências:** RF06 e RN10.

## Fluxo 04 Retomada dos estudos

**Objetivo:** orientar o próximo passo respeitando a sequência da trilha.

**Conversa principal**

1. Melodia: “Vamos retomar? Posso mostrar o exemplo de progresso da trilha ‘Piano do zero’. Os dados são ilustrativos, sem acesso a uma conta real.”
2. Estudante: “Mostrar meu exemplo de progresso.”
3. Melodia: “Neste exemplo, ‘Conhecendo o piano’ e ‘Notas musicais’ foram concluídas: 2 de 5 etapas. O próximo passo disponível é ‘Ritmo e pulsação’. Como quer seguir?”
4. Estudante: “Continuar em Ritmo e pulsação.”
5. Melodia: “Combinado. Vamos para ‘Ritmo e pulsação’. Na atividade demonstrativa você ouve batidas e tenta reproduzir intervalos regulares. Ao terminar, poderá repetir ou pedir uma dica.”
6. Ações disponíveis: abrir a atividade, ver a trilha ou rever o progresso.

**Alternativas implementadas**

- Pedido de pular ao desafio: informa que os requisitos das etapas devem ser concluídos e oferece prática ou revisão.
- Revisão: recupera a organização das teclas e convida a retomar a pulsação.
- Troca de objetivo: direciona ao fluxo de escolha de trilha.

**Conclusão:** o estudante identifica o próximo passo disponível. O exemplo não consulta uma conta e não muda o estado real de conclusão de etapas.

**Referências:** RF07, RN02, RN03 e RN08.

## Fluxo 05 Orientação ao criador de trilhas

**Objetivo:** apoiar o planejamento de conteúdos e explicar as condições de publicação.

**Conversa principal**

1. Melodia: “Quer compartilhar o que sabe? Posso orientar a organização de uma trilha musical. Você já tem autorização de criador no MeloThing?”
2. Criador: “Sim, sou criador autorizado.”
3. Melodia: “Vamos organizar uma ideia ilustrativa. Qual área combina com o que você quer ensinar?”
4. Criador: “Instrumento para iniciantes.”
5. Melodia: “Comece definindo um instrumento, quem vai aprender e o que essa pessoa conseguirá praticar ao final. Uma sequência possível é: conhecer o instrumento, explorar sons e aplicar uma pequena prática. Quer ver como organizar cada etapa?”
6. Criador: “Como organizo as etapas?”
7. Melodia: “Para cada etapa, organize: objetivo, explicação, exemplo, atividade do estudante e critério de conclusão. Defina a ordem e os pré-requisitos. A IA pode orientar, enquanto o planejamento e a autoria continuam com você. Quer entender a publicação?”
8. Criador: “Como funciona a publicação?”
9. Melodia: “Antes de publicar, confira se a trilha respeita o ensino musical e os critérios da plataforma. Somente criadores autorizados poderão publicar. A revisão e a publicação não acontecem neste protótipo. Seu plano está pronto para ser desenvolvido!”
10. Ações disponíveis: planejar outra trilha, explorar como estudante ou recomeçar a orientação.

**Alternativas implementadas**

- Sem autorização: explica que o processo de solicitação ainda será definido e permite planejar uma ideia, sem liberar publicação.
- Produção musical: orienta definir ferramentas e objetivo possível, como organizar uma sequência rítmica.
- Teoria musical: orienta escolher conceito, conhecimento prévio e aplicação observável.
- Revisão da ideia: retorna à seleção do tema.

**Conclusão:** o criador entende como estruturar uma etapa e quais condições antecedem a publicação. A confirmação de autorização é uma escolha de cenário; não representa autenticação ou permissão real.

**Referências:** RF08, RN04, RN07 e RN11.

## Tratamento comum de entradas

| Situação | Comportamento |
| --- | --- |
| Texto reconhecido no estado atual | Segue a escolha correspondente |
| Texto não reconhecido ou ambíguo | Explica o limite da demonstração e mantém as sugestões |
| Campo vazio | Não adiciona mensagem nem altera o estado |
| Pedido de resposta pronta | Oferece pista e convida a tentar |
| Saudação ou agradecimento | Responde brevemente e mantém o contexto |
| Reiniciar ou trocar situação | Inicia o fluxo escolhido, sem conservar histórico anterior |

Os fluxos podem ser demonstrados pelo menu de situações na página. A seção “Por dentro da conversa” apresenta o objetivo, cinco passos e a regra do fluxo selecionado.

'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const normalise = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const c = (label, next, aliases = []) => ({ label, next, aliases });
const scenarios = {
  trilha: {
    id: '01', title: 'Escolha de trilha', context: 'Vamos encontrar sua trilha',
    objective: 'Conhecer o interesse e a experiência do estudante para apresentar uma trilha adequada ao seu objetivo.',
    steps: ['Receber o pedido e perguntar o interesse musical.', 'Identificar o instrumento ou a área de estudo.', 'Perguntar o nível de experiência.', 'Apresentar uma trilha e confirmar a escolha.', 'Orientar o primeiro passo e concluir a conversa.'],
    rule: 'Regra: a recomendação é ilustrativa. Não há matrícula automática, pagamento ou consulta a um catálogo real.',
    states: {
      start: { text: 'Oi! Eu sou a Melodia. Vamos encontrar um caminho para você? O que gostaria de aprender?', choices: [c('Tocar piano', 'nivelPiano', ['piano', 'teclado']), c('Tocar violão', 'nivelViolao', ['violao', 'guitarra']), c('Produção musical', 'nivelProducao', ['producao', 'beat', 'produzir'])] },
      nivelPiano: { text: 'Piano, que boa descoberta! Como está sua experiência com o instrumento?', choices: [c('Estou começando do zero', 'pianoInicial', ['iniciante', 'zero', 'nunca', 'comecando']), c('Já conheço o básico', 'pianoExperiente', ['basico', 'intermediario', 'avancado', 'ja toco'])] },
      nivelViolao: { text: 'Vamos de violão! Você está começando agora ou já conhece alguns acordes?', choices: [c('É meu primeiro contato', 'violaoInicial', ['iniciante', 'zero', 'primeiro', 'nunca']), c('Já sei alguns acordes', 'violaoExperiente', ['acorde', 'basico', 'ja sei', 'intermediario', 'avancado'])] },
      nivelProducao: { text: 'Criar sons é uma jornada e tanto. Você já usou algum programa de produção musical?', choices: [c('Ainda não', 'producaoInicial', ['nao', 'nunca', 'zero', 'iniciante']), c('Já experimentei', 'producaoExperiente', ['sim', 'ja', 'basico', 'intermediario', 'avancado'])] },
      pianoInicial: { text: 'A trilha demonstrativa “Piano do zero” começa pelo instrumento, segue pelas notas e chega ao ritmo. Podemos explorar a primeira etapa?', choices: [c('Quero começar', 'pianoFim', ['sim', 'comecar', 'quero']), c('Prefiro outra área', 'start', ['outra', 'trocar', 'nao'])] },
      pianoExperiente: { text: 'Podemos explorar “Harmonia na prática”, uma sugestão para quem já tem uma base. Antes de avançar, vale revisar notas e acordes. Faz sentido para seu objetivo?', choices: [c('Sim, quero explorar', 'avancadoFim', ['sim', 'quero']), c('Quero revisar o início', 'pianoInicial', ['revisar', 'inicio', 'nao'])] },
      violaoInicial: { text: 'Minha sugestão é “Primeiros acordes no violão”. A ideia é conhecer o instrumento e praticar pequenas mudanças de acordes. Quer seguir por aí?', choices: [c('Sim, vamos nessa', 'violaoFim', ['sim', 'vamos', 'quero']), c('Quero mudar de área', 'start', ['mudar', 'outra', 'nao'])] },
      violaoExperiente: { text: 'Uma possibilidade é estudar ritmo e percepção para dar mais fluidez aos acordes que você já conhece. Quer explorar essa direção?', choices: [c('Quero explorar', 'avancadoFim', ['sim', 'quero']), c('Prefiro começar pelos acordes', 'violaoInicial', ['acorde', 'inicio', 'nao'])] },
      producaoInicial: { text: '“Produção musical essencial” é uma sugestão de trilha para conhecer as ferramentas e organizar seus primeiros sons. Quer começar por essa base?', choices: [c('Sim, começar pela base', 'producaoFim', ['sim', 'comecar', 'base']), c('Quero escolher outra área', 'start', ['outra', 'trocar', 'nao'])] },
      producaoExperiente: { text: 'Podemos explorar “Seu primeiro beat” e trabalhar a organização de uma ideia rítmica. É uma trilha ilustrativa da comunidade. Quer seguir nessa direção?', choices: [c('Sim, quero criar meu beat', 'producaoFim', ['sim', 'quero', 'beat']), c('Prefiro revisar as ferramentas', 'producaoInicial', ['revisar', 'ferramenta', 'nao'])] },
      pianoFim: { text: 'Combinado! Na primeira etapa, observe os grupos de duas e três teclas pretas. Eles ajudam você a se localizar no piano. Sua trilha está escolhida nesta demonstração; nenhuma matrícula foi criada.', choices: [c('Ver a trilha demonstrativa', '@journey'), c('Escolher outra trilha', 'start'), c('Tirar uma dúvida musical', '@conceito')] },
      avancadoFim: { text: 'Direção escolhida! Comece revisando a base e só avance quando estiver confortável. No sistema completo, a trilha terá conteúdos e requisitos próprios. Quer esclarecer algum conceito antes?', choices: [c('Tirar uma dúvida', '@conceito'), c('Escolher outra trilha', 'start')] },
      violaoFim: { text: 'Caminho escolhido! Comece conhecendo as partes do instrumento e a posição das mãos. Depois, siga para os primeiros acordes. Esta conversa orienta a escolha; não realiza matrícula.', choices: [c('Entender ritmo e pulsação', '@conceito'), c('Escolher outra trilha', 'start')] },
      producaoFim: { text: 'Vamos por esse caminho! Primeiro conheça a área de trabalho do programa e experimente organizar uma pequena sequência de sons. A criação será sua; eu posso ajudar a entender cada passo.', choices: [c('Praticar pulsação', '@pratica'), c('Escolher outra trilha', 'start')] }
    }
  },
  conceito: {
    id: '02', title: 'Esclarecimento de conceito', context: 'Ritmo e pulsação, sem complicar',
    objective: 'Explicar a diferença entre ritmo e pulsação, verificar o entendimento e oferecer uma nova explicação quando necessário.',
    steps: ['Identificar a dúvida sobre ritmo e pulsação.', 'Apresentar uma explicação simples com exemplo.', 'Convidar o estudante a identificar a pulsação.', 'Responder à tentativa com feedback ou uma nova pista.', 'Confirmar o entendimento e oferecer prática.'],
    rule: 'Regra: adaptar a explicação à resposta do estudante e oferecer pistas antes de repetir a definição.',
    states: {
      start: { text: 'Vamos descomplicar uma ideia musical? Você quer entender ritmo e pulsação ou já tem uma dúvida sobre isso?', choices: [c('Qual é a diferença?', 'explicacao', ['diferenca', 'ritmo', 'pulsacao', 'duvida', 'nao entendi']), c('Quero um exemplo', 'exemplo', ['exemplo'])] },
      explicacao: { text: 'A pulsação é a batida regular que você pode acompanhar com o pé. O ritmo é a combinação de sons e pausas organizada sobre essa referência. Quer experimentar um exemplo?', choices: [c('Sim, me mostra', 'exemplo', ['sim', 'mostra', 'exemplo']), c('Explica de outro jeito', 'analogia', ['outro', 'nao entendi', 'nao'])] },
      analogia: { text: 'Imagine passos regulares de uma caminhada: essa regularidade representa a pulsação. Agora imagine bater palmas com durações diferentes enquanto caminha: esse desenho de palmas representa um ritmo. Ficou mais próximo?', choices: [c('Agora entendi', 'pergunta', ['sim', 'entendi', 'claro']), c('Quero ouvir as batidas', '@practice')] },
      exemplo: { text: 'Experimente contar “1, 2, 3, 4” em intervalos iguais, repetindo a contagem. Essa referência regular é a pulsação. Se você cantar sons longos e curtos sobre ela, estará criando um ritmo. Posso te fazer uma pergunta?', choices: [c('Pode perguntar', 'pergunta', ['sim', 'pode', 'pergunta']), c('Ainda preciso de outra explicação', 'analogia', ['nao', 'outra', 'explicacao'])] },
      pergunta: { text: 'Quando você acompanha uma música com batidas regulares do pé, o que está marcando?', choices: [c('A pulsação', 'fim', ['pulsacao', 'pulso', 'batida regular']), c('O desenho de sons e pausas', 'pista', ['ritmo', 'sons', 'pausas'])] },
      pista: { text: 'Pense na parte que se mantém regular enquanto a melodia muda. O desenho de sons e pausas é o ritmo. Qual das duas ideias combina com as batidas constantes do pé?', choices: [c('A pulsação!', 'fim', ['pulsacao', 'pulso']), c('Quero revisar o exemplo', 'exemplo', ['revisar', 'exemplo', 'nao sei'])] },
      fim: { text: 'Isso! Você identificou a pulsação. Agora pode usar essa referência para explorar ritmos diferentes, mantendo as batidas regulares. Vamos sentir isso na prática?', choices: [c('Abrir prática de pulsação', '@practice'), c('Rever a explicação', 'explicacao'), c('Continuar minha jornada', '@progresso')] }
    }
  },
  pratica: {
    id: '03', title: 'Orientação durante a prática', context: 'Uma dica, depois uma tentativa',
    objective: 'Apoiar a prática de pulsação com instruções e pistas, sem realizar a atividade pelo estudante.',
    steps: ['Identificar a dificuldade na prática.', 'Orientar uma escuta inicial sem exigir resposta.', 'Propor uma tentativa de acompanhar batidas regulares.', 'Oferecer uma dica adicional ou abrir a atividade.', 'Receber o relato e sugerir repetição ou próximo passo.'],
    rule: 'Regra RN10: a assistente orienta, mas não executa a atividade pelo aluno. O chat recebe um relato; a atividade mede somente os intervalos dos toques.',
    states: {
      start: { text: 'Vamos praticar juntos. Em que parte você precisa de ajuda?', choices: [c('Não consigo acompanhar as batidas', 'escuta', ['batida', 'acompanhar', 'dificuldade', 'nao consigo']), c('Faça a atividade por mim', 'limite', ['por mim', 'resposta', 'faca', 'resolve'])] },
      limite: { text: 'Posso te dar uma pista e acompanhar sua tentativa. A descoberta precisa passar por você. Primeiro, escute quatro batidas regulares sem tocar. Depois, tente marcar cada uma. Vamos começar assim?', choices: [c('Vou tentar', 'escuta', ['sim', 'tentar', 'vamos']), c('Quero entender o conceito primeiro', '@conceito')] },
      escuta: { text: 'Primeiro, ouça sem tentar acertar. Imagine um relógio marcando intervalos iguais. Na atividade, você ouvirá quatro batidas a 80 BPM. Depois, poderá fazer quatro toques no seu ritmo.', choices: [c('Abrir atividade e experimentar', '@practice'), c('Preciso de mais uma dica', 'dica', ['dica', 'ajuda', 'nao entendi']), c('Já fiz uma tentativa', 'relato', ['fiz', 'tentei', 'pratiquei'])] },
      dica: { text: 'Tente contar “1, 2, 3, 4” com calma, mantendo o mesmo espaço entre os números. Se acelerar, pare e escute novamente. Não precisa acertar de primeira. Quer experimentar agora?', choices: [c('Quero experimentar', '@practice'), c('Quero relatar minha tentativa', 'relato', ['relatar', 'tentei', 'fiz']), c('Revisar ritmo e pulsação', '@conceito')] },
      relato: { text: 'Como foi sua tentativa? Aqui no chat, vou me basear no que você contar; não estou ouvindo sua execução.', choices: [c('Consegui manter a regularidade', 'fim', ['consegui', 'regular', 'acertei']), c('Ainda acelero ou desacelero', 'repetir', ['acelero', 'desacelero', 'dificil', 'nao consegui'])] },
      repetir: { text: 'Vamos reduzir a pressão. Ouça novamente, conte as quatro batidas em voz baixa e só depois toque. Concentre-se em manter os espaços iguais entre um toque e outro. Quer repetir?', choices: [c('Repetir a atividade', '@practice'), c('Rever a dica', 'dica'), c('Voltar ao conceito', '@conceito')] },
      fim: { text: 'Boa descoberta! Manter intervalos regulares é a base desta prática. Você pode repetir para ganhar confiança. O relato desta conversa não altera o progresso da sua trilha.', choices: [c('Praticar novamente', '@practice'), c('Ver a próxima etapa', '@progresso'), c('Recomeçar a orientação', 'start')] }
    }
  },
  progresso: {
    id: '04', title: 'Retomada dos estudos', context: 'Seu próximo passo na jornada',
    objective: 'Explicar um progresso ilustrativo, respeitar a ordem da trilha e orientar a retomada dos estudos.',
    steps: ['Receber o pedido para retomar os estudos.', 'Apresentar o progresso do perfil demonstrativo.', 'Identificar a próxima etapa disponível.', 'Explicar a progressão caso o aluno peça para pular.', 'Confirmar a retomada e direcionar à prática.'],
    rule: 'Regras RN03 e RN08: respeitar a sequência e os pré-requisitos quando a trilha exigir progressão. Dados de progresso são fictícios nesta versão.',
    states: {
      start: { text: 'Vamos retomar? Posso mostrar o exemplo de progresso da trilha “Piano do zero”. Os dados são ilustrativos, sem acesso a uma conta real.', choices: [c('Mostrar meu exemplo de progresso', 'resumo', ['mostrar', 'progresso', 'sim', 'continuar']), c('Quero escolher outra trilha', '@trilha')] },
      resumo: { text: 'Neste exemplo, “Conhecendo o piano” e “Notas musicais” foram concluídas: 2 de 5 etapas. O próximo passo disponível é “Ritmo e pulsação”. Como quer seguir?', choices: [c('Continuar em Ritmo e pulsação', 'confirmar', ['continuar', 'ritmo', 'pulsacao']), c('Pular para o desafio final', 'bloqueio', ['pular', 'final', 'desafio']), c('Revisar o que aprendi', 'revisao', ['revisar', 'revisao', 'notas'])] },
      bloqueio: { text: 'Nesta trilha demonstrativa, o desafio vem depois das etapas de base. Conclua os requisitos de cada etapa antes de avançar. Podemos praticar pulsação agora ou revisar as notas.', choices: [c('Vamos praticar pulsação', 'confirmar', ['praticar', 'pulsacao', 'vamos']), c('Quero revisar a base', 'revisao', ['revisar', 'base'])] },
      revisao: { text: 'Uma revisão rápida: observe os grupos de duas e três teclas pretas para se localizar no piano. Depois, recupere os nomes das notas que você estudou. Quando quiser, retomamos a pulsação.', choices: [c('Estou pronto para continuar', 'confirmar', ['pronto', 'continuar', 'sim']), c('Tenho uma dúvida de teoria', '@conceito')] },
      confirmar: { text: 'Combinado. Vamos para “Ritmo e pulsação”. Na atividade demonstrativa você ouve batidas e tenta reproduzir intervalos regulares. Ao terminar, poderá repetir ou pedir uma dica.', choices: [c('Abrir a atividade', '@practice'), c('Ver o caminho da trilha', '@journey'), c('Rever meu progresso', 'resumo')] }
    }
  },
  criador: {
    id: '05', title: 'Orientação ao criador de trilhas', context: 'Compartilhar também é aprender',
    objective: 'Orientar a organização de uma trilha e explicar as condições de publicação da plataforma.',
    steps: ['Identificar o interesse do criador.', 'Confirmar a autorização para publicar.', 'Definir tema, público e objetivo musical.', 'Orientar etapas, conteúdos, atividades e pré-requisitos.', 'Explicar revisão e publicação, sem publicar automaticamente.'],
    rule: 'Regras RN04, RN07 e RN11: publicação por criadores autorizados, sujeita aos critérios da plataforma e ao escopo musical. ',
    states: {
      start: { text: 'Quer compartilhar o que sabe? Posso orientar a organização de uma trilha musical. Você já tem autorização de criador no MeloThing?', choices: [c('Sim, sou criador autorizado', 'tema', ['sim', 'autorizado', 'tenho']), c('Ainda não tenho autorização', 'autorizacao', ['nao', 'ainda', 'como'])] },
      autorizacao: { text: 'No projeto, a publicação é reservada a criadores autorizados. O processo de solicitação ainda será definido. Enquanto isso, você pode planejar seu conteúdo. Quer estruturar uma ideia?', choices: [c('Quero planejar minha trilha', 'tema', ['sim', 'quero', 'planejar']), c('Prefiro explorar como aluno', '@trilha')] },
      tema: { text: 'Vamos organizar uma ideia ilustrativa. Qual área combina com o que você quer ensinar?', choices: [c('Instrumento para iniciantes', 'instrumento', ['instrumento', 'piano', 'violao', 'iniciante']), c('Produção musical', 'producao', ['producao', 'beat']), c('Teoria musical', 'teoria', ['teoria', 'harmonia'])] },
      instrumento: { text: 'Comece definindo um instrumento, quem vai aprender e o que essa pessoa conseguirá praticar ao final. Uma sequência possível é: conhecer o instrumento, explorar sons e aplicar uma pequena prática. Quer ver como organizar cada etapa?', choices: [c('Como organizo as etapas?', 'estrutura', ['etapa', 'como', 'sim']), c('Quero trocar o tema', 'tema')] },
      producao: { text: 'Defina as ferramentas que o aluno precisa conhecer e um objetivo possível para iniciantes, como organizar uma sequência rítmica. Divida o caminho em passos que o estudante execute. Vamos estruturar uma etapa?', choices: [c('Vamos estruturar', 'estrutura', ['vamos', 'sim', 'estrutura']), c('Quero trocar o tema', 'tema')] },
      teoria: { text: 'Escolha um conceito específico, o conhecimento prévio necessário e uma aplicação musical observável. Por exemplo, entender pulsação e usá-la em uma prática. Quer organizar os componentes da etapa?', choices: [c('Quero organizar a etapa', 'estrutura', ['sim', 'quero', 'etapa']), c('Quero trocar o tema', 'tema')] },
      estrutura: { text: 'Para cada etapa, organize: objetivo, explicação, exemplo, atividade do estudante e critério de conclusão. Defina a ordem e os pré-requisitos. A IA pode orientar, enquanto o planejamento e a autoria continuam com você. Quer entender a publicação?', choices: [c('Como funciona a publicação?', 'publicacao', ['publicacao', 'publicar', 'sim']), c('Revisar minha ideia', 'tema', ['revisar', 'ideia'])] },
      publicacao: { text: 'Antes de publicar, confira se a trilha respeita o ensino musical e os critérios da plataforma. Somente criadores autorizados poderão publicar. A revisão e a publicação não acontecem neste protótipo. Seu plano está pronto para ser desenvolvido!', choices: [c('Planejar outra trilha', 'tema'), c('Explorar como estudante', '@trilha'), c('Recomeçar orientação', 'start')] }
    }
  }
};

let currentScenario = 'trilha';
let currentState = 'start';
let lastTrigger = null;

function addMessage(text, role = 'assistant') {
  const node = document.createElement('div');
  node.className = `message message-${role}`;
  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'assistant' ? 'Melodia' : 'Você';
  node.append(label, document.createTextNode(text));
  $('#chat-messages').append(node);
  $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
}

function renderChoices() {
  const choices = scenarios[currentScenario].states[currentState].choices;
  $('#chat-choices').replaceChildren();
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.textContent = choice.label;
    button.addEventListener('click', () => choose(choice));
    $('#chat-choices').append(button);
  });
}

function showState(state) {
  currentState = state;
  addMessage(scenarios[currentScenario].states[state].text);
  renderChoices();
}

function updateFlow() {
  const scenario = scenarios[currentScenario];
  $('#flow-id').textContent = `FLUXO ${scenario.id}`;
  $('#flow-title').textContent = scenario.title;
  $('#flow-objective').textContent = scenario.objective;
  $('#flow-rule').textContent = scenario.rule;
  $('#flow-steps').replaceChildren(...scenario.steps.map(text => {
    const li = document.createElement('li'); li.textContent = text; return li;
  }));
}

function selectScenario(name, scroll = false) {
  if (!scenarios[name]) return;
  currentScenario = name;
  currentState = 'start';
  $('#chat-messages').replaceChildren();
  $('#chat-text').value = '';
  $('#chat-context').textContent = scenarios[name].context;
  $$('[data-select-scenario]').forEach(button => {
    const active = button.dataset.selectScenario === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const activeButton = $(`[data-select-scenario="${name}"]`);
  if (window.innerWidth <= 620 && activeButton) {
    const container = $('.scenario-buttons');
    container.scrollTo({left: activeButton.offsetLeft - container.offsetLeft, behavior:'smooth'});
  }
  updateFlow();
  showState('start');
  if (scroll) $('#experimente').scrollIntoView({behavior:'smooth'});
}

function choose(choice, typedText) {
  addMessage(typedText || choice.label, 'user');
  if (choice.next === '@practice') {
    addMessage('A atividade vai abrir agora. Ouça primeiro e tente depois. Quando voltar à conversa, você pode me contar como foi.');
    openPractice();
    return;
  }
  if (choice.next === '@journey') {
    addMessage('O exemplo de trilha está logo abaixo. Ele mostra etapas concluídas, o próximo passo e as próximas descobertas.');
    $('.journey-section').scrollIntoView({behavior:'smooth'});
    return;
  }
  if (choice.next.startsWith('@')) { selectScenario(choice.next.slice(1)); return; }
  showState(choice.next);
}

$('#chat-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = $('#chat-text');
  const message = input.value.trim();
  if (!message) return;
  input.value = '';
  const text = normalise(message);
  if (/\b(recomecar|reiniciar|resetar)\b/.test(text)) { selectScenario(currentScenario); return; }
  if (text === 'oi' || text === 'ola' || text === 'bom dia' || text === 'boa tarde') {
    addMessage(message, 'user');
    addMessage('Oi! Que bom ter você por aqui. Podemos seguir com uma das opções abaixo.'); return;
  }
  if (/(faca|resolve|resolva|resposta pronta|por mim)/.test(text)) {
    addMessage(message, 'user');
    addMessage('Posso oferecer uma pista e ajudar a entender o caminho. A atividade continua sendo sua. Use uma das opções abaixo para seguirmos juntos.'); return;
  }
  const choices = scenarios[currentScenario].states[currentState].choices;
  const matches = choices.filter(choice => normalise(choice.label) === text || choice.aliases.some(alias => text.includes(normalise(alias))));
  if (matches.length === 1) { choose(matches[0], message); return; }
  if (/\b(obrigad[oa]|valeu)\b/.test(text)) {
    addMessage(message, 'user'); addMessage('Por nada! Cada descoberta conta. Podemos continuar por uma das sugestões abaixo.'); return;
  }
  addMessage(message, 'user');
  addMessage('Nesta demonstração eu sigo cinco conversas preparadas. Não consegui relacionar sua resposta com esta etapa. Pode escolher uma sugestão abaixo ou uma situação no menu?');
});

$$('[data-select-scenario]').forEach(button => button.addEventListener('click', () => selectScenario(button.dataset.selectScenario)));
$$('[data-scenario]').forEach(button => button.addEventListener('click', () => selectScenario(button.dataset.scenario, true)));
$('.reset-chat').addEventListener('click', () => selectScenario(currentScenario));
$('#flow-toggle').addEventListener('click', () => {
  const expanded = $('#flow-toggle').getAttribute('aria-expanded') === 'true';
  $('#flow-toggle').setAttribute('aria-expanded', String(!expanded));
  $('#flow-detail').hidden = expanded;
  $('#flow-toggle b').textContent = expanded ? '+' : '−';
});

const menuButton = $('.menu-toggle');
function closeMenu() { $('#main-nav').classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }
menuButton.addEventListener('click', () => {
  const open = $('#main-nav').classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
$$('#main-nav a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

function openDialog(dialog) {
  lastTrigger = document.activeElement;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
$$('dialog').forEach(dialog => {
  $('.dialog-close',dialog).addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }});
  dialog.addEventListener('close',() => { document.body.style.overflow = ''; if(lastTrigger?.isConnected) lastTrigger.focus({preventScroll:true}); });
});

const galleryItems = [
  {file:'01_inicio.png',label:'Início',alt:'Mockup da tela inicial do MeloThing',description:'Retome seus estudos, acompanhe seu ritmo e encontre o próximo passo com a Melodia.'},
  {file:'02_catalogo.png',label:'Explorar trilhas',alt:'Mockup do catálogo de trilhas de instrumentos e produção musical',description:'Encontre trilhas por área e nível, com conteúdos oficiais e criados pela comunidade.'},
  {file:'03_trilha.png',label:'Minha jornada',alt:'Mockup do caminho progressivo de etapas da trilha Piano do zero',description:'Veja o caminho percorrido e o próximo passo disponível dentro da sua trilha.'},
  {file:'04_atividade.png',label:'Atividade musical',alt:'Mockup de uma atividade de pulsação com dicas da Melodia',description:'Escute, experimente e peça uma dica. A Melodia orienta enquanto você pratica.'},
  {file:'05_chat.png',label:'Chat com a Melodia',alt:'Mockup da conversa com a Melodia sobre ritmo e pulsação',description:'Converse sobre uma dúvida mantendo o contexto do que você está aprendendo.'}
];
let galleryIndex = 0;
function selectGallery(index, focus = false) {
  galleryIndex = index;
  const item = galleryItems[index];
  $('#gallery-image').src = `assets/mockups/${item.file}`;
  $('#gallery-image').alt = item.alt;
  $('#gallery-location').textContent = `MeloThing / ${item.label}`;
  $('#gallery-description').textContent = item.description;
  $('#gallery-panel').setAttribute('aria-labelledby',`tab-${index}`);
  $$('[data-gallery]').forEach((button,i) => { button.setAttribute('aria-selected',String(i===index)); button.tabIndex = i===index?0:-1; });
  if (focus) $(`#tab-${index}`).focus();
}
$$('[data-gallery]').forEach(button => {
  button.addEventListener('click',() => selectGallery(Number(button.dataset.gallery)));
  button.addEventListener('keydown',event => {
    let index = galleryIndex;
    if(event.key==='ArrowRight') index=(index+1)%galleryItems.length;
    else if(event.key==='ArrowLeft') index=(index+galleryItems.length-1)%galleryItems.length;
    else if(event.key==='Home') index=0;
    else if(event.key==='End') index=galleryItems.length-1;
    else return;
    event.preventDefault(); selectGallery(index,true);
  });
});
function expandImage(src,caption,alt=caption) { $('#expanded-image').src=src; $('#expanded-image').alt=alt; $('#expanded-caption').textContent=caption; openDialog($('#image-dialog')); }
$$('[data-image]').forEach(button=>button.addEventListener('click',()=>expandImage(button.dataset.image,button.dataset.caption)));
$('#expand-gallery').addEventListener('click',()=>expandImage($('#gallery-image').src,`MeloThing · ${galleryItems[galleryIndex].label}`,galleryItems[galleryIndex].alt));

let audioContext;
let beatTimers = [];
let taps = [];
let tapping = false;
let playing = false;
const targetInterval = 60000/80;
function clearBeatTimers() { beatTimers.forEach(clearTimeout); beatTimers=[]; $$('.beat-indicators span').forEach(node=>node.classList.remove('lit')); playing=false; }
function lightBeat(index) {
  const light=$$('.beat-indicators span')[index];
  light.classList.add('lit');
  beatTimers.push(setTimeout(()=>light.classList.remove('lit'),180));
}
function resetPractice() {
  clearBeatTimers(); taps=[]; tapping=false;
  $('#tap-button').disabled=true;
  $('#listen-beats').disabled=false; $('#start-tapping').disabled=false;
  $('#practice-status').textContent='São quatro batidas regulares, a 80 BPM. Sem microfone.';
}
function openPractice() { resetPractice(); openDialog($('#practice-dialog')); }
$('#open-practice').addEventListener('click',openPractice);
$('#open-journey').addEventListener('click',()=>$('.journey-map').scrollIntoView({behavior:'smooth',block:'center'}));
$('#practice-dialog').addEventListener('close',()=>{ resetPractice(); if(audioContext?.state==='running') audioContext.suspend(); });
$('#listen-beats').addEventListener('click',async()=>{
  clearBeatTimers(); taps=[]; tapping=false; $('#tap-button').disabled=true;
  $('#listen-beats').disabled=true; $('#start-tapping').disabled=true;
  try {
    const AudioClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioClass) throw new Error('Audio indisponível');
    audioContext ||= new AudioClass();
    await audioContext.resume();
    playing=true;
    $('#practice-status').textContent='Escute: quatro batidas, com o mesmo intervalo entre elas.';
    for(let i=0;i<4;i++){
      beatTimers.push(setTimeout(()=>{
        if(!$('#practice-dialog').open)return;
        lightBeat(i);
        const oscillator=audioContext.createOscillator();
        const gain=audioContext.createGain();
        oscillator.type='sine'; oscillator.frequency.value=i===0?660:440;
        const now=audioContext.currentTime;
        gain.gain.setValueAtTime(0,now); gain.gain.linearRampToValueAtTime(.15,now+.005); gain.gain.exponentialRampToValueAtTime(.001,now+.12);
        oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(now); oscillator.stop(now+.13);
        oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
      },i*targetInterval+150));
    }
    beatTimers.push(setTimeout(()=>{
      playing=false; $('#listen-beats').disabled=false; $('#start-tapping').disabled=false;
      $('#practice-status').textContent='Agora é sua vez. Comece a tentativa e faça quatro toques regulares.';
    },4*targetInterval+150));
  } catch {
    $('#listen-beats').disabled=false; $('#start-tapping').disabled=false;
    $('#practice-status').textContent='O som não está disponível neste navegador. Conte 1, 2, 3, 4 em intervalos regulares e experimente os toques.';
  }
});
$('#start-tapping').addEventListener('click',()=>{
  clearBeatTimers(); taps=[]; tapping=true;
  $('#tap-button').disabled=false; $('#listen-beats').disabled=false;
  $('#practice-status').textContent='Faça quatro toques no botão ou na tecla espaço. Tente manter o mesmo intervalo das batidas.';
  $('#tap-button').focus();
});
function tap(){
  if(!tapping || playing || !$('#practice-dialog').open)return;
  const now=performance.now();
  if(taps.length && now-taps[taps.length-1]<100)return;
  lightBeat(taps.length); taps.push(now);
  $('#practice-status').textContent=`${taps.length} de 4 toques. Mantenha o intervalo.`;
  if(taps.length===4){
    tapping=false; $('#tap-button').disabled=true;
    const intervals=taps.slice(1).map((time,index)=>time-taps[index]);
    const error=intervals.reduce((sum,value)=>sum+Math.abs(value-targetInterval),0)/3/targetInterval;
    const spread=Math.max(...intervals)-Math.min(...intervals);
    if(error<=.25 && spread<=targetInterval*.4) $('#practice-status').textContent='Você manteve os intervalos próximos do exemplo! Experimente repetir para ganhar confiança.';
    else if(spread<=targetInterval*.3) $('#practice-status').textContent='Seus intervalos ficaram parecidos entre si. Agora tente aproximar a velocidade das batidas do exemplo.';
    else $('#practice-status').textContent='Os intervalos variaram. Ouça novamente e tente deixar o mesmo espaço entre um toque e outro. Vamos repetir?';
  }
}
$('#tap-button').addEventListener('click',tap);
document.addEventListener('keydown',event=>{
  if(event.code==='Space' && $('#practice-dialog').open && tapping && !event.repeat){event.preventDefault();tap();}
});
$('#practice-help').addEventListener('click',()=>{
  $('#practice-dialog').close(); selectScenario('pratica',true); showState('dica');
});

const presentationSlides = [
  {eyebrow:'01 / CONHEÇA A MELODIA',title:'Uma presença<br>feita de <em>som.</em>',text:'A assistente do MeloThing acompanha o aprendizado musical com explicações, dicas e orientação. Ela é amigável, acolhedora e incentiva a participação do estudante.',image:'assets/melodia.png',alt:'Melodia, a assistente musical'},
  {eyebrow:'02 / O QUE ELA FAZ',title:'Cinco formas<br>de <em>acompanhar.</em>',list:['Orientar a escolha de uma trilha.','Explicar conceitos musicais.','Ajudar durante a prática.','Orientar a retomada dos estudos.','Apoiar a organização de trilhas por criadores.'],image:'assets/melodia.png',alt:'Personagem Melodia'},
  {eyebrow:'03 / UMA CONVERSA COMPLETA',title:'Da dúvida à<br><em>descoberta.</em>',text:'Exemplo: o aluno pergunta a diferença entre ritmo e pulsação. A Melodia explica, oferece um exemplo, faz uma pergunta e dá feedback à tentativa. Se houver dificuldade, ela apresenta uma nova pista.',image:'assets/mockups/05_chat.png',alt:'Referência visual da conversa com a assistente'},
  {eyebrow:'04 / EXPERIMENTE O CHATBOT',title:'Agora você<br><em>escolhe o caminho.</em>',text:'A demonstração tem cinco fluxos com escolhas, respostas digitadas, esclarecimentos e retomadas. O comportamento atual usa respostas preparadas. A integração com IA generativa é a próxima etapa.',action:'Experimentar a conversa',image:'assets/melodia.png',alt:'Melodia convida a conversar'},
  {eyebrow:'05 / A BASE DO PROJETO',title:'Aprender, ensinar<br>e <em>compartilhar.</em>',text:'O protótipo parte dos requisitos e da modelagem do MeloThing. Trilhas, etapas, exercícios e progresso dão contexto à orientação. Nesta versão, os dados são ilustrativos e a navegação funciona localmente.',image:'assets/mockups/03_trilha.png',alt:'Referência visual da trilha progressiva'}
];
let presentationIndex=0;
function renderPresentation(){
  const slide=presentationSlides[presentationIndex];
  const layout=document.createElement('div');layout.className='presentation-layout';
  const copy=document.createElement('div');
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=slide.eyebrow;
  const title=document.createElement('h2');title.innerHTML=slide.title;
  copy.append(eyebrow,title);
  if(slide.text){const p=document.createElement('p');p.textContent=slide.text;copy.append(p);}
  if(slide.list){const list=document.createElement('ul');slide.list.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});copy.append(list);}
  if(slide.action){const button=document.createElement('button');button.className='button button-red';button.textContent=slide.action;button.addEventListener('click',()=>{$('#presentation-dialog').close();selectScenario('conceito',true);});copy.append(button);}
  const image=document.createElement('img');image.src=slide.image;image.alt=slide.alt;image.className='presentation-illustration';
  layout.append(copy,image);$('#presentation-content').replaceChildren(layout);
  $('#presentation-count').textContent=`${presentationIndex+1} / ${presentationSlides.length}`;
  $('#presentation-prev').disabled=presentationIndex===0;
  $('#presentation-prev').style.visibility=presentationIndex===0?'hidden':'visible';
  $('#presentation-next').textContent=presentationIndex===presentationSlides.length-1?'Concluir ✓':'Próximo →';
}
$('#open-presentation').addEventListener('click',()=>{presentationIndex=0;renderPresentation();openDialog($('#presentation-dialog'));});
$('#presentation-prev').addEventListener('click',()=>{if(presentationIndex>0){presentationIndex--;renderPresentation();}});
$('#presentation-next').addEventListener('click',()=>{if(presentationIndex<presentationSlides.length-1){presentationIndex++;renderPresentation();}else $('#presentation-dialog').close();});
document.addEventListener('keydown',event=>{
  if(!$('#presentation-dialog').open)return;
  if(event.key==='ArrowRight')$('#presentation-next').click();
  if(event.key==='ArrowLeft' && presentationIndex>0)$('#presentation-prev').click();
});

selectScenario('trilha');

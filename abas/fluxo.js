/* ==========================================
   CONFIGURAÇÕES GERAIS E UTILITÁRIOS
   ========================================== */
const pagina = document.body.dataset.pagina;

function toggleMenu() {
  const menuNav = document.querySelector('.menu');
  menuNav.classList.toggle('ativo');
}

function salvarDados(dados) {
  localStorage.setItem("agendamento", JSON.stringify(dados));
}

function pegarDados() {
  const dados = localStorage.getItem("agendamento");
  return dados ? JSON.parse(dados) : null;
}

function apagarDados() {
  localStorage.removeItem("agendamento");
}

function gerarIdCaso() {
  return "APP-" + Math.floor(Math.random() * 90000 + 10000);
}

function formatarData(dataTexto) {
  if (!dataTexto) return "Não informado";
  const data = new Date(dataTexto + "T00:00:00");
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function pegarDiaSemana(dataTexto) {
  if (!dataTexto) return "Não informado";
  const data = new Date(dataTexto + "T00:00:00");
  return data.toLocaleDateString("pt-BR", {
    weekday: "long"
  });
}

/* ==========================================
   LÓGICA DO MENU (TODAS AS PÁGINAS)
   ========================================== */
const temAgendamento = localStorage.getItem("agendamento");
const linkAgendar = document.getElementById("link-agendar");
const linkMeu = document.getElementById("link-meu");

if (temAgendamento) {
  if (linkAgendar) linkAgendar.style.display = "none";
  if (linkMeu) linkMeu.style.display = "inline-block";
}

/* ==========================================
   CARROSSEL COM SETAS (PÁGINA INICIAL)
   ========================================== */
const dispositivos = [
  {
    titulo: "Suporte remoto para dispositivos Apple",
    descricao: "Atendimento moderno, rápido e seguro para configuração, backup, iCloud e suporte geral.",
    imagem: "./abas/images/IMG_7301.PNG",
    alt: "iPhone em destaque"
  },
  {
    titulo: "Suporte remoto para iPad",
    descricao: "Ajuda prática para configuração, aplicativos, sincronização e uso do seu iPad.",
    imagem: "./abas/images/IMG_7302.PNG",
    alt: "iPad em destaque"
  },
  {
    titulo: "Suporte remoto para MacBook",
    descricao: "Suporte para sistema, organização, backup e desempenho do seu Mac.",
    imagem: "./abas/images/IMG_7303.PNG",
    alt: "MacBook em destaque"
  }
];

let indiceAtual = 0;

const elTitulo = document.getElementById("titulo-dispositivo");
const elDescricao = document.getElementById("descricao-dispositivo");
const elImagem = document.getElementById("imagem-dispositivo");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");

function atualizarCarrossel(novoIndice) {
  if (!elImagem) return;

  // Efeito de fade-out
  elImagem.style.opacity = "0";

  setTimeout(() => {
    indiceAtual = novoIndice;
    const d = dispositivos[indiceAtual];
    
    if (elTitulo) elTitulo.textContent = d.titulo;
    if (elDescricao) elDescricao.textContent = d.descricao;
    elImagem.src = d.imagem;
    elImagem.alt = d.alt;

    // Efeito de fade-in
    elImagem.style.opacity = "1";
  }, 300);
}

if (btnAnterior && btnProximo) {
  btnAnterior.addEventListener("click", () => {
    let index = (indiceAtual === 0) ? dispositivos.length - 1 : indiceAtual - 1;
    atualizarCarrossel(index);
  });

  btnProximo.addEventListener("click", () => {
    let index = (indiceAtual === dispositivos.length - 1) ? 0 : indiceAtual + 1;
    atualizarCarrossel(index);
  });
}

/* ==========================================
   LÓGICA DE AGENDAMENTO
   ========================================== */
if (pagina === "agendamento") {
  const jaExiste = localStorage.getItem("agendamento");

  if (jaExiste) {
    alert("Você já possui um agendamento ativo. Cancele o atual para criar outro.");
    window.location.href = "detalhes.html";
  }

  const form = document.getElementById("form-agendamento");
  if (form) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const dados = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        dispositivo: document.getElementById("dispositivo").value,
        suporte: document.getElementById("suporte").value,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value,
        descricao: document.getElementById("descricao").value,
        idCaso: gerarIdCaso()
      };

      salvarDados(dados);
      window.location.href = "sucesso.html";
    });
  }
}

/* ==========================================
   LÓGICA DE DETALHES
   ========================================== */
if (pagina === "detalhes") {
  const dados = pegarDados();
  const card = document.getElementById("card-agendamento");
  const vazio = document.getElementById("sem-agendamento");

  if (!dados) {
    if (card) card.style.display = "none";
    if (vazio) vazio.style.display = "block";
  } else {
    if (document.getElementById("nome-cliente")) document.getElementById("nome-cliente").textContent = dados.nome || "Não informado";
    if (document.getElementById("dispositivo-cliente")) document.getElementById("dispositivo-cliente").textContent = dados.dispositivo || "Não informado";
    if (document.getElementById("telefone-cliente")) document.getElementById("telefone-cliente").textContent = "Telefone: " + (dados.telefone || "Não informado");
    if (document.getElementById("email-cliente")) document.getElementById("email-cliente").textContent = "E-mail: " + (dados.email || "Não informado");
    if (document.getElementById("servico-cliente")) document.getElementById("servico-cliente").textContent = dados.suporte || "Não informado";
    if (document.getElementById("id-caso")) document.getElementById("id-caso").textContent = dados.idCaso || "Não informado";
    if (document.getElementById("data-agendamento")) document.getElementById("data-agendamento").textContent = formatarData(dados.data);
    if (document.getElementById("dia-semana")) document.getElementById("dia-semana").textContent = pegarDiaSemana(dados.data);
    if (document.getElementById("horario-agendamento")) document.getElementById("horario-agendamento").textContent = dados.horario || "Não informado";
  }
}

/* ==========================================
   LÓGICA DE CANCELAMENTO
   ========================================== */
if (pagina === "cancelar") {
  const botaoCancelar = document.getElementById("confirmar-cancelamento");
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function () {
      apagarDados();
      window.location.href = "cancelado.html";
    });
  }
}
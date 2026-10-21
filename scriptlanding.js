// =================================================================
// CONFIGURAÇÃO DO LINK DO PROJETO EM FUNCIONAMENTO
// =================================================================
const LINK_DO_PROJETO = "http://rafaela0011.github.io/FloodPathAtualizadoOutubro/";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade do Acordeão FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // 2. Atualização automática dos botões para o link configurado
    const botoesProjeto = document.querySelectorAll('.link-sistema');
    botoesProjeto.forEach(botao => {
        botao.href = LINK_DO_PROJETO;
        botao.target = "_blank";
    });

    // 3. Efeito de revelar ao rolar (Scroll Reveal)
    const reveals = document.querySelectorAll('.feature-card, .step-card, .team-card');
    
    reveals.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealOnScroll.observe(el));

    // 4. Efeito Parallax no Mockup do Celular
    const phoneFrame = document.querySelector('.phone-frame');
    
    document.addEventListener('mousemove', (e) => {
        if (!phoneFrame) return;
        
        const xAxis = (e.clientX - window.innerWidth / 2) / 25; 
        const yAxis = (e.clientY - window.innerHeight / 2) / -25;
        
        phoneFrame.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // 5. Inicia o carrossel automático da maquete
    iniciarCarrosselAutomatico();
});

// =================================================================
// LÓGICA DO CARROSSEL DA MAQUETE (AUTOMÁTICO E MANUAL)
// =================================================================
const imagensMaquete = [
    "inicio.webp",
    "meio.webp",
    "meio2.webp",
    "fim.webp"
];

const descricoesMaquete = [
    {
        titulo: "Início",
        texto: "Preparação da base, modelagem do relevo e delimitação inicial do espaço utilizando massa e materiais base."
    },
    {
        titulo: "Meio",
        texto: "Pintura base inicial, texturização do terreno e demarcação das áreas por onde a água vai passar."
    },
    {
        titulo: "Meio 2",
        texto: "Adição de texturas detalhadas, aplicação de musgos e aprimoramento das cores do rio."
    },
    {
        titulo: "Fim",
        texto: "Finalização da maquete com a cobertura completa de vegetação e acabamentos reais do terreno."
    }
];

let etapaAtual = 0;
let carrosselTimer;
const TEMPO_AUTOMATICO = 5000;

window.irParaEtapa = function(index) {
    etapaAtual = index;
    atualizarCarrossel();
    resetarTimerCarrossel();
};

window.mudarEtapa = function(direcao) {
    etapaAtual += direcao;

    if (etapaAtual >= imagensMaquete.length) {
        etapaAtual = 0;
    } else if (etapaAtual < 0) {
        etapaAtual = imagensMaquete.length - 1;
    }

    atualizarCarrossel();
    resetarTimerCarrossel();
};

function atualizarCarrossel() {
    const imgElement = document.getElementById("maquete-img");
    const dots = document.querySelectorAll(".dot");
    const tituloElement = document.getElementById("maquete-title");
    const descricaoElement = document.getElementById("maquete-description");

    if (!imgElement || !tituloElement || !descricaoElement) return;

    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = imagensMaquete[etapaAtual];
        imgElement.style.opacity = 1;
    }, 200);

    dots.forEach((dot, index) => {
        if (index === etapaAtual) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    const etapaAtualDados = descricoesMaquete[etapaAtual];
    tituloElement.textContent = etapaAtualDados.titulo;
    descricaoElement.textContent = etapaAtualDados.texto;
}

function iniciarCarrosselAutomatico() {
    carrosselTimer = setInterval(() => {
        mudarEtapa(1);
    }, TEMPO_AUTOMATICO);
}

function resetarTimerCarrossel() {
    clearInterval(carrosselTimer);
    iniciarCarrosselAutomatico();
}

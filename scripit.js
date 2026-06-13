// ==========================================================================
// CONFIGURAÇÕES DE DADOS (ARRAY DE OBJETOS PARA MANUTENÇÃO FÁCIL)
// ==========================================================================

const solucoesData = [
    {
        titulo: "Monitoramento de Precisão via Satélite",
        descricao: "Acompanhe a saúde da sua lavoura em tempo real sem sair da sede da fazenda. Identifique pragas, secas e anomalias com imagens atualizadas semanalmente da região de Guarapuava.",
        icone: "fa-satellite"
    },
    {
        titulo: "Análise de Solo Avançada",
        descricao: "Mapeamento completo dos nutrientes do seu solo. Nossa equipe local coleta e gera recomendações exatas de calagem e adubação para atingir o potencial máximo de sacas por hectare.",
        icone: "fa-vial"
    },
    {
        titulo: "Gestão Financeira Safra a Safra",
        descricao: "Um painel visual simples projetado para o produtor rural. Controle custos de maquinário, insumos, diesel e preveja sua margem de lucro real antes mesmo de vender a colheita.",
        icone: "fa-calculators"
    }
];

const faqData = [
    {
        pergunta: "A AgroForte atende apenas grandes propriedades?",
        resposta: "Não. Nossas soluções foram desenhadas tanto para o pequeno produtor familiar quanto para grandes grupos agrícolas de Guarapuava e região Centro-Sul. A interface simples se adapta à sua escala."
    },
    {
        pergunta: "Preciso de internet de alta velocidade na fazenda para usar?",
        resposta: "Não inteiramente. O aplicativo e os relatórios da AgroForte possuem funcionamento offline sincronizado. Você coleta e visualiza os dados em campo e eles sincronizam automaticamente assim que houver conexão."
    },
    {
        pergunta: "Como funciona o suporte técnico local?",
        resposta: "Contamos com agrônomos residentes e base técnica de atendimento físico em Guarapuava. Se precisar de auxílio ou calibragem técnica, nossa equipe vai até a sua propriedade."
    }
];

// ==========================================================================
// INICIALIZAÇÃO E CONTROLE DE ESTADO DA ACESSIBILIDADE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
    renderSolucoesCarousel();
    renderFaqAccordion();
    initCarouselLogic();
});

function initAccessibility() {
    let currentFontSize = 16;
    const rootHtml = document.documentElement;
    
    // Controle de Fonte
    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            rootHtml.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            rootHtml.style.fontSize = `${currentFontSize}px`;
        }
    });

    // Controle de Alto Contraste
    document.getElementById('btn-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
}

// ==========================================================================
// RENDERIZAÇÃO DINÂMICA DE COMPONENTES
// ==========================================================================

function renderSolucoesCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    track.innerHTML = solucoesData.map(item => `
        <div class="carousel-item">
            <div class="text-center">
                <i class="fas ${item.icone} icon" style="font-size: 4rem; color: var(--accent-color); margin-bottom: 1.5rem;"></i>
            </div>
            <div class="carousel-item-content text-center">
                <h3>${item.titulo}</h3>
                <p style="color: var(--text-muted); max-width: 700px; margin: 0 auto;">${item.descricao}</p>
            </div>
        </div>
    `).join('');
}

function renderFaqAccordion() {
    const container = document.getElementById('faq-accordion');
    if (!container) return;

    container.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" data-index="${index}">
                ${item.pergunta}
                <i class="fas fa-chevron-down accordion-icon"></i>
            </button>
            <div class="accordion-content">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');

    initAccordionLogic();
}

// ==========================================================================
// LÓGICA DE COMPORTAMENTO (CARROSSEL E ACORDEÃO)
// ==========================================================================

function initCarouselLogic() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const itemsCount = solucoesData.length;

    function updateCarouselPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemsCount;
        updateCarouselPosition();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemsCount) % itemsCount;
        updateCarouselPosition();
    });
}

function initAccordionLogic() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('active');
            
            // Fecha todos os itens abertos
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-content').style.maxHeight = null;
                el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Se não estava aberto, abre o atual
            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Interceptação simples do form de conversão
const leadForm = document.getElementById('lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado pelo contato! Um especialista agropecuário da nossa equipe de Guarapuava entrará em contato via WhatsApp nas próximas 2 horas.');
        leadForm.reset();
    });
}
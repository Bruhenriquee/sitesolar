document.addEventListener('DOMContentLoaded', () => {
  // Injeta estilos para o menu mobile para garantir consistência e evitar conflitos com style.css
  const style = document.createElement('style');
  style.textContent = `
    #mobile-menu {
      z-index: 40; /* Garante que o menu fique acima do conteúdo, mas abaixo da barra de navegação (z-50) */
      background-color: white !important; /* Garante o fundo branco e evita conflitos */
      transition: max-height 0.35s ease-in-out, opacity 0.3s ease-in-out;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      pointer-events: none; /* Impede interação quando fechado */
    }
    #mobile-menu.is-open {
      max-height: 100vh; /* Valor alto para garantir que todo o conteúdo caiba */
      opacity: 1;
      pointer-events: auto; /* Permite interação quando aberto */
    }
  `;
  document.head.appendChild(style);

  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('x-icon');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  let isMenuOpen = false;

  const setMenuState = (open) => {
    if (!mobileMenu || !menuIcon || !xIcon) return;

    isMenuOpen = open;
    if (isMenuOpen) {
      mobileMenu.classList.add('is-open');
      menuIcon.classList.add('hidden');
      xIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.remove('is-open');
      menuIcon.classList.remove('hidden');
      xIcon.classList.add('hidden');
    }
  };

  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setMenuState(false);
    }
  };

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      setMenuState(!isMenuOpen);
    });
  }

  // Adiciona o evento de clique para todos os botões de navegação com 'data-section-id'
  document.querySelectorAll('button[data-section-id]').forEach(button => {
    button.addEventListener('click', () => {
      const sectionId = button.getAttribute('data-section-id');
      window.scrollToSection(sectionId);
    });
  });

  const openWhatsApp = (message) => {
    const phone = "5511999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Centraliza todos os gatilhos do WhatsApp em um único listener
  document.querySelectorAll('.js-whatsapp-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const message = button.dataset.message || "Olá! Gostaria de saber mais sobre os serviços de energia solar.";
      openWhatsApp(message);
    });
  });

  const servicesData = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-solar-gold"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z"></path></svg>`,
      title: "Instalação Completa",
      description: "Projeto personalizado, instalação profissional e homologação junto à concessionária. Processo completo do orçamento à geração de energia.",
      features: ["Análise técnica gratuita", "Equipamentos de alta qualidade", "Homologação incluída"],
      buttonText: "Solicitar Orçamento",
      buttonClass: "bg-solar-gold text-white hover:bg-solar-gold/90",
      bgClass: "bg-solar-gold/10",
      iconClass: "text-solar-gold",
      targetSection: "contato"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-earth-green"><path d="M12.22 2h-.44C9.76 2 8 3.76 8 6v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-2.24 1.76-4 4-4h.44L9.76 6.22V8h4.48l2.22-4.22H18c2.24 0 4 1.76 4 4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6c0-2.24-1.76-4-4-4zM2 12v6c0 2.24 1.76 4 4 4h12c2.24 0 4-1.76 4-4v-6H2zM12 16h-.01"></path></svg>`,
      title: "Manutenção Preventiva",
      description: "Mantenha seu sistema operando com máxima eficiência. Limpeza, inspeção e monitoramento regular para garantir a melhor performance.",
      features: ["Limpeza especializada", "Monitoramento remoto", "Relatórios de performance"],
      buttonText: "Agendar Manutenção",
      buttonClass: "bg-earth-green text-white hover:bg-earth-green/90",
      bgClass: "bg-earth-green/10",
      iconClass: "text-earth-green",
      targetSection: "contato"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-sky-blue"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,
      title: "Consultoria Especializada",
      description: "Análise energética completa, dimensionamento otimizado e orientação para maximizar seu retorno sobre investimento em energia solar.",
      features: ["Análise de viabilidade", "Projeto personalizado", "Acompanhamento técnico"],
      buttonText: "Consultar Especialista",
      buttonClass: "bg-sky-blue text-white hover:bg-sky-blue/90",
      bgClass: "bg-sky-blue/10",
      iconClass: "text-sky-blue",
      targetSection: "contato"
    }
  ];

  const renderServices = () => {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;

    servicesContainer.innerHTML = servicesData.map(service => `
      <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in flex flex-col service-card">
        <div class="${service.bgClass} w-16 h-16 rounded-full flex items-center justify-center mb-6">
          ${service.icon}
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-4">${service.title}</h3>
        <p class="text-slate-600 mb-6 leading-relaxed">
          ${service.description}
        </p>
        <ul class="space-y-3 mb-8">
          ${service.features.map(feature => `
            <li class="flex items-center text-sm text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-earth-green mr-3 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${feature}
            </li>
          `).join('')}
        </ul>
        <div class="mt-auto">
          <button 
            data-section-id="${service.targetSection}"
            class="w-full ${service.buttonClass} transition-all duration-300 px-4 py-2 rounded-md font-medium button-modern"
            data-testid="button-${service.buttonText.toLowerCase().replace(/\s+/g, '-')}"
          >
            ${service.buttonText}
          </button>
        </div>
      </div>
    `).join('');
  };

  const projectsData = [
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Residencial - São Paulo",
      description: "Sistema de 6kWp instalado em residência unifamiliar. Economia de 85% na conta de luz.",
      size: "6 kWp",
      year: "2024",
      sizeClass: "bg-solar-gold/10 text-solar-gold"
    },
    {
      image: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Comercial - Rio de Janeiro",
      description: "Sistema de 25kWp para empresa de médio porte. Redução de 90% nos custos energéticos.",
      size: "25 kWp",
      year: "2024",
      sizeClass: "bg-earth-green/10 text-earth-green"
    },
    {
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Residencial - Belo Horizonte",
      description: "Sistema de 10kWp em residência de alto padrão. Energia limpa e design moderno.",
      size: "10 kWp",
      year: "2024",
      sizeClass: "bg-sky-blue/10 text-sky-blue"
    },
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Industrial - Porto Alegre",
      description: "Sistema de 100kWp para indústria. Maior independência energética e sustentabilidade.",
      size: "100 kWp",
      year: "2023",
      sizeClass: "bg-solar-gold/10 text-solar-gold"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Condomínio - Brasília",
      description: "Sistema de 50kWp para condomínio residencial. Economia compartilhada entre moradores.",
      size: "50 kWp",
      year: "2023",
      sizeClass: "bg-earth-green/10 text-earth-green"
    },
    {
      image: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&fm=webp&q=75",
      title: "Rural - Goiânia",
      description: "Sistema de 15kWp para propriedade rural. Energia sustentável para agronegócio.",
      size: "15 kWp",
      year: "2023",
      sizeClass: "bg-sky-blue/10 text-sky-blue"
    }
  ];

  const renderProjects = () => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projectsData.map((project, index) => `
      <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-in project-card">
        <img 
          src="${project.image}"
          alt="${project.title}"
          class="w-full h-48 object-cover optimized-image"
          loading="lazy"
          decoding="async"
        />
        <div class="p-8">
          <h3 class="text-xl font-bold text-slate-900 mb-2">${project.title}</h3>
          <p class="text-slate-600 mb-4">${project.description}</p>
          <div class="grid grid-cols-2 gap-4 text-sm mt-6">
            <div class="bg-slate-50 rounded-lg p-3">
              <div class="text-xs text-slate-500 mb-1">Potência</div>
              <div class="font-semibold ${project.sizeClass.replace('bg-', 'text-').replace('/10', '/100')}" data-testid="project-size-${index}">
                ${project.size}
              </div>
            </div>
            <div class="bg-slate-50 rounded-lg p-3">
              <div class="text-xs text-slate-500 mb-1">Ano</div>
              <div class="font-semibold text-slate-700">${project.year}</div>
            </div>
          </div>
          <div class="mt-4 px-3 py-2 bg-slate-100 rounded-lg">
            <div class="text-xs text-slate-500 mb-1">Tipo de Instalação</div>
            <div class="font-medium text-slate-700">
              ${project.title.includes('Residencial') ? 'Residencial Unifamiliar' : 
               project.title.includes('Comercial') ? 'Empresarial Comercial' :
               project.title.includes('Industrial') ? 'Industrial de Grande Porte' :
               project.title.includes('Condomínio') ? 'Condomínio Residencial' :
               project.title.includes('Rural') ? 'Propriedade Rural' : 'Sistema Fotovoltaico'}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  };

  const advantagesData = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 text-solar-gold"><path d="M12 2H2v10l9 9 10-10c.6-.6 1.1-1.3 1.4-2.1l-.1-.1a2.03 2.03 0 1 0-2.87-2.87l-.1-.1a5.49 5.49 0 0 0-2.1 1.4z"></path><path d="M2 7h2v2H2zM2 13h2v2H2zM2 19h2v2H2zM8 3h2v2H8zM14 3h2v2h-2zM20 3h2v2h-2zM8 21h2v2H8zM14 21h2v2h-2z"></path></svg>`,
      title: "Economia Imediata",
      description: "Reduza sua conta de luz em até 95% já no primeiro mês. A energia que você gera é consumida diretamente em sua residência ou empresa.",
      value: "R$ 180",
      valueDescription: "economia média mensal",
      bgClass: "bg-solar-gold/5 hover:bg-solar-gold/10",
      iconBgClass: "bg-solar-gold/20",
      iconClass: "text-solar-gold",
      valueClass: "text-solar-gold"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 text-earth-green"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M18 10L12 4L6 10"></path><path d="M2 12l10-10l10 10"></path></svg>`,
      title: "Sustentabilidade",
      description: "Contribua para um planeta mais limpo. Cada sistema solar evita a emissão de toneladas de CO2 na atmosfera ao longo de sua vida útil.",
      value: "-2.5t",
      valueDescription: "CO2 evitado por ano",
      bgClass: "bg-earth-green/5 hover:bg-earth-green/10",
      iconBgClass: "bg-earth-green/20",
      iconClass: "text-earth-green",
      valueClass: "text-earth-green"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 text-sky-blue"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      title: "Retorno Garantido",
      description: "Investimento com retorno garantido em 3-5 anos. Após esse período, você terá mais 20 anos de energia praticamente gratuita.",
      value: "4 anos",
      valueDescription: "tempo de retorno médio",
      bgClass: "bg-sky-blue/5 hover:bg-sky-blue/10",
      iconBgClass: "bg-sky-blue/20",
      iconClass: "text-sky-blue",
      valueClass: "text-sky-blue"
    }
  ];

  const renderAdvantages = () => {
    const advantagesContainer = document.getElementById('advantages-container');
    if (!advantagesContainer) return;

    advantagesContainer.innerHTML = advantagesData.map((advantage, index) => `
      <div class="text-center p-8 rounded-2xl transition-all duration-300 fade-in ${advantage.bgClass} advantage-card">
        <div class="${advantage.iconBgClass} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          ${advantage.icon}
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-4">${advantage.title}</h3>
        <p class="text-slate-600 leading-relaxed mb-6 flex-grow">
          ${advantage.description}
        </p>
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <div class="text-3xl font-bold mb-1 ${advantage.valueClass}" data-testid="advantage-value-${index}">
            ${advantage.value}
          </div>
          <div class="text-sm text-slate-500">${advantage.valueDescription}</div>
        </div>
      </div>
    `).join('');
  };

  const faqData = [
    {
      question: "Qual a garantia dos painéis e do serviço?",
      answer:
        "Oferecemos uma garantia de performance de 25 anos para os painéis solares e uma garantia de 12 anos contra defeitos de fabricação. Nosso serviço de instalação tem garantia de 5 anos, cobrindo qualquer problema relacionado à montagem e conexão do sistema.",
    },
    {
      question: "A instalação faz muita sujeira ou barulho?",
      answer:
        "Nossa equipe é treinada para trabalhar de forma limpa e organizada. A maior parte do trabalho é feita no telhado e no local do inversor. O barulho é mínimo, geralmente restrito ao uso de ferramentas para fixação das estruturas, e sempre buscamos minimizar qualquer incômodo.",
    },
    {
      question: "Como funciona a manutenção do sistema solar?",
      answer:
        "A manutenção é simples. Recomendamos uma limpeza anual dos painéis para remover poeira e detritos, garantindo a máxima eficiência. Além disso, oferecemos planos de manutenção preventiva que incluem inspeções técnicas completas do sistema e dos componentes.",
    },
    {
      question: "Posso financiar o projeto de energia solar?",
      answer:
        "Sim! Temos parceria com diversas instituições financeiras que oferecem linhas de crédito específicas para energia solar, com taxas de juros atrativas e prazos de pagamento flexíveis. Muitas vezes, o valor da parcela do financiamento é menor do que a economia que você terá na conta de luz.",
    },
    {
      question: "O que acontece se eu gerar mais energia do que consumo?",
      answer:
        "A energia excedente que seu sistema produz é injetada na rede da concessionária local, gerando 'créditos de energia'. Esses créditos são usados para abater o seu consumo nos meses em que você gerar menos energia do que consome, como em períodos mais chuvosos ou durante a noite. Os créditos têm validade de 60 meses.",
    },
    {
      question: "O sistema funciona em dias nublados ou chuvosos?",
      answer:
        "Sim, o sistema continua gerando energia mesmo em dias nublados, embora com uma produção menor. Os painéis solares captam a luminosidade, não apenas a luz solar direta. A chuva, inclusive, ajuda a manter os painéis limpos, o que é benéfico para a performance.",
    },
  ];

  const renderFaq = () => {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;

    faqContainer.innerHTML = faqData.map((item, index) => `
      <div class="border-b border-slate-200 bg-slate-50/50 rounded-xl px-6 transition-all hover:bg-slate-100/70">
        <button class="flex items-center justify-between w-full text-left font-semibold text-lg text-slate-800 py-4 group focus:outline-none" aria-expanded="false" aria-controls="faq-content-${index}" data-faq-trigger="${index}">
          <span class="flex-1">${item.question}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0 text-solar-gold transition-transform duration-200 group-[data-state=open]:hidden"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0 text-solar-gold transition-transform duration-200 group-[data-state=closed]:hidden hidden"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div id="faq-content-${index}" class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0px;">
          <p class="text-slate-600 leading-relaxed pb-6 pr-8">${item.answer}</p>
        </div>
      </div>
    `).join('');

    faqContainer.querySelectorAll('[data-faq-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const contentId = `faq-content-${trigger.dataset.faqTrigger}`;
        const content = document.getElementById(contentId);
        const parentDiv = trigger.closest('div');
        const plusIcon = trigger.querySelector('svg:first-of-type');
        const minusIcon = trigger.querySelector('svg:last-of-type');

        if (content && parentDiv && plusIcon && minusIcon) {
          if (parentDiv.dataset.state === 'open') {
            parentDiv.dataset.state = 'closed';
            content.style.maxHeight = '0px';
            plusIcon.classList.remove('hidden');
            minusIcon.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
          } else {
            faqContainer.querySelectorAll('[data-faq-trigger]').forEach(otherTrigger => {
              const otherContentId = `faq-content-${otherTrigger.dataset.faqTrigger}`;
              const otherContent = document.getElementById(otherContentId);
              const otherParentDiv = otherTrigger.closest('div');
              const otherPlusIcon = otherTrigger.querySelector('svg:first-of-type');
              const otherMinusIcon = otherTrigger.querySelector('svg:last-of-type');

              if (otherContent && otherParentDiv && otherPlusIcon && otherMinusIcon && otherParentDiv.dataset.state === 'open') {
                otherParentDiv.dataset.state = 'closed';
                otherContent.style.maxHeight = '0px';
                otherPlusIcon.classList.remove('hidden');
                otherMinusIcon.classList.add('hidden');
                otherTrigger.setAttribute('aria-expanded', 'false');
              }
            });

            parentDiv.dataset.state = 'open';
            content.style.maxHeight = content.scrollHeight + 'px';
            plusIcon.classList.add('hidden');
            minusIcon.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  };

  const calculatorForm = document.getElementById('calculator-form');
  const monthlyBillInput = document.getElementById('monthlyBill');
  const propertyTypeSelect = document.getElementById('propertyType');
  const roofAreaInput = document.getElementById('roofArea');
  const locationSelect = document.getElementById('location');
  const calculateSavingsButton = document.getElementById('calculate-savings-button');
  const calculatorResultsDiv = document.getElementById('calculator-results');
  
  // --- CONFIGURAÇÃO DA API (OPCIONAL) ---
  const calculatorApiConfig = {
    // Para usar a API do NREL (mais precisa), mude para 'true'. Para usar a estimativa manual (HSP), mude para 'false'.
    useApi: true, 
    // Cole aqui a sua chave de API gratuita obtida em: https://developer.nrel.gov/signup/
    apiKey: "Uq9HgdkTjbqLglrCtzdsEOx2gNBCs3eOyASSFgU1", 
  };

  // Objeto de configuração para as taxas da calculadora.
  // ATUALIZE OS VALORES AQUI para manter a calculadora precisa.
  const calculatorConfig = {
    areaPerKwp: 7, // Média de metros quadrados (m²) necessários para instalar 1 kWp de painéis solares.
    systemLifespanYears: 25, // Vida útil do sistema em anos.
    rates: {
      // Valores padrão caso o estado não esteja na lista.
      default: {
        savingsPercentage: 0.9,
        kwhPrice: 0.85,           // Preço médio do kWh em R$.
        hsp: 4.5,                 // Média de Horas de Sol Pleno (HSP) por dia.
        costPerKwp: 6000,         // Custo estimado em R$ por kWp instalado.
        lat: -15.78,              // Latitude padrão (Brasília)
        lon: -47.92               // Longitude padrão (Brasília)
      },
      // Taxas e coordenadas específicas por estado (valores ilustrativos, ajuste conforme a realidade).
      sp: { savingsPercentage: 0.9, kwhPrice: 0.92, hsp: 4.6, costPerKwp: 5900, lat: -23.55, lon: -46.63 },
      rj: { savingsPercentage: 0.92, kwhPrice: 0.98, hsp: 4.8, costPerKwp: 6100, lat: -22.90, lon: -43.17 },
      mg: { savingsPercentage: 0.9, kwhPrice: 0.88, hsp: 5.2, costPerKwp: 5800, lat: -19.92, lon: -43.93 },
      ba: { savingsPercentage: 0.95, kwhPrice: 0.85, hsp: 5.5, costPerKwp: 5700, lat: -12.97, lon: -38.50 },
      pr: { savingsPercentage: 0.88, kwhPrice: 0.80, hsp: 4.4, costPerKwp: 6200, lat: -25.42, lon: -49.27 },
      rs: { savingsPercentage: 0.85, kwhPrice: 0.78, hsp: 4.2, costPerKwp: 6300, lat: -30.03, lon: -51.23 },
      go: { savingsPercentage: 0.93, kwhPrice: 0.86, hsp: 5.3, costPerKwp: 5850, lat: -16.68, lon: -49.26 },
      df: { savingsPercentage: 0.93, kwhPrice: 0.86, hsp: 5.3, costPerKwp: 5850, lat: -15.78, lon: -47.92 }
    }
  };


  // Objeto com resultados padrão para serem exibidos antes do primeiro cálculo.
  // Garante que a seção de resultados não fique vazia ao carregar a página.
  const defaultCalculationResults = {
    monthlySavings: 315,
    systemSize: 6.5,
    paybackTime: 4.2,
    investment: 39900,
    totalSavings: 189000,
  };

  // Variável que armazena os resultados do cálculo atual.
  // Inicia com os valores padrão e é atualizada após cada cálculo.
  let currentCalculatorResults = { ...defaultCalculationResults };

  // Array de configuração para renderizar os cards de resultado de forma dinâmica.
  // Cada objeto define um card: ícone, texto, como formatar o valor e classes de estilo.
  const resultItemsConfig = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-solar-gold"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      label: "Economia mensal estimada", // Texto descritivo do resultado.
      getValue: (r) => `R$ ${r.monthlySavings.toFixed(0)}`,
      color: "text-solar-gold",
      bg: "bg-solar-gold/10",
      testId: "result-monthly-savings"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-earth-green"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z"></path></svg>`,
      label: "Tamanho do sistema recomendado",
      getValue: (r) => `${r.systemSize.toFixed(1)} kWp`,
      color: "text-earth-green",
      bg: "bg-earth-green/10",
      testId: "result-system-size"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-sky-blue"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      label: "Tempo de retorno do investimento",
      getValue: (r) => `${r.paybackTime.toFixed(1)} anos`,
      color: "text-sky-blue",
      bg: "bg-sky-blue/10",
      testId: "result-payback-time"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-slate-700"><rect x="3" y="6" width="18" height="13" rx="2" ry="2"></rect><line x1="12" y1="12" x2="12" y2="12"></line></svg>`,
      label: "Investimento estimado",
      getValue: (r) => `R$ ${r.investment.toLocaleString('pt-BR')}`,
      color: "text-slate-700",
      bg: "bg-slate-100",
      testId: "result-investment"
    }
  ];

  /**
   * Renderiza os resultados do cálculo na interface do usuário.
   * @param {object} results - O objeto contendo os dados do cálculo (monthlySavings, systemSize, etc.).
   */
  const renderCalculatorResults = (results) => {
    // Verifica se o container de resultados existe no HTML.
    if (!calculatorResultsDiv) return;

    // Gera o HTML para cada card de resultado, iterando sobre o array de configuração.
    calculatorResultsDiv.innerHTML = resultItemsConfig.map((item) => `
      <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
        <div class="${item.bg} p-3 rounded-lg">
          ${item.icon}
        </div>
        <div>
          <div class="text-2xl font-bold ${item.color}" data-testid="${item.testId}">
            ${item.getValue(results)}
          </div>
          <div class="text-sm text-slate-600">${item.label}</div>
        </div>
      </div>
    `).join('') + `
      <!-- Card de resumo final com a economia total em 25 anos -->
      <div class="bg-gradient-to-r from-solar-gold to-earth-green rounded-xl p-6 text-white text-center">
        <div class="flex items-center justify-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 opacity-80"><path d="M20 12V8H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h13.8L20 12z"/><path d="M18.88 17.07l-.93-.93c-.6-.6-.94-1.4-.94-2.2v-2c0-.8.34-1.6.94-2.2l.93-.93c.3-.3.47-.7.47-1.1s-.17-.8-.47-1.1L18.4 5.3c-.3-.3-.7-.47-1.1-.47s-.8.17-1.1.47l-.93.93c-.6.6-.94 1.4-.94 2.2v2c0 .8.34 1.6.94 2.2l.93.93c.3.3.47.7.47 1.1s-.17.8-.47 1.1zM6 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4z"/><path d="M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/></svg>
          <div>
            <div class="text-2xl font-bold" data-testid="result-total-savings">
              R$ ${results.totalSavings.toLocaleString('pt-BR')}
            </div>
            <div class="text-sm opacity-90">Economia total em 25 anos</div>
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Função principal que executa a lógica de cálculo da economia.
   * É chamada quando o usuário clica no botão "Calcular Economia".
   */
  const calculateSavings = async () => {
    // 1. Coleta e converte os valores dos campos do formulário.
    const monthlyBill = parseFloat(monthlyBillInput.value) || 0;
    const propertyType = propertyTypeSelect.value;
    const roofArea = parseFloat(roofAreaInput.value) || 0;
    const location = locationSelect.value; // Captura a sigla do estado (ex: 'sp', 'rj').

    // 2. Validação: Verifica se todos os campos obrigatórios foram preenchidos.
    if (!monthlyBill || !propertyType || !roofArea || !location) {
      console.error('Por favor, preencha todos os campos para calcular sua economia.');
      // Poderia exibir uma mensagem de erro para o usuário aqui.
      return;
    }

    // 3. Seleciona as taxas corretas com base no estado escolhido.
    // Se o estado (location) não for encontrado em `calculatorConfig.rates`, usa as taxas `default`.
    const stateRates = calculatorConfig.rates[location] || calculatorConfig.rates.default;

    // 4. Executa os cálculos com base nos parâmetros realistas.
    // a. Estima o consumo mensal de energia em kWh.
    const monthlyConsumptionKwh = monthlyBill / stateRates.kwhPrice;
    let idealSystemSize;
    let avgMonthlyGenerationPerKwp; // Variável para armazenar a geração por kWp

    // Tenta usar a API se estiver habilitada e a chave for fornecida
    if (calculatorApiConfig.useApi && calculatorApiConfig.apiKey !== "YOUR_NREL_API_KEY") {
      try {
        console.log("Iniciando cálculo com a API PVWatts...");
        const tiltValue = Math.abs(stateRates.lat).toFixed(1);
        const apiUrl = `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=${calculatorApiConfig.apiKey}&lat=${stateRates.lat}&lon=${stateRates.lon}&system_capacity=1&azimuth=180&tilt=${tiltValue}&array_type=1&module_type=0&losses=14&dataset=intl`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.errors ? data.errors.join(', ') : `API Error: ${response.status}`;
          throw new Error(errorMessage);
        }

        if (data.outputs && data.outputs.ac_monthly) {
          const totalAnnualGeneration = data.outputs.ac_monthly.reduce((sum, month) => sum + month, 0);
          avgMonthlyGenerationPerKwp = totalAnnualGeneration / 12;
          idealSystemSize = monthlyConsumptionKwh / avgMonthlyGenerationPerKwp;
        } else {
          throw new Error("Resposta da API inválida.");
        }
      } catch (error) {
        console.warn(`Falha ao usar a API PVWatts: ${error.message}. Usando o cálculo manual com HSP.`);
        avgMonthlyGenerationPerKwp = stateRates.hsp * 30;
        idealSystemSize = monthlyConsumptionKwh / avgMonthlyGenerationPerKwp;
      }
    } else {
      console.log("Iniciando cálculo manual com HSP...");
      avgMonthlyGenerationPerKwp = stateRates.hsp * 30;
      idealSystemSize = monthlyConsumptionKwh / avgMonthlyGenerationPerKwp;
    }

    const maxSystemSizeByArea = roofArea / calculatorConfig.areaPerKwp;

    // d. Lógica de limitação refatorada para ser mais direta e robusta.
    const isLimitedByArea = idealSystemSize > maxSystemSizeByArea;
    let systemSize = idealSystemSize; // Começa com o tamanho ideal

    if (isLimitedByArea) {
      // Se for limitado, sobrescreve o tamanho do sistema com o máximo que a área permite.
      console.warn(`O sistema foi limitado pela área do telhado. Tamanho ideal: ${idealSystemSize.toFixed(1)} kWp, Tamanho máximo pela área: ${maxSystemSizeByArea.toFixed(1)} kWp.`);
      systemSize = maxSystemSizeByArea;
    }

    // e. Cálculos finais baseados no tamanho de sistema realista (systemSize).
    const investment = Math.ceil(systemSize) * stateRates.costPerKwp;
    let monthlySavings = monthlyBill * stateRates.savingsPercentage;

    if (isLimitedByArea) {
      // Se o sistema foi limitado, a economia mensal também deve ser recalculada.
      monthlySavings = (systemSize * avgMonthlyGenerationPerKwp) * stateRates.kwhPrice;
    }

    const paybackYears = (investment > 0 && monthlySavings > 0) ? investment / (monthlySavings * 12) : 0;
    const totalSavings = monthlySavings * 12 * calculatorConfig.systemLifespanYears;

    currentCalculatorResults = {
      monthlySavings,
      systemSize: systemSize,
      paybackTime: paybackYears,
      investment,
      totalSavings,
    };
    
    // 6. Salva os resultados no localStorage do navegador.
    // Isso permite que os resultados persistam se o usuário recarregar a página.
    localStorage.setItem('solarCalculatorResults', JSON.stringify(currentCalculatorResults));
    
    // 7. Chama a função para renderizar os novos resultados na tela.
    renderCalculatorResults(currentCalculatorResults);
  };

  // Adiciona um "ouvinte de evento" ao botão de calcular.
  // Quando o botão é clicado, a função `calculateSavings` é executada.
  if (calculateSavingsButton) {
    calculateSavingsButton.addEventListener('click', calculateSavings);
  }

  // Tenta carregar os resultados do último cálculo salvo no localStorage.
  const cachedResult = localStorage.getItem('solarCalculatorResults');
  if (cachedResult) {
    try {
      const parsedResult = JSON.parse(cachedResult);
      // Validação para garantir que o objeto do cache é válido antes de usá-lo.
      // Isso previne erros se os dados no localStorage estiverem corrompidos, nulos ou incompletos.
      if (parsedResult && typeof parsedResult.monthlySavings === 'number' && typeof parsedResult.totalSavings === 'number') {
        currentCalculatorResults = parsedResult;
      } else {
        // Se os dados forem inválidos, reverte para o padrão e limpa o cache para evitar futuros erros.
        console.warn('Cached calculator results are invalid. Using default values and clearing cache.');
        currentCalculatorResults = { ...defaultCalculationResults };
        localStorage.removeItem('solarCalculatorResults');
      }
    } catch (error) {
      // Se houver um erro na conversão (JSON inválido), usa os resultados padrão e limpa o cache.
      console.error('Error parsing cached results:', error);
      currentCalculatorResults = { ...defaultCalculationResults };
      localStorage.removeItem('solarCalculatorResults');
    }
  }
  // Renderiza os resultados na tela ao carregar a página (sejam os salvos ou os padrão).
  renderCalculatorResults(currentCalculatorResults);

  const countUpElements = document.querySelectorAll('.count-up');

  const startCountAnimation = (entry) => {
    const target = entry.target;
    const endValue = parseInt(target.dataset.target);
    let startValue = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16);

    const updateCount = () => {
      startValue += increment;
      if (startValue < endValue) {
        target.textContent = `${Math.floor(startValue).toLocaleString('pt-BR')}${target.textContent.includes('%') ? '%' : target.textContent.includes('+') ? '+' : ''}`;
        requestAnimationFrame(updateCount);
      } else {
        target.textContent = `${endValue.toLocaleString('pt-BR')}${target.textContent.includes('%') ? '%' : target.textContent.includes('+') ? '+' : ''}`;
      }
    };
    updateCount();
  };

  const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCountAnimation(entry);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  countUpElements.forEach(element => {
    countUpObserver.observe(element);
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section-observer');

  const activateNavLink = (id) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.nav-link[data-section-id="${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  const sectionObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateNavLink(entry.target.id);
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  const initialSection = document.querySelector('section.section-observer:first-of-type');
  if (initialSection) {
    activateNavLink(initialSection.id);
  }

  window.addEventListener('scroll', () => {
    let currentActiveSectionId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentActiveSectionId = section.id;
      }
    });
    if (currentActiveSectionId) {
      activateNavLink(currentActiveSectionId);
    }
  });

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Impede o envio tradicional do formulário

      const form = event.target;
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          window.location.href = 'obrigado.html'; // Redireciona para a página de obrigado
        } else {
          const data = await response.json();
          if (data.errors) {
            console.error(data.errors.map(error => error.message).join(', '));
            alert('Ocorreu um erro ao enviar o formulário: ' + data.errors.map(error => error.message).join(', '));
          } else {
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
          }
        }
      } catch (error) {
        console.error('Erro de rede ou ao enviar o formulário:', error);
        alert('Não foi possível conectar ao servidor. Por favor, verifique sua conexão ou tente novamente mais tarde.');
      }
    });
  }


// Lógica do Modal
const policyModal = document.getElementById('policy-modal');
const closePolicyModalButton = document.getElementById('close-policy-modal');
const policyModalContent = document.getElementById('policy-modal-content');
const policyModalInner = document.getElementById('policy-modal-inner'); // Novo: Referência à div interna

async function openPolicyModal(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o conteúdo: ${response.statusText}`);
        }
        const html = await response.text();
        const contentToLoad = new DOMParser().parseFromString(html, 'text/html').querySelector('.modal-content-container');

        if (contentToLoad) {
            policyModalContent.innerHTML = contentToLoad.innerHTML;
            policyModal.classList.remove('hidden');
            // Forçar reflow para garantir que a transição ocorra
            void policyModal.offsetWidth; 
            policyModal.classList.add('opacity-100');
            policyModalInner.classList.add('opacity-100', 'scale-100');
            policyModalInner.classList.remove('opacity-0', 'scale-95');
            document.body.classList.add('overflow-hidden');
        } else {
            console.error('Container de conteúdo do modal (.modal-content-container) não encontrado no arquivo:', url);
            alert('Erro: Conteúdo do modal não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo do modal:', error);
        alert('Erro ao carregar os termos. Tente novamente.');
    }
}

function closePolicyModal() {
    policyModal.classList.remove('opacity-100');
    policyModalInner.classList.remove('opacity-100', 'scale-100');
    policyModalInner.classList.add('opacity-0', 'scale-95');

    document.body.classList.remove('overflow-hidden');

    // Espera a transição terminar antes de esconder completamente
    policyModal.addEventListener('transitionend', () => {
        policyModal.classList.add('hidden');
        policyModalContent.innerHTML = ''; // Limpar conteúdo
    }, { once: true });
}

// Event Listeners para os links que abrem o modal
document.querySelectorAll('a[data-modal-target]').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link
        const targetFile = link.getAttribute('data-modal-target');
        if (targetFile) {
            openPolicyModal(targetFile);
        } else {
            console.error('Link de modal sem atributo data-modal-target:', link);
        }
    });
});

// Event Listener para fechar o modal
if (closePolicyModalButton) {
    closePolicyModalButton.addEventListener('click', closePolicyModal);
}

// Fechar modal clicando fora do conteúdo (opcional, mas bom para UX)
if (policyModal) {
    policyModal.addEventListener('click', (event) => {
        if (event.target === policyModal) {
            closePolicyModal();
        }
    });
}

  // Lógica do botão "Voltar ao Topo"
  const backToTopButton = document.getElementById('back-to-top-button');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        backToTopButton.classList.add('opacity-100');
      } else {
        backToTopButton.classList.add('opacity-0', 'pointer-events-none');
        backToTopButton.classList.remove('opacity-100');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Renderiza todo o conteúdo dinâmico no final para garantir que todos os scripts e listeners estejam configurados.
  renderServices();
  renderProjects();
  renderAdvantages();
  renderFaq();

  // Configura a animação de fade-in APÓS o conteúdo ter sido renderizado.
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

});

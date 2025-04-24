// Script para interatividade e efeitos de IA no estilo Langflow

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de animações AOS (Animate On Scroll)
    initAOS();
    
    // Efeitos do header
    initHeaderEffects();
    
    // Interatividade para os cards de serviço
    initServiceCards();
    
    // Efeitos de partículas e elementos AI
    initAIEffects();
    
    // Menu mobile
    initMobileMenu();
});

// Função para inicializar AOS
function initAOS() {
    // Simulando biblioteca AOS para animações de scroll
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Função para verificar se um elemento é visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.75) &&
            rect.bottom >= 0 &&
            rect.left <= window.innerWidth &&
            rect.right >= 0
        );
    }
    
    // Função para animar elementos quando visíveis
    function checkVisibility() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    // Adiciona classe inicial para preparar animação
    animatedElements.forEach(element => {
        const animation = element.getAttribute('data-aos');
        element.classList.add(`aos-${animation}`);
    });
    
    // Verifica visibilidade no carregamento e scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Função para efeitos do header
function initHeaderEffects() {
    const header = document.querySelector('.header-ai');
    const scrollThreshold = 50;
    
    if (header) {
        // Função para atualizar classe do header no scroll
        function updateHeaderOnScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Inicializa e adiciona listener de scroll
        updateHeaderOnScroll();
        window.addEventListener('scroll', updateHeaderOnScroll);
        
        // Efeito de hover nos links do dropdown
        const dropdownItems = document.querySelectorAll('.dropdown');
        
        dropdownItems.forEach(item => {
            const dropdownMenu = item.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                item.addEventListener('mouseenter', () => {
                    // Adiciona delay para simular efeito de cascata nos links
                    const links = dropdownMenu.querySelectorAll('.dropdown-link');
                    links.forEach((link, index) => {
                        link.style.transitionDelay = `${index * 50}ms`;
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    // Remove delay ao sair
                    const links = dropdownMenu.querySelectorAll('.dropdown-link');
                    links.forEach(link => {
                        link.style.transitionDelay = '';
                    });
                });
            }
        });
    }
}

// Função para interatividade dos cards de serviço
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Efeito hover nos cards
        card.addEventListener('mouseenter', () => {
            // Anima a linha de progresso
            const progressLine = card.querySelector('.progress-line');
            if (progressLine) {
                progressLine.style.width = '100%';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reseta a linha de progresso
            const progressLine = card.querySelector('.progress-line');
            if (progressLine) {
                progressLine.style.width = '0';
            }
        });
    });
}

// Função para efeitos de AI
function initAIEffects() {
    // Criar partículas dinâmicas no hero e serviços
    createParticles('.ai-overlay', 15);
    createParticles('.ai-elements', 10);
    
    // Adiciona efeito de mouse follow nas partículas
    addMouseFollowEffect();
}

// Função para criar partículas dinâmicas
function createParticles(containerSelector, count) {
    const container = document.querySelector(containerSelector);
    
    if (!container) return;
    
    // Cria um novo div para as partículas dinâmicas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'dynamic-particles';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    container.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        
        // Propriedades aleatórias
        const size = Math.random() * 4 + 2; // 2-6px
        const posX = Math.random() * 100; // 0-100%
        const posY = Math.random() * 100; // 0-100%
        const duration = Math.random() * 20 + 10; // 10-30s
        const delay = Math.random() * 5; // 0-5s
        
        // Estilo da partícula
        particle.className = 'dynamic-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.borderRadius = '50%';
        
        // Cor aleatória entre primary e accent
        const colors = [
            'rgba(0, 71, 171, 0.2)', // primary
            'rgba(79, 149, 255, 0.15)', // primary light
            'rgba(123, 97, 255, 0.2)' // accent
        ];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animação
        particle.style.animation = `floatParticle ${duration}s infinite ease-in-out ${delay}s`;
        
        // Adiciona ao container
        particlesContainer.appendChild(particle);
    }
    
    // Adiciona keyframe de animação se ainda não existir
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(50px, 25px);
                }
                50% {
                    transform: translate(10px, -30px);
                }
                75% {
                    transform: translate(-30px, 10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efeito de partículas seguindo o cursor
function addMouseFollowEffect() {
    const heroSection = document.querySelector('.hero-ai');
    const servicesSection = document.querySelector('.services-ai');
    
    if (!heroSection && !servicesSection) return;
    
    // Cria partícula que segue o mouse
    const mouseParticle = document.createElement('div');
    mouseParticle.className = 'mouse-particle';
    mouseParticle.style.position = 'absolute';
    mouseParticle.style.width = '150px';
    mouseParticle.style.height = '150px';
    mouseParticle.style.borderRadius = '50%';
    mouseParticle.style.background = 'radial-gradient(circle, rgba(123, 97, 255, 0.1) 0%, rgba(123, 97, 255, 0) 70%)';
    mouseParticle.style.transform = 'translate(-50%, -50%)';
    mouseParticle.style.pointerEvents = 'none';
    mouseParticle.style.zIndex = '0';
    mouseParticle.style.opacity = '0';
    mouseParticle.style.transition = 'opacity 0.3s ease-out';
    
    document.body.appendChild(mouseParticle);
    
    // Movimento suave com lerp
    let mouseX = 0;
    let mouseY = 0;
    let particleX = 0;
    let particleY = 0;
    
    // Função de animação
    function animateParticle() {
        // Linear interpolation
        particleX += (mouseX - particleX) * 0.1;
        particleY += (mouseY - particleY) * 0.1;
        
        mouseParticle.style.left = `${particleX}px`;
        mouseParticle.style.top = `${particleY}px`;
        
        requestAnimationFrame(animateParticle);
    }
    
    // Inicia animação
    animateParticle();
    
    // Eventos de mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Verifica se o mouse está na seção hero ou services
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const servicesRect = servicesSection ? servicesSection.getBoundingClientRect() : null;
        
        const isInHero = heroRect && 
            e.clientY >= heroRect.top && 
            e.clientY <= heroRect.bottom;
            
        const isInServices = servicesRect && 
            e.clientY >= servicesRect.top && 
            e.clientY <= servicesRect.bottom;
        
        if (isInHero || isInServices) {
            mouseParticle.style.opacity = '1';
        } else {
            mouseParticle.style.opacity = '0';
        }
    });
    
    // Esconde partícula quando o mouse sai da janela
    document.addEventListener('mouseout', () => {
        mouseParticle.style.opacity = '0';
    });
}

// Função para menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (menuToggle && menuClose && mobileMenu) {
        // Abrir menu
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            body.style.overflow = 'hidden'; // Previne scroll
        });
        
        // Fechar menu
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = ''; // Restaura scroll
        });
        
        // Toggle para acordeões no menu mobile
        const accordionToggles = document.querySelectorAll('.accordion-toggle');
        
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const parent = toggle.closest('.accordion');
                parent.classList.toggle('active');
            });
        });
    }
}

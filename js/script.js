// Aguarda o carregamento completo do documento
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
        });
    });
    
    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Adiciona classe de animação aos elementos quando eles entram na viewport
    const animatedElements = document.querySelectorAll('.section-header, .service-card, .about-metrics, .testimonial-card, .blog-card');
    
    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    };
    
    // Executa animação no carregamento inicial e durante o scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Header fixo com mudança de cor ao rolar
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navegação suave para os links de âncora
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuIcon.classList.remove('active');
                }
                
                // Calcula a posição levando em conta o header fixo
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adiciona delay aos itens do menu para efeito de cascata no hover
    const navItems = document.querySelectorAll('.nav-list li');
    
    navItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Adiciona contador para as métricas na seção Sobre
    const metrics = document.querySelectorAll('.metric .number');
    let counted = false;
    
    const countUp = () => {
        metrics.forEach(metric => {
            const target = parseInt(metric.textContent);
            const suffix = metric.textContent.includes('+') ? '+' : '';
            let count = 0;
            const duration = 2000; // 2 segundos
            const increment = Math.ceil(target / (duration / 30)); // 30fps
            
            const timer = setInterval(() => {
                count += increment;
                
                if (count >= target) {
                    metric.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    metric.textContent = count + suffix;
                }
            }, 30);
        });
    };
    
    // Inicia o contador quando a seção entrar na viewport
    const metricsSection = document.querySelector('.about-metrics');
    
    if (metricsSection) {
        window.addEventListener('scroll', () => {
            const metricsSectionPosition = metricsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (!counted && metricsSectionPosition < windowHeight - 100) {
                countUp();
                counted = true;
            }
        });
    }
});

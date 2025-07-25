// Carousel functionality
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        this.updateSlides();
        this.startAutoSlide();
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
            heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 3000); //valor 3000 representa o intervalo em milissegundos. 3000 ms = 3 segundos.
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Clients Carousel
class ClientsCarousel {
    constructor() {
        this.track = document.querySelector('.clients-carousel-track');
        this.slides = document.querySelectorAll('.client-logo-slide');
        this.prevBtn = document.querySelector('.clients-carousel-btn.prev');
        this.nextBtn = document.querySelector('.clients-carousel-btn.next');
        this.currentIndex = 0;
        this.slidesToShow = this.getSlidesToShow();
        
        if (this.track && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
        window.addEventListener('resize', () => {
            this.slidesToShow = this.getSlidesToShow();
            this.updateCarousel();
        });
    }
    
    getSlidesToShow() {
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    updateCarousel() {
        const slideWidth = this.slides[0].offsetWidth + 32; // width + gap
        const translateX = -this.currentIndex * slideWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.slides.length - this.slidesToShow;
    }
    
    nextSlide() {
        if (this.currentIndex < this.slides.length - this.slidesToShow) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
}

// Counter animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.isAnimated = false;
        this.init();
    }
    
    init() {
        this.observeCounters();
    }
    
    observeCounters() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateCounters();
                    this.isAnimated = true;
                    entry.target.parentElement.classList.add('animate');
                }
            });
        }, options);
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('pt-BR');
                }
            };
            
            counter.parentElement.classList.add('animate');
            updateCounter();
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll, .service-card, .step, .testimonial');
        this.init();
    }
    
    init() {
        this.addAnimationClasses();
        this.observeElements();
    }
    
    addAnimationClasses() {
        this.animatedElements.forEach(element => {
            if (!element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
            }
        });
    }
    
    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, options);
        
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Mobile navigation
class MobileNavigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Header scroll effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
}

// Form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            // LÓGICA DE ENVIO PARA WHATSAPP ADICIONADA AQUI
            const formData = new FormData(this.form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            const message = `
*Nova Solicitação de Contato - Mauá Tecnologia*

Olá! Tenho interesse nos serviços da Mauá Tecnologia:

*• Nome:* ${data.nome || 'Não informado'}
*• Empresa:* ${data.empresa || 'Não informada'}
*• E-mail:* ${data.email || 'Não informado'}
*• Telefone:* ${data.telefone || 'Não informado'}
*• Serviço de Interesse:* ${data.servico || 'Não informado'}

*• Mensagem:*
${data.mensagem || 'Nenhuma mensagem adicional.'}

Aguardamos seu contato!
            `.trim();
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5581996912827?text=${encodedMessage}`; // <<-- ATENÇÃO: AJUSTE ESTE NÚMERO DE WHATSAPP
            
            // Abre o WhatsApp
            const newWindow = window.open(whatsappUrl, '_blank');
            
            // Tenta detectar se o pop-up foi bloqueado
            if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                this.showNotification('Seu navegador bloqueou o pop-up do WhatsApp. Por favor, permita-o e tente novamente.', 'error');
            } else {
                this.showNotification('Sua solicitação foi enviada! Você será redirecionado(a) para o WhatsApp.', 'success');
                this.form.reset(); // Reseta o formulário apenas se o WhatsApp abriu
            }
            // FIM DA LÓGICA DE WHATSAPP
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error styling
        this.clearErrors(field);
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Digite um e-mail válido');
            isValid = false;
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.style.borderColor = '#dc2626';
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#dc2626';
            errorElement.style.fontSize = '14px';
            errorElement.style.marginTop = '4px';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    clearErrors(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // showSuccessMessage foi renomeada para showNotification e agora aceita tipo de mensagem
    showNotification(message, type = 'success') { // Adicionado 'type' padrão 'success'
        const notificationDiv = document.createElement('div');
        notificationDiv.className = `notification-message ${type}`; // Adiciona classe para estilo CSS
        notificationDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#10b981' : '#dc2626'}; /* Cor para sucesso ou erro */
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
        `;
        notificationDiv.textContent = message;
        
        document.body.appendChild(notificationDiv);
        
        setTimeout(() => {
            notificationDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notificationDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificationDiv.parentNode) {
                    document.body.removeChild(notificationDiv);
                }
            }, 300);
        }, 8000); // Exibir por 8 segundos
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Lazy loading for images
class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observeImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }
    
    observeImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => imageObserver.observe(img));
    }
    
    loadImage(img) {
        img.style.transition = 'opacity 0.3s ease';
        
        
        img.onload = () => {
            img.style.opacity = '1';
        };
        
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    }
    
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor Core Web Vitals
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
    }
    
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
    
    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        }
    }
    
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let cumulativeLayoutShift = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        cumulativeLayoutShift += entry.value;
                    }
                });
                console.log('CLS:', cumulativeLayoutShift);
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    new ClientsCarousel();
    new CounterAnimation();
    new ScrollAnimations();
    new MobileNavigation();
    new HeaderScrollEffect();
    new ContactForm();
    new SmoothScroll();
    new LazyLoading();
    
    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new PerformanceMonitor();
    }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    const carousel = document.querySelector('.hero');
    if (carousel) {
        if (document.hidden) {
            // Pause animations when tab is not visible
            carousel.style.animationPlayState = 'paused';
        } else {
            // Resume animations when tab becomes visible
            carousel.style.animationPlayState = 'running';
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Arrow keys for carousel navigation when focused
    const heroSection = document.querySelector('.hero');
    const clientsCarousel = document.querySelector('.clients-carousel');
    if (clientsCarousel && (document.activeElement === clientsCarousel || clientsCarousel.contains(document.activeElement))) {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.clients-carousel-btn.prev').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.clients-carousel-btn.next').click();
        }
    }
});

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
        'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    });
}
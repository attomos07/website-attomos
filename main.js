// Main JavaScript - Optimizado y simplificado para Go/Gin

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ChatBot Hub cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initNavbar();
    initPlatformAnimations();
    initFAQ();
    initPricingAnimations();
    initVideoControls();
    
    console.log('✅ Todas las funcionalidades inicializadas');
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
function initNavbar() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Active link management
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo prevenir default si es un enlace con #
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mobileMenuBtn?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && mobileMenuBtn && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Set active link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Default to home if no match
    if (currentPath === '/' || currentPath === '') {
        const homeLink = document.querySelector('.nav-link[href="/"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// ============================================
// PLATFORM ANIMATIONS
// ============================================
function initPlatformAnimations() {
    const platformBlocks = document.querySelectorAll('.platform-block');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    platformBlocks.forEach(block => {
        observer.observe(block);
    });
}

// ============================================
// FAQ FUNCTIONALITY
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los otros FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle el item actual
                item.classList.toggle('active');
            });
        }
    });
}

// ============================================
// PRICING ANIMATIONS
// ============================================
function initPricingAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    const faqElements = document.querySelectorAll('.faq-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    pricingCards.forEach(card => {
        animationObserver.observe(card);
    });
    
    faqElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ============================================
// VIDEO CONTROLS
// ============================================
function initVideoControls() {
    const allVideos = document.querySelectorAll('video');
    
    // Intersection Observer para videos (pausar cuando no están visibles)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Error playing video:', e));
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.1
    });

    allVideos.forEach(video => {
        videoObserver.observe(video);
        
        // Asegurar que el video esté listo
        video.addEventListener('loadeddata', () => {
            if (video.getBoundingClientRect().top < window.innerHeight) {
                video.play().catch(e => console.log('Error playing video:', e));
            }
        });
        
        // Manejar errores de video
        video.addEventListener('error', (e) => {
            console.log('Error cargando video:', e);
            // Ocultar el video si hay error
            video.style.display = 'none';
        });

        // Configuración adicional para mejor rendimiento
        video.setAttribute('preload', 'metadata');
        video.setAttribute('playsinline', 'true');
    });
}

// ============================================
// WHATSAPP FUNCTIONALITY
// ============================================
function openWhatsApp() {
    const phoneNumber = '5491234567890'; // Cambiar por tu número de WhatsApp
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus chatbots. ¿Pueden ayudarme?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// ============================================
// SOCIAL INTERACTIONS
// ============================================
// Social links hover effects para footer
document.addEventListener('DOMContentLoaded', function() {
    // Footer social links
    document.querySelectorAll('.footer .social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Footer links interaction
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            this.style.transform = 'translateX(10px) scale(1.05)';
            this.style.color = '#67e8f9';
            
            setTimeout(() => {
                this.style.transform = 'translateX(0) scale(1)';
            }, 200);
        });
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Optimización de carga inicial
window.addEventListener('load', () => {
    // Reproducir videos visibles después de que la página cargue completamente
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play().catch(e => console.log('Error playing video on load:', e));
        }
    });
});

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    img.style.display = 'none';
    console.log('Error cargando imagen:', img.src);
}

// Función para lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para eventos frecuentes
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Aplicar optimizaciones a eventos de scroll si es necesario
const optimizedScrollHandler = throttle(() => {
    // Código de scroll optimizado aquí si es necesario
}, 100);

// Export functions if needed (for module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openWhatsApp,
        debounce,
        throttle
    };
}
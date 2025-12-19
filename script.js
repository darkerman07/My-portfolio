// DarkerMan Creative Studio JavaScript

document.addEventListener('DOMContentLoaded', function() {


    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add your contact functionality here
            alert('Contact form would open here. Let\'s build something remarkable together!');
        });
    }

    // Portfolio image hover effects
    const portfolioImages = document.querySelectorAll('.portfolio-grid img');
    portfolioImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(0.8)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });


    // Scroll animation for .reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Background color change on scroll
    const sections = document.querySelectorAll('section[data-bg]');
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newBg = entry.target.dataset.bg;
                document.body.style.backgroundColor = newBg;
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        bgObserver.observe(section);
    });

    // Dynamic hero headline effect
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        const text = heroHeadline.textContent;
        heroHeadline.textContent = '';
        
        // Typewriter effect for the headline
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroHeadline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typewriter effect after a brief delay
        setTimeout(typeWriter, 1000);
    }


    // Add parallax effect to hero background (disabled on mobile for performance)
    window.addEventListener('scroll', function() {
        // Only apply parallax on larger screens for performance
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });

    // Mobile viewport height fix for better mobile experience
    function setMobileVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set mobile viewport height on load and resize
    setMobileVH();
    window.addEventListener('resize', setMobileVH);

    // Touch device detection for better mobile interactions
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly interactions for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 150);
            });
        });
    }

    // Optimize animations for mobile devices
    if (window.innerWidth <= 768) {
        // Reduce or disable heavy animations on mobile
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .hero-bg::before,
            .touch-device .hero-bg::after {
                animation: none !important;
            }
            
            .touch-device .portfolio-item:hover {
                transform: none !important;
            }
            
            .touch-device .portfolio-item.touch-hover {
                transform: translateY(-5px) !important;
            }
        `;
        document.head.appendChild(style);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // we'll actually keep it slightly tinted, or remove it for total transparency at top
            if (window.scrollY < 50) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 2. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Custom Glow Cursor Effect
    const cursorGlow = document.getElementById('cursor-glow');
    
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        // Expand glow on interactive elements
        const interactives = document.querySelectorAll('a, button, .product-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '800px';
                cursorGlow.style.height = '800px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '600px';
                cursorGlow.style.height = '600px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)';
            });
        });
    } else {
        cursorGlow.style.display = 'none';
    }
});

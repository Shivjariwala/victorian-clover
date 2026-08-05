const products = [
    { id: 1, name: "Elegant Tote Bag", category: "tote", price: "₹1,299", badge: "Bestseller", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.21.59 PM12.jpeg" },
    { id: 2, name: "Classic Handbag", category: "handbag", price: "₹999", badge: "New", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.21.59 PM13.jpeg" },
    { id: 3, name: "Premium Clutch", category: "clutch", price: "₹799", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.21.59 PM14.jpeg" },
    { id: 4, name: "Boho Tote", category: "tote", price: "₹1,499", badge: "Popular", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM5.jpeg" },
    { id: 5, name: "Designer Handbag", category: "handbag", price: "₹1,199", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM6.jpeg" },
    { id: 6, name: "Silk Evening Clutch", category: "clutch", price: "₹899", badge: "Limited", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM7.jpeg" },
    { id: 7, name: "Canvas Tote Bag", category: "tote", price: "₹1,099", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM8.jpeg" },
    { id: 8, name: "Leather Handbag", category: "handbag", price: "₹1,599", badge: "Premium", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM9.jpeg" },
    { id: 9, name: "Beaded Clutch", category: "clutch", price: "₹699", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM10.jpeg" },
    { id: 10, name: "Stylish Handbag", category: "handbag", price: "₹1,399", badge: "New", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.00 PM11.jpeg" },
    { id: 11, name: "Mini Crossbody", category: "handbag", price: "₹899", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.01 PM.jpeg" },
    { id: 12, name: "Printed Tote", category: "tote", price: "₹1,199", badge: "Trending", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.01 PM1.jpeg" },
    { id: 13, name: "Handwoven Clutch", category: "clutch", price: "₹999", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.01 PM2.jpeg" },
    { id: 14, name: "Quilted Handbag", category: "handbag", price: "₹1,699", badge: "Premium", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.01 PM3.jpeg" },
    { id: 15, name: "Casual Tote", category: "tote", price: "₹949", badge: "", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.01 PM4.jpeg" },
    { id: 16, name: "Signature Purse", category: "handbag", price: "₹1,899", badge: "Exclusive", image: "images/enhanced/WhatsApp Image 2026-08-04 at 6.22.02 PM.jpeg" }
];

const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const contactForm = document.getElementById('contactForm');
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const backToTop = document.getElementById('backToTop');
const stripesCanvas = document.getElementById('stripesCanvas');

let currentLightboxIndex = 0;
let filteredProducts = [...products];

// Preloader
window.addEventListener('load', () => { setTimeout(() => preloader.classList.add('hidden'), 2000); });

// Custom Cursor
let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
(function animCursor() {
    dotX += (mouseX - dotX) * 0.12;
    dotY += (mouseY - dotY) * 0.12;
    if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
    if (cursorDot) { cursorDot.style.left = dotX + 'px'; cursorDot.style.top = dotY + 'px'; }
    requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .product-card, .filter-btn, .social-link, .dot, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
});

// Diagonal Stripes Canvas (ALCHE style)
if (stripesCanvas) {
    const ctx = stripesCanvas.getContext('2d');
    let w, h, scrollOffset = 0;

    function resize() {
        w = stripesCanvas.width = window.innerWidth;
        h = stripesCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawStripes(time) {
        ctx.clearRect(0, 0, w, h);

        const stripeWidth = 4;
        const gap = 110;
        const angle = Math.PI / 4;
        const speed = time * 0.005;
        const totalWidth = stripeWidth + gap;

        const numStripes = Math.ceil((w + h) * 2 / totalWidth) + 20;

        ctx.save();

        for (let i = -numStripes; i < numStripes; i++) {
            const offset = (i * totalWidth + speed) % (totalWidth * 2) - totalWidth;

            ctx.fillStyle = 'rgba(100, 15, 15, 0.025)';

            ctx.beginPath();
            ctx.moveTo(offset, 0);
            ctx.lineTo(offset + h * Math.tan(angle), 0);
            ctx.lineTo(offset + h * Math.tan(angle) - w * Math.tan(angle), h);
            ctx.lineTo(offset - w * Math.tan(angle), h);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();

        requestAnimationFrame(drawStripes);
    }
    requestAnimationFrame(drawStripes);
}

// Navbar scroll
window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Active nav
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    sections.forEach(sec => {
        const top = sec.offsetTop - 100, h = sec.offsetHeight, id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) s > top && s <= top + h ? link.style.opacity = '1' : link.style.opacity = '0.6';
    });
});

// Products
function renderProducts(list) {
    productsGrid.innerHTML = '';
    list.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            <div class="product-card-info">
                <span class="p-category">${p.category}</span>
                <h3>${p.name}</h3>
                <span class="p-price">${p.price}</span>
            </div>`;
        productsGrid.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 80 + i * 60);
    });
    document.querySelectorAll('.product-card').forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));
}

// Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        filteredProducts = f === 'all' ? [...products] : products.filter(p => p.category === f);
        productsGrid.querySelectorAll('.product-card').forEach(c => { c.style.opacity = '0'; c.style.transform = 'scale(0.9) translateY(20px)'; });
        setTimeout(() => renderProducts(filteredProducts), 300);
    });
});

// Lightbox
function openLightbox(i) { currentLightboxIndex = i; lightboxImg.src = filteredProducts[i].image; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.querySelector('.lightbox-prev').addEventListener('click', () => { currentLightboxIndex = (currentLightboxIndex - 1 + filteredProducts.length) % filteredProducts.length; lightboxImg.src = filteredProducts[currentLightboxIndex].image; });
document.querySelector('.lightbox-next').addEventListener('click', () => { currentLightboxIndex = (currentLightboxIndex + 1) % filteredProducts.length; lightboxImg.src = filteredProducts[currentLightboxIndex].image; });
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentLightboxIndex = (currentLightboxIndex - 1 + filteredProducts.length) % filteredProducts.length; lightboxImg.src = filteredProducts[currentLightboxIndex].image; }
    if (e.key === 'ArrowRight') { currentLightboxIndex = (currentLightboxIndex + 1) % filteredProducts.length; lightboxImg.src = filteredProducts[currentLightboxIndex].image; }
});

// Testimonials
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let cur = 0;
function show(i) { testimonials.forEach(t => t.classList.remove('active')); dots.forEach(d => d.classList.remove('active')); testimonials[i].classList.add('active'); dots[i].classList.add('active'); cur = i; }
dots.forEach(d => d.addEventListener('click', () => show(parseInt(d.dataset.index))));
setInterval(() => show((cur + 1) % testimonials.length), 5000);

// Counter
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach((c, idx) => {
        const target = parseInt(c.dataset.count);
        const dur = 2500, start = performance.now();
        function ease(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
        function upd(now) {
            const p = Math.min((now - start) / dur, 1);
            c.textContent = Math.floor(ease(p) * target);
            if (p < 1) requestAnimationFrame(upd); else c.textContent = target;
        }
        setTimeout(() => requestAnimationFrame(upd), idx * 200);
    });
}

// Scroll reveal with stagger
const animElements = document.querySelectorAll('[data-anim]');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const delay = e.target.dataset.delay || 0;
            setTimeout(() => e.target.classList.add('anim-in'), delay);
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
animElements.forEach(el => obs.observe(el));

// Counter
let counterStarted = false;
function checkCounter() {
    const el = document.querySelector('.about-stats');
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 150 && !counterStarted) { counterStarted = true; animateCounters(); }
}

// Contact form
contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toLocaleString('en-IN');
    const btn = contactForm.querySelector('button');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    try {
        const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
        if (SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, message, timestamp }) });
        }
        window.open(`https://wa.me/919316963798?text=${encodeURIComponent(`Hello! I'm interested in your handmade purses.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`)}`, '_blank');
        btn.innerHTML = 'Sent!';
        btn.style.background = '#25D366';
        btn.style.color = '#fff';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; contactForm.reset(); }, 3000);
    } catch (err) {
        btn.innerHTML = 'Error - Retry';
        btn.style.background = '#e74c3c';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' }); closeMobileMenu(); });
});

// Mobile menu
const navHamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');
const navOverlay = document.getElementById('navOverlay');
const navMobileClose = document.getElementById('navMobileClose');
function openMobileMenu() { navMobile.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobileMenu() { navMobile.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow = ''; }
if (navHamburger) navHamburger.addEventListener('click', openMobileMenu);
if (navMobileClose) navMobileClose.addEventListener('click', closeMobileMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

// Init
document.addEventListener('DOMContentLoaded', () => { renderProducts(products); checkCounter(); });
window.addEventListener('scroll', checkCounter);

// Hero parallax (desktop only)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        const tri = document.querySelector('.hero-triangle-layer');
        const s = window.pageYOffset;
        if (hero && s < window.innerHeight) {
            hero.style.transform = `translateY(${-s * 0.15}px)`;
            hero.style.opacity = 1 - s / (window.innerHeight * 0.6);
        }
        if (tri && s < window.innerHeight) {
            tri.style.transform = `translateY(${s * 0.1}px) rotate(${s * 0.015}deg)`;
            tri.style.opacity = 1 - s / window.innerHeight;
        }
    });

    // Magnetic button effect
    document.querySelectorAll('.hero-btn, .custom-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Smooth tilt on product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
        });
    });
}

// Text reveal animation on hero load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.hero-sub').classList.add('reveal');
        document.querySelector('.hero-title').classList.add('reveal');
        document.querySelector('.hero-desc').classList.add('reveal');
        document.querySelector('.hero-btns').classList.add('reveal');
    }, 2200);
});

// Desktop-only scroll effects
if (window.innerWidth > 768) {
    // Parallax images on scroll
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.work-item-img img, .about-image img, .custom-banner-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.05;
                img.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // Mouse parallax on stripes
    document.addEventListener('mousemove', e => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 20;
        const my = (e.clientY / window.innerHeight - 0.5) * 20;
        stripesCanvas.style.transform = `translate(${mx}px, ${my}px)`;
    });
}

// Animate process lines on scroll (works on all devices)
const processObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelector('.step-line').style.width = '40px';
            processObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.process-step').forEach(step => {
    step.querySelector('.step-line').style.width = '0';
    step.querySelector('.step-line').style.transition = 'width 0.8s ease';
    processObs.observe(step);
});

// Animate stats numbers on scroll
const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            statsObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.about-stats > div').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = 'all 0.6s ease';
    statsObs.observe(stat);
});

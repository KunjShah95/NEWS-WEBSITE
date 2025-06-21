// script.js - All shared JS for Prime News

// Ticker pause on hover (for landing page)
export function setupTicker(tickerId) {
    const ticker = document.getElementById(tickerId);
    if (ticker) {
        ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
        ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
    }
}

// Animated counters (for stats section)
export function setupCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = Math.max(1, Math.floor(target / 100));
            if (count < target) {
                counter.innerText = (count + inc).toLocaleString();
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// 3D Tilt effect for cards
export function setupTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Category filter for news page
export function setupCategoryFilter() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('#articles-list > div');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('bg-opacity-100', 'font-bold'));
            this.classList.add('bg-opacity-100', 'font-bold');
            const cat = this.getAttribute('data-category');
            cards.forEach(card => {
                if (cat === 'all' || card.getAttribute('data-category') === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Password toggle for login/register
export function setupPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Smooth scroll for anchor links
export function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Call this on DOMContentLoaded in each page as needed
export function initLandingPage() {
    setupTicker('ticker');
    setupCounters();
    setupTiltCards();
    setupSmoothScroll();
}

export function initNewsPage() {
    setupCategoryFilter();
    setupTiltCards();
}

export function initAuthPage() {
    setupPasswordToggles();
}

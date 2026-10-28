/* =========================================================
   1. Interactive 3D Perspective Card Tilt Engine
   ========================================================= */
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(cardWrapper => {
  const card = cardWrapper.querySelector('.food-card');

  cardWrapper.addEventListener('mousemove', (e) => {
    const rect = cardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 35px rgba(255, 94, 20, 0.2)`;
  });

  cardWrapper.addEventListener('mouseleave', () => {
    cardWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardWrapper.style.transition = 'transform 0.5s ease-out';
    card.style.boxShadow = 'none';
  });

  cardWrapper.addEventListener('mouseenter', () => {
    cardWrapper.style.transition = 'none';
  });
});

/* =========================================================
   2. Real-time Rising Golden Ember & Steam Particle Engine
   ========================================================= */
const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 80;
    this.size = Math.random() * 2.2 + 0.6;
    this.speedY = Math.random() * 0.9 + 0.35;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.7 + 0.2;
    this.fadeRate = Math.random() * 0.003 + 0.0015;
    this.hue = Math.random() > 0.4 ? 24 : 38;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.25;
    this.alpha -= this.fadeRate;

    if (this.y < -20 || this.alpha <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 55%, 0.8)`;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

const particleCount = Math.min(window.innerWidth < 600 ? 30 : 65, 75);
for (let i = 0; i < particleCount; i++) {
  const p = new Ember();
  p.y = Math.random() * height;
  particles.push(p);
}

function animateEmbers() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateEmbers);
}
animateEmbers();

/* =========================================================
   3. Interactive Ordering & Bodybuilder Robot Speech
   ========================================================= */
function orderItem(name) {
  alert(`🍽️ Added "${name}" to your order! Fresh preparation will start shortly.`);
}

const quotes = [
  "Fuel up, Champion! 💪🤖",
  "Pure Gains & Good Taste! ⚡",
  "One Chowmin = 100% Energy! 🔥",
  "Welcome to Jolkhabar! 🦾"
];
let quoteIdx = 0;

function botCheer() {
  quoteIdx = (quoteIdx + 1) % quotes.length;
  const bubble = document.getElementById('botBubble');
  bubble.textContent = quotes[quoteIdx];
  bubble.style.transform = 'scale(1.15)';
  setTimeout(() => { bubble.style.transform = 'scale(1)'; }, 200);
}

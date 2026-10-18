// ---------- Typing message ----------
const message = "Wishing you a day full of laughter, cake and happiness. You're an amazing friend, and I'm so lucky to have you! 💖";
const typedEl = document.getElementById("typed");
let i = 0;
function typeText() {
  if (i < message.length) {
    typedEl.textContent += message.charAt(i++);
    setTimeout(typeText, 45);
  }
}
typeText();

// ---------- Balloons ----------
const balloonsEl = document.getElementById("balloons");
const colors = ["#ff5252", "#ffeb3b", "#69f0ae", "#40c4ff", "#e040fb", "#ffab40"];
for (let b = 0; b < 14; b++) {
  const el = document.createElement("div");
  el.className = "balloon";
  el.style.left = Math.random() * 95 + "%";
  el.style.background = colors[b % colors.length];
  el.style.animationDuration = 8 + Math.random() * 8 + "s";
  el.style.animationDelay = Math.random() * 8 + "s";
  balloonsEl.appendChild(el);
}

// ---------- Confetti ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
addEventListener("resize", resize);

let pieces = [];
function burst(count = 150) {
  for (let n = 0; n < count; n++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      size: 6 + Math.random() * 8,
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      rot: Math.random() * 360,
      rotSpeed: -6 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rot += p.rotSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < canvas.height + 30);
  requestAnimationFrame(animate);
}
animate();
burst(200);

// ---------- Cake: blow out candles ----------
const cake = document.getElementById("cake");
const hint = document.getElementById("hint");
cake.addEventListener("click", () => {
  const out = cake.classList.toggle("out");
  if (out) {
    hint.textContent = "Wish made! 🌟 Click again to relight the candles.";
    burst(250);
  } else {
    hint.textContent = "Click the cake to blow out the candles 🎂";
  }
});

// ---------- Surprise button ----------
const wishes = [
  "May all your dreams come true this year, Vasu! ✨",
  "Here's to more adventures and unforgettable memories together! 🚀",
  "You make every day brighter. Never stop smiling! 😄",
  "Happy Birthday to the best friend anyone could ask for! 🎂",
];
let w = 0;
document.getElementById("surprise").addEventListener("click", () => {
  document.getElementById("wish").textContent = wishes[w % wishes.length];
  w++;
  burst(180);
});
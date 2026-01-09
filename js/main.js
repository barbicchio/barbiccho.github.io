function ready(fn){
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
  else fn();
}

ready(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  const els = [...document.querySelectorAll(".reveal")];
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));

  // Subtle parallax for hero background
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const t = Math.min(120, window.scrollY * 0.15);
      heroBg.style.transform = `translateY(${t}px) scale(1.04)`;
    }, { passive: true });
  }

  // Count-up (starts when visible)
  const counters = [...document.querySelectorAll("[data-count]")];
  const cio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        animateCount(e.target);
        cio.unobserve(e.target);
      }
    }
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));
});

function animateCount(el){
  const target = Number(el.getAttribute("data-count") || "0");
  const dur = 700;
  const start = performance.now();
  const from = 0;

  function tick(now){
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(from + (target - from) * eased);
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
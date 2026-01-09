function onReady(fn) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
  else fn();
}

onReady(() => {
  // Year footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll (lightweight)
  const els = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  // Load projects
  loadProjects();
});

async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  try {
    const res = await fetch("data/projects.json", { cache: "no-store" });
    const projects = await res.json();

    grid.innerHTML = projects.map(cardHTML).join("");
  } catch (err) {
    grid.innerHTML = `<div class="card"><h3>Projects</h3><p>Non riesco a caricare i progetti. Riprova tra poco.</p></div>`;
  }
}

function safeLink(href) {
  if (!href) return "";
  return `target="_blank" rel="noopener" href="${href}"`;
}

function cardHTML(p) {
  const tags = (p.tags || []).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join("");
  const repo = p.links?.repo ? `<a ${safeLink(p.links.repo)}>Repo</a>` : "";
  const demo = p.links?.demo ? `<a ${safeLink(p.links.demo)}>Demo</a>` : "";
  const paper = p.links?.paper ? `<a ${safeLink(p.links.paper)}>Paper</a>` : "";

  const links = [repo, demo, paper].filter(Boolean).join(" · ");

  return `
    <article class="card reveal">
      <h3>${escapeHtml(p.title || "")}</h3>
      <p>${escapeHtml(p.description || "")}</p>
      <div class="card-meta">${tags}</div>
      <div class="card-links">${links || `<span class="muted">Links in arrivo</span>`}</div>
    </article>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
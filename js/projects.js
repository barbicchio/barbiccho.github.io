function createProjectCard(project){
  const article = document.createElement("article");
  article.className = "project-item";

  const main = document.createElement("div");
  main.className = "project-main";

  const titleWrap = document.createElement("div");
  titleWrap.className = "project-title";

  const logo = document.createElement("img");
  logo.className = "project-logo";
  logo.src = project.logo || "assets/projects/llmpatient.svg";
  logo.alt = "";
  logo.setAttribute("aria-hidden", "true");

  const title = document.createElement("h3");
  title.textContent = project.title || "Untitled project";

  titleWrap.appendChild(logo);
  titleWrap.appendChild(title);

  const spotlight = document.createElement("p");
  spotlight.className = "project-spotlight";
  spotlight.textContent = project.description || "";

  main.appendChild(titleWrap);
  main.appendChild(spotlight);

  const meta = document.createElement("div");
  meta.className = "project-meta";

  const keywords = document.createElement("div");
  keywords.className = "project-keywords";
  (project.tags || []).forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    keywords.appendChild(span);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  const linkLabels = {
    repo: "Repo",
    demo: "Demo",
    paper: "Paper"
  };
  const linkEntries = Object.entries(project.links || {});
  linkEntries.forEach(([key, url]) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = linkLabels[key] || "Link";
    links.appendChild(a);
  });

  meta.appendChild(keywords);
  meta.appendChild(links);

  article.appendChild(main);
  article.appendChild(meta);

  return article;
}

function loadProjects(){
  const container = document.getElementById("projectsList");
  if (!container) return;

  fetch("data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      projects.forEach((project) => {
        container.appendChild(createProjectCard(project));
      });
    })
    .catch(() => {
      container.textContent = "Projects are temporarily unavailable.";
    });
}

document.addEventListener("DOMContentLoaded", loadProjects);

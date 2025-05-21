export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`fetchJSON 失败：${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';
  projects.forEach(proj => {
    const art = document.createElement('article');
    art.className = 'project-card';
    art.innerHTML = `
      <${headingLevel}>${proj.title}</${headingLevel}>
      <img src="${proj.image}" alt="${proj.title}" />
      <p>${proj.description}</p>
    `;
    containerElement.appendChild(art);
  });
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}

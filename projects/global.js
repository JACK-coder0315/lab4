// global.js

/**
 * 异步拉取并解析 JSON 文件
 * @param {string} url - JSON 文件的相对路径
 */
export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`fetchJSON 失败：${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * 把项目数组渲染到 containerElement 里
 * @param {Array<{title:string,image:string,description:string}>} projects
 * @param {HTMLElement} containerElement - 例如 document.querySelector('.projects')
 * @param {string} headingLevel - 标题标签等级，默认 h2
 */
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';  // 先清空
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

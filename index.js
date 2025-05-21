// index.js
import { fetchJSON, renderProjects } from './global.js';

// 立刻执行的 async 函数
(async () => {
  // 1. 拉取 JSON
  const projects = await fetchJSON('../lib/projects.json');
  // 2. 找到容器
  const container = document.querySelector('.projects');
  // 3. 渲染
  renderProjects(projects, container);
})();

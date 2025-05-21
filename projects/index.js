// 自动生成导航栏
console.log("Generating Navigation Bar...");
const BASE_PATH = location.hostname.includes("localhost") ? "/" : "/portfolio/";
function generateNavbar() {
  let navHTML = `<nav class="nav">`;
  for (let p of pages) {
    const url = p.url.startsWith("http") ? p.url : BASE_PATH + p.url;
    navHTML += `<a href="${url}"${url.startsWith("http") ? ' target="_blank"' : ''}>${p.title}</a>`;
  }
  navHTML += `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="normal">Auto</option>
      </select>
    </label>
  </nav>`;
  document.getElementById("nav-container")?.insertAdjacentHTML("beforeend", navHTML);

  document.querySelectorAll(".nav a").forEach(a => {
    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add("current");
    }
  });

  const select = document.querySelector("select");
  function setColorScheme(scheme) {
    if (scheme === "normal") {
      document.documentElement.style.removeProperty("color-scheme");
    } else {
      document.documentElement.style.setProperty("color-scheme", scheme);
    }
    select.value = scheme;
  }
  if (localStorage.colorScheme) setColorScheme(localStorage.colorScheme);
  else setColorScheme("normal");
  select.addEventListener("input", e => {
    localStorage.colorScheme = e.target.value;
    setColorScheme(e.target.value);
  });
}
generateNavbar();

// 原始项目数据
const originalData = [
  { value: 1, label: 'Data Science',           year: 2022 },
  { value: 2, label: 'Web Development',        year: 2023 },
  { value: 3, label: 'Machine Learning',       year: 2023 },
  { value: 4, label: 'Cybersecurity',          year: 2024 },
  { value: 5, label: 'Artificial Intelligence',year: 2024 },
  { value: 6, label: 'Big Data',               year: 2022 }
];
let filteredData = [...originalData];

// 渲染项目卡片
function renderProjects(data) {
  const container = document.querySelector('.projects');
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const img = document.createElement('img');
    // 这里假设图片命名为 label 小写、空格替换为短横线的格式
    const key = item.label.toLowerCase().replace(/\s+/g, '-');
    img.src = `../images/${key}.jpg`;
    img.onerror = () => img.src = 'https://via.placeholder.com/400x300?text=No+Image';

    const title = document.createElement('h2');
    title.textContent = `${item.label} (${item.year})`;

    const desc = document.createElement('p');
    desc.textContent = `Description for ${item.label}.`;

    card.append(img, title, desc);
    container.append(card);
  });
}

// 搜索过滤
document.querySelector('.searchBar').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  filteredData = originalData.filter(d =>
    d.label.toLowerCase().includes(q) ||
    d.year.toString().includes(q)
  );
  renderProjects(filteredData);
});

// 首次渲染
renderProjects(filteredData);

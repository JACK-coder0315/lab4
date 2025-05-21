import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

(async () => {
  const allProjects = await fetchJSON('lib/projects.json');

  const latestContainer = document.querySelector('.latest-projects');
  renderProjects(allProjects.slice(0, 3), latestContainer, 'h3');

  const allContainer = document.querySelector('.all-projects');
  renderProjects(allProjects, allContainer, 'h3');

  const profileStats = document.querySelector('#profile-stats');
  if (profileStats) {
    const gh = await fetchGitHubData('your-github-username');
    profileStats.innerHTML = `
      <dl style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <dt>Public Repos:</dt><dd>${gh.public_repos}</dd>
        <dt>Public Gists:</dt><dd>${gh.public_gists}</dd>
        <dt>Followers:</dt><dd>${gh.followers}</dd>
        <dt>Following:</dt><dd>${gh.following}</dd>
      </dl>
    `;
  }
})();

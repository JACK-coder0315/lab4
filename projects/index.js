import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

(async () => {
  const allProjects = await fetchJSON('lib/projects.json');
  renderProjects(allProjects.slice(0, 3), document.querySelector('.projects'), 'h3');

  const profileStats = document.querySelector('#profile-stats');
  if (profileStats) {
    const gh = await fetchGitHubData('jack-coder0315');
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

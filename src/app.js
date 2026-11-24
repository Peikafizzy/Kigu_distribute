import { renderAppLayout } from './components/appLayout.js';
import { routes } from './routes.js';

export function startApp() {
    const app = document.querySelector('#app');
    const pageContent = renderAppLayout(app);

    function renderCurrentPage() {
        const path = window.location.hash.slice(1) || '/';
        const renderPage = routes[path];

        if (renderPage) {
            renderPage(pageContent);
        } else {
            pageContent.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    window.addEventListener('hashchange', renderCurrentPage);

    renderCurrentPage();
}

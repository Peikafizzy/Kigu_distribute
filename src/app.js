import { renderAppLayout } from './components/appLayout.js';
import { routes } from './routes.js';

export function startApp() {
    const app = document.querySelector('#app');
    const pageContent = renderAppLayout(app);

    function renderCurrentPage() {
        const path = window.location.hash.slice(1) || '/';

        // Match dynamic profile URL
        const profileMatch = path.match(/^\/kigu_profile\/(\d+)$/);

        if (profileMatch) {
            routes['/kigu_profile'](pageContent, profileMatch[1]);
            return;
        }

        // Handle static routes
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

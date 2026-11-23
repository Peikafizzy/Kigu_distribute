import { renderKiguPage } from './modules/kigu/kigu.js';

export function startApp() {
    const app = document.querySelector('#app');
    const profileId = new URLSearchParams(window.location.search).get('profile');

    if (profileId) {
        renderProfilePage(app, profileId);
    } else {
        renderKiguPage(app);
    }

}

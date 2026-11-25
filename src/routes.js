import { renderHomePage } from './modules/kigu/home.js';
import { renderKiguPage } from './modules/kigu/manage/adminRegistary.js';
import { renderPublicDirectory } from './modules/kigu/publicDirectory.js';
import {mockPeople} from './modules/kigu/mocker/mockKigudata.js';
import { renderProfilePage } from './modules/kigu/profile.js';
import { renderAboutPage } from './modules/kigu/about.js';

// Other page imports will go here.

export const routes = {
    '/': renderHomePage,
    '/kigu_manage': renderKiguPage,
    '/kigu_directory': (container) =>
    renderPublicDirectory(container, mockPeople),

    '/kigu_profile': (container, personId) => {
        const kigu = mockPeople.find(
            person => String(person.id) === String(personId)
        );

        if (!kigu) {
            container.innerHTML = '<h1>Member not found</h1>';
            return;
        }

        renderProfilePage(container, kigu);
    },

    '/kigu_about': (container) => {
    renderAboutPage(container);
}

    // '/dashboard': renderDashboard,
    // '/settings': renderSettings,
};


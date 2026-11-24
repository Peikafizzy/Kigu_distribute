import { renderHomePage } from './modules/kigu/home.js';
import { renderKiguPage } from './modules/kigu/manage/adminRegistary.js';
import { renderPublicDirectory } from './modules/kigu/publicDirectory.js';
import {getMockPeople} from './modules/kigu/mocker/mockKigudata.js';

// Other page imports will go here.

export const routes = {
    '/': renderHomePage,
    '/kigu_manage': renderKiguPage,
    '/kigu_directory': (container) =>
    renderPublicDirectory(container, getMockPeople),

    // '/dashboard': renderDashboard,
    // '/settings': renderSettings,
};
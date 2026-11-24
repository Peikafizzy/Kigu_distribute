import { escapeHTML, safeURL } from '../../../shared/utils.js';
import { getRegionLabel } from '../../../shared/common.js';

export function renderProfilePage(app, kigu) {
    app.innerHTML = `
        <div class="profile-page">

            <!-- Profile Header -->
            <section class="profile-header">
                <div class="profile-avatar">
                    <img src="${safeURL(kigu.avatar)}" alt="${escapeHTML(kigu.name)}">
                </div>

                <div class="profile-info">
                    <h1>${escapeHTML(kigu.name)}</h1>
                    <p>${escapeHTML(kigu.country)} · ${escapeHTML(getRegionLabel(kigu.regionCode))}</p>
                </div>
            </section>

            <!-- About -->
            <section class="profile-description">
                <h2>About</h2>
                <p>${escapeHTML(kigu.description || '')}</p>
            </section>

            <!-- Characters -->
                <section class="profile-characters">
                    <h2>Characters</h2>
                    <div class="character-list">
                        ${renderCharacters(kigu.characters)}
                    </div>
                </section>

                <!-- Social Links -->
                <section class="profile-social">
                    <h2>Social Links</h2>
                    <div class="social-list">
                        ${renderSocialLinks(kigu.socialLinks)}
                    </div>
                </section>

                <!-- Gallery -->
                <section class="profile-gallery">
                    <h2>Gallery</h2>
                    <div class="gallery-list">
                        ${renderGallery(kigu.gallery)}
                    </div>
                </section>
        </div>
    `;
}

function renderCharacters(characters = []) {
    return characters.map(character => `
        <div class="character-item" data-character-id="${escapeHTML(character.id)}">
            <img src="${safeURL(character.image)}" alt="${escapeHTML(character.name)}">
            <h3>${escapeHTML(character.name)}</h3>
            <p>${escapeHTML(character.description || '')}</p>
        </div>
    `).join('');
}

function renderSocialLinks(links = []) {
    return links.map(link => `
        <a href="${safeURL(link.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(link.label)}
        </a>
    `).join('');
}

function renderGallery(images = []) {
    return images.map(image => `
        <img src="${safeURL(image.url)}" alt="${escapeHTML(image.description || '')}">
    `).join('');
}
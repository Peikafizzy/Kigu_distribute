import { escapeHTML, safeURL } from '../../shared/utils.js';
import { getRegionLabel } from '../../shared/common.js';

export function renderProfilePage(app, kigu) {
    app.innerHTML = `
        <div class="profile-page">
            ${renderProfileHeader(kigu)}
            ${renderProfileAbout(kigu)}
            ${renderCharacters(kigu.characters)}
            ${renderSocialLinks(kigu.socialLinks)}
            ${renderGallery(kigu.gallery)}
        </div>
    `;
}

function renderProfileHeader(kigu) {
    const avatar = safeURL(kigu.avatar);

    return `
        <section class="profile-header">
            <div class="profile-avatar">
                ${avatar
                    ? `<img src="${avatar}" alt="${escapeHTML(kigu.name || 'Member')}">`
                    : ''
                }
            </div>

            <div class="profile-info">
                <h1>${escapeHTML(kigu.name || 'Unnamed Member')}</h1>
                <p>
                    ${escapeHTML(kigu.country || 'Unknown country')}
                    ·
                    ${escapeHTML(getRegionLabel(kigu.regionCode) || '')}
                </p>
            </div>
        </section>
    `;
}

function renderProfileAbout(kigu) {
    const description = kigu.description?.trim();

    return `
        <section class="profile-description">
            <h2>About</h2>
            <p>
                ${description
                    ? escapeHTML(description)
                    : 'This member has not added an introduction yet.'
                }
            </p>
        </section>
    `;
}

function renderCharacters(characters = []) {
    return `
        <section class="profile-characters">
            <h2>Characters</h2>
            <div class="character-list">
                ${characters.length
                    ? characters.map(character => `
                        <div class="character-item">
                            <h3>${escapeHTML(character.name)}</h3>
                        </div>
                    `).join('')
                    : '<p class="empty-placeholder">No characters added yet.</p>'
                }
            </div>
        </section>
    `;
}

function renderSocialLinks(links = []) {
    const validLinks = links.filter(link => safeURL(link.url));

    return `
        <section class="profile-social">
            <h2>Social Links</h2>

            <div class="social-list">
                ${validLinks.length
                    ? validLinks.map(link => `
                        <a
                            href="${safeURL(link.url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(link.label || 'Visit Link')}
                        </a>
                    `).join('')
                    : '<p class="empty-placeholder">No social links added yet.</p>'
                }
            </div>
        </section>
    `;
}

function renderGallery(images = []) {
    const validImages = images.filter(image => safeURL(image.url));

    return `
        <section class="profile-gallery">
            <h2>Gallery</h2>

            <div class="gallery-list">
                ${validImages.length
                    ? validImages.map(image => `
                        <img
                            src="${safeURL(image.url)}"
                            alt="${escapeHTML(image.description || 'Gallery image')}"
                        >
                    `).join('')
                    : `
                        <div class="gallery-placeholder">
                            <div class="placeholder-icon">▧</div>
                            <p>No gallery images uploaded yet.</p>
                        </div>
                    `
                }
            </div>
        </section>
    `;
}

import './profile.css';
import { getPeople } from './kiguServices.js';

function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}

function safeURL(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch {
        return '';
    }
}

function getEmbedURL(value) {
    try {
        const url = new URL(value);

        if (url.hostname === 'youtu.be') {
            return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
        }

        if (url.hostname.endsWith('youtube.com')) {
            const videoId = url.searchParams.get('v');
            if (videoId) {
                return `https://www.youtube-nocookie.com/embed/${videoId}`;
            }
        }

        if (url.hostname.endsWith('vimeo.com')) {
            const videoId = url.pathname.split('/').filter(Boolean).pop();
            if (/^\d+$/.test(videoId)) {
                return `https://player.vimeo.com/video/${videoId}`;
            }
        }
    } catch {
        return '';
    }

    return '';
}

function renderMediaItem(item) {
    const title = escapeHTML(item.title || 'Untitled');
    const url = safeURL(item.url);

    if (!url) return '';

    let content = '';

    switch (item.type) {
        case 'image':
            content = `<img src="${escapeHTML(url)}" alt="${title}" loading="lazy">`;
            break;

        case 'video':
            content = `
                <video controls preload="metadata">
                    <source src="${escapeHTML(url)}">
                    Your browser does not support video playback.
                </video>`;
            break;

        case 'audio':
            content = `
                <audio controls preload="metadata">
                    <source src="${escapeHTML(url)}">
                    Your browser does not support audio playback.
                </audio>`;
            break;

        case 'embed': {
            const embedURL = getEmbedURL(url);
            if (!embedURL) return '';

            content = `
                <iframe
                    src="${escapeHTML(embedURL)}"
                    title="${title}"
                    loading="lazy"
                    allowfullscreen>
                </iframe>`;
            break;
        }

        default:
            return '';
    }

    return `
        <article class="profile-media-item">
            <div class="profile-media-content">${content}</div>
            ${item.title ? `<p>${title}</p>` : ''}
        </article>`;
}

export function renderProfilePage(container, personId) {
    const person = getPeople().find(p => p.id === personId);

    if (!person) {
        container.innerHTML = `
            <section class="profile-not-found">
                <h2>Profile not found</h2>
                <a href="/">Back to directory</a>
            </section>`;
        return;
    }

    const avatar = safeURL(person.avatar);
    const media = Array.isArray(person.media) ? person.media : [];

    container.innerHTML = `
        <main class="profile-page">
            <a class="profile-back" href="/">← Back to directory</a>

            <section class="profile-header">
                <div class="profile-avatar">
                    ${avatar
                        ? `<img src="${escapeHTML(avatar)}" alt="${escapeHTML(person.name)}">`
                        : `<div class="profile-avatar-placeholder">
                            ${escapeHTML(person.name?.charAt(0) || '?')}
                           </div>`
                    }
                </div>

                <div class="profile-info">
                    <h1>${escapeHTML(person.name)}</h1>
                    <p class="profile-region">${escapeHTML(person.region || 'Region not specified')}</p>
                    <p class="profile-bio">${escapeHTML(person.bio || 'No introduction yet.')}</p>
                </div>
            </section>

            <section class="profile-gallery">
                <h2>Gallery</h2>

                ${media.length
                    ? `<div class="profile-media-grid">
                        ${media.map(renderMediaItem).join('')}
                       </div>`
                    : '<p class="profile-empty">No media uploaded yet.</p>'
                }
            </section>
        </main>`;
}

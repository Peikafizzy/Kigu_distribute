function renderMedia(media) {
    switch (media.type) {
        case 'image':
            return `<img src="${media.url}" alt="${media.title}">`;

        case 'video':
            return `
                <video controls preload="metadata">
                    <source src="${media.url}" type="${media.mimeType}">
                </video>
            `;

        case 'audio':
            return `
                <audio controls>
                    <source src="${media.url}" type="${media.mimeType}">
                </audio>
            `;

        case 'youtube':
            return `
                <iframe
                    src="${media.embedUrl}"
                    allowfullscreen>
                </iframe>
            `;

        default:
            return '';
    }
}
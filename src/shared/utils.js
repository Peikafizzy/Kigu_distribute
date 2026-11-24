// Escape HTML to prevent user-provided text
// from being interpreted as HTML markup.
export function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}

//allows HTTP/HTTPS URLs and rejects unsafe protocols
export function safeURL(value) {
    if (!value) return '';

    try {
        const url = new URL(value);

        if (url.protocol === 'https:' || url.protocol === 'http:') {
            return escapeHTML(url.href);
        }

        return '';
    } catch {
        return '';
    }
}



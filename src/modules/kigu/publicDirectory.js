import { escapeHTML,
        safeURL } from '../../shared/utils.js';

// Main directory renderer
export function renderPublicDirectory(container, people = []) {
    container.innerHTML = `
        <section class="public-directory">

            <header class="directory-header">
                <h1>Browse Members</h1>
                <p>Discover members of the Kigu community.</p>
            </header>

            <div class="directory-toolbar">

                <input
                    id="directory-search"
                    type="search"
                    placeholder="Search members..."
                    aria-label="Search members by name"
                >

                <select id="country-filter" aria-label="Filter by country">
                    <option value="">All Countries</option>
                </select>

                <select id="directory-sort" aria-label="Sort members">
                    <option value="name-asc">A–Z</option>
                    <option value="name-desc">Z–A</option>
                </select>

            </div>

            <p id="directory-count" class="directory-count"></p>

            <div id="member-grid" class="member-grid"></div>

        </section>
    `;

    // Get page elements
    const searchInput = container.querySelector('#directory-search');
    const countryFilter = container.querySelector('#country-filter');
    const sortSelect = container.querySelector('#directory-sort');
    const memberGrid = container.querySelector('#member-grid');
    const count = container.querySelector('#directory-count');

    // Populate country dropdown
    populateCountryOptions(countryFilter, people);

    // Update directory whenever filters change
    function updateDirectory() {

        const filteredPeople = filterAndSortPeople(
            people,
            searchInput.value,
            countryFilter.value,
            sortSelect.value
        );
        count.textContent =
            `Showing ${filteredPeople.length} ${filteredPeople.length === 1 ? 'member' : 'members'}`;

    
        memberGrid.innerHTML = renderMemberCards(filteredPeople);
    }

    // Event listeners
    searchInput.addEventListener('input', updateDirectory);
    countryFilter.addEventListener('change', updateDirectory);
    sortSelect.addEventListener('change', updateDirectory);

    // Initial render
    updateDirectory();
}

// Country dropdown
function populateCountryOptions(select, people) {

    const countries = [...new Set(
        people
            .map(person => person.country?.trim())
            .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    countries.forEach(country => {

        const option = document.createElement('option');

        option.value = country;
        option.textContent = country;

        select.appendChild(option);
    });
}

// Search, filter and sorting
function filterAndSortPeople(people, keyword, selectedCountry, sortOrder) {

    const searchTerm = keyword.trim().toLowerCase();

    const filteredPeople = people.filter(person => {
        const name = (person.name || '').toLowerCase();
        const matchesSearch = name.includes(searchTerm);
        const matchesCountry =
            !selectedCountry ||
            person.country === selectedCountry;

        return matchesSearch && matchesCountry;
    });

    filteredPeople.sort((a, b) => {

        const comparison = (a.name || '').localeCompare(
            b.name || '',
            undefined,
            { sensitivity: 'base' }
        );

        return sortOrder === 'name-desc'
            ? -comparison
            : comparison;
    });

    return filteredPeople;
}


// Member cards
function renderMemberCards(people) {

    if (people.length === 0) {
        return `
            <p class="empty-state">
                No members found.
            </p>
        `;
    }

    return people.map(person => {

        const name = person.name || 'Unnamed Member';
        const country = person.country || 'Unknown country';

        const initial = name.trim().charAt(0).toUpperCase() || '?';

        const avatarURL = safeURL(person.avatar);

        // Use an image when available, otherwise show an initial.
        const avatarContent = avatarURL
            ? `
                <img
                    src="${avatarURL}"
                    alt="${escapeHTML(name)}"
                    loading="lazy"
                >
            `
            : `
                <span class="avatar-placeholder">
                    ${escapeHTML(initial)}
                </span>
            `;

        const slug = person.slug || createSlug(name);

        return `
            <a
                class="member-card"
                href="#/directory/${encodeURIComponent(slug)}"
            >

                <div class="member-avatar">
                    ${avatarContent}
                </div>

                <div class="member-info">
                    <h2>${escapeHTML(name)}</h2>
                    <p>${escapeHTML(country)}</p>
                </div>

            </a>
        `;

    }).join('');
}

function createSlug(name) {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

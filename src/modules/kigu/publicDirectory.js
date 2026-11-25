import { escapeHTML,
        safeURL } from '../../shared/utils.js';
import {mockPeople} from './mocker/mockKigudata.js';

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

    // Track the currently expanded member
    let expandedMemberId = null;

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

        memberGrid.innerHTML = renderMemberCards(
            filteredPeople,
            expandedMemberId
        );

        // Reset expansion if the selected member is no longer visible
        if (
            expandedMemberId !== null &&
            !filteredPeople.some(
                person => String(person.id) === String(expandedMemberId)
            )
        ) {
            expandedMemberId = null;
        }
    }

    function handleMemberCardClick(event) {
        const card = event.target.closest('.member-card');

        if (!card || !memberGrid.contains(card)) return;

        const memberId = card.dataset.memberId;

        expandedMemberId =
            String(expandedMemberId) === String(memberId)
                ? null
                : memberId;

        updateDirectory();
    }


    // Event listeners
    searchInput.addEventListener('input', updateDirectory);
    countryFilter.addEventListener('change', updateDirectory);
    sortSelect.addEventListener('change', updateDirectory);

    memberGrid.addEventListener('click', handleMemberCardClick);

    // Initial render
    console.log('People received:', people);
    console.log('People count:', people.length);
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
function renderMemberCards(people, expandedMemberId) {
    if (people.length === 0) {
        return `<p class="empty-state">No members found.</p>`;
    }

    return people.map(person => {
        const name = person.name || 'Unnamed Member';
        const country = person.country || 'Unknown country';
        const isExpanded = String(person.id) === String(expandedMemberId);
        const initial = name.trim().charAt(0).toUpperCase() || '?';
        const avatarURL = safeURL(person.avatar);

        const avatarContent = avatarURL
            ? `<img src="${avatarURL}" alt="${escapeHTML(name)}" loading="lazy">`
            : `<span class="avatar-placeholder">${escapeHTML(initial)}</span>`;

        const slug = person.slug || createSlug(name);

        // Render the normal member card
        const memberCard = `
            <div
                class="member-card ${isExpanded ? 'expanded' : ''}"
                data-member-id="${escapeHTML(person.id)}"
                data-member-slug="${encodeURIComponent(slug)}"
                tabindex="0"
                role="button"
                aria-expanded="${isExpanded}"
            >
                <div class="member-avatar">${avatarContent}</div>
                <div class="member-info">
                    <h2>${escapeHTML(name)}</h2>
                    <p>${escapeHTML(country)}</p>
                </div>
            </div>
        `;

        // Render expanded content as a separate grid item
        const expandedContent = isExpanded
        ? renderExpandedMember(person)
        : '';

        return memberCard + expandedContent;

    }).join('');;
}

function renderExpandedMember(person) {
    const name = person.name || 'Unnamed Member';
    const avatarURL = safeURL(person.avatar);
    const slug = person.slug || createSlug(name);

    // Keep a maximum of two valid links
    const links = (person.links || [])
        .slice(0, 2)
        .map(link => {
            const url = safeURL(link.url);

            if (!url) return '';

            return `
                <a
                    href="${escapeHTML(url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${escapeHTML(link.label)}
                </a>
            `;
        })
        .filter(Boolean)
        .join('');

    const avatarContent = avatarURL
        ? `<img src="${escapeHTML(avatarURL)}"
                alt="${escapeHTML(name)}">`
        : `<span class="avatar-placeholder">
                ${escapeHTML(name.trim().charAt(0).toUpperCase() || '?')}
            </span>`;

    return `
        <div class="member-card-expanded">

            <div class="expanded-member-sidebar">

                <div class="member-avatar">
                    ${avatarContent}
                </div>

                <h2>${escapeHTML(name)}</h2>

                <p class="expanded-member-country">
                    ${escapeHTML(person.country || 'Unknown country')}
                </p>

                <div class="member-links">
                    ${links}
                </div>

            </div>

            <div class="expanded-member-content">

                <h3>Introduction</h3>

                <p>
                    ${escapeHTML(
                        person.introduction || 'No introduction available.'
                    )}
                </p>

                <div class="expanded-member-actions">
                    <a href="#/kigu_profile/${encodeURIComponent(person.id)}">
                        Read More →
                    </a>
                </a>
                </div>

            </div>

        </div>
    `;
}

function createSlug(name) {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

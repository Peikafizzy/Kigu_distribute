import {
    deletePerson,
    getPeople,
    savePerson
} from './kiguServices.js';

export function renderKiguPage(app) {
    let people = getPeople();
    let editingId = null;

    app.innerHTML = `
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="brand">KIGU<span>.</span></div>

            <p class="sidebar-label">MANAGEMENT</p>

            <nav>
                <a class="nav-item active" href="#">People Directory</a>
                <a class="nav-item" href="#">Profiles</a>
                <a class="nav-item" href="#">Settings</a>
            </nav>

            <div class="sidebar-footer">
                Kigu Community
            </div>
        </aside>

        <main class="main-content">
            <header class="topbar">
                <span>Management / People</span>
                <span class="admin-label">Administrator</span>
            </header>

            <section class="page-heading">
                <div>
                    <h1>People Directory</h1>
                    <p>Manage your Kigu community members.</p>
                </div>

                <button id="add-person-btn" class="primary-btn">
                    + Add Person
                </button>
            </section>

            <section class="stats">
                <div class="stat-card">
                    <span>Total People</span>
                    <strong id="total-count">0</strong>
                </div>
            </section>

            <section class="content-card">
                <div class="table-heading">
                    <h2>All People</h2>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search people..."
                    >
                </div>

                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>State / Region</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="people-table"></tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>

    <div id="person-modal" class="modal hidden">
        <div class="modal-card">
            <div class="modal-heading">
                <div>
                    <h2 id="modal-title">Add Person</h2>
                    <p>Enter basic registration information.</p>
                </div>
                <button id="close-modal" class="close-btn">&times;</button>
            </div>

            <form id="person-form">
                <label>
                    Kigu Region *
                    <select name="regionCode" required>
                        <option value="">Select region</option>
                        <option value="NAM">North America</option>
                        <option value="CAM">Central America</option>
                        <option value="SAM">South America</option>
                        <option value="EUR">Europe</option>
                        <option value="SLV">Slavic</option>
                        <option value="MEA">Middle East</option>
                        <option value="AFR">Africa</option>
                        <option value="OCE">Oceania</option>
                        <option value="SEA">Southeast Asia</option>
                        <option value="JPN">Japan</option>
                        <option value="CHN">China</option>
                        <option value="THM">Taiwan / Hong Kong / Macau</option>
                        <option value="KOR">Korea</option>
                        <option value="SAS">South Asia</option>
                        <option value="CAS">Central Asia</option>
                    </select>
                </label>

                <label>
                    Name *
                    <input
                        name="name"
                        required
                        maxlength="100"
                        placeholder="Enter name"
                    >
                </label>

                <label>
                    Country *
                    <input
                        name="country"
                        required
                        maxlength="100"
                        placeholder="e.g. Malaysia"
                    >
                </label>

                <label>
                    State / Region *
                    <input
                        name="state"
                        required
                        maxlength="100"
                        placeholder="e.g. Penang"
                    >
                </label>

                <div class="form-actions">
                    <button type="button" id="cancel-btn"
                        class="secondary-btn">Cancel</button>
                    <button type="submit" class="primary-btn">
                        Save Person
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;

    const table = app.querySelector('#people-table');
    const modal = app.querySelector('#person-modal');
    const form = app.querySelector('#person-form');
    const search = app.querySelector('#search-input');

    function escapeHTML(value = '') {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[char]);
    }

    
    function renderTable() {
        const keyword = search.value.toLowerCase();

        const filtered = people.filter(person =>
            person.regionCode.toLowerCase().includes(keyword) ||
            person.name.toLowerCase().includes(keyword) ||
            (person.country || '').toLowerCase().includes(keyword) ||
            (person.state || '').toLowerCase().includes(keyword)
        );

        app.querySelector('#total-count').textContent = people.length;

        if (!filtered.length) {
            table.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        No people found.
                    </td>
                </tr>
            `;
            return;
        }

        table.innerHTML = filtered.map(person => `
            <tr>
                <td>${escapeHTML(person.regionCode || '—')}</td>
                <td><strong>${escapeHTML(person.name)}</strong></td>
                <td>${escapeHTML(person.country || '—')}</td>
                <td>${escapeHTML(person.state || '—')}</td>
                <td>
                    <button class="text-btn edit-btn"
                        data-id="${escapeHTML(person.id)}">Edit</button>
                    <button class="text-btn delete-btn"
                        data-id="${escapeHTML(person.id)}">Delete</button>
                </td>
            </tr>
        `).join('');
    }


    function openModal(person = null) {
        form.reset();
        editingId = person ? person.id : null;

        form.elements.regionCode.value = person?.regionCode || '';
        form.elements.name.value = person?.name || '';
        form.elements.country.value = person?.country || '';
        form.elements.state.value = person?.state || '';

        app.querySelector('#modal-title').textContent =
            person ? 'Edit Person' : 'Add Person';

        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        form.reset();
        editingId = null;
    }

    app.querySelector('#add-person-btn')
        .addEventListener('click', () => openModal());

    app.querySelector('#close-modal')
        .addEventListener('click', closeModal);

    app.querySelector('#cancel-btn')
        .addEventListener('click', closeModal);

    search.addEventListener('input', renderTable);

    
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);

        const person = {
            id: editingId,
            name: formData.get('name').trim(),
            country: formData.get('country').trim(),
            state: formData.get('state').trim(),
            regionCode: formData.get('regionCode')

        };

        savePerson(person);
        people = getPeople();

        closeModal();
        renderTable();
    });

    table.addEventListener('click', event => {
        const editButton = event.target.closest('.edit-btn');
        const deleteButton = event.target.closest('.delete-btn');

        if (editButton) {
            const person = people.find(
                p => p.id === editButton.dataset.id
            );

            if (person) openModal(person);
        }

        if (deleteButton) {
            const id = deleteButton.dataset.id;

            if (confirm('Delete this person?')) {
                people = deletePerson(id);
                renderTable();
            }
        }
    });

    renderTable();
}

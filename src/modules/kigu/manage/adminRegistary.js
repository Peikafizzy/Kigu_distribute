import {
    getRegionOptions
} from '../../../shared/common.js';
import { escapeHTML } from '../../../shared/utils.js';
import {
    deletePerson,
    getPeople,
    savePerson
} from '../kiguServices.js';
import './admin.css';

export function renderKiguPage(container) {
    let people = getPeople();
    let editingId = null;

    container.innerHTML = `
    <div class="admin-page">
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
                <div class="directory-controls">
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search name, country, registration no..."
                    >

                    <select id="sort-select">
                        <option value="name-asc">Name A–Z</option>
                        <option value="name-desc">Name Z–A</option>
                        <option value="registration-asc">Registration No.</option>
                    </select>
                </div>
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
                        ${getRegionOptions()}
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

    const table = container.querySelector('#people-table');
    const modal = container.querySelector('#person-modal');
    const form = container.querySelector('#person-form');
    const search = container.querySelector('#search-input');

    
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

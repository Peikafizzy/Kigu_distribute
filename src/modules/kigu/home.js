export function renderHomePage(container) {
    container.innerHTML = `
        <section class="home-page">
            <h1>Welcome to Kigu</h1>
            <p>Welcome to the Kigu community directory.</p>

            <nav class="home-navigation">
                <a href="#/directory">Browse Members</a>
            </nav>
        </section>
    `;
}
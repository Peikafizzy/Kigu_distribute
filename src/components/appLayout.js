import './appLayout.css';

export function renderAppLayout(app) {
    app.innerHTML = `
        <div class="app-layout">

            <aside class="sidebar">
                <div class="brand">KIGU<span>.</span></div>

                <div class="sidebar-section">
                    <p class="sidebar-label">MANAGEMENT</p>

                    <nav class="sidebar-nav">
                        <a href="#/dashboard" class="nav-item">
                            Dashboard
                        </a>

                        <a href="#/kigu_manage" class="nav-item">
                            Kigu manage
                        </a>

                        <a href="#/kigu_directory" class="nav-item">
                            Kigu Directory
                        </a>

                        <a href="#/settings" class="nav-item">
                            Settings
                        </a>
                    </nav>
                </div>

                <div class="sidebar-footer">
                    Kigu Community
                </div>
            </aside>

            <main class="main-content">
                <header class="topbar">
                    <span id="page-breadcrumb">
                        Management
                    </span>

                    <span class="admin-label">
                        Administrator
                    </span>
                </header>

                <div id="page-content" class="page-content">
                    <!-- Individual pages render here -->
                </div>
            </main>

        </div>
    `;

    return app.querySelector('#page-content');
}

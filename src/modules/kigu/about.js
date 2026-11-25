import { escapeHTML } from '../../shared/utils.js';

export function renderAboutPage(container) {
    container.innerHTML = `
        <section class="about-page">

            <header class="about-hero">
                <p class="about-eyebrow">ABOUT KIGU</p>

                <h1>A community, a shared passion.</h1>

                <p class="about-intro">
                    A place to discover, connect, and learn more
                    about the people behind the Kigu community.
                </p>
            </header>

            <div class="about-content">

                <section class="about-section">
                    <h2>Who We Are</h2>
                    <p>
                        Write about the background of the Kigu community
                        and how it came to be.
                    </p>
                </section>

                <section class="about-section">
                    <h2>What We Do</h2>
                    <p>
                        Explain what this website provides and
                        how people can use it.
                    </p>
                </section>

                <section class="about-section">
                    <h2>Our Purpose</h2>
                    <p>
                        Explain the goals and direction of the community.
                    </p>
                </section>

            </div>

        </section>
    `;
}
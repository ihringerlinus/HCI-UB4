// Quiz-Logik: Ersetzt die Detail-Karte komplett durch
// einen Erfolgs- oder Fehler-Screen im Figma-Look.

(function () {
    const body = document.body;
    const correct = body.dataset.correctEpoch;
    const fact = body.dataset.fact;
    const name = body.dataset.name;
    const icon = body.dataset.icon;
    const glb = body.dataset.glb;

    const buttons = document.querySelectorAll('.epoch-btn');
    const phone = document.querySelector('.phone');
    const container = document.querySelector('.container');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const choice = btn.dataset.epoch;
            const isCorrect = choice === correct;
            renderFeedback(isCorrect, choice);
        });
    });

    function renderFeedback(isCorrect, chosenEpoch) {
        const headlineWord = isCorrect ? 'Gut gemacht!' : 'Nicht Gut gemacht!';
        const subtext      = isCorrect ? '' : 'Ordne das Objekt der richtigen Person zu';
        const cardClass    = isCorrect ? 'success' : 'error';
        const bigWord      = isCorrect ? 'ERFOLG!' : 'FALSCH!';
        const btnClass     = isCorrect ? 'success' : 'error';
        const btnHref      = isCorrect ? 'objekte.html' : '#';
        const btnLabel     = 'Weiter';

        const errorIcon = isCorrect ? '' : `<div class="feedback-icon">${icon}</div>`;
        const message = isCorrect ? `<p class="feedback-text">${fact}</p>`
                                  : `<p class="feedback-text">Versuche es erneut</p>`;

        // Three avatars under the feedback card; highlight correct epoch
        const epochs = ['1940', '1980', '2020'];
        const avatars = epochs.map(yr => {
            const isHL = yr === correct;
            return `
                <div class="feedback-avatar ${isHL ? 'highlight' : ''}">
                    <span class="ico">👨‍🚒</span>
                    <span class="yr">${yr}</span>
                </div>
            `;
        }).join('');

        const newHTML = `
            <h1 class="page-title">${headlineWord}</h1>
            ${subtext ? `<p class="page-sub">${subtext}</p>` : ''}

            <div class="object-badge">
                <model-viewer
                    src="${glb}"
                    alt=""
                    camera-controls
                    auto-rotate
                    rotation-per-second="40deg"
                    interaction-prompt="none"
                    disable-zoom>
                </model-viewer>
                ${name}
            </div>

            <div class="feedback-card ${cardClass}">
                ${errorIcon}
                <div class="feedback-headline">${bigWord}</div>
                ${message}
                <button class="btn-weiter ${btnClass}" id="weiter-btn">${btnLabel}</button>
                <div class="feedback-avatars">${avatars}</div>
            </div>
        `;

        container.innerHTML = newHTML;

        // Weiter-Button-Verhalten
        const weiterBtn = document.getElementById('weiter-btn');
        weiterBtn.addEventListener('click', () => {
            if (isCorrect) {
                window.location.href = 'objekte.html';
            } else {
                // Bei falscher Antwort: Seite neu laden, damit User es erneut probieren kann
                window.location.reload();
            }
        });

        // Hoch scrollen
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})();

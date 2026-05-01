// Quiz-Logik + Score System

(function () {
    // ── Score helpers ──────────────────────────────────────────────
    function getLeaderboard() {
        return JSON.parse(localStorage.getItem('fwLeaderboard') || '{}');
    }
    function saveLeaderboard(lb) {
        localStorage.setItem('fwLeaderboard', JSON.stringify(lb));
    }
    function getCurrentUser() {
        return localStorage.getItem('fwCurrentUser') || null;
    }

    function getPending() {
        return JSON.parse(localStorage.getItem('fwPending') || '{"score":0,"completed":[]}');
    }

    // Returns true if points were newly awarded, false if already completed
    function awardPoints(objectKey) {
        const user = getCurrentUser();

        if (!user) {
            const pending = getPending();
            if (!pending.completed.includes(objectKey)) {
                pending.score += 100;
                pending.completed.push(objectKey);
                localStorage.setItem('fwPending', JSON.stringify(pending));
                return true;
            }
            return false;
        }

        const lb = getLeaderboard();
        if (!lb[user]) lb[user] = { score: 0, completed: [] };
        if (!lb[user].completed.includes(objectKey)) {
            lb[user].score += 100;
            lb[user].completed.push(objectKey);
            saveLeaderboard(lb);
            return true;
        }
        return false;
    }

    // ── Quiz logic ─────────────────────────────────────────────────
    const body = document.body;
    const correct = body.dataset.correctEpoch;
    if (!correct) return; // not a quiz page

    const fact    = body.dataset.fact;
    const name    = body.dataset.name;
    const icon    = body.dataset.icon;
    const glb     = body.dataset.glb;
    const objectKey = glb ? glb.replace('models/', '').replace('.glb', '') : null;

    const buttons   = document.querySelectorAll('.epoch-btn');
    const container = document.querySelector('.container');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const choice = btn.dataset.epoch;
            const isCorrect = choice === correct;
            const pointsAwarded = isCorrect && objectKey ? awardPoints(objectKey) : false;
            renderFeedback(isCorrect, pointsAwarded);
        });
    });

    function renderFeedback(isCorrect, pointsAwarded) {
        const headlineWord = isCorrect ? 'Gut gemacht!' : 'Nicht Gut gemacht!';
        const subtext      = isCorrect ? '' : 'Ordne das Objekt der richtigen Person zu';
        const cardClass    = isCorrect ? 'success' : 'error';
        const bigWord      = isCorrect ? 'ERFOLG!' : 'FALSCH!';
        const btnClass     = isCorrect ? 'success' : 'error';

        const errorIcon = isCorrect ? '' : `<div class="feedback-icon">${icon}</div>`;
        const message   = isCorrect
            ? `<p class="feedback-text">${fact}</p>`
            : `<p class="feedback-text">Versuche es erneut</p>`;

        let pointsHTML = '';
        if (isCorrect) {
            pointsHTML = pointsAwarded
                ? `<div class="feedback-points">+100 Punkte! ⭐</div>`
                : `<div class="feedback-points feedback-points--done">✓ Bereits abgeschlossen</div>`;
        }

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
                ${pointsHTML}
                ${message}
                <button class="btn-weiter ${btnClass}" id="weiter-btn">Weiter</button>
                <div class="feedback-avatars">${avatars}</div>
            </div>
        `;

        container.innerHTML = newHTML;

        document.getElementById('weiter-btn').addEventListener('click', () => {
            if (isCorrect) {
                window.location.href = 'objekte.html';
            } else {
                window.location.reload();
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})();


class Storm {
    constructor(beginDate, duration, name, wind, pressure) {
        this.beginDate = beginDate;
        this.duration = duration;
        this.name = name;
        this.wind = wind;
        this.pressure = pressure;
        this.category = this.getCategory();
    }

    getCategory() {
        if (this.wind >= 157) return 5;
        if (this.wind >= 130) return 4;
        if (this.wind >= 111) return 3;
        if (this.wind >= 96) return 2;
        if (this.wind >= 74) return 1;
        return 0;
    }
}

function parseHurricaneData(text) {
    const lines = text.split(/\r?\n/);
    let total = 0;
    const storms = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const data = trimmed.split(/\s+/);
        if (data.length < 10) continue;

        const year = parseInt(data[0], 10);
        const month = parseInt(data[1], 10);
        const day = parseInt(data[2], 10);
        const name = data[5];
        const wind = parseInt(data[8], 10);
        const pressure = parseInt(data[9], 10);

        if ([year, month, day, wind, pressure].some(n => Number.isNaN(n))) continue;

        total++;
        const beginDate = year * 10000 + month * 100 + day;
        const duration = 6;

        const storm = new Storm(beginDate, duration, name, wind, pressure);
        if (storm.category >= 3) {
            storms.push(storm);
        }
    }

    storms.sort((a, b) => {
        if (b.category !== a.category) return b.category - a.category;
        if (b.wind !== a.wind) return b.wind - a.wind;
        return a.beginDate - b.beginDate;
    });

    return { total, storms };
}

function render(total, storms) {
    const stats = document.getElementById('stats');
    const tbody = document.querySelector('#stormTable tbody');
    if (!stats || !tbody) return;

    stats.innerHTML = `
        <strong>Total Storm Records:</strong> ${total}<br>
        <strong>Category 3+ Records:</strong> ${storms.length}
    `;

    tbody.innerHTML = '';
    for (const storm of storms) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${storm.beginDate}</td>
            <td>${storm.duration}</td>
            <td>${storm.name}</td>
            <td>${storm.category}</td>
            <td>${storm.wind}</td>
            <td>${storm.pressure}</td>
        `;
        tbody.appendChild(tr);
    }
}

async function loadAndProcessStorms() {
    const stats = document.getElementById('stats');
    try {
        if (location.protocol === 'file:') {
            throw new Error('This page is being opened via file:// so fetch() cannot load hurricane.data. Run a local server and open http://localhost/... instead.');
        }
        const res = await fetch('hurricane.data', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to load hurricane.data (HTTP ${res.status})`);
        }
        const text = await res.text();
        const { total, storms } = parseHurricaneData(text);
        render(total, storms);
    } catch (err) {
        if (stats) {
            const msg = err instanceof Error ? err.message : String(err);
            stats.innerHTML = `<strong>Error:</strong> ${msg}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('processBtn');
    if (btn) {
        btn.addEventListener('click', loadAndProcessStorms);
    }
    loadAndProcessStorms();
});

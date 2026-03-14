const log = document.getElementById('audit-log');
const optimalbtn = document.getElementById('optimal-level');
const errorBtn = document.getElementById('error-inject');
const idealEC = 1.6, idealPH= 6.0;
const nutriArtcle= document.getElementById('nuti-article');

//event listiner
optimalbtn.addEventListener('click', function(event) {
    event.preventDefault(); /// prevent page refresh on click refresh
   optimizeSystem();
});

errorBtn.addEventListener('click', function(event) {
    event.preventDefault(); /// prevent page refresh on click refresh
   simulateDrift();
});

//Article button
nutriArtcle.addEventListener('click', function(){ 
  window.open("https://www.hannainstruments.co.uk/blog/post/102-ec-in-soil-the-complete-guide");
});

const ecChart = createGauge('ecGauge', '#d62728');
const phChart = createGauge('phGauge', '#d62728');

//logging
function addLog(message, color = "#8DC957") {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="timestamp">[${time}]</span> <span style="color: ${color}">${message}</span>`;
    log.prepend(entry);
}

//create the Guage
function createGauge(id, color) {
    return new Chart(document.getElementById(id).getContext('2d'), {
        type: 'doughnut',
        data: { datasets: [{ data: [1, 1], backgroundColor: [color, '#e9ecef'], borderWidth: 0, circumference: 180, rotation: 270 }] },
        options: { cutout: '60%', plugins: { legend: { display: false } }, animation: { duration: 1000 } }
    });
}

//upadte the guqge
function updateSystem(ec, ph, healthy) {
    const color = healthy ? '#2ca02c' : '#d62728';
    ecChart.data.datasets[0].data = [ec, 4.0 - ec];
    ecChart.data.datasets[0].backgroundColor[0] = color;
    ecChart.update();
    phChart.data.datasets[0].data = [ph, 14 - ph];
    phChart.data.datasets[0].backgroundColor[0] = color;
    phChart.update();

    document.getElementById('ecValue').innerText = ec.toFixed(1);
    document.getElementById('phValue').innerText = ph.toFixed(1);
    document.getElementById('ecValue').style.color = color;
    document.getElementById('phValue').style.color = color;
}


function optimizeSystem() {
    updateSystem(idealEC, idealPH, true);
    document.getElementById('statusLabel').innerText = "✅ SYSTEM STATUS: OPTIMAL";
    document.getElementById('statusLabel').style.color = "#2ca02c";
    addLog("AI EXECUTION: pH Up injected (KOH). Fresh water dilution active.");
    addLog("NPK RATIO REBALANCED: 10-10-10 Target Reached.", "#fff");
}

function simulateDrift() {
    updateSystem(2.8, 4.2, false);
    document.getElementById('statusLabel').innerText = "⚠️ SYSTEM ALERT: HIGH EC & LOW pH DETECTED";
    document.getElementById('statusLabel').style.color = "#d62728";
    addLog("CRITICAL ERROR: Sensor drift detected (5%).", "#ff4444");
    addLog("DANGER: EC exceeds 2.5mS/cm. Root toxicity possible.", "#ff4444");
}

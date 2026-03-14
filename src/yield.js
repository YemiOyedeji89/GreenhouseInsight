
Chart.register(ChartDataLabels); ///registering the label to be visible on the chart
import MyUtils from './utils.js';
const { loadCSV, readCSVToJson, filterByCrop,getZoneAverages} = MyUtils;
const fileCsv = "./utilities/crop_data.csv"

//Article button
document.getElementById('yield-article').addEventListener('click', function(){ 
  window.open("https://datacalculus.com/en/blog/farming-ranching-and-forestry/greenhouse-manager/crop-yield-prediction-for-greenhouse-managers-in-farming-ranching-and-forestry");
});

async function renderGreenhouseAnalytics() {
    const rawData = await loadCSV(fileCsv);
    const data = readCSVToJson(rawData);

    // Analyze Maize performance across the insight Greenhouse Zones
    const maizeData = filterByCrop(data, 'Maize');
    const { labels, averages } = getZoneAverages(maizeData);

    // Identify the best performing zone
    const maxYield = Math.max(...averages);
    const bestZone = labels[averages.indexOf(maxYield.toString())];

    //displaying chart
    document.getElementById('analysis-text').innerText = 
        `Zone ${bestZone} is performing better than others with ${maxYield} tons/ha. I will suggest adjusting the Irrigation in other zones to match ${bestZone}'s setup.`;

    // Render the Chart
    const ctx = document.getElementById('zoneChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Yield per Region',
                data: averages,
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Maize Yield by Greenhouse Region',  
                    font: { size: 18 }
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Insight GreenHouse Region', 
                        color: '#666',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Avg Yield (tons/ha)',
                        color: '#666',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

renderGreenhouseAnalytics();
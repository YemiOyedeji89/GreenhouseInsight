
import MyUtils from './utils.js';
Chart.register(ChartDataLabels); ///registering the label to be visible on the chart
const { loadCSV, readCSVToJson } = MyUtils;
const irriCumData = "./utilities/cumulative_waste.csv";
const irriCsvdata = "./utilities/irrigation_data.csv";
const irrCumDiv = document.getElementById("myChart-irrCum");
const irrData = document.getElementById("myChart-irrData");

async function renderIrriData() {
    try {
        const cumData = await readCSVToJson( await loadCSV(irriCumData));
        const irrMthnData = await readCSVToJson(await loadCSV(irriCsvdata));
        const mthnLabel = irrMthnData.map(mth => mth.Month);
        const quartLabel = cumData.map(per => per.Period.replace("�", "-"));
        const optIrriData = irrMthnData.map(opData => parseFloat(opData.Optimal_irrigation));
        const badIrriData = irrMthnData.map(bd =>parseFloat(bd.Bad_irrigation));
        const wastedWater =cumData.map(waste => parseFloat(waste.Cumulative_Waste));
        
        //Monthly chart of water usage
        new Chart(irrData,{
            type: "line",
            data: {
                labels: mthnLabel,
                datasets: [{ 
                data:optIrriData,
                borderColor: "green",
                pointRadius: 2,
                tension: 0.4,
                label:"Good"
                },  { 
                data: badIrriData,
                borderColor: "red",
                pointRadius: 2,
                tension: 0.4,
                label: "Bad"
                }]
            },
           options: {
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: "Monthly Optimal Irrigation & Bad Irrigation(L)",
                        font: { size: 18 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months (2025)', 
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
                            text: 'Litres (L)',
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

        //pie chart
        const mnthoulour = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9"];
        new Chart(irrCumDiv, {
            type: "pie",
            data: {
                labels: quartLabel,
                datasets: [{
                backgroundColor: mnthoulour,
                data: wastedWater
                }]
            },
            options: {
                plugins: {
                    legend: {display: true},
                    title: {
                    display: true,
                    text: "Cumulative Water Wastage Due to 5% Sensor Error(Jan-Dec 2025) ",
                    font: {size:18}
                    },
                    datalabels: {
                        color: '#000',      //text color
                        anchor: 'end',      // Position at the edge
                        align: 'start',     // Align slightly inward
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value) => {
                            const totalLiters = wastedWater.reduce((sum, current) => sum + current, 0);
                            if (totalLiters === 0) return "0%";
                            const percentage = ((value / totalLiters) * 100).toFixed(1) + "%"; // 1 dp
                            return `${value}L\n(${percentage})`;
                        }
                    }   
                }     
            }
        }); 
    } catch (error) {
        console.error("Could not load the CSV file:", error);
        return null;
    }
}
renderIrriData();

//Article button
const irriArticle = document.getElementById("irr-article");
irriArticle.addEventListener('click', function(){ 
  window.open("https://www.source.ag/products/irrigation-control");
})
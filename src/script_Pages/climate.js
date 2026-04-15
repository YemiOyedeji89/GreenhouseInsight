import MyUtils from './utils.js';
Chart.register(ChartDataLabels); ///registering the label to be visible on the chart
const { loadCSV, readCSVToJson, calculateMonthlyAverages} = MyUtils;
const fileCsv = "./utilities/greenHouse_weather_2025_data.csv"

//Generate chart
async function initClimateChart() {
  // Get the raw text
  const rawCSV = await loadCSV(fileCsv);

  if (rawCSV) {
    //Convert to JSON
    const climateData = readCSVToJson(rawCSV);
    
    //extract each data row
    const labelDatetime = climateData.map(row => row.datetime);
    const goodTempVal = climateData.map(tempr => parseFloat(tempr.temp));
    const hummidVal = climateData.map(humid => parseFloat(humid.humidity));
    const coTwo = climateData.map(co => parseFloat(co.CO2));
    const solar = climateData.map(sol => parseFloat(sol.solarradiation));
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const uniqueMths = [...new Set(labelDatetime.map(date => date.substring(3)))];
    
    const mthAvgTem= calculateMonthlyAverages(goodTempVal, monthDays );
    const mthAvgTemBad = mthAvgTem.map(row =>parseFloat(row*1.05).toFixed(2) ); // calculating 5% deviation 
    const mthAvgHumid = calculateMonthlyAverages(hummidVal,monthDays);
    const mthAvgHumidBad = mthAvgHumid.map(row =>parseFloat(row*1.05).toFixed(2) ); // calculating 5% deviation 
    const mthAvgSolar = calculateMonthlyAverages(solar,monthDays);
    const mthAvgSolarBad = mthAvgSolar.map(row =>parseFloat(row*1.05).toFixed(2) ); // calculating 5% deviation 
    const mthAvgCoVal = calculateMonthlyAverages(coTwo,monthDays);
    const mthAvgCoBad = mthAvgCoVal.map(row =>parseFloat(row*1.05).toFixed(2) ); // calculating 5% deviation 

   //humidity chart populate
   const ctx = document.getElementById('myChart-humidity');
    new Chart(ctx, {
      type: "line",
      data: {
        labels: uniqueMths,
        datasets: [{ 
          data:mthAvgHumid,
          borderColor: "green",
          pointRadius: 2,
          tension: 0.4,
          label:"Good"
        },  { 
          data: mthAvgHumidBad,
          borderColor: "red",
          pointRadius: 2,
          tension: 0.4,
          label: "Bad"
        }]
      },
      options: {
        plugins: {
          legend: {display:true,
            labels:{
              boxWidth: 12,   
              boxHeight: 12
            }
          },
          title: {
            display: true,
            text: "Avg Humidity From Good Sensor Vs 5% Error Sensor Data",
            font: {size:16}
          },
          responsive: true,
          maintainAspectRatio: false,
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
              text: 'Average Humidity (%)',
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

    //temperature chart
    const ctx_temp = document.getElementById('myChart-temp');
    new Chart(ctx_temp, {
      type: "bar",
      data: {
        labels: uniqueMths,
        datasets: [{ 
          data: mthAvgTem,
          backgroundColor: "green",
          pointRadius: 2,
          tension: 0.4,
          label: "Good"
         },  
        { 
          data: mthAvgTemBad,
          backgroundColor: "red",
          pointRadius: 2,
          tension: 0.1,
          borderWidth: 1,
          label: "Bad"
        }
        ]
      },
      options: {
      plugins: {
          legend: {display:true,
            labels:{
              boxWidth: 12,   
              boxHeight: 12
            }
          },
          title: {
            display: true,
            text: "Avg Optimal Temperature Vs 5% Error Sensor Data",
            font: {size:16}
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
              text: 'Average Temperature (°C)',
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

    ///illumi
    const ctx_light = document.getElementById('myChart-light');
    new Chart(ctx_light, {
      type: "line",
      data: {
        labels: uniqueMths,
        datasets: [{ 
          data: mthAvgSolar,
          borderColor: "green",
          pointRadius: 2,
          tension: 0.4,
          label:"Good"
        },  { 
          data: mthAvgSolarBad,
          borderColor: "red",
          pointRadius: 2,
          tension: 0.4,
          label:"Bad"
        }]
      },
      options: {
        plugins: {
          legend: {display:true,
            labels:{
              boxWidth: 12,   
              boxHeight: 12
            }
          },
          title: {
            display: true,
            text: "Avg Indoor Solar Light Vs 5% Error Sensor Data",
            font: {size:16}
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
              text: 'Average Solar Light (mol/m^2/month)',
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

    ///Co2
     const ctx_wind = document.getElementById('myChart-wind');
        new Chart(ctx_wind, {
      type: "line",
      data: {
        labels: uniqueMths,
        datasets: [{ 
          data: mthAvgCoVal,
          borderColor: "green",
          pointRadius: 2,
          tension: 0.4,
          label:"Good"
          
        },  { 
          data: mthAvgCoBad,
          borderColor: "red",
          pointRadius: 2,
          tension: 0.4,
          label:"Bad"
        }]
      },
      options: {
        plugins: {
          legend: {display:true,
            labels:{
              boxWidth: 12,   
              boxHeight: 12
            }

          },
          title: {
            display: true,
            text: "Avg CO2 measured Vs 5% Error Sensor Data",
            font: {size:16}
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
              text: 'Average CO2 (ppm)',
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
  }else{
    console.log("couldn't load csv file");
  }
}
initClimateChart();

//Article button
const climateBtn = document.getElementById("climate-article");
climateBtn.addEventListener('click', function(){ 
  window.open("https://intellias.com/artificial-intelligence-in-agriculture/");
});
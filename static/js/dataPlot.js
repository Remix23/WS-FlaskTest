

const currentChart = 'Temperature'
const ctx = document.getElementById('mychart').getContext('2d')
const charts = []

function chartBy(obj) {
    id = obj.id;
    const sortBytext = document.getElementById('chart-by');
    sortBytext.innerText = id;
    let ys = [];
    let xy = [];
    dataFromFlask.forEach(element => {
        ys.push(element[id]);
        xy.push(element['Received']);
    });
    let titleAdd;
    switch (id){
        case 'Temperature':
            titleAdd = ' [°C]';
            break
        case 'Presure':
            titleAdd = ' [hPa]';
            break
        case 'Humidity':
            titleAdd = ' [%]';
            break
    };
    //document.getElementById('mychart').setAttribute('width', ys.length * 70)
    //document.getElementById('mychart').setAttribute('height', ys.length * 30)
    if (xy.length > 25) {
        xy = xy.slice(0, 25)
        ys = ys.slice(0, 25)
    }
    return chartIt(ctx, id, ys, xy, titleAdd);
}

function chartIt(ctx, currentChart, data, labels, titleAdd) {
    if (charts.length > 0) {
        charts.pop(0).destroy()
    }
    charts.push(new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: currentChart + titleAdd,
                data: data,
                backgroundColor: [ // kolor kropek
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [ //kolor lini 
                    'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            bezierCurve : false,
        }
    }));
    console.log(charts)
    return charts
}

chartBy(document.getElementById(currentChart))
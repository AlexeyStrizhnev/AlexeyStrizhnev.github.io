let iteration = 1
let labels = []
let sin_points = []
let sin_rnd_points = []
let average_points = []
let median_points = []
let disp_points = []

function createPoints() {
    let new_point = Math.floor((Math.sin(Math.PI * iteration / 180) + 1) * 50)
    let new_point_with_noise = new_point + randomInteger(-5, 5)
    let proc = processing(new_point_with_noise)

    labels.push(' ')
    sin_points.push(new_point)
    sin_rnd_points.push(new_point_with_noise)
    average_points.push(proc.average)
    median_points.push(proc.median)
    disp_points.push(proc.dispersion)

    iteration++
    if (labels.length > 360) {
        labels.shift()
        sin_points.shift()
        sin_rnd_points.shift()
        average_points.shift()
        median_points.shift()
        disp_points.shift()
    }
}

for (let i = 1; i < 360; i++) {
    createPoints()
}

const ctx = document.getElementById('Charts');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'sin',
            data: sin_points,
            borderWidth: 1,
        },
        {
            label: 'sin + noise',
            data: sin_rnd_points,
            borderWidth: 1,

        },
        {
            label: 'average',
            data: average_points,
            borderWidth: 1,

        },
        {
            label: 'median',
            data: median_points,
            borderWidth: 1,

        },
        {
            label: 'dispersion',
            data: disp_points,
            borderWidth: 1,

        },
        ]
    },
    options: {
        animations: false,
        radius: 0
    }
});

setInterval(function () {
    createPoints()
    chart.update()
}, 100)

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

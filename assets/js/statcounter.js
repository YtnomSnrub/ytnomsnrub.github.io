let haikuChart = null;
let serverChart = null;

var statIntervals = [];
var chartIntervals = [];

const chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false,
                stepSize: 1000
            }
        }]
    },
    tooltips: {
        enabled: true,
        mode: "index",
        intersect: false
    }
};

$(function () {
    setupStats();
});

function setupStats() {
    while (statIntervals.length > 0) {
        clearInterval(statIntervals.pop());
    }

    // Setup stat counters
    $(".stat-counter").each(function () {
        let statField = $(this);
        updateStatField(statField);
        let loopTime = statField.data("loop-time");
        if (loopTime !== undefined) {
            statIntervals.push(setInterval(function () {
                updateStatField(statField);
            }, loopTime));
        }
    });

    // Setup the charts
    setupCharts();
}

function updateStatField(statField) {
    let getString = "";
    let apiString = statField.data("api");
    let useDbl = statField.data("dbl") == true;
    let isChange = statField.data("change") == true;

    if (apiString === undefined) {
        return;
    }

    if (useDbl) {
        getString = "https://discordbots.org/api/bots/372175794895585280/stats";
    } else {
        getString = "https://haikubotapi.apphb.com/api/" + apiString;
    }

    $.get(
        getString,
        function (data) {
            let dataValue = useDbl ? data[apiString] : data;
            let statValue = numberWithCommas(dataValue);
            // Handle change values
            if (isChange) {
                if (dataValue > 0) {
                    statValue = "+" + statValue;
                    statField.removeClass("stat-change-negative");
                    statField.addClass("stat-change-positive");
                } else if (dataValue < 0) {
                    statField.removeClass("stat-change-positive");
                    statField.addClass("stat-change-negative");
                }
            }

            setStatFieldValue(statField, statValue);

            // Update weekly haikus
            if (apiString === "haikucountlastweek") {
                let haikusDay = data / 7;
                let haikusHour = haikusDay / 24;
                let haikusMinute = haikusHour / 60;
                let haikusSecond = haikusMinute / 60;
                setStatFieldValue($(".stat-counter-haikus-day"), haikusDay.toFixed(0));
                setStatFieldValue($(".stat-counter-haikus-hour"), haikusHour.toFixed(0));
                setStatFieldValue($(".stat-counter-haikus-minute"), haikusMinute.toFixed(2));
                setStatFieldValue($(".stat-counter-haikus-second"), haikusSecond.toFixed(2));
            }
        }
    ).fail(function () {
        console.log("Failed to get resource, retrying...");
        setTimeout(function () {
            updateStatField(statField);
        }, 5000);
    });
}

function setStatFieldValue(statField, statValue) {
    if (statField.html() != statValue) {
        statField.addClass("hidden");
        setTimeout(function () {
            statField.removeClass("loading");
            statField.html(statValue);
            statField.removeClass("hidden");
        }, 250);
    }
}

const numberWithCommas = (x) => {
    if (x === undefined) {
        return "Error";
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setupCharts() {
    while (chartIntervals.length > 0) {
        clearInterval(chartIntervals.pop());
    }

    // Setup charts
    setupHaikuChart();
    setupServerChart();
    // Update charts on loop
    chartIntervals.push(setInterval(function () {
        updateHaikuChartData();
        updateServerChartData();
    }, 600000));
}

function setupHaikuChart() {
    let haikuChartCanvas = document.getElementById("HaikuChart").getContext('2d');
    // Setup the chart
    haikuChart = new Chart(haikuChartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Haikus',
                backgroundColor: 'rgba(255, 204, 77, 0.5)',
                borderColor: '#ffcc4d',
                pointRadius: 4,
                pointHoverBackgroundColor: '#ffcc4d',
                pointHoverBorderColor: '#ffcc4d',
                pointHoverRadius: 6,
                borderWidth: 2
            }]
        },
        options: chartOptions
    });

    updateHaikuChartData();
}

function updateHaikuChartData() {
    // Get haiku counts for past week
    let haikuCounts = [];
    let haikuLabels = [];
    for (let i = 0; i < 7; ++i) {
        // Get the data from the api
        getString = "https://haikubotapi.apphb.com/api/haikucount?day=" + (7 - i);
        $.ajax({
            url: getString,
            async: false,
            success: function (data) {
                if (data > 0) {
                    // Add the label
                    haikuLabels.push(7 - i);
                    // Add the data
                    haikuCounts.push(data);
                }
            },
            error: function () {
                console.log("Failed to get daily resource, retrying...");
            }
        });
    }

    // Update the chart
    haikuChart.data.datasets[0].data = haikuCounts;
    haikuChart.data.labels = haikuLabels;
    haikuChart.update();
}

function setupServerChart() {
    let serverChartCanvas = document.getElementById("ServerChart").getContext('2d');
    // Setup the chart
    serverChart = new Chart(serverChartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Servers',
                backgroundColor: [
                    '#2e2f3477'
                ],
                borderColor: [
                    '#2e2f34'
                ],
                pointHoverBackgroundColor: [
                    '#2e2f34'
                ],
                borderWidth: 1
            }]
        },
        options: chartOptions
    });

    updateServerChartData();
}

function updateServerChartData() {
    // Get haiku counts for past week
    let serverCounts = [];
    let serverLabels = [];
    for (let i = 0; i < 7; ++i) {
        // Get the data from the api
        getString = "https://haikubotapi.apphb.com/api/servercount?day=" + (7 - i);
        $.ajax({
            url: getString,
            async: false,
            success: function (data) {
                if (data > 0) {
                    // Add the label
                    serverLabels.push(7 - i);
                    // Add the data
                    serverCounts.push(data);
                }
            },
            error: function () {
                console.log("Failed to get daily resource, retrying...");
            }
        });
    }

    // Update the chart
    serverChart.data.datasets[0].data = serverCounts;
    serverChart.data.labels = serverLabels;
    serverChart.update();
}
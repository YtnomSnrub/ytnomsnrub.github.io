let haikuChart = null;
let serverChart = null;

var statIntervals = [];
var chartIntervals = [];

const WEEKDAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

const chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false,
                userCallback: function (value, index, values) {
                    return numberWithCommas(value);
                }
            },
            afterFit: function (scaleInstance) {
                scaleInstance.width = 100;
            }
        }]
    },
    tooltips: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(46, 47, 52, 0.8)",
        titleFontColor: "rgba(255, 255, 255, 1)",
        bodyFontColor: "rgba(255, 255, 255, 1)",
        footerFontColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(46, 47, 52, 0.5)",
        borderWidth: 2,
        displayColors: false,
        callbacks: {
            label: function (tooltipItem, data) {
                let value = data.datasets[0].data[tooltipItem.index];
                return numberWithCommas(value);
            }
        }
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

    // Check charts
    if (!$("#HaikuChart").length || !$("#ServerChart").length) {
        return;
    }

    // Setup fonts
    Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0.8)";
    Chart.defaults.global.defaultFontFamily = "'Work Sans', 'Arial', sans-serif";
    Chart.defaults.global.defaultFontStyle = "400";
    Chart.defaults.global.defaultFontSize = 14;

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
                borderWidth: 2,
                lineTension: 0
            }]
        },
        options: chartOptions
    });

    updateHaikuChartData();
}

function updateHaikuChartData() {
    // Get haiku counts for past week
    let haikuCounts = new Array(7).fill(0);
    let haikuLabels = new Array(7).fill(0);
    // Update the chart
    haikuChart.data.datasets[0].data = haikuCounts;
    haikuChart.data.labels = haikuLabels;
    haikuChart.update();

    // Add data to the chart
    for (let i = 0; i < 7; ++i) {
        // Get the data from the api
        getString = "https://haikubotapi.apphb.com/api/haikucount?day=" + (7 - i);
        $.ajax({
            url: getString,
            success: function (data) {
                // Get the day
                let labelDate = new Date();
                labelDate.setDate(labelDate.getUTCDate() - (6 - i));
                // Add the label
                haikuLabels[i] = WEEKDAYS[labelDate.getUTCDay()];
                // Add the data
                haikuCounts[i] = data;
                // Update the chart
                haikuChart.data.datasets[0].data = haikuCounts;
                haikuChart.data.labels = haikuLabels;
                haikuChart.update();
            },
            error: function () {
                console.log("Failed to get daily resource, retrying...");
            }
        });
    }
}

function setupServerChart() {
    let serverChartCanvas = document.getElementById("ServerChart").getContext('2d');
    // Setup the chart
    serverChart = new Chart(serverChartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Servers',
                backgroundColor: 'rgba(46, 47, 52, 0.5)',
                borderColor: '#2e2f34',
                pointRadius: 4,
                pointHoverBackgroundColor: '#2e2f34',
                pointHoverBorderColor: '#2e2f34',
                pointHoverRadius: 6,
                borderWidth: 2,
                lineTension: 0
            }]
        },
        options: chartOptions
    });

    updateServerChartData();
}

function updateServerChartData() {
    // Get haiku counts for past week
    let serverCounts = new Array(7).fill(0);
    let serverLabels = new Array(7).fill(0);
    // Update the chart
    serverChart.data.datasets[0].data = serverCounts;
    serverChart.data.labels = serverLabels;
    serverChart.update();

    // Add data to the chart
    for (let i = 0; i < 7; ++i) {
        // Get the data from the api
        getString = "https://haikubotapi.apphb.com/api/servercount?day=" + (7 - i);
        $.ajax({
            url: getString,
            success: function (data) {
                // Get the day
                let labelDate = new Date();
                labelDate.setDate(labelDate.getUTCDate() - (6 - i));
                // Add the label
                serverLabels[i] = WEEKDAYS[labelDate.getUTCDay()];
                // Add the data
                serverCounts[i] = data;
                // Update the chart
                serverChart.data.datasets[0].data = serverCounts;
                serverChart.data.labels = serverLabels;
                serverChart.update();
            },
            error: function () {
                console.log("Failed to get daily resource, retrying...");
            }
        });
    }
}
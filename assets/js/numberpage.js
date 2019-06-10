var statIntervals = [];
var chartIntervals = [];

const LINE_TENSION = 0.2;

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
                scaleInstance.width = 80;
            }
        }],
        xAxes: [{
            type: 'time',
            time: {
                displayFormats: {
                    hour: 'ddd, h a',
                    day: 'MMM D'
                }
            }
        }]
    },
    tooltips: {
        enabled: true,
        mode: "index",
        intersect: false,
        // Background
        backgroundColor: "rgba(46, 47, 52, 0.8)",
        // Font colors
        titleFontColor: "rgba(255, 255, 255, 1)",
        titleFontSize: 14,
        bodyFontColor: "rgba(255, 255, 255, 1)",
        bodyFontSize: 14,
        footerFontColor: "rgba(255, 255, 255, 1)",
        footerFontSize: 12,
        // Border
        borderColor: "rgba(46, 47, 52, 1)",
        borderWidth: 3,
        // Text
        displayColors: false
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        onClick: (e) => e.stopPropagation()
    }
};

$(document).on("ready", function () {
    setupStats();
});

$(document).on("transition", function () {
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

    // Setup the datetime updaters
    $(".time-utc").each(function () {
        let timeField = $(this);
        statIntervals.push(setInterval(function () {
            timeField.html("<b>Current UTC:</b> " + moment.utc().format("MMM D, hh:mm:ss a"));
        }, 1000));
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

    $.get(getString)
        .done(function (data) {
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
                setStatFieldValue($(".stat-counter-haikus-day"), numberWithCommas(haikusDay.toFixed(0)));
                setStatFieldValue($(".stat-counter-haikus-hour"), numberWithCommas(haikusHour.toFixed(0)));
                setStatFieldValue($(".stat-counter-haikus-minute"), numberWithCommas(haikusMinute.toFixed(2)));
                setStatFieldValue($(".stat-counter-haikus-second"), numberWithCommas(haikusSecond.toFixed(2)));
            }

            // Update weekly messages
            if (apiString === "messagecountlastweek") {
                let messagesDay = data / 7;
                let messagesHour = messagesDay / 24;
                let messagesMinute = messagesHour / 60;
                let messagesSecond = messagesMinute / 60;
                setStatFieldValue($(".stat-counter-messages-day"), numberWithCommas(messagesDay.toFixed(0)));
                setStatFieldValue($(".stat-counter-messages-hour"), numberWithCommas(messagesHour.toFixed(0)));
                setStatFieldValue($(".stat-counter-messages-minute"), numberWithCommas(messagesMinute.toFixed(0)));
                setStatFieldValue($(".stat-counter-messages-second"), numberWithCommas(messagesSecond.toFixed(0)));
            }

            // Update messages per haiku
            if (apiString === "haikucount" || apiString === "messagecount") {
                setTimeout(function () {
                    // Get stat counters
                    let $messageCounter = $(".stat-counter[data-api=\"messagecount\"]");
                    let $haikuCounter = $(".stat-counter[data-api=\"haikucount\"]");
                    // Check stat counters
                    if ($messageCounter.length && $haikuCounter.length) {
                        let messageCount = parseFloat($messageCounter.html().split(",").join(""));
                        let haikuCount = parseFloat($haikuCounter.html().split(",").join(""));
                        let messagesHaiku = messageCount / haikuCount;
                        if (!isNaN(messagesHaiku)) {
                            setStatFieldValue($(".stat-counter-messages-haiku"), "1 : " + messagesHaiku.toFixed(0));
                        }
                    }
                }, 500);
            }
        })
        .fail(function () {
            console.log("Failed to get resource, retrying...");
            setTimeout(function () {
                updateStatField(statField);
            }, 5000);
        });
}

function setStatFieldValue(statField, statValue) {
    // Find the delay
    let statDelay = statField.prev().is("td") ? 125 : 250;
    // Change the value
    if (statField.html() != statValue) {
        statField.addClass("hidden");
        setTimeout(function () {
            let prevWidth = statField.width();
            statField.removeClass("loading");
            statField.html(statValue);
            // Animate width
            if (statField.hasClass("stat-large")) {
                let newWidth = statField.width();
                if (prevWidth != newWidth) {
                    statField.width(prevWidth);
                    statField.animate({
                        width: newWidth
                    }, 250, function () {
                        statField.removeClass("hidden");
                    });
                } else {
                    statField.removeClass("hidden");
                }
            } else {
                statField.removeClass("hidden");
            }
        }, statDelay);
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

    // Setup fonts
    Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0.8)";
    Chart.defaults.global.defaultFontFamily = "'Nunito', 'Arial', sans-serif";
    Chart.defaults.global.defaultFontStyle = "400";
    Chart.defaults.global.defaultFontSize = 14;

    // Setup charts
    let liveCharts = setupLiveCharts();
    let dayCharts = setupDayCharts();
    let hourCharts = setupHourCharts();
    // Update charts on loop
    chartIntervals.push(setInterval(function () {
        updateChartsData(dayCharts, "daystats");
        updateChartsData(hourCharts, "hourstats");
    }, 300000));

    // Update live charts
    liveCharts.forEach(chart => {
        const LIVE_MAX_POINTS = 400;
        let chartLabels = [];
        let chartCounts = [];

        function updateChart() {
            // Get the data from the api
            getString = "https://haikubotapi.apphb.com/api/" + chart.htmlData.apiEndpoint;
            $.ajax({
                url: getString,
                success: function (data) {
                    chartLabels.push(moment(new Date()));
                    chartCounts.push(data);
                    // Cull earlier entries
                    chartLabels = chartLabels.slice(-LIVE_MAX_POINTS);
                    chartCounts = chartCounts.slice(-LIVE_MAX_POINTS);
                    // Update the chart
                    chart.data.datasets[0].data = chartCounts;
                    chart.data.labels = chartLabels;
                    chart.update();
                }
            });
        }

        updateChart();
        // Update live charts
        chartIntervals.push(setInterval(function () {
            updateChart();
        }, chart.htmlData.updateFrequency));
    });
}

function setupLiveCharts() {
    // Set tooltips callback
    let liveCallbacks = {
        title: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("h:mm:ss a");
        },
        afterTitle: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("MMMM D");
        },
        label: function (tooltipItem, data) {
            let value = data.datasets[0].data[tooltipItem.index];
            return numberWithCommas(value) + " " + data.datasets[0].label.toLowerCase();
        }
    };

    let liveCharts = [];
    $(".stat-graph-live").each(function () {
        let statGraph = this;
        let statChart = createChart(statGraph);
        // Set scale options
        statChart.options.scales.xAxes[0].time.unit = 'minute';
        // Set tooltips
        statChart.options.tooltips.callbacks = liveCallbacks;
        // Add to charts
        liveCharts.push(statChart);
    });

    return liveCharts;
}

function setupDayCharts() {
    // Set tooltips callback
    let dayCallbacks = {
        title: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("dddd");
        },
        afterTitle: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("MMMM D");
        },
        label: function (tooltipItem, data) {
            let value = data.datasets[0].data[tooltipItem.index];
            return numberWithCommas(value) + " " + data.datasets[0].label.toLowerCase();
        }
    };

    let dayCharts = [];
    $(".stat-graph-day").each(function () {
        let statGraph = this;
        let statChart = createChart(statGraph);
        // Set scale options
        statChart.options.scales.xAxes[0].time.unit = 'day';
        // Set tooltips
        statChart.options.tooltips.callbacks = dayCallbacks;
        // Add to charts
        dayCharts.push(statChart);
    });

    updateChartsData(dayCharts, "daystats");
    return dayCharts;
}

function setupHourCharts() {
    // Set tooltips callback
    let hourCallbacks = {
        beforeTitle: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("MMMM D");
        },
        title: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            let prevValue = value;
            // Get prev value
            let index = tooltipItem[0].index;
            if (index > 0) {
                prevValue = moment(data.labels[index - 1]);
            } else {
                prevValue = moment(value).add(-moment(data.labels[index + 1]).add(-moment(value)));
            }

            return prevValue.format("h a") + " - " + value.format("h a");
        },
        label: function (tooltipItem, data) {
            let value = data.datasets[0].data[tooltipItem.index];
            return numberWithCommas(value) + " " + data.datasets[0].label.toLowerCase();
        }
    };

    let hourCharts = [];
    $(".stat-graph-hour").each(function () {
        let statGraph = this;
        let statChart = createChart(statGraph);
        // Set x-axis format
        statChart.options.scales.xAxes[0].time.unit = 'day';
        // Set y-axis to start at 0 for haikus
        statChart.options.scales.yAxes[0].ticks.beginAtZero = true;
        statChart.options.scales.yAxes[0].ticks.beginAtZero = true;
        // Set tooltips
        statChart.options.tooltips.callbacks = hourCallbacks;
        // Add to charts
        hourCharts.push(statChart);
    });

    // Update charts
    updateChartsData(hourCharts, "hourstats");
    return hourCharts;
}

function createChart(statGraph) {
    let $statGraph = $(statGraph);
    let statGraphCanvas = statGraph.getContext('2d');

    let tension = $statGraph.attr("data-tensionless") ? 0 : LINE_TENSION;
    let statChart = new Chart(statGraphCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: $statGraph.attr("data-label"),
                backgroundColor: $statGraph.attr("data-color") + "77",
                borderColor: $statGraph.attr("data-color"),
                pointRadius: 0,
                pointHoverBackgroundColor: $statGraph.attr("data-color"),
                pointHoverBorderColor: $statGraph.attr("data-color"),
                pointHoverRadius: 0,
                borderWidth: 3,
                lineTension: tension
            }]
        },
        options: chartOptions
    });

    // Set internal data
    statChart.htmlData = {
        column: $statGraph.attr("data-column"),
        columnTime: $statGraph.attr("data-column-time"),
        apiEndpoint: $statGraph.attr("data-endpoint"),
        updateFrequency: $statGraph.attr("data-loop-time")
    };

    // Set default data
    statChart.data.datasets[0].data = [];
    statChart.data.labels = [];
    statChart.update();
    return statChart;
}

function updateChartsData(charts, apiEndpoint) {
    // Get the data from the api
    getString = "https://haikubotapi.apphb.com/api/" + apiEndpoint;
    $.ajax({
        url: getString,
        success: function (data) {
            charts.forEach(statChart => {
                let statLabels = [];
                let statCounts = [];
                for (let i = 0; i < data.length; ++i) {
                    let count = data[i][statChart.htmlData.column];
                    let time = data[i][statChart.htmlData.columnTime];
                    if (count >= 0) {
                        // Add the label
                        statLabels.push(moment(time));
                        // Add the data
                        statCounts.push(count);
                    }
                }

                // Update the chart
                statChart.data.datasets[0].data = statCounts;
                statChart.data.labels = statLabels;
                statChart.update();
            });
        }
    });
}

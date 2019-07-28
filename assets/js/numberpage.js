let statCounters = {};
let statIntervals = [];
let chartIntervals = [];

const LINE_TENSION = 0.2;
const STAT_Y_PADDING = 0.1;

const CHART_OPTIONS = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false,
                userCallback: function (value, index, values) {
                    return numberWithCommas(value);
                }
            },
            afterFit: function (scaleInstance) {
                scaleInstance.width = 120;
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
        mode: "nearest",
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
        onClick: function (e) {
            e.stopPropagation();
        }
    }
};

$(document).on("transition", function () {
    setupStats();
});

function setupStats() {
    // Clear stat counters
    statCounters = {};

    // Clear stat intervals
    while (statIntervals.length > 0) {
        clearInterval(statIntervals.pop());
    }

    // Clear chart intervals
    while (chartIntervals.length > 0) {
        clearInterval(chartIntervals.pop());
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
    let loopTime = statField.data("loop-time");
    let isChange = statField.data("change") == true;

    if (apiString === undefined) {
        return;
    }

    // Use haikubot api url
    getString = "https://haikubotapi.apphb.com/api/" + apiString;
    // Make request
    $.get(getString)
        .done(function (data) {
            let statValue = numberWithCommas(data);
            // Handle change values
            if (isChange) {
                if (data > 0) {
                    statValue = "+" + statValue;
                    statField.removeClass("stat-change-negative");
                    statField.addClass("stat-change-positive");
                } else if (data < 0) {
                    statField.removeClass("stat-change-positive");
                    statField.addClass("stat-change-negative");
                }
            }

            // Handle countup
            let statCountup = statField.data("countup");
            if (statCountup) {
                let statId = statField.attr("id");
                if (statId) {
                    let statNumber = parseInt(data);
                    if (!statCounters[statId] && loopTime) {
                        statField.addClass("hidden");
                        setTimeout(function () {
                            statField.removeClass("hidden");
                            statField.removeClass("loading");
                            let options = {
                                duration: loopTime / 1000,
                                startVal: statNumber,
                                // Easing
                                useEasing: true,
                                easingFn: function (t, b, c, d) {
                                    return c * t / d + b;
                                }
                            };

                            statCounters[statId] = new CountUp(statId, statNumber, options);
                            statCounters[statId].start();
                        }, 500);
                    } else if (statCounters[statId]) {
                        statField.removeClass("hidden");
                        statField.removeClass("loading");
                        statCounters[statId].update(statNumber);
                    }
                } else {
                    console.error("'id' attribute must be set for stat field with countup attribute");
                }
            } else {
                setStatFieldValue(statField, statValue);
            }

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

function numberWithCommas(x) {
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
    liveCharts.forEach(function (chart) {
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
        options: CHART_OPTIONS
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

function findMin(arr) {
    let min = null;
    arr.forEach(function (x) {
        if (min === null || x < min) {
            min = x;
        }
    });

    return min;
}

function findMax(arr) {
    let max = null;
    arr.forEach(function (x) {
        if (max === null || x > max) {
            max = x;
        }
    });

    return max;
}

function updateChartsData(charts, apiEndpoint) {
    // Get the data from the api
    getString = "https://haikubotapi.apphb.com/api/" + apiEndpoint;
    $.ajax({
        url: getString,
        success: function (data) {
            charts.forEach(function (statChart) {
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

                // Update min/max values for y-axis
                let minCount = findMin(statCounts);
                let maxCount = findMax(statCounts);
                let diff = maxCount - minCount;
                let suggestedMax = maxCount + (diff * STAT_Y_PADDING);
                statChart.options.scales.yAxes[0].ticks.suggestedMax = suggestedMax;
                if (!statChart.options.scales.yAxes[0].ticks.beginAtZero) {
                    let suggestedMin = minCount - (diff * STAT_Y_PADDING);
                    statChart.options.scales.yAxes[0].ticks.suggestedMin = suggestedMin;
                }

                // Update the chart
                statChart.data.datasets[0].data = statCounts;
                statChart.data.labels = statLabels;
                statChart.update();
            });
        }
    });
}

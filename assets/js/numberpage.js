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
        borderColor: "rgba(46, 47, 52, 0.5)",
        borderWidth: 2,
        // Text
        displayColors: false,
        callbacks: {
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
        }
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        onClick: (e) => e.stopPropagation()
    }
};

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
        }
    ).fail(function () {
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
    Chart.defaults.global.defaultFontFamily = "'Work Sans', 'Arial', sans-serif";
    Chart.defaults.global.defaultFontStyle = "400";
    Chart.defaults.global.defaultFontSize = 14;

    // Setup charts
    setupDayCharts();
    setupHourCharts();
    // Update charts on loop
    chartIntervals.push(setInterval(function () {
        updateDayChartsData();
        updateHourChartsData();
    }, 300000));
}

function setupDayCharts() {
    // Get the data from the api
    getString = "https://haikubotapi.apphb.com/api/daystats";
    $.ajax({
        url: getString,
        success: function (data) {
            $(".stat-graph-day").each(function () {
                let statGraph = this;
                let $statGraph = $(this);
                let statGraphCanvas = statGraph.getContext('2d');
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
                            lineTension: LINE_TENSION
                        }]
                    },
                    options: chartOptions
                });

                // Set scale options
                statChart.options.scales.xAxes[0].time.unit = 'day';

                let statLabels = [];
                let statCounts = [];
                for (let i = 0; i < data.length; ++i) {
                    let count = data[i][$statGraph.attr("data-column")];
                    if (count >= 0) {
                        // Add the label
                        statLabels[i] = moment(new Date(data[i].dayStartTime));
                        // Add the data
                        statCounts[i] = count;
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

function setupHourCharts() {
    // Set tooltips callback
    let hourCallbacks = {
        beforeTitle: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("MMMM D");
        },
        title: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            let prevValue = moment(value).add(-3, 'hours');
            return prevValue.format("h a") + " - " + value.format("h a");
        },
        label: function (tooltipItem, data) {
            let value = data.datasets[0].data[tooltipItem.index];
            return numberWithCommas(value) + " " + data.datasets[0].label.toLowerCase();
        }
    };

    // Get the data from the api
    getString = "https://haikubotapi.apphb.com/api/hourstats";
    $.ajax({
        url: getString,
        success: function (data) {
            $(".stat-graph-hour").each(function () {
                let statGraph = this;
                let $statGraph = $(this);
                let statGraphCanvas = statGraph.getContext('2d');
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
                            lineTension: LINE_TENSION
                        }]
                    },
                    options: chartOptions
                });

                // Set x-axis format
                statChart.options.scales.xAxes[0].time.unit = 'hour';
                // Set y-axis to start at 0 for haikus
                statChart.options.scales.yAxes[0].ticks.beginAtZero = true;
                statChart.options.scales.yAxes[0].ticks.beginAtZero = true;
                // Set tooltips
                statChart.options.tooltips.callbacks = hourCallbacks;

                let statLabels = [];
                let statCounts = [];
                for (let i = 0; i < data.length; ++i) {
                    let count = data[i][$statGraph.attr("data-column")];
                    if (count >= 0) {
                        // Add the label
                        statLabels.push(moment(new Date(data[i].hourStartTime)));
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

function setupHourChartsz() {
    // Setup the haiku chart
    let haikuChartCanvas = document.getElementById("HaikuHourChart").getContext('2d');
    haikuHourChart = new Chart(haikuChartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'New Haikus',
                backgroundColor: 'rgba(255, 204, 77, 0.5)',
                borderColor: '#ffcc4d',
                pointRadius: 4,
                pointHoverBackgroundColor: '#ffcc4d',
                pointHoverBorderColor: '#ffcc4d',
                pointHoverRadius: 6,
                borderWidth: 2,
                lineTension: LINE_TENSION
            }]
        },
        options: chartOptions
    });

    // Setup the message chart
    let messageChartCanvas = document.getElementById("MessageHourChart").getContext('2d');
    messageHourChart = new Chart(messageChartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Messages Parsed',
                backgroundColor: 'rgba(77, 157, 255, 0.5)',
                borderColor: '#4da0ff',
                pointRadius: 4,
                pointHoverBackgroundColor: '#4da0ff',
                pointHoverBorderColor: '#4da0ff',
                pointHoverRadius: 6,
                borderWidth: 2,
                lineTension: LINE_TENSION
            }]
        },
        options: chartOptions
    });

    // Set x-axis format
    haikuHourChart.options.scales.xAxes[0].time.unit = 'hour';
    haikuHourChart.options.scales.xAxes[0].time.stepSize = 12;
    messageHourChart.options.scales.xAxes[0].time.unit = 'hour';
    messageHourChart.options.scales.xAxes[0].time.stepSize = 12;
    // Set y-axis to start at 0 for haikus
    haikuHourChart.options.scales.yAxes[0].ticks.beginAtZero = true;
    messageHourChart.options.scales.yAxes[0].ticks.beginAtZero = true;

    // Set tooltips
    let hourCallbacks = {
        beforeTitle: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            return value.format("MMMM D");
        },
        title: function (tooltipItem, data) {
            let value = moment(new Date(tooltipItem[0].xLabel));
            let prevValue = moment(value).add(-3, 'hours');
            return prevValue.format("h a") + " - " + value.format("h a");
        },
        label: function (tooltipItem, data) {
            let value = data.datasets[0].data[tooltipItem.index];
            return numberWithCommas(value) + " " + data.datasets[0].label.toLowerCase();
        }
    };

    haikuHourChart.options.tooltips.callbacks = hourCallbacks;
    messageHourChart.options.tooltips.callbacks = hourCallbacks;

    // Update chart data
    updateHourChartsData();
}

function updateHourChartsData() {
    // Get haiku counts for past hours
    let haikuCounts = haikuHourChart.data.datasets[0].data;
    let haikuLabels = haikuHourChart.data.labels;
    // Get message counts for past hours
    let messageCounts = messageHourChart.data.datasets[0].data;
    let messageLabels = messageHourChart.data.labels

    // Get the data from the api
    getString = "https://haikubotapi.apphb.com/api/hourstats";
    $.ajax({
        url: getString,
        success: function (data) {
            for (let i = 0; i < data.length; ++i) {
                // Add the label
                let labelDate = moment(new Date(data[i].hourStartTime));
                haikuLabels[i] = labelDate;
                messageLabels[i] = labelDate;
                // Add the data
                haikuCounts[i] = data[i].haikuCount;
                messageCounts[i] = data[i].messagesCount;
                // Update the charts
                haikuHourChart.data.datasets[0].data = haikuCounts;
                haikuHourChart.data.labels = haikuLabels;
                messageHourChart.data.datasets[0].data = messageCounts;
                messageHourChart.data.labels = messageLabels;
                haikuHourChart.update();
                messageHourChart.update();
            }
        },
        error: function () {
            console.log("Failed to get daily resource, retrying...");
        }
    });
}

$(function () {
    updateStats();
    setInterval(updateStats, 10000);
});

function updateStats() {
    $.get(
        "https://haikubotapi.apphb.com/Api/haikucount",
        function (data) {
            haikus = numberWithCommas(data)
            if ($(".haiku-counter").html() != haikus) {
                $(".haiku-counter").addClass("hidden");
                setTimeout(function () {
                    $(".haiku-counter").html(haikus);
                    $(".haiku-counter").removeClass("hidden");
                }, 250);
            }
        }
    );

    $.get(
        "https://discordbots.org/api/bots/372175794895585280/stats",
        function (data) {
            servers = numberWithCommas(data["server_count"])
            if ($(".server-counter").html() != servers) {
                $(".server-counter").addClass("hidden");
                setTimeout(function () {
                    $(".server-counter").html(servers);
                    $(".server-counter").removeClass("hidden");
                }, 250);
            }
        }
    );
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
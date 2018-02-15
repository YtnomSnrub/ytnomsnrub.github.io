$(function () {
    $.get(
        "https://haikubotapi.apphb.com/Api/haikucount",
        function (data) {
            $(".haiku-counter").html(numberWithCommas(data));
        }
    );

    $.get(
        "https://discordbots.org/api/bots/372175794895585280/stats",
        function (data) {
            $(".server-counter").html(numberWithCommas(data["server_count"]));
        }
    );
});

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
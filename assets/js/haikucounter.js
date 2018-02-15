$(function () {
    $.get(
        "https://haikubotapi.apphb.com/Api/haikucount",
        function (data) {
            $(".haiku-counter").html(data);
        }
    );
});
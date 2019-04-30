$(document).on("transition", function () {
    loadImages();
});

function loadImages() {
    $('img').on('load', function () {
        var $element = $(this);
        window.setTimeout(function () {
            if (!$element.hasClass("visible")) {
                window.setTimeout(function () {
                    $element.addClass("visible");
                }, 200);
            }
        }, 200);
    }).each(function () {
        if (this.complete) {
            $(this).trigger("load");
        }
    });
}
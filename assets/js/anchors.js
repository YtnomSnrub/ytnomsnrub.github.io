$(document).on("transition", function () {
    addMarkdownAnchors();
})

function addMarkdownAnchors() {
    $("h2, h3, h4, h5, h6").each(function (i, el) {
        // Get element and data
        var $el = $(el);
        var id = $el.attr('id');
        var icon = '<i class="material-icons">link</i>';
        // Add icon
        if (id) {
            $el.append($("<a/>").addClass("header-link").attr("href", "#" + id).html(icon));
        }
    });
}
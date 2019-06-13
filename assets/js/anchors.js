$(document).on("transition", function () {
    addMarkdownAnchors();
})

function addMarkdownAnchors() {
    'use strict';
    $("h2, h3, h4, h5, h6").each(function (i, el) {
        // Get element and data
        let $el = $(el);
        let id = $el.attr('id');
        let icon = '<i class="material-icons">link</i>';
        // Add icon
        if (id) {
            $el.append($("<a/>").addClass("header-link").attr("href", "#" + id).html(icon));
        }
    });
}
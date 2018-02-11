function addMarkdownAnchors() {
    return $("h2, h3, h4, h5, h6").each(function (i, el) {
        var $el, icon, id;
        $el = $(el);
        id = $el.attr('id');
        icon = '<i class="material-icons">link</i>';
        if (id) {
            return $el.append($("<a/>").addClass("header-link").attr("href", "#" + id).html(icon));
        }
    });
}
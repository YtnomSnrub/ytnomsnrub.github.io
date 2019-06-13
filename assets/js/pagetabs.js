function updateTabs() {
    'use strict';
    let $mainContent = $(".main-content");
    let $pageTabs = $("#PageTabs");

    let t = $mainContent.offset().top + 1;
    if (window.scrollY > t) {
        if (!$pageTabs.hasClass("fixed")) {
            $pageTabs.addClass("fixed")
        }
    } else {
        if ($pageTabs.hasClass("fixed")) {
            $pageTabs.removeClass("fixed")
        }
    }
}

function updateTabs() {
    'use strict';
    let $mainContent = $(".main-content");
    let $pageTabs = $("#PageTabs");

    let t = $mainContent.offset().top - ($pageTabs.height() / 2);
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

function updateHeader() {
    'use strict';
    /*let $headerText = $(".page-header-text");

    let translate = window.scrollY / 2;
    let scale = Math.max(1 - (window.scrollY * 0.0005), 0);
    let opacity = Math.max(1 - (window.scrollY * 0.005), 0);
    let transform = [
        "translateY(" + translate + "px)",
        "scale(" + scale + ")"
    ];

    $headerText.css("transform", transform.join(" "));
    $headerText.css("opacity", opacity);*/
}

$(function () {
    updateTabs();
    // Update tabs on scroll
    window.addEventListener('scroll', updateTabs);

    updateHeader();
    // Update header on scroll
    window.addEventListener('scroll', updateHeader);
});

$(document).on("transition", function () {
    updateTabs();
    updateHeader();

    // Setup expand button
    let $pageTabs = $(".page-tabs");
    $pageTabs.addClass("hidden");
    $pageTabs.removeClass("expanded");
    $(".page-tabs-expand").on("click", function () {
        $pageTabs.toggleClass("expanded");
        if ($pageTabs.hasClass("expanded")) {
            $pageTabs.removeClass("hidden");
        } else {
            setTimeout(function () {
                if (!$pageTabs.hasClass("expanded")) {
                    $pageTabs.addClass("hidden");
                }
            }, 400);
        }
    });
});

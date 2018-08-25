$(function () {
    'use strict';
    var $page = $("#main");
    var target = "";
    var options = {
        debug: true,
        scroll: false,
        cacheLength: 2,
        onStart: {
            duration: 100,
            render: function ($container) {
                // Animate tabs out
                $(".page-tabs a").removeClass("page-link-current");
                // Add your CSS animation reversing class
                $container.addClass('page-out');
                // Restart your animation
                smoothState.restartCSSAnimations();
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                // Remove your CSS animation reversing class
                $container.removeClass('page-out');
                // Inject the new content
                $container.html($newContent);

                // Add the anchors
                addMarkdownAnchors();
                // Reload the stats
                setupStats();
                // Load images
                loadImages();

                // Scroll to top
                var $mainContent = $(".main-content");
                var t = $mainContent.offset().top + 1;
                if (window.scrollY > t) {
                    window.scrollTo(0, t);
                }

                if (location.hash !== "") {
                    var dest = 0;
                    if ($(location.hash).offset().top > $(document).height() - $(window).height()) {
                        dest = $(document).height() - $(window).height();
                    } else {
                        dest = $(location.hash).offset().top;
                    }

                    window.scrollTo(0, dest);
                }
            }
        }
    }

    var smoothState = $page.smoothState(options).data('smoothState');

    $page.on('click', ".page-tabs a", function () {
        if ($page.hasClass("page-out")) {
            $(this).addClass("page-link-current");
        }
    });

    // Update tab bar
    updateTabs();
    // Load images
    loadImages();

    // Add the anchors
    addMarkdownAnchors();
});

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

function loadImages() {
    $('img').on('load', function () {
        $(this).addClass("visible");
    }).each(function () {
        if (this.complete) {
            $(this).trigger('load');
        }
    });
}

function updateTabs() {
    var $mainContent = $(".main-content");
    var $pageTabs = $("#PageTabs");

    var t = $mainContent.offset().top + 1;
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

window.onscroll = updateTabs;

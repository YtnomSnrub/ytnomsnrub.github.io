$(function () {
    'use strict';
    var $page = $("#Main");
    var $loading = $("#Loading")
    var options = {
        debug: true,
        scroll: false,
        cacheLength: 0,
        onBefore: function ($anchor, $container) {
            // Animate tabs in and out
            $(".page-tabs a").each(function () {
                let $pageTab = $(this);
                if ($anchor.attr("href") === $pageTab.attr("href")) {
                    $pageTab.addClass("page-link-current");
                } else {
                    $pageTab.removeClass("page-link-current");
                }
            });
        },
        onStart: {
            duration: 150,
            render: function ($container) {
                $container.addClass('page-out');
                $loading.addClass('visible');
                // Restart your animation
                smoothState.restartCSSAnimations();
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                $container.removeClass('page-out');
                $loading.removeClass('visible');
                // Inject the new content
                $container.html($newContent);

                // Trigger transition events
                $(document).trigger("transition");

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

    // Update tab bar
    updateTabs();
    // Update tabs on scroll
    window.addEventListener('scroll', updateTabs);

    // Trigger transition events
    $(document).trigger("transition");
});

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

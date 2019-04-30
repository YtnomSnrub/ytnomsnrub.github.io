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

    $page.on('click', ".page-tabs a", function () {
        if ($page.hasClass("page-out")) {
            $(this).addClass("page-link-current");
        }
    });

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

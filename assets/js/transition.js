$(function () {
    'use strict';
    let $page = $("#Main");
    let $loading = $("#Loading");
    let options = {
        debug: false,
        scroll: false,
        cacheLength: 0,
        onBefore: function ($anchor, $container) {
            // Animate tabs in and out
            $(".page-tabs a").each(function () {
                let $pageTab = $(this);
                let anchorRef = $anchor.attr("href").replace(window.location.origin, "");
                if (anchorRef.slice(-1) === "/") {
                    anchorRef = anchorRef.slice(0, -1);
                }

                let tabRef = $pageTab.attr("href").replace(window.location.origin, "");
                if (tabRef.slice(-1) === "/") {
                    tabRef = tabRef.slice(0, -1);
                }

                if (anchorRef === tabRef) {
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
                // Restart your animation
                smoothState.restartCSSAnimations();
            }
        },
        onProgress: {
            duration: 0,
            render: function ($container) {
                setTimeout(function () {
                    if ($container.hasClass('page-out') && !$loading.hasClass('hidden')) {
                        $loading.addClass('visible');
                    }
                }, 100);
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                let delay = 0;
                if ($loading.hasClass('visible')) {
                    delay = 500;
                    setTimeout(function () {
                        $loading.addClass('hidden');
                    }, 250);
                } else {
                    $loading.addClass('hidden');
                }

                setTimeout(function () {
                    $loading.removeClass('visible');
                    $loading.removeClass('hidden');
                    $container.removeClass('page-out');
                    // Inject the new content
                    $container.html($newContent);
                    // Trigger transition events
                    $(document).trigger("transition");

                    // Scroll to top
                    let $pageTabs = $(".page-tabs");
                    let $mainContent = $(".main-content");
                    let t = $mainContent.offset().top - $pageTabs.height() + 1;
                    if (window.scrollY > t) {
                        window.scrollTo(0, t);
                    }

                    if (location.hash !== "") {
                        let dest = 0;
                        if ($(location.hash).offset().top > $(document).height() - $(window).height()) {
                            dest = $(document).height() - $(window).height();
                        } else {
                            dest = $(location.hash).offset().top;
                        }

                        window.scrollTo(0, dest);
                    }
                }, delay);
            }
        }
    };

    let smoothState = $page.smoothState(options).data('smoothState');
    // Update tab bar
    updateTabs();

    // Trigger transition events
    $(document).trigger("transition");
});

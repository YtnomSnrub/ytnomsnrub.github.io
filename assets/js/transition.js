$(function () {
    'use strict';
    let $page = $("#Main");
    let $loading = $("#Loading")
    let options = {
        debug: false,
        scroll: false,
        cacheLength: 0,
        onBefore: function ($anchor, $container) {
            // Animate tabs in and out
            $(".page-tabs a").each(function () {
                let $pageTab = $(this);
                let anchorRef = $anchor.attr("href").replace(window.location.origin, "");
                let tabRef = $pageTab.attr("href").replace(window.location.origin, "");

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
                $loading.addClass('visible');
            }
        },
        onReady: {
            duration: 400,
            render: function ($container, $newContent) {
                let delay = 0;
                if ($loading.hasClass('visible')) {
                    delay = 500;
                    setTimeout(function () {
                        $loading.addClass('hidden');
                    }, 300);
                }

                setTimeout(function () {
                    $loading.removeClass('visible');
                    $loading.removeClass('hidden');
                    $container.removeClass('page-out');
                    // Inject the new content
                    $container.html($newContent);

                    // Scroll to top
                    let $mainContent = $(".main-content");
                    let t = $mainContent.offset().top;
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

                    setTimeout(function () {
                        // Trigger transition events
                        $(document).trigger("transition");
                    }, 150);
                }, delay);
            }
        }
    }

    let smoothState = $page.smoothState(options).data('smoothState');
    // Update tab bar
    updateTabs();
    // Update tabs on scroll
    window.addEventListener('scroll', updateTabs);

    // Trigger transition events
    $(document).trigger("transition");
});

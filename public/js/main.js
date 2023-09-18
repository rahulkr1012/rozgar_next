"use strict";

function customerFeedback() {
    var e = jQuery("#rg-feebbackslider"),
        s = jQuery("#rg-authorpicslider");
    e.owlCarousel({
        items: 1,
        loop: !0,
        nav: !0,
        dots: !1,
        autoplay: !1,
        slideSpeed: 2e3,
        responsiveRefreshRate: 200,
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>']
    }).on("changed.owl.carousel", (function(e) {
        var r = e.item.count - 1,
            a = Math.round(e.item.index - e.item.count / 2 - .5);
        a < 0 && (a = r);
        a > r && (a = 0);
        s.find(".owl-item").removeClass("current").eq(a).addClass("current");
        var n = s.find(".owl-item.active").length - 1,
            l = s.find(".owl-item.active").first().index(),
            o = s.find(".owl-item.active").last().index();
        a > o && s.data("owl.carousel").to(a, 100, !0);
        a < l && s.data("owl.carousel").to(a - n, 100, !0)
    })), s.on("initialized.owl.carousel", (function() {
        s.find(".owl-item").eq(0).addClass("current")
    })).owlCarousel({
        items: 4,
        dots: !1,
        nav: !1,
        margin: 10,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
    }).on("changed.owl.carousel", (function(s) {
        var r = s.item.index;
        e.data("owl.carousel").to(r, 100, !0)
    })), s.on("click", ".owl-item", (function(s) {
        s.preventDefault();
        var r = jQuery(this).index();
        e.data("owl.carousel").to(r, 300, !0)
    }))
}
jQuery((function() {
    (jQuery(".rg-navigation ul li.menu-item-has-children, .rg-navigation ul li.page_item_has_children, .rg-dashboardnav ul li.menu-item-has-children, .rg-dashboardnav ul li.page_item_has_children, .rg-navigation ul li.menu-item-has-mega-menu").prepend('<span class="rg-dropdowarrow"><i class="fa fa-angle-down"></i></span>'), jQuery(".rg-navigation ul li.menu-item-has-children span, .rg-navigation ul li.page_item_has_children span, .rg-navigation ul li.menu-item-has-mega-menu span").on("click", (function() {
        jQuery(this).parent("li").toggleClass("rg-open"), jQuery(this).next().next().slideToggle(300)
    })), jQuery(".rg-dashboardnav ul li.menu-item-has-children, .rg-dashboardnav ul li.page_item_has_children").on("click", (function() {
        jQuery(this).parent("li").toggleClass("rg-open"), jQuery(this).find(".children").slideToggle(300)
    })), $(window).scroll((function() {
        $(window).scrollTop() > 76 ? $(".rg-dashboardheader").addClass("rg-fixednav") : $(".rg-dashboardheader").removeClass("rg-fixednav")
    })), jQuery("#rg-btnmenutoggle").length > 0 && jQuery("#rg-btnmenutoggle").on("click", (function(e) {
        e.preventDefault(), jQuery("#rg-wrapper").toggleClass("rg-openmenu"), jQuery("body").toggleClass("rg-noscroll"), jQuery(".rg-dashboardnav ul.sub-menu").hide()
    })), jQuery("#rg-counters").length > 0) && jQuery("#rg-counters").appear((function() {
        jQuery(".rg-timer").countTo()
    }));
    jQuery(".rg-panelheading").length > 0 && jQuery(".rg-panelheading").on("click", (function() {
        jQuery(".panel-heading").removeClass("active"), jQuery(this).parents(".panel-heading").addClass("active"), jQuery(".panel").removeClass("active"), jQuery(this).parent().addClass("active")
    }));
    var e = jQuery("#rg-homeslidervone");
    e.hasClass("rg-homeslidervone") && e.owlCarousel({
        items: 1,
        nav: !1,
        loop: !0,
        dots: !1,
        autoplay: !1,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        dotsClass: "rg-sliderdots"
    });
    var s, r = jQuery("#rg-successstory");
    r.hasClass("rg-successstory") && r.owlCarousel({
        items: 1,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !1,
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="fas fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>']
    }), (s = jQuery("#rg-ourblogslider")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 3,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            }
        }
    }), (s = jQuery("#rg-topcompaniesslider")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 7,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 7
            }
        }
    }), (s = jQuery("#roz-sponsored-companies")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 7,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 7
            }
        }
    }), (s = jQuery("#roz-featured-companies-hirings")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 3,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        rows: 2,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    }), (s = jQuery("#roz-jobcity-companies")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 2,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        rows: 2,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            }
        }
    }), (s = jQuery("#roz-cityjob-alljob")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 1,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        rows: 2,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    }), (s = jQuery("#roz-departments-hiring")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 3,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    }), (s = jQuery("#roz-sponsored-companies-job")).hasClass("rg-topcompanies") && s.owlCarousel({
        items: 3,
        nav: !0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        rows: 2,
        dotsClass: "rg-sliderdots",
        navClass: ["rg-prev", "rg-next"],
        navContainerClass: "rg-slidernav",
        navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    }), $(".counting").each((function() {
        var e = $(this),
            s = e.attr("data-count");
        $({
            countNum: e.text()
        }).animate({
            countNum: s
        }, {
            duration: 3e3,
            easing: "linear",
            step: function() {
                e.text(Math.floor(this.countNum))
            },
            complete: function() {
                e.text(this.countNum)
            }
        })
    })), jQuery("#rg-circleone").circleProgress({
        value: .9,
        size: 80,
        fill: {
            gradient: ["#f06292", "#f06292"]
        }
    }), jQuery("#rg-circletwo").circleProgress({
        value: .8,
        size: 80,
        fill: {
            gradient: ["#9575cd", "#9575cd"]
        }
    }), jQuery("#rg-circlethree").circleProgress({
        value: 1,
        size: 80,
        fill: {
            gradient: ["#c6c252", "#c6c252"]
        }
    });
    var a = jQuery("#rg-boostingslider");
    (a.hasClass("rg-boostingslider") && a.owlCarousel({
        items: 1,
        nav: !1,
        loop: !0,
        dots: !1,
        autoplay: !0
    }), jQuery(".rg-verticalscrollbar").length > 0) && jQuery(".rg-verticalscrollbar").mCustomScrollbar({
        axis: "y"
    });
    jQuery(".rg-horizontalthemescrollbar").length > 0 && jQuery(".rg-horizontalthemescrollbar").mCustomScrollbar({
        axis: "x",
        advanced: {
            autoExpandHorizontalScroll: !0
        }
    });
    var n = {
        ".chosen-select": {},
        ".chosen-select-deselect": {
            allow_single_deselect: !0
        },
        ".chosen-select-no-single": {
            disable_search_threshold: 10
        },
        ".chosen-select-no-results": {
            no_results_text: "Oops, nothing found!"
        },
        ".chosen-select-width": {
            width: "95%"
        }
    };
    for (var l in n) jQuery(l).chosen(n[l]);
    if (jQuery("#rg-thememap").length > 0) {
        var o = [45.7772, 3.087];
        jQuery("#rg-thememap, #rg-thememapvtwo, #rg-thememapvthree, #rg-thememapbb").gmap3({
            address: "Clermont-Ferrand, France",
            zoom: 5,
            center: o
        }).marker({
            position: o,
            icon: "images/map-marker.png"
        })
    }
    jQuery("a[data-rel]").each((function() {
        jQuery(this).attr("rel", jQuery(this).data("rel"))
    })), jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: "normal",
        theme: "dark_square",
        slideshow: 3e3,
        autoplay_slideshow: !1,
        social_tools: !1
    }), jQuery(".rg-panelcontent").hide(), jQuery(".rg-accordion .rg-paneldetails:first").addClass("active").next().slideDown("slow"), jQuery(".rg-accordion .rg-paneldetails").on("click", (function() {
        jQuery(this).next().is(":hidden") && (jQuery(".rg-accordion .rg-paneldetails").removeClass("active").next().slideUp("slow"), jQuery(this).toggleClass("active").next().slideDown("slow"))
    })), jQuery(".rg-btnscrolltop").on("click", (function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, "slow")
    })), appear({
        init: function() {
            jQuery(".rg-ourskill .rg-skill").each((function() {
                jQuery(this).find(".rg-skillbar").animate({
                    width: jQuery(this).find(".rg-skillholder").attr("data-percent")
                }, 2500)
            }))
        }
    }), jQuery("#rg-narrowsearchcollapse").collapse({
        open: function() {
            this.slideDown(300)
        },
        close: function() {
            this.slideUp(300)
        }
    }), jQuery("#rg-narrowsearchcollapse").trigger("open"), $("#rg-narrowsearchcollapse .rg-themecollapsetitle .rg-widgettitle h3").first().trigger("open"), jQuery("#rg-narrowsearchcollapsesidebar").collapse({
        open: function() {
            this.slideDown(300)
        },
        close: function() {
            this.slideUp(300)
        }
    }), jQuery("#rg-narrowsearchcollapsesidebar").trigger("open"), $("#rg-narrowsearchcollapsesidebar .rg-themecollapsetitle .rg-widgettitle h3").first().trigger("open"), jQuery("#rg-tabgalleryimgs").length > 0 && jQuery("#rg-tabgalleryimgs").magnificPopup({
        gallery: {
            enabled: !0
        },
        mainClass: "mfp-with-zoom",
        zoom: {
            enabled: !0,
            duration: 300,
            easing: "ease-in-out",
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        delegate: "a",
        type: "image",
        midClick: !0,
        removalDelay: 300,
        mainClass: "mfp-fade"
    }), jQuery(".rg-btnopenclose").on("click", (function() {
        if (jQuery("#rg-wrapper").toggleClass("rg-sidenavshow"), jQuery("#rg-wrapper").hasClass("rg-sidenavshow")) return jQuery("body").addClass("spread-overlay"), !0;
        jQuery("body").removeClass("spread-overlay")
    })), jQuery(".rg-close").on("click", (function() {
        if (jQuery("#rg-wrapper").toggleClass("rg-sidenavshow"), jQuery("#rg-wrapper").hasClass("rg-sidenavshow")) return jQuery("body").addClass("spread-overlay"), !0;
        jQuery("body").removeClass("spread-overlay")
    })), $("#rg-closebar").on("click", (function(e) {
        e.preventDefault(), $("#rg-formsearchbar").slideToggle()
    })), jQuery(".rg-advancedlink").on("click", (function(e) {
        var s = jQuery(this);
        e.preventDefault(), s.siblings(".rg-formsearch").slideToggle()
    })), $(document).on("click", ".delete-btn", (function(e) {
        e.preventDefault(), $(this).parents(".rg-jobskill").remove()
    })), jQuery(document).ready((function(e) {
        jQuery(".preloader-outer").delay(500).fadeOut(), jQuery(".loader").delay(1e3).fadeOut("slow")
    }))
})), customerFeedback(), jQuery(document).on("ready", (function() {
    jQuery(".rg-searchoptions").on("click", ".rg-search-type", (function() {
        var e = jQuery(this),
            s = e.data("class");
        e.parents(".rg-searchoptions").removeClass("js-employer js-candidate js-job").addClass(s)
    }))
})), jQuery((function() {
    jQuery(".sortable").sortable()
})), jQuery("#table").basictable({
    breakpoint: 800
}), $(window).scroll((function() {
    $(window).scrollTop() >= 5 ? ($("header").addClass("fixed-header"), $("header").addClass("visible-title")) : ($("header").removeClass("fixed-header"), $("header").removeClass("visible-title"))
}));
const progress = document.querySelector(".progress-done");
progress==null?"":
setTimeout((() => {
    progress.style.opacity = 1, progress.style.width = progress.getAttribute("data-done") + "%"
}), 500);
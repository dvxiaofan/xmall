! function ($) {
	return $ ? ($.Unslider = function (t, n) {
		var e = this;
		return e._ = "unslider", e.defaults = {
			autoplay: !1,
			delay: 3e3,
			speed: 750,
			easing: "swing",
			keys: {
				prev: 37,
				next: 39
			},
			nav: !0,
			arrows: {
				prev: '<a class="' + e._ + '-arrow prev">鈫�</a>',
				next: '<a class="' + e._ + '-arrow next">鈫�</a>'
			},
			animation: "horizontal",
			selectors: {
				container: "ul:first",
				slides: "li"
			},
			animateHeight: !1,
			activeClass: e._ + "-active"
		}, e.$context = t, e.options = {}, e.$parent = null, e.$container = null, e.$slides = null, e.$nav = null, e.$arrows = [], e.total = 0, e.current = 0, e.prefix = e._ + "-", e.eventSuffix = "." + e.prefix + ~~(2e3 * Math.random()), e.interval = null, e.init = function (t) {
			return e.options = $.extend({}, e.defaults, t), e.$container = e.$context.find(e.options.selectors.container).addClass(e.prefix + "wrap"), e.$slides = e.$container.children(e.options.selectors.slides), e.setup(), ["nav", "arrows", "keys", "infinite"].forEach(function (t) {
				e.options[t] && e["init" + $._ucfirst(t)]()
			}), void 0 !== typeof jQuery.event.special.swipe && e.initSwipe(), e.options.autoplay && e.start(), e.calculateSlides(), e.$context.trigger(e._ + ".ready"), e.animate(e.options.index || e.current, "init")
		}, e.setup = function () {
			e.$context.addClass(e.prefix + "slider " + e.prefix + e.options.animation).wrap('<div class="' + e._ + '" />'), e.$parent = e.$context.parent("." + e._);
			var t = e.$context.css("position");
			"static" === t && e.$context.css("position", "relative"), e.$context.css("overflow", "hidden")
		}, e.calculateSlides = function () {
			e.total = e.$slides.length, "fade" !== e.options.animation && (e.$container.css("width", 100 * e.total + "%").addClass(e.prefix + "carousel"), e.$slides.css("width", 100 / e.total + "%"))
		}, e.start = function () {
			return e.interval = setTimeout(function () {
				e.next(), e.start()
			}, e.options.delay), e
		}, e.stop = function () {
			return clearTimeout(e.interval), e
		}, e.initNav = function () {
			var t = $('<nav class="' + e.prefix + 'nav"><ol /></nav>');
			e.$slides.each(function (n) {
				var i = this.getAttribute("data-nav") || n + 1;
				$.isFunction(e.options.nav) && (i = e.options.nav.call(e.$slides.eq(n), n, i)), t.children("ol").append('<li data-slide="' + n + '">' + i + "</li>")
			}), e.$nav = t.insertAfter(e.$context), e.$nav.find("li").on("click" + e.eventSuffix, function () {
				var t = $(this).addClass(e.options.activeClass);
				t.siblings().removeClass(e.options.activeClass), e.animate(t.attr("data-slide"))
			})
		}, e.initArrows = function () {
			e.options.arrows === !0 && (e.options.arrows = e.defaults.arrows), $.each(e.options.arrows, function (t, n) {
				e.$arrows.push($(n).insertAfter(e.$context).on("click" + e.eventSuffix, e[t]))
			})
		}, e.initKeys = function () {
			e.options.keys === !0 && (e.options.keys = e.defaults.keys), $(document).on("keyup" + e.eventSuffix, function (t) {
				$.each(e.options.keys, function (n, i) {
					t.which === i && $.isFunction(e[n]) && e[n].call(e)
				})
			})
		}, e.initSwipe = function () {
			var t = e.$slides.width();
			e.$container.on({
				swipeleft: e.next,
				swiperight: e.prev,
				movestart: function (t) {
					return t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY ? !!t.preventDefault() : void e.$container.css("position", "relative")
				}
			}), "fade" !== e.options.animation && e.$container.on({
				move: function (n) {
					e.$container.css("left", 100 * n.distX / t + "%")
				},
				moveend: function () {
					e.$container.animate({
						left: 0
					}, 200)
				}
			})
		}, e.initInfinite = function () {
			var t = ["first", "last"];
			t.forEach(function (n, i) {
				e.$slides.push.apply(e.$slides, e.$slides.filter(':not(".' + e._ + '-cloned")')[n]().clone().addClass(e._ + "-cloned")["insert" + (0 === i ? "After" : "Before")](e.$slides[t[~~!i]]()))
			}), e.$container.css("margin-left", "-100%")
		}, e.destroyArrows = function () {
			e.$arrows.forEach(function (t) {
				t.remove()
			})
		}, e.destroySwipe = function () {
			e.$container.off("movestart swipeleft move moveend").css("left", 0)
		}, e.destroyKeys = function () {
			$(document).off("keyup" + e.eventSuffix)
		}, e.setIndex = function (t) {
			return 0 > t && (t = e.total - 1), e.current = Math.min(Math.max(0, t), e.total - 1), e.options.nav && e.$nav.find('[data-slide="' + e.current + '"]')._toggleActive(e.options.activeClass), e.$slides.eq(e.current)._toggleActive(e.options.activeClass), e
		}, e.animate = function (t, n) {
			if ("first" === t && (t = 0), "last" === t && (t = e.total), isNaN(t)) return e;
			e.options.autoplay && e.stop().start(), e.setIndex(t), e.$context.trigger(e._ + ".change", [t, e.$slides.eq(t)]);
			var i = "animate" + $._ucfirst(e.options.animation);
			return $.isFunction(e[i]) && e[i](e.current, n), e
		}, e.next = function () {
			var t = e.current + 1;
			return t >= e.total && (t = 0), e.animate(t, "next")
		}, e.prev = function () {
			return e.animate(e.current - 1, "prev")
		}, e.animateHorizontal = function (t) {
			if (e.options.animateHeight && e._move(e.$context, {
					height: e.$slides.eq(t).height()
				}, !1), e.options.infinite) {
				var n;
				t === e.total - 1 && (n = e.total - 3, t = -1), t === e.total - 2 && (n = 0, t = e.total - 2), "number" == typeof n && (e.setIndex(n), e.$context.on(e._ + ".moved", function () {
					e.current === n && e.$container.css("left", -(100 * n) + "%").off(e._ + ".moved")
				}))
			}
			return e._move(e.$container, {
				left: -(100 * t) + "%"
			})
		}, e.animateFade = function (t) {
			var n = e.$slides.eq(t).addClass(e.options.activeClass);
			e._move(n.siblings().removeClass(e.options.activeClass), {
				opacity: 0
			}), e._move(n, {
				opacity: 1
			}, !1)
		}, e._move = function (t, n, i) {
			return i !== !1 && (i = function () {
				e.$context.trigger(e._ + ".moved")
			}), t._move(n, e.options.speed, e.options.easing, i)
		}, e.init(n)
	}, $.fn._toggleActive = function (t) {
		return this.addClass(t).siblings().removeClass(t)
	}, $._ucfirst = function (t) {
		return t.toString().toLowerCase().replace(/^./, function (t) {
			return t.toUpperCase()
		})
	}, $.fn._move = function () {
		return this.stop(!0, !0), $.fn.velocity ? $.fn.velocity.apply(this, arguments) : $.fn.animate.apply(this, arguments)
	}, void($.fn.unslider = function (t) {
		return this.each(function () {
			var n = $(this);
			if ("string" == typeof t && n.data("unslider")) {
				t = t.split(":");
				var e = t[0],
					i = n.data("unslider")[e];
				if (t[1]) {
					var o = t[1].split(",");
					return $.isFunction(i) && i.apply(n, o)
				}
				return $.isFunction(i) && i(), this
			}
			return n.data("unslider", new $.Unslider(n, t))
		})
	})) : console.warn("Unslider needs jQuery")
}(window.jQuery);
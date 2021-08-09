/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');
		$navShow = $('#nav-show');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$navShow.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt');
					$nav.removeClass('alternative');},
				leave:		function() { $header.removeClass('alt');
			$nav.addClass('alternative');}
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});


			// Nav.
				var $nav = $('#nav');

				if ($nav.length > 0) {

					// Links.
						var $header_a = $header.find('a:not(.not-this-one)');

						$header_a
							.scrolly({
								speed: 1000,
								offset: function() { return $nav.height(); }
							})
							.on('click', function() {

								var $this = $(this);

								// External link? Bail.
									if ($this.attr('href').charAt(0) != '#')
										return;

								// Deactivate all links.
									$header_a
										.removeClass('active')
										.removeClass('active-locked');

								// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
									$this
										.addClass('active')
										.addClass('active-locked');

							})
							.each(function() {

								var	$this = $(this),
									id = $this.attr('href'),
									$section = $(id);

								// No section for this link? Bail.
									if ($section.length < 1)
										return;

								// Scrollex.
									$section.scrollex({
										mode: 'middle',
										initialize: function() {

											// Deactivate section.
												if (browser.canUse('transition'))
													$section.addClass('inactive');

										},
										enter: function() {

											// Activate section.
												$section.removeClass('inactive');

											// No locked links? Deactivate all links and activate this section's one.
												if ($header_a.filter('.active-locked').length == 0) {

													$header_a.removeClass('active');
													$this.addClass('active');

												}

											// Otherwise, if this section's link is the one that's locked, unlock it.
												else if ($this.hasClass('active-locked'))
													$this.removeClass('active-locked');

										}
									});

							});

				}

			// Ce e mai sus, dar pt meniul din mijlocul ecranului.

			if ($nav.length > 0) {

				// Links.
					var $menu_a = $menu.find('a');

					$menu_a
						.scrolly({
							speed: 1000,
							offset: function() { return $nav.height(); }
						})
						.on('click', function() {

							var $this = $(this);

							// External link? Bail.
								if ($this.attr('href').charAt(0) != '#')
									return;

							// Deactivate all links.
								$menu_a
									.removeClass('active')
									.removeClass('active-locked');

							// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
								$this
									.addClass('active')
									.addClass('active-locked');

						})
						.each(function() {

							var	$this = $(this),
								id = $this.attr('href'),
								$section = $(id);

							// No section for this link? Bail.
								if ($section.length < 1)
									return;

							// Scrollex.
								$section.scrollex({
									mode: 'middle',
									initialize: function() {

										// Deactivate section.
											if (browser.canUse('transition'))
												$section.addClass('inactive');

									},
									enter: function() {

										// Activate section.
											$section.removeClass('inactive');

										// No locked links? Deactivate all links and activate this section's one.
											if ($menu_a.filter('.active-locked').length == 0) {

												$menu_a.removeClass('active');
												$this.addClass('active');

											}

										// Otherwise, if this section's link is the one that's locked, unlock it.
											else if ($this.hasClass('active-locked'))
												$this.removeClass('active-locked');

									}
								});
						});
			}

			// Scrolly.
				$('.scrolly').scrolly({
					speed: 1000
				});

})(jQuery);


// AJAX code added to the form from Formspree.com to modify default behaviour on submit

var form = document.getElementById("my-form");

	 async function handleSubmit(event) {
		 event.preventDefault();
		 var status = document.getElementById("form-buttons");
		 var data = new FormData(event.target);
		 fetch(event.target.action, {
			 method: form.method,
			 body: data,
			 headers: {
					 'Accept': 'application/json'
			 }
		 }).then(response => {

			 var listItem = document.createElement("li");
			 listItem.innerHTML = "<strong>Success!</strong> I'll get back to you!"
			 listItem.setAttribute("class", "success");
			 status.appendChild(listItem);

			 form.reset();

			 setTimeout(function(){
			 	status.removeChild(status.lastElementChild);
			}, 4000);


		 }).catch(error => {

			 var listItem = document.createElement("li");
			 listItem.innerHTML = "<strong>Error!</strong> Contact me elswhere!"
			 listItem.setAttribute("class", "error");
			 status.appendChild(listItem);

	 	 	form.reset();

			setTimeout(function(){
			 status.removeChild(status.lastElementChild);
		 }, 4000);

		 });
	 }
	 form.addEventListener("submit", handleSubmit)

/**
 * Onetime: disable buttons on submit
 * Copyright 2012 Eugene Kenny <elkenny@gmail.com>
 * Released under the MIT license (http://www.opensource.org/licenses/MIT)
 */
(function($) {
	// jQuery method
	$.extend($.fn, {
		onetime: function(formOptions, buttonOptions) {
			// Only attach to form elements
			var forms = this.filter('form');

			forms.each(function(i, form) {
				var onetime = new $.onetime(form, formOptions, buttonOptions);

				$(this).submit(function(event) {
					if (!event.isDefaultPrevented()) {
						onetime.disableButtons();
						onetime.triggerButtonEvent();
					}
				});
			});

			return this;
		}
	});

	// Constructor
	$.onetime = function(form, formOptions, buttonOptions) {
		this.form = form;
		this.formSettings = $.extend(true, {}, formOptions);
		this.buttonSettings = $.extend(true, {}, buttonOptions);

		this.init();
	};

	// Internal methods
	$.extend($.onetime, {
		prototype: {
			init: function() {
				var onetime = this;
				var otherButtons = this.buttons();

				jQuery.each(this.buttonSettings, function(selector, settings) {
					var buttons = onetime.buttons(selector);
					settings = $.extend(true, {}, onetime.formSettings, settings);

					onetime.setupCallbacks(buttons, settings);
					otherButtons = otherButtons.not(buttons);
				});

				this.setupCallbacks(otherButtons, this.formSettings);
			},

			buttons: function(selector) {
				var buttons = $(this.form).find('input:submit, input[type=image]');

				if (selector !== undefined)
				{
					buttons = buttons.filter(selector);
				}

				return buttons;
			},

			setupCallbacks: function(elements, settings) {
				if (settings.hasOwnProperty('disable')) {
					elements.bind('onetime-submit', settings.disable);
				}

				if (settings.hasOwnProperty('text')) {
					elements.bind('onetime-submit', function() {
						$(this).val(settings.text);
					});
				}

				if (settings.hasOwnProperty('loader')) {
					elements.bind('onetime-submit', function() {
						$(onetime.form).find(settings.loader).show();
					});
				}

				var onetime = this;

				elements.click(function() {
					onetime.submitButton = this;
				});
			},

			disableButtons: function() {
				this.buttons().attr('disabled', 'disabled');
			},

			triggerButtonEvent: function() {
				$(this.submitButton).triggerHandler('onetime-submit');
			}
		}
	});
})(jQuery);

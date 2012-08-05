Onetime
=======

Onetime is a jQuery plugin which disables the buttons on a form when it is successfully submitted.


Usage
-----

Select the forms to be disabled on submit and call the `$.onetime()` method, optionally passing a configuration object.

```javascript
// single form
$('#myform').onetime();

// all forms
$('form').onetime();

// passing configuration options
$('#myform').onetime({
  // see configuration section below!
});
```


Configuration
-------------

The `$.onetime()` function accepts an optional configuration object, which can contain any combination of the following keys:

 - `disable`: function to call when the form is submitted.
 - `text`: text to show on the clicked button when the form is submitted.
 - `loader`: selector identifying a hidden element to show when the form is submitted.

`$.onetime()` can also take a second parameter, a map of selectors to configuration objects.
If buttons in the form match one of the selectors, the corresponding settings will override the settings from the main configuration object for that button.


Examples
--------

To see the plugin and various configuration options in action, you can [view the Github page](http://eugeneius.github.com/jquery-onetime).

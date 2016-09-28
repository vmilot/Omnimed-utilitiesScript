// ==UserScript==
// @name         Proxy Shift Click
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://*/stats*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      http://nylen.github.io/shiftcheckbox/jquery.shiftcheckbox.js
// ==/UserScript==

$ = jQuery;

$(function() {
    $(':checkbox').shiftcheckbox();
});

if (window.location.host == "192.168.251.143:81") {
  $('form').each(function(idx, e) {
      if (idx < 10) {
          $(e).hide();
      }
  });
}

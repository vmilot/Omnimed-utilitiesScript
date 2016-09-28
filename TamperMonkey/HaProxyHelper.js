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

var DISABLE_REFRESH = true;

$ = jQuery;

$(function() {
    if (DISABLE_REFRESH && window.location.href.indexOf('norefresh') == -1) {
        window.location.href = window.location.href + ';norefresh';
    }
    
    $(':checkbox').shiftcheckbox();
    
    $('th.pxname').each(function() {
        $(this).prepend('<button style="float:left" onclick="toggleSection(this);return false;">- / +</button>');
    });
});

window.toggleSection = function(thead) {
    jQuery(thead).parents('table').next().toggle();
    
    return false;
   
}

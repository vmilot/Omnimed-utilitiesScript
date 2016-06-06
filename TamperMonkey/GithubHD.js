// ==UserScript==
// @name       GitHub HD Resolution
// @namespace  
// @version    2016-05-02
// @description  Resize main container of GitHub to take advantage of HD Resolution Screen.
// @match      https://github.com/*
// @copyright  2014+, Omnimed.com
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('.container').css('width', '95%');
$('#js-repo-pjax-container').css('width', '95%');
$('.js-quote-selection-container').css('width', '87%');

$('.repository-with-sidebar .repository-sidebar').css({
    'float': 'right',
    'width': '38px',
    'overflow': 'hidden'
});


$('.repository-with-sidebar .repository-sidebar span:not(.octicon, .url-box-clippy)').css('display', 'none');
//$('.repository-content, .context-loader-container').css('width', '97%');
$('#files .diffstat+.css-truncate-target').removeClass('css-truncate css-truncate-target');
$('span.css-truncate-target').removeClass('css-truncate css-truncate-target');
$('.container .discussion-timeline').removeClass('discussion-timeline');
$('.repo-label').remove();

$(document).bind('DOMSubtreeModified', function() {
    $('.container').css('width', '95%');
	$('#files .diffstat+.css-truncate-target').removeClass('css-truncate css-truncate-target');
	$('span.css-truncate-target').removeClass('css-truncate css-truncate-target');
	$('.container .discussion-timeline').removeClass('discussion-timeline');    
});

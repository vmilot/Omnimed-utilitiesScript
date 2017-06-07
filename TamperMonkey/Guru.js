// ==UserScript==
// @name       Guru utility script
// @namespace  
// @version       0.1
// @description  Guru utility script
// @match        https://app.getguru.com*
// @copyright    2017+, Omnimed.com
// ==/UserScript==


document.addEventListener("DOMSubtreeModified", function() {
    if (document.getElementsByClassName('ghq-factcard-maximized')[0]) {
        if (document.getElementsByClassName('ghq-factcard-maximized')[0].style) {
            document.getElementsByClassName('ghq-factcard-maximized')[0].style.width = "100%";
        }
    }
});

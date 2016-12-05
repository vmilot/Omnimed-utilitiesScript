// ==UserScript==
// @name         Cucumber Java Percentage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display cucumber report total percent
// @author       You
// @match        https://jenkins.omnimed.com/job/cucumber*/*/cucumber-html-reports/feature-overview.html
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    jQuery('table.table-bordered thead tr').append('<th>Percent</th>');
    jQuery('table.table-bordered tbody tr.info').append('<td>'+ parseFloat(parseFloat(jQuery('td[data-column=2]').text() / jQuery('td[data-column=1]').text())*100).toFixed(2) +'%</td>');
})();

// ==UserScript==
// @name         Pivotal select count
// @namespace    https://www.pivotaltracker.com/
// @version      0.3
// @description  Output the total of point selected
// @author       Gabriel Girard
// @match        https://www.pivotaltracker.com/*
// @grant        none
// ==/UserScript==

var $ = jQuery;
var countStory = 0;
var countChore = 0;
var countBug = 0;
var sumStory = 0;
var sumChore = 0;
var sumBug = 0;
var sumTotal = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$( document ).bind("ajaxComplete",function() {
    $('.selector').unbind("click");
    $('.selector').bind("click", function(){
        setTimeout(function() {
            update_bug();
            update_chore();
            update_feature();
            update_output();
        }, 100);
    });
});

function update_bug() {
    sumBug = 0;
    countBug = 0;
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.bug').children('.preview').children('.selected').parent().children('.meta').each(function(){
        if ($(this).text() != "-1") {
            sumBug += parseFloat($(this).text());
        }
        countBug = countBug + 1;
    });
}

function update_chore() {
    sumChore = 0;
    countChore = 0;
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.chore').children('.preview').children('.selected').parent().children('.meta').each(function(){
        if ($(this).text() != "-1") {
            sumChore += parseFloat($(this).text());
        }
        countChore = countChore + 1;
    });
}

function update_feature() {
    sumStory = 0;
    countStory = 0;
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.feature').children('.preview').children('.selected').parent().children('.meta').each(function(){
        if ($(this).text() != "-1") {
            sumStory += parseFloat($(this).text());
        }
        countStory = countStory + 1;
    });
}

function update_output() {
    $('#story_Selected_sum').remove();
    sumTotal = sumBug + sumChore + sumStory;
    $('.selectedStoriesControls__actions').css({"padding-left":"158px"});
    $('.selectedStoriesControls__counterLabel').append("<span id='story_Selected_sum' style='margin-left: 7px;'><span style='font-weight:bold;'>Story :</span> " + sumStory + "/" + countStory + " | <span style='font-weight:bold;'>Chore :</span> " + sumChore + "/" + countChore + " | <span style='font-weight:bold;'>Bug :</span> " + sumBug + "/" + countBug + " | <span style='font-weight:bold;'>Total</span> : " + sumTotal +
                                                      "<button class='selectedStoriesControls__button' type='button' onClick='$.getReleaseNote()'>Release note</button><button class='selectedStoriesControls__button' type='button' onClick='$.getSprintSheet()'>Sprint sheet</button><button class='selectedStoriesControls__button' type='button' onClick='$.getPlanningPoker()'>PlanningPoker</button></span>");
}

$.getReleaseNote = function() {
    var releaseNote = "Nom de code : \nDate de déploiement visée : \nVersion de chrome supportée : \n\n";
    var alphaText = '';
    var produits = [];
    var stories = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.feature').children('.preview').children('.selected').parent().children('.name').each(function(){
        var story = {name:"", prd:"", id:""};
        if($(this).children('.labels').children('a:contains("alpha")')) {
            alphaText = ' - ALPHA';
        } else {
            alphaText = '';
        }

        story.id = $(this).parent().parent().attr("data-id");
        story.prd = $(this).children('.labels').children('a:contains("prd")').first().text();
        story.name = $(this).children('.story_name').text() + alphaText;
        if (story.prd === "") {
            story.prd ="prd - autre";
        } else if (story.prd.indexOf(",") > -1) {
            story.prd = story.prd.substring(0,story.prd.indexOf(","));
        }
        story.prd = capitalizeFirstLetter(story.prd.substring(6));
        stories.push(story);
        produits.push(story.prd);
    });

    var chores = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.chore').children('.preview').children('.selected').parent().children('.name').each(function(){
        var chore = {name:"", prd:"", id:""};
        chore.id = $(this).parent().parent().attr("data-id");
        chore.name = $(this).children('.story_name').text();
        chore.prd = $(this).children('.labels').children('a:contains("prd")').first().text();
        if (chore.prd === "") {
            chore.prd ="prd - autre";
        } else if (chore.prd.indexOf(",") > -1) {
            chore.prd = chore.prd.substring(0,chore.prd.indexOf(","));
        }
        chore.prd = capitalizeFirstLetter(chore.prd.substring(6));
        chores.push(chore);
        produits.push(chore.prd);
    });

    var bugs = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.bug').children('.preview').children('.selected').parent().children('.name').each(function(){
        var bug = {name:"", id:""};
        bug.id = $(this).parent().parent().attr("data-id");
        bug.name = $(this).children('.story_name').text();
        $(this).children('.labels').children('a:contains("bugprod")').each(function() {
            bugs.push(bug);
        });
    });

    $.each($.unique(produits.sort()), function() {
        releaseNote += "\n## " + this + "\n\n";
        var i = 0;
        for (i = 0; i < stories.length; i++) {
            if (stories[i].prd == this) {
                releaseNote += " * " + stories[i].name + " [https://www.pivotaltracker.com/story/show/" + stories[i].id + "]\n";
            }
        }
        i = 0;
        for (i = 0; i < chores.length; i++) {
            if (chores[i].prd == this) {
                releaseNote += " * " + chores[i].name + " [https://www.pivotaltracker.com/story/show/" + chores[i].id + "]\n";
            }
        }
    });

    releaseNote += "\n## Corrections de bogues\n\n";
    $.each(bugs, function() {
        releaseNote += " * " + this.name + " [https://www.pivotaltracker.com/story/show/" + this.id + "]\n";
    });
    console.clear();
    console.log(releaseNote);
};

$.getSprintSheet = function() {
    var sprintSheet = "";
    var okrs = [];
    var stories = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.feature').children('.preview').children('.selected').parent().children('.name').each(function(){
        var story = {name:"", okr:"", id:""};
        story.id = $(this).parent().parent().attr("data-id");
        story.name = $(this).children('.story_name').text();
        story.okr = $(this).children('.labels').children('a:contains("okr")').first().text();
        if (story.okr === "") {
            story.okr ="okr - autre";
        } else if (story.okr.indexOf(",") > -1) {
            story.okr = story.okr.substring(0,story.okr.indexOf(","));
        }
        stories.push(story);
        okrs.push(story.okr);
    });

    var chores = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.chore').children('.preview').children('.selected').parent().children('.name').each(function(){
        var chore = {name:"", okr:"", id:""};
        chore.id = $(this).parent().parent().attr("data-id");
        chore.name = $(this).children('.story_name').text();
        chore.okr = $(this).children('.labels').children('a:contains("okr")').first().text();
        if (chore.okr === "") {
            chore.okr ="okr - autre";
        } else if (chore.okr.indexOf(",") > -1) {
            chore.okr = chore.okr.substring(0,chore.okr.indexOf(","));
        }
        chores.push(chore);
        okrs.push(chore.okr);
    });

    var bugs = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.bug').children('.preview').children('.selected').parent().children('.name').each(function(){
        var bug = {name:"", id:""};
        bug.id = $(this).parent().parent().attr("data-id");
        bug.name = $(this).children('.story_name').text();
        bugs.push(bug);
    });

    sprintSheet += "\n== OKR:\n\n";
    $.each($.unique(okrs.sort()), function() {
        sprintSheet += " * " + this + "\n";
    });

    sprintSheet += "\n== SPRINT:\n\n";

    sprintSheet += "\n== Corrections de bogues\n\n";
    $.each(bugs, function() {
        sprintSheet += " * " + this.name + " [https://www.pivotaltracker.com/story/show/" + this.id + "]\n";
    });

    sprintSheet += "\n== Objectifs:\n\n";

    $.each($.unique(okrs), function() {
        sprintSheet += "\n== " + this + "\n\n";
        var i = 0;
        for (i = 0; i < stories.length; i++) {
            if (stories[i].okr == this) {
                sprintSheet += " * " + stories[i].name + " [https://www.pivotaltracker.com/story/show/" + stories[i].id + "]\n";
            }
        }
        i = 0;
        for (i = 0; i < chores.length; i++) {
            if (chores[i].okr == this) {
                sprintSheet += " * " + chores[i].name + " [https://www.pivotaltracker.com/story/show/" + chores[i].id + "]\n";
            }
        }
    });

    sprintSheet += "\n== Membres de l’équipe:\n\n";

    sprintSheet += "\n== Pour Slack ==\n\n";

    sprintSheet += "\n# OKR:\n";
    $.each($.unique(okrs.sort()), function() {
        sprintSheet += "* " + this + "\n";
    });

    sprintSheet += "\n# SPRINT:\n";

    sprintSheet += "\n# Corrections de bogues\n";
    $.each(bugs, function() {
        sprintSheet += " * " + this.name + " [https://www.pivotaltracker.com/story/show/" + this.id + "]\n";
    });

    sprintSheet += "\n# Objectifs:\n";

    $.each($.unique(okrs), function() {
        sprintSheet += "\n## " + this + "\n";
        var i = 0;
        for (i = 0; i < stories.length; i++) {
            if (stories[i].okr == this) {
                sprintSheet += "* " + stories[i].name + " [https://www.pivotaltracker.com/story/show/" + stories[i].id + "]\n";
            }
        }
        i = 0;
        for (i = 0; i < chores.length; i++) {
            if (chores[i].okr == this) {
                sprintSheet += "* " + chores[i].name + " [https://www.pivotaltracker.com/story/show/" + chores[i].id + "]\n";
            }
        }
    });

    sprintSheet += "\n# Membres de l’équipe:\n\n";

    console.clear();
    console.log(sprintSheet);
};

$.getPlanningPoker = function() {
    var planningPokerList = "";
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.feature').children('.preview').children('.selected').parent().children('.name').each(function(){
        var story = {name:"", okr:"", id:""};
        story.id = $(this).parent().parent().attr("data-id");
        story.name = $(this).children('.story_name').text();
            planningPokerList += "<a target='_blank' href='https://www.pivotaltracker.com/story/show/" + story.id + "'>" + story.name + "</a>\n";
    });

    var chores = [];
    $('div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.chore').children('.preview').children('.selected').parent().children('.name').each(function(){
        var chore = {name:"", okr:"", id:""};
        chore.id = $(this).parent().parent().attr("data-id");
        chore.name = $(this).children('.story_name').text();
            planningPokerList += "<a target='_blank' href='https://www.pivotaltracker.com/story/show/" + chore.id + "'>" + chore.name + "</a>\n";
    });

    console.clear();
    console.log(planningPokerList);
};

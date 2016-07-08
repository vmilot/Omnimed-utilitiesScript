// ==UserScript==
// @name         Pivotal select count
// @namespace    https://www.pivotaltracker.com/
// @version      0.12
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

function getBug() {
    return $('div[data-type="done"],div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.bug').children('.preview').children('.selected').parent();
}

function getChore() {
    return $('div[data-type="done"],div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.chore').children('.preview').children('.selected').parent();
}

function getFeature() {
    return $('div[data-type="done"],div[data-type="current"],div[data-type="backlog"],div[data-type="icebox"]').find('.feature').children('.preview').children('.selected').parent();
}

function getInfoFromUrl(url) {
    var re = /[0-9]+/g;
    var id = url.match(re);
    return $('div[data-id="' + id + '"]')[0];
}

function getEpicInfo(epicLabel) {
  var xhr = new XMLHttpRequest();
  var label = epicLabel;
  if (epicLabel.indexOf("ep - ") > -1) {
    label = epicLabel.substring(5);
  }
  xhr.open("GET", "https://www.pivotaltracker.com/services/v5/projects/605365/epics?filter=label%3A%22" + encodeURI(label) + "%22&fields=name%2Cdescription%2Ccompleted_at", false);
  xhr.send();

  var response = JSON.parse(xhr.responseText);
  return response;
}

function addReleaseNoteTicketInfo(parameter) {
    var releaseNote = "";
    if (parameter.addLabel) {
      parameter.addLabel = false;
      var episode = getEpicInfo(parameter.episode.toString());
      if (episode.length > 0) {
        releaseNote += "\n### " + episode[0].name;
        if (episode[0].completed_at) {
          releaseNote += " - Complété\n";
        } else {
          releaseNote += "\n";
        }
        if (episode[0].description) {
          releaseNote += episode[0].description + "\n\n";
        }
      } else {
        releaseNote += "\n### " + parameter.episode.toString() + "\n\n";
      }
    }
    releaseNote += " * " + parameter.ticket.name + " [https://www.pivotaltracker.com/story/show/" + parameter.ticket.id + "]\n";
    return releaseNote;
}

function update_bug() {
    sumBug = 0;
    countBug = 0;
    getBug().children('.meta').each(function(){
        if ($(this).text() != "-1") {
            sumBug += parseFloat($(this).text());
        }
        countBug = countBug + 1;
    });
}

function update_chore() {
    sumChore = 0;
    countChore = 0;
    getChore().children('.meta').each(function(){
        if ($(this).text() != "-1") {
            sumChore += parseFloat($(this).text());
        }
        countChore = countChore + 1;
    });
}

function update_feature() {
    sumStory = 0;
    countStory = 0;
    getFeature().children('.meta').each(function(){
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
                                                       "<div style='position: absolute;left: 46px;background-color: chocolate;width: 421px;height: 20px;padding-top: 2px;'>" +
                                                       "<button class='selectedStoriesControls__button' style='font-weight:bold;' type='button' onClick='$.getReleaseNote()'>Release note</button>" +
                                                       "<button class='selectedStoriesControls__button' style='font-weight:bold;' type='button' onClick='$.getSprintSheet()'>Sprint sheet</button>" +
                                                       "<button class='selectedStoriesControls__button' style='font-weight:bold;' type='button' onClick='$.getPlanningPoker()'>PlanningPoker</button>" +
                                                       "<button class='selectedStoriesControls__button' style='font-weight:bold;' type='button' onClick='$.getDiff()'>Diff</button>" +
                                                       "</div>" +
                                                       "</span>");
}

$.getReleaseNote = function() {
    var releaseNote = "Nom de code : \nDate de déploiement visée : \nVersion de chrome supportée : \n\n";
    var eps = [];
    var produits = [];
    var stories = [];
    getFeature().children('.name').each(function(){
        var story = {name:"", ep:"", prd:"", id:""};
        story.id = $(this).parent().parent().attr("data-id");
        story.prd = $(this).children('.labels').children('a:contains("prd")').first().text();
        story.name = $(this).children('.story_name').text();
        if (story.prd === "") {
            story.prd ="prd - autre";
        } else if (story.prd.indexOf(",") > -1) {
            story.prd = story.prd.substring(0,story.prd.indexOf(","));
        }
        story.prd = capitalizeFirstLetter(story.prd.substring(6));
        story.ep = $(this).children('.labels').children('a:contains("ep -")').first().text();
        if (story.ep === "") {
            story.ep ="ep - autre";
        } else if (story.ep.indexOf(",") > -1) {
            story.ep = story.ep.substring(0,story.ep.indexOf(","));
        }
        stories.push(story);
        produits.push(story.prd);
        eps.push(story.ep);
    });
    stories.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    var chores = [];
    getChore().children('.name').each(function(){
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
        chore.ep = $(this).children('.labels').children('a:contains("ep -")').first().text();
        if (chore.ep === "") {
            chore.ep ="ep - autre";
        } else if (chore.ep.indexOf(",") > -1) {
            chore.ep = chore.ep.substring(0,chore.ep.indexOf(","));
        }
        chores.push(chore);
        produits.push(chore.prd);
        eps.push(chore.ep);
    });
    chores.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    var bugs = [];
    getBug().children('.name').each(function(){
        var bug = {name:"", id:""};
        bug.id = $(this).parent().parent().attr("data-id");
        bug.name = $(this).children('.story_name').text();
        $(this).children('.labels.pre').children('a:contains("bugprod")').each(function() {
            bugs.push(bug);
        });
    });
    bugs.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    $.each($.unique(produits.sort()), function() {
        releaseNote += "\n## " + this + "\n\n";
        var produit = this;
          $.each($.unique(eps), function() {
              var parameter = {
                addLabel: true,
                episode: this,
                ticket: ''};
              var i = 0;
              for (i = 0; i < stories.length; i++) {
                  if (stories[i].prd == produit) {
                      if (stories[i].ep == this) {
                        parameter.ticket = stories[i];
                        releaseNote += addReleaseNoteTicketInfo(parameter);
                      }
                  }
              }
              i = 0;
              for (i = 0; i < chores.length; i++) {
                  if (chores[i].prd == produit) {
                      if (chores[i].ep == this) {
                        parameter.ticket = chores[i];
                        releaseNote += addReleaseNoteTicketInfo(parameter);
                      }
                  }
              }
          });
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
    var eps = [];
    var stories = [];
    getFeature().children('.name').each(function(){
        var story = {name:"", ep:"", id:""};
        story.id = $(this).parent().parent().attr("data-id");
        story.name = $(this).children('.story_name').text();
        story.ep = $(this).children('.labels').children('a:contains("ep -")').first().text();
        if (story.ep === "") {
            story.ep ="ep - autre";
        } else if (story.ep.indexOf(",") > -1) {
            story.ep = story.ep.substring(0,story.ep.indexOf(","));
        }
        stories.push(story);
        eps.push(story.ep);
    });
    stories.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    var chores = [];
    getChore().children('.name').each(function(){
        var chore = {name:"", ep:"", id:""};
        chore.id = $(this).parent().parent().attr("data-id");
        chore.name = $(this).children('.story_name').text();
        chore.ep = $(this).children('.labels').children('a:contains("ep -")').first().text();
        if (chore.ep === "") {
            chore.ep ="ep - autre";
        } else if (chore.ep.indexOf(",") > -1) {
            chore.ep = chore.ep.substring(0,chore.ep.indexOf(","));
        }
        chores.push(chore);
        eps.push(chore.ep);
    });
    chores.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    var bugs = [];
    getBug().children('.name').each(function(){
        var bug = {name:"", id:""};
        bug.id = $(this).parent().parent().attr("data-id");
        bug.name = $(this).children('.story_name').text();
        bugs.push(bug);
    });

    sprintSheet += "\n== Épisodes:\n\n";
    $.each($.unique(eps.sort()), function() {
        var episode = getEpicInfo(this.toString());
        if (episode.length > 0) {
          sprintSheet += "* " + episode[0].name + "\n";
          if (episode[0].description) {
            sprintSheet += " * " + episode[0].description + "\n";
          }
        } else {
          sprintSheet += "* " + this + "\n";
        }
    });

    sprintSheet += "\n== SPRINT:\n\n";

    sprintSheet += "\n== Corrections de bogues\n\n";
    $.each(bugs, function() {
        sprintSheet += "* " + this.name + " [https://www.pivotaltracker.com/story/show/" + this.id + "]\n";
    });

    sprintSheet += "\n== Objectifs:\n\n";

    $.each($.unique(eps), function() {
        sprintSheet += "\n== " + this + "\n\n";
        var i = 0;
        for (i = 0; i < stories.length; i++) {
            if (stories[i].ep == this) {
                sprintSheet += "* " + stories[i].name + " [https://www.pivotaltracker.com/story/show/" + stories[i].id + "]\n";
            }
        }
        i = 0;
        for (i = 0; i < chores.length; i++) {
            if (chores[i].ep == this) {
                sprintSheet += "* " + chores[i].name + " [https://www.pivotaltracker.com/story/show/" + chores[i].id + "]\n";
            }
        }
    });

    sprintSheet += "\n== Membres de l’équipe:\n\n";

    sprintSheet += "\n== Pour Slack ==\n\n";

    sprintSheet += "\n# Épisodes:\n";
    $.each($.unique(eps.sort()), function() {
        var episode = getEpicInfo(this.toString());
        if (episode.length > 0) {
          sprintSheet += "* " + episode[0].name + "\n";
          if (episode[0].description) {
            sprintSheet += " * " + episode[0].description + "\n";
          }
        } else {
          sprintSheet += "* " + this + "\n";
        }
    });

    sprintSheet += "\n# SPRINT:\n";

    sprintSheet += "\n# Corrections de bogues\n";
    $.each(bugs, function() {
        sprintSheet += "* " + this.name + " [https://www.pivotaltracker.com/story/show/" + this.id + "]\n";
    });

    sprintSheet += "\n# Objectifs:\n";

    $.each($.unique(eps), function() {
        sprintSheet += "\n## " + this + "\n";
        var i = 0;
        for (i = 0; i < stories.length; i++) {
            if (stories[i].ep == this) {
                sprintSheet += "* " + stories[i].name + " [https://www.pivotaltracker.com/story/show/" + stories[i].id + "]\n";
            }
        }
        i = 0;
        for (i = 0; i < chores.length; i++) {
            if (chores[i].ep == this) {
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
    getFeature().children('.name').each(function(){
        var story = {name:"", ep:"", id:""};
        story.id = $(this).parent().parent().attr("data-id");
        story.name = $(this).children('.story_name').text();
            planningPokerList += "<a target='_blank' href='https://www.pivotaltracker.com/story/show/" + story.id + "'>" + story.name + "</a>\n";
    });

    var chores = [];
    getChore().children('.name').each(function(){
        var chore = {name:"", ep:"", id:""};
        chore.id = $(this).parent().parent().attr("data-id");
        chore.name = $(this).children('.story_name').text();
            planningPokerList += "<a target='_blank' href='https://www.pivotaltracker.com/story/show/" + chore.id + "'>" + chore.name + "</a>\n";
    });

    console.clear();
    console.log(planningPokerList);
};

$.getDiff = function() {
    var tickets = prompt("Please enter your last stories and chores from the old sprintPlanning sheet", "");
    var re = /https[^\]]*/g;

    if (tickets != null) {
        var lastUrls = tickets.match(re);var sprintSheet = "";
        var urls = [];
        var diffSheet = "";
        var totalMin = 0;
        var totalPlus = 0;

        var stories = [];
        getFeature().children('.name').each(function(){
            var story = {name:"", id:"", usp:""};
            story.id = "https://www.pivotaltracker.com/story/show/" +$(this).parent().parent().attr("data-id");
            story.name = $(this).children('.story_name').text();
            story.usp = $(this).parent().children('.meta').text();
            stories.push(story);
            urls.push(story.id);
        });

        var chores = [];
        getChore().children('.name').each(function(){
            var chore = {name:"", id:"", usp:""};
            chore.id = "https://www.pivotaltracker.com/story/show/" + $(this).parent().parent().attr("data-id");
            chore.name = $(this).children('.story_name').text();
            chore.usp = $(this).parent().children('.meta').text();
            chores.push(chore);
            urls.push(chore.id);
        });
        diffSheet += "## Scope creep Minus \n";
        $.each(lastUrls, function() {
            var found = false;
            var i = 0;
            for (i = 0; i < urls.length; i++) {
                if (urls[i] === this.toString()) {
                    found = true;
                }
            }
            if (!found) {
                var info = getInfoFromUrl(this.toString());
                totalMin += parseInt($(info).children().children('.meta').text());
                diffSheet += "* [" + $(info).children().children().children('.story_name').text() + "](" + this.toString() + ") - " + $(info).children().children('.meta').text() + "pts\n";
            }
        });
        diffSheet += "\n## Scope creep Plus \n";
        $.each(urls, function() {
            var found = false;
            var i = 0;
            for (i = 0; i < lastUrls.length; i++) {
                if (lastUrls[i] === this.toString()) {
                    found = true;
                }
            }
            if (!found) {
                i = 0;
                for (i = 0; i < stories.length; i++) {
                    if (stories[i].id === this.toString()) {
                        totalPlus += parseInt(stories[i].usp);
                        diffSheet += "* [" + stories[i].name + "](" + stories[i].id + ") - " + stories[i].usp + "pts\n";
                    }
                }
                i = 0;
                for (i = 0; i < chores.length; i++) {
                    if (chores[i].id === this.toString()) {
                        totalPlus += parseInt(chores[i].usp);
                        diffSheet += "* [" + chores[i].name + "](" + chores[i].id + ") - " + chores[i].usp + "pts\n";
                    }
                }
            }
        });


        console.clear();
        var diff = totalPlus - totalMin;
        console.log(diff);

        diffSheet += "\n\n Différence de " + diff + " points de la planification initiale";
        console.log(diffSheet);
    }
};

// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Pimp cucumber reports
// @author       mquiron, mcormier, nguillet shenault
// @match        https://jenkins.omnimed.com/job/*/cucumber-html-reports/*overview-tags.html
// @grant        none
// ==/UserScript==
$( document ).ready(function() {
	$("<style type='text/css'> .cukeMoc { background-color: black !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeNic { background-color: red !important; color: white !important; font-size: xx-small; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeVal { background-color: blue !important; color: white !important; } </style>").appendTo("head");
});

function colorCucumberTagForQA(tag, qa) {
	if (tag === 'CA') {
		/* Special case: name conflits between CAS and CA. */
		if ($('.tagname > a:contains(@CA):not(:contains(@CAS))').length !== 0) {
			$('.tagname > a:contains(@CA):not(:contains(@CAS))').addClass('cuke' + qa);
		} else {
			console.warn('Cucumber tag ' + tag + ' does not exists');
		}
	} else {
		if ($('.tagname > a:contains(' + tag + ')').length !== 0) {
			$('.tagname > a:contains(' + tag + ')').addClass('cuke' + qa);
		} else {
			console.warn('Cucumber tag ' + tag + ' does not exists');
		}
	}
}

function colorCucumberTags() {
	colorCucumberTagForQA('Aide', 'Nic');
	colorCucumberTagForQA('AjoutResultat', 'Val');
	colorCucumberTagForQA('Allergie', 'Val');
	colorCucumberTagForQA('Antecedents', 'Val');
	colorCucumberTagForQA('Aviseur', 'Moc');

	colorCucumberTagForQA('Beta', 'Moc');

	colorCucumberTagForQA('CA', 'Nic');
	colorCucumberTagForQA('CAS', 'Nic');
	colorCucumberTagForQA('CentreAdmin', 'Nic');
	colorCucumberTagForQA('ChampConfidentiel', 'Nic');
	colorCucumberTagForQA('Compte', 'Nic');
	
	colorCucumberTagForQA('Dictionnaire', 'Moc');
	colorCucumberTagForQA('Droits', 'Nic');
	colorCucumberTagForQA('DSQ', 'Moc');

	colorCucumberTagForQA('Etiquette', 'Nic');

	colorCucumberTagForQA('GuideUtilisateur', 'Val');

	colorCucumberTagForQA('HabitudesDeVie', 'Nic');

	colorCucumberTagForQA('Immunisation', 'Val');

	colorCucumberTagForQA('ListeResultat', 'Val');
	colorCucumberTagForQA('ListeTaches', 'Val');

	colorCucumberTagForQA('MaladieChronique', 'Nic');

	colorCucumberTagForQA('NC', 'Nic');
	colorCucumberTagForQA('Note', 'Nic');
	colorCucumberTagForQA('Notification', 'Moc');
	colorCucumberTagForQA('Nouvelles', 'Moc');

	colorCucumberTagForQA('OC', 'Nic');

	colorCucumberTagForQA('Patient', 'Nic');
	colorCucumberTagForQA('Prescripteur', 'Moc');
	colorCucumberTagForQA('Problemes', 'Val');
	colorCucumberTagForQA('Profil', 'Nic');
	colorCucumberTagForQA('Programmes', 'Nic');

	colorCucumberTagForQA('RendezVous', 'Nic');
	colorCucumberTagForQA('Resultat', 'Val');
	colorCucumberTagForQA('RevisionNotes', 'Nic');
	colorCucumberTagForQA('RevisionResultats', 'Val');
	colorCucumberTagForQA('RevisionTaches', 'Nic');

	colorCucumberTagForQA('SalleDAttente', 'Nic');
	colorCucumberTagForQA('SmokedTest', 'Nic');
	colorCucumberTagForQA('SQII', 'Moc');
	colorCucumberTagForQA('SQIL', 'Moc');
	colorCucumberTagForQA('SQIM', 'Moc');
	colorCucumberTagForQA('SignesVitaux', 'Moc');
	colorCucumberTagForQA('SuppressionResultat', 'Val');
	colorCucumberTagForQA('SV', 'Moc');

	colorCucumberTagForQA('Taches', 'Nic');

	colorCucumberTagForQA('UMF', 'Nic');
}

colorCucumberTags();
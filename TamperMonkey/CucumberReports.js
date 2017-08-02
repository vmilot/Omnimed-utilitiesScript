// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Pimp cucumber reports
// @author       mquiron, mcormier, nguillet shenault
// @match        https://jenkins.omnimed.com/job/*/cucumber-html-reports/*overview-tags.html
// @grant        none
// ==/UserScript==
$( document ).ready(function() {
	$("<style type='text/css'> .cukeMoc { background-color: black !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeNic { background-color: red !important; color: white !important; } </style>").appendTo("head");
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
		if ($('.tagname > a:contains(@' + tag + ')').length !== 0) {
			$('.tagname > a:contains(@' + tag + ')').addClass('cuke' + qa);
		} else {
			console.warn('Cucumber tag ' + tag + ' does not exists');
		}
	}
}

function colorCucumberTags() {
	colorCucumberTagForQA('Aide', 'Moc');
	colorCucumberTagForQA('AjoutResultat', 'Val');
	colorCucumberTagForQA('Allergie', 'Nic');
	colorCucumberTagForQA('Antecedents', 'Nic');
	colorCucumberTagForQA('Aviseur', 'Val');

	colorCucumberTagForQA('Beta', 'Moc');

	colorCucumberTagForQA('CA', 'Moc');
	colorCucumberTagForQA('CAS', 'Moc');
	colorCucumberTagForQA('CentreAdmin', 'Moc');
	colorCucumberTagForQA('ChampConfidentiel', 'Val');
	colorCucumberTagForQA('Compte', 'Moc');

	colorCucumberTagForQA('Dictionnaire', 'Val');
	colorCucumberTagForQA('Droits', 'Val');
	colorCucumberTagForQA('DSQ', 'Nic');

    colorCucumberTagForQA('Elevio', 'Moc');
	colorCucumberTagForQA('Etiquette', 'Val');

	colorCucumberTagForQA('GuideUtilisateur', 'Moc');

	colorCucumberTagForQA('HabitudesDeVie', 'Val');

	colorCucumberTagForQA('Immunisation', 'Nic');

	colorCucumberTagForQA('ListeResultat', 'Val');
    colorCucumberTagForQA('LR', 'Val');
	colorCucumberTagForQA('ListeTaches', 'Moc');

	colorCucumberTagForQA('MaladieChronique', 'Val');

	colorCucumberTagForQA('NC', 'Val');
	colorCucumberTagForQA('Note', 'Val');
	colorCucumberTagForQA('Notification', 'Moc');
	colorCucumberTagForQA('Nouvelles', 'Moc');

	colorCucumberTagForQA('OC', 'Val');

	colorCucumberTagForQA('Patient', 'Moc');
	colorCucumberTagForQA('Prescripteur', 'Nic');
	colorCucumberTagForQA('Problemes', 'Nic');
	colorCucumberTagForQA('Profil', 'Moc');
	colorCucumberTagForQA('Programmes', 'Val');

	colorCucumberTagForQA('RendezVous', 'Val');
	colorCucumberTagForQA('Requete', 'Moc');
	colorCucumberTagForQA('Resultat', 'Val');
	colorCucumberTagForQA('RevisionNotes', 'Val');
	colorCucumberTagForQA('RevisionResultats', 'Val');
	colorCucumberTagForQA('RevisionTaches', 'Moc');
    colorCucumberTagForQA('RR', 'Val');

	colorCucumberTagForQA('SalleDAttente', 'Val');
	colorCucumberTagForQA('SmokedTest', 'Nic');
	colorCucumberTagForQA('SQII', 'Nic');
	colorCucumberTagForQA('SQIL', 'Nic');
	colorCucumberTagForQA('SQIM', 'Nic');
	colorCucumberTagForQA('SignesVitaux', 'Nic');
	colorCucumberTagForQA('SuppressionResultat', 'Val');
	colorCucumberTagForQA('SV', 'Nic');

	colorCucumberTagForQA('Taches', 'Moc');

	colorCucumberTagForQA('UMF', 'Val');
}

colorCucumberTags();

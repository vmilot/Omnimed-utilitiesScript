// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Pimp cucumber reports
// @author       mquiron, mcormier
// @match        https://jenkins.omnimed.com/job/cucumber*/cucumber-html-reports/*overview-tags.html
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    jQuery('table.table-bordered thead tr').append('<th>Percent</th>');
    jQuery('table.table-bordered tbody tr.info').append('<td>'+ parseFloat(parseFloat(jQuery('td[data-column=2]').text() / jQuery('td[data-column=1]').text())*100).toFixed(2) +'%</td>');
})();

function colorCukesVal(word) {
    var xpath = "//text()[contains(., '" + word + "')]";
    var texts = document.evaluate(xpath, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (n = 0; n < texts.snapshotLength; n++) {
        var textNode = texts.snapshotItem(n);
        var p = textNode.parentNode;
        var a = [];
        var frag = document.createDocumentFragment();
        textNode.nodeValue.split(word).forEach(function(text, i) {
            var node;
            if (i) {
                node = document.createElement('span');
                node.style.backgroundColor = 'Blue';
                node.style.color = 'White';
                node.appendChild(document.createTextNode(word));
                frag.appendChild(node);
            }
            if (text.length) {
                frag.appendChild(document.createTextNode(text));
            }
            return a;
        });
        p.replaceChild(frag, textNode);
    }
}

function colorCukesMoc(word) {
    var xpath = "//text()[contains(., '" + word + "')]";
    var texts = document.evaluate(xpath, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (n = 0; n < texts.snapshotLength; n++) {
        var textNode = texts.snapshotItem(n);
        var p = textNode.parentNode;
        var a = [];
        var frag = document.createDocumentFragment();
        textNode.nodeValue.split(word).forEach(function(text, i) {
            var node;
            if (i) {
                node = document.createElement('span');
                node.style.backgroundColor = 'Black';
                node.style.color = 'White';
                node.appendChild(document.createTextNode(word));
                frag.appendChild(node);
            }
            if (text.length) {
                frag.appendChild(document.createTextNode(text));
            }
            return a;
        });
        p.replaceChild(frag, textNode);
    }
}

function colorCukesNic(word) {
    var xpath = "//text()[contains(., '" + word + "')]";
    var texts = document.evaluate(xpath, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (n = 0; n < texts.snapshotLength; n++) {
        var textNode = texts.snapshotItem(n);
        var p = textNode.parentNode;
        var a = [];
        var frag = document.createDocumentFragment();
        textNode.nodeValue.split(word).forEach(function(text, i) {
            var node;
            if (i) {
                node = document.createElement('span');
                node.style.backgroundColor = 'Red';
                node.style.color = 'White';
                node.appendChild(document.createTextNode(word));
                frag.appendChild(node);
            }
            if (text.length) {
                frag.appendChild(document.createTextNode(text));
            }
            return a;
        });
        p.replaceChild(frag, textNode);
    }
}
colorCukesNic('@NCConsentement');
colorCukesNic('@NCFichier');
colorCukesNic('@NCTransmettreNote');
colorCukesNic('@Aide');
colorCukesNic('@CACoordonnees');
colorCukesNic('@CAFusion');
colorCukesNic('@CAInfoAdministratives');
colorCukesNic('@CAInterfaceExterne');
colorCukesNic('@CAMedecinDeFamille');
colorCukesNic('@CARelation');
colorCukesNic('@CARendezVous');
colorCukesNic('@CARenseignementsPersonnels');
colorCukesNic('@CATogglz');
colorCukesNic('@CA');
colorCukesNic('@OCAllergie'); 
colorCukesNic('@OCAntecedentFamilial');
colorCukesNic('@OCAntecedent');
colorCukesNic('@OCCalcul');
colorCukesNic('@OCChoixMultiples');
colorCukesNic('@OCCreation');
colorCukesNic('@OCElementsGeneraux');
colorCukesNic('@OCFichier');
colorCukesNic('@OCImmunisationEtVaccins');
colorCukesNic('@OCPlancheAnatomique');
colorCukesNic('@OCReponseLongue');
colorCukesNic('@OCResultat');
colorCukesNic('@OCTogglz');
colorCukesNic('@OCActionLog');
colorCukesNic('@OCGroupe');
colorCukesNic('@OCNavigationErratique');
colorCukesNic('@OCProbleme');
colorCukesNic('@OCSaisie');
colorCukesNic('@OCSommaire');


colorCukesMoc('@PrescripteurActionLogAjout');
colorCukesMoc('@PrescripteurActionLogAnnuler');
colorCukesMoc('@PrescripteurActionLogArchiver');
colorCukesMoc('@PrescripteurActionLogMettreFin');
colorCukesMoc('@PrescripteurActionLogModifier');
colorCukesMoc('@PrescripteurActionLogRenouveler');
colorCukesMoc('@PrescripteurActionLogSupprimer');
colorCukesMoc('@PrescripteurAnnulerSupprimerMettreFin');
colorCukesMoc('@PrescripteurArchiverRestaurer');
colorCukesMoc('@PrescripteurAviseurTherapeutique');
colorCukesMoc('@PrescripteurCesser');
colorCukesMoc('@PrescripteurFavoris');
colorCukesMoc('@PrescripteurGabaritDePrescription');
colorCukesMoc('@PrescripteurImportationDSQ');
colorCukesMoc('@PrescripteurInscrireMedication');
colorCukesMoc('@PrescripteurMiseAuSommaire');
colorCukesMoc('@PrescripteurMonographie');
colorCukesMoc('@PrescripteurNarcotique');
colorCukesMoc('@PrescripteurOrdonnanceEnCours');
colorCukesMoc('@PrescripteurPosologieTexte');
colorCukesMoc('@PrescripteurPreference');
colorCukesMoc('@PrescripteurPrescriptionTexte');
colorCukesMoc('@PrescripteurRechercherMedication');
colorCukesMoc('@PrescripteurRenouveler');
colorCukesMoc('@PrescripteurTogglz');
colorCukesMoc('@PrescripteurToutSelectionner');
colorCukesMoc('@PrescripteurVueArchive');
colorCukesMoc('@PrescripteurVueProfil');
colorCukesMoc('@PrescripteurVueRenouvelables');
colorCukesMoc('@SQIIImpression');
colorCukesMoc('@SQIIListeExamen');
colorCukesMoc('@SQIITogglz');
colorCukesMoc('@SQILImpression');
colorCukesMoc('@SQILListeResultats');
colorCukesMoc('@SQIMDetailGeneral');
colorCukesMoc('@SQIMDetailHistorique');
colorCukesMoc('@SQIMDetailMedications');
colorCukesMoc('@SQIMDetailNotes');
colorCukesMoc('@SQIMDetailProblemes');
colorCukesMoc('@SQIMDetailRefus');
colorCukesMoc('@SQIMSommaireMedications');
colorCukesMoc('@DSQAcces');
colorCukesMoc('@DSQ');
colorCukesMoc('@PrescripteurHistoriqueLigneDuTemps');
colorCukesMoc('@PrescripteurPrescrireMedicationAvance');
colorCukesMoc('@PrescripteurPrescrireMedicationFinDeTraitement');
colorCukesMoc('@PrescripteurPrescrireMedication');

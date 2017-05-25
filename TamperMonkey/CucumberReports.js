// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Pimp cucumber reports
// @author       mquiron, mcormier, nguillet 
// @match        https://jenkins.omnimed.com/job/*/cucumber-html-reports/*overview-tags.html
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


colorCukesVal('@AjoutResultat');
colorCukesVal('@Allergie');
colorCukesVal('@AntecedentsFamiliaux');
colorCukesVal('@Antecedents');
colorCukesVal('@GuideUtilisateur');
colorCukesVal('@ImmunisationEtVaccinsActionLog');
colorCukesVal('@ImmunisationEtVaccinsAjout');
colorCukesVal('@ImmunisationEtVaccins');
colorCukesVal('@ListeResultatDate');
colorCukesVal('@ListeResultatDescription');
colorCukesVal('@ListeResultatTerme');
colorCukesVal('@ListeResultatTri');
colorCukesVal('@ListeResultat');
colorCukesVal('@ListeTachesSurResultats');
colorCukesVal('@ListeTaches');
colorCukesVal('@Problemes');
colorCukesVal('@ResultatActionLog');
colorCukesVal('@RevisionResultatsActions');
colorCukesVal('@RevisionResultatsCommentaires');
colorCukesVal('@RevisionResultatsFiltre');
colorCukesVal('@RevisionResultatsNoteClinique');
colorCukesVal('@RevisionResultatsTri');
colorCukesVal('@RevisionResultats');
colorCukesVal('@SuppressionResultat');

colorCukesNic('@NCConsentement');
colorCukesNic('@NCFichier');
colorCukesNic('@NCTransmettreNote');
colorCukesNic('@Aide');
colorCukesNic('@CACoordonnees');
colorCukesNic('@CAFusion');
colorCukesNic('@CAInfoAdministratives');
colorCukesNic('@CAInterfaceExterne');
colorCukesNic('@CAMedecinDeFamille');
colorCukesNic('@RecherchePatient');
colorCukesNic('@CARecherchePatient');
colorCukesNic('@CARelation');
colorCukesNic('@CARendezVous');
colorCukesNic('@CARenseignementsPersonnels');
colorCukesNic('@CATogglz');
colorCukesNic('@CAS');
colorCukesNic('@CA');
colorCukesNic('@CentreAdmin');
colorCukesNic('@ChampConfidentiel');
colorCukesNic('@Compte');
colorCukesNic('@Droits');
colorCukesNic('@Etiquette');
colorCukesNic('@HabitudesDeVieAjoutModif');
colorCukesNic('@HabitudesDeVieActionLog');
colorCukesNic('@HabitudesDeVie');
colorCukesNic('@MaladieChronique');
colorCukesNic('@NCEnteteDossierPatient');
colorCukesNic('@NoteCliniqueAutre');
colorCukesNic('@NoteCliniqueConsultation');
colorCukesNic('@NoteCliniqueDroits');
colorCukesNic('@NoteCliniqueImpression');
colorCukesNic('@NoteCliniqueListe');
colorCukesNic('@NoteCliniqueOrdreActionLogMaladieChronique');
colorCukesNic('@NoteCliniqueOrdreActionLog');
colorCukesNic('@NoteEnCours');
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
colorCukesNic('@Patient');
colorCukesNic('@ProfilUtilisateur');
colorCukesNic('@ProgrammesActionLog');
colorCukesNic('@Programmes');
colorCukesNic('@RendezVousAReassigner');
colorCukesNic('@RendezVousAgenda');
colorCukesNic('@RendezVousDeplacer');
colorCukesNic('@RendezVousDisponibilite');
colorCukesNic('@RendezVousGeneral');
colorCukesNic('@RendezVousInteraction');
colorCukesNic('@RendezVousPlageHoraireAjout');
colorCukesNic('@RendezVousPlageHoraireAnnulation');
colorCukesNic('@RendezVousPlageHoraireModificationRecurrenceException');
colorCukesNic('@RendezVousPlageHoraireModificationRecurrence');
colorCukesNic('@RendezVousPlageHoraireModification');
colorCukesNic('@RendezVousPlageHoraireVisualisation');
colorCukesNic('@RevisionNotes');
colorCukesNic('@RevisionTachesDroits');
colorCukesNic('@RevisionTachesNoteClinique');
colorCukesNic('@RevisionTaches');
colorCukesNic('@SalleDAttente');
colorCukesNic('@TachesAutre');
colorCukesNic('@UMFNoteClinique');
colorCukesNic('@UMFRevisionTache');
colorCukesNic('@UMF');


colorCukesMoc('@Aviseur');
colorCukesMoc('@Beta');
colorCukesMoc('@Dictionnaire');
colorCukesMoc('@Notification');
colorCukesMoc('@Nouvelles');
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
colorCukesMoc('@PrescripteurHistoriqueLigneDuTemps');
colorCukesMoc('@PrescripteurImportationDSQ');
colorCukesMoc('@PrescripteurInscrireMedication');
colorCukesMoc('@PrescripteurMiseAuSommaire');
colorCukesMoc('@PrescripteurMonographie');
colorCukesMoc('@PrescripteurNarcotique');
colorCukesMoc('@PrescripteurOrdonnanceEnCours');
colorCukesMoc('@PrescripteurPosologieTexte');
colorCukesMoc('@PrescripteurPreference');
colorCukesMoc('@PrescripteurPrescriptionTexte');
colorCukesMoc('@PrescripteurPrescrireMedication');
colorCukesMoc('@PrescripteurPrescrireMedicationAvance');
colorCukesMoc('@PrescripteurPrescrireMedicationCodeException');
colorCukesMoc('@PrescripteurPrescrireMedicationDuree');
colorCukesMoc('@PrescripteurPrescrireMedicationFinDeTraitement');
colorCukesMoc('@PrescripteurPrescrireMedicationInstruction');
colorCukesMoc('@PrescripteurPrescrireMedicationNPS');
colorCukesMoc('@PrescripteurPrescrireMedicationQuantite');
colorCukesMoc('@PrescripteurRechercherMedication');
colorCukesMoc('@PrescripteurRenouveler');
colorCukesMoc('@PrescripteurTogglz');
colorCukesMoc('@PrescripteurToutSelectionner');
colorCukesMoc('@PrescripteurVueArchive');
colorCukesMoc('@PrescripteurVueProfil');
colorCukesMoc('@PrescripteurVueRenouvelables');
colorCukesMoc('@PrescripteurZoomMed');
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
colorCukesMoc('@SVActionLog');
colorCukesMoc('@SVGrille');
colorCukesMoc('@SVUniteMesure');
colorCukesMoc('@SignesVitaux');

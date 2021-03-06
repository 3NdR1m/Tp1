/**
 * @module quiz.js
 * @author Benjamin Bergeron
 * @copyright 2018
 */

/**
 * @name obtenirBonneReponse
 * @description Return l'index de la bonne réponse.
 * @param {Number} noQuestion L'index de la question
 * @returns {Number} retourne l'index de la bonne réponse
 */
function obtenirBonneReponse(noQuestion)
{
	return questionsQuiz[noQuestion]["indexBonneReponse"];
}

/**
 * @name validerQuestion
 * @description Valide si la réponse choisie est la bonne.
 * @param {Number} noQuestion numéro de la question
 * @param {Number} choixUtilisateur choix fait par l'utilisateur
 * @returns {Boolean} true si la réponse choisie est bonne, sinon false
 */
function validerQuestion(noQuestion, choixUtilisateur)
{
	return (choixUtilisateur == obtenirBonneReponse(noQuestion));
}

/**
 * @name ajouterPoint
 * @description Ajoute un point au total des points.
 */
function ajouterPoint()
{
	totalPointage ++;
}

/**
 * @name obtenirPointage
 * @description Obtiens le pointage total accumulé.
 * @returns {Number} Le pointage total
 */
function obtenirPointage()
{
	return totalPointage;
}

/**
 * @name estFinPartie
 * @description Vérifie si l'on a atteint la fin de la partie.
 * @returns {boolean} true si l'index de la question courrante est égal au nombre maximum de questions, sinon faux
 */
function estFinPartie()
{
	return (questionCourante >= MAX_QUESTIONS);
}

/**
 * @name chargerQuestionSuivante
 * @description Incrémente l'index indiquant la question courante.
 */
function chargerQuestionSuivante()
{
	questionCourante ++;
}

/**
 * @name obtenirChoix
 * @description Obtiens les choix de réponse pour une question donnée.
 * @param {Number} noQuestion Index de la question pour laquelle il faut obtenir les choix de réponse.
 * @returns retourne un tableau contenant les choix de la question
 */
function obtenirChoix(noQuestion)
{
	var choix = [];
	for (let i = 0; i < NB_CHOIX_MAX; i++) {
		choix[i] = questionsQuiz[noQuestion]["choixReponse"][i];
	}
	return choix;
}

/**
 * @name afficherBonneReponse
 * @description Modifie la fenêtre modale pour afficher la bonne réponse pour une question donnée.
 * @param {Number} noQuestion Index de la question pour laquelle il faut afficher la bonne réponse.
 */
function afficherBonneReponse(noQuestion) {
	var indexBonneReponse = obtenirBonneReponse(noQuestion);
	document.getElementById("texteReponse").textContent = questionsQuiz[noQuestion]["choixReponse"][indexBonneReponse];
	document.getElementById("lienPlusInfos").href = questionsQuiz[noQuestion]["lienReponse"];
	$('#modalReponse').modal("show");
}

/**
 * @name majPointage
 * @description Mets à jour le total des points accumulés dans l'interface.
 */
function majPointage()
{
	document.getElementById("totalPoints").textContent = totalPointage;
}

/**
 * @name majTotalQuestion
 * @description Mets à jour le nombre total de questions dans l'interface.
 */
function majTotalQuestion()
{
	document.getElementById("totalQuestions").textContent = MAX_QUESTIONS;
}

/**
 * @name majTexteChoix
 * @description Modifie l'interface en affichant les réponses dans des boutons pour une question donnée.
 * @param {Number} noQuestion Index de la question pour laquelle il faut afficher les réponses.
 */
function majTexteChoix(noQuestion)
{
	var choix = obtenirChoix(noQuestion);
	for (let i = 0; i < choix.length; i++) {
		// edit text of span
		document.formQuiz.options[i].nextElementSibling.textContent = choix[i];
	}
}

/**
 * @name majTexteQuestion
 * @description Modifie l'interface en affichant une question.
 * @param {Number} noQuestion Index de la question qu'il faut afficher.
 */
function majTexteQuestion(noQuestion)
{
	document.getElementById("texteQuestion").innerText = questionsQuiz[noQuestion]["question"];
}

/**
 * @name majNoQuestionCourant
 * @description Modifie l'interface en affichant une le numéro de la question courante.
 */
function majNoQuestionCourant()
{	
	document.getElementById("noQuestionCourante").textContent = questionCourante + 1;
}

/**
 * @name remiseAZeroBoutons
 * @description Modifie l'interface en remettant à l'état initial les boutons de réponse.
 */
function remiseAZeroBoutons() {
	$('.btn').removeClass('active');
}

/**
 * @name majProgression
 * @description Modifie l'interface en ajustant la barre de progression.
 */
function majProgression()
{
	var avancementPourcentage;
	avancementPourcentage = `${questionCourante/MAX_QUESTIONS * 100}%`;
	document.getElementById("barreProgression").style.width = avancementPourcentage;
}

/**
 * @name majInterface
 * @description Modifie l'interface en changeant la question, les choix de réponses, en mettant à jour le pointage, la barre de progression et le numéro de la question courante et en remettant à zéro les boutons.
 */
function majInterface()
{
	document.getElementById("btnConfirmer").disabled = true;
	majTexteChoix(questionCourante);
	majTexteQuestion(questionCourante);
	majNoQuestionCourant();
	majPointage();
	majProgression();
}

/**
 * @name selectionnerChoix
 * @description Modifie l'interface pour changer l'apparence du bouton cliqué et activer le bouton Valider.
 * @param {Number} noChoix Numéro du choix de réponse sélectionné.
 */
function selectionnerChoix(noChoix)
{
	reponseUtilisateur = noChoix;
	document.getElementById("btnConfirmer").disabled = false;
}

/**
 * @name afficherBoiteFinDeJeu
 * @description Modifie l'interface pour afficher la boîte de résumé et cacher la boîte de question.
 */
function afficherBoiteFinDeJeu()
{
	document.getElementById("questionBox").style.display = "none";
	document.getElementById("gameOverBox").style.display = "block";
	document.getElementById("totalScore").textContent = totalPointage;
}
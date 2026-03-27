/**
 * Calcule la moyenne d'un tableau de notes
 * @param {number[]} notes
 * @returns {number}
 */
function calculerMoyenne(notes) {
  let somme = notes.reduce((acc, n) => acc + n, 0);
  return somme / notes.length;
}

/**
 * Retourne la mention selon la moyenne
 * @param {number} moyenne
 * @returns {string}
 */
function obtenirMention(moyenne) {
  if (moyenne < 10) return "Insuffisant";
  if (moyenne < 13) return "Passable";
  if (moyenne < 16) return "Bien";
  if (moyenne < 18) return "Très Bien";
  return "Excellent";
}

/**
 * Filtre les étudiants selon un prédicat
 * @param {Array} etudiants
 * @param {(etudiant: Object) => boolean} predicat
 * @returns {Array}
 */
function filtrerEtudiants(etudiants, predicat) {
  return etudiants.filter(predicat);
}

/**
 * Trie les étudiants du meilleur au moins bon
 * @param {Array} etudiants
 * @returns {Array}
 */
function classerParMoyenne(etudiants) {
  return [...etudiants].sort((a, b) => {
    return calculerMoyenne(b.notes) - calculerMoyenne(a.notes);
  });
}

/**
 * Affiche le bulletin d'un étudiant
 * @param {Object} etudiant
 */
function afficherBulletin(etudiant) {
  let moyenne = calculerMoyenne(etudiant.notes);
  let mention = obtenirMention(moyenne);

  console.log(
    `${etudiant.nom.padEnd(8)} : ${moyenne.toFixed(2)} — ${mention}`
  );
}

let etudiants = [
  { nom: "Amina", notes: [14, 16, 12, 18] },
  { nom: "Youssef", notes: [8, 9, 7, 10] },
  { nom: "Sara", notes: [17, 19, 15, 20] },
  { nom: "Karim", notes: [11, 10, 13, 12] },
  { nom: "Nadia", notes: [6, 5, 8, 7] },
];

console.log("===== Résultats de la classe =====");

// Trier
let classes = classerParMoyenne(etudiants);

// Affichage
classes.forEach(afficherBulletin);

// Filtrage
let admis = filtrerEtudiants(etudiants, e => calculerMoyenne(e.notes) >= 10);
let bienPlus = filtrerEtudiants(etudiants, e => calculerMoyenne(e.notes) >= 13);

console.log(
  `\nAdmis (${etudiants.length} → ${admis.length}) : ${admis
    .map(e => e.nom)
    .join(", ")}`
);

console.log(
  `Mention Bien+ : ${bienPlus.map(e => e.nom).join(", ")}`
);
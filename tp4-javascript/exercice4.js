/**
 * Convertit une date "JJ/MM/AAAA" vers un objet Date
 * @param {string} dateStr
 * @returns {Date}
 */
function parseDate(dateStr) {
  let [jour, mois, annee] = dateStr.split("/");
  return new Date(annee, mois - 1, jour);
}

/**
 * Calcule le nombre de nuits entre deux dates
 * @param {string} dateArrivee
 * @param {string} dateDepart
 * @returns {number}
 */
function calculerNuits(dateArrivee, dateDepart) {
  let d1 = parseDate(dateArrivee);
  let d2 = parseDate(dateDepart);

  let diff = d2 - d1; // en millisecondes
  let nuits = diff / (1000 * 60 * 60 * 24);

  return nuits;
}

/**
 * Calcule le prix du séjour avec réduction
 * @param {number} prixNuit
 * @param {number} nbNuits
 * @param {string} typeClient
 * @returns {number}
 */
function calculerPrixSejour(prixNuit, nbNuits, typeClient) {
  let total = prixNuit * nbNuits;

  if (typeClient === "fidele") {
    total *= 0.9;
  } else if (typeClient === "vip") {
    total *= 0.8;
  }

  return total;
}

/**
 * Vérifie si une chambre est disponible
 * @param {number} chambre
 * @param {Array} reservations
 * @returns {boolean}
 */
function verifierDisponibilite(chambre, reservations) {
  return !reservations.some(r => r.chambre === chambre);
}

/**
 * Crée une réservation
 * @param {string} nom
 * @param {number} chambre
 * @param {string} arrivee
 * @param {string} depart
 * @param {string} typeClient
 * @param {number} prixNuit
 * @returns {Object}
 */
function creerReservation(nom, chambre, arrivee, depart, typeClient, prixNuit) {
  let nbNuits = calculerNuits(arrivee, depart);
  let total = calculerPrixSejour(prixNuit, nbNuits, typeClient);

  return {
    nom,
    chambre,
    arrivee,
    depart,
    nbNuits,
    prixNuit,
    typeClient,
    total
  };
}

/**
 * Affiche une réservation
 * @param {Object} r
 */
function afficherReservation(r) {
  let reduction = "";
  if (r.typeClient === "fidele") reduction = "Client fidèle (-10%)";
  else if (r.typeClient === "vip") reduction = "Client VIP (-20%)";
  else reduction = "Client standard";

  console.log("\n===== Confirmation de Réservation =====");
  console.log(`Client  : ${r.nom}`);
  console.log(`Chambre : ${r.chambre}`);
  console.log(`Arrivée : ${r.arrivee}`);
  console.log(`Départ  : ${r.depart}`);
  console.log(`Durée   : ${r.nbNuits} nuits`);
  console.log(`Tarif   : ${r.prixNuit} DH/nuit`);
  console.log(`Statut  : ${reduction}`);
  console.log("---------------------------------------");
  console.log(`Total   : ${r.total.toFixed(2)} DH`);
  console.log("=======================================\n");
}

let reservations = [
  { chambre: 101 },
  { chambre: 102 },
  { chambre: 203 }
];

let chambreChoisie = 204;

if (verifierDisponibilite(chambreChoisie, reservations)) {
  let reservation = creerReservation(
    "M. Benali",
    chambreChoisie,
    "15/07/2025",
    "20/07/2025",
    "fidele",
    450
  );

  afficherReservation(reservation);
} else {
  console.log("Chambre non disponible ");
}
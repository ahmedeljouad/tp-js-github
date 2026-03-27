const readline = require("readline-sync");

/**
 * Calcule le prix TTC à partir du prix HT et du taux de TVA
 * @param {number} prixHT - Prix hors taxe
 * @param {number} tauxTVA - Taux de TVA (ex: 0.2 pour 20%)
 * @returns {number} Prix TTC
 */
function calculerTTC(prixHT, tauxTVA) {
  return prixHT + prixHT * tauxTVA;
}

/**
 * Applique une remise sur un prix donné
 * @param {number} prix - Prix initial
 * @param {number} pourcentage - Pourcentage de remise (ex: 10 pour 10%)
 * @returns {number} Prix après remise
 */
function appliquerRemise(prix, pourcentage) {
  return prix - (prix * pourcentage) / 100;
}

/**
 * Calcule le total HT d'une liste d'articles
 * @param {Array} articles - Tableau d'objets { nom, prixHT, quantite }
 * @returns {number} Total HT
 */
function calculerTotal(articles) {
  let total = 0;
  for (let article of articles) {
    total += article.prixHT * article.quantite;
  }
  return total;
}

/**
 * Génère et affiche une facture complète
 * @param {Array} articles
 * @param {number} tauxTVA
 * @param {number} remise
 */
function genererFacture(articles, tauxTVA, remise) {
  console.log("\n===== FACTURE =====");

  articles.forEach(article => {
    let totalArticle = article.prixHT * article.quantite;
    console.log(
      `${article.nom.padEnd(15)} x${article.quantite}   ${totalArticle.toFixed(2)} DH`
    );
  });

  console.log("-------------------");

  let totalHT = calculerTotal(articles);
  let montantRemise = (totalHT * remise) / 100;
  let totalApresRemise = totalHT - montantRemise;
  let montantTVA = totalApresRemise * tauxTVA;
  let totalTTC = totalApresRemise + montantTVA;

  console.log(`Total HT  :   ${totalHT.toFixed(2)} DH`);
  console.log(`Remise ${remise}%:   -${montantRemise.toFixed(2)} DH`);
  console.log(`TVA ${tauxTVA * 100}%   :    ${montantTVA.toFixed(2)} DH`);
  console.log("-------------------");
  console.log(`Total TTC :   ${totalTTC.toFixed(2)} DH`);
  console.log("===================\n");
}

let articles = [];

for (let i = 0; i < 3; i++) {
  console.log(`\nArticle ${i + 1}:`);

  let nom = readline.question("Nom: ");
  let prixHT = parseFloat(readline.question("Prix HT: "));
  let quantite = parseInt(readline.question("Quantite: "));

  articles.push({ nom, prixHT, quantite });
}

let tauxTVA = parseFloat(readline.question("\nTaux TVA (ex: 0.2): "));
let remise = parseFloat(readline.question("Remise (%): "));

genererFacture(articles, tauxTVA, remise);
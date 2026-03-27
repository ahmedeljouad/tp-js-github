/**
 * Ajoute une dépense
 * @param {Array} depenses
 * @param {string} description
 * @param {number} montant
 * @param {string} categorie
 * @returns {Array}
 */
function ajouterDepense(depenses, description, montant, categorie) {
  depenses.push({ description, montant, categorie });
  return depenses;
}

/**
 * Calcule le total par catégorie
 * @param {Array} depenses
 * @returns {Object}
 */
function totalParCategorie(depenses) {
  return depenses.reduce((acc, d) => {
    acc[d.categorie] = (acc[d.categorie] || 0) + d.montant;
    return acc;
  }, {});
}

/**
 * Filtre les dépenses supérieures à un seuil
 * @param {Array} depenses
 * @param {number} seuil
 * @returns {Array}
 */
function depensesSupA(depenses, seuil) {
  return depenses.filter(function (d) {
    return d.montant > seuil;
  });
}

/**
 * Applique une transformation sur chaque dépense
 * @param {Array} depenses
 * @param {(m:number)=>number} transformation
 * @returns {Array}
 */
function appliquerSurDepenses(depenses, transformation) {
  return depenses.map(d => ({
    ...d,
    montant: transformation(d.montant)
  }));
}

/**
 * Génère un rapport mensuel
 * @param {Array} depenses
 * @param {number} budget
 */
function rapportMensuel(depenses, budget) {
  console.log(`\n===== Rapport Mensuel — Budget : ${budget} DH =====`);

  // Total
  let total = depenses.reduce((sum, d) => sum + d.montant, 0);
  let restant = budget - total;

  console.log(`Total dépensé     : ${total} DH`);
  console.log(`Budget restant    : ${restant} DH\n`);

  // Par catégorie
  let totaux = totalParCategorie(depenses);

  console.log("Par catégorie :");
  for (let cat in totaux) {
    console.log(`  ${cat.padEnd(12)} : ${totaux[cat]} DH`);
  }

  // Catégorie max
  let maxCat = Object.keys(totaux).reduce((a, b) =>
    totaux[a] > totaux[b] ? a : b
  );

  console.log(`\nCatégorie la plus coûteuse : ${maxCat}`);

  // Top 3 dépenses
  let top3 = [...depenses]
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 3);

  console.log("\nTop 3 des dépenses :");
  top3.forEach((d, i) => {
    console.log(
      `  ${i + 1}. ${d.description.padEnd(20)} : ${d.montant} DH`
    );
  });
}

let depenses = [
  { description: "Courses supermarché", montant: 350, categorie: "alimentation" },
  { description: "Abonnement internet", montant: 200, categorie: "factures" },
  { description: "Restaurant", montant: 180, categorie: "alimentation" },
  { description: "Essence", montant: 250, categorie: "transport" },
  { description: "Cinéma", montant: 80, categorie: "loisirs" },
  { description: "Électricité", montant: 320, categorie: "factures" },
  { description: "Bus mensuel", montant: 120, categorie: "transport" },
];

// Ajouter dépense
ajouterDepense(depenses, "Taxi", 90, "transport");

// Filtrer
let grosses = depensesSupA(depenses, 200);

// Transformation (inflation +5%)
let inflation = appliquerSurDepenses(depenses, m => m * 1.05);

// Transformation (arrondi)
let arrondi = appliquerSurDepenses(depenses, m => Math.round(m));

// Rapport
rapportMensuel(depenses, 2000);
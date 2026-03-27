const readline = require("readline-sync");

/**
 * Crée une caisse avec panier privé (closure)
 * @param {Array} catalogue
 */
function creerCaisse(catalogue) {
  let panier = [];
  let promotion = { type: null, valeur: 0 };

  //  fonctions internes (arrow)
  const calculSousTotal = () =>
    panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  const calculRemise = (total) => {
    if (promotion.type === "pourcentage") {
      return total * (promotion.valeur / 100);
    } else if (promotion.type === "montantFixe") {
      return promotion.valeur;
    }
    return 0;
  };

  const calculMonnaie = (donne, total) => donne - total;

  return {
    /**
     * Scanner un article
     */
    scanner(code, quantite) {
      let produit = catalogue.find(p => p.code === code);

      if (!produit) {
        console.log("Produit introuvable ");
        return;
      }

      let existant = panier.find(p => p.code === code);

      if (existant) {
        existant.quantite += quantite;
      } else {
        panier.push({ ...produit, quantite });
      }

      console.log(`${produit.nom} ajouté `);
    },

    /**
     * Appliquer promotion
     */
    appliquerPromotion(type, valeur) {
      promotion = { type, valeur };
      console.log("Promotion appliquée ");
    },

    /**
     * Calcul total
     */
    calculerTotal() {
      let sousTotal = calculSousTotal();
      let remise = calculRemise(sousTotal);
      return sousTotal - remise;
    },

    /**
     * Encaisser
     */
    encaisser(montantDonne) {
      let total = this.calculerTotal();

      if (montantDonne < total) {
        console.log("Montant insuffisant ");
        return null;
      }

      return calculMonnaie(montantDonne, total);
    },

    /**
     * Afficher ticket
     */
    afficherTicket(montantDonne = 0) {
      console.log("\n========== ÉPICERIE AL WAFA ==========");
      console.log("         Ticket de caisse");
      console.log("--------------------------------------");

      panier.forEach(p => {
        let total = p.prix * p.quantite;
        console.log(
          `${p.nom.padEnd(20)} x${p.quantite}   ${total.toFixed(2)} DH`
        );
      });

      console.log("--------------------------------------");

      let sousTotal = calculSousTotal();
      let remise = calculRemise(sousTotal);
      let total = sousTotal - remise;

      console.log(`Sous-total         : ${sousTotal.toFixed(2)} DH`);

      if (promotion.type) {
        let label =
          promotion.type === "pourcentage"
            ? `(${promotion.valeur}%)`
            : `(-${promotion.valeur} DH)`;

        console.log(`Promotion ${label} : -${remise.toFixed(2)} DH`);
      }

      console.log("--------------------------------------");
      console.log(`TOTAL              : ${total.toFixed(2)} DH`);
      console.log("--------------------------------------");

      if (montantDonne > 0) {
        let monnaie = calculMonnaie(montantDonne, total);

        console.log(`Montant reçu       : ${montantDonne.toFixed(2)} DH`);
        console.log(`Monnaie rendue     : ${monnaie.toFixed(2)} DH`);
      }

      console.log("======================================");
      console.log("     Merci pour votre visite !");
      console.log("======================================\n");
    }
  };
}

let catalogue = [
  { code: "L1", nom: "Lait demi-écrémé", prix: 9 },
  { code: "P1", nom: "Pain de mie", prix: 12.5 },
  { code: "Y1", nom: "Yaourt nature", prix: 5.5 },
  { code: "J1", nom: "Jus d'orange", prix: 15 },
];

let caisse = creerCaisse(catalogue);

function menu() {
  while (true) {
    console.log("\n===== CAISSE =====");
    console.log("1. Scanner article");
    console.log("2. Appliquer promotion");
    console.log("3. Voir total");
    console.log("4. Encaisser");
    console.log("5. Afficher ticket");
    console.log("6. Quitter");

    let choix = readline.question("> ");

    switch (choix) {
      case "1":
        let code = readline.question("Code produit: ");
        let qte = parseInt(readline.question("Quantite: "));
        caisse.scanner(code, qte);
        break;

      case "2":
        let type = readline.question("Type (pourcentage/montantFixe): ");
        let val = parseFloat(readline.question("Valeur: "));
        caisse.appliquerPromotion(type, val);
        break;

      case "3":
        console.log("Total :", caisse.calculerTotal().toFixed(2), "DH");
        break;

      case "4":
        let montant = parseFloat(readline.question("Montant donne: "));
        let monnaie = caisse.encaisser(montant);
        if (monnaie !== null)
          console.log("Monnaie :", monnaie.toFixed(2), "DH");
        break;

      case "5":
        let m = parseFloat(readline.question("Montant donne (0 si non): "));
        caisse.afficherTicket(m);
        break;

      case "6":
        console.log("Au revoir ");
        return;

      default:
        console.log("Choix invalide ");
    }
  }
}

menu();
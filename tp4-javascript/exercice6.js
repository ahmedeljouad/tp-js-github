const readline = require("readline-sync");

/**
 * Closure pour générer des IDs auto-incrémentés
 */
const genererId = (function () {
  let id = 0;
  return function () {
    id++;
    return id;
  };
})();

/**
 * Crée un contact
 * @param {string} nom
 * @param {string} prenom
 * @param {string} telephone
 * @param {string} email
 * @param {string} ville
 * @returns {Object}
 */
function creerContact(nom, prenom, telephone, email, ville) {
  return {
    id: genererId(),
    nom,
    prenom,
    telephone,
    email,
    ville
  };
}

/**
 * Recherche des contacts (insensible à la casse)
 * @param {Array} contacts
 * @param {string} motCle
 * @returns {Array}
 */
function rechercherContacts(contacts, motCle) {
  let mc = motCle.toLowerCase();

  return contacts.filter(c =>
    c.nom.toLowerCase().includes(mc) ||
    c.prenom.toLowerCase().includes(mc) ||
    c.ville.toLowerCase().includes(mc)
  );
}

/**
 * Trie les contacts selon une clé
 * @param {Array} contacts
 * @param {string} cle
 * @returns {Array}
 */
function trierContacts(contacts, cle) {
  return [...contacts].sort((a, b) =>
    a[cle].localeCompare(b[cle])
  );
}

/**
 * Formate un contact
 * @param {Object} c
 * @returns {string}
 */
function formaterContact(c) {
  let idStr = String(c.id).padStart(3, "0");

  return `[${idStr}] ${c.nom} ${c.prenom}`.padEnd(25) +
    ` — ${c.ville.padEnd(12)} | ${c.telephone} | ${c.email}`;
}

let contacts = [];

function menu() {
  while (true) {
    console.log("\n===== Carnet d'adresses =====");
    console.log("1. Ajouter un contact");
    console.log("2. Rechercher");
    console.log("3. Afficher tous (triés par nom)");
    console.log("4. Quitter");

    let choix = readline.question("> ");

    switch (choix) {
      case "1":
        let nom = readline.question("Nom: ");
        let prenom = readline.question("Prenom: ");
        let tel = readline.question("Telephone: ");
        let email = readline.question("Email: ");
        let ville = readline.question("Ville: ");

        let contact = creerContact(nom, prenom, tel, email, ville);
        contacts.push(contact);

        console.log("Contact ajouté ");
        break;

      case "2":
        let motCle = readline.question("Mot-clé: ");
        let resultats = rechercherContacts(contacts, motCle);

        console.log("\nRésultats:");
        resultats.forEach(c => console.log(formaterContact(c)));
        break;

      case "3":
        let tries = trierContacts(contacts, "nom");

        console.log("");
        tries.forEach(c => console.log(formaterContact(c)));
        break;

      case "4":
        console.log("Au revoir ");
        return;

      default:
        console.log("Choix invalide ");
    }
  }
}

menu();
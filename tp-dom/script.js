// Exercice 1.1 :
let titrePrincipal = document.getElementById("titre-principal");
console.log("Titre principal:",titrePrincipal);
let allParag = document.getElementsByTagName("p");
console.log("Tous les paragraphes :",allParag);
let classpara = document.getElementsByClassName("para");
console.log("Element para :",classpara);
let inexistant = document.getElementById("zone-inexistante");
console.log("Zone inexistante :",inexistant);
// Exercice 1.2 :
let spanEtiquet = document.querySelector("span.etiquette");
console.log("Span qui conient classe etiquette :",spanEtiquet);
let divBloc = document.querySelector("div#bloc");
console.log("Div dont l'identifiant bloc :",divBloc);
let paraDivbloc = document.querySelectorAll("#bloc p");
console.log("Tous les paragraphes qui se trouvent a l'interieur du div#bloc :",paraDivbloc);
let paraEmphase = document.querySelector(".para.emphase");
console.log("Le paragraphe qui possede la classe para et emphase :",paraEmphase);
// Exercice 1.3 :
console.log("La liste de tous les noeuds enfants directs de div#bloc :",divBloc.childNodes);
console.log("Nombre des noeuds :",divBloc.childNodes.length);
console.log("Les elements HTML enfants de div#bloc uniquement :",divBloc.children);
console.log("Nombre des elements HTML :",divBloc.children.length);
let parag2 = divBloc.children[2];
console.log("Deuxieme paragraphe :",parag2);
let paragSuivant = parag2.nextElementSibling;
console.log("Paragraphe suivant :",paragSuivant);
let paragPrecedent = parag2.previousElementSibling;
console.log("Paragraphe precedent :",paragPrecedent);
let elementParent = divBloc.parentElement;
console.log("Element parent de div#bloc est :",elementParent);
// Exercice 2.1 :
let H1 = document.querySelector("#titre-principal");
H1.textContent = "TP DOM - En cours";
console.log(H1.textContent);
let changPara = document.querySelector(".para");
changPara.textContent= "Paragraphe A - modifie";
console.log(changPara.textContent);
let remplaceContenu = document.querySelector(".etiquette");
remplaceContenu.innerHTML = "<strong>Bloc modifie</strong>";
console.log(remplaceContenu.innerHTML);
// Exercice 2.2:
 let Bloc = document.querySelector("#bloc");
 divBloc.style.backgroundColor= "#e8f4fc";
 let text = document.querySelector("#titre-principal");
 text.style.color = "#1a237e";
 let toutparag = document.getElementsByClassName("para");
 for(let i = 0;i<toutparag.length;i++) {
    toutparag[i].style.fontSize = "18px";
 }
 // Exercice 2.3:
 let paraemph = document.querySelector(".para.emphase");
 paraemph.classList.add("surligne");

paraemph.classList.remove("emphase");
let premierParag = document.querySelector(".para");
let classe1 = premierParag.classList.contains("surligne");
console.log("Le premier paragraphe a-t-il la classe 'surligne' ?", classe1);
let titre = document.querySelector("#titre-principal");
// titre invisible
titre.classList.toggle("cache");
// titre visible
titre.classList.toggle("cache");
// Exercice 2.4 :
let bloc3 = document.querySelector("#bloc");
function cacherBloc() {
    bloc3.style.display = "none";
    console.log("Le bloc est maintenant caché.");
}
function montrerBloc() {
    bloc3.style.display = "block";
    console.log("Le bloc est maintenant visible.");
}
let boutonCacher = document.querySelector("#btn-cacher");
let boutonAfficher = document.querySelector("#btn-afficher");
boutonCacher.addEventListener("click", cacherBloc);
boutonAfficher.addEventListener("click", montrerBloc);
// Exercice 3.1 :
let nouveauPara = document.createElement("p");
nouveauPara.textContent = "Paragraphe ajouté dynamiquement";
nouveauPara.classList.add("para");

let zoneAjoute = document.querySelector("#zone-ajout");
zoneAjoute.appendChild(nouveauPara);
console.log("Nouveau paragraphe inséré ");
// Exercice 3.2 :
let nouveauTitre = document.createElement("h2");
nouveauTitre.textContent = "Section ajoutée";

let container = document.querySelector("#container");
let bloc2 = document.querySelector("#bloc");

container.insertBefore(nouveauTitre, bloc2);
console.log("Le titre <h2> a été inséré avant le #bloc !");
// Exercice 3.3 :

let premierParaDansBloc = document.querySelector("#bloc .para");
let nbAvant = document.querySelectorAll("#bloc .para").length;
console.log("Nombre de paragraphes dans le bloc AVANT :", nbAvant);
if (premierParaDansBloc) {
    premierParaDansBloc.remove();
    console.log("Le premier paragraphe du bloc a été supprimé.");
}
let nbApres = document.querySelectorAll("#bloc .para").length;
console.log("Nombre de paragraphes dans le bloc APRÈS :", nbApres);
// Exercice 3.4 :
/**
 * @param {string[]} items
 */
function genererListe(items) {
    let listeUl = document.createElement("ul");
    items.forEach(function(texte) {

        let elementLi = document.createElement("li");

        elementLi.textContent = texte;
        listeUl.appendChild(elementLi);
    });
    let zoneAjout = document.querySelector("#zone-ajout");
    zoneAjout.appendChild(listeUl);
    console.log("La liste a été générée avec succès !");
}
genererListe(["Element 1", "Element 2", "Element 3", "Element 4"]);
// Exercice 4.1 et 4.2 :
let compteurGlobal = 0;
    let btn = document.querySelector("#btn-action");
    let titr = document.querySelector("#titre-principal");
    if (btn) {
        btn.addEventListener("click", function() {
            titr.textContent = "Bouton cliqué !";
            compteurGlobal++;
            btn.textContent = `Cliqué ${compteurGlobal} fois`;
        });
    }
// Exercice 4.3 :
document.addEventListener("DOMContentLoaded", function() {
    let comp = 0;
    let btnAction = document.querySelector("#btn-action");
    if (btnAction) {
        btnAction.addEventListener("click", function() {
            comp++;
            btnAction.textContent = `Cliqué ${comp} fois`;
        });
    }
});
// Exercice 4.4 :
let champTexte = document.getElementById("champ-texte");
let btnAj = document.getElementById("btn-ajouter");
let maListe = document.getElementById("ma-liste");
btnAj.addEventListener("click", function() {
    let texteSaisi = champTexte.value.trim();
    if (texteSaisi !== "") {
        let nouvelItem = document.createElement("li");
        nouvelItem.textContent = texteSaisi;
        maListe.appendChild(nouvelItem);
        champTexte.value = "";
        champTexte.focus();
        console.log("Élément ajouté :", texteSaisi);
    } else {
        console.log("Alerte : Le champ est vide, impossible d'ajouter un élément !");
    }
});




 

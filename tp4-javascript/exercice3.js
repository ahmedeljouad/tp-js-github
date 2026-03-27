const readline = require("readline-sync");

/**
 * Convertit MAD vers EUR
 * @param {number} montant
 * @returns {number}
 */
const madToEur = (montant) => montant * 0.093;

/**
 * Convertit MAD vers USD
 * @param {number} montant
 * @returns {number}
 */
const madToUsd = (montant) => montant * 0.099;

/**
 * Convertit MAD vers GBP
 * @param {number} montant
 * @returns {number}
 */
const madToGbp = (montant) => montant * 0.080;

/**
 * Fonction générique de conversion
 * @param {number} montant
 * @param {(m:number)=>number} fonctionConversion
 * @param {string} nomDevise
 */
function convertir(montant, fonctionConversion, nomDevise) {
  let resultat = fonctionConversion(montant);
  console.log(`${nomDevise} : ${resultat.toFixed(2)}`);
}

/**
 * Convertit Celsius vers Fahrenheit
 * @param {number} c
 * @returns {number}
 */
const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;

/**
 * Convertit Celsius vers Kelvin
 * @param {number} c
 * @returns {number}
 */
const celsiusToKelvin = (c) => c + 273.15;

/**
 * Affiche un tableau de conversions de température
 * @param {number} tempMin
 * @param {number} tempMax
 * @param {number} pas
 */
function tableauConversions(tempMin, tempMax, pas) {
  console.log(
    `\n=== Tableau de températures (${tempMin}°C → ${tempMax}°C, pas ${pas}) ===`
  );
  console.log("Celsius | Fahrenheit | Kelvin");
  console.log("--------|------------|--------");

  for (let c = tempMin; c <= tempMax; c += pas) {
    let f = celsiusToFahrenheit(c);
    let k = celsiusToKelvin(c);

    console.log(
      `${c.toString().padStart(5)} | ${f.toFixed(2).padStart(10)} | ${k
        .toFixed(2)
        .padStart(6)}`
    );
  }
}

// Lecture utilisateur
let montant = parseFloat(readline.question("Montant en MAD: "));
let temp = parseFloat(readline.question("Temperature en Celsius: "));

// Conversions devises
console.log(`\n=== Conversions pour ${montant} MAD ===`);
convertir(montant, madToEur, "EUR");
convertir(montant, madToUsd, "USD");
convertir(montant, madToGbp, "GBP");

// Conversions température simple
console.log(`\nPour ${temp}°C :`);
console.log(`Fahrenheit : ${celsiusToFahrenheit(temp).toFixed(2)}`);
console.log(`Kelvin     : ${celsiusToKelvin(temp).toFixed(2)}`);

// Tableau
tableauConversions(0, 40, 10);
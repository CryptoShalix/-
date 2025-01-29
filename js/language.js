/**
 * @version 1.0.0
 * @file language.js
 * @description This file handles the language translation.
 * @author CryptoShalix <https://github.com/CryptoShalix>
 * @see https://cryptoshalix.github.io/site
 * 
 * How to use:
 * 1. Include this file in your HTML file.
 *    <script type="text/javascript" src="js/language.js"></script>
 * 2. Add a 'data-trn-key' attribute to the element you want to translate.
 * 3. Add the specified 'trn_class' class to the element you want to translate.
 * 4. Create the JSON files with the translations. Make sure the 'trn_path' is correct.
 * 
 * Example:
 *  <h1 class="trn" data-trn-key="global.title"></h1>
 */

/***************************************************************/
// MAIN VARIABLES
/***************************************************************/

const TRN_CLASS = '.trn';
const TRN_PATH = '../localization/';

const languages = ['es', 'en'];
const translations = {};
let currentLanguage = 'es';

/***************************************************************/
// MAIN METHOD
/***************************************************************/

$(async function () {
  await prepareLanguages();
  onTranslate();
});

/***************************************************************/
// PUBLIC METHODS
/***************************************************************/

function toggleLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  onTranslate();
};

/***************************************************************/
// PRIVATE METHODS
/***************************************************************/

async function prepareLanguages() {
  for (const language of languages) {
    let res = await fetch(`${TRN_PATH}${language}.json`);
    let json = await res.json();
    translations[language] = json;
  }
}

function onTranslate() {
  if (translations[currentLanguage] === undefined) {
    setTimeout(onTranslate, 100);
    return;
  }
  $(TRN_CLASS).each(function () {
    var trn_key = $(this).attr("data-trn-key");
    if (!isNullOrEmpty(trn_key)) {
      var htmlText = parseTRN(translations[currentLanguage][0], trn_key);
      if (!isNullOrEmpty(htmlText))
        $(this).html(htmlText);
    }
  });
};

function parseTRN(dict, trn) {
  if (trn.includes('.')) {
    const valueLevels = trn.split('.');
    let base = dict;
    for (const level of valueLevels) {
      if (isNullOrEmpty(base[level])) { return dict[trn]; }
      base = base[level];
    }
    result = base;
  } else {
    result = dict[trn];
  }
  return isNullOrEmpty(result) ? dict[trn] : result;
}

function isNullOrEmpty(val) {
  return val === null || val === undefined || val === '';
}
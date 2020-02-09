const Spinner = require('cli-spinner').Spinner;


function randWord(request) {
    // Request is the array of words or objects : return the random from given array
    var rand = Math.floor(Math.random() * request.length);
    return request[rand];

}

function isEmpty(value){
    if(value == null || value.length == 0 || value == undefined)
    return true;

    return false;
}
function toLower(value) {
    return value.toLowerCase();
}

var spinnerObj = new Spinner({
    stream: process.stderr,
    onTick: function (msg) {
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
});
/*
  @ Function randomHintGenerator
  @ Definition Generate the Hint for User
  @ param result
*/
function randomHintGenerator(result , callback) {

    /*
      1. Jumbled word
      2. Definition
      3. Synonmys
      4. Antonyms
    */
    var rand = Math.floor(Math.random() * 4);
    var selected = true;
    while(selected){
      switch (rand) {
        case 0 :
          // jumble the word permutation of word
          var wrd = result.word.split('')
          wrd.sort(function () {
            return 0.5 - Math.random();
          });
          wrd = wrd.join('');
          selected = false;
          console.log(colors.green('Hint :' + colors.yellow(wrd)))
          break;
        case 1 :
          // Definition of word
          if (!isEmpty(result.definition)) {
            var value = randWord(result.definition)
            console.log(colors.green('Hint : '+ colors.yellow(value.text)))
            selected = false
          }
          break;
        case 2 :
          // return the synonyms
          if (!isEmpty(result.synonym)) {
            var value = randWord(result.synonym)
            console.log(colors.green('Hint :' + colors.yellow(value)))
            selected = false
          }
          break;
          
        case 3 :
          // return the antonyms
          if (!isEmpty(result.antonym)) {
            var value = randWord(result.antonym)
            console.log(colors.green('Hint : ' + colors.yellow(value)))
            selected = false
          }
          break;
      }
    }
    callback()
  }

module.exports = {
    randWord,
    spinnerObj,
    toLower,
    isEmpty,
    randomHintGenerator
}
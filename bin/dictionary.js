#!/usr/bin/env node

const commander = require('commander'),
  { prompt } = require('inquirer'),
  { randWord, spinnerObj, isEmpty } = require('../lib/common.js')
colors = require('colors'),

  require('dotenv').config({ path: '../.env' })
/* 
Import all the services to use in dictionary
*/
const {
  randomWord,
  examples,
  definitions,
  relatedWords,
  randFullDict
} = require('../controllers/services');


var question = [
  {
    type: 'input',
    name: 'word',
    message: 'Enter the Word ..'
  }
]

commander
  .version('1.0.0')
  .description('Command Line Dictionary')

/* 
  * Function Which required command as "defn" and user input as word
    Return the Definition of the given word 
*/
commander
  .command('Definition <word> ')
  .alias('defn')
  .description('Definition of given Word')
  .action(async (word) => {
    /* We will get the word entered by the user */
    try {
      spinnerObj.start()
      await definitions(word, (res) => {
        spinnerObj.stop()
        console.log('\n')
        if (!isEmpty(res)) {
          console.log(colors.green('Definitions of the word ' + colors.yellow(word) + ' are as follow :'))
          var count = 1
          res.forEach(element => {
            console.log(colors.yellow(count++) + ' ' + element.text);
            console.log('')
          });
        } else {
          console.log(colors.red('No definition found for word : ' + colors.yellow(word)))
        }
      })
    } catch (e) {
      console.error(e);
    }
  });

/* 
* Function Which required command as "sys" and user input as word 
  Returns the synonym of the given word
*/
commander
  .command('Synonym <word> ')
  .alias('sys')
  .description('Synonyms of a given word')
  .action(async (synonym) => {
    try {
      spinnerObj.start()
      await relatedWords(synonym, (res) => {
        console.log('\n')
        spinnerObj.stop()
        if (isEmpty(res) || !isEmpty(res.error)){
          console.error(colors.red('Please try again , no synonmys found.'))
          console.log('\n')
        } else {
          var words;
          res.forEach(element => {
            if (element.relationshipType == 'synonym') {
              words = element.words;
            }
          });
          /* Check if the synonym of Word found or Not */
          if (!isEmpty(words)) {
            console.log(colors.green('Synonym of the word ' + colors.yellow(synonym) + ' : ' + randWord(words)))
            console.log('\n')
          } else {
            console.error(colors.red('Please try again , no synonmys found.'))
            console.log('\n')
          }
        }
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

/* 
  * Function Which required command as "ant" and user input as word 
    Returns the antonym of the given word
*/
commander
  .command('Antonyms <word> ')
  .alias('ant')
  .description('Antonyms of a given word')
  .action(async (antonyms) => {
    try {
      spinnerObj.start()
      await relatedWords(antonyms, (res) => {
        console.log('\n')
        spinnerObj.stop()
        /* Check if the synonym of Word found or Not */
        if (isEmpty(res) || !isEmpty(res.error)) {
          console.error(colors.res('Please try again , no Antonyms found.'))
          console.log('\n')
        } else {
          var words;
          res.forEach(element => {
            if (element.relationshipType == 'antonym') {
              words = element.words;
            }
          });
          if (!isEmpty(words)) {
            console.log(colors.green('Antonym of the word ' + colors.yellow(antonyms) + ' : ' + randWord(words)))
            console.log('\n')
          } else {
            console.error(colors.red('Please try again , no antonyms found.'))
          }
        }
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

/* 
  * Function Which required command as "ex" and user input as word 
    Returns the Examples of the given word
*/

commander
  .command('Example <word> ')
  .alias('ex')
  .description('Examples of usage of a given word in a sentence')
  .action(async (word) => {
    try {
      spinnerObj.start()
      await examples(word, (res) => {
        console.log('\n')
        spinnerObj.stop()
        if (!isEmpty(res)) {
          console.log(colors.green('Examples of the word ' + colors.yellow(word) + ' are as follow :'))
          var count = 1
          res.forEach(element => {
            console.log(colors.yellow(count++) + ' ' + element.text);
            console.log('')
          });
        } else {
          console.log(colors.green('No examples of the word ' + colors.yellow(word) + 'found'))
        }
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

/* 
  * Function Which required No command and user input as word 
    Returns the Definition, synonym, antonym and examples of the given word
*/

commander
  .command('<word> ')
  .alias('')
  .description('Definitions, Synonyms, Antonyms & Examples for a given word')
  .action(() => {
    prompt(question).then((ans) => {
      spinnerObj.start()
      var input = {
        "word": ans,
        "guess": false
      }
      randFullDict(input, (res) => {
        result = res;
        spinnerObj.stop()
      })
      commander.outputHelp()
    });
  })

/* 
  * Function Which required "play" as command. 
    Returns the Definition, synonym, antonym.
    User will prompted with input.
*/

commander
  .command('Gameplay ')
  .alias('play')
  .description('Guess the word from given examples')
  .action(async () => {

    /* First call the random word api to get the random word */
    try {
      spinnerObj.start()
      let result;
      console.log(colors.yellow('Guess the Word: '))
      randomWord((word) => {
        var input = {
          "word": word,
          "guess": true
        }
        randFullDict(input, (res) => {
          result = res;
          spinnerObj.stop()
        })
      })
      prompt(question).then((ans) => {
        console.log(ans.word + " " + result)
        if (ans.word.toLowerCase() == result) {
          console.log('You guessed it right')
        } else {
          // check for synonms of the words
          // if not present the error message
          console.log(colors.red('You have entered the wrong answer . Try again'))
          /*
          1. try again
          2. with another definition and antonyms
          3. quit
          */
        }
      });
    } catch (e) {
      spinnerObj.stop()
      console.error(e);
    }
  });

// Assert that a VALID command is provided from the Command line interface
if (!process.argv.slice(2).length) {
  // Implement the Random word functionalty
  randomWord((word) => {
    console.log(colors.cyan('Today\'s Word : ') + word)
    var input = {
      "word": word,
      "guess": false
    }
    randFullDict(input, (res) => {
      result = res;
      spinnerObj.stop()
      console.log('\n')
      commander.outputHelp();
      console.log('\n')
      process.exit();
    })
  })
}
commander.parse(process.argv)

#!/usr/bin/env node

const commander = require('commander'),
  { prompt } = require('inquirer'),
  colors = require('colors'),
  { randWord, spinnerObj } = require('../lib/common.js')

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
        console.log(colors.green('Definitions of the word ' + colors.yellow(word) + ' are as follow :'))
        var count = 1
        res.forEach(element => {
          console.log(count++ + ' ' + element.text);
          console.log('')
        });
      })
    } catch (e) {
      console.error(e);
    }
  });

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
        /* Check if the synonym of Word found or Not */
        if (res[1].words.length) {
          console.log(colors.green('Synonym of the word ' + colors.yellow(synonym) + ' : ' + randWord(res[1].words)))
          console.log('\n')
        } else {
          console.error('Please try again , no synonmys found.')
          console.log('\n')
        }
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

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
        if (res[0].words.length) {
          console.log(colors.green('Synonym of the word ' + colors.yellow(antonyms) + ' : ' + randWord(res[0].words)))
          console.log('\n')
        } else {
          console.error('Please try again , no antonyms found.')
          console.log('\n')
        }
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

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
        console.log(colors.green('Examples of the word ' + colors.yellow(word) + ' are as follow :'))
        var count = 1
        res.forEach(element => {
          console.log(colors.yellow(count++) + ' ' + element.text);
          console.log('')
        });
        commander.outputHelp();
      })
    } catch (e) {
      console.error(e);
    }
  });

commander
  .command('<word> ')
  .alias('word')
  .description('Definitions, Synonyms, Antonyms & Examples for a given word')
  .action(() => {
    prompt(question).then((ans) => {
      spinnerObj.start()
        randFullDict(ans ,(res) => {
          result = res;
          spinnerObj.stop()     
        })
      commander.outputHelp()
    });
  })

commander
  .command('Gameplay ')
  .alias('play')
  .description('Guess the word from given examples')
  .action(async () => {

    /* First call the random word api to get the random word */
    try {
      spinnerObj.start()
      let result ;
      randomWord((word)=> {
        randFullDict(word ,(res) => {
          result = res;
          spinnerObj.stop()     
        })
      })
      
      prompt(question).then((ans) => {
        console.log(ans.word + " " + result)
        if (ans.word.toLowerCase() == result) {
          console.log('You guessed it right')
        } else {
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

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  console.log(colors.blue('Welcome to Dictionay'));
  console.log(colors.green('Today\'s Word'));
  console.log('');

  commander.outputHelp();
  process.exit();
}
commander.parse(process.argv)

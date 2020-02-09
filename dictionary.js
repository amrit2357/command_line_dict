#!/usr/bin/env node

const commander = require('commander'),
  { prompt } = require('inquirer'),
  { randWord, isEmpty, randomHintGenerator } = require('./lib/common'),
  ora = require('ora');

const spinner = ora('Processing..')
colors = require('colors'),
  require('dotenv').config()
/* 
Import all the services to use in dictionary
*/
const {
  randomWord,
  examples,
  definitions,
  relatedWords,
  randFullDict
} = require('./controllers/services');

var question = [
  {
    type: 'input',
    name: 'word',
    message: 'Enter the Word ..'
  }
]

var tryQuestion = [
  {
    type: 'list',
    name: 'option',
    message: 'Please select which option You want to Choose',
    choices: ['Try again', 'Hint', 'Quit'],
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
  .command('Definition <word>')
  .alias('defn')
  .description('Definition of given Word')
  .action(async (word) => {
    /* We will get the word entered by the user */
    try {
      spinner.start()
      await definitions(word, (res) => {
        spinner.stop()
        console.log('\n')
        if (isEmpty(res) || !isEmpty(res.error)) {
          spinner.fail(colors.red('No Definition found for word : ') + colors.yellow(word))
        } else {
          spinner.succeed('Definitions of the word ' + colors.yellow(word) + ' are as follow :')
          var count = 1
          res.forEach(element => {
            console.log(colors.yellow(count++) + ' -> ' + element.text);
            console.log('')
          });
        }
        commander.outputHelp();
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
      spinner.start()
      await relatedWords(synonym, (res) => {
        spinner.clear()
        if (isEmpty(res) || !isEmpty(res.error)) {
          spinner.fail(colors.red('Please try again , no synonmys found.'))
          console.log('\n')
        } else {
          var words;
          res.forEach(element => {
            if (element.relationshipType == 'synonym') {
              words = element.words;
            }
          });
          spinner.stop()
          /* Check if the synonym of Word found or Not */
          if (!isEmpty(words)) {
            spinner.succeed(colors.green('Synonym of the word ' + colors.yellow(synonym) + ' : ' + randWord(words)))
            console.log('\n')
          } else {
            spinner.fail(colors.red('Please try again , no synonmys found.'))
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
      spinner.start()
      await relatedWords(antonyms, (res) => {
        spinner.clear()
        /* Check if the synonym of Word found or Not */
        if (isEmpty(res) || !isEmpty(res.error)) {
          spinner.fail(colors.red('Please try again , no Antonyms found.'))
          console.log('\n')
        } else {
          var words;
          res.forEach(element => {
            if (element.relationshipType == 'antonym') {
              words = element.words;
            }
          });
          if (!isEmpty(words)) {
            spinner.succeed(colors.green('Antonym of the word ' + colors.yellow(antonyms) + ' : ' + randWord(words)))
            console.log('\n')
          } else {
            spinner.fail(colors.red('Please try again , no antonyms found.'))
          }
        }
        spinner.stop()
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
      spinner.start()
      await examples(word, (res) => {
        spinner.clear()
        console.log('\n')
        if (isEmpty(res) || !isEmpty(res.error)) {
          spinner.fail(colors.red('No examples of the word ' + colors.yellow(word) + ' found'))
        } else {
          spinner.succeed(colors.green('Examples of the word ' + colors.yellow(word) + ' are as follow :'))
          var count = 1
          res.forEach(element => {
            console.log(colors.yellow(count++) + ' -> ' + element.text);
            console.log('')
          });
        }
        spinner.stop()
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
      spinner.start()
      var result;
      spinner.clear()
      console.log(colors.yellow('Guess the Word with given hints: '))
      randomWord((word) => {
        var input = {
          "word": word,
          "guess": true
        }
        spinner.stop()
        randFullDict(input, (res) => {
          result = res;
          spinner.stop()
          prompt(question).then((ans) => {
            if (ans.word.toLowerCase() == result.word || !isEmpty(result.synonym) && (result.synonym).includes(ans.word.toLowerCase)) {
              spinner.succeed("You guessed it right")
            } else {
              spinner.fail(colors.red('You have entered the wrong answer'))
              /*
                1. Try again
                2. Hint with another definition or antonyms
                3. Quit
                */

              prompt(tryQuestion).then((ans) => {
                switch (ans.option) {
                  case 'Try again':
                    /* 
                    Again ask the user for word 
                    */
                    prompt(question).then((ans) => {
                      if (ans.word.toLowerCase() == result.word || !isEmpty(result.synonym) && (result.synonym).includes(ans.word.toLowerCase)) {
                        spinner.succeed("You guessed it right")
                      } else {
                        spinner.fail(colors.red('Again you have entered the wrong answer'))
                      }
                      commander.outputHelp()
                      process.exit(0);
                    })
                    break;
                  case 'Hint':
                    /*
                    Provide the another hint to the User
                    */
                    randomHintGenerator(result, () => {
                      prompt(question).then((ans) => {
                        if (ans.word.toLowerCase() == result.word || !isEmpty(result.synonym) && (result.synonym).includes(ans.word.toLowerCase)) {
                          spinner.succeed("You guessed it right")
                        } else {
                          spinner.fail(colors.red('Again you have entered the wrong answer'))
                        }
                        commander.outputHelp()
                        process.exit(0);
                      });
                    }
                    );
                    break;
                  case 'Quit':
                    // Show the word and full dictionary and Exit the loop
                    spinner.succeed(colors.yellow("The Word to guess Was : " + colors.blue(result.word)))
                    var input = {
                      "word": result.word,
                      "guess": false
                    }
                    randFullDict(input, (res) => {
                      result = res;
                      commander.outputHelp()
                      process.exit(0);
                    });
                    break;
                }
              });
            }
          });
        });
      });
    } catch (e) {
      console.error(e);
    }
  });




/* 
Function called When the user provided nothing in the Command line interface
*/
if (!process.argv.slice(2).length) {
  // Implement the Random word functionalty
  try {
    spinner.start()
    randomWord((word) => {
      spinner.clear()
      spinner.stop()
      console.log(colors.cyan('Today\'s Word is: ') + word)
      var input = {
        "word": word,
        "guess": false
      }
      randFullDict(input, (res) => {
        result = res;
        console.log('\n')
        commander.outputHelp();
      })
    })
  } catch (e) {
    console.log(colors.red('Caught an unhandled exception ' + e))
  }
}

if (process.argv.slice(2).length) {
  // Implement the Random word functionalty
  try {
    var word = process.argv.slice(2)[0]
    var commands = ["defn", "sys", "ant", "play", "ex"]
    if (!commands.includes(word)) {
      var input = {
        "word": word,
        "guess": false
      }
      randFullDict(input, (res) => {
        result = res;
        commander.outputHelp()
      });
    }
  } catch (e) {
    console.log(colors.red('Caught an unhandled exception ' + e))
  }
}
commander.parse(process.argv)

#!/usr/bin/env node

const commander = require('commander'),
    { prompt } = require('inquirer'),
    colors = require('colors')
/* 
Import all the services to use in dictionary
*/
const { 
    randomWord,
    examples,  
    definitions, 
    relatedWords
} = require('./controllers/services'); 

var question = [
    {
    type : 'input',
    name : 'word',
    message : 'Enter the Word ..'
    }
]

commander
  .version('1.0.0')
  .description('Command Line Dictionary')

commander
  .command('Definition <word>')
  .alias('defn')
  .description('Definition of given Word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

  commander
  .command('Synonym <word>')
  .alias('sys')
  .description('Synonyms of a given word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

  commander
  .command('Antonyms <word>')
  .alias('ant')
  .description('Antonyms of a given word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

  commander
  .command('Example <word>')
  .alias('ex')
  .description('Examples of usage of a given word in a sentence')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

  commander
  .command('<word>')
  .alias('')
  .description('Definitions, Synonyms, Antonyms & Examples for a given word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

  commander
  .command('Gameplay')
  .alias('play')
  .description('Guess the word from given examples')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
  });

// Assert that a VALID command is provided 
if (!process.argv.slice(1).length || !/[arudl]/.test(process.argv.slice(2))) {
    console.log(colors.blue('Welcome to Dictionay'));
    console.log(colors.green('Today\'s Word'));
    console.log('\n');
    
    commander.outputHelp();
    process.exit();
  }
  commander.parse(process.argv)







#!/usr/bin/env node

const commander = require('commander'),
    { prompt } = require('inquirer'),
    colors = require('colors');
    require('dotenv').config()
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
  .action(async(word) => {  
        /* We will get the word entered by the user */
        await definitions(word) ,
        console.log(colors.green( 'Definitions of the word ' + colors.yellow(word) + ' are as follow :'))              
  });

  commander
  .command('Synonym <word>')
  .alias('sys')
  .description('Synonyms of a given word')
  .action(async(synonym) => {
      try{
      await relatedWords(synonym , (res)=>{
        console.log(res);
        commander.outputHelp();
      })}catch(e){
        console.error(e);
      }   
  });

  commander
  .command('Antonyms <word>')
  .alias('ant')
  .description('Antonyms of a given word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
      commander.outputHelp();
  });

  commander
  .command('Example <word>')
  .alias('ex')
  .description('Examples of usage of a given word in a sentence')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
      commander.outputHelp();
  });

  commander
  .command('<word>')
  .alias('word')
  .description('Definitions, Synonyms, Antonyms & Examples for a given word')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
      definition()
      examples()
      relatedWords()
      commander.outputHelp();
  });

  commander
  .command('Gameplay')
  .alias('play')
  .description('Guess the word from given examples')
  .action(() => {
    prompt(question).then((answers) =>
      console.log(answers));
      randomWord()
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







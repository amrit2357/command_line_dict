
# Command_line_dict

Command Line Dictionary (Node Js)

  

## API's

apihost = "<Given  host  name>"

  

* {apihost}/words/randomWord?api_key={api_key}

* {apihost}/word/{word}/definitions?api_key={api_key}

* {apihost}/word/{word}/examples?api_key={api_key}

* {apihost}/word/{word}/relatedWords?api_key={api_key}

  

## Instructions

  

The command-line tool should have the following functions -

  

1. Word Definitions

	./dict defn <word>
	Display definitions of a given word.

  

2. Word Synonyms

	./dict syn <word>
	Display synonyms of a given word.

  

3. Word Antonyms
	
	./dic ant <word>
	Display antonyms of a given word. Note that not all words would 	have Antonyms (End point: /relatedWords). Example words with antonyms: single, break, start.

  

4. Word Examples

	./dict ex <word>
	Display examples of usage of a given word in a sentence.

  

5. Word Full Dict
	
	./dict <word>
	Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word.

  

6. Word of the Day Full Dict

	./dict
	Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word.

  

7. Word Game

	./dict play
	The command should display a definition, a synonym or an antonym and ask the user to guess the word.

  

## Rules

  

* If the correct word is entered, show success message.

* Any synonyms of the word(expected answer) should be also be accepted as a correct answer.

* If incorrect word is entered, user should be given 3 choices:

- (1) Try again

	Let the user try again.

- (2) Hint

Display a hint, and let the user try again. Hints could be:

	1. Display the word randomly jumbled (cat => atc, tac, tca)

	2. Display another definition of the word

	3. Display another antonym of the word

	4. Display another synonym of the word

- (3) Quit

Display the Word, Word Full Dict , and quit.

  

## Command Line Intructions

Command Line Dictionary

Options:

-V, --version output the version number

-h, --help output usage information

  

## Commands:

```bash

		Options 		 | Definition

* Definition|defn <word> | Definition of given Word

* Synonym|sys <word>     | Synonyms of a given word

* Antonyms|ant <word>    | Antonyms of a given word

* Example|ex <word>      | Examples of usage of a given word in a sentence

* <word>                 | Definitions, Synonyms, Antonyms & Examples for a given word

* Gameplay|play          | Guess the word from given examples

```

  

## Instructions to install

  
```bash
1 . Create .env file.

2 . Write API_KEY and API_HOST in file to access the Api's

3 . Install all the npm modules by : npm install

4 . Run the server by : node dictionary.js
```

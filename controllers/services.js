const request = require('request'),
    ora = require('ora'),
    colors = require('colors'),
    { randWord, isEmpty } = require('../lib/common');
require('dotenv').config({ path: '../.env' })
const spinner = ora('Processing..')



/* 
 *@Function randomWord 
 *@Definition Use the api to get the random word
 *@param callback
 */
function randomWord(callback) {

    let uri = process.env.API_HOST + '/words/randomWord?api_key=' + process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        callback(res.body.word);
        // console.log('Random Word : ' + colors.green(JSON.stringify(res.body.word)))
    });
}

/* 
 *@Function : definitions 
 *@Definition : Use the api to get the definition of word
 *@param : word,callback
 */
function definitions(word, callback) {
    let uri = process.env.API_HOST + '/word/' + word + '/definitions?api_key=' + process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        if (res.body.error != undefined) {
            callback()
        } else {
            callback(res.body)
        }
    });
}

/* 
 *@Function : examples 
 *@Definition : Use the api to get the examples related to word
 *@param : word,callback
 */
function examples(word, callback) {
    let uri = process.env.API_HOST + '/word/' + word + '/examples?api_key=' + process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        callback(res.body.examples)
    });
}
/* 
 *@Function : examples 
 *@Definition :Use the api to get the related words like synonyms, antonyms to word
 *@param : word,callback
 */
function relatedWords(word, callback) {
    let uri = process.env.API_HOST + '/word/' + word + '/relatedWords?api_key=' + process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        if (res.body.error != undefined) {
            callback()
        } else {
            callback(res.body)
        }
        /* callback will retuen the bith antonyms and synonyms */
    });
}

function randFullDict(input, callback) {
    /* 
    1 . call the Random word service
    2 . call the Definition service
    3 . call the Related Word service
    4 . call the example service
    */
    let guess = input.guess
    let word = input.word
    var resp = {
        "synonym": [],
        "word": "",
        "antonym": [],
        "definition": [],
    }
    try {
        spinner.start()
        randomWord((res) => {
            definitions(res, (definition) => {
                /* If we pass then word then it will overide the res */
                spinner.clear()
                if (!isEmpty(word)) {
                    res = word
                }
                console.log('')
                if (!isEmpty(definition)) {
                    spinner.succeed(colors.cyan('Definition of Word :- ') + randWord(definition).text)
                    resp.definition = definition
                    spinner.clear()
                }
                relatedWords(res, response => {
                    if (isEmpty(response) || !isEmpty(response.error)) {
                        // Error : Not word found from the backend
                    } else {
                        response.forEach(element => {
                            if (element.relationshipType == 'synonym') {
                                spinner.succeed(colors.green('Synonym of Word : ' + randWord(element.words)))
                                resp.synonym = element.words;
                                spinner.clear()
                            } else {
                                spinner.succeed(colors.green('Antonym of Word : ' + randWord(element.words)))
                                resp.antonym = element.words;
                            }
                            resp.word = res; ``
                        });
                    }
                    if (!guess) {
                        examples(res, (example) => {
                            if (isEmpty(example) || !isEmpty(example.error)) {
                                // Error No examples found for word
                            } else {
                                spinner.succeed(colors.blue('Examples of given Word : '))
                                var counter = 1;
                                example.forEach(element => {
                                    console.log(colors.green(counter++) + ' ' + element.text)
                                    console.log('\n')
                                });
                            }
                            callback(res);
                        });
                    } else {
                        callback(resp);
                    }
                });
            });
        });
    } catch (e) {
        console.log('Caught an Unhandled exception ' + e);
    }
}

/*
    Export the modules to use in other files
*/
module.exports = {
    randomWord,
    examples,
    definitions,
    relatedWords,
    randFullDict
};


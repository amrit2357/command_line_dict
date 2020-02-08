const request = require('request'),
    colors = require('colors'),
    {randWord } = require('../lib/common')
require('dotenv').config({ path: '../.env' })



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
            return console.log(err);
        }
        callback(res.body)
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
        callback(res.body)
        /* callback will retuen the bith antonyms and synonyms */
    });
}

function randFullDict(word, callback) {
    /* 
    1 . call the Random word service
    2 . call the Definition service
    3 . call the Related Word service
    */
    randomWord((res) => {
        
        definitions(res, definition => {
            if(word == null || word == undefined || word.length == 0){
                res = word;
            }
            console.log('')
            console.log(colors.yellow('Guess the Word: '))
            console.log(colors.cyan('Definition of Word : ') + randWord(definition).text)
            relatedWords(res, response => {
                response.forEach(element => {
                    if (element.relationshipType == 'synonym') {
                        console.log(colors.green('Synonym of Word : ' + randWord(element.words)))
                    } else {
                        console.log(colors.green('Antonym of Word : ' + randWord(element.words)))
                    } ``
                });
                examples(res , (example) =>{
                    var counter = 1;
                    example.forEach(element => {
                        console.log(colors.green(counter++) + ' ' + element.text)
                        console.log('\n')
                    });
                    callback(res);
                })               
            });
        });      
    });

    
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


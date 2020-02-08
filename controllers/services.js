const request = require('request'),
      colors = require('colors')
      require('dotenv').config()
      


/* 
 *@Function randomWord 
 *@Definition Use the api to get the random word
 *@param callback
 */
function randomWord(callback){

    let uri = process.env.API_HOST +'/words/randomWord?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    console.log('Random Word : ' + colors.green(JSON.stringify(res.body.word)))
    });
}

/* 
 *@Function : definitions 
 *@Definition : Use the api to get the definition of word
 *@param : word,callback
 */
function definitions(callback){
    let uri = process.env.API_HOST +'/word/'+ 'single' +'/definitions?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    res.body.forEach(element => {
        console.log(JSON.stringify(element));
        console.log('')       
    });
    });
}

/* 
 *@Function : examples 
 *@Definition : Use the api to get the examples related to word
 *@param : word,callback
 */
function examples(word, callback){
    let uri = process.env.API_HOST +'/'+ word +'/examples?api_key='+ process.env.API_KEY
    request(rui, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    console.log(JSON.stringify(res));
    console.log(body.url);
    console.log(body.explanation);
    });
}
/* 
 *@Function : examples 
 *@Definition :Use the api to get the related words like synonyms, antonyms to word
 *@param : word,callback
 */
function relatedWords(word, callback){
    let uri = process.env.API_HOST +'/word/'+ word +'/relatedWords?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    callback(res.body)
    });
}

/*
    Export the modules to use in other files
*/
module.exports = {	   
    randomWord,
    examples,  
    definitions, 
    relatedWords
  };


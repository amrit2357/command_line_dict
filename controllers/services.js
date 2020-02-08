const dotenv = require('dotenv').load,
      request = require('request');


/* 
 *@Function randomWord 
 *@Definition Use the api to get the random word
 *@param callback
 */
function randomWord(callback){

    console.log(process.env.API_HOST)
    console.log(process.env.API_KEY)
    let uri = process.env.API_HOST +'/words/randomWord?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    console.log(JSON.stringify(res));
    console.log(body.url);
    console.log(body.explanation);
    });
}

/* 
 *@Function : definitions 
 *@Definition : Use the api to get the definition of word
 *@param : word,callback
 */
function definitions(word, callback){
    let uri = process.env.API_HOST +'/'+ word +'/definitions?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
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
    let uri = process.env.API_HOST +'/'+ word +'/relatedWords?api_key='+ process.env.API_KEY
    request(uri, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    console.log(JSON.stringify(res));
    console.log(body.url);
    console.log(body.explanation);
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


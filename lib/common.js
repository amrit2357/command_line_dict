const Spinner = require('cli-spinner').Spinner;


function randWord(request) {
    // Request is the array of words or objects : return the random from given array
    var rand = Math.floor(Math.random() * request.length);
    return request[rand];

}

function isEmpty(value){
    if(value == null || value.length == 0 || value == undefined)
    return true;

    return false;
}
function toLower(value) {
    return value.toLowerCase();
}

var spinnerObj = new Spinner({
    stream: process.stderr,
    onTick: function (msg) {
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
});

module.exports = {
    randWord,
    spinnerObj,
    toLower,
    isEmpty
}
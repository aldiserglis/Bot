var builder = require('botbuilder');
var restify = require('restify');

// create the connector
//var connector = new builder.ConsoleConnector().listen();
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD

});


//crete the bot
var bot = new builder.UniversalBot(connector);

//add in the dialog
//bot.dialog('/', function(session) {
    //session.send('hello, bot!');
//    var userMessage = session.message.text;
//    session.send('you said: ' + userMessage);

//});

bot.dialog('/', [
    function(session){
        builder.Prompts.text(session, 'Please enter your name');
    },
    function(session, result){
       
        var cars = ["Saab", "Volvo", "BMW"];
        builder.Prompts.choice(session, 'What you want?', cars);
        session.send('Hello: ' + result.response);        
    }

]);

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function (){
    console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());
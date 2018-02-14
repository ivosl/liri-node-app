// Read and set any environment variables with the dotenv package
require("dotenv").config();

//------------------------------------Common variables---------------------------

// Importing the `keys.js` file and storing it in a variable
var keys = require("./keys.js");

var request = require("request");
var argument1 = process.argv[2];
var argument2 = process.argv[3];

//---------------------------------------Twitter-----------------------------
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

// console.log(client);
console.log("-------------------------");

var params = {ivo_johnny: 'nodejs'};
if (argument1 === "my-tweets"){
    console.log("My last tweets:");
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length && i < 20; i++) {
        console.log(tweets[i].text + "  " + tweets[i].created_at);
        }
    } else {
        console.log(error);
    }
});
}
//-----------------------------------Spotify----------------------------------

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
console.log("My Music:");
// console.log(keys.spotify);

    if (argument1 === "spotify-this-song"){

        var songTitle = process.argv;

        var songName = "";

        for (var i = 3; i < songTitle.length; i++) {

            if (i > 3 && i < songTitle.length){
                songName = songName + "+" + songTitle[i];
            } else {
                songName += songTitle[i];
            }
        }
        if (argument1 === "spotify-this-song" && argument2 === undefined){
            console.log("HERE")
            songName = "The Sign Ace of Base";
        }

spotify.search({ type: 'track', query: songName, limit: 3 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    // for (var k = 0; k < data.tracks.items.length; k++) { 
    // console.log("Artist: " + data.tracks.items[k].artists[0].name  + "\nSong's Name: " + data.tracks.items[k].name + "\nPreview link: " + data.tracks.items[k].preview_url + "\nAlbum: " + data.tracks.items[k].album.name); 
    // } 

//  console.log(data); 
//  console.log(data.tracks);
console.log("Artist: " + data.tracks.items[0].artists[0].name  + "\nSong's Name: " + data.tracks.items[0].name + "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
});
    }
   

// -------------------------------------------- OMBD -----------------------------------

//Checking to see if user's request is to get movie informatiion
if (argument1 === "movie-this") {
    
    // Store all of the arguments in an array
    var nodeArguments = process.argv;
    
    // Create an empty variable for holding the movie name
    var movieName = "";
    
    // Loop through all the words in the node argument
    // And do a for-loop to handle the inclusion of "+"s
    for (var i = 3; i < nodeArguments.length; i++) {
        
        if (i > 3 && i < nodeArguments.length) {
            
            movieName = movieName + "+" + nodeArguments[i];
            
        }
        
        else {
            
            movieName += nodeArguments[i];
            
        }
    }

//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
//Here I check if the user requests a movie information but leaves argument 2  blank
console.log("argument 1: ", argument1)
console.log("argument 2: ", argument2)
if (argument1 === "movie-this" && argument2 === undefined){
    console.log("HERE")
    movieName = "Mr. Nobody";
}
console.log(movieName);
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

request(queryUrl, function(error, response, body) {
    
    // If the request is successful
    if (!error && response.statusCode === 200) {
        
        // Parse the body of the site and recover just the values we need.
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
    }
});
}






// Read and set any environment variables with the dotenv package
require("dotenv").config();

//------------------------------------Common variables---------------------------

// Importing the `keys.js` file and storing it in a variable
var keys = require("./keys.js");

var request = require("request");
var argument1 = process.argv[2];
var argument2 = process.argv[3];

//---------------------------------------Twitter-----------------------------
// var Twitter = require("twitter");
// var client = new Twitter(keys.twitter);

// console.log("My last tweets:");
// // console.log(client);
// console.log("-------------------------");

// var params = {ivo_johnny: 'nodejs'};
// if (argument1 === "my-tweets"){
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//         for (var i = 0; i < tweets.length; i++){
//         console.log(tweets[i].text)
//     return}
//     } else {
//         console.log(error);
//     }
// });
// }
//-----------------------------------Spotify----------------------------------

// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// console.log("My Music:");
// console.log(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
    
//     console.log(data); 
// });



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
}
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
//Here I check if the user requests a movie information but leaves argument 2  blank
if (argument1 === "movie-this" && argument2 === ""){
    movieName = "Mr. Nobody";
}

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







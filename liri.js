// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Importing the `keys.js` file and storing it in a variable
var keys = require("./keys.js");
// Incorporating the "request" npm package
var request = require("request");

var argument1 = process.argv[2];
var argument2 = process.argv[3];

console.log("-------------------------");
//---------------------------------------Twitter-----------------------------
var Twitter = require("twitter");

var client = new Twitter(keys.twitter);

var params = {ivo_johnny: 'nodejs'};

//Creating a function for the tweeter request
function myTweets(){
    if (argument1 === "my-tweets"){
    
    //My tweets are colored for more fun, better display, and to easily distiguish them from the other data
    console.log("\x1b[4mMy last tweets:\x1b[0m");
    //following npm documentation to get the data from twitter
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //limiting it to 20 tweets and also if there are less than 20 tweets overall displaying the ones available only 
            for (var i = 0; i < tweets.length && i < 20; i++) {
                console.log("\x1b[32m" + tweets[i].text + "\x1b[0m   " + tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });
}
}
myTweets();
//-----------------------------------Spotify----------------------------------

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Creating a function for the spotify request
function spotifyThis(){
    if (argument1 === "spotify-this-song"){
        console.log("\x1b[4mMy Music:\x1b[0m");
        // Store all of the arguments in an array
        var songTitle = process.argv;
        // Create an empty variable for holding the song name
        var songName = "";
        // Loop through all the words in the node argument
        // And do a for-loop to handle the inclusion of "+"s
        for (var i = 3; i < songTitle.length; i++) {
            if (i > 3 && i < songTitle.length){
                songName = songName + "+" + songTitle[i];
            } else {
                songName += songTitle[i];
            }
        }
        //including a condition to default to specifing song if no song is requested
        if (argument1 === "spotify-this-song" && argument2 === undefined){
            songName = "The Sign Ace of Base";
        } else {
            //This condition is triggerred if do-what-it-says is requested
            songName = argument2;
        }
        //Following npm documentation to get the data from spotify and limiting it to one match
        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //Using for loop gives me an option to increase the limit to 3 songs for example and display the top 3 songs returned
            //The strings are colored for more fun, better display, and to easily distiguish them from the other data
            for (var k = 0; k < data.tracks.items.length; k++) { 
                console.log("\n\x1b[36mArtist:\x1b[0m " + data.tracks.items[k].artists[0].name  + "\n\x1b[36mSong's name:\x1b[0m " + data.tracks.items[k].name + "\n\x1b[36mPreview Link:\x1b[0m " + data.tracks.items[k].preview_url + "\n\x1b[36mAlbum:\x1b[0m: " + data.tracks.items[k].album.name); 
            } 
            //If I want to return only one song without having the option to increase the limit I can use the console.log code below
            // console.log("\x1b[36mArtist:\x1b[0m " + data.tracks.items[0].artists[0].name  + "\n\x1b[36mSong's name:\x1b[0m " + data.tracks.items[0].name + "\n\x1b[36mPreview Link:\x1b[0m " + data.tracks.items[0].preview_url + "\n\x1b[36mAlbum:\x1b[0m: " + data.tracks.items[0].album.name);
        });
    }
}
spotifyThis();

// -------------------------------------------- OMBD -----------------------------------
//Creating a function for the movie request
function movieThis(){
    //Checking to see if user's request is to get movie informatiion
    if (argument1 === "movie-this") {
    console.log("\x1b[4mMy Movies:\x1b[0m");
    // Store all of the arguments in an array
    var nodeArguments = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a for-loop to handle the inclusion of "+"s
    for (var i = 3; i < nodeArguments.length; i++) {
        if (i > 3 && i < nodeArguments.length) {
            movieName = movieName + "+" + nodeArguments[i];   
        } else {
            movieName += nodeArguments[i];
        }
    }
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
    //Here I check if the user requests a movie information but leaves argument 2  blank
    if (argument1 === "movie-this" && argument2 === undefined){
        movieName = "Mr. Nobody";
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(error, response, body) {       
        // If the request is successful
        if (!error && response.statusCode === 200) {           
            // Parse the body of the site and recover just the values we need.
            //The strings are colored for more fun, better display, and to easily distiguish them from the other data
            console.log("\x1b[31mTitle: \x1b[0m" + JSON.parse(body).Title);
            console.log("\x1b[31mRelease Year: \x1b[0m" + JSON.parse(body).Year);
            console.log("\x1b[31mIMBD Rating: \x1b[0m" + JSON.parse(body).imdbRating);
            console.log("\x1b[31mRotten Tomatoes Rating: \x1b[0m" + JSON.parse(body).Ratings[1].Value);
            console.log("\x1b[31mCountry where the movie was produced: \x1b[0m" + JSON.parse(body).Country);
            console.log("\x1b[31mLanguage of the movie: \x1b[0m" + JSON.parse(body).Language);
            console.log("\x1b[31mPlot of the movie: \x1b[0m" + JSON.parse(body).Plot);
            console.log("\x1b[31mActors in the movie: \x1b[0m" + JSON.parse(body).Actors);
        }
    });
}
}
movieThis();
//---------------------------do-what-it-says----------------------------------

//Core Node package for reading and writing files
var fs = require("fs");
// This block of code will read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "readMe"
if (argument1==="do-what-it-says" && argument2===undefined){
    fs.readFile("random.txt", "utf8", function(error, readMe){
        // If the code experiences any errors it will log the error to the console.
        if (error){
            return console.log(error);
        }
        // Split the data by commas (to make it more readable)
        var dataArr = readMe.split(",");
        //Assigning the data from the created array 
        argument1 = dataArr[0]; argument2 = dataArr[1];
        //Calling the function so that the default data is dispalayed as specified in the instructions
        spotifyThis();
        
    });
}





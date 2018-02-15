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
    console.log("\x1b[4mMy last tweets:\x1b[0m");
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length && i < 20; i++) {
                console.log("\x1b[32m" + tweets[i].text + "\x1b[0m   " + tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });
}
//-----------------------------------Spotify----------------------------------

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// console.log(keys.spotify);

if (argument1 === "spotify-this-song"){
    
    console.log("\x1b[4mMy Music:\x1b[0m");
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
        songName = "The Sign Ace of Base";
    }
    
    spotify.search({ type: 'track', query: songName, limit: 3 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        for (var k = 0; k < data.tracks.items.length; k++) { 
            console.log("\n\x1b[36mArtist:\x1b[0m " + data.tracks.items[k].artists[0].name  + "\n\x1b[36mSong's name:\x1b[0m " + data.tracks.items[k].name + "\n\x1b[36mPreview Link:\x1b[0m " + data.tracks.items[k].preview_url + "\n\x1b[36mAlbum:\x1b[0m: " + data.tracks.items[k].album.name); 
        } 
        
        //  console.log(data); 
        //  console.log(data.tracks);
        
        // console.log("\x1b[36mArtist:\x1b[0m " + data.tracks.items[0].artists[0].name  + "\n\x1b[36mSong's name:\x1b[0m " + data.tracks.items[0].name + "\n\x1b[36mPreview Link:\x1b[0m " + data.tracks.items[0].preview_url + "\n\x1b[36mAlbum:\x1b[0m: " + data.tracks.items[0].album.name);
        // console.log("Artist: " + data.tracks.items[0].artists[0].name  + "\nSong's Name: " + data.tracks.items[0].name + "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
    });
}


// -------------------------------------------- OMBD -----------------------------------

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
            
        }
        
        else {
            
            movieName += nodeArguments[i];
            
        }
    }
    
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
    //Here I check if the user requests a movie information but leaves argument 2  blank
    if (argument1 === "movie-this" && argument2 === undefined){
        movieName = "Mr. Nobody";
    }
    // console.log(movieName);
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
        
        // If the request is successful
        if (!error && response.statusCode === 200) {
            
            // Parse the body of the site and recover just the values we need.
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

//---------------------------do-what-it-says----------------------------------
//core Node package for reading and writing files

var fs = require("fs");
// This block of code will read from the "movies.txt" file.
// The code will store the contents of the reading inside the variable "data"
if (argument1==="do-what-it-says" && argument2===undefined){
    fs.readFile("random.txt", "utf8", function(error, readMe){
        // If the code experiences any errors it will log the error to the console.
        if (error){
            return console.log(error);
        }
        console.log(readMe);
    var dataArr = readMe.split(",");
    console.log(dataArr);
    console.log(dataArr[0]);
    argument1 = dataArr[0]; argument2 = dataArr[1];
    
});
}





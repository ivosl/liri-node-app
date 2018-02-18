# liri-node-app

## This is not SIRI, but pretty close... and the name is prettier - LIRI :bowtie:

### **This app has 3 major functions:**

### 1. Tweets:

![Twitter return](/images/tweets.png)

When you type ```node liri.js my-tweets``` it shows your last up to 20 tweets with the date and time when you sent them.
For better visualization and cleaner display tweets are shown in green, time and date is the default white/black color.

### 2. Spotify songs:

![Spotify return](/images/spotify-this.png)

You can search a song by running ```node liri.js spotify-this-song``` followed by the name of the song in quotes "...."

It will display:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

Again for better display the above text is shown in blue, while the returned information from spotify is the default white/black color

The songs displayed could be easily adjusted from showing only one to any number just by changing the limit here:
    ```javascript
    spotify.search({ type: 'track', query: songName, limit: 1 }
    ```
    
Code that follows is written as a for loop, so it can take more than one return and properly and orderly display a different number of songs with the corresponding info just by changing the limit number in the above code. Here, limit number is adjusted to 3 and it returns the first 3 songs with the corresponding info

![Spotify limit 3 return](/images/limit-3.png)

If no song is specified after ```spotify-this-song```, then it defaults to "The Sign" by Ace of Base.
![Spotify default return](/images/spotify-default.png)

### 3. Movies (OMBD):

![Movies return](/images/movie-this-title.png)

This function searches for movies when typed ```node liri.js movie-this```, followed by the movie title and displays the following information:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

No quotes ".."  are needed when typing the movie title.

If no movie title is specified then it defaults to the movie 'Mr. Nobody' and displays its information.
![Movies default](/images/movie-this.png)
Like in the previous functions the color display is different for the movie features and the information returned (default -black/white).

### Additional functionality

In addition to the above functions if you run ```node liri.js do-what-it-says```, LIRI will display the info about the song "I Want it That Way", which is stored in the random.txt file
![do-what-it-says return](/images/do-what-it-says.png)

### Appending

All the information that is returned and displayed in the terminal/bash window is recorded by being appended to log.txt file
![Appending](/images/append.png)



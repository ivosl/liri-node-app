# liri-node-app

This is not SIRI, but pretty close and the name is prettier - LIRI :)

This app has 3 major functions:
1. Tweets:
When you type node liri.js my-tweets it shows your last up to 20 tweets with the date and time when you sent them
For better visualization and cleaner display tweets are shown in green, time and date s the default white/black color.

2. Spotify songs:
You can search a song by typing node liri.js spotify-this-song followed by the name of the song in quotes ""
It will display:

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

Again for better display the above text is shown in blue, while the information from spotify is the default white/black color

The songs displayed could be easily adjusted from showing just one to any number by just changing the limit.
(Code is written as a for loop in this part, so it can properly and orderly display a different number of songs with the corresponding info just by changing the limit number)

If no song is specified after spotify-this-song, then it defaults to default to "The Sign" by Ace of Base.

3. Movies (OMBD):

This feature searches for movies when typed node liri.js movie-this, followed by the movie title and displays the following information:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

Here no quotes ""  are needed when typing the movie title
If no movie title is specified then it defaults to the movie 'Mr. Nobody' and displays its information.
Like in the previous functions there is different color display for the movie features and the information returned (default -black/white).

In addition to the above features if you type node liri.js do-what-it-says, liri will display the info about the song "I Want it That Way",
which is stored in the random.txt file

Also all the information that is returned and displayed in the terminal/bash window is recorded by being appended to the log.txt file




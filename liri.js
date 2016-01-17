var args = process.argv.slice(2);
var doThis = args[0];

switch(doThis) {
	case 'my-tweets':
		getTweets();
		break;
	case 'spotify-this-song':
		spotify();
		break;
	case 'movie-this':
		movie();
		break;
	case 'do-what-it-says':
		doItUp();
		break;
}

function getTweets() {

	var Twitter = require ('twitter');
	var keys = require ("./keys.js");
	var resultsArray = []; // initialize empty array to store tweets

    var client = new Twitter({ 
  		consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_secret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret,
	});
    
    var params = {screen_name: 'chris_donofrio'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error) {
      		for (var i = 0; i < tweets.length; i++) { // loops iteratively through tweets
      			resultsArray.push(tweets[i]); // adds tweets to the array of results
        		console.log(tweets[i].text + tweets[i].created_at); // returns text & date of tweets to console
      		}
		}
	});
};

function spotify () {

	var spotify = require ('spotify');

	spotify.search({ type: 'track', query: args[1] }, function(err, data) {
		if ( err ) {
			console.log('An error occurred: ' + err);
			return;
		}

		else {
			console.log(data.tracks.items[0].artists[0].name);
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].artists[0].external_urls.spotify);
			console.log(data.tracks.items[0].album.name);
		}

	});
};

function movie () {

	var request = require('request');

	  if (args[1] === undefined){
    	request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json", function (error, response, body) {
      		if (!error && response.statusCode == 200) {
        		console.log(JSON.parse(body).Title);
        		console.log(JSON.parse(body).Year);
        		console.log(JSON.parse(body).imdbRating);
        		console.log(JSON.parse(body).Country);
        		console.log(JSON.parse(body).Language);
        		console.log(JSON.parse(body).Plot);
        		console.log(JSON.parse(body).Actors);
}
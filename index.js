var curl = require('curlrequest');

// SET YOUR OWN VARIABLES:
var hubotURL = process.env.HUBOT_URL; // Heroku's Hubot URL
var timeOut = 600000; // every 6 minutes

var options = {
	url: hubotURL,
	verbose: true,
	stderr: true
};


// INIT :
console.log('Starting up!');


// LOOP!
setInterval(function(){
	curl.request(options, function(err, data) {
		console.log(data);
	});
}, timeOut);

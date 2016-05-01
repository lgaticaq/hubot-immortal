var curl = require('curlrequest');

var hubotURL = 'HUBOTNAME.herokuapp.com'; // Heroku's Hubot URL
var timeOut = 600000; // every 6 minutes

var options = {
	url: hubotURL,
	verbose: true,
	stderr: true
};

// INIT
console.log('Starting up!');

// LOOP!
setInterval(function(){
	curl.request(options, function(err, data) {
		console.log(data);
	});
}, timeOut);

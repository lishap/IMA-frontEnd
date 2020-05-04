var app = {
	initialize: function() {
		app.requestAuthorization();
	},

	requestAuthorization: function(word){
		const hash = window.location.hash
		.substring(1)
		.split('&')
		.reduce(function (initial, item) {
			if (item) {
				var parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});
		window.location.hash = '';

		// Set token
		let _token = hash.access_token;

		const authEndpoint = 'https://accounts.spotify.com/authorize';

		// Replace with your app's client ID, redirect URI and desired scopes
		const clientId = '773495bcb32e481793e8419ec2eafc25';
		const redirectUri = 'http://127.0.0.1:8887';
		const scopes = [
			'user-top-read'
		];

		// If there is no token, redirect to Spotify authorization
		if (!_token) {
			window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
		}

		app.getUserTopTracks(_token);
	},

	getUserTopTracks: function(token){

		$.ajax({
			method: "GET",
			url: "https://api.spotify.com/v1/me/top/tracks",
			headers: {
				'Authorization': 'Bearer ' + token,
			},
			data: {
				'limit': '50',
                //'offset':'0',
				'time_range':'short_term',
			},
			
			success: function(data){
				
				var trackName = data.items[0].name;
				var artistsName = data.items[0].artists["0"].name;
				window.albumCoverURL = data.items["0"].album["images"][1].url;
				var trackLink = data.items["0"].external_urls["spotify"];
				
				let userName = prompt("What's your name?");

				$('.track-artist-name').html(userName + "'s favorite song is " + trackName + " by " + artistsName + "!");
				//$('.album-cover').html("<img src=" + albumCoverURL + ">");
				$('.track-link').html("<a href=" + trackLink + "> Click here to play the song in Spotify </a>");
			},
		})
	},
}

var capture;
var tracker
var w = 640,
    h = 480;

function setup() {
    img = createImage("'"+ window.albumCoverURL + "'")
  
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
	
	var w = container.bounds.width;
	var h = container.bounds.height;

    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    if (positions.length > 0) {
        
        noStroke();
        fill(0, 255, 255);
        image(img,((positions[62][0])-80), ((positions[62][1])-300), 175, 175);
    }
}


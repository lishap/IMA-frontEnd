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
				'limit': '1',
                //'offset':'0',
                'time_range':'short_term',
			},
			success: function(data){
				var trackName = data.items[0].name;
				var artistsName = data.items[0].artists["0"].name;
				var albumCoverURL = data.items["0"].album["images"][1].url;
				var trackLink = data.items["0"].external_urls["spotify"];
		

				$('.track-name').html(trackName);
				$('.artists-name').html(artistsName);
				$('.album-cover').html("<img src=" + albumCoverURL + ">");
				$('.track-link').html("<a href=" + trackLink + "> Click here to play the song in Spotify </a>");
			},
		})
	},
}


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
			'user-read-recently-played'
		];

		// If there is no token, redirect to Spotify authorization
		if (!_token) {
			window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
		}

		app.getRecentlyPlayedTracks(_token);
	},

	getRecentlyPlayedTracks: function(token){
		$.ajax({
			method: "GET",
			url: "https://api.spotify.com/v1/me/player/recently-played",
			header: {
				'Authorization': 'Bearer' + token
			},
			data: {
				'limit':'1',
				//PASS GOOGLE PHOTO META DATA HERE
				// 'after':,
				// 'before':,
			},
			success: function(data){
				var track = data.track;
				var trackName = track.name;
				var timeStamp = data.played_at;

				var dateText = document.createElement('p');
				$('.track-name').html(trackName);
				$('.date-played-at').html(timeStamp)
			},
		})
	},
}


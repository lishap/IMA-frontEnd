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

	getRecentlyPlayedTracks: function(word){
		$.ajax({
			method: "GET",
			url: "https://api.spotify.com/v1/me/player/recently-played",
			headers: {
				'Authorization': 'Bearer ' + word
			},
			data: {
				'limit':'1',
				//PASS GOOGLE PHOTO META DATA HERE
				// 'after':,
				// 'before':,
			},
			success: function(data){
				//debugger;
				var trackName = data.items[0].track["name"];
				var artistsName = data.items[0].track["artists"][0].name;
				var timeStamp = data.items[0]["played_at"];

				document.createElement('p');
				$('.track-name').html(trackName);
				$('artists-name').html(artistsName);
				$('.date-played-at').html(timeStamp);

			},
		})
	},
}


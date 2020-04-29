var app = {
	initialize: function() {
		app.requestAuthorization();
	},

	requestAuthorization: function(word){
		var id = '773495bcb32e481793e8419ec2eafc25';
		var scope = 'user-read-recently-played';
		var response_type = 'code';
		var redirect_uri = '';

		$.ajax({
			method: "GET",
			url: "https://accounts.spotify.com/authorize",
			headers: {
				client_id: id,
				response_type: response_type,
				redirect_uri: redirect_uri,
				scope: scope,
			},
			
			success: function(result) {
		    	app.requestRefreshActionTokens(result.code)
		    },
		})
	},

	requestRefreshActionTokens: function(word){
		var id = '773495bcb32e481793e8419ec2eafc25';
		var encoded = btoa(id + ':' + secret);
		
		$.ajax({
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			headers: {
				'Authorization': 'Basic ' +  encoded
			},
			data: {
				'grant-type': 'authorization_code',
				'code': result,
				'redirect_uri': redirect_uri,
			},

			success: function(result) {
		    	app.accessSpotifyWebAPI(result.access_token)
		    },
		})
	},

	accessSpotifyWebAPI: function(word){
		$.ajax({
			method: "POST",
			url: "https://api.spotify.com/v1/me",
			headers: {
				'Authorization':'Bearer' + result
			},

			success: function(result) {
		    	app.requestRefreshAccessToken(result.refresh_token)
		    },
		})
	},

	requestRefreshAccessToken: function(word){
		$.ajax({
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			headers: {
				'Authorization': 'Basic' + encoded
			},
			data: {
				'grant_type':'refresh_token',
				'refresh_token': result
			},

			success: function(result){
				app.getRecentlyPlayedTracks(result.access_token)
			},
		})
	},

	getRecentlyPlayedTracks: function(word){
		$.ajax({
			method: "GET",
			url: "https://api.spotify.com/v1/me/player/recently-played",
			header: {
				'Authorization': 'Bearer' + result
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

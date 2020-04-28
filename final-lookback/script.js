var app = {
	initialize: function() {
		app.requestAuthorization();
	},

	requestAuthorization: function(word){
		var id = '773495bcb32e481793e8419ec2eafc25';
		var scope = 'user-read-recently-played';
		var response_type = 'code';
		var redirect_uri = 'https%3A%2F%2Fgithub.com%2Flishap%2FIMA-frontEnd%2Ftree%2Fmaster%2Ffinal-lookback';

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
		    	app.requestRefreshActionTokens(result)
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
		    	app.accessSpotifyWebAPI(result)
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
		    	app.requestRefreshAccessToken(result)
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
		})
	}

	







}


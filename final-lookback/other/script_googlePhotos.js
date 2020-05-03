
var app = {
	initialize: function() {
		app.requestAuthorization();
    },

    requestAuthorization: function(word){
        client_id = "378228056629-irllbfj8k2gueje2m6s87mgruesknoki.apps.googleusercontent.com",
        redirect_uri = "http://127.0.0.1:8887",
        response_type= "code",
        scope=".readonly",
        $.ajax({
            url: "https://accounts.google.com/o/oauth2/v2/auth",
            



        });
    },

    getMediaItem: function(word){
        $.ajax({
            method: "GET",
            url: "https://photoslibrary.googleapis.com/v1/mediaItems/" + media-item-id,
            headers: {
                'Authorization': 'Bearer ' + oauth2-token
            },

            success: function(data){
                var photoDate = data.mediaMetadata["creationTime"]
            }
        });
    }
}



var app = {
    initialize: function () {
        app.getToken();
    },

    getToken: function() {
        var id = '773495bcb32e481793e8419ec2eafc25';
        var secret = 'd999f7840a2d4a1caf9f23df16486fbd';

        var encoded = btoa(id+':'+secret);
      
        $.ajax({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                'Authorization': 'Basic' + encoded
            },
            
            data: {
                'grant-type': 'client_credentials'
            },
            
            success: function(result){
                console.log("sucessful");
                app.searchTime(result.access_token)
            },

            error: function(err){
                console.log('error:' + err)
            },
        });
    },

    searchTime: function(token){
        $ajax({
            url="https://api.spotify.com/v1/me/top/{type}",
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + token
            },

            success: function(data){

            },

            error: function(err){
                console.log('error:' + err)
            },

        });
    },
} 

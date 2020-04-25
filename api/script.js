  
var app = {
    initialize: function () {
        app.fetchAOScott();
    },

    fetchAOScott: function() {
        var url = "https://api.nytimes.com/svc/movies/v2/critics/A.%20O.%20Scott.json?api-key=";
        var apiKey = "88JhxYnLplcYpMEpA7pPJoYKhuZjJrKt";
        var sentURL = url + apiKey;

        $("button").click(function(){
            $.ajax({
                url: sentURL,
                type: 'GET',
                dataType: 'JSON',

                error: function(err) {
                    console.log('error:' + err)
                },
                
                success: function(data) {
                    var obj = data.results[0];
                    var name = obj.bio;
                    var output = document.getElementsByClassName('container')[0];  
                    output.innerHTML = "<p>" + name + "</p>";
                },
            }); 
        });
    }
}

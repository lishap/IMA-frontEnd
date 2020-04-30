**Part A: Spotify API & Google Photos API**

##### Google Photos API
1. Get [Authorization](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Auth Sample](https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html)

2. Use [Reading Media > Access media items API](https://developers.google.com/photos/library/guides/access-media-items)
    1. Response Format
            - mediaMetadata.creationTime : "media-item-creation-time",
      
##### Spotify API
1. Get [Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) from Spotify 
    1. Have your application request authorization; the user logs in and authorizes access
        -Use authorization code flow
        -Set scope to: user-top-read
    2. Have your application request refresh and access tokens; Spotify returns access and refresh tokens
    3. Use the access token to access the Spotify Web API; Spotify returns requested data
    4. Requesting a refreshed access token; Spotify returns a new access token to your app
  
2. Use [Recently Played Tracks API](https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/)
    1. Query Parameters
        -limit:1, after: (get meta data from Google Photos API), before (get meta data from Google Photos API)
    2. Response Format
        -track = track object
        -played_at = timestamp in unix milliseconds
        -track.name = name of track

**Part B: HTML/CSS**

# I didn't realize how limiting APIs can be. I might dial down my concept to a more completable level.

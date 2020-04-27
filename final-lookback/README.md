**Part A: Spotify API & Google Photos API**

##### Google Photos API
1. Get Authorization 

2. Use Reading Media > Access media items API
  1. Get media metadata

##### Spotify API
1. Get [Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) from Spotify 
  1. Have your application request authorization; the user logs in and authorizes access
    - Use authorization code flow
    - Set scope to: user-top-read
  2. Have your application request refresh and access tokens; Spotify returns access and refresh tokens
  3. Use the access token to access the Spotify Web API; Spotify returns requested data
  4. Requesting a refreshed access token; Spotify returns a new access token to your app
  
 2. Use [Personalization API](https://developer.spotify.com/documentation/web-api/reference-beta/#category-personalization)

**Part B: HTML/CSS**

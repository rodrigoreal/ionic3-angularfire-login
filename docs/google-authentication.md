# Google Authentication

As for the Google authentication there are two options: pure web and `cordova-plugin-googleplus`. One important difference from how other token-based
 credential logins works in `angularfire2` is that Google authentication require two values - `access_token` and `id_token`.

## pure web authentication
This method is based on concept from [ionicforum post](https://forum.ionicframework.com/t/how-to-implement-google-oauth-in-an-ionic-2-app/47038/6). 
The only information required in this case is the web client ID - the same that was used for Firebase 2.x. 

## `cordova-plugin-googleplus`
All the information is provied on the https://github.com/EddyVerbruggen/cordova-plugin-googleplus project page. 

One important note here is that for iOS the googleplus plugin may require ENABLE_BITCODE to be turned off in the Xcode.

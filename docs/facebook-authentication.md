# Facebook Authentication

### 1. Plugin Installation

To use the Facebook plugin, you first have to create a new Facebook App inside of the Facebook developer portal at [https://developers.facebook.com/apps](https://developers.facebook.com/apps).

[![fb-getstarted-2](http://ionicframework.com/img/docs/native/Facebook/2.png)](https://developers.facebook.com/apps/)

Then type in the following command in your Terminal, where `APP_ID` and `APP_NAME` are the values from the Facebook Developer portal.

```bash
ionic plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="myApplication"
```

### 2. Add Platforms
After, you'll need to add the native platforms you'll be using to your app in the Facebook Developer portal under your app's Settings:

Click `'Add Platform'`.

[![fb-getstarted-4](http://ionicframework.com/img/docs/native/Facebook/4.png)](https://developers.facebook.com/apps/)

At this point you'll need to open your project's [`config.xml`](https://cordova.apache.org/docs/en/latest/config_ref/index.html) file, found in the root directory of your project.

Take note of the `id` for the next step:

```xml
<widget id="com.mycompany.testapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

#### 1. iOS

Under 'Bundle ID', add the id from your config.xml file:

[![fb-getstarted-5](http://ionicframework.com/img/docs/native/Facebook/5.png)](https://developers.facebook.com/apps/)

#### 2. Android

##### Development

Under 'Google Play Package Name', add the id from your config.xml file:

[![fb-getstarted-6](http://ionicframework.com/img/docs/native/Facebook/6.png)](https://developers.facebook.com/apps/)

###### Hash Key

####### OS X
```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

####### Windows
```bash
keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | openssl sha1 -binary | openssl base64
```

##### Publish

###### OS X

####### 1. Create a RSA keystore
```bash
keytool -genkey -v -keystore ~/.android/debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
```
####### 2. Create a keyhash for facebook
```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```
####### 3. Add the keyhash on facebook under your app dashboard
####### 4. Sign the android app with the same keystore
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/.android/debug.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk  androiddebugkey
```
####### 5. Zip align android apk
```bash
~/Library/Android/sdk/build-tools/24.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/myapp.apk
```

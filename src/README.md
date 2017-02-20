# Integrating Firebase 3 with AngularFire2 into Ionic2

## Install
```
npm install
```

### Use your own Firebase Account
You will need to change the following code in `src/app/app.module.ts`
```ts
export const firebaseConfig = {
  apiKey: "<your-key>",
  authDomain: "<your-project-authdomain>",
  databaseURL: "<your-database-URL>",
  storageBucket: "<your-storage-bucket>"
};
```

### Use your own Facebook Account
#### [Facebook Authentication](docs/facebook-authentication.md)

## This Application was tested with the following configuration
```
Your system information:

Cordova CLI: 6.4.0
Ionic Framework Version: 2.0.1
Ionic CLI Version: 2.2.1
Ionic App Lib Version: 2.2.0
Ionic App Scripts Version: 1.1.0
ios-deploy version: 1.8.5
ios-sim version: 5.0.8
OS: macOS Sierra
Node Version: v6.9.5
Xcode version: Xcode 8.2.1 Build version 8C1002
```

# Integrating Firebase 3 with AngularFire2 into Ionic2 RC0

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

## Integrate this project in your own project

#### [Installation & Setup](docs/install-and-setup-in-your-own-project.md)

## This Application was tested with the following configuration
```
Your system information:

Gulp version:  CLI version 3.9.1
Gulp local:
Ionic Framework Version: 2.0.0-rc.0
Ionic CLI Version: 2.1.0
Ionic App Lib Version: 2.1.0-beta.1
ios-deploy version: 1.8.5
ios-sim version: 5.0.8
OS: Mac OS X El Capitan
Node Version: v6.1.0
Xcode version: Xcode 8.0 Build version 8A218a
```

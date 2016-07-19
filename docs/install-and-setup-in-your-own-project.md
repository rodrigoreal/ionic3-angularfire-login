# 1. Installation and Setup

### 0. Prerequisites

```bash
npm install -g typings
```

### 1. Install AngularFire 2 and Firebase

```bash
npm install angularfire2 firebase --save
```

### 2. Include Firebase SDK typings

### For typings < 1
`/// <reference path="../node_modules/angularfire2/firebase3.d.ts"/>`

Add this line inside the `typings/main.d.ts`.
If you have any reference to `firebase` or `angularfire` delete it.

### For typings > 1
```bash
typings install file:node_modules/angularfire2/firebase3.d.ts --save --global && typings install
```

This saves the typings reference into `typings.json` and installs it.

### 3. Bootstrap

Open `/app/app.ts`, inject the Firebase providers, and specify your Firebase configuration.
This can be found in your project at [the Firebase Console](https://console.firebase.google.com):

```ts
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


bootstrap(<MyApp>, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "<your-key>",
    authDomain: "<your-project-authdomain>",
    databaseURL: "<your-database-URL>",
    storageBucket: "<your-storage-bucket>"
  })
]);
```

### 3. Changes in your own project
Open `/app/app.ts`

####1 Inject OnInit from @angular/core.

```ts
import {OnInit} from "@angular/core";
```

####2 Inject the Auth provider.
```ts
import {AuthProvider} from "./providers/auth/auth";
```

####3 Add this piece of code

```ts
isAppInitialized: boolean;
constructor(protected auth: AuthProvider) {
  this.isAppInitialized = false;
}

ngOnInit() {
  this.initializeApp();
}

initializeApp() {
  this.platform.ready().then(() => {
    this.auth.getUserData().subscribe(data => {
      if (!this.isAppInitialized) {
        this.isAppInitialized = true;
        this.nav.setRoot(HomePage);
      }
    }, err => {
      this.isAppInitialized = false;
      this.nav.setRoot(AuthPage);
    });
  });
}
```
Change the `HomePage` to your own home page.

####4 Copy some files
You need to copy the `app/pages/auth`, `app/pages/terms-of-service` and `app/providers/auth` folders to your project.

> And that is it, the user will always be redirected to the login page if he is not logged, otherwise he will be redirected to home page.

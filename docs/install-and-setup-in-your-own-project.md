# 1. Installation and Setup

### 1. Add the libraries to your project
```bash
npm install @types/request@0.0.30 --save-dev --save-exact
npm install firebase angularfire2 --save
```

### 2. Add firebase types to your tsconfig.json

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    "typeRoots": [
      "../node_modules/@types"
    ],
    "types": [
      "firebase"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
```

### 3. Create a new rollup.config.js to skip firebase
##### 3.1. Create a `config` folder in the project root.
##### 3.2. Create a `rollup.config.js` file inside the `config` folder.
```js
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: 'src/app/main.dev.ts',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',

  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    builtins(),
    commonjs(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js'],
      skip: ['firebase']
    }),
    globals(),
    json()
  ]

};


if (process.env.IONIC_ENV == 'prod') {
  // production mode
  rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
  rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;
```
##### 3.3. Inside the `package.json` import the `rollup.config.js`
```json
"config": {
    "ionic_rollup": "./config/rollup.config.js"
  }
```

### 4. Firebase dependency
##### 4.1. Create a `copy.config.js` file inside the `config` folder.
```js
const orgCopyConfig = require('@ionic/app-scripts/config/copy.config');

orgCopyConfig.include.push(
  {
    src: 'node_modules/angularfire2/node_modules/firebase/firebase.js',
    dest: 'www/assets/firebase.js'
  }
);

module.exports = orgCopyConfig;

```

##### 4.2. Inside the `package.json` import the `rollup.config.js`
```json
"config": {
    "ionic_copy": "./config/copy.config.js"
  }
```

##### 4.3. Import  firebase inside the `www/index.html`
```html
<script src="assets/firebase.js"></script>
```


### 5.  Changes in your own project
##### 5.1. `/src/app/app.module.ts`
This can be found in your project at [the Firebase Console](https://console.firebase.google.com):

```ts
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "<your-key>",
  authDomain: "<your-project-authdomain>",
  databaseURL: "<your-database-URL>",
  storageBucket: "<your-storage-bucket>"
};

@NgModule({
   imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      IonicModule.forRoot(MyApp)
   ]
});
```

##### 5.2. `/src/app/app.components.ts`
```ts
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/home/home';
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;

  constructor(private platform: Platform, 
    protected data: DataProvider,
    protected auth: AuthProvider) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(HomePage);
          this.isAppInitialized = true;
        }
        this.user = data;
      }, err => {
        this.nav.setRoot(AuthPage);
      });
      StatusBar.styleDefault();
    });
  }
}
```
##### 5.3. Copy some files
Copy the folder `/src/pages/auth`, `/src/pages/home`, `/src/pages/terms-of-service`, `/src/providers`

> And that is it, the user will always be redirected to the login page if he is not logged, otherwise he will be redirected to home page.

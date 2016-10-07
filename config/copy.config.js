const orgCopyConfig = require('@ionic/app-scripts/config/copy.config');

orgCopyConfig.include.push(
  {
    src: 'node_modules/angularfire2/node_modules/firebase/firebase.js',
    dest: 'www/assets/firebase.js'
  }
);

module.exports = orgCopyConfig;

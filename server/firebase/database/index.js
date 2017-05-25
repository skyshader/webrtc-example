'use strict';

const firebaseAdmin = require('firebase-admin');
const serviceAccount = require(app.locals.config.root + app.locals.config.firebase.database.cert);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: app.locals.config.firebase.database.url
});

console.log('Connected to firebase:', app.locals.config.firebase.database.url);

app.locals.db = firebaseAdmin.database();

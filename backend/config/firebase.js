const admin = require('firebase-admin');

// On Render: set FIREBASE_SERVICE_ACCOUNT_KEY to the full JSON contents of
// your service account key (Firebase Console > Project Settings > Service
// Accounts > Generate new private key), pasted as a single-line string.
//
// Locally: create backend/config/serviceAccountKey.json (gitignored) with
// the same contents, and it'll be picked up automatically.
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} else {
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (err) {
    console.error(
      'No Firebase service account found. Set FIREBASE_SERVICE_ACCOUNT_KEY ' +
      'or add backend/config/serviceAccountKey.json for local dev.'
    );
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://icollekt-f5dc5-default-rtdb.firebaseio.com"
});
module.exports.admin = admin
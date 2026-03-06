const admin = require('firebase-admin');

// Si configuraste la variable de entorno en Render como te sugerí:
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
  : require("./tu-archivo-de-llaves.json"); // Por si pruebas localmente

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;
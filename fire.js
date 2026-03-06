const admin = require('firebase-admin');

try {
  const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccountVar) {
    throw new Error("La variable FIREBASE_SERVICE_ACCOUNT no está definida en Render");
  }

  // Intentamos parsear el JSON
  const serviceAccount = JSON.parse(serviceAccountVar);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin inicializado correctamente");
  }
} catch (error) {
  console.error("Error inicializando Firebase Admin:", error.message);
}

module.exports = admin;
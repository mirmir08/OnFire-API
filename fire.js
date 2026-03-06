const admin = require('firebase-admin');

// Obtenemos la variable y le quitamos espacios extra al inicio/final
const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT ? process.env.FIREBASE_SERVICE_ACCOUNT.trim() : null;

if (serviceAccountRaw) {
  try {
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("✅ Firebase inicializado correctamente");
    }
  } catch (e) {
    // Este log te dirá exactamente qué está fallando en el parseo
    console.error("❌ Error crítico al parsear JSON de Firebase:", e.message);
  }
} else {
  console.error("❌ La variable FIREBASE_SERVICE_ACCOUNT está vacía");
}

module.exports = admin;
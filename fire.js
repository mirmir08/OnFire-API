const admin = require('firebase-admin');

const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

if (serviceAccountRaw) {
  try {
    // Esto ayuda a manejar posibles problemas de formato en el string de Render
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("✅ Firebase inicializado con cuenta de servicio");
    }
  } catch (e) {
    console.error("❌ Error al parsear FIREBASE_SERVICE_ACCOUNT:", e.message);
  }
} else {
  console.error("❌ No se encontró la variable de entorno FIREBASE_SERVICE_ACCOUNT");
}

module.exports = admin;
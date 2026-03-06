// Usamos el modo compatibilidad para no tener que cambiar todo tu código
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

// Datos de tu proyecto OnFire!
const config = {
  apiKey: "apikey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

// Evitamos inicializar el app más de una vez
let fire;
if (!firebase.apps.length) {
  fire = firebase.initializeApp(config);
} else {
  fire = firebase.app();
}

module.exports = fire;
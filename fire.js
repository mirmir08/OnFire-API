// Usamos el modo compatibilidad para no tener que cambiar todo tu código
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

// Datos de tu proyecto OnFire!
const config = {
  apiKey: "AIzaSyCykZfGQEmxL3YJTRCnOa9G09bxku0C-eY",
  authDomain: "onfire-32e31.firebaseapp.com",
  projectId: "onfire-32e31",
  storageBucket: "onfire-32e31.firebasestorage.app",
  messagingSenderId: "1020429206860",
  appId: "1:1020429206860:web:91dbb8e67469e3530e7be9",
  measurementId: "G-KKCQQQKWJX"
};

// Evitamos inicializar el app más de una vez
let fire;
if (!firebase.apps.length) {
  fire = firebase.initializeApp(config);
} else {
  fire = firebase.app();
}

module.exports = fire;
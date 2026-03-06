const express = require('express');
const PORT = process.env.PORT || 5000;
var app = express();
var fire = require('./fire'); // Asegúrate de actualizar también fire.js
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta principal con la lista de endpoints
app.get('/', (req, res) => {
  res.send(
    '<h1>API Express & Firebase MonitoreO2</h1>' +
    '<ul>' +
    '<li><b>GET /ver</b> - Ver todos los valores</li>' +
    '<li><b>GET /valor</b> - Último valor</li>' +
    '<li><b>GET /estado</b> - Último estado del Relé</li>' +
    '<li><b>POST /insertar</b> - {temp, hum, gas, ruido, nombre}</li>' +
    '</ul>'
  );
});

// Obtener todos los valores
app.get('/ver', (req, res) => {
  const db = fire.firestore();
  // Se eliminó db.settings({ timestampsInSnapshots: true }) por ser obsoleto
  let wholeData = [];
  db.collection('Valores').orderBy('fecha', 'asc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        wholeData.push(doc.data());
      });
      res.send(wholeData);
    })
    .catch(error => {
      console.error('Error en /ver:', error);
      res.status(500).send(error);
    });
});

// Obtener el último valor insertado
app.get('/valor', (req, res) => {
  const db = fire.firestore();
  let wholeData = [];
  db.collection('Valores').orderBy('fecha', 'desc').limit(1).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        wholeData.push(doc.data());
      });
      res.send(wholeData);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// Insertar nuevos datos de sensores
app.post('/insertar', (req, res) => {
  const db = fire.firestore();
  
  // Mapeo de los datos que enviará el ESP32
  const nuevaAlerta = {
    temp: req.body.temp || 0,
    hum: req.body.hum || 0,
    flama: req.body.flama || 0,
    monoxido: req.body.monoxido || 0,
    co2_random: req.body.co2_random || 0,
    id_sensor: req.body.id_sensor || "GV001",
    lat: req.body.lat || "24.4395228",
    long: req.body.long || "-104.1279768",
    viento_vel: req.body.viento_vel || 0,
    viento_dir: req.body.viento_dir || 0,
    // Prioriza la hora del ESP32, si falla usa la del servidor
    fecha: req.body.fecha || new Date().toISOString() 
  };

  db.collection('Sensor').add(nuevaAlerta)
    .then(() => {
      console.log('Datos recibidos del sensor OnFire!:', nuevaAlerta);
      res.send({
        ...nuevaAlerta,
        status: 'Valores de sensores insertados correctamente!'
      });
    })
    .catch(error => {
      console.error('Error al insertar en Firestore:', error);
      res.status(500).send({ error: 'Error en la base de datos' });
    });
});



// Endpoints para control de Relé (Encender/Apagar)
app.post('/encender', (req, res) => {
  const db = fire.firestore();
  db.collection('Rele').add({
    r1: true,
    nombre: req.body.nombre,
    fecha: new Date().toISOString()
  }).then(() => res.send({ status: 'Rele encendido' }));
});

app.post('/apagar', (req, res) => {
  const db = fire.firestore();
  db.collection('Rele').add({
    r1: false,
    nombre: req.body.nombre,
    fecha: new Date().toISOString()
  }).then(() => res.send({ status: 'Rele apagado' }));
});

app.listen(PORT, () => {
  console.log(`Servidor MonitoreO2 escuchando en puerto ${PORT}`);
});
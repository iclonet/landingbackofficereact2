const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Mock Server</h1>');

});

app.post('/api/v1/account/authenticate', (req, res) => {
  res.sendFile(__dirname + '/responses/authorize.json');
});

app.get('/api/v1/person/', (req, res) => {
  if (req.query.dni) {
    if(req.query.dni == '0') {
      res.sendFile(__dirname + '/responses/persona_vacia.json');
    }
    res.sendFile(__dirname + '/responses/persona_por_dni.json');
  }
  if (req.query.apellido) {
    res.sendFile(__dirname + '/responses/persona_por_apellido.json');
  }
  res.sendFile(__dirname + '/responses/persona_por_dni.json');
});

app.get('/api/v1/person/:cuil', (req, res) => {
    if(req.params.cuil == '405') {
        res.status = 405;
        res.sendFile(__dirname + '/responses/405-inforestringida.json');
    } else if (req.params.cuil == '20262845266') {
    res.sendFile(__dirname + '/responses/get_person_20262845266.json');
  } else if (req.params.cuil == '20369100506') {
    res.sendFile(__dirname + '/responses/get_person_20369100506.json');
  } else if (req.params.cuil == '20289187147') {
    res.sendFile(__dirname + '/responses/get_person_20289187147.json');
  } else {
    res.sendFile(__dirname + '/responses/get_person.json');
  }
});

app.get('/api/v1/company/', (req, res) => {
    if(req.query.cuit === '0') {
        res.sendFile(__dirname + '/responses/empresa_vacia.json');
    } else {
        res.sendFile(__dirname + '/responses/empresa_search.json');
    }
});

app.get('/api/v1/company/:cuit', (req, res) => {
    if(req.params.cuit == '405') {
        res.status = 405;
        res.sendFile(__dirname + '/responses/405-inforestringida.json');
    } else if (req.params.cuit == '30708028580') {
      res.sendFile(__dirname + '/responses/empresa_get_30708028580.json');
    } else if (req.params.cuit == '30500007539') {
      res.sendFile(__dirname + '/responses/empresa_get_30500007539.json');
    } else {
      res.sendFile(__dirname + '/responses/empresa_get.json');
    }
});

app.get('/api/v1/account/me/', (req, res) => {
    res.sendFile(__dirname + '/responses/get_account.json');
});

app.get('/api/v1/account/me/listuser/', (req, res) => {
    res.sendFile(__dirname + '/responses/get_listuser.json');
});

app.put('/api/v1/account/me/update/', (req, res) => {
    res.send({ result: { code: 200, info: 'OK' }, data: {} });
});

app.put('/api/v1/account/me/delete/', (req, res) => {
    res.send({ result: { code: 200, info: 'OK' }, data: {} });
});

app.get('/api/v1/notificacion/', (req,res) => {
    res.sendFile(__dirname + '/responses/notificaciones.json');
});

app.get('/api/v1/log/', (req, res) => {
    res.sendFile(__dirname + '/responses/get_log.json');
});

app.get('/api/clientes/logo/:clientId', (req, res) => {
    //res.status(404)
  res.sendFile(__dirname + '/responses/get_logo.json');
});

app.get('/api/clientes/:clientId', (req, res) => {
    res.sendFile(__dirname + '/responses/get_client.json');
});

app.get('/api/v1/searchFull/', (req, res) => {
    //res.sendFile(__dirname + '/responses/empresa_vacia.json');
    res.sendFile(__dirname + '/responses/searchFull.json');
});

app.get('/api/v1/telefono/', (req, res) => {
    res.sendFile(__dirname + '/responses/get_telefonos.json');
});

app.get('/api/v1/reset/account/requestPasswordReset/:email', (req, res) => {
    res.status(500);
    res.sendFile(__dirname + '/responses/recuperarPass.json');
});

var port = 8090;
app.listen(port);
console.log(`mockserver en ${port}`);

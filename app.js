var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//SE CARGA EL MODULO DE SQLITE3
var sqlite3 = require('sqlite3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//SE CARGA EL MODULO DE KNEX
//SE INICIALIZA KNEX CON SQLITE3

var db = require('knex')(
    {
        client: 'sqlite3',
        connection: {
            filename: 'ejercitos.sqlite'
        },
        useNullAsDefault: true
    }
);


//ESTAS RUTAS PREDEFINIDAS NO LAS VAMOS A USAR
//app.use('/', indexRouter);
//app.use('/users', usersRouter);


//RUTAS PARA organizaciones
app.get('/api/organizaciones', function (req, res) {
    db.select('a.id', 'a.name')
        .from('organizaciones as a')
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});




//----------------------------------ORGANIZACIONES----------------------------------------------------------------



//DELETE DE organizaciones
app.delete('/api/organizaciones/:id', function (req, res) {

    let id = parseInt(req.params.id);

    db.delete()
        .from('organizaciones')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});

//SELECCION POR ID DE organizacionAS
app.get('/api/organizaciones/:id', function (req, res) {

    //Como es un string lo pasamos a un entero por que organizaciones.id es int, no string
    let id = parseInt(req.params.id);
    db.select('a.id', 'a.name')
        .from('organizaciones as a')
        .where('a.id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});

//MODIFICACION DE organizaciones
app.post('/api/organizaciones/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let data = req.body;

    db('organizaciones')
        .where('id', id)
        .update(data)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log('ERROR:', err);

    });
});


//POST PARA ENVIAR EL JSON A LA API
app.post('/api/organizaciones', function (req, res) {
    let data_form = req.body;
    console.log('app.js app.post() organizaciones. Params:', data_form);

    db.insert(data_form)
        .into('organizaciones')
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});






//-----------------------------------------------------------------PAISES------------------------------------------------------------------------------








//GETS PARA paisES

app.get('/api/paises', function (req, res) {
    db.select('p.id', 'p.name', 'o.name as organizacion', 'p.image', 'p.description')
        .from('paises as p')
        .join('organizaciones as o', 'p.organizacion_id', 'o.id')
        .then(function (data) {

            res.json(data);
        }).catch(function (err) {
        console.log(err);

    });
});

//NECESITAMOS UN ENDPOOINT CON POST PARA UN pais CON ID CONCRETO
app.post('/api/paises/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let paisData = req.body;

    db('paises')
        .where('id', id)
        .update(paisData)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log('ERROR :', err);
        });
});


//POST PARA ENVIAR EL JSON A LA API
app.post('/api/paises', function (req, res) {

    let data_form = req.body;
    console.log('app.je app.post(). Params:', data_form);


    db.insert(data_form)
        .into('paises')
        .then(function (data) {

            res.json(data);
        }).catch(function (err) {
        console.log(err);

    });
});


//SELECCION POR ID DE paises
app.get('/api/paises/:id', function (req, res) {

    //Como es un string lo pasamos a un entero por que paises.id es int, no string
    let id = parseInt(req.params.id);
    db.select('p.id', 'p.organizacion_id','p.name', 'p.image', 'p.description')
        .from('paises as p')
        .where('p.id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});


//DELETE DE paises

app.delete('/api/paises/:id', function (req, res) {

    //Como es un string lo pasamos a un entero por que paises.id es int, no string
    let id = parseInt(req.params.id);
    //console.log('app.js app.delete() se borrara el elemento con id: '+id);
    db.delete()
        .from('paises')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});



//-----------------------------------------------------------VEHICULOS------------------------------------------------------------------------------





//GETS PARA vehiculos

app.get('/api/vehiculos', function (req, res) {
    db.select('s.id', 's.pais_id', 's.name', 's.imagen')
        .from('vehiculos as s')
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});

//PEDIR LOS DATOS COMPLETOS DE TODAS LAS CANCIONES

app.get('/api/vehiculos/all', function (req, res) {
    db.select('v.id', 'v.name', 'v.imagen', 'p.name as pais', 'o.name as organizacion') // AÑADE s.id
        .from('vehiculos as v')
        .join('paises as p', 'v.pais_id', 'p.id')
        .join('organizaciones as o', 'p.organizacion_id', 'o.id')
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});


// GET DE UNA CANCIÓN POR ID
app.get('/api/vehiculos/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.select('v.id', 'v.name', 'v.imagen', 'v.pais_id')
        .from('vehiculos as v')
        .where('v.id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log(err);
    });
});



//DELETE DE vehiculos POR ID
app.delete('/api/vehiculos/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.delete()
        .from('vehiculos')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});

//POST PARA AÑADIR vehiculos

app.post('/api/vehiculos', function (req, res) {
    let data_form = req.body;
    console.log('app.js app.post() vehiculos. Params:', data_form);

    db.insert(data_form)
        .into('vehiculos')
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});

//MODIFICACION DE vehiculos
app.post('/api/vehiculos/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let data = req.body;

    db('vehiculos')
        .where('id', id)
        .update(data)
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
        console.log('ERROR:', err);

    });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


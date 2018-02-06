const express = require('express');
const mongoose = require('mongoose');

const requestLogger = require('./loggers/requestLogger');
const articles = require('./routes/articles');

const app = express();

mongoose.connect('mongodb://localhost:27017/frontcamp', function(err) {
    if (err) console.log('Connection error');
     console.log('connected to db');
     app.listen(4444);
});

app.use(express.json());
app.set('view engine', 'pug');

app.use((req, res, next) => {
    const msg = `'Method: ${req.method}', route: '${req.originalUrl}'`;
    requestLogger(req);
    console.log(msg);
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Blogs' });
});

app.use('/blogs', articles);

app.get('/404', (req, res) => {
    res.render('404', { title: 'Blogs Error' });
});

app.use('*', (err, req, res, next) => {
    if (req.app.settings.env === 'prod') {
        res.status(401).render('opps', { title: 'opps' });
    } else {
        res.status(401).send(err.stack);
    }
});

'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import favicon from 'serve-favicon';
import serverRendering from './serverRendering';
 
var app = express();
app.use(favicon(path.join(__dirname, '../../public/images/favicon.ico')));
app.use(express.static('public'));
app.use(serverRendering);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});

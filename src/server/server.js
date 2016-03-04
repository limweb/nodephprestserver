    "use strict";
    var express = require('express-oi');
    var jsxCompile = require('express-jsx');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var log4js = require('log4js');
    var mysql = require('mysql');
    var util = require('util');
    var path = require('path');
    var appdata = require('./appjs/appdata.js');
    var async = require('async');
    var php = require('php-proxy-middleware');
    var app = express();
    var busboy = require('connect-busboy');
    var port = 8888;
    //---------------- react-------------------------------------start
    var React = require('react');
    var ReactDOMServer = require('react-dom/server');

    import Test  from '../share/jsx/test.js';
    // class Test extends React.Component {
    //     render() {
    //         return(<h1>TEST</h1>);
    //     }
    // }

    // class MyComponent extends React.Component {
    //   render() {
    //     return <div>Hello World jsx</div>;
    //   }
    // }
    // class MyComponent extends React.Component {
    //   render() {
    //     return React.createElement("div", null, "Hello World");
    //   }
    // }
    //---------------- react---------------------------------------end
    app.set('env', process.env.NODE_ENV || 'development');
    app.http().io({
        "debug": true
    });
    appdata.cx = app;
    app.io.session({
        secret: 'tomato',
        resave: false,
        saveUninitialized: true
    });
    console.log('use busboy-------------------------->');
    app.use(busboy());
    //--------------- set up loging--------------------------------
    log4js.configure({
        appenders: [{
            type: 'console'
        }, {
            type: 'file',
            filename: 'logapp.log',
            maxLogSize: 2800000,
            backups: 6,
            category: 'logapp'
        }]
    });
    //====================== log Config =============================== start 
    var logger = log4js.getLogger('logapp');
    console.log = function() {
        var l = util.format.apply(null, arguments);
        logger.info(l + '\n'); //
        app.io.emit('clientlog', l);
    }
    // logger.setLevel('ERROR');
    logger.setLevel('DEBUG');
    // logger.trace('Entering cheese testing');
    // logger.debug('Got cheese.');
    // logger.info('Cheese is Gouda.');
    // logger.warn('Cheese is quite smelly.');
    // logger.error('Cheese is too ripe!');
    // logger.fatal('Cheese was breeding ground for listeria.');
    // console.log('test test test -------->');
    //====================== log Config =============================== end
    app.io.on('connection', function(req, res, next) {
        console.log('io connected');
    });
    //----------------------------------------------------------- route ----
    //---------------- multi part file route ------------------------
    appdata.webboard = require("./appjs/database");
    appdata.permission = require("./appjs/permission");
    var path_public = path.join(__dirname, '/../../public/');
    var path_temp = path.join(__dirname, '/../../temp/');
    require("./appjs/io")(app);
    var routes = require('./routes/index');
    var profile = require('./routes/profile');
    var authen = require('./routes/authen');
    var register = require('./routes/register');
    var message = require('./routes/message');
    app.get('/react', function(req, res) {
        // res.send(ReactDOMServer.renderToString(<MyComponent />));
        // res.send(ReactDOMServer.renderToString(<Test />));
        let c = ReactDOMServer.renderToString(<Test />);
        // let c = ReactDOMServer.renderToString(React.createElement(MyComponent, null));
        console.log('react-com=',c);
        res.send(c);
        // res.send('TEST React');
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    var favicon = require('serve-favicon');
    app.use(favicon(__dirname + '/../../public/images/favicon.ico'));
    console.log('viewpath=', path.join(__dirname, '/views'));
    app.set('views', path.join(__dirname, '/views'));
    //app.set('view engine', 'jade');
    app.set('view engine', "html");
    app.engine("html", require("ejs").renderFile);
    app.use(express.static(path.join(__dirname, '/../../public')));
    //---------------- multi part file route ------------------------
    //----------------------db-------------------
    appdata.webboard.init();
    //----------------------db-------------------
    app.use('/bbs', routes);
    app.use('/authen', authen);
    app.use('/profile', profile);
    app.use('/register', register);
    app.use('/message', message);
    // require('./appjs/routers')(app);
    require('./appjs/socketroute')(app);
    require('./appjs/serverroute')(app);
    //----------------------------------------------------------- route ----
    console.log('-----start------app---->>>>');
    async.waterfall([

        function(callback) {
            console.log('------1-');
            console.log('connect to mysql');
            appdata.mysqlconn = mysql.createPool({
                connectionLimit: 100,
                queueLimit: 0,
                host: '127.0.0.1',
                user: 'root',
                debug: false,
                password: '',
                waitForConnections: true,
                database: 'jackpot',
                connect_timeout: 10,
                wait_timeout: 28800
            });
            callback(null);
        },
        function(callback) {
            console.log('------2-');
            console.log('connect to ---- php ---proxy-------');
            //-------------------- example ------------------php
            // app.use('/services', php({
            //   root: __dirname + '/services'
            // }));
            // prefix: '/services'
            //-------------------- example ------------------php
            app.use(php({
                address: '127.0.0.1',
                port: '8000',
                root: __dirname + '/../../php',
                preffix: '/php'
            }));
            callback(null);
        },
        function(callback) {
            console.log('------3-');
            // catch 404 and forward to error handler
            app.use(function(req, res, next) {
                console.log('Error:404-------------------------------------');
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });
            // error handlers
            // development error handler
            // will print stacktrace
            if (app.get('env') === 'development') {
                app.use(function(err, req, res, next) {
                    console.log('Error:500----------------------development');
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                });
            }
            // production error handler
            // no stacktraces leaked to user
            app.use(function(err, req, res, next) {
                console.log('Error:500-----------------------------------------');
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            });
            app.listen(port);
            callback(null);
        }
    ], function(err) {
        console.log("app listen at " + port);
    });
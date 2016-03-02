// var app = require('express')();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });
// server.listen(3000);

var app = require('express')();

var http = require('http');
var site = http.createClient(8000,'127.0.0.1');
var php = require('php-proxy-middleware');
var proxy = require('proxy-middleware')
var server     = require('http').createServer(app),
    io         = require('socket.io')(server),
    logger     = require('winston'),
    port       = 1337;


// Logger config
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });
logger.info('SocketIO > listening on port ' + port);

io.on('connection', function (socket){
    var nb = 0;

    logger.info('SocketIO > Connected socket ' + socket.id);

    socket.on('broadcast', function (message) {
        ++nb;
        logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
        io.emit('tlen',message);
    });


    socket.on('php',function(){
        console.log('emit php');

        var post_req  = null,
        post_data = '{"login":"toto","password":"okay","duration":"9999"}';

    var post_options = {
        hostname: '127.0.0.1',
        port    : '8000',
        path    : '/php',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': post_data.length
        }};

        post_req = http.request(post_options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ', chunk);
                io.emit('tlen',chunk);
            });
        });

        post_req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            io.emit('tlen','error');

        });

        post_req.write(post_data);
        post_req.end();

    })


    socket.on('foo',function(data){
        console.log('foo data=',data);
    });


    //{ emit:'tlen_1',data:{aaa:'aaaa'} }
    socket.on('tlen',function(data){
        var e = data.emit;
        if(!e){
            e = 'tlen';
        }
        console.log('tlen emit to ',e,'data=',data);
        io.emit(e,data.data);
    });


    socket.on('disconnect', function () {
        logger.info('SocketIO : Received ' + nb + ' messages');
        logger.info('SocketIO > Disconnected socket ' + socket.id);
    });
});


app.get('/hello', function (req,res) {
   res.send('Hello');
});

app.use(php({
  address: '127.0.0.1',
  port: '8000',
  root: __dirname + '/../app',
}));



server.listen(port);
console.log('Express Server listen port=',port);

"use strict";
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var dbsrv = require('./dbservice.js');
var appdata = require('./appdata.js');

module.exports = function(app) {

        app.io.route('ready', function(req) {
            console.log('ready---data:',req.data);
            app.io.emit('talk',req.data);
        })

        app.io.route('connected',function(req){
            console.log('connected---isSocket=',req.isSocket);
            if(req.isSocket && appdata.socket){
                appdata.socket = req.socket;    
            }
        });

        function abc() {
            return "<h1>abc</h1>";
        }
        // Send the client html.

        // app.io.route('test', function(req) {
        //     // console.log('test');
        //     req.socket.emit('talk', {
        //         message: 'test io event from an io route on the server'
        //     })
        // })

        // app.io.route('php',function(req,res){
        //     if(req.isSocket){
        //         req.socket.emit('tlen',req.data);
        //     }
        // });



        app.get('/test', function(req, res) {
            res.send("<h1>test Abc</h1>");
        });
        
        app.get('/abc', function(req, res) {
            res.send(abc());
        });

        
        // app.get('/testsocket', function(req, res) {
        //     res.sendfile(__dirname + '/client.html');
        // });


        // app.post('/upload', function(req, res) {
        //     // console.log('update body--->', req.busboy);
        //     var user;
        //     var type;
        //     var room_slug;
        //     var filenamex;
        //     var fstream;
        //     var extar = ['.php', '.js', '.exe', '.sh', '.bin', '.c', '.o', '.rb', '.perl', '.go', '.jar'];
        //     req.pipe(req.busboy);
        //     req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        //         // // console.log(key,'====',value);
        //         if (key == 'user') user = value;
        //         if (key == 'type') type = value;
        //         if (key == 'room_slug') room_slug = value;
        //         if (key == 'filename') filenamex = value;
        //         // console.log('2', type, user, room_slug, filenamex);
        //     });
        //     // console.log('1', type, user, room_slug, filenamex);
        //     req.busboy.on('file', function(fieldname, file, filename) {
        //         // console.log("-------Uploading filename: " + filename);
        //         // console.log("-------Uploading fieldname userPhoto: " + fieldname.path);
        //         // console.log("-------Uploading file: " + file);
        //         fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        //         file.pipe(fstream);
        //         fstream.on('close', function() {
        //             var extf = path.extname(filename);
        //             var a = extar.indexOf(extf);
        //             if (a >= 0) {
        //                 extf = extf + '.xxx';
        //             }
        //             var fname = uuid() + extf;
        //             var fnamepath = __dirname + '/../uploads/' + fname;
        //             var uppath = 'http://192.168.1.105:8080/uploads/';
        //             // console.log('fnamepath=', fnamepath);
        //             // console.log('fnamepathx=', filenamex);
        //             // console.log(__dirname + '/files/' + filename);
        //             fs.rename(__dirname + '/files/' + filename, fnamepath, function(err) {
        //                 if (!err) {
        //                     // var type = req.body.type;
        //                     // var user = req.body.user;
        //                     // var room_slug = req.body.room_slug;
        //                     // var filename  = req.body.filename;
        //                     // console.log('move successed');
        //                 } else {
        //                     // console.log('Error');
        //                 }
        //             });
        //             // console.log('room----', appdata.socket.room);
        //             // dbsrv.saveupload(app, type, user, room_slug, uppath, fname, filenamex, res, appdata.socket);
        //             // res.redirect('back');
        //         });
        //     });
        // });


        // var messages = [];
        // app.io.route('messages', {
        //     // socket.io event: messages:list 
        //     list: function(req, res) {
        //         res.json(messages);
        //     },
        //     // socket.io event: messages:add 
        //     add: function(req, res) {
        //         // data is accessible from req.data (just like req.body, req.query) 
        //         // console.log('message:add=', req.body);
        //         // console.log('message:add=', req.query);
        //         // var data = req.data;
        //         var data = req.body.name;
        //         // Or use req.param(key) 
        //         var message = {
        //             text: req.param('text')
        //         };
        //         messages.push(message);
        //         res.status(200).json(message);
        //     },
        //     // socket.io event: messages:remove 
        //     remove: function(req, res) {
        //         // Or just send a status code 
        //         res.sendStatus(403);
        //     }
        // });
        // app.route('/messages').get(function(req, res) {
        //     // Forward GET /messages to messages:list 
        //     req.io.route('messages:list');
        // }).post(function(req, res, a) {
        //     // Forward POST /messages to messages:add 
        //     // console.log('message:post=', req.body);
        //     // console.log('message:post=', req.query);
        //     req.io.route('messages:add');
        // }).delete(function(req, res) {
        //     // Forward DELETE /messages to messages:remove 
        //     req.io.route('messages:remove');
        // });
        // // express-oi routes 
        // app.io.route('examples', {
        //     example: function(req, res) {
        //         // Respond to current request 
        //         res.status(200).json({
        //             message: 'This is my response'
        //         });
        //         // You can check if current request is a websocket 
        //         if (req.isSocket) {
        //             // Emit event to current socket 
        //             req.socket.emit('message', 'this is a test');
        //             // Emit event to all clients except sender 
        //             req.socket.broadcast.emit('message', 'this is a test');
        //             // sending to all clients in 'game' room(channel) except sender 
        //             req.socket.broadcast.to('game').emit('message', 'nice game');
        //             // sending to individual socketid, socketid is like a room 
        //             // req.socket.broadcast.to(socketId).emit('message', 'for your eyes only');
        //         }
        //         // sending to all clients, including sender 
        //         app.io.emit('message', 'this is a test');
        //         // sending to all clients in 'game' room/channel, including sender 
        //         app.io.in('game').emit('message', 'cool game');
        //     }
        // });


        // app.post('/testpost', function(req, res) {
        //     var name = req.body.name,
        //         color = req.body.color;
        //     // console.log(req.body);
        //     res.send("ok");
        // });

        // app.get('/nodeinfo',function(req,res){
        //     // console.log('mysqlconn=',appdata.mysqlconn);
        //     // console.log('app cx = ',appdata.cx);
        //     console.log('socket = ',appdata.socket);
        //      res.send('ok');
        // });

        // app.get('/updaterooms',function(req,res){
        //       // console.log('updaterooms');
        //       dbsrv.getroom();
        //       res.send('update rooms successed');
        // });

        // app.get('/rooms',function(req,res){
        //     dbsrv.rooms(res);
        // });


    } // end of module
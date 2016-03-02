"use strict";
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var dbsrv = require('./dbservice.js');
var appdata = require('./appdata.js');

module.exports = function(app) {

        function abc() {
            return "<h1>abc</h1>";
        }

        app.get('/test', function(req, res) {
            res.send("<h1>test Abc</h1>");
        });
        
        app.get('/abc', function(req, res) {
            res.send(abc());
        });

        app.get('/testsocket', function(req, res) {
            res.sendfile(__dirname + '/client.html');
        });


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
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

        
        app.io.route('testio', function(req) {
            console.log('testio is work');
        });   


        app.io.route('test', function(req) {
            console.log('test');
            req.socket.emit('talk', {
                message: 'test io event from an io route on the server'
            })
        })

        app.io.route('php',function(req,res){
            if(req.isSocket){
                req.socket.emit('tlen',req.data);
            }
        });




        var messages = [];
        app.io.route('messages', {
            // socket.io event: messages:list 
            list: function(req, res) {
                res.json(messages);
            },
            // socket.io event: messages:add 
            add: function(req, res) {
                // data is accessible from req.data (just like req.body, req.query) 
                // console.log('message:add=', req.body);
                // console.log('message:add=', req.query);
                // var data = req.data;
                var data = req.body.name;
                // Or use req.param(key) 
                var message = {
                    text: req.param('text')
                };
                messages.push(message);
                res.status(200).json(message);
            },
            // socket.io event: messages:remove 
            remove: function(req, res) {
                // Or just send a status code 
                res.sendStatus(403);
            }
        });

        app.route('/messages').get(function(req, res) {
            // Forward GET /messages to messages:list 
            req.io.route('messages:list');
        }).post(function(req, res, a) {
            // Forward POST /messages to messages:add 
            // console.log('message:post=', req.body);
            // console.log('message:post=', req.query);
            req.io.route('messages:add');
        }).delete(function(req, res) {
            // Forward DELETE /messages to messages:remove 
            req.io.route('messages:remove');
        });

        // express-oi routes 
        app.io.route('examples', {
            example: function(req, res) {
                // Respond to current request 
                res.status(200).json({
                    message: 'This is my response'
                });
                // You can check if current request is a websocket 
                if (req.isSocket) {
                    // Emit event to current socket 
                    req.socket.emit('message', 'this is a test');
                    // Emit event to all clients except sender 
                    req.socket.broadcast.emit('message', 'this is a test');
                    // sending to all clients in 'game' room(channel) except sender 
                    req.socket.broadcast.to('game').emit('message', 'nice game');
                    // sending to individual socketid, socketid is like a room 
                    // req.socket.broadcast.to(socketId).emit('message', 'for your eyes only');
                }
                // sending to all clients, including sender 
                app.io.emit('message', 'this is a test');
                // sending to all clients in 'game' room/channel, including sender 
                app.io.in('game').emit('message', 'cool game');
            }
        });

    } // end of module
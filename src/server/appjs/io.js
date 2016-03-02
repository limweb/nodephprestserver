"use strict";
module.exports = function(app) {
        app.io.route('update-trigger',function(req, res){
            console.log('--server-----update-trigger--------------------',req.data);
            //io.sockets.emit("update-trigger", data);
            if (req.isSocket) {
                req.socket.broadcast.emit("update-trigger", data);
            } else {
                console.log('Error: no req.socket');
            }
        })
}


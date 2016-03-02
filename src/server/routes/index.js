var express = require('express-oi');
var router = express.Router();
var appdata = require('../appjs/appdata.js');
//===================================================================
router.get('/', function(req, res, next) {
	 // console.log('req socket =',req.socket);
	 // console.log('req io =',req.io);
	 if(req.isSocket) {
	 	appdata.socket = req.socket;
	 	// console.log('appatasocket=',appdata.socket);
	 } else {
	 	console.log('req.is not socket');
	 }
	 // req.io.route('testio','test test');
    if(appdata.permission.isLogin(req)){
        res.render("webboard.html");    
    }else{
        res.redirect("/authen/login");
    }    
	// res.send('test route / is ok');
});
//===================================================================
module.exports = router;

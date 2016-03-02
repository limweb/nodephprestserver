var express = require('express-oi');
var router = express.Router();
var appdata = require('../appjs/appdata.js');
//===================================================================
router.get('/', function(req, res, next) {
    res.send("authen controller");
});
//-------------------------------------------------------------------
router.get('/login', function(req, res, next) {
    console.log(appdata.permission.readToken(req));
    appdata.permission.clearToken(res);
    res.render("login");
});
//-------------------------------------------------------------------
router.post('/login', function(req, res, next) {
    console.log('auth/login post-----------------------------login',req.body);
    var loginname = req.body.loginname;
    var password = req.body.password;
    
    appdata.webboard.checkLogin(loginname, password, function(id){
        appdata.permission.writeToken(res, id);
        res.json({ id: id});
    }, function(errorMessage){
        console.log(errorMessage);
        res.json({ message : errorMessage});
    });
    
});
//-------------------------------------------------------------------
router.get('/logout', function(req, res, next) {
    
    res.redirect("/authen/login");
});
//===================================================================
module.exports = router;
var db = require('../db');
module.exports.authRequire = function(request, response, next){

    console.log(request.signedCookies,request.cookies);
    if(!request.signedCookies){
        response.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id:request.signedCookies.userid}).value();
    if(!user){
        response.redirect('/auth/login');
        return;
    }
    response.locals.user = user;
    next();
}
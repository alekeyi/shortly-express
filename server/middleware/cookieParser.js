const models = require('../models/');

const parseCookies = (req, res, next) => {

    //IF COOKIES IN HEADER, PARSE THEM
    if (req.headers.cookie) {
        req.cookies = {};
        console.log(req.headers.cookie);
        console.log(typeof req.headers.cookie)
        let temp = req.headers.cookie.split('=');
        let cookieKey = temp[0];
        let cookieVal = temp[1];

        req.cookies[cookieKey] = cookieVal;
        console.log(req.cookies);
    }

    
    next()
};

module.exports = parseCookies;
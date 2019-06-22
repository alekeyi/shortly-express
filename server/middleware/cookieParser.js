const models = require('../models/');

const parseCookies = (req, res, next) => {

    //IF COOKIES IN HEADER, PARSE THEM
    if (req.headers.cookie) {
        // console.log('req.headers.cookie: ', req.headers.cookie);
        // console.log('typeof req.headers.cookie: ', typeof req.headers.cookie)
        
        req.cookies = {};
        let cookieArray = req.headers.cookie.split('; ')

        for (let i = 0; i < cookieArray.length; i++) {
            let temp = cookieArray[i].split('=');
            let cookieKey = temp[0];
            // cookieKey.trim()
            let cookieVal = temp[1];
            req.cookies[cookieKey] = cookieVal;
        }
        // console.log('req.cookies: ', req.cookies);
        // console.log('req.cookies[\'sessionId\']: ', req.cookies['sessionId']);
    }

    
    next()
};

module.exports = parseCookies;
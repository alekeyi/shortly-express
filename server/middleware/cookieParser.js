const models = require('../models/');

const parseCookies = (req, res, next) => {
  req.cookies = {};

  //IF COOKIES IN HEADER, PARSE THEM
  if (req.headers.cookie) {
    // console.log('req.headers.cookie: ', req.headers.cookie);
    // console.log('typeof req.headers.cookie: ', typeof req.headers.cookie)

    let cookieArray = req.headers.cookie.split('; ');

    for (let i = 0; i < cookieArray.length; i++) {
      let temp = cookieArray[i].split('=');
      let cookieKey = temp[0];
      // cookieKey.trim()
      let cookieVal = temp[1];
      req.cookies[cookieKey] = cookieVal;
    }
    console.log('req.cookies1: ', req.cookies);
    // console.log('req.cookies[\'sessionId\']: ', req.cookies['sessionId']);
  } else {
    //CASE: NO COOKIES. WE NEED TO CREATE ONE USING SESSION
    req.cookies = {};
    // models.Sessions.create()
    // .then(hash => {req.cookies['cookieID'] = hash
    // console.log('req.cookies2: ', req.cookies);
    // console.log('hash: ', hash);
    // console.log('req.headers: ', req.headers);
    // });
  }

  next();
};

module.exports = parseCookies;

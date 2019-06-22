const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  req.session = {};

  if (Object.keys(req.cookies) !== 0) {
    console.log('create session, looking at inc cookies ', req.cookies);
    //look up req.cookes.shortlyid in database
    //somehow (using req.body.username??) look up the hash in our sessions table
      //and see if it exists
    //if so, isLogged(req.cookies.shortlyid)
      //if true, go to index
      //if false, go to login
  }

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

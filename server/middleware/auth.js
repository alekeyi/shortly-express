const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
    //access the cookies object that we created in parsecookies
     
    //makes a call to the session db based on the cookie

    //the req will contain a session property, 
        //we need to assign and object to that contains user info

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


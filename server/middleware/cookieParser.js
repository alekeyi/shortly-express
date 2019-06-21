

const parseCookies = (req, res, next) => {

    console.log('cookie parser running');
    // console.log(req)
    if (Object.keys(req.body).length !== 0){
        //generate a session

        //set cookie with session hash

        console.log('username: ' + req.body.username)
        console.log('password: ' + req.body.password)
    }
    

    if (req.cookies !== undefined) {
        console.log(req.cookies);
    }

    //access cookie data

    //transform cookies into object. 

    
    next()
};

module.exports = parseCookies;
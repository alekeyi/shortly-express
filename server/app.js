const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');
const cookieParser = require('./middleware/cookieParser');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');


app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser);



app.get('/',
  (req, res) => {
    res.render('index');
  });

app.get('/create',
  (req, res) => {
    res.render('index');
  });

app.get('/links',
  (req, res, next) => {
    models.Links.getAll()
      .then(links => {
        res.status(200).send(links);
      })
      .error(error => {
        res.status(500).send(error);
      });
  });

// adding sign up get request
app.get('/signup',
  (req, res) => {
    console.log("Signup request server-side");
    res.render('signup');
  });

// adding login get request
app.get('/login',
  (req, res) => {
    console.log("Login request server-side");
    // console.log("Here your cookie: ", res.cookie("COOKIE TEST", "DEFINED"));
    res.render('login');
  });

app.post('/links',
  (req, res, next) => {
    var url = req.body.url;
    if (!models.Links.isValidUrl(url)) {
      // send back a 404 if link is not valid
      return res.sendStatus(404);
    }

    return models.Links.get({ url })
      .then(link => {
        if (link) {
          throw link;
        }
        return models.Links.getUrlTitle(url);
      })
      .then(title => {
        return models.Links.create({
          url: url,
          title: title,
          baseUrl: req.headers.origin
        });
      })
      .then(results => {
        return models.Links.get({ id: results.insertId });
      })
      .then(link => {
        throw link;
      })
      .error(error => {
        res.status(500).send(error);
      })
      .catch(link => {
        res.status(200).send(link);
      });
  });

/************************************************************/
// Write your authentication routes here
/************************************************************/

// adding sign up post
app.post('/signup', (req, res) => {
  // console.log(req) 
  //do something with request. parse body??
  // console.log(req.data)
  var options = {
    username: req.body.username
  }

  //see if user is in the database
  models.Users.get(options)
    .then((val) => {
      if (val !== undefined) {
        //we know the user is in the database
        console.log('the user exists in the db')
        //write to db
        res.end('This user already exists')

      } else {
        if (req.body.password && req.body.username) {
          let user = {
            username: req.body.username,
            salt: '1234',
            password: req.body.password
          }
          models.Users.create(user);
          res.end('Account created.');
        } else {
          res.end('Fill in both username and password.');
        }
      }

    });


});

// adding login post
app.post('/login', (req, res) => {

  var options = {
    username: req.body.username
  }

  //see if user is in the database
  models.Users.get(options)
    .then((userdata) => userdata)
    .then((userdata) => {
      if (userdata !== undefined) {
        models.Users.compare(req.body.password, userdata.password, userdata.salt);
      } else {
        res.end('username does not exist');
      }
    })
    .then((result) => {

      if (result) {
        //eventually do something with session and redirect to home page
        res.end('logged in successfully')
      } else {
        res.end('invalid username and password')
      }

    });

  // res.end("Done.");
});

/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;

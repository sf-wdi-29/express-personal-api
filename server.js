// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/


var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/rhamill1/express-personal-api/blob/master/README.md",
    baseUrl: "https://nameless-stream-72155.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "About the creator"},
      {method: "POST", path: "/api/weirdAnimals", description: "E.g. Create a new animal"}
    ]
  })
});


app.get('/api/profile', function (req, res) {
  // send my profile JSON response
  db.Profile.find(function(err, profile){
    if (err) { return console.log("index error: " + err); }
    res.json(profile);
  });
});

app.get('/api/weirdAnimals', function (req, res) {
  // send weirdAnimals JSON response
  db.weirdAnimals.find(function(err, weirdAnimals){
    if (err) { return console.log("index error: " + err); }
    res.json(weirdAnimals);
  });
});

app.post('/api/weirdAnimals', function(req, res) {
  var item = new db.weirdAnimals(req.body);
  item.save(function(err, newItem) {
    res.json(newItem);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

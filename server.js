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
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://murmuring-cliffs-89829.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/vinyls", description: "Shows vinyl collection"},
      {method: "GET", path: "/api/vinyls/:id", description: "Shows vinyl by id"},
      {method: "POST", path: "/api/vinyls", description: "Creates a new vinyl"},
      {method: "DELETE", path: "/api/vinyls/:id", description: "Deletes a vinyl"},
      {method: "PUT", path: "/api/vinyls/:id", description: "Updates a vinyl"}
    ]
  })
});

app.get('/api/profile', function(req, res) {
  res.json({
    name: "Natalia Hess",
    githubLink: "https://github.com/nathess91",
    githubProfileImage: "https://avatars2.githubusercontent.com/u/14087582?v=3&s=466",
    personalSiteLink: "https://www.linkedin.com/in/nataliahess",
    currentCity: "Oakland, CA",
    pets: [{name: "Fabio", type: "Dog", breed: "Coton de Tulear"}]
  })
});

// VINYL CODE //
// get all vinyl
app.get('/api/vinyls', function index(req, res) {
  // send all vinyl as JSON response
  db.Vinyl.find(function(err, vinyls){
    if (err) { return console.log("index error: " + err); }
    res.json(vinyls);
  });
});

// get one vinyl
app.get('/api/vinyls/:id', function show(req, res) {
  db.Vinyl.findById(req.params.id, function(err, vinyl) {
    if (err) { return console.log("show error: " + err); }
    res.json(vinyl);
  });
});

// create new vinyl
app.post('/api/vinyls', function create(req, res) {
  var newVinyl = new db.Vinyl({
    title: req.body.title,
    artist: req.body.artist,
    releaseDate: req.body.releaseDate,
  });
  newVinyl.save();
});


// delete one vinyl
app.delete('/api/vinyls/:id', function destroy(req, res) {
  console.log(req.params);
  var vinylId = req.params.id;

  db.Vinyl.findOneAndRemove({ _id: vinylId }, function (err, deletedVinyl) {
    res.json(deletedVinyl);
  });
});

// update vinyl
app.put('/api/vinyls/:id', function update(req, res) {
  var id = req.params.id;
  db.Vinyl.findById(req.params.id)

}


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

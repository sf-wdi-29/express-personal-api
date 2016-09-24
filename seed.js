// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var myProfile = new db.Profile ({
    name: 'ryan',
    githubLink: 'https://github.com/rhamill1',
    githubProfileImage: 'https://avatars1.githubusercontent.com/u/21372834?v=3&s=466',
    personalSiteLink: 'cffmerchants.com',
    currentCity: 'Oakland',
    pets: []
});


var weird_animals_list = new db.weirdAnimals (
  {
  name: "Sugar Crab",
  image: "http://2.bp.blogspot.com/_iirqWUi29xA/TGF_pxbD3ZI/AAAAAAAAAbk/UaGLX4gEpHc/s400/SugarCrabs.gif",
  location: "oceans and shores",
  discoveredBy: "Jacques Cousteau",
  discoveryDate: "1970-10-01"
  }
);


db.Profile.remove({}, function(err, profile){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed old profile');

    db.Profile.create(myProfile, function(err, profile){
      if (err) { return console.log('err', err); }
      console.log("created", profile.length, "profile");
      process.exit();
    });
  }
});


db.weirdAnimals.remove({}, function(err, weirdAnimal){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all weirdAnimals');

    db.weirdAnimals.create(weird_animals_list, function(err, weirdAnimal){
      if (err) { return console.log('err', err); }
      console.log("created", weirdAnimal.length, "weirdAnimals");
      process.exit();
    });
  }
});

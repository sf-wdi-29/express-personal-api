// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var vinyls = [
  {
    title: "Jagged Little Pill",
    artist: "Alanis Morissette",
    releaseDate: "June 13, 1995"
  },
  {
    title: "Back to Black",
    artist: "Amy Winehouse",
    releaseDate: "October 27, 2006"
  },
  {
    title: "Leveler",
    artist: "August Burns Red",
    releaseDate: "June 11, 2011"
  },
  {
    title: "Sounding the Seventh Trumpet",
    artist: "Avenged Sevenfold",
    releaseDate: "July 24, 2001"
  },
  {
    title: "Waking the Fallen",
    artist: "Avenged Sevenfold",
    releaseDate: "August 26, 2003"
  },
  {
    title: "City of Evil",
    artist: "Avenged Sevenfold",
    releaseDate: "June 6, 2005"
  },
  {
    title: "Avenged Sevenfold",
    artist: "Avenged Sevenfold",
    releaseDate: "October 30, 2007"
  },
  {
    title: "True",
    artist: "Avicii",
    releaseDate: "September 13, 2013"
  },
  {
    title: "Stories",
    artist: "Avicii",
    releaseDate: "October 2, 2015"
  },
  {
    title: "The Things We Do to Find People Who Feel Like Us",
    artist: "Beach Slang",
    releaseDate: "October 30, 2015"
  },
  {
    title: "Enema of the State",
    artist: "Blink-182",
    releaseDate: "June 1, 1999"
  },
  {
    title: "Take Off Your Pants and Jacket",
    artist: "Blink-182",
    releaseDate: "June 12, 2001"
  },
  {
    title: "Dopamine",
    artist: "Borns",
    releaseDate: "October 16, 2015"
  },
  {
    title: "Don't Look Back",
    artist: "Boston",
    releaseDate: "August 2, 1978"
  },
  {
    title: "Deja Entendu",
    artist: "Brand New",
    releaseDate: "June 17, 2003"
  }
];

// remove all records that match {} -- which means remove ALL records
db.Vinyl.remove({}, function(err, vinyls){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all vinyls');

    // create new records based on the array vinyl_list
    db.Vinyl.create(vinyl, function(err, vinyls){
      if (err) { return console.log('err', err); }
      console.log("created", vinyl.length, "vinyl");
      process.exit();
    });
  }
});

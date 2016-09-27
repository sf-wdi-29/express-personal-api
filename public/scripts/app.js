console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // base API route
  var baseUrl = '/api/vinyls';

  // array to hold vinyl data from API
  var allVinyls = [];

  // element to display list of vinyls
  var $vinylsList = $('#vinyls-list');

  // form to create new vinyl
  var $createVinyl = $('#create-vinyl');

  // compile handlebars template
  var source = $('#vinyls-template').html();
  var template = handlebars.compile(source);

});

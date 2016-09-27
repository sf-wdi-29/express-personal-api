console.log("Sanity Check: JS is working!");
var template;
var $vinylsList;
var allVinyls = [];

$(document).ready(function(){

  $vinylsList = $('#vinylTarget');

  var source = $('#vinyl-template').html();
  template = handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/vinyls',
    success: handleSuccess,
    error: handleError
  });

});

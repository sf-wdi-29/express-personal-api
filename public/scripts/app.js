console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // base API route
  var baseUrl = '/api/weirdanimals';

  // array to hold todo data from API
  var allweirdanimals = [];

  // element to display list of weirdanimals
  var $weirdanimalsList = $('#weirdanimals-list');

  // form to create new todo
  var $createweirdanimal = $('#newAnimalForm');

  // compile handlebars template
  // var source = $('#weirdanimals-template').html();
  // var template = Handlebars.compile(source);

  // // helper function to render all weirdanimals to view
  // // note: we empty and re-render the collection each time our weirdanimal data changes
  // function render() {
  //   // empty existing weirdanimals from view
  //   $weirdanimalsList.empty();

  //   // pass `allweirdanimals` into the template function
  //   var weirdanimalsHtml = template({ weirdanimals: allweirdanimals });

  //   // append html to the view
  //   $weirdanimalsList.append(weirdanimalsHtml);
  // };

  // // GET all weirdanimals on page load
  // $.ajax({
  //   method: "GET",
  //   url: baseUrl,
  //   success: function onIndexSuccess(json) {
  //     console.log(json);

  //     // set `allweirdanimals` to weirdanimal data (json.data) from API
  //     allweirdanimals = json.weirdanimals;

  //     // render all weirdanimals to view
  //     render();
  //   }
  // });

  // listen for submit even on form
  $createweirdanimal.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newweirdanimal = $(this).serialize();

    // POST request to create new weirdanimal
    $.ajax({
      method: "POST",
      url: baseUrl,
      data: newweirdanimal,
      success: function onCreateSuccess(json) {
        console.log(json);

        // add new weirdanimal to `allweirdanimals`
        allweirdanimals.push(json);

        // render all weirdanimals to view
        // render();
      }
    });
console.log('after request');
    // reset the form
    $createweirdanimal[0].reset();
    $createweirdanimal.find('input').first().focus();
  });

});

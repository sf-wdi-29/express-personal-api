console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // base API route
  var baseUrl = '/api/weirdanimals';

  // array to hold todo data from API
  var allweirdanimals = [];

  // element to display list of weirdanimals
  // var $weirdanimalsList = $('#weirdanimals-list');
  var $weirdanimalsList = $('#weirdAnimal');

  // form to create new todo
  var $createweirdanimal = $('#newAnimalForm');

  // compile handlebars template
  var $weirdAnimal = $('weirdAnimal');
  var source = $('#weirdAnimal-tmpl').html();
  var template = Handlebars.compile(source);

  // helper function to render all weirdanimals to view
  // note: we empty and re-render the collection each time our weirdanimal data changes
  function render() {
    // empty existing weirdanimals from view
    $weirdanimalsList.empty();

    // pass `allweirdanimals` into the template function
    // console.log(weirdAnimal);
    // console.log(allweirdanimals);
    console.log(template);
    var weirdanimalsHtml = template({weirdAnimal: allweirdanimals});
    // console.log(weirdanimalsHtml);
    // append html to the view
    $weirdanimalsList.append(weirdanimalsHtml);
    // console.log($weirdanimalsList);
  };

  // GET all weirdanimals on page load
  $.ajax({
    method: "GET",
    url: baseUrl,
    success: function onIndexSuccess(json) {
      allweirdanimals = json;
      render();
    }
  });

  // listen for submit event on form
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

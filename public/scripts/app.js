console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // base API route
  var baseUrl = '/api/weirdanimals';

  // array to hold todo data from API
  var allweirdanimals = [];

  // element to display list of weirdanimals
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
    $weirdanimalsList.empty();
    var weirdanimalsHtml = template({weirdAnimal: allweirdanimals});
    $weirdanimalsList.append(weirdanimalsHtml);
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
        allweirdanimals.push(json);
        render();
      }
    });

    // reset the form
    $createweirdanimal[0].reset();
    $createweirdanimal.find('input').first().focus();
  });


  $weirdanimalsList.on('click', '.deleteBtn', function() {
    console.log('the delete button was hit');
    $.ajax({
      method: 'DELETE',
      url: '/api/weirdanimals/' + $(this).attr('dataId'),
      success: function (json) {
        // console.log(item.url);
        console.log('entered success function');

        var item = json;
        var itemId = item._id;
        var i;
        for (i = 0; i < allweirdanimals.length; i++) {
          if (allweirdanimals[i]._id === itemId) {
            allweirdanimals.splice(i, 1);
            break;
          }
        }
        render();
      }
    });
  });

});

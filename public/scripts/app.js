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
  var template = Handlebars.compile(source);

  // function to render all vinyls to views
  function render() {
    $vinylsList.empty();

    var vinylsHtml = template({ vinyls: allVinyls });

    $vinylsList.append(vinylsHtml);
  };

  // GET all vinyls on page load
  $.ajax({
    method: "GET",
    url: baseUrl,
    success: function onIndexSuccess(json) {
      console.log(json);
      allVinyls = json.vinyls;
      render();
    }
  });

  // listen for submit on form
  $createVinyl.on('submit', function(event) {
    event.preventDefault();

    // serialize form data
    var newVinyl = $(this).serialize();

    // POST request to create new vinyl
    $.ajax({
      method: "POST",
      url: baseUrl,
      data: newVinyl,
      success: function onCreateSuccess(json) {
        console.log(json);
        allVinyls.push(json);
        render();
      }
    });
    // reset the form
    $createVinyl[0].reset();
    $createVinyl.find('input').first().focus();
  });

  // add event handlers to vinyls for updating/deleting
  $vinylsList

    // for update
    .on('submit', '.update-vinyl', function(event) {
      event.preventDefault();

      // find the vinyl by id stored in HTML as 'data-id'
      var vinylId = $(this).closest('.vinyl').attr('data-id');

      // find the vinyl to update by id
      var vinylToUpdate = allVinyls.find(function(vinyl) {
        return vinyl._id == vinylId;
      });

      // serialize form data
      var updatedVinyl = $(this).serialize();

      // PUT request to update vinyl
      $.ajax({
        type: 'PUT',
        url: baseUrl + '/' + vinylId,
        data: updatedVinyl,
        success: function onUpdateSuccess(json) {
          allVinyls.splice(allVinyls.indexOf(vinylToUpdate), 1, json);
          render();
        }
      });
    })

    // for delete
    .on('click', '.delete-vinyl', function(event) {
      event.preventDefault();

      // find the vinyl by id stored in HTML as 'data-id'
      var vinylId = $(this).closest('.vinyl').attr('data-id');

      // find the vinyl to delete by id
      var vinylToDelete = allVinyls.find(function(vinyl) {
        return vinyl._id == vinylId;
      });

      // DELETE request to delete vinyl
      $.ajax({
        type: 'DELETE',
        url: baseUrl + '/' + vinylId,
        success: function onDeleteSuccess(json) {
          allVinyls.splice(allVinyls.indexOf(vinylToDelete), 1);
          render();
        }
      });
    });
});

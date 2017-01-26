$(function() {
  console.log('Doc Loaded');
  console.log('Ok');

  $('#registerOwner').on('click', registerOwner);
}); // end doc ready function

function registerOwner(event) {
  event.preventDefault();
  console.log('working');
  var formData = $(this).closest('form').serialize();
  console.log(formData);

  $.ajax({
    url: '/owners',
    type: 'POST',
    data: formData,
    success: function(formData){
      console.log(formData);
    }
  }); //end ajax call

}; // end registerOwner function

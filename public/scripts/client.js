$(function() {
  console.log('Doc Loaded');
  console.log('Ok');
  getPetDetails();
  getOwnerList();
  $('#registerOwner').on('click', registerOwner);
  $('#addPet').on('click',addPet);
  $('#pet-list').on('click','.update',editPetInfo);
  $('#pet-list').on('click','.delete',deletePetInfo);

}); // end doc ready function

function deletePetInfo(event){
  console.log('inside editPetInfo function');
  event.preventDefault();
  var petId=$(this).attr('id');
  var formData = $(this).closest('form').serialize();
  $.ajax({
    url: '/pets/'+petId,
    type: 'DELETE',
    success: function(formData){
      console.log('ajax returned success adding pets',formData);
      getPetDetails();
    }
  }); //end ajax call


}


function editPetInfo(event){
  console.log('inside editPetInfo function');
  event.preventDefault();
  var petId=$(this).attr('id');
  var formData = $(this).closest('form').serialize();
  $.ajax({
    url: '/pets/'+petId,
    type: 'PUT',
    data: formData,
    success: function(formData){
      console.log('ajax returned success adding pets',formData);
      getPetDetails();
    }
  }); //end ajax call

}

function addPet(event) {
  event.preventDefault();
  console.log('inside addPet function');
  var formData = $(this).closest('form').serialize();
  console.log(formData);

  $.ajax({
    url: '/pets',
    type: 'POST',
    data: formData,
    success: function(formData){
      console.log('ajax returned success adding pets',formData);
      getPetDetails();
    }
  }); //end ajax call

}; // end registerOwner function

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
      getOwnerList();
    }
  }); //end ajax call

}; // end registerOwner function

function getPetDetails(){
 console.log('inside getPetDetails function');
 $.ajax({
   url:'/owners',
   type:'GET',
   success:displayPetDetails
 });// end ajax call
} // end of getPetDetails function

function displayPetDetails(pets){
  console.log('inside displayPetDetails function',pets);
  $('#pet-list').empty();
  pets.forEach(function(obj){
    var $li = $('<li></li>');

    var $form = $('<form></form>');
  //var $tr=$('<tr id="'+obj.pid+'"></tr>');
  $form.append('<span>'+obj.first_name+' '+obj.last_name+'</span>');
  $form.append('<input type="text" name="petName" value="'+obj.name+'"/>');
  $form.append('<input type="text" name="breed" value="'+obj.breed+'"/>');
  $form.append('<input type="text" name="color" value="'+obj.color+'"/>');
  $form.append('<button id="'+obj.pid+'" class="update">Update</button>');
  $form.append('<button id="'+obj.pid+'" class="delete">Delete</button>');
  $form.append('<button class="checkInOut">In</button>');
   $li.append($form);
  $('#pet-list').append($li);
});
}

function getOwnerList(){
 console.log("inside getOwnerList function");
 $.ajax({
   url:'/owners/list',
   type:'GET',
   success:displayOwnerList
 });

}

function displayOwnerList(list){
  console.log('inside displayOwnerList function',list);
   $('#ownerSelector').empty();
  list.forEach(function(obj){
    var $owner=('<option value="'+obj.id+'">'+obj.first_name+' '+obj.last_name+'</option>');
    $('#ownerSelector').append($owner);
  });
}

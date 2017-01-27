$(function() {
  console.log('Doc Loaded');
  console.log('Ok');
  getPetDetails();
  getOwnerList();
  $('#registerOwner').on('click', registerOwner);
  $('#addPet').on('click',addPet);
  $('#pet-list').on('click','.update',editPetInfo);
  $('#pet-list').on('click','.delete',deletePetInfo);
  $('#pet-list').on('click', '.checkInOut', toggleStatus);
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
  if(obj.checking_flag != 1){
  $form.append('<button data-visit="'+obj.vid+'" id="'+obj.pid+'" class="checkInOut">In</button>');
}else{
  $form.append('<button data-visit="'+obj.vid+'" id="'+obj.pid+'" class="checkInOut">Out</button>');
}
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

function toggleStatus(event){
  event.preventDefault();
  var formData = $(this).closest('form').serialize();
  var petId=$(this).attr('id');
  var $thisButton = $(this);
  var checkingStatus = $thisButton.data('visit');
  console.log(petId);
  // console.log($(this).text());
  if($(this).text()== 'In'){
    $.ajax({
      url: '/visits/'+ petId,
      type: 'POST',
      data: formData,
      success: function(formData){
        console.log('This is this:', formData[0].id);
        getOwnerList();
        $thisButton.data('visit', formData[0].id);
      }
    }); //end ajax call
    $(this).text('Out');
  }else{
    var visitId = $(this).data('visit');
    console.log('This is the visit id', visitId);
    $.ajax({
      url: '/visits/'+ visitId,
      type: 'PUT',
      data: formData,
      success: function(formData){
        console.log(formData);
        getOwnerList();
      }
    }); //end ajax call
    $(this).text('In');
  }
}

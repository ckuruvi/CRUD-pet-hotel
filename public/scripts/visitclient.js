$(function() {
  console.log('visits script loaded');
  getVisits();

});

function displayVisits(data){
  console.log(data);
  data.forEach(function(obj){
    var $td = $('<tr></tr>');


  // var $tr=$('<tr id="'+obj.pid+'"></tr>');
  $td.append('<td>'+obj.first_name+' '+obj.last_name+'</td>');
  $td.append('<td>"'+obj.name+'"</td>');
  $td.append('<td>"'+obj.check_in+'"</td>');
  $td.append('<td>"'+obj.check_out+'"</td>');
  $('.visits').append($td);
});
}

function getVisits(){
 console.log('inside getVisits function');
 $.ajax({
   url:'/visits/list',
   type:'GET',
   success:displayVisits
 });// end ajax call
} // end of getPetDetails function

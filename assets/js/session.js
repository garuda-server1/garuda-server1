jQuery(document).ready(function($){


window.onload = function(event){
    event.stopPropagation(true);
    checkauth();


 }

   
});

function checkauth()
{
  var host=window.location.hostname;
 
  if (sessionStorage.getItem('user_id') === null) {
    window.location.href=host;
  }
  

}

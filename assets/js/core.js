var host = location.origin;
jQuery(document).ready(function($){

 

    $('#login_form').submit(function(e) {
        e.preventDefault();
        $('#response_status').html('<p style="color:#f8502f";>Please Wait....</p>');

        var form = new FormData();
        var email=$('#email').val();
        var password=$('#password').val();
        form.append("api_token", "xRKWuAxhdGL26cVXg3QwyNVUEYfnkZhwoo4mduVVSdyXJga12IZJqxDQQWqR");
        form.append("email", email);
        form.append("password",password);
        
        var settings = {
          "url": "https://garuda-cdnserver1.tk/api/public/auth/",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
        
        $.ajax(settings).done(function (response) {
          data = $.parseJSON(response);
          if(data.status == 'faild')
          {
           // alert('faild');
            console.log(data.status);
            $('#response_status').html('<span style="color:#f8502f;">Sorry Wrong Username or Password !</span>');
          }
          else{
            console.log(data);
            $('#response_status').html(''); 
            // set the item in localStorage
            sessionStorage.setItem('user_id', data.data.user.id);
            sessionStorage.setItem('name', data.data.user.name);
            sessionStorage.setItem('email', data.data.user.email);
            sessionStorage.setItem('token', data.data.user.token);
            sessionStorage.setItem('email_verification_status', data.data.user.email_verified_at);
            if(data.data.subscriptions)
            {
             
              sessionStorage.setItem('package', data.data.subscriptions[0].package.name);
              sessionStorage.setItem('subscription_status', data.data.subscriptions[0].status);
              sessionStorage.setItem('expire_at', data.data.subscriptions[0].expire_at);
              sessionStorage.setItem('playlist', data.data.playlist);


              console.log(data.data.subscriptions[0].expire_at);

              console.log(data.data.subscriptions[0].package.name);

            
            

              
            }

          
            var redirect=host+"https://garuda-iptv.tk/dashboard.html";
           
            window.location.href=redirect;
            
          }

         
        });


 
   });



   $('#register_form').submit(function(e){
     
    e.preventDefault();
    $('#response_status2').html('<p style="color:#f8502f";>Please Wait....</p>');

var name=$('#re_name').val();
var email=$('#re_email').val();
var phone=$('#re_phone').val();
var city=$('#re_city').val();
var pincode=$('#re_pincode').val();
var state=$('#re_state').val();
var country=$('#re_country').val();
var package=$('#re_package').val();

var password=$('#re_password').val();
var con_password=$('#re_con_password').val();




if(password != con_password)
{
 // console.log('Password Not Match with confirm password.');
  $('#response_status2').html('<p style="color:#f8502f";>Password Not Match with confirm password....</p>');
}
else{
 
    var form = new FormData();
form.append("api_token", "xRKWuAxhdGL26cVXg3QwyNVUEYfnkZhwoo4mduVVSdyXJga12IZJqxDQQWqR");
form.append("re_name",name);
form.append("re_email", email);
form.append("re_phone", phone);
form.append("re_city", city);
form.append("re_pincode", pincode);
form.append("re_state", state);
form.append("re_con_password", password);
form.append("re_country",country);
form.append("re_package",package);
form.append("re_password",con_password);

var settings = {
  "url": "https://garuda-cdnserver1.tk/api/public/register/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Cookie": "XSRF-TOKEN=eyJpdiI6IlZuNjBFVWRtRmxkbXBNS3Rnd2ZrV2c9PSIsInZhbHVlIjoiR0haQk9YTDdoWFdKWmY5UEhVREpyem9YS2ZEUHhhN1lwaVhqQWtsUFZ3RTNDWEJ6ZHl2S3VuR21lXC9MVVQyQ20iLCJtYWMiOiI5YzdiMjVkNzlhYjBhOTkyMjJlNWEwYTBhOTBkYzQ2NjBkZWE0ZGYwZmNjNzhmOTc1NzgwNGE3MzcwOGQ3Mjk0In0%3D; laravel_session=eyJpdiI6IkRBd0xrekdlNXFkb2pkVXJpSEhCSEE9PSIsInZhbHVlIjoialwvMzhONEp2bGxmTm9GVUVYa0R0ZFl2TVR6d1lSUjJ0SE16U25kU3J1VDJJM3RDWEowSERaXC95VFwvOVF6UGhzOCIsIm1hYyI6ImNkN2QwNWYwYjBhNmM4ZmY3Njc3NzdjMmE1MWRmY2VhOTQ3MTcwNDViMjc0N2Q1ODc3ZWZkZmNiMjU3NDUxMTAifQ%3D%3D"
  },
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(function (response) {

  data = $.parseJSON(response);

  if(data.status == 'success')
  {
    console.log('response');
    window.location.href="https://garuda-iptv.tk/confirm-email.html";
  }
  else{

    var message=data.error;
    console.log(data.message.code);

    if(data.message.code == 1)
    {
      $('#response_status2').html('<p style="color:#f8502f";>'+message+'..</p>');

    }
    else{
      $('#response_status2').html('<p style="color:#f8502f";>Please Enter Valid Email Address..</p>');


    }
  

  }
  
  
});

}

   });

  


   $('#logout').click(function(){
    closeSession();
   });


   if (sessionStorage.getItem('user_id') === null  | sessionStorage.getItem('user_id') === 'undefined' ) {
    window.location.href=redirect;
  }
  else{
     $('#user_name').text('Hi '+sessionStorage.getItem("name")+'  Welcome');
     $('#playlist').text(sessionStorage.getItem("playlist"));
     $('#playlist').val(sessionStorage.getItem("playlist"));
     $('#package_name_package').text(sessionStorage.getItem("package"));
     $('#package_expire_package').text(sessionStorage.getItem("expire_at"));
     $('#package_status_package').text(sessionStorage.getItem("subscription_status"));


     


     
     

   
  
  }

       
        
    });







    function closeSession() {
      deleteItems();
      window.location.href=host+"/Play_Ground/Garuda/garuda-server1.github.io/index.html";
     

    }

    function deleteItems() {
      sessionStorage.clear();
    }











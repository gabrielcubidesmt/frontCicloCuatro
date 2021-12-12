function saveUser() {
    let myData={
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#retype_password").val()
    }


    console.log(myData);
    $.ajax({
        // url:"http://localhost:8080/api/user/new", LOCAL
        url:"http://155.248.195.17:8080/api/user/new",
        type:"POST",
        data:JSON.stringify(myData),
        dataType:"json",
        Accept : "application/json",
        contentType: "application/json",
        success: function (respuesta) {
            alert("Usuario Registrado con Exito")
        },
        error: function (xhr, status) {
            console.log(xhr.responseText);
        }
    }) 
    
}

function getUserByEmail() {
    var email = $("#email").val();
    var resultado = '';
    $.ajax({
            // url:"http://localhost:8080/api/user/"+email,
            url:"http://155.248.195.17:8080/api/"+email,
            data:JSON.stringify(email),
            Accept : "application/json",
            contentType: "application/json",
            type:"GET",
            Headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Request-Headers": "*"
            },
            dataType:"JSON",
            success: function(response){            
               if (response === true) {
                  alert("correo ya existe");
                  $("#email").val("");
               }else{
                  saveUser();
               }
            },
            error: function (xhr, status) {
                console.log(xhr.responseText);
            }
        })    
}

$(function() {

    $("#name_error_message").hide();
    $("#email_error_message").hide();
    $("#password_error_message").hide();
    $("#retype_password_error_message").hide();

    var error_name = false;
    var error_email = false;
    var error_password = false;
    var error_retype_password = false;

    $("#name").focusout(function(){
       check_name();
    });
    $("#email").focusout(function() {
       check_email();
    });
    $("#password").focusout(function() {
       check_password();
    });
    $("#retype_password").focusout(function() {
       check_retype_password();
    });

    function check_name() {
       var pattern = /^[a-zA-Z]*$/;
       var name = $("#name").val();
       if (pattern.test(name) && name !== '') {
          $("#name_error_message").hide();
          $("#name").css("border-bottom","2px solid #34F458");
       } else {
          $("#name_error_message").html("El nombre no debe contener numeros");
          $("#name_error_message").show();
          $("#name").css("border-bottom","2px solid #F90A0A");
          error_name = true;
       }
    }

    function check_password() {
       var password_length = $("#password").val().length;
       if (password_length < 8) {
          $("#password_error_message").html("Minimo 8 caracteres");
          $("#password_error_message").show();
          $("#password").css("border-bottom","2px solid #F90A0A");
          error_password = true;
       } else {
          $("#password_error_message").hide();
          $("#password").css("border-bottom","2px solid #34F458");
       }
    }

    function check_retype_password() {
       var password = $("#password").val();
       var retype_password = $("#retype_password").val();
       if (password !== retype_password) {
          $("#retype_password_error_message").html("Las contraseñas no coinciden");
          $("#retype_password_error_message").show();
          $("#retype_password").css("border-bottom","2px solid #F90A0A");
          error_retype_password = true;
       } else {
          $("#retype_password_error_message").hide();
          $("#retype_password").css("border-bottom","2px solid #34F458");
       }
    }

    function check_email() {
       var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
       var email = $("#email").val();
       if (pattern.test(email) && email !== '') {
          $("#email_error_message").hide();
          $("#email").css("border-bottom","2px solid #34F458");

       } else {
          $("#email_error_message").html("El correo electronico no es valido");
          $("#email_error_message").show();
          $("#email").css("border-bottom","2px solid #F90A0A");
          error_email = true;
       }
    }
 


    $("#registration_form").submit(function() {
    

        error_name = false;
        error_email = false;
        error_password = false;
        error_retype_password = false;
        
        check_name();
        check_email();
        check_password();
        check_retype_password();
        getUserByEmail();

        if (error_name === false && error_email === false && error_password === false && error_retype_password === false) {
            getUserByEmail();
            //saveUser();
            location.reload();
            return true;

        } else {
            alert("Por favor llene bien los campos");
            return false;
        }

    });
 });


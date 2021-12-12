$(document).ready(function(){
    $("#email_error_message").hide();
    $("#password_error_message").hide();

    var error_email = false;
    var error_password = false;

    $("#email").focusout(function() {
       check_email();
    });
    $("#password").focusout(function() {
       check_password();
    });

    
})

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

 function getUserByEmailAndPassword() {
    
    $.ajax({
            // PRUEBAS LOCAL
            // url:"http://localhost:8080/api/user/"+$("#email").val()+"/"+$("#password").val(),
            // PRODUCCION
            url:"http://155.248.195.17:8080/api/user/"+$("#email").val()+"/"+$("#password").val(),
            Accept : "application/json",
            contentType: "application/json",
            type:"GET",
            Headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Request-Headers": "*"
            },

            success: function(response){            
                console.log(response);
                if(response.id == null || response === false)
                {
                    alert("Correo/Contraseña no existen");
                    
                }else{
                    error_email = false;
                    error_password = false;
                    check_email();
                    check_password();
                    if (error_email === false && error_password === false) {
                        alert("Ingreso exitoso");
                        return true;
                        location.reload();
                    } else {
                        alert("Verifique que haya llenado bien los campos");
                        return false;
                        location.reload();
                    }
                    alert("Ingreso Exitoso");

                }
            },
            error: function (xhr, status) {
                console.log(xhr.responseText);
            }
        })    
}
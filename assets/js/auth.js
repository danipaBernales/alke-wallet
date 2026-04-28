$(document).ready(function(){

    $("#loginForm").submit(function(e){

        e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        if(
            email === "admin@alkewallet.com"
            &&
            password === "1234"
        ){

            sessionStorage.setItem(
                "loggedUser",
                email
            );

            $("#alert-container").html(`
                <div class="alert alert-success">
                    Inicio de sesión exitoso
                </div>
            `);

            setTimeout(()=>{
                window.location.href = "menu.html";
            },1500);

        }else{

            $("#alert-container").html(`
                <div class="alert alert-danger">
                    Credenciales incorrectas
                </div>
            `);

        }

    });

});

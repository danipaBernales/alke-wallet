$(document).ready(function(){

    let contacts = JSON.parse(
        localStorage.getItem("contacts")
    ) || [];

    function renderContacts(list){

        $("#contactList").empty();

        list.forEach((contact,index)=>{

            $("#contactList").append(`
                <li
                    class="list-group-item"
                    data-id="${index}"
                >
                    ${contact.nombre}
                    -
                    ${contact.alias}
                </li>
            `);

        });

    }

    renderContacts(contacts);

    // MOSTRAR FORM

    $("#showFormBtn").click(()=>{
        $("#contactForm").slideDown();
    });

    $("#cancelBtn").click(()=>{
        $("#contactForm").slideUp();
    });

    // GUARDAR CONTACTO

    $("#saveContact").click(function(){

        let nombre = $("#name").val();
        let cbu = $("#cbu").val();

        if(
            nombre === ""
            ||
            cbu.length !== 22
        ){
            alert("Datos inválidos");
            return;
        }

        contacts.push({
            nombre:nombre,
            cbu:cbu,
            alias:$("#alias").val(),
            banco:$("#bank").val()
        });

        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );

        renderContacts(contacts);

        $("#contactForm").slideUp();

    });

    // BUSCADOR

    $("#searchContact").keyup(function(){

        let search = $(this)
            .val()
            .toLowerCase();

        let filtered = contacts.filter(c =>
            c.nombre.toLowerCase().includes(search)
            ||
            c.alias.toLowerCase().includes(search)
        );

        renderContacts(filtered);

    });

    // SELECCIONAR CONTACTO

    $("#contactList").on("click","li",function(){

        $("#contactList li")
            .removeClass("contact-selected");

        $(this).addClass("contact-selected");

        $("#sendMoneyBtn").fadeIn();

    });

    // ENVIAR DINERO

    $("#sendMoneyBtn").click(function(){

        let amount = Number(
            $("#sendAmount").val()
        );

        let balance = Number(
            localStorage.getItem("saldo")
        );

        if(
            amount <= 0
            ||
            amount > balance
        ){
            alert("Saldo insuficiente");
            return;
        }

        balance -= amount;

        localStorage.setItem(
            "saldo",
            balance
        );

        let transactions = JSON.parse(
            localStorage.getItem("transactions")
        );

        transactions.push({
            tipo:"transferencia",
            monto:amount,
            fecha:new Date().toLocaleString()
        });

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );

        $("#messageContainer").html(`
            <div class="alert alert-success">
                Transferencia realizada correctamente
            </div>
        `);

        setTimeout(()=>{
            window.location.href = "menu.html";
        },2000);

    });

});

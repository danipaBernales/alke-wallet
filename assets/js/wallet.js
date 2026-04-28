$(document).ready(function(){

    $("#saldo").text(
        formatCurrency(
            localStorage.getItem("saldo")
        )
    );

    $("#currentBalance").text(
        formatCurrency(
            localStorage.getItem("saldo")
        )
    );

    // MENÚ

    $("#depositBtn").click(function(){

        if($("#depositAmount").length){

            // DEPÓSITO

            let amount = Number(
                $("#depositAmount").val()
            );

            if(amount <= 0){
                alert("Ingrese un monto válido");
                return;
            }

            let balance = Number(
                localStorage.getItem("saldo")
            );

            balance += amount;

            localStorage.setItem(
                "saldo",
                balance
            );

            let transactions = JSON.parse(
                localStorage.getItem("transactions")
            );

            transactions.push({
                tipo:"deposito",
                monto:amount,
                fecha:new Date().toLocaleString()
            });

            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );

            $("#depositLegend").text(
                `Has depositado $${formatCurrency(amount)}`
            );

            $("#alert-container").html(`
                <div class="alert alert-success">
                    Depósito realizado correctamente
                </div>
            `);

            setTimeout(()=>{
                window.location.href = "menu.html";
            },2000);

        }else{

            $("#messageBox").html(`
                <div class="alert alert-info">
                    Redirigiendo a depósito...
                </div>
            `);

            setTimeout(()=>{
                window.location.href = "deposit.html";
            },1000);

        }

    });

    $("#sendBtn").click(function(){

        $("#messageBox").html(`
            <div class="alert alert-warning">
                Redirigiendo a enviar dinero...
            </div>
        `);

        setTimeout(()=>{
            window.location.href = "sendmoney.html";
        },1000);

    });

    $("#movBtn").click(function(){

        $("#messageBox").html(`
            <div class="alert alert-info">
                Redirigiendo a movimientos...
            </div>
        `);

        setTimeout(()=>{
            window.location.href = "transactions.html";
        },1000);

    });

});

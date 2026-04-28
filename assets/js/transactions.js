$(document).ready(function(){

    const transactions = JSON.parse(
        localStorage.getItem("transactions")
    ) || [];

    function renderTransactions(filter){

        $("#transactionsList").empty();

        transactions.forEach(transaction=>{

            if(
                filter === "all"
                ||
                transaction.tipo === filter
            ){

                $("#transactionsList").append(`
                    <li class="list-group-item transaction-item">

                        <strong>
                            ${transaction.tipo.toUpperCase()}
                        </strong>

                        <br>

                        Monto:
                        $${formatCurrency(transaction.monto)}

                        <br>

                        Fecha:
                        ${transaction.fecha}

                    </li>
                `);

            }

        });

    }

    renderTransactions("all");

    $("#filterTransactions").change(function(){

        renderTransactions(
            $(this).val()
        );

    });

});

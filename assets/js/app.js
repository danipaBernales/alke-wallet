$(document).ready(function () {

    // DATOS INICIALES

    if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", 100000);
    }

    if (!localStorage.getItem("transactions")) {
        localStorage.setItem("transactions", JSON.stringify([]));
    }

    if (!localStorage.getItem("contacts")) {
        localStorage.setItem("contacts", JSON.stringify([]));
    }

    // FORMATEAR MONEDA

    window.formatCurrency = function (amount) {
        return Number(amount).toLocaleString("es-CL");
    };

    // VALIDAR SESIÓN

    const currentPage = window.location.pathname;

    if (!currentPage.includes("login.html")) {

        const loggedUser = sessionStorage.getItem("loggedUser");

        if (!loggedUser) {
            window.location.href = "../pages/login.html";
        }

    }

    // LOGOUT

    $("#logoutBtn").click(function () {

        sessionStorage.removeItem("loggedUser");

        window.location.href = "../pages/login.html";

    });

});

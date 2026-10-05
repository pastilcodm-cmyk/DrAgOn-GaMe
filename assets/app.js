document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       LOGIN STATE
    ========================= */

    const loggedIn =
        localStorage.getItem("dragonGameLoggedIn") === "true";

    const username =
        localStorage.getItem("dragonGameUsername") || "DrAgOn";

    const email =
        localStorage.getItem("dragonGameEmail") || "";


    /* =========================
       NAVIGATION
    ========================= */

    const accountLink =
        document.getElementById("accountLink");

    const loginLink =
        document.getElementById("loginLink");


    if (accountLink) {
        accountLink.style.display =
            loggedIn ? "flex" : "none";
    }

    if (loginLink) {
        loginLink.style.display =
            loggedIn ? "none" : "flex";
    }


    /* =========================
       ACTIVE PAGE
    ========================= */

    let currentPage =
        window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }


    document.querySelectorAll(".main-nav a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================
       USER DATA
    ========================= */

    document.querySelectorAll("[data-username]")
        .forEach(function (element) {
            element.textContent = username;
        });


    document.querySelectorAll("[data-email]")
        .forEach(function (element) {
            element.textContent =
                email || "ثبت نشده";
        });


    /* =========================
       LOGOUT
    ========================= */

    document.querySelectorAll("[data-logout]")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                localStorage.removeItem(
                    "dragonGameLoggedIn"
                );

                localStorage.removeItem(
                    "dragonGameUsername"
                );

                localStorage.removeItem(
                    "dragonGameEmail"
                );

                window.location.href =
                    "login.html";
            });

        });

});

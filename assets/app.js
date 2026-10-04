/* =================================
   DrAgOn GaMe - Main App
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Login State ---------- */

    const loggedIn =
        localStorage.getItem("dragonGameLoggedIn") === "true";

    const username =
        localStorage.getItem("dragonGameUsername") || "DrAgOn";

    const email =
        localStorage.getItem("dragonGameEmail") || "";


    /* ---------- Navigation ---------- */

    const accountLink = document.getElementById("accountLink");
    const loginLink = document.getElementById("loginLink");

    if (accountLink) {
        accountLink.style.display = loggedIn ? "inline-flex" : "none";
    }

    if (loginLink) {
        loginLink.style.display = loggedIn ? "none" : "inline-flex";
    }


    /* ---------- Active Page ---------- */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* ---------- User Information ---------- */

    document.querySelectorAll("[data-username]").forEach(element => {
        element.textContent = username;
    });

    document.querySelectorAll("[data-email]").forEach(element => {
        element.textContent = email || "ثبت نشده";
    });


    /* ---------- Floating Navigation Position ---------- */

    const nav = document.querySelector(".main-nav");

    if (!nav) return;

    const savedPosition =
        localStorage.getItem("dragonGameNavPosition");

    if (savedPosition) {

        try {

            const position = JSON.parse(savedPosition);

            const maxX =
                window.innerWidth - nav.offsetWidth - 8;

            const maxY =
                window.innerHeight - nav.offsetHeight - 8;

            const x = Math.max(
                8,
                Math.min(position.x, maxX)
            );

            const y = Math.max(
                8,
                Math.min(position.y, maxY)
            );

            nav.style.left = `${x}px`;
            nav.style.top = `${y}px`;
            nav.style.right = "auto";

        } catch (error) {

            console.log(
                "Navigation position could not be loaded."
            );

        }

    }


    /* ---------- Drag Navigation ---------- */

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;


    nav.addEventListener("pointerdown", event => {

        /*
         * اگر کاربر روی لینک کلیک کند،
         * لینک باید همچنان قابل استفاده باشد.
         */

        if (event.target.closest("a")) {
            return;
        }

        dragging = true;

        const rect = nav.getBoundingClientRect();

        startX = event.clientX;
        startY = event.clientY;

        startLeft = rect.left;
        startTop = rect.top;

        nav.setPointerCapture(event.pointerId);

        nav.style.cursor = "grabbing";
    });


    nav.addEventListener("pointermove", event => {

        if (!dragging) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        let newLeft = startLeft + dx;
        let newTop = startTop + dy;


        /* ---------- Keep Inside Screen ---------- */

        const maxLeft =
            window.innerWidth - nav.offsetWidth - 8;

        const maxTop =
            window.innerHeight - nav.offsetHeight - 8;


        newLeft = Math.max(
            8,
            Math.min(newLeft, maxLeft)
        );

        newTop = Math.max(
            8,
            Math.min(newTop, maxTop)
        );


        nav.style.left = `${newLeft}px`;
        nav.style.top = `${newTop}px`;
        nav.style.right = "auto";
    });


    nav.addEventListener("pointerup", event => {

        if (!dragging) return;

        dragging = false;

        nav.style.cursor = "";

        try {
            nav.releasePointerCapture(event.pointerId);
        } catch (error) {}


        const rect = nav.getBoundingClientRect();

        localStorage.setItem(
            "dragonGameNavPosition",
            JSON.stringify({
                x: rect.left,
                y: rect.top
            })
        );
    });


    nav.addEventListener("pointercancel", () => {

        dragging = false;
        nav.style.cursor = "";

    });


    /* ---------- Keep Navigation Inside Screen ---------- */

    window.addEventListener("resize", () => {

        const rect = nav.getBoundingClientRect();

        const maxLeft =
            window.innerWidth - nav.offsetWidth - 8;

        const maxTop =
            window.innerHeight - nav.offsetHeight - 8;

        const left = Math.max(
            8,
            Math.min(rect.left, maxLeft)
        );

        const top = Math.max(
            8,
            Math.min(rect.top, maxTop)
        );

        nav.style.left = `${left}px`;
        nav.style.top = `${top}px`;
        nav.style.right = "auto";

    });

});

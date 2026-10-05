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
       ALL PAGES
    ========================= */

    const pages = [
        {
            href: "index.html",
            icon: "🏠",
            text: "خانه"
        },
        {
            href: "account.html",
            icon: "👤",
            text: "اکانت من",
            account: true
        },
        {
            href: "players.html",
            icon: "👥",
            text: "بازیکنان"
        },
        {
            href: "rankings.html",
            icon: "🏆",
            text: "رتبه‌بندی"
        },
        {
            href: "server.html",
            icon: "🎮",
            text: "اتصال"
        },
        {
            href: "shop.html",
            icon: "🛒",
            text: "فروشگاه"
        }
    ];

    const morePages = [
        ["player.html", "👤", "پروفایل بازیکن"],
        ["news.html", "📰", "اخبار"],
        ["events.html", "🎯", "رویدادها"],
        ["wiki.html", "📚", "ویکی"],
        ["rules.html", "📜", "قوانین"],
        ["guide.html", "❓", "راهنما"],
        ["notifications.html", "🔔", "اعلان‌ها"],
        ["ads.html", "📢", "تبلیغات"],
        ["forum.html", "💬", "فروم"],
        ["support.html", "🎫", "پشتیبانی"],
        ["downloads.html", "⬇️", "دانلود"],
        ["settings.html", "⚙️", "تنظیمات"],
        ["admin.html", "🛡️", "مدیریت"]
    ];


    /* =========================
       CURRENT PAGE
    ========================= */

    let currentPage =
        window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }


    /* =========================
       CREATE MENU
    ========================= */

    document.querySelectorAll(".main-nav").forEach(function (nav) {

        nav.innerHTML = "";

        /* Logo */
        const logo = document.createElement("div");
        logo.className = "dragon-logo";
        logo.innerHTML = "🐉 <span>DrAgOn</span>";
        nav.appendChild(logo);


        /* Main links */
        pages.forEach(function (page) {

            if (page.account && !loggedIn) {
                return;
            }

            const link = document.createElement("a");

            link.href = page.href;
            link.innerHTML =
                page.icon + " <span>" + page.text + "</span>";

            if (page.href === currentPage) {
                link.classList.add("active");
            }

            nav.appendChild(link);
        });


        /* Login */
        if (!loggedIn) {

            const login = document.createElement("a");

            login.href = "login.html";
            login.id = "loginLink";
            login.innerHTML = "🔐 <span>ورود</span>";

            if (currentPage === "login.html") {
                login.classList.add("active");
            }

            nav.appendChild(login);
        }


        /* More button */
        const moreButton = document.createElement("button");

        moreButton.className = "dragon-more-button";
        moreButton.type = "button";
        moreButton.innerHTML = "☰ <span>بیشتر</span>";

        nav.appendChild(moreButton);


        /* More menu */
        const moreMenu = document.createElement("div");

        moreMenu.className = "dragon-more-menu";

        morePages.forEach(function (item) {

            const link = document.createElement("a");

            link.href = item[0];
            link.innerHTML =
                item[1] + " <span>" + item[2] + "</span>";

            if (item[0] === currentPage) {
                link.classList.add("active");
            }

            moreMenu.appendChild(link);
        });

        nav.appendChild(moreMenu);


        /* Open / Close */
        moreButton.addEventListener("click", function (event) {

            event.stopPropagation();

            moreMenu.classList.toggle("show");
        });


        document.addEventListener("click", function () {
            moreMenu.classList.remove("show");
        });

    });


    /* =========================
       USERNAME
    ========================= */

    document.querySelectorAll("[data-username]")
        .forEach(function (element) {

            element.textContent = username;

        });


    /* =========================
       EMAIL
    ========================= */

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

                window.location.href = "login.html";

            });

        });


    /* =========================
       MENU STYLE
    ========================= */

    if (!document.getElementById("dragon-menu-style")) {

        const style = document.createElement("style");

        style.id = "dragon-menu-style";

        style.textContent = `

        .main-nav {
            position: fixed !important;
            top: 10px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;

            width: max-content;
            max-width: calc(100vw - 16px);

            display: flex !important;
            align-items: center;
            gap: 5px;

            padding: 7px;

            z-index: 99999;

            overflow: visible !important;

            background: rgba(3,10,6,.96);

            border: 1px solid rgba(0,255,102,.35);

            border-radius: 18px;

            box-shadow:
                0 12px 35px rgba(0,0,0,.55),
                0 0 25px rgba(0,255,102,.08);

            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }


        .main-nav a,
        .dragon-more-button {

            color: #fff;

            text-decoration: none;

            border: 0;

            background: transparent;

            padding: 9px 11px;

            border-radius: 12px;

            font-family: inherit;

            font-size: 14px;

            white-space: nowrap;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .main-nav a:hover,
        .dragon-more-button:hover {

            background: rgba(0,255,102,.12);

            color: #00ff66;

        }


        .main-nav a.active {

            background: rgba(0,255,102,.16);

            color: #00ff66;

            box-shadow:
                0 0 12px rgba(0,255,102,.08);

        }


        .dragon-logo {

            display: flex;

            align-items: center;

            gap: 5px;

            padding: 8px 10px;

            color: #00ff66;

            font-weight: 800;

            white-space: nowrap;

        }


        .dragon-logo span {

            color: #fff;

        }


        .dragon-more-button {

            border: 1px solid rgba(0,255,102,.2);

        }


        .dragon-more-menu {

            position: absolute;

            top: calc(100% + 8px);

            right: 0;

            width: 300px;

            max-width: calc(100vw - 20px);

            max-height: 70vh;

            overflow-y: auto;

            display: none;

            grid-template-columns: 1fr 1fr;

            gap: 5px;

            padding: 9px;

            background: rgba(3,10,6,.98);

            border: 1px solid rgba(0,255,102,.35);

            border-radius: 16px;

            box-shadow:
                0 18px 45px rgba(0,0,0,.65);

            backdrop-filter: blur(18px);

            -webkit-backdrop-filter: blur(18px);

        }


        .dragon-more-menu.show {

            display: grid;

        }


        .dragon-more-menu a {

            display: flex;

            align-items: center;

            gap: 7px;

            padding: 10px;

        }


        @media (max-width: 800px) {

            .main-nav {

                width: calc(100vw - 16px);

                max-width: calc(100vw - 16px);

                justify-content: flex-start;

                top: 8px !important;

            }


            .main-nav a,
            .dragon-more-button {

                padding: 8px 9px;

                font-size: 13px;

            }


            .dragon-logo span {

                display: none;

            }


            .dragon-more-menu {

                right: 0;

                width: 300px;

                max-width: calc(100vw - 20px);

            }

        }


        @media (max-width: 500px) {

            .main-nav {

                gap: 2px;

            }


            .main-nav a span {

                display: none;

            }


            .dragon-more-button span {

                display: none;

            }


            .dragon-more-menu {

                grid-template-columns: 1fr 1fr;

            }


            .dragon-more-menu a span {

                display: inline;

            }

        }

        `;

        document.head.appendChild(style);

    }

});

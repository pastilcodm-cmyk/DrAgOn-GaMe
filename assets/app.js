document.addEventListener("DOMContentLoaded", () => {

    const loggedIn =
        localStorage.getItem("dragonGameLoggedIn") === "true";

    const username =
        localStorage.getItem("dragonGameUsername") || "DrAgOn";

    const email =
        localStorage.getItem("dragonGameEmail") || "";

    let currentPage =
        location.pathname.split("/").pop() || "index.html";


    /* =========================
       MENU
    ========================= */

    const mainLinks = [
        ["index.html", "🏠", "خانه"],
        ["account.html", "👤", "اکانت من"],
        ["players.html", "👥", "بازیکنان"],
        ["rankings.html", "🏆", "رتبه‌بندی"],
        ["server.html", "🎮", "اتصال"],
        ["shop.html", "🛒", "فروشگاه"]
    ];

    const moreLinks = [
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
       REMOVE OLD MENUS
    ========================= */

    document.querySelectorAll(".main-nav").forEach(nav => {

        nav.innerHTML = "";

        /* Logo */
        const logo = document.createElement("div");

        logo.className = "dragon-menu-logo";

        logo.innerHTML = `
            🐉 <span>DrAgOn</span>
        `;

        nav.appendChild(logo);


        /* Main links */
        mainLinks.forEach(item => {

            const [href, icon, text] = item;

            if (href === "account.html" && !loggedIn) {
                return;
            }

            const link = document.createElement("a");

            link.href = href;

            link.innerHTML = `
                ${icon}
                <span>${text}</span>
            `;

            if (href === currentPage) {
                link.classList.add("dragon-active");
            }

            nav.appendChild(link);
        });


        /* Login */
        if (!loggedIn) {

            const login = document.createElement("a");

            login.href = "login.html";

            login.innerHTML = `
                🔐 <span>ورود</span>
            `;

            if (currentPage === "login.html") {
                login.classList.add("dragon-active");
            }

            nav.appendChild(login);
        }


        /* More */
        const moreButton = document.createElement("button");

        moreButton.type = "button";

        moreButton.className = "dragon-more";

        moreButton.innerHTML = `
            ☰ <span>بیشتر</span>
        `;

        nav.appendChild(moreButton);


        /* More panel */
        const panel = document.createElement("div");

        panel.className = "dragon-more-panel";


        moreLinks.forEach(item => {

            const [href, icon, text] = item;

            const link = document.createElement("a");

            link.href = href;

            link.innerHTML = `
                ${icon}
                <span>${text}</span>
            `;

            if (href === currentPage) {
                link.classList.add("dragon-active");
            }

            panel.appendChild(link);
        });


        nav.appendChild(panel);


        /* Button */
        moreButton.addEventListener("click", event => {

            event.stopPropagation();

            panel.classList.toggle("dragon-show");

        });


        panel.addEventListener("click", event => {
            event.stopPropagation();
        });

    });


    /* Close menu */
    document.addEventListener("click", () => {

        document
            .querySelectorAll(".dragon-more-panel")
            .forEach(panel => {

                panel.classList.remove("dragon-show");

            });

    });


    /* =========================
       USER DATA
    ========================= */

    document
        .querySelectorAll("[data-username]")
        .forEach(element => {

            element.textContent = username;

        });


    document
        .querySelectorAll("[data-email]")
        .forEach(element => {

            element.textContent =
                email || "ثبت نشده";

        });


    /* =========================
       LOGOUT
    ========================= */

    document
        .querySelectorAll("[data-logout]")
        .forEach(button => {

            button.addEventListener("click", () => {

                localStorage.removeItem("dragonGameLoggedIn");
                localStorage.removeItem("dragonGameUsername");
                localStorage.removeItem("dragonGameEmail");

                location.href = "login.html";

            });

        });


    /* =========================
       MENU CSS
    ========================= */

    const style = document.createElement("style");

    style.innerHTML = `

        .main-nav {
            position: fixed !important;
            top: 10px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;

            z-index: 999999 !important;

            display: flex !important;
            align-items: center !important;

            width: max-content !important;
            max-width: calc(100vw - 16px) !important;

            padding: 7px !important;
            gap: 4px !important;

            background: rgba(3,10,6,.97) !important;

            border: 1px solid rgba(0,255,102,.35) !important;
            border-radius: 18px !important;

            box-shadow:
                0 12px 40px rgba(0,0,0,.6),
                0 0 25px rgba(0,255,102,.1) !important;

            overflow: visible !important;
        }


        .dragon-menu-logo {
            padding: 8px 10px;
            color: #00ff66;
            font-weight: 900;
            white-space: nowrap;
        }


        .dragon-menu-logo span {
            color: white;
        }


        .main-nav a,
        .dragon-more {

            display: flex !important;
            align-items: center;
            justify-content: center;

            gap: 5px;

            padding: 9px 11px !important;

            border: 0 !important;
            border-radius: 12px !important;

            background: transparent !important;

            color: white !important;

            text-decoration: none !important;

            font-family: inherit;

            font-size: 14px;

            white-space: nowrap;

            cursor: pointer;

            transition: .2s ease;
        }


        .main-nav a:hover,
        .dragon-more:hover {

            background: rgba(0,255,102,.13) !important;

            color: #00ff66 !important;
        }


        .main-nav a.dragon-active {

            background: rgba(0,255,102,.16) !important;

            color: #00ff66 !important;
        }


        .dragon-more {

            border: 1px solid rgba(0,255,102,.25) !important;
        }


        .dragon-more-panel {

            position: absolute !important;

            top: calc(100% + 9px) !important;
            right: 0 !important;

            width: 310px !important;
            max-width: calc(100vw - 20px) !important;

            max-height: 70vh !important;

            overflow-y: auto !important;

            display: none !important;

            grid-template-columns: 1fr 1fr;

            gap: 5px;

            padding: 9px;

            background: rgba(3,10,6,.99) !important;

            border: 1px solid rgba(0,255,102,.35) !important;

            border-radius: 17px !important;

            box-shadow:
                0 20px 50px rgba(0,0,0,.7) !important;

            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }


        .dragon-more-panel.dragon-show {

            display: grid !important;
        }


        .dragon-more-panel a {

            display: flex !important;

            align-items: center;

            justify-content: flex-start;

            padding: 11px !important;

            border-radius: 11px !important;
        }


        @media(max-width:800px) {

            .main-nav {

                width: calc(100vw - 12px) !important;

                max-width: calc(100vw - 12px) !important;

                top: 7px !important;

            }


            .main-nav a,
            .dragon-more {

                padding: 8px !important;

                font-size: 13px;
            }


            .dragon-menu-logo span {

                display: none;
            }

        }


        @media(max-width:500px) {

            .main-nav a span,
            .dragon-more span {

                display: none;
            }


            .dragon-more-panel {

                width: 300px !important;

                max-width: calc(100vw - 16px) !important;

                grid-template-columns: 1fr 1fr;
            }


            .dragon-more-panel a span {

                display: inline !important;
            }

        }

    `;

    document.head.appendChild(style);

});

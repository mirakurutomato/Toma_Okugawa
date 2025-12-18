
(function () {
    const navLinks = document.querySelectorAll('.page-nav a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", href);
        });
    });

    const sections = Array.from(navLinks)
        .map((link) => {
            const id = link.getAttribute("href");
            if (!id) return null;
            const el = document.querySelector(id);
            return el ? { id, el, link } : null;
        })
        .filter(Boolean);

    function onScroll() {
        const offset = 80;
        const y = window.scrollY + offset;

        let current = null;
        for (const s of sections) {
            const top = s.el.offsetTop;
            if (top <= y) current = s;
            else break;
        }

        navLinks.forEach((l) => l.classList.remove("is-active"));
        if (current && current.link) {
            current.link.classList.add("is-active");
        }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
})();

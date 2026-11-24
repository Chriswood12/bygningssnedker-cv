(() => {
  // Mobilmenu
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("is-open", !expanded);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  // Udskriv / Gem som PDF
  const printButtons = [
    document.getElementById("header-print-btn"),
    document.getElementById("hero-print-btn"),
    document.getElementById("footer-print-btn"),
  ];

  printButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => window.print());
    }
  });

  // Kopiér telefon og e-mail med diskret feedback
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      const label = btn.getAttribute("data-copy-label") || "Kopieret";
      let copied = false;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
      } else {
        copied = fallbackCopy(text);
      }

      showToast(copied ? label : "Kunne ikke kopiere automatisk");
    });
  });

  // Aktivt menupunkt under scroll
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navItems = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

  if ("IntersectionObserver" in window && sections.length && navItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeHref = `#${entry.target.id}`;
          navItems.forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === activeHref);
          });
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }

  // Lightbox til værksteds- og montagebilleder
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  let lastTrigger = null;

  function openLightbox(trigger) {
    if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxCaption) return;
    lastTrigger = trigger;
    const src = trigger.getAttribute("data-src") || "";
    const title = trigger.getAttribute("data-title") || "";
    const caption = trigger.getAttribute("data-caption") || "";

    lightboxImg.src = src;
    lightboxImg.alt = caption || title;
    lightboxTitle.textContent = title;
    lightboxCaption.textContent = caption;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImg) {
      lightboxImg.removeAttribute("src");
    }
    document.body.style.overflow = "";
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.querySelectorAll("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();

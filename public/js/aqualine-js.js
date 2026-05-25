(function () {
  "use strict";
  const header = document.querySelector("header");
  if (header) {
    const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const REVEAL_SELECTORS = [
    ".feature-card",
    ".service-card",
    ".product-card",
    ".about-content",
    ".about-image",
    ".contact-item",
    ".catalog-header",
    ".catalog-tabs",
  ];

  function attachReveal() {
    REVEAL_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains("aq-reveal")) {
          el.classList.add("aq-reveal");
        }
      });
    });

    [".feature-card", ".service-card"].forEach((sel) => {
      const parents = new Set(
        [...document.querySelectorAll(sel)].map((el) => el.parentElement),
      );
      parents.forEach((p) => p && p.classList.add("aq-stagger"));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".aq-reveal").forEach((el) => io.observe(el));
  }

  function patchRenderProducts() {
    const orig = window.renderProducts;
    if (typeof orig !== "function") return;
    window.renderProducts = function (...args) {
      orig.apply(this, args);
      // Let the DOM settle, then re-attach
      requestAnimationFrame(() => {
        attachReveal();
      });
    };
  }

  /* water drop cursor ripple*/
  function spawnRipple(x, y) {
    const dot = document.createElement("div");
    dot.className = "aq-ripple-dot";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    document.body.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  }

  const RIPPLE_TARGETS =
    ".btn-order, .btn-service, .nav-btn, .qty-btn, .tab, .checkout-btn, .service-card, .product-card";

  document.addEventListener("click", (e) => {
    if (e.target.closest(RIPPLE_TARGETS)) {
      spawnRipple(e.clientX, e.clientY);
    }
  });

  /* smooth counter in feature section */
  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = current + (el.dataset.suffix || "");
              if (current >= target) clearInterval(interval);
            }, 30);
          });
        },
        { threshold: 0.5 },
      );
      io.observe(el);
    });
  }

  /* catalog loading thing */
  function patchSkeleton() {
    const orig = window.renderProducts;
    if (typeof orig !== "function") return;
    window.renderProducts = function (...args) {
      const grid = document.querySelector(".carousel-container .products-grid");
      if (grid) {
        grid.innerHTML = `
          <div class="product-card" style="pointer-events:none; opacity:0.55">
            <div class="product-img aq-skeleton" style="height:200px;"></div>
            <div class="product-body">
              <div class="aq-skeleton" style="height:16px; width:60%; margin-bottom:8px; border-radius:6px;"></div>
              <div class="aq-skeleton" style="height:12px; width:40%; margin-bottom:20px; border-radius:6px;"></div>
              <div class="aq-skeleton" style="height:12px; width:80%; border-radius:6px;"></div>
            </div>
          </div>
          <div class="product-card" style="pointer-events:none; opacity:0.55">
            <div class="product-img aq-skeleton" style="height:200px;"></div>
            <div class="product-body">
              <div class="aq-skeleton" style="height:16px; width:60%; margin-bottom:8px; border-radius:6px;"></div>
              <div class="aq-skeleton" style="height:12px; width:40%; margin-bottom:20px; border-radius:6px;"></div>
              <div class="aq-skeleton" style="height:12px; width:80%; border-radius:6px;"></div>
            </div>
          </div>
        `;
      }
      setTimeout(() => orig.apply(this, args), 220);
    };
  }
  /* checkout */
  function patchCheckoutA11y() {
    const orig = window.openCheckoutModal;
    if (typeof orig !== "function") return;
    window.openCheckoutModal = function (...args) {
      orig.apply(this, args);
      requestAnimationFrame(() => {
        const first = document.querySelector(".checkout-content input");
        if (first) first.focus();
      });
    };
  }

  /* admin */
  function patchAdminA11y() {
    const orig = window.openAdminModal;
    if (typeof orig !== "function") return;
    window.openAdminModal = function (...args) {
      orig.apply(this, args);
      requestAnimationFrame(() => {
        const first = document.querySelector("#loginModal .input-group input");
        if (first) first.focus();
      });
    };
  }

  function enhanceAdminModal() {
    const modal = document.getElementById("loginModal");
    if (!modal) return;
    /* open animation */
    const origOpen = window.openAdminModal;
    if (typeof origOpen === "function") {
      window.openAdminModal = function (...args) {
        modal.classList.add("active");

        origOpen.apply(this, args);

        requestAnimationFrame(() => {
          const firstInput = modal.querySelector("input");
          if (firstInput) firstInput.focus();
        });
      };
    }
    /* close animation */
    const origClose = window.closeAdminModal;
    if (typeof origClose === "function") {
      window.closeAdminModal = function (...args) {
        modal.classList.remove("active");
        origClose.apply(this, args);
      };
    }
    /* ESC key closes modal */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("active");
      }
    });
  }

  /* cart panel */
  function updateCartBadge() {
    const btn = document.querySelector('[onclick*="openAndRenderCart"]');
    if (!btn) return;

    const count = Object.values(window.cart || {}).reduce(
      (acc, qty) => acc + qty,
      0,
    );

    let badge = btn.querySelector(".aq-cart-badge");
    if (count > 0) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "aq-cart-badge";
        badge.style.cssText = `
        display: inline-block;
        background: #ff3b3b;
        color: #fff;
        border-radius: 50%;
        font-size: 0.7rem;
        font-weight: 700;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        margin-left: 6px;
        vertical-align: middle;
        animation: aq-pop 0.25s cubic-bezier(0.4,0,0.2,1);
      `;
        btn.appendChild(badge);
      }
      badge.textContent = count > 99 ? "99+" : count;
    } else if (badge) {
      badge.remove();
    }
  }

  window.updateCartBadge = updateCartBadge;

  const styleTag = document.createElement("style");
  styleTag.textContent = `
    @keyframes aq-pop {
      0%   { transform: scale(0); }
      70%  { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(styleTag);

  ["addItemQty", "subtItemQty", "updateItemQty", "removeEntireItem"].forEach(
    (fn) => {
      const orig = window[fn];
      if (typeof orig !== "function") return;
      window[fn] = function (...args) {
        orig.apply(this, args);
        updateCartBadge();
      };
    },
  );

  function init() {
    attachReveal();
    patchRenderProducts();
    patchSkeleton();
    patchCheckoutA11y();
    patchAdminA11y();
    animateCounters();
    updateCartBadge();
    enhanceAdminModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* toast notif sys */
window.showToast = function (message, type = "info", duration = 2800) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `aq-toast ${type}`;

  let icon = "fa-circle-info";

  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-circle-xmark";

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="toast-text">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");

    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, duration);
};

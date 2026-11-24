const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Improve keyboard and navigation behaviour without requiring a backend.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation && menuButton) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  observedSections.forEach((section) => sectionObserver.observe(section));
}


// Share the station using the device's native share sheet, with a copy fallback.
const shareButton = document.querySelector("#share-station");
const shareStatus = document.querySelector("#share-status");
if (shareButton && shareStatus) {
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: "RF983 RADIO — Your World. Your Sound.",
      text: "Discover RF983 RADIO: Malayalam news and multilingual music.",
      url: window.location.origin + window.location.pathname
    };
    shareButton.disabled = true;
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        shareStatus.textContent = "Thanks for sharing RF983 RADIO.";
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        shareStatus.textContent = "Website link copied. Share it with someone!";
      } else {
        shareStatus.textContent = "Copy this link to share: " + shareData.url;
      }
    } catch (error) {
      if (error && error.name !== "AbortError") {
        shareStatus.textContent = "You can share RF983 RADIO using this link: " + shareData.url;
      }
    } finally {
      shareButton.disabled = false;
    }
  });
}

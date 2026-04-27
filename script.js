const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const galleryButtons = document.querySelectorAll("[data-gallery-index]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const galleryImages = [
  "./assets/SHD_0016.jpg",
  "./assets/SHD_0029.jpg",
  "./assets/SHD_0035.jpg",
  "./assets/SHD_0048.jpg",
  "./assets/SHD_0052.jpg",
  "./assets/SHD_0069.jpg",
  "./assets/SHD_0091.jpg",
];
let currentGalleryIndex = 0;

function syncHeader() {
  header.classList.toggle("scrolled", window.scrollY > 16);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

function showGalleryImage(index) {
  currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentGalleryIndex];
  lightboxImage.alt = `Still from The Greatest Joy in the World ${currentGalleryIndex + 1}`;
}

function openLightbox(index) {
  showGalleryImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.dataset.galleryIndex));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
lightboxNext.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
});

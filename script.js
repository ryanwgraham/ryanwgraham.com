// ── Gallery Rendering ──
const gallery = document.getElementById("gallery");

PHOTOS.forEach((photo, i) => {
  const item = document.createElement("div");
  item.className = "masonry-item";
  item.innerHTML = `
    <img src="${photo.src}" alt="${photo.alt || ""}" loading="lazy">
    ${photo.caption ? `<span class="photo-caption">${photo.caption}</span>` : ""}
  `;
  item.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(item);
});

// ── Lightbox ──
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const photo = PHOTOS[currentIndex];
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.alt || "";
  lightboxCaption.textContent = photo.caption || "";
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + PHOTOS.length) % PHOTOS.length;
  updateLightbox();
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => navigate(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => navigate(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

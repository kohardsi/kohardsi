// Simpan hasil fetch untuk caching
let cachedImages = null;

// Fungsi untuk mengambil gambar dari API
async function fetchImages() {
  if (cachedImages) {
    console.log("Using cached images");
    return cachedImages;
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/kohardsi/kohardsi.github.io/contents/undangan/plugins/gallery"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      // Filter file gambar dan simpan URL untuk digunakan
      cachedImages = data
        .filter(item => item.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(item.name))
        .map(item => item.download_url);
      console.log("Filtered images:", cachedImages);
      return cachedImages;
    } else {
      console.error("Expected data to be an array but got:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Fungsi untuk membuat galeri dari daftar gambar
async function createGallery() {
  const images = await fetchImages();
  console.log("Images fetched:", images);

  if (!Array.isArray(images) || images.length === 0) {
    console.error("Expected images to be an array but got:", images);
    return;
  }

  // Referensi ke elemen container
  const container = document.getElementById("image-container");
  if (!container) {
    console.error("Container element not found");
    return;
  }

  // Hapus konten sebelumnya
  container.innerHTML = "";

  // Gunakan document fragment untuk batch rendering
  const fragment = document.createDocumentFragment();

  images.forEach(src => {
    const anchor = document.createElement("a");
    anchor.className = "e-gallery-item elementor-gallery-item elementor-animated-content";
    anchor.href = src;
    anchor.setAttribute("data-elementor-open-lightbox", "yes");
    anchor.setAttribute("data-elementor-lightbox-slideshow", "4eda712c");

    const divImage = document.createElement("div");
    divImage.className = "e-gallery-image elementor-gallery-item__image rounded overflow-hidden";
    divImage.setAttribute("data-thumbnail", src);

    const overlay = document.createElement("div");
    overlay.className = "elementor-gallery-item__overlay";

    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy"; // Lazy load gambar

    divImage.appendChild(img);
    divImage.appendChild(overlay);
    anchor.appendChild(divImage);
    fragment.appendChild(anchor);
  });

  // Tambahkan semua elemen sekaligus ke container
  container.appendChild(fragment);
  console.log("Gallery created with images.");
}

// Inisialisasi galeri
createGallery();

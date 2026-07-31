// ========================================
// HIMWAL Universal Gallery Loader & Lightbox
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    // Read configuration from HTML attributes
    const folder = gallery.dataset.folder || "Images/millet";
    const total = parseInt(gallery.dataset.total, 10) || 0;
    const prefix = gallery.dataset.prefix !== undefined ? gallery.dataset.prefix : "";
    const ext = gallery.dataset.ext || "webp";
    
    const itemsPerPage = 16;
    let currentPage = 1;
    const totalPages = Math.ceil(total / itemsPerPage);

    // Format number to 3-digit padding (e.g., 001, 009, 010, 020)
    function getImgPath(index) {
        const paddedIndex = String(index).padStart(3, '0');
        return `${folder}/${prefix}${paddedIndex}.${ext}`;
    }

    // Create container for pagination controls below grid
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-controls";
    gallery.after(paginationContainer);

    // 1. Render Gallery Page
    function renderPage(page) {
        gallery.innerHTML = ""; // Clear existing images
        currentPage = page;

        const start = (page - 1) * itemsPerPage + 1;
        const end = Math.min(page * itemsPerPage, total);

        for (let i = start; i <= end; i++) {
            const img = document.createElement("img");
            img.src = getImgPath(i);
            img.alt = `Gallery Image ${i}`;
            img.loading = "lazy";
            
            // Image click event for Lightbox
            img.addEventListener("click", () => {
                openImage(i);
            });

            gallery.appendChild(img);
        }

        renderPaginationControls();
    }

    // 2. Render Pagination Buttons
    function renderPaginationControls() {
        if (totalPages <= 1) {
            paginationContainer.innerHTML = "";
            return;
        }

        paginationContainer.innerHTML = `
            <button class="pagination-btn" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>&larr; Previous</button>
            <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
            <button class="pagination-btn" id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Next &rarr;</button>
        `;

        document.getElementById("prev-page")?.addEventListener("click", () => {
            if (currentPage > 1) {
                renderPage(currentPage - 1);
                gallery.scrollIntoView({ behavior: 'smooth' });
            }
        });

        document.getElementById("next-page")?.addEventListener("click", () => {
            if (currentPage < totalPages) {
                renderPage(currentPage + 1);
                gallery.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 3. Lightbox Setup & Controls
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    let currentImage = 1;

    function showImage(index) {
        currentImage = index;
        lightboxImg.src = getImgPath(currentImage);
    }

    function openImage(index) {
        showImage(index);
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeImage() {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    }

    function nextImage() {
        const nextIndex = currentImage >= total ? 1 : currentImage + 1;
        showImage(nextIndex);
    }

    function prevImage() {
        const prevIndex = currentImage <= 1 ? total : currentImage - 1;
        showImage(prevIndex);
    }

    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevImage(); });
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextImage(); });
    if (closeBtn) closeBtn.addEventListener("click", closeImage);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeImage();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display !== "flex") return;

        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });

    renderPage(1);
});
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelectorAll('.navbar__menu');

if (menu) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.forEach(function(link) {
            link.classList.toggle('active');
        });
    });
}

const gallerySection = document.querySelector('.gallery');
const picturesLink = document.querySelector('.navbar__links[href="#gallery"]');
const galleryImages = document.querySelectorAll('.gallery__img');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#lightboxClose');

if (gallerySection) {
    gallerySection.classList.remove('gallery--open');
    if (window.location.hash === '#gallery') {
        gallerySection.classList.add('gallery--open');
    }
}

const serviceButtons = document.querySelectorAll('.services__button');

if (picturesLink && gallerySection) {
    picturesLink.addEventListener('click', function(event) {
        event.preventDefault();
        gallerySection.classList.add('gallery--open');
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#gallery');
    });
}

serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.dataset.href;
        if (target) {
            window.location.href = target;
        }
    });
});

function openLightbox(src, caption) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
}

galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
        openLightbox(img.src, img.dataset.caption || img.alt || 'Birthday photo');
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

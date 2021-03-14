import images from "./gallery-items.js";


const galleryContainerRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const closeModalBtnRef = document.querySelector('[data-action="close-lightbox"]');
const lightBoxImageRef = document.querySelector('.lightbox__image');
const lightBoxOverlayRef = document.querySelector('.lightbox__overlay');


const imageMarkup=createGalleryMarkup(images);
galleryContainerRef.insertAdjacentHTML('beforeend', imageMarkup);

galleryContainerRef.addEventListener('click', onContainerClick);
closeModalBtnRef.addEventListener('click', closeGalleryModal);
lightBoxOverlayRef.addEventListener('click', onOverlayClick);

// console.log(createGalleryMarkup(images));
// // createGalleryMarkup(images);

function createGalleryMarkup(images) {
 return images.map((image, index) => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${image.original}"
      >
        <img
          class="gallery__image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
          data-index="${image.index}"
        />
      </a>
    </li>
  `;
 })
   .join('');
  
  // console.log(markup[1]);
};
  
function onContainerClick(e) {
    e.preventDefault();
  if (e.target.nodeName!=='IMG') {
    return;
  };

  openLightBox();

  showlightboxImage(e.target.dataset.source, e.target.alt);
    console.log(e.target.dataset.source);
  
  let modalLink = e.target.dataset.source;
  lightBoxImageRef.src = modalLink;
  lightBoxImageRef.dataset.index = e.target.dataset.index;
    // lightBoxImageRef.src = e.target.dataset.source;
};

function openLightBox() {
  window.addEventListener('keydown', onKeyPressDown);

  lightboxRef.classList.add('is-open');
};

function closeGalleryModal() {
  window.removeEventListener('keydown', onKeyPressDown);
  
  lightboxRef.classList.remove('is-open');
  showlightboxImage();
};

function showlightboxImage(src,alt) {
  lightBoxImageRef.src = src;
  lightBoxImageRef.alt = alt;
};

function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    closeGalleryModal();
  }
};

function onKeyPressDown(e) {
  console.log(e.code);
  const ESC_KEY_CODE = "Escape";

  if (e.code === ESC_KEY_CODE) {
    closeGalleryModal();
  }

  if (e.code === "ArrowLeft") {
    arrowLeft();
  }
  if (e.code === "ArrowRight") {
    arrowRight();
  }
};

// function setNewSrc(step, index) {
//   lightBoxImageRef.dataset.index = `${index + step}`;
//   lightBoxImageRef.src = images[index + step].original;
// };

function arrowLeft() {
  let index = +lightBoxImageRef.dataset.index;
  if (index === 0) {
    // setNewSrc(0, images.length - 1);
    // return

    index = images.length - 1;
    lightBoxImageRef.src = images[index].original;
  }
  console.log(index);
  // setNewSrc(-1, index);
};

function arrowRight() {
  let index = +lightBoxImageRef.dataset.index;
  if (index >0) {
    // setNewSrc(0, 0);
    // return

    index -= 1;
    lightBoxImageRef.src = images[index].original;
  }
  console.log(index);
  // setNewSrc(1, index);
};
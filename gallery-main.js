import images from "./gallery-items.js";


const galleryContainerRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');

const imageMarkup=createGalleryMarkup(images);
galleryContainerRef.insertAdjacentHTML('beforeend', imageMarkup);

galleryContainerRef.addEventListener('click', onContainerClick);

// console.log(createGalleryMarkup(images));
// // createGalleryMarkup(images);

function createGalleryMarkup(images) {
 return images.map(image => {
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
    openLightBox()
    console.log(e.target.dataset.source);
    
    galleryContainerRef.src = e.target.dataset.source;
};

function openLightBox() {
  lightboxRef.classList.add('is-open');
};


let marginY = window.pageYOffset;
let scroller = null;
let destination = 0;

const speed = 5;

const initScroll = elementId => {
  destination = document.getElementById("info-drink").offsetTop;

  scroller = setTimeout(() => {
    initScroll("info-drink");
  }, 1);

  marginY = marginY + speed;

  if(marginY >= destination) {
    clearTimeout(scroller);
  }

  window.scroll(0, marginY);
}

document.getElementById("hero__scroll-down").addEventListener('click', event => {
    event.preventDefault();
    initScroll();
});

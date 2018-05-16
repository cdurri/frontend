let day, month, year, selectedDate, currentDate;
const age = 18;

const fullUrl = window.location.href;
const endUrl = fullUrl.split('/').pop();

const checkUrl = () => {
  if(endUrl == 'index.html' && location.hash !== 'loaded') {
    location.hash = 'loaded';
    window.location.assign('age-gate.html');
  }
}

const checkAge = () => {
    const enterBtn = document.querySelector(".age-gate__enter");
    if(enterBtn) {
        enterBtn.addEventListener("click", event => {
        event.preventDefault();

          day = document.getElementById('age-gate__day');
        month = document.getElementById('age-gate__month');
         year = document.getElementById('age-gate__year');

         selectedDate = new Date();
         selectedDate.setFullYear( year.value, month.value - 1, day.value );
         currentDate = new Date();
         currentDate.setFullYear(currentDate.getFullYear() - age);

         if( day.value == 'notselected' || month.value == 'notselected' || year.value == 'notselected' ) {
           alert('Please enter your date of birth');
           return false;
         } else if ((currentDate - selectedDate) < 0) {
           alert('Entry denied, currently you are not of legal drinking age');
           return false;
         } else {
           window.location.assign("index.html#loaded");
         }
      });
    }
}

checkUrl();
checkAge();



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

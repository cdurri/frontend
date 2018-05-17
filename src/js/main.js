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



let marginY = 0;
let scroller = null;
let destination = 0;

const speed = 5;

const smoothScroll = () => {
  // get the number of pixels the document is scrolled along the Y(vertical) axis
  marginY = window.pageYOffset;
  // get the number of pixels distance, the element is from the top of it's parent node
  destination = document.getElementById("info-drink").offsetTop;

  // timeout function that executes after a small delay
  scroller = setTimeout(() => {
    // recursive function call on itself,  this creates the smooth scroll effect
    smoothScroll();
  }, 1);

  // increment the vertical scroll by 5 pixels each time to create smooth scroll
  marginY = marginY + speed;

  // stop timeout function executing when the vetical scroll is greater than or equal to the required scroll distance
  if(marginY >= destination) {
    clearTimeout(scroller);
  }

  /* call the scroll on the window passing values for the x and y coordinates at the top left, x = 0 as not concerned with x axis,
     y = marginY which will increment each because of recursion and create the smooth scroll effect
  */
  window.scroll(0, marginY);
}

document.getElementById("hero__scroll-down").addEventListener('click', event => {
    /*  prevent the browsers default action from executing. In this the default action is a page reload because a anchor element
        with href="#" is being clicked
    */
    event.preventDefault();
    smoothScroll();
});

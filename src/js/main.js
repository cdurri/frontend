var day, month, year, age = 18, selectedDate, currentDate;

const testOne = 1;

var fullUrl = window.location.href;
var endUrl = fullUrl.split('/').pop();

if(endUrl == 'index.html' && location.hash !== 'loaded') {
  location.hash = 'loaded';
  window.location.assign('age-gate.html');
}

document.querySelector(".age-gate__enter").addEventListener("click", function( event ) {
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

// Expression placeholder
var developer = 'Dennis Gaebel';

console.log(`Yo! My name is ${developer}!`);

// Expressions w/object literal
var author = {
    name: 'Gray Ghost Visuals'
};

console.log(`Thanks for writing awesome articles, ${author.name}.`);

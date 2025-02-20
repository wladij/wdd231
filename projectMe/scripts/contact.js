const mainnav = document.querySelector('#animateme')
const hambutton = document.querySelector('#myButton')

hambutton.addEventListener('click', () => {
  hambutton.classList.toggle('show');
  mainnav.classList.toggle('show');
  
});





document.addEventListener("DOMContentLoaded", function() {
    
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerText = currentYear;

    

});
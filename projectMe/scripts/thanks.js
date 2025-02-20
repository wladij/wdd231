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


const currentUrl = window.location.href;
console.log(currentUrl)

const everything = currentUrl.split('?');

let formData = everything[1].split('&');
console.log(formData);
function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40","@")
            
        }
    })
    return result;
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Request for ${show('name')} </p>
<p>Your Email ${show('email')}</p>
<p>Your Message ${show('message')}</p>

`
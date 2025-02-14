document.addEventListener("DOMContentLoaded", function() {
    
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerText = currentYear;

    
    const lastModified = document.lastModified;
    document.getElementById("last-modified").innerText = "Last Modified: " + lastModified;
});

//hamburger menu
const mainnav = document.querySelector('#animateme')
const hambutton = document.querySelector('#myButton')

hambutton.addEventListener('click', () => {
  hambutton.classList.toggle('show');
  mainnav.classList.toggle('show');
  
});



// theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '🌞'; 
}


themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙'; 
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌞'; 
    }
});




const currentUrl = window.location.href;
console.log(currentUrl)

const everything = currentUrl.split('?');

let formData = everything[1].split('&');
console.log(formData);
function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40","@").replace("%2B593","0")
            
        }
    })
    return result;
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Request for ${show('name')} ${show("last")} </p>
<p>Your Organizational title ${show('title')}</p>
<p>Your Company ${show('company')}</p>
<p>Your Membership ${show('membership')}</p
<p>Your Phone ${show('phone')}</p>
<p>Your email ${show('email')}</p>
<p>Your Description ${show('description')}</p>

`
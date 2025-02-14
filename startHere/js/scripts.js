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
<p>Appointment for ${show('first')} ${show("last")} </p>
<p>Proxy ${show('ordinance')} on ${show('fecha')} in the ${show('location')}</p>
<p>Your Phone ${show('phone')}</p>
<p>Your email ${show('email')}</p>

`
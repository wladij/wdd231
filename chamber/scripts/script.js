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

// current-weather
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '21f0537518255e76b9623cbb2fc6112c'; 
    const city = 'Timbuktu'; 
    const weatherElement = document.getElementById('current-weather');

   
    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Error in obtaining weather data');
            }
            const data = await response.json();

            
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const wind = data.wind.speed;
            const atmospheric = data.main.pressure;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
            
            weatherElement.innerHTML = `
                <p>🌤️ Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>    
                <p>🌡️ Temperature: ${temperature}°C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>🌬 Wind Speed: ${wind} m/s</p>
                <p>🔆 Atmospheric Pressure: ${atmospheric} hPa</p>
                <p>🌅 Sunrise: ${sunrise} am</p>
                <p>🌇 Sunset: ${sunset} pm</p>

            `;
        } catch (error) {
            console.error(error);
            weatherElement.textContent = 'The current climate could not be obtained.';
        }
    }

    
    fetchWeather();
});



// weather
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "21f0537518255e76b9623cbb2fc6112c"; 
    const city = "Timbuktu"; 

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const fetchWeatherForecast = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${apiKey}`);
            const data = await response.json();

            if (data.cod !== "200") {
                alert("Error: City not found or API issue.");
                return;
            }

            const forecast = data.list;
            const today = new Date();
            const todayIndex = today.getDay();

            // Día 1: Hoy
            const day1 = forecast[0];
            const day1Date = new Date(day1.dt * 1000);
            const day1Name = daysOfWeek[(todayIndex + 0) % 7];

            // Día 2: Mañana
            const day2 = forecast[1];
            const day2Name = daysOfWeek[(todayIndex + 1) % 7];

            // Día 3: Pasado mañana
            const day3 = forecast[2];
            const day3Name = daysOfWeek[(todayIndex + 2) % 7];

            // Mostrar los datos
            document.getElementById("day-name-1").textContent = `${day1Name}:`;
            document.getElementById("temp-1").textContent = `${Math.round(day1.main.temp)}°C`;
            document.getElementById("desc-1").textContent = day1.weather[0].description;

            document.getElementById("day-name-2").textContent = `${day2Name}:`;
            document.getElementById("temp-2").textContent = `${Math.round(day2.main.temp)}°C`;
            document.getElementById("desc-2").textContent = day2.weather[0].description;

            document.getElementById("day-name-3").textContent = `${day3Name}:`;
            document.getElementById("temp-3").textContent = `${Math.round(day3.main.temp)}°C`;
            document.getElementById("desc-3").textContent = day3.weather[0].description;

        } catch (error) {
            alert("Error fetching weather data.");
        }
    };

    fetchWeatherForecast();
});


const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");
const membersList = document.getElementById("members-list");

async function loadMemberData() {
    try {
        const response = await fetch('data/members.json'); 
        const members = await response.json();

        // Filtrar solo miembros Silver (2) o Gold (3)
        const filteredMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

        // Seleccionar aleatoriamente 2 o 3 miembros
        const randomMembers = getRandomMembers(filteredMembers, Math.floor(Math.random() * 2) + 2);
        
        displayMembers(randomMembers);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function getRandomMembers(members, count) {
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayMembers(members) {
    membersList.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement("section");
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;

        membersList.appendChild(memberCard);
    });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

window.onload = loadMemberData;



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

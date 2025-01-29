document.addEventListener("DOMContentLoaded", function() {
    
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerText = currentYear;

    
    const lastModified = document.lastModified;
    document.getElementById("last-modified").innerText = "Last Modified: " + lastModified;
});


const mainnav = document.querySelector('#animateme')
const hambutton = document.querySelector('#myButton')

hambutton.addEventListener('click', () => {
  hambutton.classList.toggle('show');
  mainnav.classList.toggle('show');
  
});


document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '21f0537518255e76b9623cbb2fc6112c'; // Reemplázalo con tu clave de API de OpenWeatherMap.
    const city = 'Timbuktu'; // Ciudad para obtener el clima.
    const weatherElement = document.getElementById('current-weather');

    // Función para obtener el clima actual
    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            const data = await response.json();

            // Extraer información relevante
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;

            // Mostrar los datos en la página
            weatherElement.innerHTML = `
                <p>🌡️ Temperatura: ${temperature}°C</p>
                <p>💧 Humedad: ${humidity}%</p>
                <p>🌤️ Descripción: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            `;
        } catch (error) {
            console.error(error);
            weatherElement.textContent = 'No se pudo obtener el clima actual.';
        }
    }

    // Llamar a la función
    fetchWeather();
});


document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "21f0537518255e76b9623cbb2fc6112c"; // Reemplaza con tu propia API Key de OpenWeather
    const city = "Timbuktu"; // Puedes cambiar esto a la ciudad deseada

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

// Cargar datos desde el archivo JSON
async function loadMemberData() {
    try {
        const response = await fetch('data/members.json'); // Ajusta la ruta a tu archivo JSON
        const members = await response.json();

        // Mostrar los miembros
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Mostrar los miembros
function displayMembers(members) {
    // Limpiar cualquier contenido previo
    membersList.innerHTML = '';

    // Iterar sobre cada miembro y generar la estructura HTML correspondiente
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

// Obtener el nivel de membresía como texto
function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Cambiar a la vista en grid
gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

// Cambiar a la vista en lista
listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

// Cargar los datos cuando la página se cargue
window.onload = loadMemberData;


// Obtener el botón y el body
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar si ya hay un tema guardado en localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '🌞'; // Cambiar el ícono según el tema
}

// Función para alternar entre temas
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙'; // Cambiar el ícono a luna
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌞'; // Cambiar el ícono a sol
    }
});

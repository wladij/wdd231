const mainnav = document.querySelector('#animateme')
const hambutton = document.querySelector('#myButton')

hambutton.addEventListener('click', () => {
  hambutton.classList.toggle('show');
  mainnav.classList.toggle('show');
  
});



document.addEventListener("DOMContentLoaded", () => {
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            loadArticles(data.articles);
            loadResources(data.resources);
        })
        .catch(error => console.error("Error loading data:", error));
});

function loadArticles(articles) {
    const articlesContainer = document.querySelector(".articles ul");
    articlesContainer.innerHTML = ""; 
    articles.forEach(article => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${article.link}">${article.title}</a> - ${article.description}`;
        articlesContainer.appendChild(listItem);
    });
}


function loadResources() {
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            const resourcesList = document.querySelector("#resources-list");
            if (!resourcesList) {
                console.error("Error: No se encontró #resources-list en el DOM");
                return;
            }

            resourcesList.innerHTML = ""; 

            data.resources.forEach(resource => {
                
                const div = document.createElement("div");
                div.classList.add("card");
                div.textContent = resource.name;
                div.addEventListener("click", () => openModal(resource));

                
                resourcesList.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading resources:", error));
}


function openModal(resource) {
    const modal = document.createElement("dialog");
    modal.classList.add("modal");
    modal.innerHTML = `
        <h2>${resource.name}</h2>
        <p>${resource.description || "No description available."}</p>
        <button class="close-modal">Close</button>
    `;

    document.body.appendChild(modal);
    modal.showModal();

   
    modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
}

function loadRandomAvatar() {
    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const avatarContainer = document.querySelector("#user-avatar");

            if (!avatarContainer) {
                console.error("No se encontró #user-avatar en el DOM");
                return;
            }

            avatarContainer.innerHTML = `
                <img src="${user.picture.large}" alt="Random User Avatar">
                <p>${user.name.first} ${user.name.last}</p>
            `;
        })
        .catch(error => console.error("Error loading avatar:", error));
}


document.addEventListener("DOMContentLoaded", loadRandomAvatar);




const icons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
];

const carousel = document.querySelector(".tech-circle");
let index = 0;


icons.forEach((icon, i) => {
    const img = document.createElement("img");
    img.src = icon;
    img.alt = `Technology Icon ${i + 1}`;
    if (i === 0) img.classList.add("active"); 
    carousel.appendChild(img);
});


function rotateIcons() {
    const images = document.querySelectorAll(".tech-circle img");
    images[index].classList.remove("active"); 
    index = (index + 1) % icons.length; 
    images[index].classList.add("active"); 
}

setInterval(rotateIcons, 2000); 


document.addEventListener("DOMContentLoaded", function() {
    
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerText = currentYear;

    

});
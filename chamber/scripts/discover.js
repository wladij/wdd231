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
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#discover-container");

   
    const infoDialog = document.getElementById("infoDialog");
    const dialogTitle = document.getElementById("dialogTitle");
    const dialogImage = document.getElementById("dialogImage");
    const dialogAddress = document.getElementById("dialogAddress");
    const dialogDescription = document.getElementById("dialogDescription");
    const closeDialogBtn = document.getElementById("closeDialog");

    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                const title = document.createElement("h2");
                title.textContent = item.name;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;
                figure.appendChild(img);

                const address = document.createElement("address");
                address.textContent = item.address;

                const description = document.createElement("p");
                description.textContent = item.description;

                const button = document.createElement("button");
                button.textContent = "Learn More";

                button.addEventListener("click", () => {
                    dialogTitle.textContent = item.name;
                    dialogImage.src = item.image;
                    dialogImage.alt = item.name;
                    dialogAddress.textContent = item.address;
                    dialogDescription.textContent = item.description;
                    infoDialog.showModal(); 
                });

                card.appendChild(title);
                card.appendChild(figure);
                card.appendChild(address);
                card.appendChild(description);
                card.appendChild(button);

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading data:", error));

  
    const sidebarMessage = document.querySelector("#sidebar-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();

    if (!lastVisit) {
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = currentTime - lastVisit;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            sidebarMessage.textContent = "Back so soon! Awesome!";
        } else {
            sidebarMessage.textContent = `Last visited ${daysDiff} day${daysDiff > 1 ? "s" : ""} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentTime);

    
    closeDialogBtn.addEventListener("click", () => {
        infoDialog.close();
    });
});



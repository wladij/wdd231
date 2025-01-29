const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
let prophetsData = []; 

const cards = document.querySelector('#cards');

let prophets = [];


async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

   
    if (Array.isArray(data.prophets)) {
        prophets = data.prophets;  
        displayProphets(prophets);  
    } else {
        console.error("No prophets array found");
    }
}


const displayProphets = (prophets) => {
    const cards = document.querySelector('#cards');
    cards.innerHTML = '';  

    prophets.forEach((prophet) => {
        
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');

        
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        
        if (prophet.birthdate) {
            birthdate.textContent = `Born: ${prophet.birthdate}`;
        }

        
        if (prophet.birthplace) {
            birthplace.textContent = `Birthplace: ${prophet.birthplace}`;
        }

        
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        
        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        
        cards.appendChild(card);
    });
}


const filterByUtah = () => {
    const filtered = prophets.filter((prophet) => prophet.birthplace === "Utah");
    displayProphets(filtered);
};

const filterByNonUS = () => {
    const USStates = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const filtered = prophets.filter((prophet) => {
        const birthplace = prophet.birthplace;

        
        return !USStates.some((state) => birthplace.includes(state));
    });

    displayProphets(filtered);
};

const filterByAge95 = () => {
    const filtered = prophets.filter((prophet) => {
        const birthYear = new Date(prophet.birthdate).getFullYear();
        const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
        return (deathYear - birthYear) >= 95;
    });
    displayProphets(filtered);
};

const filterBy10Children = () => {
    
    const filtered = prophets.filter((prophet) => {
        
        return prophet.numofchildren && prophet.numofchildren >= 10;
    });
    if (filtered.length > 0) {
        displayProphets(filtered);
    } else {
        console.log("No prophets with 10 or more children found.");
    }
};

const filterBy15Years = () => {
    
    const startYear = 1830;

    
    const sortedProphets = prophets.slice().sort((a, b) => a.order - b.order);

    let previousDeathYear = startYear;
    const filtered = sortedProphets.filter((prophet, index) => {
        const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();

        
        const yearsOfService = deathYear - previousDeathYear;

        
        previousDeathYear = deathYear;

        
        return yearsOfService >= 15;
    });

    if (filtered.length > 0) {
        displayProphets(filtered);
    } else {
        console.log("No prophets with more than 15 years of service found.");
    }
};

const resetFilters = () => {
    displayProphets(prophets);
};


document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.querySelector("#resetButton");

    if (resetButton) {
        resetButton.addEventListener("click", resetFilters);
    } else {
        console.error('Button with id "resetButton" not found.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const filterUtahButton = document.querySelector('#filterUtah');
    const filterNonUSButton = document.querySelector('#filterNonUS');
    const filterAge95Button = document.querySelector('#filterAge95');
    const filter10ChildrenButton = document.querySelector('#filter10Children');
    const filter15YearsButton = document.querySelector('#filter15Years');

    filterUtahButton.addEventListener('click', filterByUtah);
    filterNonUSButton.addEventListener('click', filterByNonUS);
    filterAge95Button.addEventListener('click', filterByAge95);
    filter10ChildrenButton.addEventListener('click', filterBy10Children);
    filter15YearsButton.addEventListener('click', filterBy15Years);

    getProphetData(); 
});

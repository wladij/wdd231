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

const members = [
    {
        membership: 'not-for-profit',
        description: 'Free access for non-profit organizations.'
    },
    {
        membership: 'Bronze Membership',
        description: ' Basic benefits and access to events.'
    },
    {
        membership: 'Silver Membership',
        description: ' Discounts on events and additional visibility.'
    },
    {
        membership: 'Gold Membership',
        description: 'Maximum profits and prominent advertising'
    },
]
                    
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementById('cards');
    

    

    const renderMember = (filteredMember) => {
        cards.innerHTML = ''; 
        

        filteredMember.forEach((member) => {
            

            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            

            courseCard.innerHTML = `
                <h3 class="cards-title">${member.membership} </h3>
            `;

            courseCard.addEventListener('click', () => {
                displayCourseDetails(member);
            });

            cards.appendChild(courseCard);
        });

        
    };

    

    renderMember(members);
});               


function displayCourseDetails(member) {
    const cardsDetails = document.getElementById('cards-details');
    cardsDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${member.membership}</h2>
        <p><strong>Description</strong>: ${member.description}</p>
    `;
    cardsDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
        cardsDetails.close();
    });

    window.addEventListener('click', (event) => {
        if (event.target === cardsDetails) {
            cardsDetails.close();
        }
    });
}

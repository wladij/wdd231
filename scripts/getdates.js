console.log('JS cargado');

document.addEventListener("DOMContentLoaded", function() {
    
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerText = currentYear;

    
    const lastModified = document.lastModified;
    document.getElementById("lastModified").innerText = "Last Modified: " + lastModified;
});






const allButton = document.getElementById('all');
const cseButton = document.getElementById('cse');
const wddButton = document.getElementById('wdd');
const boxContainer = document.getElementById('boxContainer');


const cseBoxes = ['cse 111', 'cse 110', 'cse 210']; 
const wddBoxes = ['wdd 130', 'wdd 131', 'wdd 231']; 
// const allBoxes = ['cse 111', 'cse 110', 'cse 210', 'wdd 130', 'wdd 131', 'wdd 231']; 
const allBoxes = [...cseBoxes, ...wddBoxes];

// Function to generate frames in the interface
function createBoxes(boxes) {
    boxContainer.innerHTML = ''; 
    boxes.forEach((box, index) => {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = box;

        // Check if the square was previously selected and apply the 'selected' class to it.
        if (isSelected(box, index)) {
            div.classList.add('selected');
        }

        div.addEventListener('click', () => {
            div.classList.toggle('selected'); // Toggle 'selected' class for painting or deselecting
            saveSelection(box, index, div.classList.contains('selected')); // Save the selection
        });

        boxContainer.appendChild(div);
    });
}

// Function for saving the selection in the LocalStorage
function saveSelection(box, index, isSelected) {
    let selections = JSON.parse(localStorage.getItem('selections')) || {};

    
    if (!selections[box]) {
        selections[box] = [];
    }

    if (isSelected) {
        selections[box].push(index); // Add index if selected
    } else {
        selections[box] = selections[box].filter(i => i !== index); // Delete index if deselected
    }

    localStorage.setItem('selections', JSON.stringify(selections)); // Save to LocalStorage
}

// Function to check if a frame is already selected
function isSelected(box, index) {
    let selections = JSON.parse(localStorage.getItem('selections')) || {};

    return selections[box] && selections[box].includes(index); //  Check if the table index is in the selections.
}

// Event listeners for the bottons
allButton.addEventListener('click', () => {
    createBoxes(allBoxes); 
});

cseButton.addEventListener('click', () => {
    createBoxes(cseBoxes); 
});

wddButton.addEventListener('click', () => {
    createBoxes(wddBoxes); 
});

// Start with “All” enabled by default
createBoxes(allBoxes);



const hamburger = document.querySelector('#hamburger')
const links = document.querySelector('#nav-links')

hamburger.addEventListener('click', () => {
    links.classList.toggle('show')
} )
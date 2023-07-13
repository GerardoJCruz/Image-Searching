// HTML elements
const imagesContainer = document.getElementById('cards__container');
const myForm = document.getElementById('myForm');
const pagerDiv = document.getElementById('pager');

const api_key = '18188601-534a756987856a27626a98f10';
const maxPerPage = 20;
let searching_term = '';
let currentPage;

// Handle the form submission
myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate that the Form is not empty
    searching_term = e.target.searching.value;
    if(searching_term === ''){
        showAlert('provide a search term');
        return;
    }

    currentPage = 1;
    getImages(searching_term);
});

// Function to fetch images from Pixabay API
const getImages = (searching_term) => {
    const url = `https://pixabay.com/api/?key=${api_key}&per_page=${maxPerPage}&q=${searching_term}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //Use cleaner
            cleaner();

            // Calling displayImages
            displayImages(data);
            

            //To calc the number of pages
            displayPages(data.total, maxPerPage);

            // listeningForPages(searching_term);
        })
        .catch(error => {
            // Heandle erros
            console.log('Error', error);
        })
}

// Function to display images
const displayImages = (data) => {
    data.hits.forEach(e => {
        // Create the images container and add css classes
        const imagesCard = document.createElement('div');
        imagesCard.classList.add('card', 'rounded-0');

        // Extract card information
        const { largeImageURL, previewURL, likes, views } = e

        // Create the individual cards
        const htmlBlock = `
            
                <img src="${previewURL}" alt="Image example">
                <div class="card__info">
                    <p class="card__likes"><span>${likes}</span> Likes</p>
                    <p class="card__views"><span>${views}</span> views </p>
            
                    <a class="btn card__button w-100 border-0 rounded p-1" href="${largeImageURL}" target="_blank">See the full image</a>
                </div>
        `
        imagesCard.innerHTML = htmlBlock;

        imagesContainer.appendChild(imagesCard);
    });


}

//Function to remove the previous images.
const cleaner = () => {
    while (imagesContainer.firstChild) {
        imagesContainer.removeChild(imagesContainer.firstChild);
    }
}


// Function to display pages
function displayPages(total, maxImages) {
    pagesCleaner();
    const totalPages = Math.ceil( total> 400? 20 : total / maxImages);
    
    // Create a tags and add it to the HTML
    for (i = 0; (i < totalPages); i++) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('text-decoration-none')
        pageLink.dataset.page = i+1;
        pageLink.innerHTML = `${i+1}`;

        //Add the action to change the page
        pageLink.onclick = () =>{
            currentPage = pageLink.dataset.page;
            getImages(searching_term);
        }

        pagerDiv.appendChild(pageLink);
    }
}

const pagesCleaner = () => {
    while (pagerDiv.firstChild) {
        pagerDiv.removeChild(pagerDiv.firstChild);
    }
}


// Function to show alert
function showAlert(message){
    const existingAlert = document.querySelector('.bg-danger');
    if(!existingAlert){
        const alert = document.createElement('p');
        alert.classList.add('bg-danger', 'text-white', 'px-4', 'py-3', 'rounded', 'm-auto', 'mt-5', 'text-center');
        alert.innerHTML= `
            <strong class="fw-bold">Error!</strong>
            <span class="block">${message}</span>
        `;

        myForm.appendChild(alert);

        setTimeout(() =>{
            alert.remove();
        }, 5000);
    }
}
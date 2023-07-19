import {currentPage, searching_term} from './form.js'
import {ConsultApi} from './api.js'

const imagesContainer = document.getElementById('cards__container');
const pagesContainer = document.getElementById('pager');

// Function to display images
export const displayImages = (data) => {
    cleaner('images');

    //Show alert no results 
    if (data.total === 0) {
        showAlert('Not results found');
        return;
    }

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

// Function to display pages
export function displayPages(total, maxImages) {
    cleaner('pages');
    const totalPages = Math.ceil( total> 400? 20 : total / maxImages);
    
    // Create a tags and add it to the HTML
    for (let i = 0; (i < totalPages); i++) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('text-decoration-none')
        pageLink.dataset.page = i+1;
        pageLink.innerHTML = `${i+1}`;

        //Add the action to change the page
        pageLink.onclick = () =>{
            currentPage.page = pageLink.dataset.page;
            const consult = new ConsultApi(searching_term, currentPage.page);
            consult.consult();
        }

        pagesContainer.appendChild(pageLink);
    }
}

// Function to show alert
export function showAlert(message){
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
        }, 3000);
    }
}

export const cleaner = (container_toclean)=>{
    const containerCleaning = container_toclean === 'images' ? imagesContainer : pagesContainer;
    while (containerCleaning.firstChild) {
        containerCleaning.removeChild(containerCleaning.firstChild);
    }
}
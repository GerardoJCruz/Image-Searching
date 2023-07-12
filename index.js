// HTML elements
const imagesContainer = document.getElementById('cards__container');
const myForm = document.getElementById('myForm');
const pagerDiv = document.getElementById('pager');

const api_key = '18188601-534a756987856a27626a98f10';
const maxPerPage = 20;
let currentPage = 1;

// Handle the form submission
myForm.addEventListener('submit', function (e) {
    getImages(e);
});

// Function to fetch images from Pixabay API
const getImages = (event) => {
    event.preventDefault();
    const searching_term = event.target.searching.value;
    const url = `https://pixabay.com/api/?key=${api_key}&per_page=${maxPerPage}&q=${searching_term}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //Use cleaner
            cleaner();

            // Calling displayImages
            displayImages(data);

            //To calc the number of pages
            displayPages( data.total, currentPage, maxPerPage);
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
        const { id, largeImageURL, previewURL, likes, views } = e

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
const cleaner = ()=>{
    while(imagesContainer.firstChild){
        imagesContainer.removeChild(imagesContainer.firstChild);
    }
}


// Function to display pages
function displayPages(total, current, maxImages) {
    const totalPages = Math.ceil(total / maxImages);
    const ul = document.createElement('ul');
    ul.classList.add('pager__links', 'list-unstyled', 'd-flex', 'gap-3', 'justify-content-center', 'mt-5')

    // Create li tags and add it to the HTML
    for(i = 0; i < totalPages; i++){
        const list = document.createElement('li');
        list.innerHTML = i+1;
        ul.appendChild(list);
    }
    pagerDiv.appendChild(ul);
    // listeningForPages(ul);
}

// const listeningForPages= () =>{
//     const listLinks = unOlist.getElementsByTagName('li');
//     for(let i = 0; i < listLinks.length; i++){
//         listLinks[i].addEventListener('click', function(e){
//             currentPage = i+1;
//             getImages(e);
//         })
//     }
// }
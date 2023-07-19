import { displayImages, displayPages, showAlert} from './interface.js'
const api_key = '18188601-534a756987856a27626a98f10';
const maxPerPage = 20;

// Class to consult an API 
export class ConsultApi{
    constructor(searching_term, currentPage){
        this.searching_term = searching_term;
        this.currentPage = currentPage;
    }

    consult(){
        const url = `https://pixabay.com/api/?key=${api_key}&per_page=${maxPerPage}&q=${this.searching_term}&page=${this.currentPage}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {

                // Calling displayImages
                displayImages(data);
    
                //To calc the number of pages
                displayPages(data.total, maxPerPage);
    
            })
            .catch(error => {
                // Heandle erros
                console.log('Error', error);
            })
    }
}
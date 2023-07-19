import { ConsultApi } from './api.js'
import { showAlert } from './interface.js';

export let searching_term = '';
export let currentPage = { page: 1};

export class App {
    constructor(myForm) {
        this.myForm = myForm;
    }

    run() {
        // Handle the form submit
        this.myForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate that the Form is not empty
            searching_term = e.target.searching.value;
            if (searching_term === '') {
                showAlert('provide a search term');
                return;
            }

            currentPage.page = 1;
            const consult = new ConsultApi(searching_term, currentPage.page);
            consult.consult();
        });
    }
}



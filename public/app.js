import { Cars } from './classes/Cars.js';
import { Question } from './classes/Question.js';
import { Buttons } from './classes/Buttons.js';
import { Header } from './classes/Header.js';
//this uses the standard fetch with 
//an error check so the url should
//beable to be change to a web url and work
//just as well as long as the json is returned
const URL = './json.php';
fetch(URL)
    .then(response => {
    console.log;
    return response.json();
})
    .then(jsonData => new App(jsonData))
    .catch(error => {
    console.log('Error:', error);
    alert('Sorry There was an issue getting the data');
});
class App {
    constructor(data) {
        //make calls to map easier
        this.map = Array.prototype.map;
        this.form = document.createElement('form');
        //build car list
        this.cars = new Cars(data);
        this.app = document.querySelector('#app-root');
        this.app.appendChild(new Header().getHeader());
        //generate questions with defaults;
        this.questionBodyDesc = new Question(this.cars.getBodyDescOptions(), 'bodyDesc', 'Body Description', 1);
        this.questionFuelType = new Question(this.cars.getFuelTypeOptions(), 'fuelType', 'Fuel Type', 2);
        this.questionTransmission = new Question(this.cars.getTransmissionOptions(), 'transmission', 'Transmission', 3);
        this.questionSecurityStatus = new Question(this.cars.getSecurityStatusOptions(), 'securityStatus', 'Security Status', 4);
        this.questionGroupStatus = new Question(this.cars.getGroupStatusOptions(), 'groupStatus', 'Group Status', 5);
        this.questionCC = new Question(this.cars.getCCOptions(), 'cc', 'Engine CC', 6);
        this.questionBHP = new Question(this.cars.getBHPCountOptions(), 'bhpCount', 'BHP', 7);
        this.questionModel = new Question(this.cars.getModelOptions(), 'model', 'Model', 8);
        this.buttons = new Buttons();
        this.bindEvents();
        this.render();
        this.questionBodyDesc.show();
    } //end constructor
    //gets a filter based on the currently selected options
    getCurrentFilter() {
        let data = {};
        const answers = document.querySelectorAll('select');
        answers.forEach(select => {
            if (select.value) {
                data[select.name] = select.value;
            }
        });
        return data;
    } //end getCurrentFilter
    runFilter() {
        this.cars.filter = this.getCurrentFilter();
        this.cars.filterCars();
    } //end runFilter
    bindEvents() {
        //BODY DESC
        this.questionBodyDesc.select.addEventListener('change', e => {
            this.runFilter();
            this.questionFuelType.updateOptions(this.cars.getFuelTypeOptions());
            if (this.questionBodyDesc.select.value == '')
                this.questionBodyDesc.updateOptions(this.cars.getBodyDescOptions());
            else
                this.questionFuelType.show();
        });
        //FUEL TYPE
        this.questionFuelType.select.addEventListener('change', e => {
            this.questionBodyDesc.finish();
            this.runFilter();
            this.questionTransmission.updateOptions(this.cars.getTransmissionOptions());
            if (this.questionFuelType.select.value == '')
                this.questionFuelType.updateOptions(this.cars.getFuelTypeOptions());
            else
                this.questionTransmission.show();
        });
        //TRANSMISSION
        this.questionTransmission.select.addEventListener('change', e => {
            this.runFilter();
            this.questionSecurityStatus.updateOptions(this.cars.getSecurityStatusOptions());
            if (this.questionTransmission.select.value == '')
                this.questionTransmission.updateOptions(this.cars.getTransmissionOptions());
            else
                this.questionSecurityStatus.show();
        });
        //SECURITY STATUS
        this.questionSecurityStatus.select.addEventListener('change', e => {
            this.runFilter();
            this.questionGroupStatus.updateOptions(this.cars.getGroupStatusOptions());
            if (this.questionSecurityStatus.select.value == '')
                this.questionSecurityStatus.updateOptions(this.cars.getSecurityStatusOptions());
            else
                this.questionGroupStatus.show();
        });
        //GROUP STATUS
        this.questionGroupStatus.select.addEventListener('change', e => {
            this.runFilter();
            this.questionCC.updateOptions(this.cars.getCCOptions());
            if (this.questionGroupStatus.select.value == '')
                this.questionGroupStatus.updateOptions(this.cars.getGroupStatusOptions());
            else
                this.questionCC.show();
        });
        //CC
        this.questionCC.select.addEventListener('change', e => {
            this.runFilter();
            this.questionBHP.updateOptions(this.cars.getBHPCountOptions());
            if (this.questionCC.select.value == '')
                this.questionCC.updateOptions(this.cars.getCCOptions());
            else
                this.questionBHP.show();
        });
        //BHP
        this.questionBHP.select.addEventListener('change', e => {
            this.runFilter();
            this.questionModel.updateOptions(this.cars.getModelOptions());
            if (this.questionBHP.select.value == '')
                this.questionBHP.updateOptions(this.cars.getBHPCountOptions());
            else
                this.questionModel.show();
        });
        //MODEL
        this.questionModel.select.addEventListener('change', e => {
            this.buttons.hide();
            this.runFilter();
            this.buttons.show(this.cars.results[0].abiCode.toString().substring(0, 3), this.cars.results[0].abiCode.toString());
        });
        this.buttons.reset.addEventListener('click', e => {
            this.buttons.hide();
            this.questionModel.hide();
            this.questionBHP.hide();
            this.questionCC.hide();
            this.questionGroupStatus.hide();
            this.questionSecurityStatus.hide();
            this.questionTransmission.hide();
            this.questionFuelType.hide();
            this.questionBodyDesc.hide();
            this.cars.results = this.cars.cars;
            this.questionBodyDesc.updateOptions(this.cars.getBodyDescOptions());
            this.questionBodyDesc.select.selectedIndex = 0;
            this.questionBodyDesc.reset();
            this.questionBodyDesc.show();
        });
    } //end bindEvents
    render() {
        //build the app wraper
        this.form.classList.add('query-form');
        this.app.appendChild(this.form);
        //add questions to the application form
        this.form.appendChild(this.questionBodyDesc.getQuestionElement());
        this.form.appendChild(this.questionFuelType.getQuestionElement());
        this.form.appendChild(this.questionTransmission.getQuestionElement());
        this.form.appendChild(this.questionSecurityStatus.getQuestionElement());
        this.form.appendChild(this.questionGroupStatus.getQuestionElement());
        this.form.appendChild(this.questionCC.getQuestionElement());
        this.form.appendChild(this.questionBHP.getQuestionElement());
        this.form.appendChild(this.questionModel.getQuestionElement());
        this.form.appendChild(this.buttons.getButtons());
    } //end render
} //end class

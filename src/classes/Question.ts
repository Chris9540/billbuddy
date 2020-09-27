import { Utils } from "./Utils.js";


/*
Creates the question along with all the elements and can update its options;
*/
export class Question {
    root:HTMLDivElement = document.createElement('div');
    label:HTMLLabelElement = document.createElement('label');
    selectWrap:HTMLDivElement = document.createElement('div');
    select:HTMLSelectElement = document.createElement('select');
    option:HTMLOptionElement = document.createElement('option');
    iconDiv:HTMLDivElement = document.createElement('div');
    utils:Utils = new Utils();
    id:string;
    TO_MANY:string = 'Too Many Results';
    PLEASE_SELECT:string = 'Please Select Option';


    //build default question options can be empty
    constructor(options:{value:string; text?:string }[], id:string, label:string, index?:number) {
        this.root.appendChild(this.label);
        this.root.appendChild(this.selectWrap);
        this.root.appendChild(this.iconDiv);
        this.selectWrap.appendChild(this.select);
        this.select.appendChild(this.option)
        this.id = id;

        this.root.classList.add('hidden')

        this.label.innerText = (index)? `Question ${index}: ${label}`: label;
        this.select.addEventListener('focusout', e=>{this.finish()})

        this.select.id = id;
        this.select.name = id;
        this.select.disabled = true;

        this.option.value = '';
        this.option.innerText = (options.length == 0) ? this.TO_MANY : this.PLEASE_SELECT;
    
        options.forEach(element => {
            let option:HTMLOptionElement = document.createElement('option');
            option.value = element.value;
            if(element.text) {
                option.innerText = this.utils.capitalize(element.text);
            }
            else{
                option.innerText = this.utils.capitalize(element.value);
            }
            
            this.select.appendChild(option)
        });

    }


    getQuestionElement() {
        return this.root;
    }

    //Updates the options in the select element base on the given array
    updateOptions(options:{value:string; text?:string }[]) {
        //console.log(`updating ${this.id} options with:`, options);
        const currentValue = this.select.value;
        this.select.innerHTML = '';
        let defaultOption:HTMLOptionElement = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerText = (options.length == 0) ? this.TO_MANY : this.PLEASE_SELECT;
        this.select.appendChild(defaultOption);
        options.forEach(obj=>{
            let option:HTMLOptionElement = document.createElement('option');
            option.value = obj.value;
            option.innerText = (obj.text) ? this.utils.capitalize(obj.text) : this.utils.capitalize(obj.value);
            if(currentValue == obj.value) {
                option.selected = true;
            }
            this.select.appendChild(option)

        })
    }

    show() {
        if(!this.root.classList.contains('active')) {
            this.root.classList.add('active')
            this.select.disabled = false;
        }
    }

    hide() {
        this.root.classList.remove('active')
        this.select.disabled = true;
    }

    finish() {
        if(this.select.value != '') {
            this.iconDiv.innerText = '✔';
            this.select.disabled = true;
        }
    }

    reset() {
        this.iconDiv.innerText = '';
        this.select.disabled = true;
    }
}
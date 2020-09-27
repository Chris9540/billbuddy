import { Dialog } from './Dialog.js';

export class Buttons {
    root:HTMLDivElement = document.createElement('div');
    reset:HTMLButtonElement = document.createElement('button');
    fact:HTMLButtonElement = document.createElement('button');
    abi:string|null=null;
    fullABI:string|null=null;
    dialog:Dialog;

    constructor() {
        this.dialog = new Dialog();
        document.querySelector('body')?.appendChild(this.dialog.getDialogElement());
        this.root.appendChild(this.reset);
        this.root.appendChild(this.fact);
        this.root.classList.add('hidden');
        this.reset.disabled = true;
        this.fact.disabled = true;
        this.reset.innerText = 'Reset';
        this.reset.type = 'button';
        this.fact.type = 'button';
        this.fact.addEventListener('click', e=>{
            if(this.abi) {
                fetch(`http://numbersapi.com/${this.abi}`)
                .then(response=>response.text())
                .then(text => {
                    this.dialog.show("You're Fact", text);
                })
                .catch(error=>{
                    console.error(error);
                    alert('There wan a error getting the fact');
                })
            }
        })

    }


    getButtons() {
        return this.root;
    }

    show(abi:string, full:string) {
        this.abi = abi;
        this.reset.disabled = false;
        this.fact.disabled = false;
        this.fact.innerText = `Get Fact For ABI: ${full}`;
        if(!this.root.classList.contains('active'))
            this.root.classList.add('active');
    }

    hide() {
        this.reset.disabled = true;
        this.fact.disabled = true;
        this.root.classList.remove('active');
        this.abi = null;
    }
}
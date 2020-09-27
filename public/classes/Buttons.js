import { Dialog } from './Dialog.js';
export class Buttons {
    constructor() {
        var _a;
        this.root = document.createElement('div');
        this.reset = document.createElement('button');
        this.fact = document.createElement('button');
        this.abi = null;
        this.fullABI = null;
        this.dialog = new Dialog();
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.appendChild(this.dialog.getDialogElement());
        this.root.appendChild(this.reset);
        this.root.appendChild(this.fact);
        this.root.classList.add('hidden');
        this.reset.disabled = true;
        this.fact.disabled = true;
        this.reset.innerText = 'Reset';
        this.reset.type = 'button';
        this.fact.type = 'button';
        this.fact.addEventListener('click', e => {
            if (this.abi) {
                fetch(`http://numbersapi.com/${this.abi}`)
                    .then(response => response.text())
                    .then(text => {
                    this.dialog.show("You're Fact", text);
                })
                    .catch(error => {
                    console.error(error);
                    alert('There wan a error getting the fact');
                });
            }
        });
    }
    getButtons() {
        return this.root;
    }
    show(abi, full) {
        this.abi = abi;
        this.reset.disabled = false;
        this.fact.disabled = false;
        this.fact.innerText = `Get Fact For ABI: ${full}`;
        if (!this.root.classList.contains('active'))
            this.root.classList.add('active');
    }
    hide() {
        this.reset.disabled = true;
        this.fact.disabled = true;
        this.root.classList.remove('active');
        this.abi = null;
    }
}

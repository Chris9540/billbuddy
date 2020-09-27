export class Dialog {
    overlay:HTMLDivElement = document.createElement('div');
    dialog:HTMLDivElement = document.createElement('div');
    content:HTMLDivElement = document.createElement('div');
    buttonWrap:HTMLDivElement = document.createElement('div');
    close:HTMLButtonElement = document.createElement('button');
    title = document.createElement('h4');
    text:HTMLDivElement = document.createElement('div');

    constructor() {
        this.overlay.appendChild(this.dialog);
        this.close.innerText = 'Close'
        this.overlay.classList.add('overlay');
        this.dialog.appendChild(this.content);
        this.dialog.appendChild(this.buttonWrap);
        this.buttonWrap.appendChild(this.close);
        this.content.appendChild(this.title);
        this.content.appendChild(this.text);
        this.overlay.style.display = 'none';
        this.close.addEventListener('click',e=>{
            this.overlay.style.display = 'none';
        })
    }


    getDialogElement() {
        return this.overlay;
    }

    show(title:string, content:string) {
        this.title.innerText = title;
        this.text.innerText = content;
        this.overlay.style.display = 'flex';
    }
}
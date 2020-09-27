export class Dialog {
    constructor() {
        this.overlay = document.createElement('div');
        this.dialog = document.createElement('div');
        this.content = document.createElement('div');
        this.buttonWrap = document.createElement('div');
        this.close = document.createElement('button');
        this.title = document.createElement('h4');
        this.text = document.createElement('div');
        this.overlay.appendChild(this.dialog);
        this.close.innerText = 'Close';
        this.overlay.classList.add('overlay');
        this.dialog.appendChild(this.content);
        this.dialog.appendChild(this.buttonWrap);
        this.buttonWrap.appendChild(this.close);
        this.content.appendChild(this.title);
        this.content.appendChild(this.text);
        this.overlay.style.display = 'none';
        this.close.addEventListener('click', e => {
            this.overlay.style.display = 'none';
        });
    }
    getDialogElement() {
        return this.overlay;
    }
    show(title, content) {
        this.title.innerText = title;
        this.text.innerText = content;
        this.overlay.style.display = 'flex';
    }
}

export class Header {
    root:HTMLDivElement = document.createElement('div');

    constructor() {
        this.root.innerText = 'Find Your Polo';
        this.root.classList.add('header');
    }

    getHeader() {
        return this.root;
    }
}
export class Header {
    constructor() {
        this.root = document.createElement('div');
        this.root.innerText = 'Find Your Polo';
        this.root.classList.add('header');
    }
    getHeader() {
        return this.root;
    }
}

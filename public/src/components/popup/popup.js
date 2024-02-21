export class Popup{
    #props
    #parent;

    /**
     * @param {HTMLElement} parent
    */
    constructor(parent) {
        this.#parent = parent;
        this.#props = {
            id: crypto.randomUUID()
        }
    }

    get self(){
        return document.querySelector(`#popup-${this.#props.id}`)
    }

    get content(){
        return document.querySelector(`#popup-${this.#props.id} > .popup-content`)
    }

    closeHandle(event){
        event.preventDefault();
        this.removeListeners();
        this.self.remove();
    }
    closeHandle = this.closeHandle.bind(this);

    addListeners(){
        document.querySelector(`#popup-${this.#props.id} > .popup__close-btn`)
            .addEventListener('click', this.closeHandle);
    }

    removeListeners(){
        document.querySelector(`#popup-${this.#props.id} > .popup__close-btn`)
            .removeEventListener('click', this.closeHandle);
    }

    render(){
        let template = Handlebars.templates["popup.hbs"];

        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#props));

        this.addListeners();
    }
}
import {PopupEventsType} from "./events.js";
import {AppEventMaker} from "../../modules/eventMaker.js";

export class Popup{
    #props;
    #parent;
    id;

    constructor(parent) {
        this.#parent = parent;
        this.#props = {
            id: crypto.randomUUID()
        }
        this.id = this.#props.id;
    }

    get self(){
        return document.querySelector(`#popup-${this.#props.id}`)
    }

    get content(){
        return document.querySelector(`#popup-${this.#props.id} > .popup-content`)
    }

    closeHandle(event){
        event.preventDefault();
        AppEventMaker.notify(PopupEventsType.POPUP_CLOSE, this.#props.id);
    }
    closeHandle = this.closeHandle.bind(this);

    close(id){
        if (id === this.id){
            this.removeListeners();
            this.unsubscribeEvents();
            this.self.remove();
        }
    }
    close = this.close.bind(this);

    addListeners(){
        document.querySelector(`#popup-${this.#props.id} > .popup__close-btn`)
            .addEventListener('click', this.closeHandle);
    }

    removeListeners(){
        document.querySelector(`#popup-${this.#props.id} > .popup__close-btn`)
            .removeEventListener('click', this.closeHandle);
    }

    subscribeEvents(){
        AppEventMaker.subscribe(PopupEventsType.POPUP_CLOSE, this.close);
    }

    unsubscribeEvents(){
        AppEventMaker.unsubscribe(PopupEventsType.POPUP_CLOSE, this.close);
    }

    render(){
        let template = Handlebars.templates["popup.hbs"];

        this.#parent.insertAdjacentHTML(
            'beforeend',
            template(this.#props));

        this.addListeners();
        this.subscribeEvents();
    }
}
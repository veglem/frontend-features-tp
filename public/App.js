import {Popup} from './src/components/popup/popup.js'

let p = new Popup(
    document.getElementById('root')
)

p.render();

p.content.insertAdjacentHTML("beforeend", "<h1>Hello world</h1>");
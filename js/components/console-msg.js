class ConsoleMsg extends HTMLElement {
	connectedCallback() {
		this.parentElement.appendChild(document.createElement("br"));
	}
}

window.customElements.define("console-msg", ConsoleMsg);

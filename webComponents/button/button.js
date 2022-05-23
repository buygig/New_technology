class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });

    this.shadowRoot.innerHTML = `
    <button>
      <slot></slot>
    </button>
    `
  }
}

customElements.define("b-button", MyButton)

class Counter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });

    this.shadowRoot.innerHTML = `
    <button class='count'>${this.count}</button>
        
    <style>
      button {
        width: 50px;
        height: 50px;
        border: 1px solid black;
        font-size: 30px;
      }
    </style>
    `

    this.btn = this.shadowRoot.querySelector('.count');
    this.btn.addEventListener('click', e => {
      this.count++;
    })
  }

  get count() {
    return this.getAttribute('count') ? this.getAttribute('count') : 0;
  }

  set count(count) {
    this.setAttribute('count', count)
  }

  static get observedAttributes() {
    return ['count']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'count') {
      this.btn.textContent = newValue;
    }
  }
}

customElements.define("b-counter", Counter)
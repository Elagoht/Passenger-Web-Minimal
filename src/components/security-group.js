class SecurityGroupComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    const title = this.getAttribute("title")
    const itemsString = this.getAttribute("items")
    let items
    try { items = JSON.parse(itemsString) }
    catch { items = [] }

    this.shadowRoot.innerHTML = `
      <fieldset>
        <legend>${title}</legend>
        <div>
          ${items.map(item => `
            <a href="${item.link}">
              ${item.title}
            </a>
          `).join("")}
        </div>
      </fieldset>

      <style>
        fieldset {
          border: none;
          padding: 1em 0;
        }
        legend {
          font-size: 1.5em;
          font-weight: semi-bold;
        }
        a {
          display: block;
          text-decoration: none;
          border: 0.125rem solid white;
          border-bottom: none;
          background-color: var(--tuatara-50);
          padding: 0.75em;
          color: inherit;
        }
        a:hover {
          background-color: white;
        }
        a:first-of-type {
          border-top-left-radius: 0.5em;
          border-top-right-radius: 0.5em;
        }
        a:last-of-type {
          border-bottom-left-radius: 0.5em;
          border-bottom-right-radius: 0.5em;
          border-bottom: 0.125rem solid white;
        }
        div {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          a {
            background: var(--tuatara-900);
            border-color: var(--tuatara-700) !important;
          }
          a:hover {
            background-color: var(--tuatara-800) !important;
          }
        }
      </style>
    `
  }
}

customElements.define("security-group", SecurityGroupComponent)

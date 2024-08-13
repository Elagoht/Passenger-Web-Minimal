import { getEntry } from "../services/dataServices.js";

class PassphraseEntryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const platform = this.getAttribute("platform");
    const identity = this.getAttribute("identity");
    const uuid = this.getAttribute("uuid");

    this.shadowRoot.innerHTML = `
      <div>
        <h2>${platform}</h2>

        <button id="identity">🆔</button>
        <button id="passphrase">🔑</button>
        <a id="edit" href="/vault/${uuid}">✍🏻</a>
      </div>

      <style>
        div {
          padding-left: 1rem;
          border-radius: 0.5rem;
          background: var(--tuatara-50);
          color: var(--tuatara-950);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        h2 {
          flex-grow: 1;
          margin: 0;
        }

        #edit {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        #identity {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }

        button, a {
          text-decoration: none;
          width: 3rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          border: none;
          background: white;
          color: var(--tuatara-900);
          cursor: pointer;
          transition: background 0.1s ease-in-out;
        }

        button:hover, a:hover {
          background: var(--tuatara-200);
        }

        @media (prefers-color-scheme: dark) {
          div {
            background: var(--tuatara-950);
            color: var(--tuatara-50);
          }
          button, a {
            background: var(--tuatara-900);
            color: var(--tuatara-100);
          }
          button:hover, a:hover {
            background: var(--tuatara-800);
          }
        }
      </style>
    `;

    this.shadowRoot.querySelector("#identity").addEventListener("click", () => {
      navigator.clipboard.writeText(identity);
    });

    this.shadowRoot.querySelector("#passphrase").addEventListener("click", () => {
      getEntry(uuid).then((response) => {
        if (response.ok) response.json()
          .then((data) => navigator.clipboard.writeText(data.passphrase))
      })
    })
  }
}

customElements.define("passphrase-entry", PassphraseEntryComponent);

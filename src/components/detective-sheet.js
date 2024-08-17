class DetectiveSheetComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    const title = this.getAttribute("title") || "Report"
    const description = this.getAttribute("description") || ""

    this.shadowRoot.innerHTML = `
      <fieldset>
        <legend>
          ${title && `<em>${title}</em>`}
        </legend>

        <container>
          <title-bar>
            ${description && `<description>${description}</description>`}

            <content>
              <slot></slot>
            </content>
          </title-bar>
        </container>
      </fieldset>

      <style>
        fieldset {
          padding: 0.5rem;
          background: var(--tuatara-50);
          border: 0.125rem solid var(--tuatara-200);
          border-radius: 1rem;
          border: none;
          margin: 1rem 0;
          align-self: start;
          width: 100%;
        }
        legend {
          font-size: 1.25rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          background: var(--tuatara-50);
          border-radius: 0.5rem;
        }
        content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(calc(50% - 1rem), 1fr));
          gap: 0.5rem;
        }
        title-bar {
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        container {
          display: flex;
          flex-direction: column;
          border-radius: 0.5rem;
          background: var(--tuatara-100);
          gap: 0.5rem;
        }
        description {
          margin-bottom: 0.5rem;
        }

        @media (prefers-color-scheme: dark) {
          fieldset {
            background: var(--tuatara-900);
          }
          legend {
            background: var(--tuatara-900);
          }
          container {
            background: var(--tuatara-1000);
          }
        }
      </style>
    `
  }
}

customElements.define("detective-sheet", DetectiveSheetComponent)

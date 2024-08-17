class NewsPaperDataLeakArticle extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    this.isExpanded = false

    this.render()
  }

  setExpanded(expanded) {
    this.isExpanded = expanded
    this.render()
  }

  render() {
    const title = this.getAttribute("title") || "News"
    const name = this.getAttribute("name") || ""
    const logoPath = this.getAttribute("logo-path") || ""
    const domain = this.getAttribute("domain") || ""
    const pwnCount = this.getAttribute("pwn-count") || ""
    const breachDate = this.getAttribute("breach-date") || ""
    const dataClassesString = this.getAttribute("data-classes") || "[]"

    let dataClasses
    try { dataClasses = JSON.parse(dataClassesString) }
    catch { dataClasses = [] }

    this.shadowRoot.innerHTML = `
      <article>
        <h3>${title}</h3>

        ${title.replaceAll(" ", "") !== name.replaceAll(" ", "") ? `<h4>${name}</h4>` : ""}

        <div>
          <img
            src=${logoPath}
            alt=${name}
            width="64"
            height="64"
          />

          <p class="${this.isExpanded ? "expanded-p" : "collapsed-p"}">
            <slot></slot>
          </p>

          <button id="expander">
            ${this.isExpanded ? "Show less 🔼" : "Show more 🔽"}
          </button>

          <div id="clear"></div>
        </div>

        <dl style="display: flex; flex-wrap: wrap; margin: 0; margin-top: auto;">
          ${[{
        key: "Domain",
        value: domain.startsWith("http")
          ? new URL(domain).toString()
          : domain
            ? new URL("https://" + domain).toString()
            : "N/A"
      }, {
        key: "Leak Count",
        value: pwnCount || "N/A"
      }, {
        key: "Leak Date",
        value: new Date(breachDate).toLocaleDateString() || "N/A"
      }].map((item) => `<div class="data">
            <dt style="margin: 0;"><b>${item.key}</b></dt>
            <dd style="margin:0; padding: 0;">${item.value}</dd>
          </div>`
      ).join("")}
        </dl>

        <ul>
          ${dataClasses.map((dataClass) => `<li>${dataClass}</li>`).join("\n")}
        </ul>
      </article>

      <style>
      :host {
        height: 100%;
        width: 100%;
        display: flex;
      }
      article {
        padding: 1rem;
        background: var(--tuatara-50);
        border-radius: 0.5rem;
        text-align: justify;
        display: flex;
        flex-direction: column;
      }
      h3, h4 {
        color: var(--creamcan-500) !important;
        margin-top: 0;
      }
      a { color: var(--leaf-500) !important; }
      img {
        float: left;
        margin-right: 1rem;
        aspect-ratio: 1;
        object-fit: contain;
      }
      .collapsed-p, .expanded-p {
        hyphens: auto;
        transition: all 300ms ease-in-out;
        overflow: hidden;
        margin-top: 0rem;
      }
      .collapsed-p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #expander {
        background: none;
        filter: grayscale(100%);
        border: none;
        color: var(--tuatara-500);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        text-align: right;
        cursor: pointer;
        transition: all 300ms ease-in-out;
      }
      #expander:hover {
        color: var(--creamcan-500);
      }
      #clear { clear: both; }
      .data {
        flex-grow: 1;
        background: var(--tuatara-200);
        padding: 0.5rem;
        margin: 0.25rem;
        border-radius: 0.5rem;
        border: 0.125rem solid var(--tuatara-300);
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        padding: 0.25rem 0.5rem;
        margin: 0.25rem;
        border-radius: 0.5rem;
        border: 0.125rem solid var(--tuatara-300);
        text-align: center;
        flex-grow: 1;
      }

      /* Dark Mode */
      @media (prefers-color-scheme: dark) {
        article {
          background: var(--tuatara-900);
        }
        h3, h4 { color: var(--tuatara-50); }
        .data {
          background: var(--tuatara-800);
          border-color: var(--tuatara-700);
        }
        li {
          border-color: var(--tuatara-700);
        }
      }
      </style>
    `

    this.shadowRoot.querySelector("#expander").addEventListener("click", () => this.setExpanded(!this.isExpanded))
  }
}

customElements.define("newspaper-page", NewsPaperDataLeakArticle)

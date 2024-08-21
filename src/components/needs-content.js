class NeedsContentsComponent extends HTMLElement {
  constructor() {
    super()

    this.state = {
      content: "",
      isLoading: true,
      isError: false,
    }

    this.render()
  }

  static get observedAttributes() {
    return ["from"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "from" && this.hasAttribute("from") && oldValue !== newValue)
      this.fetchContent(newValue)
  }

  async fetchContent(url) {
    try {
      const response = await fetch(url)
      if (!response.ok)
        throw new Error("Network response was not ok")
      // Expecting an innerHTML content
      const content = await response.text()
      this.state = {
        ...this.state,
        content,
        isLoading: false
      }
      this.removeAttribute("from")
    } catch (error) {
      this.state = {
        ...this.state,
        isError: true,
        isLoading: false
      }
    }
    this.render()
  }

  render() {
    const { content, isLoading, isError } = this.state

    this.innerHTML = `
      ${isError ? "Error loading content" : ""}
      ${(isLoading && !isError) ? "Loading..." : ""}
      ${(!isLoading && !isError) ? content : ""}
    `
  }
}

customElements.define("needs-content", NeedsContentsComponent)

import { exportToCSV } from "../services/dataServices.js"
import Cookie from "../utilities/cookie.js"

const exportFormAction = async (event) => {
  event.preventDefault()

  const form = new FormData(event.target)
  const type = form.get("type")

  try {
    const response = await exportToCSV(type)

    if (!response.ok) {
      const errorMessage = (await response.json()).message
      return document.getElementById("error-message").innerText = errorMessage
    }

    if (response.status === 401) {
      Cookie.delete("accessToken")
      return window.location.href = "/login"
    }

    const csvFile = await response.blob()

    const virtualAnchor = document.createElement("a")
    virtualAnchor.href = window.URL.createObjectURL(csvFile)
    virtualAnchor.download = `passenger-${type}-export-${new Date().toISOString()}.csv`

    document.body.appendChild(virtualAnchor)
    virtualAnchor.click()
    document.body.removeChild(virtualAnchor)

    window.URL.revokeObjectURL(virtualAnchor.href)
  } catch (error) {
    document.getElementById("error-message").innerText =
      "An error occurred while creating the file. Please try again later."
  }
}

window.exportFormAction = exportFormAction

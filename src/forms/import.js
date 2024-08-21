import { importFromCSV } from "../services/dataServices.js"
import Cookie from "../utilities/cookie.js"

const importFormAction = async (event) => {
  event.preventDefault()

  try {
    const response = await importFromCSV(new FormData(event.target))
    const responseMessage = await response.json()

    if (!response.ok)
      return document.getElementById("error-message").innerText =
        responseMessage.message

    if (response.status === 401) {
      Cookie.delete("accessToken")
      return window.location.href = "/login"
    }

    document.getElementById("success-message").innerText =
      JSON.stringify(responseMessage)

  } catch (error) {
    document.getElementById("error-message").innerText =
      "An error occurred while creating the file. Please try again later."
  }
}

window.importFormAction = importFormAction

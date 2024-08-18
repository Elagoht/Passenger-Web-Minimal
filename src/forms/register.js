import { postRegister } from "../services/authServices.js"

const registerFormAction = async (event) => {
  event.preventDefault()

  const form = new FormData(event.target)

  const username = form.get("username")
  const passphrase = form.get("passphrase")

  if (typeof username !== "string" || typeof passphrase !== "string")
    return alert("Invalid input")

  const response = await postRegister({ username, passphrase })

  const data = await response.json()

  if (!response.ok)
    return document.getElementById("error-message").innerText = data.message

  window.location.href = "/dashboard"
}

window.registerFormAction = registerFormAction
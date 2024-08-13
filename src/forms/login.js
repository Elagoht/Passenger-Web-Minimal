import { postLogin } from "../services/authServices.js"
import Cookie from "../utilities/cookie.js"

const loginFormAction = async (event) => {
  event.preventDefault()

  const form = new FormData(event.target)

  const username = form.get("username")
  const passphrase = form.get("passphrase")

  if (typeof username !== 'string' || typeof passphrase !== 'string')
    return alert("Invalid input")

  const response = await postLogin({
    username: username,
    passphrase: passphrase
  })

  const data = await response.json()

  if (!response.ok)
    return document.getElementById("error-message").innerText = data.message

  Cookie.set("accessToken", data.accessToken)
  window.location.href = "/dashboard"

}

window.loginFormAction = loginFormAction
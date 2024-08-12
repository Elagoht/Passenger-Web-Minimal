import { postLogin } from "../services/authServices.js"

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

  if (!response.ok) return console.log(data)

  document.cookie = `accessToken=${data.accessToken}; path=/`
  window.location.href = "/dashboard"
}

export default loginFormAction
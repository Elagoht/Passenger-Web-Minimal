import { putEntry } from "../services/dataServices.js"
import Cookie from "../utilities/cookie.js"

const updateEntryFormAction = async (event) => {
  event.preventDefault()

  const form = new FormData(event.target)

  const id = window.location.pathname.split("/").pop()
  const platform = form.get("platform")
  const identity = form.get("identity")
  const url = form.get("url")
  const passphrase = form.get("passphrase")
  const notes = form.get("notes")

  const response = await putEntry({
    id, platform, identity, url, passphrase, notes
  })

  const data = await response.json()

  if (!response.ok)
    return document.getElementById("error-message").innerText = data.message

  if (response.status === 401) {
    Cookie.delete("accessToken")
    return window.location.href = "/login"
  }

  let countdown = 3
  setInterval(() => {
    if (countdown === 0)
      return window.location.href = "/vault"

    document.getElementById("success-message").innerText = `Success. Redirecting in ${countdown} seconds`
    --countdown
  }, 1000)
}

window.updateEntryFormAction = updateEntryFormAction
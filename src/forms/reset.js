import { patchReset } from "../services/authServices.js"

const resetFormAction = async (event) => {
  event.preventDefault()

  const form = new FormData(event.target)

  const oldPassphrase = form.get("oldPassphrase")
  const newPassphrase = form.get("newPassphrase")

  if (typeof oldPassphrase !== "string" || typeof newPassphrase !== "string")
    return alert("Invalid input")

  const response = await patchReset({ oldPassphrase, newPassphrase })

  const data = await response.json()

  if (!response.ok)
    return document.getElementById("error-message").innerText = data.message

  let countdown = 3
  setInterval(() => {
    if (countdown === 0)
      return window.location.href = "/settings"

    document.getElementById("success-message").innerText = `Success. Redirecting in ${countdown} seconds`
    --countdown
  }, 1000)
}

window.resetFormAction = resetFormAction
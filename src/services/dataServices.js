
import Cookie from "../utilities/cookie.js"

export const postEntry = (data) => fetch("http://127.0.0.1:3000/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  },
  body: JSON.stringify(data)
})

export const getEntry = (data) => fetch(`http://127.0.0.1:3000/fetch/${data}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  }
})

export const putEntry = (data) => fetch(`http://127.0.0.1:3000/update/${data.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  },
  body: JSON.stringify({
    platform: data.platform,
    identity: data.identity,
    url: data.url,
    passphrase: data.passphrase,
    notes: data.notes
  })
})

export const deleteEntry = (data) => fetch(`http://127.0.0.1:3000/delete/${data}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  }
})
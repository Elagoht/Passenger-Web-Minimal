
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

export const getEntry = (data) => fetch("http://127.0.0.1:3000/entry", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  },
  body: JSON.stringify(data)
})

export const putEntry = (data) => fetch("http://127.0.0.1:3000/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(data)
})

export const deleteEntry = (data) => fetch("http://127.0.0.1:3000/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  },
  body: JSON.stringify(data)
})
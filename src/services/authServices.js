import Cookie from "../utilities/cookie.js"

export const postRegister = (data) => fetch("http://127.0.0.1:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(data)
})

export const postLogin = (data) => fetch("http://127.0.0.1:3000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(data)
})

export const patchReset = (data) => fetch("http://127.0.0.1:3000/reset", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${Cookie.get("accessToken")}`
  },
  body: JSON.stringify(data)
})
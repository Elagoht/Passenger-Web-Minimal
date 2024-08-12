const logout = () => {
  document.cookie = "accessToken=; Max-Age=0; path=/;SameSite=None; Secure"
  window.location.href = "/login"
}

window.logout = logout
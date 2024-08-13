class Cookie {
  static set = (name, value, minutes = 10, path = '/') => {
    const date = new Date()
    date.setTime(date.getTime() + (minutes * 60 * 1000))
    document.cookie = `${name
      }=${encodeURIComponent(value)
      };expires=${date.toUTCString()
      };path=${path
      };SameSite=Strict; Secure`
  }

  static get = (name) => {
    const nameEquals = `${name}=`
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.indexOf(nameEquals) === 0)
        return decodeURIComponent(cookie.substring(nameEquals.length))
    }
    return null
  }

  static delete = (name, path = '/') =>
    this.set(name, '', -1, path)
}

export default Cookie
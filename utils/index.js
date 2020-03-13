import Cookie from 'js-cookie'

export const saveUserData = (
  { idToken, expiresIn },
  { email, avatar, role }
) => {
  const tokenExpiration = Date.now() + expiresIn * 1000
  localStorage.setItem('jwt', idToken)
  localStorage.setItem('expiresIn', tokenExpiration)
  localStorage.setItem('user', email)
  localStorage.setItem('avatar', avatar)
  localStorage.setItem('role', role)
  Cookie.set('jwt', idToken)
  Cookie.set('expiresIn', tokenExpiration)
  Cookie.set('user', email)
  Cookie.set('avatar', avatar)
  Cookie.set('role', role)
}

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))
  const expiresInCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('expiresIn='))
  const userCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('user='))
  const avatarCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('avatar='))
  const roleCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('role='))

  if (
    !jwtCookie ||
    !expiresInCookie ||
    !userCookie ||
    !avatarCookie ||
    !roleCookie
  )
    return

  const jwt = jwtCookie.split('=')[1]
  const expiresIn = expiresInCookie.split('=')[1]
  const user = userCookie.split('=')[1]
  const avatar = avatarCookie.split('=')[1]
  const role = roleCookie.split('=')[1]

  return { jwt, expiresIn, user, avatar, role }
}

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const jwt = localStorage.getItem('jwt')
    const expiresIn = localStorage.getItem('expiresIn')
    const user = localStorage.getItem('user')
    const avatar = localStorage.getItem('avatar')
    const role = localStorage.getItem('role')

    return { jwt, expiresIn, user, avatar, role }
  }
}

export const clearUserData = () => {
  if (!process.server) {
    localStorage.removeItem('jwt')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('user')
    localStorage.removeItem('avatar')
    localStorage.removeItem('role')
  }
  Cookie.remove('jwt')
  Cookie.remove('expiresIn')
  Cookie.remove('user')
  Cookie.remove('avatar')
  Cookie.remove('role')
}

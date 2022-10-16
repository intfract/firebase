const form = document.querySelector('#join')
form.addEventListener('submit', e => {
  e.preventDefault()
  const username = form.username.value.trim()
  const email = form.email.value.trim()
  const password = form.password.value

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(`${username} joined the website using ${email}!`)
      form.reset()
      return cred.user.updateProfile({
        displayName: username
      })
    })
    .catch(error => {
      console.log(error)
      const code = error.code.split('/')[1]
      if (['email-already-in-use', 'invalid-email'].includes(code)) {
        form.email.value = ''
        form._x_dataStack[0].email = ''
        let x = code.split('-').join(' ')
        snack(x.charAt(0).toUpperCase() + x.slice(1) + '!', 'DISMISS')
      }
    })
})

const login = document.querySelector('#login')
login.addEventListener('submit', e => {
  e.preventDefault()

  const email = login.email.value
  const password = login.password.value

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(`${cred.user.email} logged in!`)

    login.reset()
  })
})

// auth.onAuthStateChanged(user => {
//   if (user) {
//     console.log(user.displayName, user.email)
//   } else {
//     console.log(`user signed out`)
//   }
// })

const logout = document.querySelector('#logout')
if (logout) {
  logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut()
  })
}
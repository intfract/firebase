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
    snack(`Logged in as ${user.email}!`, 'DISMISS')

    login.reset()
  }).catch(error => {
    console.log(error)
    login.email.value = ''
    login._x_dataStack[0].email = ''
    login.password.value = ''
    login._x_dataStack[0].password = ''
    snack('Wrong Credentials!', 'DISMISS')
  })
})

const logout = document.querySelector('#logout')
if (logout) {
  logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut()
  })
}
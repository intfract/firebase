const buttons = document.querySelectorAll('button:not(button[type=submit])')
const tags = document.querySelectorAll('.tag')

for (const button of buttons) {
  button.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false })')
  button.setAttribute('onpointerup', 'ripplet.clear(this)')
  button.setAttribute('onpointerleave', 'ripplet.clear(this)')
}

for (const tag of tags) {
  tag.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false })')
  tag.setAttribute('onpointerup', 'ripplet.clear(this)')
  tag.setAttribute('onpointerleave', 'ripplet.clear(this)')
}

let field = {}

field.username = document.querySelector('form .username .text input')
field.email = document.querySelector('form .email .text input')
field.password = document.querySelector('form .password .text input')

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
    })
})
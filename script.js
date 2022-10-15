const buttons = document.querySelectorAll('button:not(button[type=submit])')
const tags = document.querySelectorAll('.tag')

function ripple() {
  for (const button of buttons) {
    if (Array.from(button.classList).includes('soft')) {
      button.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false, color: "#4865f2" })')
    } else {
      button.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false })')
    }
    button.setAttribute('onpointerup', 'ripplet.clear(this)')
    button.setAttribute('onpointerleave', 'ripplet.clear(this)')
  }

  for (const tag of tags) {
    tag.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false })')
    tag.setAttribute('onpointerup', 'ripplet.clear(this)')
    tag.setAttribute('onpointerleave', 'ripplet.clear(this)')
  }
}

function pulse(query) {
  const e = document.querySelector(query)
  e.setAttribute('onpointerdown', 'ripplet(arguments[0], { clearing: false, color: "#4865f2" })')
  e.setAttribute('onpointerup', 'ripplet.clear(this)')
  e.setAttribute('onpointerleave', 'ripplet.clear(this)')
}

ripple()

function snack(label, action) {
  const html = `<span class="snack">${label}</span>
  <span class="bar"><button class="soft" onclick="dismiss(this)">${action}</button></span>`
  let e = document.createElement('div')
  e.setAttribute('class', 'snackbar')
  e.innerHTML = html
  document.body.appendChild(e)
  pulse('.soft')
  window.setTimeout(() => {
    e.classList.add('faded')
    window.setTimeout(() => e.remove(), 1000)
  }, 10000)
}

function dismiss(e) {
  const bar = e.closest('.snackbar')
  bar.classList.add('faded')
  window.setTimeout(() => bar.remove(), 1000)
}

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
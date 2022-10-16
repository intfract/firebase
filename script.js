function ripple() {
  const buttons = document.querySelectorAll('button:not(button[type=submit])')
  const tags = document.querySelectorAll('.tag')

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

auth.onAuthStateChanged(user => {
  if (user) {
    const btns = document.querySelectorAll('nav .actions a')
    for (let i = 0; i < btns.length; i++) {
      btns[i].remove()
    }
    const e = document.createElement('a')
    e.setAttribute('id', 'logout')
    e.setAttribute('class', 'btn')
    document.querySelector('nav .actions').appendChild(e)
    e.innerHTML = 'Exit'
    e.addEventListener('click', e => {
      e.preventDefault()
      auth.signOut()
      document.querySelector('nav .actions').innerHTML = `
      <a class="btn" href="../join/">Login</a>
      <a class="btn" href="../join/">Join</a>
      `
    })
  } else {
    console.log(`user signed out`)
  }
})
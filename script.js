function nav(a) {
  const menu = []
  for (const item of a) {
    menu.push(`<a href="../${(item === 'home') ? '' : item}/" class="link">${item.toUpperCase()}</a>`)
  }
  document.querySelector('nav').innerHTML = `
  <div class="logo">
    <span>INTFRACT</span>
  </div>
  <div class="menu">
    ${menu.join('')}
  </div>
  <div class="actions">
    <a class="btn" href="../join/">Login</a>
    <a class="btn" href="../join/">Join</a>
  </div>
  <div class="toggle center"
    onclick="this.classList.toggle('active');document.querySelector('.menu').classList.toggle('active')">
    <svg class="ham hamRotate ham4" viewBox="0 0 100 100" width="50">
      <path class="line top"
        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
      <path class="line middle" d="m 70,50 h -40" />
      <path class="line bottom"
        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
    </svg>
  </div>
  `
}

nav(['home', 'about', 'courses'])

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
      snack(`Logged out!`, 'DISMISS')
      document.querySelector('nav .actions').innerHTML = `
      <a class="btn" href="../join/">Login</a>
      <a class="btn" href="../join/">Join</a>
      `
    })
  } else {

  }
})
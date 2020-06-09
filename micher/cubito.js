//tamaño del lienzo
const settings = {
  DOT: 0.7,
  SPEED: 100,
}

//Color del cuadro y del lienzo
const theme = {
  PRIMARY: '#7DCE9A',
  BACKGROUND: '#211020'
}

const getSize = size => {
  return `${size * settings.DOT}vmin`
}

//Parametros del cubo dentro del lienzo
class Cubo {
  constructor() {
    this.height = 15
    this.width = 15
    this.left = 50
    this.altitude = 0

    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    this.el.style.bottom = 0
    this.el.style.left = getSize(this.left)
    this.el.style.height = getSize(this.height)
    this.el.style.width = getSize(this.width)
    this.el.style.background = theme.PRIMARY
  }

  // Parametros de movimiento del cubo
  jump() {
    if (this.altitude > 0) return
    this.goUp()
  }

  goUp() {
    if (this.altitude >= 30) return this.goDown()
    this.altitude++
    setTimeout(this.goUp.bind(this), 10)
  }

  goDown() {
    if (this.altitude === 0) return
    this.altitude--
    setTimeout(this.goDown.bind(this), 10)
  }

  render() {
    this.el.style.transform = `translateY(-${getSize(this.altitude)})`
  }
}

// Parametros del obstaculo dentro del lienzo
class Foe {
  constructor() {
    this.height = 19
    this.width = 9
    this.left = 600
    this.distance = 0

    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    this.el.style.bottom = 0
    this.el.style.left = getSize(this.left)
    this.el.style.height = getSize(this.height)
    this.el.style.width = getSize(this.width)
    this.el.style.background = theme.PRIMARY
  }

  // distancia del obstaculo
  move() {
    this.distance++
    setTimeout(this.move.bind(this), 5)
  }

  render() {
    this.el.style.transform = `translateX(-${getSize(this.distance)})`
  }
}

const SCORE_KEY = 'TREX_HIGHSCORE'

// Marcador de puntos.
class ScoreBoard {
  constructor() {
    this.puntaje = 0
    this.maximopuntaje = localStorage.getItem(SCORE_KEY) || 0

    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    this.el.style.top = getSize(2)
    this.el.style.right = getSize(2)
    this.el.style.color = theme.PRIMARY
  }

  countUp() {
    this.puntaje++
  }

  save() {
    if (this.puntaje > this.maximopuntaje) {
      localStorage.setItem(SCORE_KEY, this.puntaje)
    }
  }

  render() {
    this.el.innerHTML = `Score: ${this.puntaje} | Hi: ${this.maximopuntaje}`
  }
}

//Ancho y altura del lienzo
class Stage {
  constructor(el) {
    this.height = 118
    this.width = 306

    this.el = document.createElement('div')
    this.el.style.position = 'relative'
    this.el.style.height = getSize(this.height)
    this.el.style.width = getSize(this.width)
    this.el.style.overflow = 'hidden'
    this.el.style.background = theme.BACKGROUND
    el.appendChild(this.el)
  }

  //El nodo que se quiere insertar
  add(child) {
    this.el.appendChild(child.el)
  }
}

//El elemento a seleccionar
class App {
  constructor(selector) {
    this.el = document.querySelector(selector)
  }

  //parametros de inicio
  init() {
    this.foes = []
    this.loop = null
    this.stage = new Stage(this.el)
    this.Cubo = new Cubo()
    this.stage.add(this.Cubo)
    this.scoreBoard = new ScoreBoard()
    this.stage.add(this.scoreBoard)
    this.initListeners()
    this.start()
    this.generateFoe()
    this.addScore()
  }
  //evento del objeto
  initListeners() {
    window.addEventListener('keydown', this.handleInput.bind(this))
  }

  handleInput(event) {
    if (event.key === 'ArrowUp') {
      this.Cubo.jump()
    }
    return
  }

  generateFoe() {
    if (this.loop === null) return
    const foe = new Foe()
    this.stage.add(foe)
    this.foes.push(foe)
    foe.move()
    setTimeout(this.generateFoe.bind(this), 2000)
  }

  addScore() {
    if (this.loop === null) return
    this.scoreBoard.countUp()
    setTimeout(this.addScore.bind(this), 500)
  }

  tick() {
    this.Cubo.render()
    this.scoreBoard.render()
    this.foes.forEach(foe => {
      foe.render()
      if (this.collision(this.Cubo, foe)) {
        console.log('ouch')
        this.stop()
        
      }
    })
  }

  start() {
    this.loop = setInterval(this.tick.bind(this), 5)
  }

  stop() {
    this.scoreBoard.save()
    clearInterval(this.loop)
    this.loop = null
  }

  collision(a, b) {
    if (a.altitude > b.height) return false
    if (a.left + a.width < b.left - b.distance) return false
    if (a.left > b.left - b.distance + b.width) return false
    return true
  }
}
const app = new App('#app')
app.init()

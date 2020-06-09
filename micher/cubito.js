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

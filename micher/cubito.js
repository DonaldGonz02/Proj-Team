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

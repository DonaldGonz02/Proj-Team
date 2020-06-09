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
import { grassImg, dirtImg, glassImg, logImg, woodImg } from './images'

import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

const groundTexture = new TextureLoader().load(grassImg)
// Repetimos para vertical y horizontal
groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping
groundTexture.magFilter = NearestFilter

const [
  grassTexture,
  dirtTexture,
  logTexture,
  glassTexture,
  woodTexture
] = [grassImg, dirtImg, logImg, glassImg, woodImg].map(img => {
  const texture = new TextureLoader().load(img)
  // Le indicamos el filtro para mostrar la imagen
  // Agranda la imagen y muestra los píxeles más cercanos
  texture.magFilter = NearestFilter
  return texture
})

export { groundTexture, grassTexture, dirtTexture, logTexture, glassTexture, woodTexture }

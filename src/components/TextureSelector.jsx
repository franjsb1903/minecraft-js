import { useEffect } from 'react'
import { useStore } from '../hooks/useStore'
import { useKeyboard } from '../hooks/useKeyboard'
import * as images from '../images/images'

export const TextureSelector = () => {
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

  const { dirt, glass, grass, wood, log } = useKeyboard()

  useEffect(() => {
    const options = {
      dirt,
      glass,
      grass,
      wood,
      log
    }
    const selectedTexture = Object
      .entries(options)
      .find(([_, isEnabled]) => isEnabled)

    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, grass, glass, log, wood])

  return (
    <div className='texture-selector'>
      {
        Object
          .entries(images)
          .map(([imgKey, img]) => {
            return (
              <img
                key={imgKey}
                alt={imgKey}
                src={img}
                className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
              />
            )
          })
      }
    </div>
  )
}

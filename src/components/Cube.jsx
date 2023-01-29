import { useState } from 'react'
import { useBox } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import * as textures from '../images/textures'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube])

  const activeTexture = textures[texture + 'Texture']

  const handleClickCube = event => {
    event.stopPropagation()

    const { button } = event

    if (button === 0) {
      removeCube(id)
      return
    }

    if (button !== 2) return

    const clickedFace = Math.floor(event.faceIndex / 2)
    const { x, y, z } = ref.current.position

    if (clickedFace === 0) {
      addCube(x + 1, y, z)
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z)
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z)
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z)
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1)
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1)
    }
  }

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={handleClickCube}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        transparent
        opacity={texture === 'glass' ? 0.6 : 1}
        color={isHovered ? 'grey' : 'white'}
        map={activeTexture}
        attach='material'
      />
    </mesh>
  )
}

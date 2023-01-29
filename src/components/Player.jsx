import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'

import { Vector3 } from 'three'

import { useKeyboard } from '../hooks/useKeyboard'

const CHARACTER_SPEED = 4
const CHARACTER_JUMP = 3

export const Player = () => {
  const {
    moveBackward,
    moveForward,
    moveLeft,
    moveRight,
    jump
  } = useKeyboard()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0]
  }))

  const pos = useRef([0, 0, 0])
  // Nos suscribimos a la posición
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p
    })
  }, [api.position])

  const vel = useRef([0, 0, 0])
  // Nos suscribimos a la velocidad
  useEffect(() => {
    api.velocity.subscribe(v => {
      vel.current = v
    })
  }, [api.velocity])

  useFrame(() => {
    // Copiamos la posición de la cámara a la actual del personaje
    camera.position.copy(
      new Vector3(
        pos.current[0],
        pos.current[1],
        pos.current[2]
      )
    )

    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) // Velocidad de movimiento
      .applyEuler(camera.rotation) // Rotamos la dirección según la cámara

    api.velocity.set(
      direction.x,
      vel.current[1], // Velocidad para el salto
      direction.z
    )

    // Evitamos hacer el salto cuando la velocidad en Y es mayor a 0.05
    if (jump && Math.abs(vel.current[1]) < 0.02) {
      api.velocity.set(
        vel.current[0],
        CHARACTER_JUMP,
        vel.current[2]
      )
    }
  })

  return (
    <mesh ref={ref} />
  )
}

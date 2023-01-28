import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'

export function Ground () {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotamos el plano para verlo horizontal (PI = 180º)
    position: [0, -0.5, 0]
  }))

  return (
    <mesh ref={ref}>
      {/* Atamos el plano a la malla con la propiedad attach y definimos el material */}
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}

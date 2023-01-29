import { usePlane } from '@react-three/cannon'
import { useStore } from '../hooks/useStore'
import { groundTexture } from '../images/textures'

export function Ground () {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotamos el plano para verlo horizontal (PI = 180º)
    position: [0, -0.5, 0]
  }))

  const [addCube] = useStore(state => [state.addCube])

  groundTexture.repeat.set(100, 100)

  const handleClickGround = event => {
    event.stopPropagation()
    const [x, y, z] = Object.values(event.point).map(value => Math.ceil(value))

    addCube(x, y, z)
  }

  return (
    <mesh ref={ref} onClick={handleClickGround}>
      {/* Atamos el plano a la malla con la propiedad attach y definimos el material */}
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}

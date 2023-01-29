import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const useStore = create(set => ({
  texture: 'dirt',
  cubes: getLocalStorage('world') || [],
  addCube: (x, y, z) => {
    set(state => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          position: [x, y, z],
          texture: state.texture
        }
      ]
    }))
  },
  removeCube: (id) => {
    set(state => ({
      cubes: state.cubes.filter(cube => cube.id !== id)
    }))
  },
  setTexture: (texture) => {
    set(() => ({ texture }))
  },
  saveWorld: () => {
    set(state => {
      setLocalStorage('world', state.cubes)
      return state
    })
  },
  resetWorld: () => {
    set(() => {
      setLocalStorage('world', [])
      return { cubes: [] }
    })
  }
}))

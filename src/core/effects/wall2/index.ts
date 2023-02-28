import vert from './glsl/vert.glsl?raw'
import frag from './glsl/frag.glsl?raw'
import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const lineText = textureLoader.load('/map/line.png')
const bgText = textureLoader.load('/map/bg.png')

export function getShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0.0 //时间
      },
      colorTexture: {
        value: lineText
      },
      colorTexture1: {
        value: bgText
      }
    },
    vertexShader: vert,
    fragmentShader: frag,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide
    //polygonOffset:true
  })
}

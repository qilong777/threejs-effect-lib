import vert from './glsl/scanLine.vert.glsl?raw'
import frag from './glsl/scanLine.frag.glsl?raw'
import * as THREE from 'three'
/**
 * 参考：https://zhuanlan.zhihu.com/p/258426308
 *
 */

export function getScanLineShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0.0 //时间
      },
      baseColor: {
        value: new THREE.Color(1.0, 0.0, 0.0) //材质本身颜色
      },
      _FlashColor: {
        value: new THREE.Color(1.0, 1.0, 1.0) //闪光条的光颜色
      },
      _Angle: {
        value: 45.0 // 闪光条的角度，范围是0到180°
      },
      _Width: {
        value: 0.5 // 闪光条宽度，范围是0到1.0
      }
    },
    vertexShader: vert,
    fragmentShader: frag,
    side: THREE.DoubleSide,
    depthTest: true,
    transparent: true
  })
}

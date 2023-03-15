// 3D饼图配置

import { traverseSetParams } from '@/common/objectProcess'
import type { MeshStandardMaterialParameters } from 'three'

export interface IPie3DItem {
  key: string
  value: number
  materialParams: MeshStandardMaterialParameters
  visible: boolean
}

export class Pie3DItem implements IPie3DItem {
  key = ''
  value = 0
  materialParams = {}
  visible = true
  constructor(options: Partial<IPie3DItem>) {
    traverseSetParams(this, options)
  }
}

export interface IPie3D {
  radius: number
  holeRatio: number
  height: number
  isHeightSame: boolean
  data: IPie3DItem[]

  curveSegments: number
}

export class Pie3D implements IPie3D {
  // 半径
  radius = 10
  // 中间洞的比例
  holeRatio = 0.5
  // 高度
  height = 10
  // 是否高度相同
  isHeightSame = true
  // 数据
  data = []

  // 曲线分段数
  curveSegments = 32

  constructor(options: Partial<IPie3D>) {
    traverseSetParams(this, options)
  }
}

import type App from '@/core/App'
import type { BaseEffectShow } from '@/core/effectShow/BaseEffectShow'
import { RadarEffectShow } from '@/core/effectShow/RadarEffectShow'

export class Stage {
  private effectShowMap: Record<string, BaseEffectShow> = {} // 特效显示映射表
  private app: App

  private currEffectShow?: BaseEffectShow
  constructor(app: App) {
    this.app = app
    this.init()
  }

  private init() {
    this.effectShowMap = {
      radar: new RadarEffectShow(this.app)
    }
  }

  showEffect(effectName: string) {
    if (effectName === this.currEffectShow?.name) {
      return
    }

    this.currEffectShow?.dispose()

    const effectShow = this.effectShowMap[effectName]
    effectShow?.init()

    this.currEffectShow = effectShow
  }

  dispose() {
    this.currEffectShow?.dispose()
  }
}

import type App from '@/core/App'
import type { BaseEffectShow } from '@/core/effectShow/BaseEffectShow'
import * as EffectShow from '@/core/effectShow'

export class Stage {
  private effectShowMap: Record<string, BaseEffectShow> = {} // 特效显示映射表
  private app: App

  private currEffectShow?: BaseEffectShow
  constructor(app: App) {
    this.app = app
    this.init()
  }

  private init() {
    for (const key in EffectShow) {
      const Cons = (EffectShow as any)[key]
      this.effectShowMap[Cons.effectName] = new Cons(this.app)
    }
  }

  showEffect(effectName: string) {
    if (effectName === this.currEffectShow?.getEffectName()) {
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

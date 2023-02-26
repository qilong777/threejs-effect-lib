import type App from '../App'

export abstract class BaseEffectShow {
  app: App
  static effectName: string = ''
  constructor(app: App) {
    this.app = app
  }
  init() {
    console.log('BaseEffectShow init')
  }

  update() {
    console.log('BaseEffectShow update')
  }

  dispose() {
    console.log('BaseEffectShow dispose')
  }

  getEffectName() {
    return BaseEffectShow.effectName
  }
}

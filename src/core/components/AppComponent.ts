import type { App } from './../App'
import { Component } from 'ecsy'

interface Props {
  app: App
}

export class AppComponent extends Component<Props> {
  constructor() {
    super()
  }
}

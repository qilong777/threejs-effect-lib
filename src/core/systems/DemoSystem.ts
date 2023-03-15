import { AppComponent } from './../components/AppComponent'
import { System } from 'ecsy'

export class DemoSystem extends System {
  static queries = {
    app: {
      components: [AppComponent]
    }
  }
  execute(delta: number, time: number) {
    console.log(this.queries.app.results[0])
  }
}

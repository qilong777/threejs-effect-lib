<script setup lang="ts">
import * as EffectShow from '@/core/effectShow'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { App } from '../../core/App'
import { Stage } from './Stage'
interface MenuItem {
  name: string
}

let app!: App

const threeContainer = ref<HTMLCanvasElement | null>(null)
let stage!: Stage

const menuList: MenuItem[] = []
for (const key in EffectShow) {
  const Cons = (EffectShow as any)[key]
  menuList.push({
    name: Cons.effectName
  })
}

// const entity = world.createEntity()
onMounted(() => {
  if (threeContainer.value) {
    app = new App(threeContainer.value)

    // world.registerComponent(AppComponent)
    // world.registerSystem(DemoSystem)

    // entity.addComponent(AppComponent, { app })

    // console.log(app);

    app.camera.position.set(0, 0, 1000)
    stage = new Stage(app)
    stage.showEffect(menuList[0].name)
  }
})

onBeforeUnmount(() => {
  app.dispose()
  // entity.remove()
  // world.unregisterSystem(DemoSystem)
})

const handleSelect = (index: string) => {
  stage.showEffect(menuList[Number(index)].name)
}
</script>

<template>
  <main>
    <div class="menu">
      <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item :index="index + ''" v-for="(item, index) in menuList" :key="item.name">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="three-container" ref="threeContainer"></div>
  </main>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

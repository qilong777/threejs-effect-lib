<script setup lang="ts">
import { onMounted, ref,onBeforeUnmount,reactive } from 'vue'
import App from '../../core/App'
import { Stage } from './Stage'

let app!: App

const threeContainer = ref<HTMLCanvasElement | null>(null)
let stage!:Stage

onMounted(() => {
  if (threeContainer.value) {
    app = new App(threeContainer.value)
    console.log(app);
    
    app.camera.position.set(0, 0, 1000)

    stage = new Stage(app)
    stage.showEffect('radar')

  }
})

onBeforeUnmount(() => {
  app.dispose()
})

const menuList  = [
  {
    name: '雷达',
    type: 'radar'
  },
  {
    name: '雷达1',
    type: 'radar1'
  }
]

const handleSelect = (index: string) => {
  stage.showEffect(menuList[Number(index)].type)
}

</script>

<template>
  <main>
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item :index="index+''" v-for="(item,index) in menuList" :key="item.name">
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="three-container" ref="threeContainer"></div>
  </main>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
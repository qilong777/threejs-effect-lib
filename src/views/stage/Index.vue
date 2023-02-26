<script setup lang="ts">
import { onMounted, ref,onBeforeUnmount } from 'vue'
import App from '../../core/App'
import { Stage } from './Stage'
import { SpreadRadarEffectShow, ScanRadarEffectShow } from '@/core/effectShow'

let app!: App

const threeContainer = ref<HTMLCanvasElement | null>(null)
let stage!:Stage

const menuList  = [
  {
    name: '扩散雷达',
    type: SpreadRadarEffectShow.effectName
  },
  {
    name: '扫描雷达',
    type: ScanRadarEffectShow.effectName
  }
]

onMounted(() => {
  if (threeContainer.value) {
    app = new App(threeContainer.value)
    console.log(app);
    
    app.camera.position.set(0, 0, 1000)
    stage = new Stage(app)
    stage.showEffect(menuList[0].type)
  }
})

onBeforeUnmount(() => {
  app.dispose()
})



const handleSelect = (index: string) => {
  stage.showEffect(menuList[Number(index)].type)
}

</script>

<template>
  <main>
    <div class="menu">
      <el-menu
        default-active="0"
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
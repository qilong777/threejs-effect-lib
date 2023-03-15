<template>
  <div class="pie-chart-three" :class="{ 'tooltip-active': tooltip.visible }">
    <canvas ref="canvas" @mouseenter="onCanvasMouseEnter"  @mouseleave="onCanvasMouseLeave" ></canvas>
    <div
      class="tooltip"
      :class="{ active: tooltip.visible }"
      :style="{
        transform: `translate(${tooltip.x}px, ${tooltip.y}px)`
      }"
    >
      <div class="color" :style="{ backgroundColor: tooltip.color }"></div>
      <div class="key">{{ tooltip.key }}</div>
      <div class="value">{{ `${tooltip.value}${options.unit}` }}</div>
      <div class="percentage" v-show="options.tooltip.percentage">
        {{ tooltip.percentage }}%
      </div>
    </div>
  </div>
</template>

<script>
import ThreeJsApp from "./three/index"
import * as THREE from "three"
import { Pie3DOptions } from "./interface"
import { Pie3DObject } from "./pie3D.object"

export default {
  name: "PieChartThree",
  props: {
    // 饼图数据
    options: {
      type: Pie3DOptions,
      default: () => new Pie3DOptions()
    }
  },
  data() {
    return {
      tooltip: {
        x: 0,
        y: 0,
        visible: false,
        key: "",
        value: "",
        percentage: "",
        color: ""
      },
      mouseInCanvas: false
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.generatePieChart()
      }
    }
  },
  methods: {
    /**
     * 初始化three.js场景
     */
    initThreeJsApp() {
      const threeJsApp = new ThreeJsApp(this.$refs.canvas)
      this.threeJsApp = threeJsApp

      threeJsApp.renderer.setClearColor("#ffffff", 0)
      threeJsApp.camera.position.set(0, -80, 40)
      threeJsApp.camera.rotation.set(0, 0, 0)

      threeJsApp.controls.dispose()

      threeJsApp.setFrameRequestCallback(() => {
        this.checkHoverSector()
      })

      this.object = new Pie3DObject()
      // threeJsApp.scene.add(new THREE.AxesHelper(1000))
      threeJsApp.scene.add(this.object)
    },

    /**
     * 初始化灯光
     */
    initLight() {
      /**
       * @type {ThreeJsApp}
       */
      const threeJsApp = this.threeJsApp

      const ambientLight = new THREE.AmbientLight("#ffffff", 0.2)
      const pointLight = new THREE.PointLight("#ffffff", 0.5)
      pointLight.position.set(0, 0, 10)
      const directionalLight = new THREE.DirectionalLight("#ffffff", 0.8)
      directionalLight.position.set(0, 0, 10)

      threeJsApp.scene.add(ambientLight)
      threeJsApp.scene.add(pointLight)
      threeJsApp.scene.add(directionalLight)
    },

    /**
     * 根据传入的数据生成扇形饼图
     */
    generatePieChart() {
      /**
       * @type {Pie3DObject}
       */
      const object = this.object
      object.draw(this.options)
    },

    /**
     * 检测鼠标是否hover某个扇形
     */
    checkHoverSector() {
      /**
       * @type {ThreeJsApp}
       */
      const threeJsApp = this.threeJsApp
      /**
       * @type {Pie3DObject}
       */
      const object = this.object

      const intersects = threeJsApp.raycaster.intersectObject(object)
      if (intersects.length > 0 && this.mouseInCanvas) {
        this.tooltip = {
          x: threeJsApp.mouseX,
          y: threeJsApp.mouseY,
          visible: true,
          ...intersects[0].object.userData
        }
      } else {
        this.tooltip.visible = false
      }
    },
    onCanvasMouseEnter() {
      this.mouseInCanvas = true
    },
    onCanvasMouseLeave() {
      this.mouseInCanvas = false
    }
  },
  mounted() {
    this.initThreeJsApp()
    // this.initEffect()
    this.initLight()
    this.generatePieChart()
  },
  beforeDestroy() {
    /**
     * @type {ThreeJsApp}
     */
    const threeJsApp = this.threeJsApp
    threeJsApp.destroy()
  }
}
</script>

<style lang="scss" src="./index.scss" scoped>
</style>
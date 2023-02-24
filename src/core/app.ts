// three.js应用类
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class ThreeJsApp {
  canvas!: HTMLCanvasElement
  canvasWrapper!: HTMLElement
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  controls!: OrbitControls
  raycaster!: THREE.Raycaster
  pointer!: THREE.Vector2
  animationMixer!: THREE.AnimationMixer
  resizeObserver!: ResizeObserver
  frameRequestCallback!: Function
  mouseX!: number
  mouseY!: number

  constructor(canvas: HTMLCanvasElement) {
    this.initRenderer(canvas)
    this.initScene()
    this.initRaycaster()
    this.initCamera()
    this.initOrbitControls()
    this.initResizeCallback()
    this.initMouseMoveCallback()
  }

  /**
   * 初始化渲染器
   * @param {HTMLCanvasElement} canvas canvas容器
   */
  initRenderer(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
      // logarithmicDepthBuffer: true
    })
    this.renderer = renderer
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setClearColor(0x999999)
    renderer.setPixelRatio(window.devicePixelRatio)
    const canvasWrapper = canvas.parentElement! // canvas容器的父元素
    this.canvasWrapper = canvasWrapper
    renderer.setSize(canvasWrapper.offsetWidth, canvasWrapper.offsetHeight)
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }

  /**
   * 初始化场景
   */
  initScene() {
    this.scene = new THREE.Scene()
  }

  /**
   * 初始化光线投射
   */
  initRaycaster() {
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2(1, 1) // 归一化设备坐标
  }

  /**
   * 初始化摄像机
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.canvasWrapper.offsetWidth / this.canvasWrapper.offsetHeight,
      0.1,
      1000
    )
  }

  /**
   * 初始化轨道控制器
   */
  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.canvas)
  }

  /**
   * 设置动画循环中每帧要执行的回调
   */
  setFrameRequestCallback(callback: Function) {
    this.frameRequestCallback = callback
  }

  /**
   * 初始化容器尺寸发生改变时的回调
   */
  initResizeCallback() {
    this.resizeObserver = new ResizeObserver(() => {
      this.renderer.setSize(this.canvasWrapper.offsetWidth, this.canvasWrapper.offsetHeight)
      this.camera.aspect = this.canvasWrapper.offsetWidth / this.canvasWrapper.offsetHeight
      this.camera.updateProjectionMatrix()
    })
    this.resizeObserver.observe(this.canvasWrapper)
  }

  /**
   * 初始化鼠标在canvas容器上移动的事件回调
   */
  initMouseMoveCallback() {
    this.mouseX = 0
    this.mouseY = 0
    /**
     * @param {MouseEvent} event
     */
    this.onMouseMove = (event) => {
      this.mouseX = event.offsetX
      this.mouseY = event.offsetY
      this.pointer.set(
        (event.offsetX / this.canvasWrapper.offsetWidth) * 2 - 1,
        -(event.offsetY / this.canvasWrapper.offsetHeight) * 2 + 1
      )
    }
    this.canvas.addEventListener('mousemove', this.onMouseMove)
  }
  onMouseMove!: (event: MouseEvent) => void

  /**
   * 销毁场景，释放内存
   */
  destroy() {
    const { scene, renderer, controls, resizeObserver, canvas } = this
    controls.dispose()
    resizeObserver.disconnect()
    canvas.removeEventListener('mousemove', this.onMouseMove)
    scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose()
        Object.keys(child.material).forEach((key) => {
          if (child.material[key] && child.material[key].isTexture) {
            child.material[key].dispose()
          }
        })
      }
      if (child.geometry) {
        child.geometry.dispose()
      }
    })
    scene.clear()
    renderer.setAnimationLoop(null)
    renderer.dispose()
    renderer.forceContextLoss()
  }

  /**
   * 空间坐标转容器平面坐标
   */
  getContainer2DCoordFromVec3(vec3: THREE.Vector3) {
    const stdVec3 = vec3.project(this.camera)
    const width = this.canvasWrapper.offsetWidth * 0.5
    const height = this.canvasWrapper.offsetHeight * 0.5
    const x = (1 + stdVec3.x) * width
    const y = (1 - stdVec3.y) * height
    return { x, y }
  }
}

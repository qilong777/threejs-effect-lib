// three.js应用类
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import { disposeObject, removeObjectChildren } from '@/common/three/threeUtils'
import { World } from 'ecsy'

export const world = new World()

export class App {
  root!: HTMLElement
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  controls!: OrbitControls
  raycaster!: THREE.Raycaster
  pointer!: THREE.Vector2
  animationMixer!: THREE.AnimationMixer
  resizeObserver!: ResizeObserver
  frameRequestCallbacks: Function[] = []
  mouseX!: number
  mouseY!: number

  stats!: Stats

  constructor(root: HTMLElement) {
    this.root = root
    this.initRenderer()
    this.initStats()
    this.initScene()
    this.initRaycaster()
    this.initCamera()
    this.initOrbitControls()
    this.initAnimationLoop()
    this.initResizeCallback()
    this.initMouseMoveCallback()
  }

  /**
   * 初始化渲染器
   */
  initRenderer() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    })
    this.renderer = renderer
    this.root.appendChild(renderer.domElement)
    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setClearColor(0x000000)
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setSize(this.root.offsetWidth, this.root.offsetHeight)
  }

  initStats() {
    this.stats = Stats()
    this.stats.dom.style.position = 'absolute'
    this.root.appendChild(this.stats.dom)
  }

  /**
   * 初始化场景
   */
  initScene() {
    this.scene = new THREE.Scene()
    this.resetScene()
  }

  resetScene() {
    removeObjectChildren(this.scene)
    this.scene.clear()
    this.scene.add(new THREE.AxesHelper(1000))
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
      this.root.offsetWidth / this.root.offsetHeight,
      0.1,
      1000000
    )
    this.camera.up.set(0, 0, 1)
  }

  /**
   * 初始化轨道控制器
   */
  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = true
    this.controls.zoomSpeed = 2
    this.controls.mouseButtons = {
      // 左键
      LEFT: THREE.MOUSE.PAN,
      // 滚轮滑动
      MIDDLE: THREE.MOUSE.PAN,
      // 右键
      RIGHT: THREE.MOUSE.ROTATE
    }
  }

  /**
   * 初始化动画循环
   */
  initAnimationLoop() {
    // 动画混合器
    this.animationMixer = new THREE.AnimationMixer(this.scene)
    // 时钟
    const clock = new THREE.Clock()

    this.renderer.setAnimationLoop(() => {
      this.controls.update() // 更新轨道控制器状态
      this.stats.update() // 更新性能监视器状态
      this.raycaster.setFromCamera(this.pointer, this.camera) // 更新光线投射状态
      const delta = clock.getDelta()
      this.animationMixer.update(delta) // 更新动画混合器状态

      this.callFrameRequestCallbacks(delta)
      world.execute(delta, clock.getElapsedTime())

      this.renderer.render(this.scene, this.camera)
    })
  }

  addFrameRequestCallback(callback: Function) {
    this.frameRequestCallbacks.push(callback)
  }

  removeFrameRequestCallback(callback: Function) {
    const index = this.frameRequestCallbacks.indexOf(callback)
    if (index > -1) {
      this.frameRequestCallbacks.splice(index, 1)
    }
  }
  clearFrameRequestCallback() {
    this.frameRequestCallbacks = []
  }

  callFrameRequestCallbacks(delta: number) {
    this.frameRequestCallbacks.forEach((callback) => {
      callback(delta)
    })
  }

  /**
   * 初始化容器尺寸发生改变时的回调
   */
  initResizeCallback() {
    this.resizeObserver = new ResizeObserver(() => {
      this.renderer.setSize(this.root.offsetWidth, this.root.offsetHeight)
      this.camera.aspect = this.root.offsetWidth / this.root.offsetHeight
      this.camera.updateProjectionMatrix()
    })
    this.resizeObserver.observe(this.root)
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
        (event.offsetX / this.root.offsetWidth) * 2 - 1,
        -(event.offsetY / this.root.offsetHeight) * 2 + 1
      )
    }
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove)
  }
  onMouseMove!: (event: MouseEvent) => void

  /**
   * 销毁场景，释放内存
   */
  dispose() {
    const { scene, renderer, controls, resizeObserver } = this
    controls.dispose()
    resizeObserver.disconnect()
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove)
    disposeObject(scene)
    scene.clear()
    renderer.setAnimationLoop(null)
    renderer.dispose()
    renderer.forceContextLoss()
    this.clearFrameRequestCallback()
  }

  /**
   * 空间坐标转容器平面坐标
   */
  getContainer2DCoordFromVec3(vec3: THREE.Vector3) {
    const stdVec3 = vec3.project(this.camera)
    const width = this.root.offsetWidth * 0.5
    const height = this.root.offsetHeight * 0.5
    const x = (1 + stdVec3.x) * width
    const y = (1 - stdVec3.y) * height
    return { x, y }
  }
}

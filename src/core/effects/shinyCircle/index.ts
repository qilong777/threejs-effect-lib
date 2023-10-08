import { ShaderMaterial } from "three";
import { shinyCircleFrag } from "./glsl/shinyCircle.frag.glsl";
import { shinyCircleVert } from "./glsl/shinyCircle.vert.glsl";

export function getShinyCircleShaderMaterial() {
  return new ShaderMaterial({
    uniforms: {
      uTime: {
        value: 0,
      },
    },
    vertexShader: shinyCircleVert,
    fragmentShader: shinyCircleFrag,
  })
}
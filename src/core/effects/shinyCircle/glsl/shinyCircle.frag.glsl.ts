// 参考连接 https://www.shadertoy.com/view/ltBXRc
export const shinyCircleFrag = /* glsl */ `
  #pragma vscode_glsllint_stage: frag
  #ifdef GL_ES
  precision mediump float;
  #endif

  // 形变速度
  #define Speed 3.0
  // 形变程度
  #define Strength 5.0

  uniform float uTime;
  varying vec2 vUv;

  // 转动圆
  mat2 rotate(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }

  // 修改圆半径，波动效果
  float variation(vec2 v1, vec2 v2, float strength, float speed) {
    return sin(
      dot(normalize(v1), normalize(v2))
        * strength
        + uTime
        * speed
    ) / 100.0;
  }

  // 绘制圆
  vec3 paintCircle (vec2 vUv, vec2 center, float radius, float width) {
    // 平移到圆心
    vec2 diff = center-vUv;
    float len = length(diff);

    len += variation(diff, vec2(0.0, 1.0), Strength, Speed);
    len -= variation(diff, vec2(1.0, 0.0), Strength, Speed);

    float circle = smoothstep(radius-width, radius, len) - smoothstep(radius, radius+width, len);
    return vec3(circle);
  }

  void main(){
    vec3 color;
    float radius = 0.4;
    vec2 center = vec2(0.5);

    color = paintCircle(vUv, center, radius, 0.1);

    // 渐变色
    vec2 v = rotate(uTime) * vUv;
    color *= vec3(v.x, v.y, v.y*v.x);

    color += paintCircle(vUv, center, radius, 0.01);

	  gl_FragColor = vec4(color, 1.0);
  }
`;
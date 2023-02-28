
precision mediump float;
// 接收顶点着色器传入的值
varying float vopacity;
uniform vec3 uColor;

void main () {
    // 设置颜色
    gl_FragColor = vec4(uColor, vopacity);
}


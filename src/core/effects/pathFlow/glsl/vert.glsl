
// 接收js传入的attribute值，会经过线性插值
attribute float current;

// 接收js传入的uniform值
uniform float uSize;
uniform float time;
uniform float uRange;
uniform float uTotal;
uniform float uSpeed;

// 向片元着色器传值颜色和透明度
varying float vopacity;

void main () {
    float size = uSize;
    // 根据时间确定当前飞线的位置， 以结束点为准
    float currentEnd = mod(time * uSpeed, uTotal);
    // 判断当前像素点是否在飞线范围内，如果在范围内设置尺寸和透明度
    if (current < currentEnd && current > currentEnd - uRange) {
        // 设置渐变的尺寸，头大尾小
        float sizePct = (uRange - (currentEnd - current)) / uRange;
        // size *= sizePct;
        vopacity = clamp(1.0 * sizePct, 0.2, 1.0);
    } else if(current < currentEnd - uRange){
        vopacity = 0.1;
    } else {
        vopacity = 0.1;
    }
    // 将颜色传递给片元着色器
    // 设置点的大小
    gl_PointSize = size * 0.4;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

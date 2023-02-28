uniform float bias;     // 变化时间
uniform float scale;  // 条纹宽度
uniform float power; 
uniform vec3 color;
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
    // 归一化颜色
    float a = pow( bias + scale * abs(dot(vNormal, vPositionNormal)), power );
    gl_FragColor = vec4( color, a );
}
varying vec2 vUv;
varying vec3 fNormal;
varying vec3 vPosition;
void main()
{
    vUv = uv;
    fNormal=normal;
    vPosition=position;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}
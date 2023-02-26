//Author: asmith13
//Free to use as you wish. Have fun
// 参考：https://www.shadertoy.com/view/3djSDD

#define green vec3(0.0,1.0,0.0)
uniform float time;
varying vec2 vUv;

// returns a vec3 color from every pixel requested.
// Generates a BnW Ping on normalized 2d coordinate system
vec3 RadarPing(in vec2 uv, in vec2 center, in float innerTail, 
               in float frontierBorder, in float timeResetSeconds, 
               in float radarPingSpeed, in float fadeDistance)
{
    vec2 diff = center-uv;
    float r = length(diff);
    float time = mod(time, timeResetSeconds) * radarPingSpeed;
   
    float circle;
    // r is the distance to the center.
    // circle = BipCenter---//---innerTail---time---frontierBorder
    //illustration
    //https://sketch.io/render/sk-14b54f90080084bad1602f81cadd4d07.jpeg
    circle += smoothstep(time - innerTail, time, r) * smoothstep(time + frontierBorder,time, r);
	circle *= smoothstep(fadeDistance, 0.0, r); // fade to 0 after fadeDistance
        
    return vec3(circle);
}

void main()
{	
    //normalize coordinates 
    vec2 uv = vUv; //move coordinates to 0..1
    uv = uv.xy*2.; // translate to the center
    uv += vec2(-1.0, -1.0);
    // uv.x *= iResolution.x/iResolution.y; //correct the aspect ratio
    
	vec3 color;
    // generate some radar pings
    float fadeDistance = 1.0;
    float resetTimeSec = 4.0;
    float radarPingSpeed = 0.3;
    vec2 greenPing = vec2(0.0, 0.0);
    color += RadarPing(uv, greenPing, 0.25, 0.025, resetTimeSec, radarPingSpeed, fadeDistance) * green;
    
    //return the new color
	gl_FragColor = vec4(color,1.0);
}

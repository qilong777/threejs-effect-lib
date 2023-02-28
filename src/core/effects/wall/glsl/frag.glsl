uniform float time;     // 变化时间
uniform int stripeNum; // 条纹个数
uniform float stripeWidth;  // 条纹宽度
uniform vec4 stripeColor;  // 条纹颜色
uniform float stripeSpeed; 
varying vec2 vUV;
uniform vec4 uColor;

float getBrightness(vec2 uv)
{	
    float brightness = 0.0;
    
    float tanInverseInRad = 1.0 / tan(180.0);
                                
    bool onLeft = (tanInverseInRad > 0.0);
    float xBottomFarLeft = onLeft? 0.0 : tanInverseInRad;
    float xBottomFarRight = onLeft? (1.0 + tanInverseInRad):1.0;

    float percent = time * stripeSpeed;
    float xBottomRightBound = xBottomFarLeft + percent * (xBottomFarRight - xBottomFarLeft);
    float xBottomLeftBound = xBottomRightBound - stripeWidth;
    
    float xProj = uv.y * tanInverseInRad;
    
    if(xProj > xBottomLeftBound && xProj < xBottomRightBound)
    {
          brightness = 1.0 - abs(2.0 * xProj - (xBottomLeftBound + xBottomRightBound)) / stripeWidth;
    }

    return brightness;
}


void main() {
    //vec4 finalcolor=texture2D(map, vec2(vUv.x, fract(vUv.y+ time*speed)));
    // vec4 finalcolor = texture2D(map, vec2(vUv.x * repeatX , vUv.y));
    // gl_FragColor = finalcolor; 
    vec4 realStripeColor = stripeColor * getBrightness(vUV);

    gl_FragColor = uColor * (1.0 - vUV.y) + realStripeColor; 

}
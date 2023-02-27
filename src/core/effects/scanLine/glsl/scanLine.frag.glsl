uniform float time;
uniform vec3 _FlashColor;
uniform vec3 baseColor;
uniform float _Angle;
uniform float _Width;
varying vec2 vUV;
float inFlash(vec2 uv)
{	
    float brightness = 0.0;
    
    float angleInRad = 0.0174444 * _Angle;
    float tanInverseInRad = 1.0 / tan(angleInRad);
                                
    bool onLeft = (tanInverseInRad > 0.0);
    float xBottomFarLeft = onLeft? 0.0 : tanInverseInRad;
    float xBottomFarRight = onLeft? (1.0 + tanInverseInRad):1.0;

    float percent =time;
    float xBottomRightBound = xBottomFarLeft + percent * (xBottomFarRight - xBottomFarLeft);
    float xBottomLeftBound = xBottomRightBound - _Width;
    
    float xProj = uv.x + uv.y * tanInverseInRad;
    
    if(xProj > xBottomLeftBound && xProj < xBottomRightBound)
    {
          brightness = 1.0 - abs(2.0 * xProj - (xBottomLeftBound + xBottomRightBound)) / _Width;
    }

    return brightness;
}
void main() {
    //vec2 tempUV=vUV;
    float brightness = inFlash(vUV);
    gl_FragColor.rgb = baseColor.rgb*1.2 + _FlashColor.rgb * brightness;
    gl_FragColor.a=1.0;
}
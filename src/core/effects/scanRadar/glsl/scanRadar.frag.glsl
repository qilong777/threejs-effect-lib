// 参考：https://www.shadertoy.com/view/XdsXRf
#define PI 3.1415926535897932384626433832795
uniform float time;
uniform vec4 circleColor;
uniform vec4 lineColor;
varying vec2 vUv;
// 每秒转几度
const float speed = 60.0 / 180.0 * PI;

float LineToPointDistance2D( vec2 a, vec2 b, vec2 p)
{
    vec2 pa = p - a;
    vec2 ba = b - a;

    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0);

    return length( pa - ba*h );
}


vec2 rotatePoint(vec2 center,float angle,vec2 p)
{
  float s = sin(angle);
  float c = cos(angle);

  // translate point back to origin:
  p.x -= center.x;
  p.y -= center.y;

  // rotate point
  float xnew = p.x * c - p.y * s;
  float ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + center.x;
  p.y = ynew + center.y;
  return p;
}


// void getBlips(float radius, out vec2[1] blipsOut)
// {	
// 	vec2 cen = vec2(0.5,0.5);
// 	float sec = iDate[3];
// 	float mdl = mod(sec,10.0);
	
// 	//From 1 to 6 
// 	float cstepRot = ((sec-mdl)/10.0)+1.0;
// 	float factorRot = cstepRot/6.0;
	
// 	float factorLen = sin(factorRot)/2.0;
// 	float len = radius*factorLen;//0.5;);
// 	vec2 targetP = vec2(cen.x,cen.y+len);	
// 	float ang  =  PI*factorRot*2.0;
// 	targetP = rotatePoint(cen,ang,targetP);
	
// 	blipsOut[0] = targetP;		
// }

float angleVec(vec2 a_, vec2 b_) 
{
    vec3 a = vec3(a_, 0);
    vec3 b = vec3(b_, 0);
     float dotProd = dot(a,b); 
     vec3 crossprod = cross(a,b);
     float crossprod_l = length(crossprod);
     float lenProd = length(a)*length(b);
     float cosa = dotProd/lenProd;
     float sina = crossprod_l/lenProd;
     float angle = atan(sina, cosa);
    
     if(dot(vec3(0,0,1), crossprod) < 0.0) 
        angle=90.0;
     return (angle * (180.0 / PI));
}

void main()
{

  // 0-1
  vec2 pos = vUv;
  // 中心点
	vec2 center = vec2(0.5,0.5);
	float minRes = min(center.x,center.y);
	float radius = 0.5;
  // 外圆的宽度
	float circleWitdh = radius * 0.1;
  // 扫描线的厚度
	float lineWitdh = radius * 0.01;
	float angleStela = 180.0;	
	vec2 lineEnd =  vec2(center.x,center.y+radius);

	float green =0.0;
	
  // 获取当前像素点到圆心的距离
	float distanceToCenter = distance(center, pos);	

  // 获取点到圆边界的距离
	float disPointToCircle= abs(distanceToCenter - radius);
							

  vec4 defaultCircleColor = circleColor;
  vec4 defaultLineColor = lineColor;
  vec4 defaultLineTailColor = lineColor;

	// 绘制渐变圆
	if (disPointToCircle < circleWitdh)
	{
		defaultCircleColor *= 1.0 - (disPointToCircle/circleWitdh);
	}else{
    defaultCircleColor = vec4(0.0);
  }
	
	// 旋转扫描线
	float angle = -time* speed;
	lineEnd = rotatePoint(center,angle,lineEnd);
	
	//Draw Line	
	float distPointToLine = LineToPointDistance2D(center,lineEnd,pos);
	if (distPointToLine<lineWitdh)
	{ 
		float val = 1.0-distPointToLine/lineWitdh;
    defaultLineColor *= val;
		// if (val>green)
		// 	green=val;
	}else{
    defaultLineColor = vec4(0.0);
  }
	
	
	//Draw Stela
	float angleStelaToApply = angleVec(normalize(lineEnd-center),normalize(pos-center));
	if (angleStelaToApply<angleStela && distanceToCenter<radius-circleWitdh/2.0+1.0)
	{
		float factorAngle = 1.0-angleStelaToApply/angleStela;
		
		float finalFactorAngle = (factorAngle*0.5)-0.05;
		defaultLineTailColor *= finalFactorAngle;

    // defaultLineTailColor的rgba如果小于0则归0，大于1则归1
    defaultLineTailColor = clamp(defaultLineTailColor, 0.0, 1.0);

    
		
		if (finalFactorAngle>green)
			green=finalFactorAngle;
		

		
		// //DrawBlips
		// vec2 blips[1];
		// float angles[1];
		// // getBlips(radius,blips);

		
		// float distToBlip = distance(pos,blips[0]);//blips[0]);
			
		// if (distToBlip<15.0)
		// {
		// 	float blipFactor = 1.0-distToBlip/15.0;
		// 	float toSubtract = 1.0-factorAngle;
		// 	float final = blipFactor-toSubtract;
    //   defaultLineTailColor *= final;

		// }else{
    //   defaultLineTailColor = vec4(0.0);
    // }	
	}else{
    defaultLineTailColor = vec4(0.0);
  }

	gl_FragColor = vec4(0.0,0.0,0.0,1.0) + defaultCircleColor + defaultLineColor + defaultLineTailColor;
}



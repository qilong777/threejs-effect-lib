const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;
const int N = 3;				// triangle polygons please
const float r0 = 0.01;			// size of centre circle
const float r_blue = 0.025;		// size of blue radar blips
const float r_red = 0.015;		// size of red radar blips
const float edge = 0.95;		// overall size
const float offset = 0.05;
uniform float time;
uniform sampler2D map;
varying vec2 vUv;
float plot(const vec2 st, const float pct, const float width)
	{
        return smoothstep(pct - width, pct, st.y) -
               smoothstep(pct, pct + width, st.y);
    }

float drawPolygon(const vec2 polygonCenter, const int N, const float radius, vec2 pos)
	{
		pos = pos - polygonCenter;
		float d = 0.0;
		float a = atan(pos.x, pos.y);
		float r = TWO_PI / float(N);
		d = cos(floor(0.5 + a / r)*r - a)*length(pos);
		return (1.0 - smoothstep(radius, radius + radius/10.0, d));
	}

float gradations(const float a, const float gradNum, const float outRad, const float tickLen, const float tickWidth, const float r, const float move)
	{
		float f = step(0.0, cos((a + move)*gradNum) - tickWidth)*tickLen + (outRad - tickLen);
    	return 1.0 - step(f, r) * 1.0 - step(r, outRad - tickLen);
	}

void main(  )
{
    // Normalized pixel coordinates (from 0 to 1)
       vec2 uv = vUv;
	vec2 pos = uv.xy - vec2(0.5, 0.5) ; // center what being drawn
   
   	vec4 grndSpd = vec4(0.0, time/5.0, 0.0, 0.0);
	// vec4 mapcol = texture2D(map,uv) * vec4 (0.0, 0.85, 0.0, 1.0);
  
	vec3 color = vec3(0.0, 0.0, 0.0);

	float r = length(pos) * 2.0;
	float a = atan(pos.y, pos.x); // angle of pixel
	float an = PI - mod(time/ 1.0, TWO_PI); // angle of radar sweep
    float blipSpd = 3.0; // Blip / Trace speed
	vec2 translate1 = vec2(cos(time/ blipSpd), sin(time/ blipSpd));
	vec2 translate2 = vec2(sin(time/ blipSpd), cos(time/ blipSpd));
	vec2 left1 = translate1 * 0.35;
	vec2 right1 = -translate1 * 0.30;
	vec2 left2 = translate2 * 0.15;
	vec2 right2 = -translate2 * 0.25;
    
// Radar Sweep
   	float sn = step(PI/2.0, an) * step(-PI/2.0, (a + an)) * step(r, edge) * (1.0 - 0.55 * (a + (TWO_PI) - an));
	float sw = step(an, a) * step(r, edge);
	float s_blade = sw * (1.0 - (a - an) * 20.0);
	float s = sw * (1.0 - 0.55 * (a - an));
	s = max(sn,s);
	float se = step(r, edge - 0.05);
   
// Center point
	float s1 = smoothstep(edge - 0.00, edge + 0.01, r)* smoothstep(edge + 0.02, edge + 0.01, r);   
   
// Circular concentric rings
	float s0 = 1.0 - smoothstep(r0 / 2.0, r0, length(pos));
    float smb = (1.0 - smoothstep(0.2, 0.2 + 0.01, length(pos))) * (1.0 - smoothstep(0.2 +0.01, 0.2, length(pos)));
    float smr = (1.0 - smoothstep(0.3, 0.3 + 0.01, length(pos))) * (1.0 - smoothstep(0.3 +0.01, 0.3, length(pos)));
    
// Circular concentric gradations
	float gradNum = 120.0;
	float tickWidth = 0.9;
	const float tickLen = 0.04;
	float outRad = edge;
	float move = 0.0;
	float sm = 0.75*gradations(a, gradNum, outRad, tickLen, tickWidth, r, move);   
   
	gradNum = 36.0;
	tickWidth = 0.95;
	outRad = 0.6;
	move = sin(time/10.0);
	smr += 0.5*gradations(a, gradNum, outRad, tickLen, tickWidth, r, move);

	outRad = 0.4;
	move = cos(time/10.0);
	smb += 0.5*gradations(a, gradNum, outRad, tickLen, tickWidth, r, move);

// Radial spoke gradations 
	float sr = plot(pos, pos.x, 0.003) * step(r, edge - 0.06);
	sr += plot(vec2(0.0, 0.0), pos.x, 0.002) * step(r, edge - 0.06);
	sr += plot(vec2(0.0, 0.0), pos.y, 0.003) * step(r, edge - 0.06);
	sr += plot(-pos, pos.x, 0.003) * step(r, edge - 0.06);
    sr *= 0.75;

// Blue circular radar blip traces
	vec2 st_trace1 = left2;
	float s_trace1 = s * (1.0 - smoothstep(r_blue / 10.0, r_blue, length(pos - st_trace1)));
	s_trace1 += s * (1.0 - smoothstep(r_blue / 10.0, r_blue, length(pos - st_trace1 + vec2(+offset, +offset))));
	s_trace1 += s * (1.0 - smoothstep(r_blue / 10.0, r_blue, length(pos - st_trace1 + vec2(+2.0 *offset, +2.0 *offset))));

	vec2 st_trace2 = right1;
	float s_trace2 = s * (1.0 - smoothstep(r_blue / 10.0, r_blue, length(pos - st_trace2)));

// Red Trianglular radar flight blip trace 
	vec2 st_trace3 = left1;
	float st1 = s * (drawPolygon(st_trace3, N, r_red , pos));
	st1 += s * (drawPolygon(st_trace3 + vec2(-offset, -offset), N, r_red, pos));
	st1 += s * (drawPolygon(st_trace3 + vec2(+offset, -offset), N, r_red, pos));

	vec2 st_trace4 = right2;
	float st2 = s * (drawPolygon(st_trace4, N, r_red, pos));  
    
// Lets add all the bits together and send them to screen
	float s_grn = s_blade;
	s_grn = max(s_grn, (s0 +  sr + sm));
	s_grn += s1 / 1.5  + smb + smr;

	float s_red = st1*2.0 + st2*2.0 + smr;
		
	float s_blue = max(s_trace1 + s_trace2, s_blade) + smb;

	if (s_trace1 > 0.0 || s_trace2 > 0.0) { s_blue = max(s, s_blue); s_grn = max(s_grn, s_blue); }

	color += vec3(s_red , s_grn, s_blue);   
    
    // vec4 texColor = mapcol * s;
    
    // Output to screen   
    gl_FragColor = vec4(color, 1.0);//Set the screen pixel to that color

}
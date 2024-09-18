vec3 grid(in vec2 uv) {
  vec3 color = vec3(0.);
  vec2 cell = 1. - 2. * abs(fract(uv) - .5);

  if(cell.x < 2. * fwidth(uv.x)) {
    color += vec3(1.);
  }

  if(cell.y < 2. * fwidth(uv.y)) {
    color += vec3(1.);
  }

  if(abs(uv.y) < 2. * fwidth(uv.y)) {
    color = vec3(1., 0., 0.);
  }

  if(abs(uv.x) < 2. * fwidth(uv.x)) {
    color = vec3(0., 1., 0.);
  }

  return color;
}

float line(in vec2 a, in vec2 b, in float w) {
  float f = 0.;
  float k = (a.y - b.y) / (a.x - b.x);
  return f;
}

float circle(in vec2 pos, in float r) {
  float f = 0.;
  float d = length(pos);
  if ( d < r) {
    f = 1.;
  }
  return f;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = 3. * (fragCoord * 2. - iResolution.xy) / min(iResolution.x, iResolution.y);
  vec3 color = grid(uv);
  color = color + vec3(circle(vec2(1., 1.), 1.), 0., 0.);
  fragColor = vec4(color, 1.);
}

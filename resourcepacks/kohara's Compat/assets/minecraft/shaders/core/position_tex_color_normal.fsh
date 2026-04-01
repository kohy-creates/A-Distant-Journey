#version 150

uniform sampler2D Sampler0;
uniform vec4 ColorModulator;
uniform vec4 FogColor;
uniform float GameTime;

in vec2 texCoord0;
in float vertexDistance;
in vec4 vertexColor;
in float yval;

out vec4 fragColor;

vec3 ShadowColorByTime() {
    vec3 dayShadow = vec3(0.3, 0.3, 0.3);
    vec3 afternoonShadow = vec3(1.0, 0.5, 0.2);
    vec3 nightShadow = vec3(0.2, 0.3, 0.5);

    float t = fract(GameTime / 24000.0);
    if(t < 0.25) return mix(nightShadow, dayShadow, t/0.25);
    else if(t < 0.5) return mix(dayShadow, afternoonShadow, (t-0.25)/0.25);
    else if(t < 0.75) return mix(afternoonShadow, dayShadow, (t-0.5)/0.25);
    else return mix(dayShadow, nightShadow, (t-0.75)/0.25);
}

void main() {
    vec4 color = texture(Sampler0, texCoord0) * vertexColor * ColorModulator;
    if(color.a < 0.1) discard;

    vec3 shadowTint = ShadowColorByTime();
    color.rgb = mix(color.rgb, shadowTint, 0.5*(1.0-yval));

    float fog = 0.0;
    if(vertexDistance > 200.0) fog = vertexDistance < 300.0 ? smoothstep(200.0,300.0,vertexDistance) : 1.0;

    fragColor = color * vec4(1,1,1,1-fog) * vec4(1,1,1,0.75);
}
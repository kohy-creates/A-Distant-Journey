#version 150

#moj_import <fog.glsl>

uniform sampler2D Sampler0;
uniform sampler2D Sampler1;

uniform vec4 ColorModulator;
uniform float FogStart;
uniform float FogEnd;
uniform vec4 FogColor;

in vec2 texCoord0;
in float vertexDistance;
in vec4 vertexColor;
in vec4 normal;

out vec4 fragColor;

void main() {
	float fogStart = 500.0;
	float fogEnd = 600.0;
	float fogValue = 0.0;

	vec4 rawColor = texture(Sampler0, texCoord0);
	float scale = 32.0;
	vec2 fluffCoord = new vec2(texCoord0.x * scale, texCoord0.y * scale);
	vec4 fluffColor = texture(Sampler1, fluffCoord);
	fluffColor.a = rawColor.a;
	vec4 color = fluffColor * vertexColor * ColorModulator;
	if (color.a < 0.01) {
		discard;
	}
	if (vertexDistance > fogStart) { fogValue = vertexDistance < fogEnd ? smoothstep(fogStart, fogEnd, vertexDistance) : 1.0; }
    fragColor = color * vec4(1.0, 1.0, 1.0, 1.0 - fogValue) * vec4(1.0, 1.0, 1.0, 0.75);
}

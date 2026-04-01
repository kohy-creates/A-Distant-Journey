#version 150

#moj_import <fog.glsl>

in vec3 Position;
in vec2 UV0;
in vec4 Color;
in vec3 Normal;

uniform mat4 ModelViewMat;
uniform mat4 ProjMat;
uniform int FogShape;

out vec2 texCoord0;
out float vertexDistance;
out vec4 vertexColor;
out float yval;

float slide(float v,float s,float e){return clamp((v-s)/(e-s),0.0,1.0);}

void main() {
    gl_Position = ProjMat * ModelViewMat * vec4(Position,1);
    texCoord0 = UV0;
    vertexDistance = fog_distance(ModelViewMat,Position,FogShape);

    vec3 n = Normal;
    vec4 col = Color;
    float b=col.b;

    float yc=mix(127,174,slide(b,178.0/255.0,110.0/255.0));
    float xc=mix(153,225,slide(b,229.0/255.0,142.0/255.0));
    float zc=mix(204,200,slide(b,203.0/255.0,126.0/255.0));

    float dy=dot(n,vec3(0,1,0));
    float dny=dot(n,vec3(0,-1,0));
    float dx=abs(n.x);
    float dz=abs(n.z);

    if(dny>0.999) col.rgb*=255.0/yc;
    else if(dy>0.999) col.rgb*=1;
    else if(dx>0.999) col.rgb*=255.0/xc;
    else if(dz>0.999) col.rgb*=255.0/zc;

    vertexColor = min(col,1.0);

    yval=0;
    int f=gl_VertexID%4;
    if((f==1||f==2)&&dx>0.99)yval=1;
    if((f==0||f==1)&&dz>0.99)yval=1;
    if(dy>0.99)yval=1;
}
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AuroraShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#00ffaa") },
    uColor2: { value: new THREE.Color("#0066ff") },
    uColor3: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex noise helper
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Sharp vertical streaks (curtains)
      float streak = snoise(vec2(uv.x * 6.0, uTime * 0.15)) * 0.5 + 0.5;
      float fineStreak = snoise(vec2(uv.x * 25.0, uTime * 0.3)) * 0.5 + 0.5;
      
      // Focus streaks towards the top but allow some at bottom
      float pattern = pow(streak * 0.7 + fineStreak * 0.3, 1.5);
      
      // Vertical gradient masking - keep bottom more visible as requested
      float mask = smoothstep(-0.2, 0.6, uv.y) * smoothstep(1.0, 0.4, uv.y);
      
      // Subtle wavy horizontal movement
      float wave = sin(uv.x * 3.0 + uTime * 0.5) * 0.1;
      float finalPattern = snoise(vec2(uv.x * 4.0 + wave, uv.y - uTime * 0.15)) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, finalPattern);
      color = mix(color, uColor3, pattern);
      
      // Reduced intensity as requested (from 4.5 down to 1.8)
      float intensity = pattern * mask * 1.8;
      
      // Bottom glow to prevent "black hole" when mountain moves
      float bottomGlow = smoothstep(0.3, 0.0, uv.y) * 0.2;
      
      gl_FragColor = vec4(color * (intensity + bottomGlow), (intensity + bottomGlow));
    }
  `,
};

function AuroraContent({ themeColor }) {
  const materialRef = useRef(null);

  const colors = useMemo(() => {
    switch (themeColor) {
      case "emerald":
        return { c1: "#00ff99", c2: "#00cc66", c3: "#ccffff" };
      case "ocean":
        return { c1: "#0088ff", c2: "#0044ff", c3: "#ffffff" };
      case "nebula":
        return { c1: "#cc00ff", c2: "#7700ff", c3: "#ffffff" };
      case "gold":
        return { c1: "#ffaa00", c2: "#ff6600", c3: "#ffffff" };
      default:
        return { c1: "#00ff99", c2: "#0066ff", c3: "#9900ff" };
    }
  }, [themeColor]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uColor1.value.lerp(
        new THREE.Color(colors.c1),
        0.05
      );
      materialRef.current.uniforms.uColor2.value.lerp(
        new THREE.Color(colors.c2),
        0.05
      );
      materialRef.current.uniforms.uColor3.value.lerp(
        new THREE.Color(colors.c3),
        0.05
      );
    }
  });

  return (
    <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, 4, -15]} scale={[80, 50, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        args={[AuroraShaderMaterial]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function AuroraBackground({ themeColor = "default" }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#010205]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <AuroraContent themeColor={themeColor} />
      </Canvas>
    </div>
  );
}
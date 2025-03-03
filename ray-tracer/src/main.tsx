import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import "./styles.css";

interface LoadingProps {
  text: string;
}

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(
    (_state, delta) => (
      // TODO: make into a function?
      (meshRef.current.rotation.x += delta),
      (meshRef.current.rotation.z += delta)
    )
  );
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"black"} wireframe={hovered} />
    </mesh>
  );
}

const LoadingText: React.FC<LoadingProps> = ({ text }) => {
  return <div className="loading">{text}...</div>;
};

createRoot(document.getElementById("root")!).render(
  <div className="placeholder">
    <Canvas className="canvas">
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[0, 0, 0]} />
    </Canvas>
    <LoadingText text="work in progress" />
  </div>
);

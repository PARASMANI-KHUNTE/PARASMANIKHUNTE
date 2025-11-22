import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

const AnimatedSphere = ({ isDarkMode }) => {
    const mesh = useRef(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = t * 0.2;
        mesh.current.rotation.y = t * 0.2;
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2.4} ref={mesh}>
            <MeshDistortMaterial
                color={isDarkMode ? "#d97706" : "#f59e0b"} // Amber-600 / Amber-500
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
                metalness={0.5}
            />
        </Sphere>
    );
};

const Hero3D = () => {
    const { isDarkMode } = useTheme();

    return (
        <Canvas className="h-full w-full">
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <AnimatedSphere isDarkMode={isDarkMode} />
        </Canvas>
    );
};

export default Hero3D;

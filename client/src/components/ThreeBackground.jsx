import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from '../context/ThemeContext';

const Stars = (props) => {
    const ref = useRef();
    const [sphere] = React.useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={props.color}
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const ThreeBackground = () => {
    const { isDarkMode } = useTheme();
    // Cosmic colors: Electric Indigo in dark mode, Deep Purple in light
    const color = isDarkMode ? "#818cf8" : "#4f46e5";

    return (
        <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars color={color} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

// Estilo CSS en el mismo archivo
const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'transparent',
    },
    title: {
        position: 'absolute',
        top: '10px',
        left: '0',
        right: '0',
        zIndex: 10,
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '2rem',
        fontWeight: 300,
        color: '#d4418e',
        textShadow: '0 2px 10px rgba(212, 65, 142, 0.3)',
    },
    heart: {
        position: 'absolute',
        pointerEvents: 'none',
        animation: 'float 2s ease-out forwards',
    }
};

// Partículas del sistema (corazones/brillos)
const Particles = ({ count = 20 }) => {
    const mesh = useRef();
    const dummy = new THREE.Object3D();
    const particles = useRef([]);

    // Inicializar partículas
    useEffect(() => {
        particles.current = Array.from({ length: count }, () => ({
            position: [
                Math.random() * 10 - 5,
                Math.random() * 10 - 2,
                Math.random() * 10 - 5
            ],
            scale: Math.random() * 0.2 + 0.05,
            rotation: Math.random() * Math.PI,
            velocity: [
                Math.random() * 0.01 - 0.005,
                Math.random() * 0.01 + 0.003,
                Math.random() * 0.01 - 0.005
            ]
        }));
    }, [count]);

    // Animar partículas
    useFrame(() => {
        particles.current.forEach((particle, i) => {
            // Actualizar posición
            particle.position[0] += particle.velocity[0];
            particle.position[1] += particle.velocity[1];
            particle.position[2] += particle.velocity[2];

            // Reiniciar si la partícula va demasiado lejos
            if (particle.position[1] > 5) {
                particle.position[1] = -2;
                particle.position[0] = Math.random() * 10 - 5;
                particle.position[2] = Math.random() * 10 - 5;
            }

            // Aplicar a dummy y a la malla instanciada
            dummy.position.set(...particle.position);
            dummy.rotation.set(0, particle.rotation += 0.01, 0);
            dummy.scale.set(particle.scale, particle.scale, particle.scale);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ff88cc" transparent opacity={0.6} />
        </instancedMesh>
    );
};

// Rosa matemática (puntos)
const MathRosePoints = ({ color = "#ff3366", secondaryColor = "#331133", pointSize = 2, rotation = true }) => {
    const meshRef = useRef();

    // Generar los puntos de la rosa matemática
    const { positions, colors } = useMemo(() => {
        const xLo = 0;
        const xHi = 1;
        const xCount = 20;
        const thetaLo = -2 * Math.PI;
        const thetaHi = 15 * Math.PI;
        const thetaCount = 1500;

        let vertex = [];
        let colors = [];
        let radius = [];

        for (let x = xLo; x <= xHi; x += (xHi - xLo) / xCount) {
            for (let theta = thetaLo; theta <= thetaHi; theta += (thetaHi - thetaLo) / thetaCount) {
                let phi = (Math.PI / 2) * Math.exp(-theta / (8 * Math.PI));
                let X = 1 - (1 / 2) * ((5 / 4) * (1 - ((3.6 * theta) % (2 * Math.PI)) / Math.PI) ** 2 - 1 / 4) ** 2;
                let y = 1.95653 * (x ** 2) * ((1.27689 * x - 1) ** 2) * Math.sin(phi);
                let r = X * (x * Math.sin(phi) + y * Math.cos(phi));

                // Asegurar que el radio es positivo y escalar
                if (0 < r) {
                    const factor = 15; // Reducido un poco para que se ajuste mejor
                    r = r * factor;
                    radius.push(r);
                    X = X * factor;

                    vertex.push(
                        r * Math.sin(theta),
                        r * Math.cos(theta),
                        X * (x * Math.cos(phi) - y * Math.sin(phi))
                    );
                }
            }
        }

        // Color basado en el radio
        let rLo = Math.min(...radius);
        let rHi = Math.max(...radius);
        let colorArray = [];

        for (let i = 0; i < radius.length; i++) {
            // Analizar los colores hex para personalizar
            const primaryColor = new THREE.Color(color);
            const secColor = new THREE.Color(secondaryColor);

            // Crear gradiente basado en el radio
            const ratio = (radius[i] - rLo) / (rHi - rLo);
            const rValue = primaryColor.r * ratio + secColor.r * (1 - ratio);
            const gValue = primaryColor.g * ratio + secColor.g * (1 - ratio);
            const bValue = primaryColor.b * ratio + secColor.b * (1 - ratio);

            const clr = new THREE.Color(rValue, gValue, bValue);
            colorArray.push(clr.r, clr.g, clr.b);
        }

        return {
            positions: new Float32Array(vertex),
            colors: new Float32Array(colorArray)
        };
    }, [color, secondaryColor]);

    // Animación de rotación
    useFrame((state, delta) => {
        if (rotation && meshRef.current) {
            meshRef.current.rotation.y += 0.003;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={pointSize}
                vertexColors
                transparent
                opacity={0.9}
                depthTest={false}
                sizeAttenuation={false}
            />
        </points>
    );
};

// Componente principal de la rosa (solo matemática)
const RosaCombinada = ({ onClick }) => {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    const { camera } = useThree();

    // Manejar estado de hover
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    // Manejar animación de click
    const handleClick = () => {
        onClick();
        gsap.to(group.current.scale, {
            x: 1.1,
            y: 1.1,
            z: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    };

    // Animación de rotación
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Rotación base
        group.current.rotation.y = t * 0.1;

        // Rotación adicional en hover
        if (hovered) {
            group.current.rotation.y = t * 0.3;
        }

        // Movimiento suave de flotación
        group.current.position.y = Math.sin(t * 0.5) * 0.5;
    });

    // Animación inicial
    useEffect(() => {
        // Posicionar cámara
        camera.position.set(0, 0, 8);

        // Animación de florecimiento
        gsap.from(group.current.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            duration: 3,
            ease: "elastic.out(1, 0.3)"
        });
    }, [camera]);

    return (
        <group
            ref={group}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Rosa matemática de puntos */}
            <MathRosePoints
                color="#ff3366"
                secondaryColor="#331133"
                pointSize={1.5}
            />
        </group>
    );
};

// Componente principal
const RosaFlotante = () => {
    const [clicked, setClicked] = useState(false);
    const textRef = useRef();

    // Manejar click en la rosa
    const handleRoseClick = () => {
        setClicked(true);

        // Reiniciar después de la animación
        setTimeout(() => setClicked(false), 1000);
    };

    return (
        <div style={styles.container}>
            {/* Corazones flotantes cuando se hace clic */}
            {clicked && (
                <div style={{position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none'}}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.heart,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                transform: `scale(${Math.random() * 1 + 0.5})`,
                                opacity: Math.random() * 0.7 + 0.3
                            }}
                        >
                            <Heart size={24} fill="#ec4899" />
                        </div>
                    ))}
                </div>
            )}

            {/* Canvas 3D */}
            <Canvas shadows dpr={[1, 2]} style={{background: 'transparent'}}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                />
                <spotLight
                    position={[-5, 5, 5]}
                    intensity={0.5}
                    angle={0.3}
                    penumbra={0.5}
                />

                <RosaCombinada onClick={handleRoseClick} />
                <Particles count={15} />

                {/* Eliminamos ContactShadows para quitar la base gris */}

                <Environment preset="sunset" />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI}
                    rotateSpeed={0.5}
                />
            </Canvas>

            {/* Estilo CSS para la animación de corazones */}
            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) scale(1.2) rotate(10deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-60px) scale(0.8) rotate(-5deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default RosaFlotante;
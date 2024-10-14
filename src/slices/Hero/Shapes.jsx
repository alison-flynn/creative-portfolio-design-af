"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
    return (
        // Adjust margins for different screen sizes
        <div className="row-span-1 row-start-1 aspect-square md:col-span-1 md:col-start-2 mt-0 md:-mt-[35vh]">
            <Canvas className="z-0" shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}>
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}
                    />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}

function Geometries() {
    const torusKnotGeometry = new THREE.TorusKnotGeometry(.5, 0.2, 100, 16); // Tiny TorusKnotGeometry

    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(2.3),
        },
        {
            position: [-1.4, 2, -4],
            r: 0.6,
            geometry: new THREE.DodecahedronGeometry(1.4),
        },
        {
            position: [-0.8, -0.75, 5],
            r: 0.5,
            geometry: new THREE.TorusGeometry(0.5, 0.25, 16, 32),
        },
        {
            position: [1.6, 1.6, -4],
            r: 0.7,
            geometry: new THREE.OctahedronGeometry(1.5),
        },
        {
            position: [1, -.75, 4],
            r: 0.5,
            geometry: torusKnotGeometry,
        },
    ];

    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xD8BFD8, metalness: 1, roughness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0xC8A2C8, metalness: 1, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({ color: 0x8A87C6, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0xD3D3D3, metalness: 1, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x708090, roughness: 0.1 }),
    ];

    const soundEffects = [
        new Audio("/sounds/knock6.mp3"),
        new Audio("/sounds/knock4.wav"),
        new Audio("/sounds/knock8.mp3"),
        new Audio("/sounds/knock9.mp3"),
        new Audio("/sounds/knock10.mp3"),
    ];

    return geometries.map(({ position, r, geometry, material }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p) => p * 2)}
            soundEffects={soundEffects}
            geometry={geometry}
            materials={material || materials}
            r={r}
        />
    ));
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);

    const startingMaterial = Array.isArray(materials) ? getRandomMaterial() : materials;

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e) {
        const mesh = e.object;

        gsap.utils.random(soundEffects).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1, 0.3)",
            yoyo: true,
        });

        if (Array.isArray(materials)) {
            mesh.material = getRandomMaterial();
        }
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: "elastic.out(1,0.3)",
                delay: 0.3,
            });
        });

        return () => ctx.revert(); // Clean up properly
    }, []);

    return (
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                    geometry={geometry}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                    material={startingMaterial}
                />
            </Float>
        </group>
    );
}

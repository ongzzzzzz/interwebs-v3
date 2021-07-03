import styles from './orbits.module.css'

import { useWindowSize } from '../lib/utils'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

import { useTexture, OrbitControls } from '@react-three/drei';

import { Vector3 } from 'three'


// let c = [0, 0, 2];
// let u = [0, 2, -2];
// let v = [-4, 0, 2];

let c = [7, 0, 3];
let u = [6, -4, -3];
let v = [-4, 3, -3];


const Sun = () => {
    const sunRef = useRef(null)
    const texture = useTexture("/static/sun-texture.png")
    useFrame(
        () => (sunRef.current.rotation.x = sunRef.current.rotation.y += 0.01)
    )

    return (
        <mesh ref={sunRef} position={[c[0], c[1], c[2]]}>
            <sphereGeometry args={[5.5, 80, 80]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    )
}

const Earth = ({ t }) => {
    const earthRef = useRef(null)
    const [earthTexture, earthBump] = useTexture(["/static/earth-texture.jpg", "/static/earth-bump.jpg"])

    let vec = new Vector3(
        c[0] + Math.cos(t) * (u[0] - c[0]) + Math.sin(t) * (v[0] - c[0]),
        c[1] + Math.cos(t) * (u[1] - c[1]) + Math.sin(t) * (v[1] - c[1]),
        c[2] + Math.cos(t) * (u[2] - c[2]) + Math.sin(t) * (v[2] - c[2])
    );
    useFrame(
        () => {
            earthRef.current.rotation.x = earthRef.current.rotation.y += 0.01;
            earthRef.current.position.lerp(vec, 0.1)
        }
    )



    return (
        <mesh ref={earthRef} position={[0, 0, 0]}>
            <sphereGeometry args={[2, 80, 80]} />
            <meshStandardMaterial attach="material" map={earthTexture} bumpMap={earthBump} bumpScale={0.3} />
        </mesh>
    )
}

const Mars = () => {
    const marsRef = useRef(null)
    const [marsTexture, marsBump] = useTexture(["/static/mars-texture.jpg", "/static/mars-bump.jpg"])
    useFrame(
        () => (marsRef.current.rotation.x = marsRef.current.rotation.y += 0.01)
    )

    return (
        <mesh ref={marsRef} position={[0, 0, 0]}>
            <sphereGeometry args={[2, 80, 80]} />
            <meshStandardMaterial attach="material" map={marsTexture} bumpMap={marsBump} bumpScale={0.3} />
        </mesh>
    )
}


// for mobile (smaller than tablet), just remove orbiting on scroll

export default function Orbits({ mobile, percentage, ...props }) {

    let size = useWindowSize();

    let t = -(1 + Math.min(Math.max((percentage - 0.37) / 0.26, 0), 1)) * Math.PI;


    return (
        <div className="w-full" style={{ height: "160vh" }}>

            <Canvas camera={{ position: [0, -20, 0], fov: 40 }} >
                <OrbitControls />

                <axesHelper args={[10]} />
                {/* <gridHelper args={[50, 100]} rotation={[Math.PI / 2, 0, 0]} /> */}
                <gridHelper args={[50, 100]} />
                {/* 2 grid box = value of 1 */}

                <ambientLight args={[0xffffff, 0.1]} />
                <pointLight args={[0xffffff, 0.9]} position={[c[0], c[1], c[2]]} />

                <Suspense fallback={null}>
                    <Sun />

                    <Earth t={t} />
                    {/* <Mars /> */}
                </Suspense>

            </Canvas>
        </div>
    )
}






// https://codesandbox.io/s/three-fiber-useloader-rohv5
// https://www.digitalocean.com/community/tutorials/react-react-with-threejs
// https://www.smashingmagazine.com/2020/11/threejs-react-three-fiber/
// https://joooooo308.medium.com/react-three-fiber-lets-create-a-dice-b83f322d28ea
// https://formidable.com/blog/2021/react-three-fiber/

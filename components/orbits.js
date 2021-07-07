import { Suspense, useRef, useState, useEffect } from 'react'

import { useWindowSize, mapNum } from '../lib/utils'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useTexture, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three'


// https://www.geogebra.org/calculator/v7xzgeaq
let c = [7, 0, 6];
let u = [6, -4, -2];
let v = [-4, 3, 0];


const Sun = () => {
    const sunRef = useRef(null)
    const texture = useTexture("/static/sun-texture.png")
    useFrame(
        () => (sunRef.current.rotation.x = sunRef.current.rotation.y += 0.001)
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

    // 0.5 => 2pi
    // if greater than 0.5 then just set as 0
    // else, make it in the range (pi -> 0) 

    // console.log(t)

    let speed = 0.8;
    let k = speed * t <= 0.5 ? Math.PI * (1 - 2 * t * speed) : 0;

    let vec = new Vector3(
        c[0] + Math.cos(k) * (u[0] - c[0]) + Math.sin(k) * (v[0] - c[0]),
        c[1] + Math.cos(k) * (u[1] - c[1]) + Math.sin(k) * (v[1] - c[1]),
        c[2] + Math.cos(k) * (u[2] - c[2]) + Math.sin(k) * (v[2] - c[2])
    );
    useFrame(
        () => {
            earthRef.current.rotation.x += 0.005; 
            earthRef.current.rotation.y += 0.01; 
            earthRef.current.position.lerp(vec, 0.1);
        }
    )

    return (
        <mesh ref={earthRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 80, 80]} />
            <meshStandardMaterial attach="material" map={earthTexture} bumpMap={earthBump} bumpScale={0.1} />
        </mesh>
    )
}

const Mars = () => {
    const marsRef = useRef(null)
    const [marsTexture, marsBump] = useTexture(["/static/mars-texture.jpg", "/static/mars-bump.jpg"])
    useFrame(
        () => {
            marsRef.current.rotation.x += 0.005; 
            marsRef.current.rotation.y -= 0.01; 
        }
    )

    return (
        <mesh ref={marsRef} position={[-8, 0, -5]}>
            <sphereGeometry args={[2.5, 80, 80]} />
            <meshStandardMaterial attach="material" map={marsTexture} bumpMap={marsBump} bumpScale={0.3} />
        </mesh>
    )
}


export default function Orbits({ isMobile, width, percentage }) {

    // set percent to be from 0 to 1
    let realPercent = mapNum(percentage, 0.21, 1 - 0.21, 0, 1)

    // let t = -(1 + Math.min(Math.max( realPercent , 0), 1)) * Math.PI;
    let t = Math.min(Math.max(realPercent, 0), 1);


    return (
        <div className="w-full -z-20" style={{ height: "240vh" }}>

            <Canvas linear camera={{ position: [0, -30, 0], fov: 40 }} >
                {/* <OrbitControls /> */}
                {/* <axesHelper args={[10]} /> */}
                {/* <gridHelper args={[50, 100]} /> */}
                {/* 2 grid box = value of 1 */}

                <ambientLight args={[0xffffff, 0.1]} />
                <pointLight args={[0xffffff, 1.2]} position={[c[0], c[1], c[2]]} />

                <Suspense fallback={null}>
                    <Sun />
                    <Earth t={t} />
                    <Mars />
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

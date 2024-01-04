import { useFrame } from '@react-three/fiber'
import {
    useHelper,
    OrbitControls,
    BakeShadows,
    SoftShadows,
    AccumulativeShadows,
    RandomizedLight,
    ContactShadows,
    Sky,
    Environment,
    Lightformer
} from '@react-three/drei'
import { useRef, Suspense } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'
import Cubes from './Cubes'

export default function Experience() {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    const cube = useRef()


    useFrame((state, delta) => {
        const time = state.clock.elapsedTime
        cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { color, opacity, blur } = useControls('contact shadow', {
        color: '#1d8f75',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 }
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntesity } = useControls('environment map', {
        envMapIntesity: { value: 3.5, min: 0, max: 12 }

    })

    const { colorBackground } = useControls('colorOfABackground', {
        colorBackground: '#000000'
    })

    return <>

        <Environment
            background
            // files={[
            //     './environmentMaps/2/px.jpg',
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg'
            // ]}
            // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
            preset='sunset'
            resolution={32}
        >
            <color args={[colorBackground]} attach={"background"} />
            {/* <Lightformer 
            position-z={-5}
            scale={10}
            color='red'
            form={'ring'}
            /> */}
            {/* <mesh position-z={-5} scale={5}>
                <planeGeometry />
                <meshBasicMaterial color={[1,0,0]}/>
            </mesh> */}

        </Environment>

        {/* <BakeShadows /> */}
        {/* <SoftShadows size={25} samples={10} focus={0} /> */}
        <color
            args={['ivory']}
            attach="background" />

        <Perf
            position="top-left"
            showGraph="false"
        />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity}
            blend={100}
            temporal
        >
            <RandomizedLight
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={3}
                position={[1, 2, 3]}
                bias={0.001}
            />

        </AccumulativeShadows> */}

        <ContactShadows
            position={[0, -0.99, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
        />
        {/* <directionalLight
            ref={directionalLight}
            position={sunPosition}
            intensity={4.5}
            castShadow
            shadow-mapSize={[1024, 1024]}

            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        /> */}

        {/* <ambientLight intensity={1.5} /> */}


        {/* <Sky sunPosition={sunPosition}/> */}

        <mesh
            castShadow
            position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntesity} />
        </mesh>

        <mesh
            castShadow
            ref={cube}
            position-x={2}
            scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntesity} />
        </mesh>

        <mesh
            position-y={- 1}
            rotation-x={- Math.PI * 0.5}
            scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntesity} />
        </mesh>

        <Suspense fallback={null}>
            <Cubes
                position={[0, 0, 0]}
                rotation={[0, 0, Math.PI]}
                scale={1}/>
        </Suspense>
    </>
}
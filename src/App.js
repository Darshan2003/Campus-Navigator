import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import SecondFloor from "./Models/SecondFloor";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { Pathfinding } from 'three-pathfinding';
import UI from "./UI";
import { FaChevronUp } from "react-icons/fa6";
import { TfiHelpAlt } from "react-icons/tfi";
import Modal from "./Modal";
import ChangeOrientationModal from "./Modals/ChangeOrientationModal";
import InformationModal from "./Modals/InformationModal";
import { ClimbingBoxLoader } from "react-spinners";
// Extend will make OrbitControls available as a JSX element called orbitControls for use in the canvas
extend({ OrbitControls });

const Controls = (props) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  camera.fov = 50;

  useFrame(() => {
    if (props.characterRef.current) {
      // Set the target to the character's position
      const offset = new THREE.Vector3(0, 2.8, 0); // Offset from the character's position
      const position = props.characterRef.current.position.clone().add(offset);
      orbitRef.current.target.copy(position);
    }
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      enableZoom={true} // disable zoom
      maxDistance={3}
      minDistance={1}
      enablePan={false} // disable pan
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Character = React.forwardRef((props, ref) => {
  const fbxIdle = useLoader(FBXLoader, "/meshes/Idle.fbx");
  const fbxWalking = useLoader(FBXLoader, "/meshes/Walking.fbx"); // Load the Walking.fbx animation
  const mixer = new THREE.AnimationMixer(fbxIdle);
  const actionIdle = mixer.clipAction(fbxIdle.animations[0]);
  const actionWalking = mixer.clipAction(fbxWalking.animations[0]); // Create an action for the Walking.fbx animation

  actionIdle.play();

  fbxIdle.scale.set(0.02, 0.02, 0.02);

  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {

    if (fbxIdle) {
      props.setLoading(false);
    }
    const handleKeyDown = (event) => {
      if (event.code === 'KeyW') {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'KeyW') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const totalLength = props.pathLine?.geometry?.parameters?.path?.getLength();
  const speed = 0.045; // Speed of the character in units per frame
  const points = props.pathLine?.geometry?.parameters?.path?.getSpacedPoints(Math.ceil(totalLength / speed));

  useFrame((state, delta) => {
    mixer.update(delta);

    if(points?.length && props.pointIndex.current >= points.length)
    {
      props.setPathLine(null);
    }
    if (props.pathLine && props.pointIndex.current < points.length && (props.canMove || isSpacePressed)) {
      const point = points[props.pointIndex.current];
      const nextPoint = points[props.pointIndex.current + 1] || point;
      ref.current.position.set(point.x, point.y, point.z);
      ref.current.lookAt(nextPoint.x, nextPoint.y, nextPoint.z);
      props.pointIndex.current++;

      actionIdle.stop(); // Stop the Idle.fbx animation
      actionWalking.play(); // Play the Walking.fbx animation
    } else {
      actionWalking.stop(); // Stop the Walking.fbx animation
      actionIdle.play(); // Play the Idle.fbx animation
    }
  });


  return <primitive object={fbxIdle} ref={ref} {...props} />;
});


export default function App() {
  const characterRef = useRef();
  const [startPosition, setStartPosition] = useState(new THREE.Vector3(-6.746381806644152, -0.024903026580630705, -49.675460097709134));
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(-6.746381806644152, -0.024903026580630705, -49.675460097709134));
  const [startLabel, setStartLabel] = useState('Start');
  const [targetLabel, setTargetLabel] = useState('Target');
  const [pathLine, setPathLine] = useState(null);
  const [canMove, setCanMove] = useState(false);
  const pointIndex = useRef(0);
  const gltf = useLoader(GLTFLoader, '/meshes/secondFloor.nav.glb');
  const [showModal, setShowModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isMobile && isPortrait) {
      setShowModal(true);
    }
  }, []);

  const pathfinder = new Pathfinding();
  const zone = Pathfinding.createZone(gltf.scene.children[0].geometry);
  pathfinder.setZoneData('navmesh', zone);

  const findShortestPath = () => {
    if (startPosition == targetPosition)
      return;
    try {
      const groupID = pathfinder.getGroup('navmesh', startPosition);
      let path = pathfinder.findPath(startPosition, targetPosition, 'navmesh', groupID);
      // append start position to start and target position to end
      if (path==null || path?.length == 0) {
        return;
      }
      path = [startPosition, ...path, targetPosition];
      console.log(path);
      const curve = new THREE.CatmullRomCurve3(path);
      // const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
      const material = new THREE.LineBasicMaterial({ color: 0x037dff }); // Red color
      const line = new THREE.Line(geometry, material);

      pointIndex.current = 0;
      setPathLine(line);
    }
    catch (e) {
      console.log(e);
    }
  }



  return (
    <div>
      {
      loading ? 
        <div className="bg-black absolute z-50 w-full h-screen flex justify-center items-center">
          <ClimbingBoxLoader color="white" size={15}/> 
        </div>
      :
        <></>}

        {/* move forward button */}
        {helpModal ?
          <InformationModal setShowModal={setHelpModal} /> :
          <></>}
        {showModal ?
          <ChangeOrientationModal setShowModal={setShowModal} /> :
          <></>}
        {pathLine ?
          <button
            onMouseDown={() => { setCanMove(true) }}
            onMouseUp={() => { setCanMove(false) }}
            onMouseLeave={() => { setCanMove(false) }}
            onTouchStart={() => { setCanMove(true) }}
            onTouchEnd={() => { setCanMove(false) }}
            className="absolute z-30 bottom-[20%] left-[10%] border-brand-500 hover:bg-brand-600/10 active:bg-brand-700/10 dark:border-brand-400 flex items-center justify-center rounded-xl border-2 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer dark:text-white active:bg-white/20 w-16 h-16 bg-black bg-opacity-50">
            <FaChevronUp className="text-brand-500 dark:text-white" />
          </button> : <></>
        }
        <div className="absolute z-30 bottom-[3%] right-[1.5%]">
          <button className="circle-glow" onClick={() => setHelpModal(true)}>
            <TfiHelpAlt color='white' size={30} />
          </button>
        </div>
        <UI findShortestPath={findShortestPath} startDropdownParams={{ setLocation: setStartPosition, label: startLabel, setLabel: setStartLabel, characterPosition: characterRef }} targetDropdownParams={{ setLocation: setTargetPosition, label: targetLabel, setLabel: setTargetLabel, characterPosition: characterRef }} />
        <Canvas
          camera={{ position: [3, 20, 14.25] }}
          style={{
            backgroundColor: "#111a21",
            width: "100vw",
            height: "100vh"
          }}
        >
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Character canMove={canMove} setLoading={setLoading} ref={characterRef} setPathLine={setPathLine} position={[-6.746381806644152, -0.024903026580630705, -49.675460097709134]} pathLine={pathLine} pointIndex={pointIndex} />
            <SecondFloor position={[0, -0.1, 0]} />
            {/* <NavMesh position={[0, 0, 0]} /> */}
            {pathLine && <primitive object={pathLine} />}
          </Suspense>
          <Controls characterRef={characterRef} />
        </Canvas>
    
    </div>
  );
}

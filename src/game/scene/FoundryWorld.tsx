"use client";

import { Billboard } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { CanvasTexture, Raycaster, SRGBColorSpace, Vector3 } from "three";
import { PlayerController } from "@/game/player/PlayerController";
import { useGameStore, type AreaId } from "@/game/state/game-store";
import type { CameraInput } from "@/game/types";

type Area = {
  id: AreaId;
  title: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
  accent: string;
  shape: "lab" | "archive" | "workshop" | "pavilion" | "signal";
};

const areas: Area[] = [
  { id: "about", title: "About Me", subtitle: "Welcome plaza", position: [0, 0, -2.45], color: "#526b61", accent: "#d0a179", shape: "pavilion" },
  { id: "projects", title: "Projects Lab", subtitle: "Selected work", position: [7, 0, -4], color: "#4b615c", accent: "#d4aa7f", shape: "lab" },
  { id: "experience", title: "Experience", subtitle: "Career archive", position: [7, 0, 5], color: "#715945", accent: "#dfbd94", shape: "archive" },
  { id: "skills", title: "Technology Workshop", subtitle: "Tools & craft", position: [-7, 0, 5], color: "#506a60", accent: "#c5d3b9", shape: "workshop" },
  { id: "contact", title: "Contact", subtitle: "Signal pavilion", position: [-7, 0, -4], color: "#657264", accent: "#d2bd8c", shape: "signal" },
];

export const areaTitles: Record<AreaId, string> = {
  about: "About Me",
  projects: "Projects Laboratory",
  experience: "Professional Experience",
  skills: "Technology Workshop",
  contact: "Contact Center",
};

function FoundryStation({ area }: { area: Area }) {
  const isLow = area.shape === "pavilion" || area.shape === "signal";
  const width = area.shape === "lab" ? 1.65 : area.shape === "workshop" ? 1.55 : 1.35;
  const height = isLow ? 1.1 : area.shape === "archive" ? 2 : 1.75;
  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 144;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to create the Foundry station label.");
    }

    context.fillStyle = "#182927";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#718078";
    context.lineWidth = 3;
    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#f0eee3";
    context.font = "500 34px Arial, sans-serif";
    context.fillText(area.title, canvas.width / 2, 55, 470);
    context.fillStyle = area.accent;
    context.font = "500 17px Arial, sans-serif";
    context.letterSpacing = "2px";
    context.fillText(area.subtitle.toUpperCase(), canvas.width / 2, 102, 470);

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [area.accent, area.subtitle, area.title]);

  useEffect(() => () => labelTexture.dispose(), [labelTexture]);

  return (
    <group position={area.position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[width * 0.68, height * 0.48, 0.72]} position={[0, height * 0.48, 0]} />
      </RigidBody>
      <mesh position={[0, 0.13, 0]} receiveShadow>
        <boxGeometry args={[width * 2.2, 0.26, 1.9]} />
        <meshStandardMaterial color="#273a37" roughness={0.92} />
      </mesh>
      <mesh position={[0, height * 0.51, 0]} castShadow userData={{ cameraBlocker: true }}>
        <boxGeometry args={[width * 1.7, height, 1.42]} />
        <meshStandardMaterial color={area.color} roughness={0.78} />
      </mesh>
      <mesh position={[0, height + 0.07, 0]} castShadow userData={{ cameraBlocker: true }}>
        {area.shape === "pavilion" || area.shape === "signal"
          ? <cylinderGeometry args={[width * 0.96, width * 1.05, 0.18, 6]} />
          : <boxGeometry args={[width * 1.92, 0.18, 1.7]} />}
        <meshStandardMaterial color={area.accent} roughness={0.72} />
      </mesh>
      <mesh position={[0, height * 0.58, 0.72]} castShadow userData={{ cameraBlocker: true }}>
        <boxGeometry args={[width * 0.7, Math.min(height * 0.48, 0.9), 0.045]} />
        <meshStandardMaterial
          color="#172626"
          emissive={area.accent}
          emissiveIntensity={0.16}
          roughness={0.34}
          metalness={0.18}
        />
      </mesh>
      <mesh position={[0, height + 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 0.61, 40]} />
        <meshBasicMaterial color={area.accent} transparent opacity={0.62} />
      </mesh>
      <Billboard position={[0, height + 0.45, 0]}>
        <mesh>
          <planeGeometry args={[2.8, 0.79]} />
          <meshBasicMaterial map={labelTexture} toneMapped={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

function InteractionRange({ position }: { position: MutableRefObject<Vector3> }) {
  const elapsed = useRef(0);
  const setNearbyArea = useGameStore((state) => state.setNearbyArea);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current < 0.12) return;
    elapsed.current = 0;

    const player = position.current;
    let nearest: Area | null = null;
    let nearestDistance = 2.9;
    for (const area of areas) {
      const distance = Math.hypot(player.x - area.position[0], player.z - area.position[2]);
      if (distance < nearestDistance) {
        nearest = area;
        nearestDistance = distance;
      }
    }

    setNearbyArea(nearest?.id ?? null);
  });

  return null;
}

function CameraFollow({
  position,
  cameraInput,
}: {
  position: MutableRefObject<Vector3>;
  cameraInput: MutableRefObject<CameraInput>;
}) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new Raycaster());
  const direction = useRef(new Vector3());
  const target = useRef(new Vector3());
  const desired = useRef(new Vector3());
  const origin = useRef(new Vector3());
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    const player = position.current;
    const { yaw, pitch } = cameraInput.current;
    target.current.set(player.x, player.y + 0.28, player.z);
    desired.current.set(
      player.x + Math.sin(yaw) * 6.7,
      player.y + 2.1 + pitch * 1.5,
      player.z + Math.cos(yaw) * 6.7,
    );

    elapsed.current += delta;
    if (elapsed.current > 0.08) {
      elapsed.current = 0;
      origin.current.set(player.x, player.y + 0.8, player.z);
      direction.current.copy(desired.current).sub(origin.current).normalize();
      raycaster.current.set(origin.current, direction.current);
      const blocker = raycaster.current
        .intersectObjects(scene.children, true)
        .find((hit) => hit.object.userData.cameraBlocker);
      if (blocker) {
        const distance = Math.max(1.7, blocker.distance - 0.55);
        desired.current.copy(origin.current).addScaledVector(direction.current, distance);
      }
    }

    camera.position.lerp(desired.current, 1 - Math.exp(-delta * 5.5));
    camera.lookAt(target.current);
  });

  return null;
}

function Ground() {
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[16, 0.2, 16]} position={[0, -0.2, 0]} />
        <CuboidCollider args={[16, 1.2, 0.3]} position={[0, 0.65, -16.1]} />
        <CuboidCollider args={[16, 1.2, 0.3]} position={[0, 0.65, 16.1]} />
        <CuboidCollider args={[0.3, 1.2, 16]} position={[-16.1, 0.65, 0]} />
        <CuboidCollider args={[0.3, 1.2, 16]} position={[16.1, 0.65, 0]} />
        <mesh position={[0, -0.34, 0]} receiveShadow>
          <boxGeometry args={[32, 0.28, 32]} />
          <meshStandardMaterial color="#283d3a" roughness={0.95} />
        </mesh>
      </RigidBody>
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[31.8, 31.8]} />
        <meshStandardMaterial color="#354a43" roughness={0.96} />
      </mesh>
      <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.04, 64]} />
        <meshStandardMaterial color="#b39775" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.7, 7.79, 64]} />
        <meshBasicMaterial color="#829188" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.08, 0.04, 5.5]} />
        <meshStandardMaterial color="#a9906d" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.016, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.08, 0.04, 5.5]} />
        <meshStandardMaterial color="#a9906d" roughness={0.85} />
      </mesh>
    </>
  );
}

export function FoundryWorld({
  cameraInput,
}: {
  cameraInput: MutableRefObject<CameraInput>;
}) {
  const position = useRef(new Vector3(0, 0.95, 0));

  return (
    <>
      <color attach="background" args={["#172426"]} />
      <fog attach="fog" args={["#172426", 20, 42]} />
      <ambientLight intensity={1.15} color="#dbe4d7" />
      <directionalLight
        position={[-7, 11, 6]}
        intensity={2.2}
        color="#f0cfaa"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      <Physics gravity={[0, -9.81, 0]} colliders={false} timeStep="vary">
        <Ground />
        {areas.map((area) => <FoundryStation area={area} key={area.id} />)}
        <PlayerController position={position} cameraInput={cameraInput} />
        <InteractionRange position={position} />
      </Physics>
      <CameraFollow position={position} cameraInput={cameraInput} />
    </>
  );
}

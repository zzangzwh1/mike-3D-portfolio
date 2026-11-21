"use client";

import { CapsuleCollider, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type MutableRefObject } from "react";
import type { Group, Vector3 } from "three";
import { useGameStore } from "@/game/state/game-store";
import type { CameraInput } from "@/game/types";

type Props = {
  position: MutableRefObject<Vector3>;
  cameraInput: MutableRefObject<CameraInput>;
};

export function PlayerController({ position, cameraInput }: Props) {
  const body = useRef<RapierRigidBody>(null);
  const avatar = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftLeg = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const handleDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
      }
      if (!event.repeat) keys.current.add(event.key.toLowerCase());
    };
    const handleUp = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());
    const clear = () => keys.current.clear();

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("blur", clear);
    };
  }, []);

  useFrame(({ clock }, rawDelta) => {
    if (!body.current || !avatar.current) return;

    const delta = Math.min(rawDelta, 0.05);
    const activeArea = useGameStore.getState().activeArea;
    const pressed = keys.current;
    let forward = Number(pressed.has("w") || pressed.has("arrowup")) -
      Number(pressed.has("s") || pressed.has("arrowdown"));
    let lateral = Number(pressed.has("d") || pressed.has("arrowright")) -
      Number(pressed.has("a") || pressed.has("arrowleft"));

    if (activeArea) {
      forward = 0;
      lateral = 0;
    }

    const length = Math.hypot(forward, lateral);
    if (length > 1) {
      forward /= length;
      lateral /= length;
    }

    const yaw = cameraInput.current.yaw;
    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);
    const moveX = forwardX * forward + rightX * lateral;
    const moveZ = forwardZ * forward + rightZ * lateral;
    const isMoving = length > 0.02;
    const currentVelocity = body.current.linvel();
    const targetSpeed = 4.2;
    const smoothing = Math.min(1, delta * (isMoving ? 9 : 11));

    body.current.setLinvel({
      x: currentVelocity.x + (moveX * targetSpeed - currentVelocity.x) * smoothing,
      y: currentVelocity.y,
      z: currentVelocity.z + (moveZ * targetSpeed - currentVelocity.z) * smoothing,
    }, true);

    const translation = body.current.translation();
    position.current.set(translation.x, translation.y, translation.z);
    if (isMoving) {
      avatar.current.rotation.y = Math.atan2(moveX, moveZ);
    }

    const gait = isMoving ? Math.sin(clock.elapsedTime * 10) * 0.42 : 0;
    const idle = Math.sin(clock.elapsedTime * 1.7) * 0.025;
    avatar.current.position.y = idle + (isMoving ? Math.abs(Math.sin(clock.elapsedTime * 10)) * 0.035 : 0);
    if (leftArm.current) leftArm.current.rotation.x = gait;
    if (rightArm.current) rightArm.current.rotation.x = -gait;
    if (leftLeg.current) leftLeg.current.rotation.x = -gait * 0.75;
    if (rightLeg.current) rightLeg.current.rotation.x = gait * 0.75;
  });

  return (
    <RigidBody
      ref={body}
      position={[0, 0.95, 0]}
      colliders={false}
      linearDamping={0.9}
      lockRotations
      name="player"
    >
      <CapsuleCollider args={[0.38, 0.27]} />
      <group ref={avatar}>
        <mesh position={[0, -0.13, 0]} castShadow>
          <capsuleGeometry args={[0.25, 0.38, 4, 8]} />
          <meshStandardMaterial color="#c98e65" roughness={0.76} />
        </mesh>
        <mesh position={[0, 0.39, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 12]} />
          <meshStandardMaterial color="#d9b795" roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.42, 0.035]}>
          <sphereGeometry args={[0.205, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
          <meshStandardMaterial color="#263b39" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.1, -0.24]} castShadow>
          <boxGeometry args={[0.28, 0.34, 0.14]} />
          <meshStandardMaterial color="#506a60" roughness={0.88} />
        </mesh>
        <group ref={leftArm} position={[-0.3, -0.1, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.24, 3, 6]} />
            <meshStandardMaterial color="#d9b795" roughness={0.86} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.3, -0.1, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.24, 3, 6]} />
            <meshStandardMaterial color="#d9b795" roughness={0.86} />
          </mesh>
        </group>
        <group ref={leftLeg} position={[-0.12, -0.38, 0]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.2, 3, 6]} />
            <meshStandardMaterial color="#304745" roughness={0.88} />
          </mesh>
        </group>
        <group ref={rightLeg} position={[0.12, -0.38, 0]}>
          <mesh position={[0, -0.17, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.2, 3, 6]} />
            <meshStandardMaterial color="#304745" roughness={0.88} />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
}

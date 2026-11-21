"use client";

import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ArrowDownToLine, ArrowUpRight, MapPin, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  experience,
  profile,
  projects,
  skillGroups,
} from "@/content/portfolio";
import { areaTitles, FoundryWorld } from "@/game/scene/FoundryWorld";
import { useGameStore, type AreaId } from "@/game/state/game-store";
import type { CameraInput } from "@/game/types";

type Props = {
  onExit: () => void;
};

function sendKey(key: string, type: "keydown" | "keyup") {
  window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
}

function TouchControls() {
  const directions = [
    { key: "w", label: "Move forward", className: "touch-up" },
    { key: "a", label: "Move left", className: "touch-left" },
    { key: "s", label: "Move backward", className: "touch-down" },
    { key: "d", label: "Move right", className: "touch-right" },
  ];

  return (
    <div className="touch-controls" aria-label="Touch movement controls">
      {directions.map(({ key, label, className }) => (
        <button
          className={`touch-direction ${className}`}
          key={key}
          type="button"
          aria-label={label}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            sendKey(key, "keydown");
          }}
          onPointerUp={() => sendKey(key, "keyup")}
          onPointerCancel={() => sendKey(key, "keyup")}
          onLostPointerCapture={() => sendKey(key, "keyup")}
        >
          <span aria-hidden="true">
            {key === "w" ? "↑" : key === "s" ? "↓" : key === "a" ? "←" : "→"}
          </span>
        </button>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="game-field">
      <p>{label}</p>
      <div>{children}</div>
    </div>
  );
}

function ContentPanel({
  area,
  onClose,
}: {
  area: AreaId;
  onClose: () => void;
}) {
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!panel.current) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;
    gsap.fromTo(
      panel.current,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        ease: "power2.out",
      },
    );
  }, [area]);

  return (
    <aside
      className="game-panel"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-panel-title"
    >
      <div className="game-panel-top">
        <div>
          <p className="game-panel-eyebrow">
            MERIDIAN FOUNDRY <span>·</span> PORTFOLIO
          </p>
          <h2 id="game-panel-title">{areaTitles[area]}</h2>
        </div>
        <button
          className="game-icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close panel"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="game-panel-body">
        {area === "about" && (
          <>
            <p className="game-panel-lede">{profile.summary}</p>
            <Field label="Focus">
              <p>
                Full-stack application development · enterprise modernization ·
                production reliability · CI/CD and developer automation
              </p>
            </Field>
            <Field label="Technology">
              <p>
                .NET, C#, Angular, React, TypeScript, REST APIs, SQL Server,
                Azure DevOps, GitHub Actions, BuildMaster
              </p>
            </Field>
            <a
              className="game-download-link"
              href={profile.resumePath}
              download
            >
              <ArrowDownToLine size={15} aria-hidden="true" /> Download resume
            </a>
            <div className="game-contact-lines">
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              {profile.linkedInUrl && (
                <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        )}

        {area === "projects" &&
          projects.map((project, index) => (
            <article className="game-project" key={project.id}>
              <div className="game-project-heading">
                <span>
                  0{index + 1} / {project.category}
                </span>
                <h3>{project.name}</h3>
              </div>
              <p className="game-project-description">{project.description}</p>
              <Field label="Problem">
                <p>
                  {project.problem ??
                    "Further problem details were not specified in the resume."}
                </p>
              </Field>
              <Field label="Technology & architecture">
                <p>{project.technologies.join(" · ")}</p>
                <p>
                  {project.architecture ??
                    "Architecture details were not specified in the resume."}
                </p>
              </Field>
              <Field label="My contribution">
                <p>{project.contribution}</p>
              </Field>
              {project.challenge && (
                <Field label="Challenge">
                  <p>{project.challenge}</p>
                </Field>
              )}
              {project.outcome && (
                <Field label="Outcome">
                  <p>{project.outcome}</p>
                </Field>
              )}
              <p className="game-project-link">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Open project <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : (
                  "Public project link not provided"
                )}
              </p>
            </article>
          ))}

        {area === "experience" &&
          experience.map((role) => (
            <article
              className="game-role"
              key={`${role.company}-${role.dates}`}
            >
              <div className="game-role-heading">
                <div>
                  <h3>{role.role}</h3>
                  <span>{role.company}</span>
                </div>
                <time>{role.dates}</time>
              </div>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}

        {area === "skills" &&
          skillGroups.map((group) => (
            <Field key={group.name} label={group.name}>
              <div className="game-skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </Field>
          ))}

        {area === "contact" && (
          <>
            <p className="game-panel-lede">
              Let’s talk about reliable software, thoughtful modernization, or
              engineering workflows that give teams more time to build.
            </p>
            <div className="game-contact-lines">
              <p>
                <MapPin size={14} aria-hidden="true" /> {profile.location}
              </p>
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              {profile.linkedInUrl && (
                <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
            <a
              className="game-download-link"
              href={profile.resumePath}
              download
            >
              <ArrowDownToLine size={15} aria-hidden="true" /> Download resume
            </a>
          </>
        )}
      </div>
      <div className="game-panel-footer">
        <span>
          Press <kbd>ESC</kbd> to return to the world
        </span>
        <button type="button" onClick={onClose}>
          Close panel
        </button>
      </div>
    </aside>
  );
}

export default function GameExperience({ onExit }: Props) {
  const activeArea = useGameStore((state) => state.activeArea);
  const nearbyArea = useGameStore((state) => state.nearbyArea);
  const setActiveArea = useGameStore((state) => state.setActiveArea);
  const setNearbyArea = useGameStore((state) => state.setNearbyArea);
  const cameraInput = useRef<CameraInput>({ yaw: 0.56, pitch: 0.32 });
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const [webglAvailable] = useState(() => {
    if (typeof window === "undefined") return false;
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  });

  useEffect(() => {
    setActiveArea(null);
    setNearbyArea(null);
    return () => {
      setActiveArea(null);
      setNearbyArea(null);
    };
  }, [setActiveArea, setNearbyArea]);

  const exit = useCallback(() => {
    setActiveArea(null);
    setNearbyArea(null);
    onExit();
  }, [onExit, setActiveArea, setNearbyArea]);

  const interact = useCallback(
    (area: AreaId | null = nearbyArea) => {
      if (!area || activeArea) return;
      setActiveArea(area);
    },
    [activeArea, nearbyArea, setActiveArea],
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "e" && !event.repeat && nearbyArea) {
        event.preventDefault();
        interact(nearbyArea);
      } else if (event.key === "Escape") {
        if (activeArea) setActiveArea(null);
        else exit();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeArea, exit, interact, nearbyArea, setActiveArea]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLCanvasElement)) return;
    dragging.current = true;
    lastPointer.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const deltaX = event.clientX - lastPointer.current.x;
    const deltaY = event.clientY - lastPointer.current.y;
    lastPointer.current = { x: event.clientX, y: event.clientY };
    cameraInput.current.yaw -= deltaX * 0.004;
    cameraInput.current.pitch = Math.max(
      0.08,
      Math.min(0.86, cameraInput.current.pitch + deltaY * 0.003),
    );
  };

  return (
    <div
      className="game-overlay"
      role="region"
      aria-label="Interactive Meridian Foundry"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onLostPointerCapture={() => {
        dragging.current = false;
      }}
    >
      {webglAvailable ? (
        <Canvas
          className="game-canvas"
          dpr={[1, 1.4]}
          shadows
          camera={{ position: [0, 5, 9], fov: 47, near: 0.1, far: 70 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          fallback={
            <div className="game-fallback">
              WebGL is unavailable. Use the Quick View to browse the portfolio.
            </div>
          }
        >
          <FoundryWorld cameraInput={cameraInput} />
        </Canvas>
      ) : (
        <div className="game-fallback">
          <p>Interactive 3D is unavailable in this browser.</p>
          <button type="button" onClick={exit}>
            Return to Quick View
          </button>
        </div>
      )}

      <div className="game-hud">
        <div className="game-hud-brand">
          <span className="game-brand-mark">MC</span>
          <span>
            <strong>THE MERIDIAN FOUNDRY</strong>
            <small>AN INTERACTIVE PORTFOLIO</small>
          </span>
        </div>
        <div className="game-hud-controls">
          <span>
            <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd> / arrows <b>move</b>
          </span>
          <span>
            <kbd>E</kbd> <b>interact</b>
          </span>
          <span>
            drag <b>camera</b>
          </span>
        </div>
        <button className="game-exit-button" type="button" onClick={exit}>
          <span>Quick view</span>
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      {nearbyArea && !activeArea && (
        <button
          className="interaction-prompt"
          type="button"
          onClick={() => interact(nearbyArea)}
          aria-label={`Interact with ${areaTitles[nearbyArea]}`}
        >
          <kbd>E</kbd>
          <span>
            Interact with <strong>{areaTitles[nearbyArea]}</strong>
            <span className="interaction-tap-label">Tap to open</span>
          </span>
        </button>
      )}

      <TouchControls />

      {activeArea && (
        <ContentPanel area={activeArea} onClose={() => setActiveArea(null)} />
      )}
    </div>
  );
}

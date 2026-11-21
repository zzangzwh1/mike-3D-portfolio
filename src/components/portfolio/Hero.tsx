"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight, Gamepad2, MoveUpRight } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/portfolio";

const GameExperience = dynamic(
  () => import("@/components/game/GameExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="game-loading" role="status">
        Opening the Foundry…
      </div>
    ),
  },
);

export function Hero() {
  const [exploring, setExploring] = useState(false);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to portfolio content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mike Cho, home">
          <span className="wordmark-mark">MC</span>
          <span>
            <strong>Mike Cho</strong>
            <small>Software Engineer</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-quick-link" href="#about">
          Quick view <MoveUpRight size={14} aria-hidden="true" />
        </a>
      </header>
      <nav className="mobile-nav" aria-label="Portfolio sections">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#resume">Resume</a>
        <a href="#contact">Contact</a>
      </nav>

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            {profile.location}
            <span className="eyebrow-divider" />
            Full-stack engineering
          </div>
          <p className="hero-kicker">Hello, I’m Mike.</p>
          <h1 id="hero-title">
            Building software
            <br />
            <span>that holds up.</span>
          </h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <button
              className="button button-primary"
              onClick={() => setExploring(true)}
              type="button"
            >
              <Gamepad2 size={17} aria-hidden="true" />
              Start exploring
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a className="button button-quiet" href="#about">
              Quick view <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof">
            <span>4+ years in software</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise systems to full-stack applications</span>
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="Illustration of the Meridian Foundry world"
        >
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="world-plinth">
            <div className="world-ground">
              <span className="pathway path-main" />
              <span className="pathway path-cross" />
              <span className="plaza-ring" />
              <div className="foundry-building building-lab">
                <span className="building-window" />
                <span className="building-label">LAB</span>
              </div>
              <div className="foundry-building building-archive">
                <span className="building-window" />
                <span className="building-label">ARCHIVE</span>
              </div>
              <div className="foundry-building building-workshop">
                <span className="building-window" />
                <span className="building-label">WORKSHOP</span>
              </div>
              <div className="foundry-building building-pavilion">
                <span className="building-window" />
              </div>
              <div className="engineer-figure" aria-hidden="true">
                <span className="figure-shadow" />
                <span className="figure-body" />
                <span className="figure-head" />
                <span className="figure-backpack" />
              </div>
              <span className="map-pin pin-about">
                01 <b>ABOUT</b>
              </span>
              <span className="map-pin pin-projects">
                02 <b>PROJECTS</b>
              </span>
              <span className="map-pin pin-experience">
                03 <b>EXPERIENCE</b>
              </span>
              <span className="map-pin pin-skills">
                04 <b>SKILLS</b>
              </span>
              <span className="map-pin pin-contact">
                05 <b>CONTACT</b>
              </span>
            </div>
          </div>
          <div className="art-caption">
            <span className="caption-line" />
            <span>THE MERIDIAN FOUNDRY</span>
            <span className="caption-coordinates">53°32′N&nbsp; 113°30′W</span>
          </div>
          <div className="hero-controls">
            <span>
              <kbd>W</kbd>
              <kbd>A</kbd>
              <kbd>S</kbd>
              <kbd>D</kbd> move
            </span>
            <span>
              <kbd>E</kbd> interact
            </span>
          </div>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll to about">
          <span>Scroll to explore</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </section>

      {exploring && <GameExperience onExit={() => setExploring(false)} />}
    </>
  );
}

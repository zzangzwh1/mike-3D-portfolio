import { ArrowDownToLine, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Hero } from "@/components/portfolio/Hero";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/content/portfolio";

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="content-section about-section" id="about">
        <SectionHeading
          index="01"
          eyebrow="A little about me"
          title="I like the hard parts."
          description="The details between a useful idea and dependable software are where I do my best work."
        />
        <div className="about-grid">
          <div className="about-lede">
            <p>{profile.summary}</p>
            <div className="location-note">
              <MapPin size={15} aria-hidden="true" />
              Based in {profile.location}
            </div>
          </div>
          <div className="about-details">
            <article className="detail-tile">
              <span className="detail-number">01</span>
              <h3>Own the whole change</h3>
              <p>
                From requirements and solution design through release and
                production support.
              </p>
            </article>
            <article className="detail-tile">
              <span className="detail-number">02</span>
              <h3>Make legacy useful</h3>
              <p>
                Modernize enterprise systems without losing sight of the people
                who rely on them.
              </p>
            </article>
            <article className="detail-tile">
              <span className="detail-number">03</span>
              <h3>Automate with intent</h3>
              <p>
                Build repeatable delivery workflows and remove friction from
                engineering work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section projects-section" id="projects">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Built to solve real problems."
          description="A mix of full-stack product work, enterprise delivery, and engineering automation."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card project-card-${index + 1}`}
              key={project.id}
            >
              <div className="project-card-topline">
                <span className="project-category">{project.category}</span>
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="project-art" aria-hidden="true">
                <div className="project-art-grid" />
                <div className="project-art-object">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="project-art-type">
                  {project.id.replaceAll("-", " / ")}
                </span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="tag-list" aria-label="Technologies">
                {project.technologies.slice(0, 5).map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="tag tag-muted">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>
              <details className="project-details">
                <summary>
                  View case study <span aria-hidden="true">+</span>
                </summary>
                <div className="case-study">
                  {project.problem && (
                    <p>
                      <strong>Problem</strong>
                      {project.problem}
                    </p>
                  )}
                  {project.architecture && (
                    <p>
                      <strong>Architecture</strong>
                      {project.architecture}
                    </p>
                  )}
                  <p>
                    <strong>My contribution</strong>
                    {project.contribution}
                  </p>
                  {project.challenge && (
                    <p>
                      <strong>Challenge</strong>
                      {project.challenge}
                    </p>
                  )}
                  {project.outcome && (
                    <p>
                      <strong>Outcome</strong>
                      {project.outcome}
                    </p>
                  )}
                  <p className="project-link-note">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        Visit project{" "}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ) : (
                      "Public project link not provided"
                    )}
                  </p>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section experience-section" id="experience">
        <SectionHeading
          index="03"
          eyebrow="Professional experience"
          title="From feature to production."
          description="End-to-end ownership across enterprise applications, integrations, and delivery."
        />
        <div className="experience-layout">
          <div className="experience-list">
            {experience.map((role, index) => (
              <article
                className="experience-item"
                key={`${role.company}-${role.dates}`}
              >
                <div className="experience-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="experience-body">
                  <div className="experience-title-row">
                    <div>
                      <h3>{role.role}</h3>
                      <p className="experience-company">{role.company}</p>
                    </div>
                    <span className="experience-dates">{role.dates}</span>
                  </div>
                  <ul>
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <aside className="impact-card">
            <Sparkles size={17} aria-hidden="true" />
            <p className="impact-label">Engineering automation</p>
            <strong>90%+</strong>
            <p>
              Resume-reported accuracy for an AI development harness connected
              to Azure DevOps work items and repository context.
            </p>
            <div className="impact-divider" />
            <strong>70%+</strong>
            <p>
              Resume-reported reduction in development time from that harness.
            </p>
            <span className="impact-footnote">
              Figures as stated in the resume
            </span>
          </aside>
        </div>
      </section>

      <section className="content-section skills-section" id="skills">
        <SectionHeading
          index="04"
          eyebrow="Technology workshop"
          title="The tools behind the work."
          description="A practical toolkit across application development, data, delivery, cloud, and AI-assisted engineering."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-group" key={group.name}>
              <div className="skill-group-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.name}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="certification-strip">
          <span className="certification-label">Certifications</span>
          {certifications.map((certification) => (
            <span key={certification}>{certification}</span>
          ))}
        </div>
      </section>

      <section className="content-section education-section">
        <SectionHeading
          index="05"
          eyebrow="Learning"
          title="Building the foundation."
          description="Formal study alongside hands-on engineering."
        />
        <div className="education-list">
          {education.map((item) => (
            <article className="education-item" key={item.credential}>
              <div>
                <h3>{item.credential}</h3>
                <p>{item.institution}</p>
              </div>
              <div className="education-meta">
                <span>{item.dates}</span>
                {item.detail && <strong>{item.detail}</strong>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" id="resume">
        <div>
          <p className="section-eyebrow">Take it with you</p>
          <h2>More detail, one page away.</h2>
          <p>
            Download my resume for the full overview of experience, projects,
            and technical skills.
          </p>
        </div>
        <a className="button button-light" href={profile.resumePath} download>
          <ArrowDownToLine size={16} aria-hidden="true" />
          Download resume
        </a>
      </section>

      <section className="content-section contact-section" id="contact">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Good work starts with a conversation."
          description="Interested in enterprise software, developer productivity, or building something useful? Get in touch."
        />
        <div className="contact-card">
          <div className="contact-orbit" aria-hidden="true">
            <span>MC</span>
          </div>
          <div>
            <p className="contact-name">{profile.name}</p>
            <p>
              {profile.title} <span>·</span> {profile.location}
            </p>
          </div>
          <div className="contact-links">
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
              >
                {profile.email} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <span>{profile.email}</span>
            )}
            {profile.linkedInUrl ? (
              <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <span>LinkedIn profile to be added</span>
            )}
            {profile.githubUrl ? (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <span>GitHub profile to be added</span>
            )}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark wordmark-footer" href="#top">
          <span className="wordmark-mark">MC</span>
          <span>
            <strong>Mike Cho</strong>
            <small>Software Engineer</small>
          </span>
        </a>
        <p>Thoughtful software, built to last.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

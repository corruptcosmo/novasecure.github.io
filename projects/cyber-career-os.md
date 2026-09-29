---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.6.2 Alpha • Frontend & Resource-Management Cleanup`  
**Next major milestone:** `Alpha V0.7 • SIEM, SOC Practice & Smarter Labs`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am building to connect job-market requirements, verified skills, practical training, lab infrastructure, and evidence-backed career development.

It is both a **real personal tool** and a **portfolio-grade engineering project**. The long-term goal is a closed loop where career gaps become targeted hands-on practice, that practice becomes reviewed evidence, and the evidence improves future career decisions.

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The original core loop: learn, prove, apply, improve.</figcaption>
</figure>

---

## Current Alpha — V0.6.x

V0.6 moved Cyber Career OS beyond career tracking and into controlled hands-on training infrastructure.

### V0.6.0-alpha.1 — Controlled Labs & Mentor

Implemented:

- scoped, provider-neutral Proxmox integration behind `HypervisorProvider`
- read-only discovery separated from mutation
- Proxmox mutations disabled by default
- dedicated node/pool/bridge/template allowlists and resource caps
- approval-bound lab provisioning and teardown
- lab definitions, runs, events, quotas, checkpoints, and deterministic mentor plans
- four starter lab definitions
- partial-failure handling that retains resource IDs for operator inspection
- reviewable lab-evidence proposals
- accepted completed-lab evidence classified as `LAB_VERIFIED`, never silently as employment
- manual career-source import foundation with preview, review, provenance, and deduplication
- LinkedIn connection intentionally disabled rather than claiming unsupported capabilities

Automated verification for the initial alpha reached **120 backend tests**, Ruff, and a successful frontend production build. Live infrastructure validation remained a separate release gate rather than being inferred from mocks.

### V0.6.1-alpha.1 — Proxmox Onboarding & Specialist Agents

The next patch fixed a practical problem found during real use: the Proxmox provider existed, but connecting a server was too manual.

Implemented:

- HEROBRINE-only Proxmox connection wizard
- real connection testing before saving credentials
- discovery of nodes, pools, bridges, storage, and templates
- selectable infrastructure boundaries rather than hand-entered IDs
- DPAPI-encrypted local storage for the Proxmox token secret on Windows
- secrets never returned to the browser after storage
- saving a provider keeps mutations disabled
- controlled provisioning must be enabled separately and still requires approvals
- three owner-scoped native specialist-agent paths
- external job-candidate handoff that validates candidates but creates no jobs directly
- selected external jobs still enter the existing source-fetch → proposal → review → acceptance pipeline

Automated checks reached **131 backend tests**, Ruff, and a successful frontend production build.

Live testing then confirmed the connection flow could authenticate to the real Proxmox server and discover infrastructure after assigning appropriately scoped read permissions. A dedicated lab pool and compatible templates can now be prepared as the next infrastructure layer.

### V0.6.2 Alpha — Frontend Cleanup

V0.6.2 is intentionally smaller. It focuses on making the expanding application easier to use before V0.7 adds another major subsystem.

Current cleanup targets include:

- navigation that scales without overflowing as new modules are added
- consistent capitalization, labels, cards, status badges, forms, and actions
- role-aware navigation for USER, ADMIN, and HEROBRINE
- practical frontend edit/delete/archive controls for jobs, skills, evidence, applications, and other safe user-owned resources
- confirmation and dependency handling for destructive actions
- clearer loading, empty, success, and failure states
- removal of stale, duplicate, or context-invalid controls
- preserving all existing backend authorization rather than treating hidden buttons as security

This is not intended to be the final V1 visual design. It is a usability cleanup so the project can keep growing without the interface becoming difficult to navigate.

---

## How the Pieces Now Connect

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-agent-loop.svg" alt="Animated Cyber Career OS career, agent, policy, lab, and evidence loop" />
  <figcaption>Current architecture direction: specialist agents coordinate narrow tasks, while policy, ownership, quotas, approvals, and review remain authoritative.</figcaption>
</figure>

The working direction is increasingly agent-oriented, but the agents do not become unrestricted administrators.

> User intent → specialist agent → controlled tool → authorization/policy → approval when required → controlled provider/service

Career calculations that can remain deterministic stay deterministic. Models explain, coordinate, normalize, mentor, and propose; they do not become the source of truth simply because they generated an answer.

---

## Earlier Releases

### V0.5.0 — Infdev: Intelligent Job Intake & Career Automation

V0.5 made AI-assisted intake usable beyond one canned test prompt.

Major additions included:

- source-grounded JOB, SKILL, EVIDENCE, and PROFILE proposals
- verbatim source-span validation for normalized facts
- public job-URL intake with SSRF/private-network protections
- duplicate URL and provenance handling
- provider-neutral `JobDiscoveryProvider` foundation
- Applications page and valid stage tracking
- readiness and evidence-linked material context
- assessment results directly in the frontend
- improved provider and launcher status
- hidden launcher-owned helper processes
- role-aware navigation cleanup

V0.5.0 passed **105 backend tests**, Ruff, frontend production build, packaged launcher smoke checks, and live validation of the updated launcher, Ollama proposal flow, URL intake, applications, assessments, and provider status.

### V0.4.1 — Herobrine Patch

Introduced the dedicated **HEROBRINE** owner/developer role and the packaged Windows `CyberCareerOS.exe` runtime supervisor while preserving ownership, approval, classification, audit, and provider-policy boundaries.

### V0.4.0 — Hybrid AI & Assisted Data Entry

Introduced real frontend authentication, USER/ADMIN roles, configurable Ollama-first routing, structured model outputs, proposal preview/acceptance, provider diagnostics, and AI-assisted career-record creation.

Live testing found important defects that mocked tests missed, including generic JSON instead of schema-bound output, excessive model reasoning consuming output budgets, and proposal schemas that did not expose their real nested contracts to the model.

### V0.3.0 — Career Workflow & Intelligence

Added deterministic capability snapshots, normalized requirements, persisted fit assessments, skill/evidence gaps, readiness, training recommendations, workflow history, and stale-result detection.

### V0.2.0 — Identity, Policy & Resource Management

Added Argon2 authentication, revocable sessions, owner-scoped CRUD, valid application transitions, target/parameter-bound approvals, auditing, provider policy, and protected account deletion.

### V0.1.0 — Foundation

Established FastAPI, PostgreSQL, SQLAlchemy/Alembic, Next.js, provider abstractions, deterministic mock models, Docker development infrastructure, architecture documentation, ADRs, and threat modeling.

---

## Security Architecture

Cyber Career OS intentionally separates AI reasoning from privileged infrastructure.

> Agent → Tool Request → Authorization / Policy Layer → Controlled Service → External System

Models do not receive unrestricted database sessions, shell access, hypervisor credentials, SIEM credentials, or automatic authority to submit applications.

Important project rules include:

- human review before meaningful AI-proposed mutations
- owner isolation across private career and lab data
- approval-bound infrastructure operations
- evidence provenance rather than model-created “verification”
- lab and simulation work never silently represented as employment
- external pages and job descriptions treated as untrusted data
- provider abstractions so Ollama, Proxmox, Wazuh, job sources, and future services are replaceable

---

## Roadmap to 1.0

### V0.6.2 — Frontend & Resource-Management Cleanup

Clean up navigation, labels, frontend management actions, confirmation flows, and obvious UX inconsistencies before adding another major subsystem.

### Alpha V0.7 — SIEM, SOC Practice & Smarter Labs

V0.7 is planned as the point where the training, agent, Proxmox, and defensive-security sides begin operating together.

Planned areas:

- Wazuh-first `SIEMProvider`
- safe read-only SIEM discovery before privileged actions
- alert intake, severity, rule metadata, endpoint context, and ATT&CK mappings where available
- investigation cases with notes, findings, timelines, artifacts, dispositions, and lifecycle
- SOC Analyst specialist agent with narrow read/propose tools
- mentor + SOC agent collaboration
- lab-generated telemetry feeding investigations
- basic rubric-driven investigation grading
- reviewed evidence generated from completed SOC exercises
- automatic lab lifetime handling and safer cleanup
- Proxmox infrastructure setup improvements discovered during V0.6 live testing
- creation/import/registration of approved lab templates
- explicit network profiles such as `ISOLATED` and `CONTROLLED_INTERNET`
- default labs to the isolated bridge
- base lab image/template + approved tool bundles as the first step toward AI-assembled job-specific labs

The Lab Agent may increasingly recommend or request infrastructure, but actual creation still flows through policy, limits, approval, and controlled provider actions.

### Beta V0.8 — Controlled Scenarios, Purple Team & Grading

Planned focus:

- isolated scenario templates and controlled event generation
- replayable incidents
- Purple Team feedback
- detection-engineering exercises
- attack/replay → telemetry → detection → tuning loops
- richer rubrics and evidence
- more composable lab scenarios without granting agents unrestricted shell or infrastructure control

### Beta V0.9 — Portfolio, Resume Eligibility & Release Hardening

Planned focus:

- turn verified project/lab/SOC results into portfolio-ready material
- evidence-aware resume eligibility
- stronger reviewed resume/cover-letter workflows
- onboarding and deployment checks
- backup/restore
- migration and update safety
- health monitoring and configuration validation
- security/performance cleanup
- release documentation
- preparation for a self-hosted public site and cleaner deployment boundaries

### Release 1.0 — Personal Cyber Career OS

V1.0 is intended to be the first complete personal product rather than another isolated feature milestone.

The end-to-end loop should work coherently:

> job discovery → fit analysis → verified profile → truthful application material → gaps → mentor/training → controlled lab → telemetry/SOC investigation → grading → reviewed evidence → portfolio/resume → stronger applications

V1.0 is also the natural point for many final product-level decisions: onboarding, final navigation and visual polish, packaging, safe updates, backup/restore, self-hosting, and potentially moving the existing web frontend into a desktop shell while preserving the same FastAPI/Next.js architecture.

---

## Beyond 1.0

The original V2 plan was an **Adaptive Cyber Training Platform**, but several pieces once considered “V2 ideas” — specialist agents, Proxmox, mentor-driven training, SOC practice, and Purple Team foundations — are arriving earlier. The post-1.0 roadmap can therefore aim higher.

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-v2-adaptive.svg" alt="Animated concept diagram for V2 adaptive cyber operations and training" />
  <figcaption>V2 direction: move from manually selected exercises toward an adaptive simulated security-operations environment.</figcaption>
</figure>

### V2 — Adaptive Cyber Operations & Training Platform

V2 would evolve Cyber Career OS from a personal career-and-lab platform into an adaptive simulated cybersecurity organization.

Potential direction:

- dynamic training based on job requirements, past performance, missed investigation steps, weak techniques, and demonstrated strengths
- persistent simulated organizations instead of only disposable one-off exercises
- realistic SOC shifts containing normal noise, false positives, routine alerts, and genuine incidents
- specialist virtual coworkers such as SOC Lead, Tier 1/Tier 2 Analyst, Threat Hunter, Incident Commander, Detection Engineer, and Mentor
- proactive threat-hunting exercises rather than only alert-driven response
- deeper detection-engineering loops: replay activity, observe telemetry, write/tune detections, replay again, compare results
- incident-command decisions involving containment, escalation, evidence preservation, and communication
- DFIR-oriented exercises using logs, packet captures, filesystem artifacts, disk/memory artifacts, and timelines where appropriate
- adaptive difficulty and mentor scaffolding based on measured performance
- more dynamic lab composition from approved components
- richer multi-agent coordination and model routing while retaining provider/runtime fallback rather than depending on one agent framework

The V2 identity is less “more features” and more **an environment that learns what the user needs to practice next**.

### V3 — Public Open-Source Platform

V3 would shift from a personal system toward a reusable platform:

- multi-user deployment
- reusable permissions and organization boundaries
- plugins/modules
- community lab/scenario packs
- external provider integrations
- contributor/developer documentation
- reusable self-hosting and deployment patterns
- optional shared training environments

### V4 — Cyber Career OS Distribution

V4 remains the distribution/appliance vision:

- simplified Linux-based deployment
- guided installation and hardware-aware setup
- integrated local/hybrid/cloud AI choices
- Proxmox/cyber-range/SIEM integration options
- preconfigured but replaceable service components
- easier deployment for users who do not want to assemble the full stack manually

---

## Why this matters as a portfolio project

Cyber Career OS is not only a concept. Its development history is evidence of practical engineering work: architecture decisions, migrations, authorization design, threat modeling, live integration bugs, regression testing, Windows packaging, local-model integration, provider boundaries, Proxmox connectivity, approval-controlled infrastructure, and incremental delivery toward a coherent cybersecurity career-and-training platform.

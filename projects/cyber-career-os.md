---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.7 Alpha • SIEM, SOC Practice & Smarter Labs Complete`  
**Next major milestone:** `Beta V0.8 • Controlled Scenarios, Purple Team & Grading`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am building to connect job-market requirements, verified skills, practical training, lab infrastructure, and evidence-backed career development.

It is both a **real personal tool** and a **portfolio-grade engineering project**. The long-term goal is a closed loop where career gaps become targeted hands-on practice, that practice becomes reviewed evidence, and the evidence improves future career decisions.

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The original core loop: learn, prove, apply, improve.</figcaption>
</figure>

---

## V0.7 — SIEM, SOC Practice & Smarter Labs

V0.7 is the first release where the career, lab, agent, Proxmox, and defensive-security sides of Cyber Career OS begin operating as one system.

### Implemented

- Wazuh-first SIEM integration with separate manager and indexer connectivity
- simplified Wazuh onboarding with shared/default credentials plus advanced component overrides
- live Wazuh validation against the real homelab manager and indexer
- endpoint inventory and bounded alert metadata
- owner-scoped SOC investigation cases
- ordered investigation timelines, notes, findings, transitions, and deterministic rubric checks
- reviewed SOC/lab evidence that remains `LAB_VERIFIED`
- native SOC Analyst specialist with narrow read/propose capabilities
- controlled Proxmox LXC template candidate/registration flow
- explicit isolated versus controlled-internet network handling
- approval-bound lab plans and provisioning boundaries
- automatic best-effort expiration stopping without immediate destruction
- explicit separation between hypervisor control and guest execution
- provider-neutral `GuestExecutionProvider` contract for future guest setup
- guest install/verify/enrollment/telemetry operations report `UNSUPPORTED` until a trusted in-guest path exists
- no generic remote shell, no model-supplied command execution, and no assumed WinRM path

The live Wazuh setup now successfully connects to both the manager API and indexer and can see an endpoint. Proxmox discovery is also live. V0.7 intentionally supports the currently available LXC/template path rather than pretending VM-template creation exists before it is implemented.

### Current safety boundary

Cyber Career OS can control approved infrastructure through Proxmox, but a running VM or container is not automatically a trusted guest command channel.

> Hypervisor control ≠ guest execution

For that reason, V0.7 does not claim that it can automatically install tools, enroll Wazuh agents, or generate telemetry inside arbitrary guests. Approved/prepared templates are the supported path for now. A future per-lab authenticated guest bootstrap/agent or another bounded first-boot mechanism can implement the existing `GuestExecutionProvider` contract without introducing unrestricted shell access.

### Verification

The final automated V0.7 pass reached:

- **149 backend tests passed**
- Ruff passed
- Next.js production build passed
- Wazuh manager/indexer connectivity validated live
- endpoint visibility validated live
- Proxmox discovery validated live

VM-template automation and trusted guest execution remain intentionally deferred rather than being represented as completed functionality.

---

## V0.6.x — Controlled Labs, Agents & Frontend Cleanup

### V0.6.0-alpha.1 — Controlled Labs & Mentor

Implemented scoped Proxmox integration, read-only discovery separated from mutation, lab definitions/runs/events, quotas, checkpoints, deterministic mentor plans, approval-bound provisioning and teardown, partial-failure handling, and reviewed `LAB_VERIFIED` evidence.

### V0.6.1-alpha.1 — Proxmox Onboarding & Specialist Agents

Added the HEROBRINE-only Proxmox connection wizard, real connection testing, infrastructure discovery, DPAPI-protected token storage, mutation-disabled-by-default behavior, native specialist-agent paths, and source-reviewed external job handoff.

### V0.6.2 — Frontend & Resource Cleanup

Cleaned up navigation, capitalization, resource-management controls, destructive-action confirmation, role-aware visibility, loading/empty states, and other usability issues before V0.7 introduced the SOC subsystem.

---

## How the Pieces Connect

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-agent-loop.svg" alt="Animated Cyber Career OS career, agent, policy, lab, and evidence loop" />
  <figcaption>Specialist agents coordinate narrow tasks, while policy, ownership, quotas, approvals, and review remain authoritative.</figcaption>
</figure>

> User intent → specialist agent → controlled tool → authorization/policy → approval when required → controlled provider/service

Career calculations that can remain deterministic stay deterministic. Models explain, coordinate, normalize, mentor, and propose; they do not become the source of truth simply because they generated an answer.

---

## Earlier Releases

### V0.5.0 — Infdev: Intelligent Job Intake & Career Automation

Added source-grounded JOB/SKILL/EVIDENCE/PROFILE proposals, controlled URL intake, duplicate/provenance handling, application tracking, evidence-linked material context, improved assessments, provider status, launcher improvements, and role-aware UX.

### V0.4.1 — Herobrine Patch

Introduced the dedicated **HEROBRINE** owner/developer role and packaged Windows `CyberCareerOS.exe` runtime supervisor.

### V0.4.0 — Hybrid AI & Assisted Data Entry

Introduced frontend auth, USER/ADMIN roles, configurable Ollama-first routing, structured model outputs, proposal preview/acceptance, provider diagnostics, benchmarking, and AI-assisted career-record creation.

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
- external pages, alerts, and logs treated as untrusted data
- provider abstractions so Ollama, Proxmox, Wazuh, job sources, and future services remain replaceable
- hypervisor access never treated as equivalent to trusted guest execution

---

## Roadmap to 1.0

### Beta V0.8 — Controlled Scenarios, Purple Team & Grading

V0.8 moves from “observe and investigate” into controlled, replayable exercises.

Planned direction:

- isolated scenario templates
- controlled benign/adversarial event generation inside approved lab boundaries
- replayable incidents
- Purple Team workflows that connect activity, telemetry, investigation, and detection improvement
- detection-engineering exercises
- rule/detection tuning followed by replay and comparison
- richer deterministic rubrics and reviewed evidence
- scenario provenance linking lab, activity, alerts, case findings, detections, and results
- more composable multi-system lab scenarios without granting agents unrestricted shell or infrastructure authority
- stronger coordination among Lab, SOC, Mentor, Evidence, and future scenario-specialist agents
- begin designing the trusted per-lab guest execution/bootstrap path needed for later automatic setup and telemetry

V0.8 should make scenarios repeatable and measurable, not make the platform an unrestricted offensive automation system.

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
- preparation for self-hosting and cleaner deployment boundaries

### Release 1.0 — Personal Cyber Career OS

V1.0 is intended to be the first complete personal product rather than another isolated feature milestone.

The end-to-end loop should work coherently:

> job discovery → fit analysis → verified profile → truthful application material → gaps → mentor/training → controlled lab → telemetry/SOC investigation → grading → reviewed evidence → portfolio/resume → stronger applications

V1.0 is also the natural point for final product-level decisions such as onboarding, final navigation and visual polish, packaging, safe updates, backup/restore, self-hosting, and potentially moving the existing web frontend into a desktop shell while preserving the FastAPI/Next.js architecture.

---

## Beyond 1.0

The original V2 plan was an **Adaptive Cyber Training Platform**, but several pieces once considered V2 ideas — specialist agents, Proxmox, mentor-driven training, SOC practice, and Purple Team foundations — are arriving before 1.0. The post-1.0 roadmap can therefore aim higher.

<figure class="project-graphic motion-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-v2-adaptive.svg" alt="Animated concept diagram for V2 adaptive cyber operations and training" />
  <figcaption>V2 direction: move from manually selected exercises toward an adaptive simulated security-operations environment.</figcaption>
</figure>

### V2 — Adaptive Cyber Operations & Training Platform

Potential direction:

- training selected from job requirements, past performance, missed investigation steps, weak techniques, and demonstrated strengths
- persistent simulated organizations instead of only disposable one-off exercises
- realistic SOC shifts containing normal noise, false positives, routine alerts, and genuine incidents
- specialist virtual coworkers such as SOC Lead, Tier 1/Tier 2 Analyst, Threat Hunter, Incident Commander, Detection Engineer, and Mentor
- proactive threat hunting
- deeper detection-engineering and replay loops
- incident-command decisions involving containment, escalation, evidence preservation, and communication
- DFIR-oriented exercises using logs, packet captures, filesystem artifacts, disk/memory artifacts, and timelines where appropriate
- adaptive difficulty and mentor scaffolding
- more dynamic lab composition from approved components
- richer multi-agent coordination and model routing without depending on a single framework

The V2 identity is less “more features” and more **an environment that learns what the user needs to practice next**.

### V3 — Public Open-Source Platform

V3 would shift from a personal system toward a reusable platform with multi-user deployment, plugins/modules, community scenario packs, contributor documentation, reusable self-hosting patterns, and optional shared training environments.

### V4 — Cyber Career OS Distribution

V4 remains the simplified distribution/appliance vision: guided installation, hardware-aware setup, integrated local/hybrid/cloud AI choices, Proxmox/cyber-range/SIEM options, replaceable services, and an easier path for users who do not want to assemble the entire stack manually.

---

## Why this matters as a portfolio project

Cyber Career OS is not only a concept. Its development history is evidence of practical engineering work: architecture decisions, migrations, authorization design, threat modeling, live integration bugs, regression testing, Windows packaging, local-model integration, provider boundaries, Proxmox connectivity, Wazuh integration, approval-controlled infrastructure, and incremental delivery toward a coherent cybersecurity career-and-training platform.

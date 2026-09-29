---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.5.0 • Infdev Complete`  
**Current focus:** `Alpha V0.6 • Controlled Lab Provisioning & Mentor`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to close the gap between learning security skills and proving them in a way that supports real career opportunities.

It is being built as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.5.0 — Infdev: Intelligent Job Intake, Career Automation & Product UX

V0.5 moves Cyber Career OS beyond canned AI test inputs toward more realistic day-to-day career use.

### Implemented

- source-grounded normalized JOB, SKILL, EVIDENCE, and PROFILE proposals
- verbatim source-span validation so normalized wording can differ from source text without weakening grounding
- protected employment/certification claims remain blocked when unsupported
- controlled public job-URL fetching with private-network/SSRF protections, bounded redirects, content limits, and script-free extraction
- URL provenance and duplicate URL protection for accepted jobs
- provider-neutral `JobDiscoveryProvider` contract and candidate deduplication foundation without pretending an external board is configured
- Applications page with saved-job tracking, allowed stage transitions, readiness, and evidence-linked material context
- read-only material-context service that exposes only eligible evidence/provenance for future resume/cover-letter proposals
- assessment gap/training results shown directly in the frontend
- improved Skills/Evidence loading, empty, and success states
- provider/routing visibility in Settings and safe HEROBRINE developer diagnostics
- cleaner launcher status/progress UX and hidden launcher-owned helper processes so normal use does not leave terminal windows open
- Ollama launcher connection/model-installed checks and reset-to-saved settings
- role-aware navigation cleanup, including hiding Login/Register flows from authenticated users
- preserved review/acceptance before AI-assisted data can mutate career records

### Release verification

V0.5.0 passed:

- backend tests — **105 passed**
- Ruff lint/format — **passed**
- frontend production build — **passed**
- packaged `CyberCareerOS.exe` smoke/build checks — **passed**
- updated launcher GUI and hidden-process behavior — **validated live**
- updated Ollama proposal flow and newly added frontend workflows — **validated live**
- Applications, assessments, provider status, and role-aware UX — **validated live**
- public URL intake — **validated live**

The external job-board adapter and optional tray behavior remain intentionally deferred rather than being shipped as incomplete features.

---

## V0.4.1 — Herobrine Patch

V0.4.1 focused on day-to-day owner/developer usability without weakening the security architecture.

Implemented the dedicated **HEROBRINE** developer role, centralized capabilities, read-only developer diagnostics, and the packaged Windows `CyberCareerOS.exe` launcher for PostgreSQL/migration/backend/frontend/Ollama supervision. Live Windows RC testing caught and fixed virtual-environment and PyInstaller module-packaging defects before release.

Release verification included **62 backend tests**, Ruff, frontend TypeScript/build checks, and live launcher/Ollama validation.

---

## V0.4.0 — Hybrid AI, Frontend Authentication & Assisted Data Entry

V0.4 introduced the first live AI-assisted workflows while preserving the deterministic and security-focused architecture from earlier releases.

Implemented capabilities include real frontend auth, USER/ADMIN access control, operator visibility, a privacy-aware `ModelRouter`, configurable Ollama-first AI, optional cloud providers, strict typed structured outputs, human-reviewed AI proposals, source-support validation, provider diagnostics, benchmarking, and AI-assisted JOB/SKILL/EVIDENCE/PROFILE creation.

Live testing exposed and fixed several integration defects that mocks did not catch: generic JSON rather than schema-bound output, excessive Qwen reasoning consuming output budgets, and generic proposal dictionaries hiding the real nested schema. The final live Ollama/Qwen workflow successfully created reviewed job and evidence records.

---

## Earlier foundation

### V0.3.0 — Career Workflow & Intelligence

Added deterministic evidence-aware capability snapshots, normalized requirements, persisted fit assessments, skill/evidence gaps, application readiness, training recommendations, workflow history, and stale-result detection without requiring a model provider.

### V0.2.0 — Identity, Policy & Resource Management

Added Argon2 authentication, revocable sessions, owner-scoped CRUD, application transitions, centralized risk handling, target/parameter-bound approvals, correlation-aware auditing, provider policy, and protected account deletion.

### V0.1.0 — Foundation

Established FastAPI, PostgreSQL, SQLAlchemy/Alembic, provider contracts, deterministic mock models, Next.js, Docker Compose, architecture documentation, ADRs, threat modeling, and the first owner-aware career-domain models.

---

## Security Architecture

> Agent → Tool Request → Authorization / Policy Layer → Controlled Service → External System

Agents do not receive unrestricted database, shell, hypervisor, or SIEM access. Labs and simulations are not silently represented as professional employment. AI-generated information is reviewable and does not become verified experience merely because a model produced it.

---

## Alpha V0.6 — Controlled Lab Provisioning & Mentor

V0.6 shifts the next major milestone from career intake toward **safe, hands-on cybersecurity training infrastructure**.

Planned focus:

- read-only Proxmox discovery first: nodes, storage, templates, pools, VM/LXC metadata, and health
- a tightly scoped `HypervisorProvider` implementation rather than direct model-to-Proxmox access
- AI-LAB-only provisioning boundaries, quotas, approved templates, resource caps, and controlled naming/network placement
- explicit approval for provisioning, destructive lifecycle changes, and teardown where appropriate
- lab templates that map training goals to reproducible VM/LXC environments
- mentor-guided training plans that connect V0.5 skill/evidence gaps to concrete labs
- lab lifecycle state, progress, notes, completion, teardown, and audit history
- safe evidence generation from completed lab work without misrepresenting it as employment
- failure recovery and cleanup so interrupted provisioning does not silently leave unmanaged resources
- preserve provider abstraction so Proxmox is the first implementation, not a hardcoded architectural dependency

### Optional V0.6 add-ons

If core V0.6 work is stable, two deferred V0.5 product features may be layered on top without displacing the lab milestone:

- system-tray behavior for the Windows launcher
- the first real external job-discovery adapter behind the existing `JobDiscoveryProvider`, with selected postings still routed through URL/source validation, proposal review, and acceptance

These are secondary to safe lab provisioning and mentor workflows.

---

## Roadmap to 1.0

### Alpha V0.6 — Controlled Lab Provisioning & Mentor
Read-only Proxmox discovery followed by tightly scoped lab provisioning, templates, mentor-guided training, quotas, approvals, evidence generation, and teardown controls. Optional V0.5 add-ons may land only after the core lab path is stable.

### Alpha V0.7 — SIEM & SOC Practice
Wazuh-first SIEM integration, telemetry, cases, ATT&CK mapping, analyst notes, timelines, and SOC-style workflows.

### Beta V0.8 — Controlled Scenarios, Purple Team & Grading
Isolated scenario execution/replay, Purple Team feedback, detection engineering exercises, scoring, and evidence generation.

### Beta V0.9 — Portfolio, Resume Eligibility & Release Hardening
Verified project/lab results become portfolio and truthful resume evidence, alongside onboarding, backup/restore, deployment reliability, and security hardening.

### Release 1.0 — Personal Cyber Career OS

> job discovery → fit analysis → verified profile → truthful application materials → gaps → training/lab → isolated range → telemetry/SOC investigation → grading → verified evidence → portfolio/resume → stronger applications

---

## Beyond 1.0

- **V2 — Adaptive Cyber Training Platform:** deeper model routing, Purple Team workflows, attack reconstruction/replay, detection engineering, SOC shifts, threat hunting, incident command, and forensics.
- **V3 — Public Open-Source Platform:** multi-user deployment, plugins/modules, community scenario packs, and reusable self-hosting.
- **V4 — Cyber Career OS Distribution:** simplified Linux-based deployment/appliance with guided setup and integrated AI, cyber-range, and SIEM options.

---

## Why this matters as a portfolio project

Cyber Career OS is not only a concept. Its history is evidence: architecture decisions, migrations, threat modeling, live integration bugs, regression tests, packaging failures found before release, provider-boundary design, and incremental delivery from a secure foundation toward a practical cybersecurity career platform.

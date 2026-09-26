---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.4.1 • Herobrine Patch Complete`  
**Current focus:** `Infdev V0.5 • Smarter Job Intake, Career Automation & Product UX`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to close the gap between learning security skills and proving them in a way that supports real career opportunities.

It is being built as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.4.1 — Herobrine Patch

V0.4.1 focused on day-to-day owner/developer usability without weakening the security architecture.

### Implemented

- dedicated **HEROBRINE** project-owner/developer role
- centralized capability checks rather than a global authorization bypass
- HEROBRINE developer diagnostics while preserving ownership, approval, classification, provider-policy, and audit boundaries
- Windows `CyberCareerOS.exe` launcher built with PyInstaller
- launcher-managed PostgreSQL health, Alembic migrations, FastAPI backend, Next.js frontend, browser launch, logs, and optional Ollama status
- start, stop, restart, and health workflows
- launcher process ownership so unrelated Python/Node processes are not intentionally controlled
- Ollama URL/model configuration in the launcher
- fixes discovered during live Windows packaging, including virtual-environment resolution and bundled launcher-module imports

### Release verification

V0.4.1 passed:

- backend tests — **62 passed**
- Ruff lint and formatting — **passed**
- frontend TypeScript checks — **passed**
- frontend production build — **passed**
- packaged Windows launcher — **validated live**
- launcher Status and Ollama integration — **validated live**

The patch was intentionally held at release-candidate status until the packaged executable worked on the actual Windows environment.

---

## V0.4.0 — Hybrid AI, Frontend Authentication & Assisted Data Entry

V0.4 introduced the first live AI-assisted workflows while preserving the deterministic and security-focused architecture from earlier releases.

Implemented capabilities include real frontend auth, USER/ADMIN access control, operator visibility, a privacy-aware `ModelRouter`, configurable Ollama-first AI, optional cloud providers, strict typed structured outputs, human-reviewed AI proposals, source-support validation, provider diagnostics, benchmarking, and AI-assisted JOB/SKILL/EVIDENCE/PROFILE creation.

Live testing exposed and fixed several integration defects that mocks did not catch: generic JSON rather than schema-bound output, excessive Qwen reasoning consuming output budgets, and generic proposal dictionaries hiding the real nested schema. The final live Ollama/Qwen workflow successfully created reviewed job and evidence records.

V0.4.0 release verification included **53 backend tests**, Ruff, frontend TypeScript/build checks, live Ollama proposal generation, proposal persistence, outage behavior, ownership/privacy checks, and deterministic V0.3 regression validation.

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

## Infdev V0.5 — Smarter Job Intake, Career Automation & Product UX

V0.5 moves Cyber Career OS from a working developer-oriented system toward something that feels much more like a cohesive daily-use product.

Planned focus:

- smarter natural-language JOB/SKILL/EVIDENCE/PROFILE intake without depending on one canned prompt shape
- replace brittle exact-substring job source checks with evidence/span-aware validation that remains strict about invented facts
- URL-assisted job-post intake and a foundation for provider-backed job discovery/import
- job deduplication and normalized source/provenance handling
- stronger career-agent workflows and application tracking
- truthful resume and cover-letter preparation based only on supported profile/evidence data
- cleaner launcher UI and visual polish
- hidden/background child-process execution so normal launcher use does not leave terminal windows open
- improved logs/status/error presentation
- a cleaner HEROBRINE developer experience, including improved API/Swagger usability where safe
- preserve preview/review before meaningful AI-proposed mutations

The goal is not to weaken source validation. V0.5 should make the validator understand *supported meaning and provenance* rather than requiring model output to copy source wording exactly.

---

## Roadmap to 1.0

### Infdev V0.5 — Career Automation & Job Intake
Natural job intake, discovery/import foundations, deduplication, career materials, improved application workflows, and product/launcher polish.

### Alpha V0.6 — Controlled Lab Provisioning & Mentor
Read-only Proxmox discovery followed by tightly scoped lab provisioning, templates, training plans, quotas, approvals, and teardown controls.

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

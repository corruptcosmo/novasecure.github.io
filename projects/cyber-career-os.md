---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.3.0 • Career Workflow & Intelligence Complete`  
**Current focus:** `Indev V0.4 • Hybrid AI, Frontend Authentication & Assisted Data Entry`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I am facing directly as an entry-level cybersecurity candidate: how to close the gap between learning security skills and proving those skills in a way that helps lead to real career opportunities.

It is being designed from the beginning as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.3.0 — Career Workflow & Intelligence Layer

V0.3 turns the secure application foundation into the first end-to-end career-intelligence workflow.

### Implemented

- synchronous owner-scoped workflow runs
- evidence-aware capability snapshots
- deterministic requirement normalization
- persisted fit assessments and requirement-level explanations
- required/preferred coverage metrics without claiming hiring probability
- linked skill/evidence provenance
- skill-gap versus evidence-gap distinction
- gap lifecycle management
- application-readiness analysis
- deterministic training recommendations
- stale-result detection through input fingerprints
- historical assessments that are not silently rewritten when inputs change
- correlation-aware auditing through the existing V0.2 services
- no live model-provider or network dependency in the analysis engine

### Release verification

V0.3.0 passed:

- backend tests — **26 passed**
- Ruff formatting and linting — **passed**
- frontend TypeScript and production build — **passed**
- npm audit — **0 vulnerabilities reported**
- live PostgreSQL migration `0003 → 0004` — **passed**
- fresh PostgreSQL migration chain `0001 → 0004` — **passed**
- manual Swagger `/docs` validation — **passed**
- deterministic re-analysis, skill/evidence gap behavior, stale-assessment handling, ownership isolation, and frontend token/session behavior — **validated manually**

V0.3 preserves the V0.2 approval, ownership, privacy, audit, and session-security controls rather than bypassing them for convenience.

---

## V0.2.0 — Identity, Policy & Resource Management

V0.2 introduced enforceable application security:

- local account authentication with Argon2 password hashing
- revocable opaque bearer sessions and logout
- centralized ownership enforcement
- profile, skill, evidence, job, requirement, and application CRUD
- validated application-state transitions
- centralized action-risk handling
- target- and parameter-bound approvals
- expiry, single-use consumption, and replay protection
- correlation IDs and centralized auditing
- classification-aware provider policy and redaction
- account deletion with approval enforcement and immediate session invalidation
- reproducible Alembic migration history

Manual RC testing discovered an approval-consumption contract mismatch before final release. The defect was diagnosed from live runtime values, fixed, regression-tested, and retained as project evidence.

---

## V0.1.0 — Foundation

The first milestone established:

- FastAPI and versioned OpenAPI endpoints
- PostgreSQL / SQLAlchemy / Alembic
- owner-aware career-domain models
- provider contracts for models, hypervisors, SIEMs, and agents
- deterministic mock model provider
- Next.js frontend foundation
- Docker Compose development database
- architecture documentation, ADRs, threat model, roadmap, changelog, and development logs

---

## Security Architecture

The architecture intentionally separates AI agents from privileged services.

> Agent → Tool Request → Authorization / Policy Layer → Controlled Service → External System

Agents do not receive direct unrestricted access to database sessions, shells, hypervisor credentials, or SIEM credentials.

The system distinguishes evidence-backed facts from inferred or unverified information. Labs and simulations are never silently represented as professional employment.

---

## Project Goal

Cyber Career OS connects four parts of the same problem:

1. **Learn** — build hands-on skills through labs, mentoring, investigations, and controlled exercises.
2. **Prove** — turn that work into verified evidence, documentation, project records, and portfolio material.
3. **Apply** — use truthful, evidence-backed profile data to improve resumes, cover letters, and job targeting.
4. **Improve** — identify recurring skill gaps from the job market and feed them back into future labs and projects.

---

## Indev V0.4 — Hybrid AI, Frontend Authentication & Assisted Data Entry

The next milestone begins the project's Minecraft-inspired development-era naming while retaining semantic version numbers.

Planned work includes:

- real frontend registration, login, logout, protected routes, token/session handling, and expired-session UX
- a small USER/ADMIN role model with privacy-preserving operator visibility
- friendlier product documentation and improved Swagger examples/workflow guidance
- model registry and `ModelRouter`
- local Ollama provider as the preferred/default AI path
- optional xAI/Grok provider behind the same provider interface when separately configured
- local-only and hybrid routing modes governed by capability, privacy classification, availability, and policy
- structured-output validation and provider health/fallback handling
- benchmark fixtures for model quality, latency, schema compliance, and routing decisions
- AI-assisted creation proposals for jobs, requirements, skills, evidence mappings, and profile changes
- explicit preview/confirmation before any AI-proposed mutation is committed
- provenance recording for model-generated proposals

The deterministic V0.3 analysis engine remains the source of truth. AI improves ingestion and assistance; it does not invent verified experience.

---

## Refreshed Roadmap to 1.0

The early roadmap originally moved toward Proxmox sooner. V0.2 and V0.3 deliberately shifted effort into identity, policy, and deterministic career intelligence first. The destination remains the same, but the path is now safer and more useful.

### Indev V0.4 — Hybrid AI & Usability
Real frontend auth, operator/admin visibility, better docs, Ollama-first hybrid model routing, optional cloud-provider support, model benchmarking, and approval-based AI-assisted data entry.

### Infdev V0.5 — Career Automation & Job Intake
Assisted job discovery/import, deduplication, job-post parsing, truthful resume/cover-letter preparation, application tracking improvements, and stronger career-agent workflows. External content remains untrusted data and all meaningful mutations remain reviewable.

### Alpha V0.6 — Controlled Lab Provisioning & Mentor
Bring back the infrastructure work from the original roadmap: read-only Proxmox discovery first, then tightly scoped provisioning through the hypervisor provider, lab templates, training plans, mentor-guided exercises, approvals, quotas, and teardown controls.

### Alpha V0.7 — SIEM & SOC Practice
Connect the SIEM provider, initially targeting Wazuh; ingest lab telemetry; create investigation cases; map activity to ATT&CK; support analyst notes, timelines, evidence, grading inputs, and SOC-style workflows.

### Beta V0.8 — Controlled Scenarios, Purple Team & Grading
Declarative isolated scenarios, controlled attack simulation/replay inside the authorized cyber range, Purple Team feedback, detection engineering exercises, scoring, and evidence generation. No arbitrary external offensive execution.

### Beta V0.9 — Portfolio, Resume Eligibility & Release Hardening
Turn verified project/lab results into portfolio-ready evidence and truthful resume eligibility; improve exports, documentation, onboarding, backup/restore, deployment reliability, security hardening, and the full end-to-end release candidate experience.

### Release 1.0 — Personal Cyber Career OS
The complete personal loop:

> job discovery → fit analysis → verified profile → truthful application materials → skill gaps → training/lab → isolated range → telemetry/SOC investigation → grading → verified evidence → portfolio/resume → stronger applications

1.0 should be usable as a coherent personal system without requiring every future V2/V3/V4 idea to be complete.

---

## Beyond 1.0

### V2 — Adaptive Cyber Training Platform
Deeper model routing, Purple Team workflows, attack reconstruction/replay, detection engineering, SOC shifts, virtual coworkers, threat hunting, incident command, forensics, and adaptive training.

### V3 — Public Open-Source Platform
Multi-user deployment, plugins/modules, community scenario packs, public documentation, and reusable self-hosting.

### V4 — Cyber Career OS Distribution
A simplified Linux-based deployment/appliance with guided setup, local/hybrid/cloud AI choices, cyber-range and SIEM integrations, and easier installation.

---

## Why This Matters as a Portfolio Project

Cyber Career OS is not just a concept. The project history itself is evidence: architecture decisions, migrations, threat modeling, release validation, bugs found in live integration testing, regression tests, and incremental delivery from a secure foundation toward a practical career and training platform.

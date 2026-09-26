---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.4.0 • Hybrid AI & Usability Complete`  
**Current focus:** `V0.4.1 “Herobrine” • Runtime Launcher & Developer Access`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I am facing directly as an entry-level cybersecurity candidate: how to close the gap between learning security skills and proving those skills in a way that helps lead to real career opportunities.

It is being designed from the beginning as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.4.0 — Hybrid AI, Frontend Authentication & Assisted Data Entry

V0.4 adds the first live AI-assisted workflows while preserving the deterministic and security-focused architecture from earlier releases.

### Implemented

- real frontend registration, login, logout, protected routes, and session-expiry handling
- USER and ADMIN roles with limited, privacy-preserving operator visibility
- improved product documentation and API/Swagger guidance
- provider registry and privacy-aware `ModelRouter`
- configurable Ollama integration as the preferred local AI path
- optional cloud-provider support behind the same provider abstraction
- local-only and hybrid routing modes governed by capability, classification, provider health, and policy
- strict Pydantic structured-output validation
- strongly typed proposal schemas for JOB, SKILL, EVIDENCE, and PROFILE data
- schema-constrained Ollama generation with bounded retries and sanitized diagnostics
- reasoning controls for structured extraction workloads
- output-limit and malformed-response diagnostics
- model benchmarking and provider-health visibility
- AI-assisted proposals for jobs, requirements, skills, evidence, and profile updates
- explicit preview and item-level acceptance before AI-proposed data can mutate career records
- source-support validation to prevent unsupported job facts and invented links
- provenance recording for AI-assisted records
- deterministic V0.3 career analysis remains provider-independent and usable when AI is unavailable

### Live integration findings

Manual release-candidate testing found several defects that automated mock-provider tests did not expose:

- Ollama was initially given generic JSON mode rather than the actual Pydantic JSON schema
- Qwen 3.5 reasoning could consume the structured-output budget before producing final content
- proposal `data` was originally typed as a generic dictionary, hiding the actual nested JOB/SKILL/EVIDENCE/PROFILE contract from the model
- provider diagnostics were expanded to distinguish policy, timeout, malformed JSON, output truncation, schema validation, and semantic/source failures without logging private prompts or credentials

The final live Qwen/Ollama workflow successfully created reviewed job and evidence proposals and persisted accepted records into the expected application views.

### Release verification

V0.4.0 passed:

- backend tests — **53 passed**
- Ruff — **passed**
- frontend TypeScript checks — **passed**
- frontend production build — **passed**
- live Ollama/Qwen proposal generation — **validated manually**
- accepted job and evidence proposal persistence/UI behavior — **validated manually**
- provider outage, ownership/privacy boundaries, deterministic V0.3 regression behavior, and release checklist — **validated manually during live sign-off**

---

## V0.3.0 — Career Workflow & Intelligence Layer

V0.3 turned the secure application foundation into the first end-to-end career-intelligence workflow.

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

## V0.4.1 “Herobrine” — Runtime Launcher & Developer Access

Before beginning Infdev V0.5, the next patch focuses on day-to-day usability and safe owner/developer operation.

Planned work:

- a Windows `CyberCareerOS.exe` launcher/runtime supervisor
- start, stop, and restart PostgreSQL, backend, frontend, and related local services from one place
- service/provider health and version visibility
- consolidated runtime logs and browser launch
- safe migration/startup checks and update preparation
- a dedicated **HEROBRINE** owner/developer role for the project maintainer
- HEROBRINE inherits administrative/operator capabilities and may access developer-only diagnostics and test workflows
- HEROBRINE remains authenticated, audited, policy-aware, and subject to explicit safety boundaries rather than bypassing authorization globally
- normal USER and ADMIN behavior remains unchanged

The role is intentionally a developer/owner capability tier, not a hidden unrestricted backdoor.

---

## Refreshed Roadmap to 1.0

### V0.4.1 “Herobrine” — Runtime & Developer Experience
Windows launcher/runtime supervision plus a dedicated audited owner/developer role for safe development and continued live use.

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

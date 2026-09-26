---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.2.0 • Identity, Policy & Resource Management Complete`  
**Current focus:** `V0.3 • Career Workflow & Intelligence Layer`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I am facing directly as an entry-level cybersecurity candidate: how to close the gap between learning security skills and proving those skills in a way that helps lead to real career opportunities.

It is being designed from the beginning as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.2.0 — Identity, Policy & Resource Management

V0.2 turns the security architecture introduced in V0.1 into enforceable application behavior.

### Implemented

- local account authentication with Argon2 password hashing
- revocable opaque bearer sessions and logout
- centralized authenticated ownership enforcement rather than trusting client-supplied owner IDs
- profile, skill, evidence, job, requirement, and application CRUD
- validated application-state transitions
- centralized action-risk handling
- target- and parameter-bound approval requests
- expiring, single-use approval consumption with replay protection
- correlation IDs and centralized audit recording
- classification-aware provider policy and sensitive-data redaction
- account deletion with approval enforcement and immediate session invalidation
- clearer OpenAPI grouping, bearer-auth workflow, and manual validation guidance
- reproducible Alembic migration history across V0.1 and V0.2 schema evolution

### Release verification

The final V0.2.0 release candidate passed:

- backend tests — **21 passed**
- Ruff formatting — **passed**
- Ruff linting — **passed**
- PostgreSQL migration generation — **passed**
- live PostgreSQL migration application through the V0.2 migration chain — **passed**
- manual Swagger `/docs` authentication, ownership, CRUD, audit, and approval validation — **passed**
- account-deletion approval consumption and replay/session behavior — **passed**
- frontend production checks from the V0.2 release candidate — **passed**
- npm security audit — **0 vulnerabilities reported**

### RC issue discovered and fixed

Manual release validation caught an approval-consumption mismatch before final release. Approval creation and account deletion were not using the exact same action, target, and parameter contract. Runtime diagnostics exposed the mismatch, the API contract was standardized, invalid legacy/non-empty account-deletion approvals were rejected, regression tests were added, and the live deletion flow was revalidated successfully.

This became part of the project evidence: the release process found a security-sensitive integration defect that unit-level verification alone had not exposed.

---

## V0.1.0 — Foundation

The first milestone established the application and architecture foundation:

- FastAPI backend with versioned CRUD endpoints and OpenAPI documentation
- PostgreSQL persistence using SQLAlchemy
- Alembic migration framework
- owner-aware users, profiles, skills, evidence, jobs, job requirements, job matches, applications, approvals, and audit records
- explicit data-classification and action-risk types
- model, hypervisor, SIEM, and agent interfaces
- deterministic mock model provider with secret-data rejection
- Next.js status frontend
- Docker Compose PostgreSQL service
- architecture documentation, ADRs, threat modeling, roadmap, changelog, and development logs

V0.1.0 passed backend tests, Ruff checks, PostgreSQL migration generation, the Next.js production build, and an npm security audit with no reported vulnerabilities.

---

## Security Architecture

The architecture intentionally separates AI agents from privileged services.

Agents participate in workflows through explicit interfaces and do not receive direct access to:

- database sessions
- unrestricted shell execution
- hypervisor credentials
- SIEM credentials

The application follows a controlled path:

> Agent → Tool Request → Authorization / Policy Layer → Controlled Service → External System

V0.2 now enforces authentication, resource ownership, approval binding, replay protection, session revocation, centralized audit handling, and privacy-aware provider boundaries before live AI or infrastructure control is introduced.

The project threat model continues to record remaining gaps rather than treating architectural intent as already-enforced security.

---

## Project Goal

Cyber Career OS connects four parts of the same problem:

1. **Learn** — build hands-on skills through labs, mentoring, investigations, and controlled exercises.
2. **Prove** — turn that work into verified evidence, documentation, project records, and portfolio material.
3. **Apply** — use truthful, evidence-backed profile data to improve resumes, cover letters, and job targeting.
4. **Improve** — identify recurring skill gaps from the job market and feed them back into future labs and projects.

The long-term idea is to build a system that helps answer:

> What skills are employers asking for, how can I learn them in a realistic environment, and how can I prove that work honestly and effectively?

---

## Why I Started It

As someone trying to break into cybersecurity, I noticed a recurring problem:

- entry-level roles often still expect experience;
- labs and self-study can teach useful skills, but they do not automatically translate into professional evidence;
- job applications are time-consuming and hard to tailor well;
- skill gaps are easier to see than they are to systematically close.

Cyber Career OS is my attempt to create a single system that ties all of those pieces together.

---

## Current Architecture Direction

The implemented monorepo uses:

- **Backend:** Python / FastAPI
- **Database:** PostgreSQL / SQLAlchemy / Alembic
- **Frontend:** Next.js
- **Development database:** Docker Compose

The codebase uses provider contracts so domain logic does not depend directly on a specific AI platform, hypervisor, or SIEM.

Planned provider directions include:

- **Local AI:** Ollama
- **Cyber range:** Proxmox
- **Security telemetry:** Wazuh initially

Live providers remain intentionally staged behind the policy and workflow layers rather than being connected directly to agents.

---

## Next Milestone — V0.3

V0.3 begins turning the secure data foundation into a useful career workflow system.

Planned work includes:

- workflow/run primitives with explicit state transitions and auditable execution
- evidence-aware candidate profile assembly
- deterministic job requirement normalization and fit analysis
- explainable skill-gap detection
- evidence-backed match scoring that never invents qualifications
- application readiness checks
- training recommendations generated from identified gaps
- APIs and a small UI for reviewing workflow outputs and their supporting evidence

V0.3 will keep model-generated content behind provider interfaces and deterministic fallbacks. Live Ollama routing, Proxmox control, SIEM integration, offensive scenarios, and autonomous job application submission remain separate later milestones.

---

## Roadmap Vision

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-roadmap.svg" alt="Cyber Career OS roadmap diagram" />
  <figcaption>Long-term roadmap from a personal career platform to a public open-source system and eventually a simplified self-hosted distribution.</figcaption>
</figure>

### V1 — Personal Cyber Career OS
A personal platform for:
- job discovery and analysis,
- truthful resumes and cover letters,
- verified skill/evidence records,
- lab provisioning,
- mentor-guided learning,
- SIEM-driven exercises and incident practice.

### V2 — Adaptive Cyber Training Platform
Adds:
- local AI through **Ollama**,
- intelligent model routing,
- Purple Team mode,
- detection engineering,
- attack replay,
- SOC shift simulation,
- adaptive training and skills analysis.

### V3 — Public Open-Source Platform
Expands into:
- multi-user support,
- plugin/module architecture,
- community scenario packs,
- public documentation,
- reusable self-hosted deployment.

### V4 — Cyber Career OS Distribution
A simplified self-hosted environment, likely built on top of Linux, with:
- the platform preconfigured,
- local AI support,
- cyber-range integration,
- SIEM options,
- guided setup,
- a more accessible install experience.

---

## Why This Matters as a Portfolio Project

Cyber Career OS is not just a concept I want to talk about later. I want the project history itself to become evidence.

That includes:

- documenting the original problem;
- defining architecture and security boundaries early;
- tracking decisions as the design evolves;
- building incrementally instead of pretending everything exists already;
- testing security-sensitive behavior manually as well as automatically;
- recording defects discovered during release validation and how they were resolved;
- showing how the platform grows from foundation code into a practical career and training system.

V0.2.0 provides the second concrete checkpoint: the application foundation is now protected by real identity, ownership, approval, audit, and privacy controls, creating the base needed for higher-level workflows in V0.3.

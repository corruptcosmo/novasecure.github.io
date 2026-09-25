---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.1.0 • Foundation Complete`  
**Current focus:** `V0.2 • Identity & Policy Enforcement`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I am facing directly as an entry-level cybersecurity candidate: how to close the gap between learning security skills and proving those skills in a way that helps lead to real career opportunities.

It is being designed from the beginning as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

## V0.1.0 — Foundation

The first implementation milestone is complete.

### Implemented

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

### Verification

The V0.1.0 foundation passed:

- backend tests — **3 passed**
- Ruff formatting and linting — **passed**
- Alembic PostgreSQL migration generation — **passed**
- Next.js production build — **passed**
- npm security audit — **0 vulnerabilities reported**

---

## Security Architecture

The current architecture intentionally separates AI agents from privileged services.

Agents participate in workflows through explicit interfaces and should not directly receive:

- database sessions
- unrestricted shell access
- hypervisor credentials
- SIEM credentials

The foundation also models reusable approvals, audit records, privacy classifications, and provider boundaries before introducing live AI or infrastructure control.

The project threat model explicitly records remaining gaps rather than treating architectural intent as already-enforced security.

Current next-step security work includes:

- authentication and object authorization
- centralized ownership enforcement
- one-time, action-bound approval execution
- stronger append-only audit handling
- centralized privacy/model-routing policy
- provider endpoint and target validation

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

The codebase uses provider contracts so domain logic does not have to depend directly on a specific AI platform, hypervisor, or SIEM.

Planned provider directions include:

- **Local AI:** Ollama
- **Cyber range:** Proxmox
- **Security telemetry:** Wazuh initially

Live providers remain intentionally deferred until stronger policy enforcement is in place.

---

## Next Milestone — V0.2

V0.2 will focus on turning the security model established in V0.1 into centrally enforced policy.

Planned work includes:

- authentication
- authorization
- centralized ownership enforcement
- approval lifecycle and replay protection
- append-only audit services
- privacy-routing policy
- sensitive-data redaction and policy tests

Ollama, Proxmox, SIEM integration, offensive scenarios, and automated application submission are intentionally not part of this milestone.

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
- showing how the platform grows from V0.1 into something much larger.

V0.1.0 now provides a concrete first checkpoint: working application infrastructure, tests, data models, provider boundaries, and documented security decisions rather than only a roadmap.

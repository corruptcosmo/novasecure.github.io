---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**Status:** `V0.1 • Foundation in Development`

**Cyber Career OS** is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I am facing directly as an entry-level cybersecurity candidate: how to close the gap between learning security skills and proving those skills in a way that helps lead to real career opportunities.

It is being designed from the beginning as both a **real personal tool** and a **portfolio-grade engineering project**.

<figure class="project-graphic">
  <img src="/novasecure.github.io/images/cyber-career-os-flow.svg" alt="Cyber Career OS workflow diagram" />
  <figcaption>The core loop: learn skills, prove them with evidence, apply them to career opportunities, and improve by turning gaps into new labs.</figcaption>
</figure>

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

## Current Scope — V0.1

Version 0.1 is focused on building the **foundation** correctly rather than trying to over-automate too early.

### V0.1 priorities

- architecture and security boundaries;
- user/profile and verified-skill evidence models;
- jobs, requirements, matches, and application tracking;
- provider abstractions for AI, hypervisors, and SIEMs;
- approval workflows for higher-risk actions;
- audit logging and documentation;
- a long-term structure that can grow without major rewrites.

### Core design principles

- **Local-first** where possible
- **Privacy-conscious** handling of sensitive data
- **Least privilege** for infrastructure access
- **Human approval** for consequential actions
- **Evidence-backed claims** in resumes and application materials
- **Provider-agnostic architecture** for AI, hypervisors, and SIEMs

---

## Planned System Concept

In later versions, the platform is intended to connect:

- **Career systems** — jobs, resumes, cover letters, application tracking, interviews
- **Training systems** — mentor guidance, skills, competency tracking, labs, assessments
- **Cyber range systems** — Proxmox-based isolated training labs and scenario environments
- **Security operations systems** — SIEM investigations, alerts, cases, evidence, timelines, reporting
- **Purple Team workflows** — attack reconstruction, missed detection review, detection engineering, tuning

That means the same platform helping me find jobs can also help me build the skills and evidence needed to become a better candidate for those jobs.

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

## Technologies and Architecture Direction

The current design direction includes:

- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **Frontend:** Next.js / React / TypeScript
- **Local AI:** Ollama
- **Infrastructure:** Proxmox for isolated labs
- **Security telemetry:** Wazuh initially, with room for other SIEM providers later

A major architectural goal is to avoid hard-coding the platform around only one AI provider or one infrastructure provider.

---

## Security Philosophy

Because this platform is intended to interact with job data, personal information, and eventually cyber-range infrastructure, security architecture is part of the project from the beginning.

Important principles include:

- AI systems should not receive unrestricted infrastructure access.
- High-impact actions should support approval workflows.
- Training infrastructure should stay isolated from production/home services.
- Sensitive information should be classified and handled appropriately.
- Automation should be auditable.

This is important both for the platform itself and because the project is meant to reflect how I think about security engineering.

---

## Why This Matters as a Portfolio Project

Cyber Career OS is not just a concept I want to talk about later. I want the project history itself to become evidence.

That includes:

- documenting the original problem;
- defining architecture and security boundaries early;
- tracking decisions as the design evolves;
- building incrementally instead of pretending everything exists already;
- showing how the platform grows from V0.1 into something much larger.

This makes the project useful in two ways:

1. it may eventually help me directly manage my learning and job search;
2. it already demonstrates systems thinking, security design, and long-term project planning.

---

## Current Status

Cyber Career OS is currently in the **V0.1 planning and foundation stage**.

The first public milestones are:

- establish the architecture;
- define the constitution and design principles;
- create the repository foundation;
- begin implementation with maintainability and security in mind.

Project updates, milestones, and documentation will be added as development continues.

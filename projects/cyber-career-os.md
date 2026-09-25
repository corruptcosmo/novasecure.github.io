---
layout: default
title: Cyber Career OS | Hayden Ochoa
permalink: /projects/cyber-career-os/
---

# Cyber Career OS

**V0.1 — Foundation in Development**

> Learn. Prove. Apply. Improve.

Cyber Career OS is a local-first, AI-assisted cybersecurity career and training platform I am designing and building to solve a problem I encountered while beginning my cybersecurity career: entry-level candidates are expected to show experience before they are given many opportunities to gain professional experience.

The project is designed to connect career development directly with hands-on technical training and verifiable evidence.

---

## The Problem

Job listings repeatedly ask for hands-on experience with technologies such as SIEM platforms, Active Directory, Windows logging, Linux administration, scripting, incident response, and infrastructure tooling.

Cyber Career OS is intended to turn those recurring requirements into a continuous learning loop:

**Job market → skill-gap analysis → lab training → security investigation → assessment → verified evidence → stronger portfolio and applications**

---

## Planned Core Capabilities

- Discover and analyze entry-level cybersecurity and IT opportunities.
- Compare job requirements against verified skills and experience.
- Generate truthful job-specific resumes and application material.
- Track applications, interviews, and career progress.
- Identify recurring skill gaps across job listings.
- Convert skill gaps into hands-on cybersecurity labs.
- Provision isolated lab environments through controlled Proxmox integrations.
- Integrate lab telemetry with a SIEM.
- Provide progressively reduced AI mentorship as skills improve.
- Run controlled attack simulations inside isolated cyber ranges.
- Grade investigations, response decisions, and written incident reports.
- Convert completed labs and assessments into verifiable portfolio evidence.

---

## Current V0.1 Scope

V0.1 is intentionally focused on architecture and platform foundations rather than autonomous behavior.

The initial work includes:

- FastAPI backend architecture
- PostgreSQL persistence
- Next.js / React frontend foundation
- profile, skill, evidence, job, and application data models
- audit logging
- approval workflows
- data classification
- provider interfaces
- local-first AI architecture
- model-provider abstraction
- future Ollama support
- hypervisor-provider abstraction
- SIEM-provider abstraction
- threat modeling and security boundaries

The objective is to make later versions possible without rewriting the entire system.

---

## Security Philosophy

Cyber Career OS is being designed around several rules from the beginning:

### Least privilege
AI agents should never receive unrestricted access to infrastructure.

### Human authority
Consequential operations such as job submission or destructive infrastructure actions require explicit approval.

### Lab isolation
Controlled offensive-security simulations must remain within explicitly authorized lab environments.

### Evidence over claims
Generated resumes and portfolio material must distinguish professional employment from personal projects and lab experience.

### Local first
Sensitive career information, SIEM telemetry, and lab data should be able to remain local. Cloud AI is optional rather than a required architectural dependency.

---

## Long-Term Roadmap

### V1 — Personal Cyber Career OS

Career automation, job analysis, verified resume generation, skill-gap detection, Proxmox lab provisioning, cybersecurity mentoring, SIEM investigations, controlled attack drills, grading, and portfolio evidence.

### V2 — Adaptive Cyber Training Platform

Planned additions include:

- Ollama and local-model routing
- model benchmarking
- privacy-aware AI routing
- Purple Team mode
- detection engineering
- attack reconstruction and replay
- SOC shift simulation
- threat hunting
- incident-command exercises
- adaptive training
- cybersecurity knowledge graph

### V3 — Public Open-Source Platform

The platform is planned to evolve beyond a single-user system with multi-user support, tenant isolation, community scenario packs, plugin interfaces, modular integrations, self-hosted deployment, and contributor documentation.

### V4 — Cyber Career OS Distribution

The long-term goal is a Linux-based distribution or appliance that packages the mature platform and major dependencies into a simple setup experience. Rather than building a new kernel, the plan is to build on a maintained Linux base and provide local AI, cyber-range, SIEM, training, and career capabilities through a guided installation.

---

## Why I Am Documenting It This Early

This project is being documented from the beginning rather than only after it works.

That means the portfolio will include the architecture decisions, threat model, mistakes, redesigns, implementation milestones, screenshots, and version history that lead to the final system.

The goal is for the development process itself to become evidence of skills in:

- systems design
- security architecture
- Python development
- API design
- infrastructure automation
- AI integration
- threat modeling
- documentation
- testing
- secure software development

---

## Project Status

**Current milestone:** V0.1 foundation

**Started:** September 2026

This page will be updated as the implementation moves from architecture into working components and later releases.

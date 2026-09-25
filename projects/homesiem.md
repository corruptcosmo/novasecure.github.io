---
layout: default
title: Home SOC Lab | Hayden Ochoa
permalink: /projects/homesiem/
---

# Home SOC Lab

**A hands-on Security Operations Center lab built on Proxmox using Wazuh and pfSense to develop real blue team skills.**

## Overview

I built a home Security Operations Center (SOC) lab to gain practical experience with SIEM deployment, endpoint monitoring, network segmentation, and detection engineering. The goal was to create a realistic environment where I could safely test detections and practice incident response workflows.

## Goals

- Deploy and manage a full Wazuh SIEM
- Segment networks using a virtual firewall (pfSense)
- Deploy and monitor Wazuh agents across multiple systems
- Enable File Integrity Monitoring (FIM)
- Safely test detection capabilities using controlled scenarios
- Document the project for portfolio and resume use

## Architecture

The lab runs on Proxmox with two networks:

- **vmbr0** — Home/management network (has internet)
- **vmbr1** — Isolated lab network (used for controlled testing)

**Main Components:**
- Proxmox hypervisor
- pfSense virtual firewall (provides segmentation and routing)
- Wazuh Server (All-in-One in an LXC)
- Multiple Wazuh Agents (on host + isolated machines)
- Isolated lab network for safe malware/detection testing

## What I Built

### Wazuh SIEM

I deployed a Wazuh all-in-one server inside a Proxmox LXC container. The server acts as the central monitoring platform for the lab.

The environment is designed to collect logs from both management-side and isolated lab systems so I can practice alert triage and correlation from one place.

### Network Segmentation

I created an isolated virtual network using Proxmox and pfSense. This lets me separate testing systems from the rest of my home network while still controlling routing and visibility.

### Endpoint Monitoring

Wazuh agents provide endpoint telemetry from monitored systems. I use the environment to practice investigating authentication activity, file changes, suspicious processes, and other host events.

### File Integrity Monitoring

I enabled Wazuh File Integrity Monitoring to learn how endpoint changes are detected, recorded, and investigated.

## Skills Demonstrated

- Proxmox VE administration
- Linux server administration
- Wazuh deployment and management
- SIEM fundamentals
- log collection and analysis
- network segmentation
- pfSense configuration
- endpoint monitoring
- File Integrity Monitoring
- security lab isolation
- technical documentation

## Next Steps

- Add additional Windows and Linux endpoints
- Improve dashboarding and alert tuning
- Build repeatable controlled detection scenarios
- Practice incident timelines and case documentation
- Connect the lab with future Cyber Career OS training workflows

---

This lab is intentionally isolated for controlled defensive-security learning and testing.

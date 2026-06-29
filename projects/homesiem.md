---
layout: default
title: Home SOC Lab | Nova
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
- Deployed Wazuh as an all-in-one instance
- Configured the Indexer, Manager, and Dashboard
- Deployed agents on both the Proxmox host and isolated lab machines
- Enabled File Integrity Monitoring (FIM) for real-time file change detection

### Network Segmentation
- Set up pfSense as a virtual firewall
- Created an isolated lab network (`192.168.10.0/24`)
- Configured routing so lab machines can reach the Wazuh server while remaining segmented

### Endpoint Monitoring
- Installed and configured Wazuh agents across systems
- Verified agents were reporting properly in the dashboard
- Monitored system logs and file integrity events

### Detection Testing
- Used the EICAR test file and file modifications to generate alerts
- Practiced investigating alerts in the Wazuh Dashboard
- Gained experience with basic alert triage workflows

## Skills Gained

- SIEM deployment and management (Wazuh)
- Log collection and analysis
- File Integrity Monitoring (FIM)
- Network segmentation and firewall configuration (pfSense)
- Virtualization and lab infrastructure (Proxmox)
- Detection engineering basics
- Safe security testing environment design

## Challenges & Solutions

- **Networking issues** between the lab network and Wazuh server → Fixed by adding a management IP to the bridge and verifying routing through pfSense.
- **Wazuh agent configuration errors** (`MANAGER_IP` placeholder) → Manually edited the agent config file and restarted the service.
- **Dashboard access problems** → Cleared browser cache and accepted the self-signed certificate.

## Results

- Successfully built a functional Wazuh SIEM with multiple healthy agents
- Created a properly segmented lab network
- Detected file creation and modification activity using FIM
- Gained real experience investigating alerts in a live SIEM

## Lessons Learned

- Proper network segmentation is critical when working with potentially malicious activity
- Agent configuration and connectivity are foundational to good visibility
- Starting with simple, known test cases (like EICAR) is the best way to learn detection

## Future Improvements

- Move the Wazuh server fully onto the isolated lab network
- Add a Windows agent with Sysmon
- Integrate network detection (Suricata)
- Create custom detection rules
- Run a full simulated incident response exercise

## Screenshots

### Wazuh Dashboard

![Wazuh Dashboard Overview](/novasecure.github.io/images/Wazuh-dashboard.png)

### Wazuh Agents

![Wazuh Agents Overview](/novasecure.github.io/images/Wazuh-agents.png)

### Threat Hunting & Alerts

![Wazuh Threat Hunting](/novasecure.github.io/images/Wazuh-threat.png)

### pfSense Configuration

![pfSense LAN Interface](/novasecure.github.io/images/pfsense.png)

![pfSense Firewall Rules](/novasecure.github.io/images/pfsense1.png)

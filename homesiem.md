---
layout: default
title: Home SOC Lab | Nova
permalink: /projects/homesiem/
---
Home Security Operations Center (SOC) Lab
Built a production-style isolated Security Operations Center lab using Wazuh SIEM on Proxmox to develop hands-on blue team skills in log collection, endpoint monitoring, detection engineering, and incident response.

Project Overview
I designed and implemented a home Security Operations Center (SOC) lab to gain practical experience with enterprise-grade security tooling. The lab simulates a real defensive security environment, allowing me to deploy and manage a SIEM, monitor endpoints, segment networks, and safely test detection capabilities.
The project focuses on building a functional, isolated lab environment that mirrors the tools and workflows used in modern Security Operations Centers.
Goals & Objectives

Deploy and manage a full-featured open-source SIEM (Wazuh)
Implement network segmentation using a virtual firewall (pfSense)
Deploy and manage Wazuh agents across multiple systems
Enable File Integrity Monitoring (FIM) and log collection
Safely simulate detectable malicious activity and investigate alerts
Document the build process and findings for portfolio and resume use

Architecture
The lab runs on a Proxmox hypervisor with two distinct networks:

vmbr0 — Home/management network (internet access)
vmbr1 — Isolated lab network (no direct internet, used for controlled testing)

Core Components:

Proxmox VE — Virtualization platform
pfSense — Virtual firewall providing segmentation, routing, and firewall logging between networks
Wazuh Server (All-in-One) — Running in an LXC container with Indexer, Manager, and Dashboard
Wazuh Agents — Deployed on the Proxmox host and on isolated lab machines
Isolated Lab Network (vmbr1) — Used for safe attack simulation and malware testing

This architecture allows agents on the isolated network to communicate with the Wazuh server while keeping potentially malicious activity contained.
Key Components & Implementation
Wazuh SIEM Deployment

Deployed Wazuh as an all-in-one instance in an LXC container
Configured Indexer, Manager, and Dashboard
Deployed and managed multiple Wazuh agents across systems
Enabled File Integrity Monitoring (FIM) for real-time file change detection

Network Segmentation with pfSense

Configured pfSense as a virtual firewall with separate WAN and LAN interfaces
Created an isolated lab network (192.168.10.0/24) behind pfSense
Established proper routing and firewall rules to allow controlled communication between the lab network and Wazuh server

Endpoint Monitoring

Installed Wazuh agents on both the hypervisor host and isolated lab machines
Configured agents to forward logs, system events, and FIM data to the central server
Verified agent health, keep-alives, and data ingestion in the Wazuh Dashboard

Detection & Testing

Performed controlled testing using the EICAR test file and file modification activities
Monitored and investigated generated alerts in the Wazuh Dashboard
Practiced basic alert triage and investigation workflows

Skills Demonstrated

SIEM Administration — Deployment, configuration, and management of Wazuh (indexing, alerting, agent management)
Endpoint Detection & Response (EDR) Fundamentals — Agent deployment, log collection, and File Integrity Monitoring
Network Security & Segmentation — Virtual firewall configuration (pfSense), network isolation, and traffic control
Detection Engineering — Creating detectable scenarios and analyzing generated alerts
Virtualization & Infrastructure — Building and managing multi-tier lab environments in Proxmox
Incident Response Fundamentals — Alert investigation, log analysis, and containment concepts
Secure Lab Design — Building isolated environments for safe security testing

Challenges & Solutions
Challenge: Initial networking issues between the isolated lab network and Wazuh server.
Solution: Added a management IP to the lab bridge and verified routing through pfSense. Later moved the target container fully onto the isolated network while maintaining connectivity to the Wazuh server.
Challenge: Wazuh agent configuration errors after installation (placeholder MANAGER_IP).
Solution: Manually edited /var/ossec/etc/ossec.conf on affected agents and restarted the service.
Challenge: Browser access issues to the Wazuh Dashboard.
Solution: Cleared browser cache, used Incognito mode, and accepted the self-signed certificate.
Results

Successfully deployed a functional Wazuh SIEM with multiple agents reporting data
Built a properly segmented lab network using pfSense
Detected file creation and modification activity using File Integrity Monitoring
Gained practical experience triaging alerts and investigating events in a real SIEM interface
Created a safe, repeatable environment for future detection testing and skill development

Lessons Learned

The importance of proper network segmentation when working with potentially malicious activity
How agent configuration and connectivity issues can impact visibility in a SIEM
The value of starting with simple, known test cases (such as EICAR) before moving to more complex scenarios
How open-source tools like Wazuh can provide production-grade visibility when properly configured

Future Improvements

Move the Wazuh server fully onto the isolated lab network
Deploy a Windows agent with Sysmon for enhanced endpoint visibility
Integrate network-based detection (Suricata)
Create custom detection rules and decoders
Add centralized logging from additional services
Document a full incident response exercise using the lab

Screenshots & Evidence
(Add your screenshots here)

Wazuh Dashboard Overview
Agents list showing healthy agents
Example FIM / Security Event alerts
pfSense LAN interface and firewall rules
Network diagram of the lab architecture

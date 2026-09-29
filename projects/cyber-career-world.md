---
layout: default
title: Cyber Career World | Hayden Ochoa
permalink: /projects/cyber-career-world/
---

# Cyber Career World

**An original, self-hosted 3D voxel-cyber website built with Three.js, Vite, Docker, Nginx, and a Caddy reverse proxy.**

## Overview

Cyber Career World is an experimental companion site to my formal cybersecurity portfolio. Instead of presenting Cyber Career OS as a conventional product page, it turns the platform into an explorable 3D training world.

The project borrows the *idea* of readable voxel construction and tutorial-world exploration while using an original visual system, original structures, original colors, and no third-party game assets.

## Why I Built It

My formal portfolio is intentionally straightforward and recruiter-friendly. I wanted a second experience that could show more personality while also becoming a practical web-infrastructure project of its own.

The world is designed around a guided exploration loop: visitors begin at a central orientation plaza and can travel to distinct landmarks representing major parts of Cyber Career OS.

## Current World

The prototype currently includes:

- Procedural block-based terrain
- A central tutorial/orientation plaza
- Guided camera navigation
- Clickable 3D landmarks
- Career Base
- Agent Forge
- Cyber Range
- Evidence Vault
- Glowing data paths
- Water and bridge geometry
- Original block-built vegetation
- Secondary relay towers and a hidden landmark
- Ambient particles and animated infrastructure
- Desktop and mobile rendering adjustments
- Reduced-motion support

## Architecture

The browser performs the actual 3D rendering. The server delivers the built frontend as a containerized static site.

```text
Browser GPU
  |
  | WebGL / Three.js
  v
3D Cyber Career World frontend
  ^
  |
Nginx container
  ^
  |
Caddy reverse proxy + HTTPS
  ^
  |
Internet
```

### Frontend

- Three.js
- WebGL
- Vite
- JavaScript
- Responsive CSS

### Hosting

- Docker / Docker Compose
- Multi-stage frontend build
- Nginx static hosting
- Caddy reverse proxy
- Automatic HTTPS
- Self-hosted Linux server

## Reverse Proxy Design

The public website is intended to expose only the reverse proxy on standard web ports. The application container can remain on a private Docker network.

```text
world.example.com
      |
      v
    Caddy
      |
      v
cyber-career-world:80
```

This makes it possible to host multiple services on the same server and route each hostname to the correct internal application without assigning every service its own public port.

## Security Decisions

- The public 3D frontend does not need access to Proxmox administration or the Docker API.
- Infrastructure management interfaces should not be exposed just because the website is public.
- Future live status features should use a separate read-only API that publishes only explicitly safe fields.
- HTTPS terminates at the reverse proxy.
- Production application traffic can remain on a private Docker network.

## Performance Work

The prototype uses several techniques to keep the scene practical for normal browsers:

- Instanced terrain geometry
- Limited device pixel ratio
- Reduced shadow load on mobile
- Lower particle counts on mobile
- Fog to limit visual complexity and establish depth
- Reduced-motion handling
- Browser-side rendering instead of remote GPU streaming

## Skills Demonstrated

- Three.js / WebGL
- Interactive 3D web development
- JavaScript
- Frontend performance optimization
- Docker and Docker Compose
- Nginx
- Reverse proxies
- HTTPS / TLS concepts
- DNS and self-hosted web deployment
- Linux server administration
- Network exposure and service-isolation planning
- Original UI/world design
- Technical documentation

## Next Steps

- Build out larger terrain and more natural elevation changes
- Add explorable interiors for the major zones
- Add original tutorial terminals and signs
- Add project screenshots and evidence inside the world
- Add deeper interactions in the Cyber Range and Agent Forge
- Add a safe read-only status API for selected Cyber Career OS/lab information
- Add accessibility alternatives for information contained in the 3D world
- Establish the permanent identity and public hostname

---

**Status:** Prototype / active development.

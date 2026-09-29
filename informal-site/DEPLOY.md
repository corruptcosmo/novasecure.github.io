# Cyber Career OS // World — Server Deployment

This guide assumes a Linux server with Docker Engine, Docker Compose v2, Git, and SSH access. For the current homelab deployment, the recommended layout is a dedicated Debian VM on Proxmox rather than installing the public web stack directly on the Proxmox host.

# Stage 0 — Create the Proxmox web VM

Recommended starter VM:

- OS: Debian 13 stable (Trixie), amd64 netinst
- Name: `cyber-web`
- CPU: 2 cores, CPU type `host` when live migration compatibility is not needed
- Memory: 2048 MB
- Disk: 24 GB on SSD-backed storage if available
- Network: VirtIO NIC attached to the normal LAN bridge (commonly `vmbr0`)
- QEMU Guest Agent: enabled after the agent is installed in Debian
- Start at boot: enabled after setup is verified

## Upload the Debian ISO

Download the current Debian 13 amd64 netinst ISO from Debian's official download page. In the Proxmox web UI, select the node, select storage that supports ISO images (commonly `local`), open **ISO Images**, then upload the ISO.

## Create the VM in the Proxmox GUI

Click **Create VM** and use these settings as a baseline:

### General

- Node: the Proxmox host
- VM ID: leave the suggested unused ID
- Name: `cyber-web`
- Start at boot: can be enabled now or after installation

### OS

- Use CD/DVD disc image file (ISO)
- Select the Debian 13 amd64 netinst ISO
- Guest OS type: Linux

### System

- Keep the normal Proxmox defaults unless the host has a reason to use something else
- SCSI Controller: VirtIO SCSI Single
- QEMU Guest Agent: enable this option if available; install the guest package inside Debian after first boot

### Disks

- Bus/Device: SCSI
- Storage: preferred VM disk storage
- Disk size: 24 GiB
- Discard: enable when the underlying storage supports it
- SSD emulation: enable when the backing storage is SSD

### CPU

- Sockets: 1
- Cores: 2
- Type: `host` for a single-host homelab where maximum CPU compatibility across different Proxmox hosts is not needed

### Memory

- Memory: 2048 MiB

### Network

- Bridge: the normal LAN-facing Proxmox bridge, commonly `vmbr0`
- Model: VirtIO (paravirtualized)

Finish the wizard and start the VM.

## Install Debian

Open the VM's Console and boot the installer. A simple server install is enough:

1. Choose **Graphical install** or **Install**.
2. Select language, location, and keyboard.
3. Hostname: `cyber-web`.
4. Domain name: leave blank unless the LAN already uses one.
5. Create a normal administrative user and password.
6. Let DHCP configure networking for the first installation.
7. Partitioning: **Guided - use entire disk**, then **All files in one partition**.
8. Confirm the partition changes.
9. Select a nearby Debian mirror.
10. At software selection, deselect desktop environments. Keep **SSH server** and **standard system utilities** selected.
11. Install GRUB to the VM disk when prompted.
12. Reboot and remove/eject the installer ISO if Proxmox does not do so automatically.

## First boot setup

Log in through the Proxmox console, find the VM address, and update the system:

```bash
ip -br address
sudo apt update
sudo apt full-upgrade -y
sudo apt install -y qemu-guest-agent ca-certificates curl git openssh-server
sudo systemctl enable --now qemu-guest-agent ssh
```

In Proxmox, confirm **Options > QEMU Guest Agent** is enabled. Reboot the VM once if the Proxmox summary does not immediately show the guest IP address:

```bash
sudo reboot
```

Then SSH to it from another computer:

```bash
ssh YOUR_USER@VM_LAN_IP
```

A DHCP reservation in the home router is recommended so this VM keeps the same LAN IP. A static address can also be configured inside Debian, but a router reservation is usually simpler for a homelab.

## Install Docker Engine and Compose from Docker's official repository

Run these inside the `cyber-web` VM, not on the Proxmox host:

```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify:

```bash
sudo docker run hello-world
docker compose version
```

Optional: allow the normal user to run Docker without `sudo`:

```bash
sudo usermod -aG docker "$USER"
```

Log out and back in before testing the group change:

```bash
docker run hello-world
```

> Membership in the `docker` group effectively grants root-level control over this VM. Only grant it to trusted administrative users.

---

## What a reverse proxy does

Without a reverse proxy, this site can be reached directly on a port such as:

```text
http://192.168.1.50:8088
```

A reverse proxy becomes the public front door:

```text
Browser
  |
  |  https://world.example.com
  v
Router / Firewall
  |
  |  TCP 80 + 443
  v
Caddy reverse proxy
  |
  |  internal Docker network
  v
Cyber Career World container :80
```

This lets several apps share one server and one public IP. Caddy decides which internal app receives each request based on the hostname. It can also obtain and renew HTTPS certificates automatically.

Example:

```text
world.example.com   -> cyber-career-world:80
career.example.com  -> cyber-career-os-frontend:3000
status.example.com  -> another-container:8080
```

Only the reverse proxy needs to be exposed to the internet. The application containers can remain private behind it.

---

## Stage 1 — Copy the project from GitHub to the server

SSH into the server:

```bash
ssh YOUR_USER@SERVER_LAN_IP
```

Choose a location for the source code:

```bash
sudo mkdir -p /opt/cyber-career-world
sudo chown -R "$USER":"$USER" /opt/cyber-career-world
cd /opt/cyber-career-world
```

Clone the current development branch:

```bash
git clone --branch informal-voxel-cyber-concept https://github.com/corruptcosmo/novasecure.github.io.git repo
cd repo/informal-site
```

Build and start the site:

```bash
docker compose up -d --build
```

Check it:

```bash
docker compose ps
docker compose logs --tail=100
```

The development compose file publishes the site on port `8088`. From another device on the home network, open:

```text
http://SERVER_LAN_IP:8088
```

Do this test before setting up DNS or a reverse proxy. It separates "does the site work?" from "does internet routing work?".

---

## Updating the site later

When new code is pushed to this branch:

```bash
cd /opt/cyber-career-world/repo
git pull
cd informal-site
docker compose up -d --build
```

Docker will rebuild the Vite/Three.js frontend and replace the running container.

---

# Stage 2 — Put the app behind Caddy

For production, the app should not need a public host port. Caddy and the app can communicate on a private Docker network.

## 1. Create a shared proxy network

Run once:

```bash
docker network create web
```

If Docker says the network already exists, that is fine.

## 2. Start the site with the production compose file

From `informal-site/`:

```bash
docker compose down
docker compose -f docker-compose.production.yml up -d --build
```

In this mode there is no `8088:80` public mapping. The container joins the `web` network and is reachable by Caddy using the Docker name `cyber-career-world`.

## 3. Create the Caddy reverse-proxy directory

```bash
sudo mkdir -p /opt/caddy
sudo chown -R "$USER":"$USER" /opt/caddy
cd /opt/caddy
```

Copy the example files from `informal-site/deploy/caddy/`, or create the two files manually.

### compose.yaml

```yaml
services:
  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - web

networks:
  web:
    external: true

volumes:
  caddy_data:
  caddy_config:
```

### Caddyfile

Replace the example domain with the real hostname you choose:

```caddyfile
world.example.com {
    reverse_proxy cyber-career-world:80
}
```

Start Caddy:

```bash
docker compose up -d
```

Check logs:

```bash
docker compose logs -f caddy
```

Press `Ctrl+C` to stop viewing logs; that does not stop the container.

---

# Stage 3 — DNS, router, and HTTPS

For a normal public HTTPS site:

1. Own a domain name.
2. Create a DNS `A` record for your chosen hostname, such as `world.example.com`, pointing to your home's public IPv4 address.
3. If you use IPv6, add the appropriate `AAAA` record only if you intend to expose the service over IPv6 and have configured the firewall correctly.
4. In the home router, forward external TCP port `80` to port `80` on the reverse-proxy server.
5. Forward external TCP port `443` to port `443` on the reverse-proxy server.
6. If you use HTTP/3, UDP `443` may also be forwarded.
7. Make sure the server firewall permits the required ports.
8. Start Caddy after DNS points to the correct public address.

When Caddy sees a public hostname in the Caddyfile and can be reached correctly, it can automatically request an HTTPS certificate, redirect HTTP to HTTPS, and renew the certificate later.

## Important: CGNAT

Some residential ISPs place customers behind Carrier-Grade NAT (CGNAT). If your router's WAN/public address does not match the public address shown by an external IP-check service, ordinary inbound port forwarding may not work.

If the connection is behind CGNAT, alternatives include a tunnel service, a VPS relay, IPv6 (when properly secured), or requesting a real public IPv4 address from the ISP.

Do not keep opening random router ports while troubleshooting. First establish whether the server has a usable public route.

---

# Security model

Preferred production exposure:

```text
Internet
  |
  +-- 80/443 --> Caddy
                   |
                   +-- private Docker network --> cyber-career-world:80
```

Avoid exposing Proxmox, Docker APIs, databases, Wazuh administration, or Cyber Career OS privileged backend endpoints directly to the public internet just because the website is public.

If the 3D world eventually displays live server/project status, create a small read-only API that returns explicitly safe fields. Do not let the public frontend query Proxmox or Docker directly.

---

# Useful commands

Website status:

```bash
cd /opt/cyber-career-world/repo/informal-site
docker compose -f docker-compose.production.yml ps
```

Website logs:

```bash
docker logs --tail=100 cyber-career-world
```

Rebuild after pulling changes:

```bash
git -C /opt/cyber-career-world/repo pull
cd /opt/cyber-career-world/repo/informal-site
docker compose -f docker-compose.production.yml up -d --build
```

Restart Caddy:

```bash
cd /opt/caddy
docker compose restart caddy
```

Reload the Caddy configuration without restarting the container:

```bash
cd /opt/caddy
docker compose exec -w /etc/caddy caddy caddy reload
```

---

# Recommended deployment order

1. Create and update the dedicated Debian Proxmox VM.
2. Install Docker Engine + Compose inside that VM.
3. Clone the repository.
4. Test `SERVER_LAN_IP:8088` on the LAN.
5. Create the shared `web` Docker network.
6. Switch the site to `docker-compose.production.yml`.
7. Start Caddy with a temporary/local configuration or the real domain.
8. Configure DNS.
9. Configure only the required router/firewall ports.
10. Verify HTTPS from a device outside the home network.
11. Only after that, add the link from the formal portfolio.

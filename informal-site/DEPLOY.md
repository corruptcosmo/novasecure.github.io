# Cyber Career OS // World — Server Deployment

This guide assumes a Linux server with Docker Engine, Docker Compose v2, Git, and SSH access.

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

1. Clone the repository.
2. Test `SERVER_LAN_IP:8088` on the LAN.
3. Create the shared `web` Docker network.
4. Switch the site to `docker-compose.production.yml`.
5. Start Caddy with a temporary/local configuration or the real domain.
6. Configure DNS.
7. Configure only the required router/firewall ports.
8. Verify HTTPS from a device outside the home network.
9. Only after that, add the link from the formal portfolio.

# Simple Node LocalStorage App

Simple Node.js + Express app for Render deployment. The browser stores notes in `localStorage`, so no database is required.

## Run locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:10000
```

## Run with Docker

```bash
docker build -t simple-node-localstorage .
docker run --rm -p 10000:10000 simple-node-localstorage
```

## Run with Docker Compose

```bash
docker compose up --build
```

## GitHub Actions secrets

Add these repository secrets before pushing to GitHub:

```txt
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
RENDER_DEPLOY_HOOK_URL
```

The workflow builds and pushes:

```txt
DOCKERHUB_USERNAME/simple-node-localstorage:latest
DOCKERHUB_USERNAME/simple-node-localstorage:<commit-sha>
```

Then it triggers Render using the deploy hook URL.

## Render

This project includes `render.yaml`.

For manual setup on Render:

- Environment: Docker
- Dockerfile path: `./Dockerfile`
- Port: `10000`
# Deploy_docker

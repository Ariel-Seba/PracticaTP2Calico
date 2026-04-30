# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CALICO is a veterinary clinic SaaS platform built as a microservices practice (TP2). The full spec is in `ENUNCIADO.md`.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite + Tailwind CSS |
| Backend (each service) | Node.js + Express |
| Database | PostgreSQL (one instance per service) |
| Containerization | Docker + Docker Compose |
| API Gateway | Nginx |
| Inter-service communication | HTTP REST (sync) |

## Architecture

Five components, each in its own directory with its own `Dockerfile` and `package.json`:

- `pacientes-service/` — pet and owner CRUD (port 3001, `pacientes_db`)
- `turnos-service/` — appointment booking/cancellation (port 3002, `turnos_db`)
- `vacunas-service/` — vaccination schedule registry (port 3003, `vacunas_db`)
- `api-gateway/` — Nginx reverse proxy (single entry point for the frontend)
- `frontend/` — React app that talks only to the API gateway

The frontend **never calls services directly** — all traffic goes through the API gateway. Services may call each other directly (not through the gateway) for inter-service communication.

Each service has its own isolated PostgreSQL instance (`pacientes-db`, `turnos-db`, `vacunas-db`). The root `docker-compose.yml` orchestrates the entire system.

Environment variables are loaded from `.env` (see `.env.example` for required vars — never hardcode them).

## Common Commands

```bash
# Start all services
docker compose up --build

# Start in background
docker compose up -d --build

# Stop everything
docker compose down

# Stop and remove volumes (wipe databases)
docker compose down -v

# View logs for a specific service
docker compose logs -f pacientes-service

# Rebuild a single service
docker compose up --build pacientes-service

# Run inside a service container
docker compose exec pacientes-service sh
```

### Per-service development (without Docker)

```bash
cd pacientes-service   # or turnos-service, vacunas-service, frontend
npm install
npm run dev            # expects DB available; set env vars manually or use Docker for DB only
npm test               # if tests are configured
```

## Checkpoints

| Checkpoint | Scope |
|-----------|-------|
| 01 | Project structure + `pacientes-service` + Docker |
| 02 | `turnos-service` + inter-service HTTP calls |
| 03 | `vacunas-service` + Nginx API gateway |
| 04 | React frontend connected to gateway |
| Bonus 1 | JWT auth as independent service |
| Bonus 2 | Prometheus + Grafana monitoring |
| Bonus 3 | GitHub Actions CI per service |

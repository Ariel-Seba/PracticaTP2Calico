# CALICO — Plataforma Veterinaria con Microservicios

## Contexto

CALICO es una plataforma SaaS para clínicas veterinarias (ver TP1). En este práctico vas a
implementar una versión funcional de sus módulos core usando una arquitectura de microservicios
real, con el mismo stack tecnológico que el equipo definió en el TP1.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React + TypeScript + Vite + Tailwind CSS |
| Backend (cada servicio) | Node.js + Express |
| Base de datos | PostgreSQL (una instancia por servicio) |
| Contenerización | Docker + Docker Compose |
| API Gateway | Nginx |
| Comunicación entre servicios | HTTP REST (sync) |

## Módulos a implementar

Se implementan los módulos del plan **Básico** de CALICO:

1. **pacientes-service** — CRUD de mascotas y sus dueños
2. **turnos-service** — reserva y cancelación de turnos
3. **vacunas-service** — registro del calendario de vacunación
4. **api-gateway** — punto de entrada único (Nginx)
5. **frontend** — interfaz React que consume el gateway

## Estructura de checkpoints

| Checkpoint | Contenido |
|-----------|-----------|
| 01 | Estructura del proyecto + pacientes-service + Docker |
| 02 | turnos-service + comunicación entre servicios |
| 03 | vacunas-service + API Gateway con Nginx |
| 04 | Frontend React conectado al gateway |
| Bonus 1 | Autenticación JWT como servicio independiente |
| Bonus 2 | Monitoreo con Prometheus + Grafana (reutilizar lo de TP_Final) |
| Bonus 3 | GitHub Actions CI: build + test automáticos por servicio |

## Criterios generales

- Cada servicio vive en su propio directorio, con su propio `Dockerfile` y `package.json`
- Cada servicio tiene su propia base de datos PostgreSQL (aislamiento real)
- El `docker-compose.yml` en la raíz levanta todo el sistema
- Los servicios se comunican **solo a través del API Gateway** desde el frontend
- Variables sensibles en `.env` (nunca hardcodeadas)

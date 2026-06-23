# Olympus.AI

## Overview

Olympus.AI is a full-stack demonstration platform designed to showcase AI-powered dashboard generation, real-time data streaming, and modern web application architecture.

The project combines a React frontend with a Node.js backend and uses WebSockets to simulate live telemetry data streams. It presents a futuristic dashboard experience where users can explore generated analytics interfaces, case studies, and real-time monitoring concepts.

The repository is organized as a monorepo-style structure with separate frontend, backend, and shared modules.

---

## Key Features

### Interactive Dashboard Experience

* Modern React-based user interface
* Animated dashboard components using Framer Motion
* AI-inspired dashboard generation workflow
* Dynamic case study showcase

### Real-Time Data Streaming

* Socket.IO-powered WebSocket communication
* Simulated telemetry streams running at approximately 60 updates per second
* Live drone monitoring data generation

### Backend Services

* Express-based API server
* WebSocket server integration
* MongoDB Atlas connectivity
* Environment-based configuration

### Shared Validation Layer

* Zod schema validation
* Shared TypeScript types between frontend and backend
* Consistent data contracts across the application

### Mock AI Playground

* Prompt-based dashboard generation simulation
* Multi-stage generation workflow
* Interactive visualization rendering

---

## Project Structure

```text
Olympus-AI/
│
├── backend/
│   ├── src/
│   │   ├── db.ts
│   │   ├── schemas.ts
│   │   ├── server.ts
│   │   └── workers/
│   │       └── mockStream.ts
│   │
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Playground.tsx
│   │   ├── socket.ts
│   │   └── schemas.ts
│   │
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── shared/
│   ├── src/
│   │   └── schemas.ts
│   │
│   └── package.json
│
├── assets/
└── playground/
```

---

## Technology Stack

### Frontend

* React 19
* TypeScript
* Vite
* Framer Motion
* GSAP
* Socket.IO Client
* Zod

### Backend

* Node.js
* Express
* TypeScript
* Socket.IO
* MongoDB
* Mongoose
* Dotenv
* BullMQ
* Zod

---

## Architecture

### Frontend Layer

The frontend provides:

* Dashboard user interface
* Interactive animations
* AI playground simulation
* Real-time data visualization
* WebSocket client connectivity

### Backend Layer

The backend provides:

* REST API endpoints
* WebSocket server
* Telemetry generation workers
* Database connectivity
* Data validation

### Data Layer

MongoDB Atlas is used as the persistence layer. The application attempts to connect using the `MONGODB_URI` environment variable during startup.

### Real-Time Communication

Socket.IO is used to stream telemetry data from the backend to connected frontend clients.

Current implementation simulates:

* Multiple drones
* Battery levels
* Speed metrics
* Altitude metrics
* GPS coordinates
* Operational status

---


## Current Functionality

Implemented:

* Dashboard UI
* Interactive AI playground
* Real-time telemetry simulation
* Socket.IO communication
* MongoDB connection layer
* Shared validation schemas

Partially Implemented:

* AI synthesis endpoint
* Generated dashboard engine
* Persistent telemetry storage

---

## Future Enhancements

Potential improvements include:

* Gemini/OpenAI integration
* Real dashboard generation from prompts
* User authentication
* Role-based access control
* Telemetry history storage
* Analytics reporting
* Multi-user collaboration
* Deployment automation
* Kubernetes support
* Production monitoring

---

## Development Notes

The project currently functions as a proof-of-concept and demonstration platform.

Several UI elements reference advanced AI generation capabilities, while some backend services remain placeholders for future implementation.

The architecture, however, is structured to support future expansion into a production-ready AI dashboard generation platform.

---

## License

Specify the project license here.

If no license file is present, all rights remain with the repository owner until a license is explicitly added.

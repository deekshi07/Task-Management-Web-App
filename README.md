# 📊 TaskGlitch — Task Management & Analytics Dashboard

<p align="center">
  <a href="https://task-management-web-app-doea-5rg3psm9s-deekshi07s-projects.vercel.app"><img src="https://img.shields.io/badge/Live_App-Deployed_on_Vercel-success?style=for-the-badge&logo=vercel" alt="Live App" /></a>
  <img src="https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Material_UI-v6-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
  <img src="https://img.shields.io/badge/MUI_X--Charts-7.20-blue?style=for-the-badge" alt="MUI X-Charts" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
  <a href="https://github.com/deekshi07/Task-Management-Web-App/actions/workflows/ci.yml"><img src="https://github.com/deekshi07/Task-Management-Web-App/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
</p>

A modern, high-performance task management and productivity web application built with **React 18**, **TypeScript**, **Vite**, and **Material UI**. TaskGlitch provides teams and individual developers with real-time task lifecycle tracking, workload distribution analytics via interactive charts, dynamic audit logs, and instant undo actions.

---

## ✨ Features & Capabilities

- **📋 Complete Task Lifecycle (CRUD):** Create, update, filter, sort, and complete tasks with granular priority levels (`High`, `Medium`, `Low`) and categories.
- **📈 Real-Time Charts & Analytics:** Powered by `@mui/x-charts`, visualizing completion velocity, pending workload distributions, and productivity trends.
- **📅 Advanced Date Scheduling:** Integrated `@mui/x-date-pickers` with `Day.js` for strict deadline management and overdue tracking.
- **📝 Real-time Activity Log:** Tracks state transitions, edits, and deletions in a timestamped audit trail.
- **🔄 Undo/Redo Capability:** Built-in `UndoSnackbar` mechanism preventing accidental deletions or unwanted status modifications.
- **🛡️ 100% Type-Safe:** Fully typed state management, form handlers, and data structures using TypeScript interfaces and custom hooks.

---

## 🏗️ Architecture & Component Design

```
src/
├── components/
│   ├── ActivityLog.tsx         # Audit log tracking events & history
│   ├── AnalyticsDashboard.tsx  # Overview summary cards & status metrics
│   ├── ChartsDashboard.tsx     # MUI X-Charts visualizations (Pie & Bar)
│   ├── MetricsBar.tsx          # Key performance indicators (KPIs)
│   ├── TaskDetailsDialog.tsx   # Detailed modal viewer for task inspect
│   ├── TaskForm.tsx            # Task creation & editing modal with validation
│   ├── TaskTable.tsx           # Sortable, filterable interactive table
│   └── UndoSnackbar.tsx        # Toast notification with rollback actions
├── context/                    # React Context providers for global task state
├── hooks/                      # Custom React hooks for business logic
├── utils/                      # Helper formatters and date computations
├── theme.ts                    # Custom Material UI theme configuration
├── types.ts                    # TypeScript types and data models
├── App.tsx                     # Primary dashboard layout & routing
└── main.tsx                    # Application bootstrap & DOM mount
```

---

## ⚡ Quickstart Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or `v22.x`
- **npm** or **yarn**

### 2. Setup & Installation

```bash
# Clone the repository
git clone https://github.com/deekshi07/Task-Management-Web-App.git
cd Task-Management-Web-App

# Install project dependencies
npm install
```

### 3. Development Server

```bash
npm run dev
```
Open your browser at `http://localhost:5173` to view the live dashboard with Hot Module Replacement (HMR).

### 4. Production Build & Preview

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Tech Stack Details

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI framework with Concurrent Mode support |
| **TypeScript 5.6** | Static typing, interface definitions, and code reliability |
| **Vite 5.4** | Ultra-fast build tool and development server |
| **Material UI (MUI v6)** | Component design system and layout primitives |
| **MUI X-Charts** | Interactive SVG-based data visualizations and analytics |
| **Day.js** | Lightweight date manipulation and scheduling engine |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

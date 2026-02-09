# Role-Based Operations Dashboard (OpsDash)

An enterprise-grade, high-performance operations dashboard built for industrial supervisors and management. Designed for oil & gas, manufacturing, and infrastructure sectors.

## 🚀 Key Features

- **Large Dataset Handling**: Virtualized rendering of 10,000+ rows maintaining 60 FPS scrolling.
- **Enterprise UI/UX**: Clean, responsive, dark/light mode supported design using Tailwind CSS.
- **Role-Based Access Control (RBAC)**: Secure routes for Worker, Supervisor, and Admin roles.
- **Real-Time Data**: Live KPI updates with polling mechanism and visual sync indicators.
- **Performance Optimized**: Aggressive memoization, code-splitting, and lightweight state management with Zustand.
- **Feature Flags**: Dynamic feature toggles via JSON configuration.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript (Strict)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Reason: Minimal boilerplate, fast, and easy to scale compared to Redux)
- **Virtualization**: [react-window](https://github.com/bvaughn/react-window)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Modules logic
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📁 Project Structure

```bash
src/
├── components/   # Reusable UI widgets (KPI Card, Virtualized Table, etc.)
├── features/     # Feature-specific pages and logic (Dashboard, Analytics, Auth)
├── hooks/        # Shared custom hooks
├── services/     # Mock API services (AuthService, DataService)
├── store/        # Zustand stores for global state
├── types/        # TypeScript interfaces and types
└── utils/        # Utility functions
```

**Why this scales**: Feature-based folder structure separates concerns by business domain, making it easy for teams to work on independent modules without merge conflicts.

## 📈 Performance Benchmarking

- **Lighthouse Score**: Target 90+ across all metrics.
- **Optimizations Made**:
  - `React.memo` on high-frequency components (KPI cards).
  - `useMemo` for filtering large datasets (10k items).
  - Virtualization in tables to reduce DOM node count.
  - Image optimization (SVG icons).
  - Bundle splitting via `Suspense` and `lazy`.

## ⚙️ Feature Flags

Configuration located in `src/store/index.ts`. Flags can be toggled via the Settings page or via a remote JSON config in production.

- `enableAnalytics`: Show/hide historical data.
- `enableExtraKpis`: Display supplemental metrics.

## 🚦 Getting Started

1. `npm install`
2. `npm run dev`

**Mock Login Roles**:
- `Worker`
- `Supervisor`
- `Admin`

---

*Built with precision for the modern industrial worker.*

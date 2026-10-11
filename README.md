# Executive Cockpit // FinOps & SaaS Intelligence

> **Real-time executive telemetry dashboard, SaaS unit economics analyzer, and AI FinOps scenario simulator built with Svelte 5 (Runes) and Tailwind CSS.**

[![Live Demo](https://img.shields.io/badge/demo-online-emerald.svg)](https://miguelgonzalezalvarez.github.io/Web-Executive-Metrics-Cockpit/)
[![Svelte](https://img.shields.io/badge/Svelte-5.57-FF3E00.svg?logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/tests-7%20passed%20(100%25)-brightgreen.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 Executive Overview

Modern tech leadership requires instant visibility into how engineering infrastructure decisions directly impact gross margin, runway, and enterprise valuation.

**Executive Cockpit** bridges the gap between **Cloud / AI Engineering (FinOps)** and **C-Suite Financial Strategy**. It empowers Founders, CEOs, CTOs, and Board Directors to monitor company unit economics, isolate cloud GPU & LLM cost drivers, and simulate strategic scenarios in real-time.

---

## ✨ Key Capabilities

### 1. 📊 Executive Financial & SaaS KPIs
* **Annual & Monthly Recurring Revenue (ARR / MRR)** with YoY growth trajectories.
* **Rule of 40 Score**: Combined growth rate and Free Cash Flow margin with automated tier classification (*Elite*, *Above Par*, *Sub-optimal*).
* **Net Revenue Retention (NRR) & Gross Retention**: Multi-tier tracking with LTV:CAC ratios and CAC payback periods.
* **Burn Rate & Runway Telemetry**: Real-time monthly net burn and runway duration, with support for cash-flow-positive businesses.

### 2. ⚡ AI & Cloud FinOps Unit Economics
* **Inference vs Platform Cost Breakdown**: Dedicated tracking for H100/A100 GPU clusters, LLM APIs (OpenAI, Anthropic, Gemini), and vector databases.
* **Granular Unit Costs**: Blended cost per active tenant and cost per 1M tokens.
* **FinOps Anomaly Detection**: Automated flagging of idle clusters, caching degradation, and unallocated worker pools with potential monthly savings.

### 3. 👥 Customer Retention Cohort Heatmap
* **12-Month Matrix**: Color-coded retention visualization across quarterly customer cohorts.
* **Expansion vs Churn**: Net negative churn tracking and retention floors.

### 4. 🎛️ Interactive What-If Scenario Simulator
* **Real-time Levers**:
  * Growth Acceleration Target (-30% to +80%)
  * Pricing Tier & ARPU Adjustment (-20% to +40%)
  * Churn Mitigation Delta (-5% to +5%)
  * R&D & GTM Headcount Expansion (-10 to +35 FTEs)
  * FinOps AI/Cloud Optimization (0% to 45% savings)
* **Instant Reactive Projections**: Implied enterprise valuation multiple, post-money valuation, adjusted runway, and AI-driven strategic advice.

### 5. 📑 Board Memorandum Generator
* One-click generation of board-ready executive summaries based on live telemetry and simulated metrics.
* Direct copy-to-clipboard and Markdown file export (`.md`).

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Svelte 5](https://svelte.dev/) utilizing the new **Runes reactive model** (`$state`, `$derived`, `$effect`) for fine-grained reactivity and minimal runtime overhead.
* **Language**: TypeScript (Strict Mode).
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with full responsive design and adaptive dark/light themes.
* **Visualizations**: Lightweight, custom SVG charts with zero heavyweight charting dependencies.
* **Testing**: [Vitest](https://vitest.dev/) unit test suite.
* **Deployment**: GitHub Pages via automated GitHub Actions CI/CD pipeline (`deploy.yml`).

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20 or newer
* **npm**: v10 or newer

### Installation

```bash
# Clone the repository
git clone https://github.com/MiguelGonzalezAlvarez/Web-Executive-Metrics-Cockpit.git

# Navigate to project folder
cd Web-Executive-Metrics-Cockpit

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be accessible at `http://localhost:5173/Web-Executive-Metrics-Cockpit/`.

### Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Compile production bundle to /dist
npm run test      # Execute Vitest test suite
npm run check     # Typecheck with svelte-check and tsc
npm run preview   # Preview production build locally
```

---

## 🧪 Automated Testing

The project maintains a 100% passing test suite validating the financial math engine, currency conversions, FinOps optimizations, and valuation multiples:

```bash
npm test
```

---

## 🌐 Live Deployment

This project is deployed to GitHub Pages and available online at:
👉 **[https://miguelgonzalezalvarez.github.io/Web-Executive-Metrics-Cockpit/](https://miguelgonzalezalvarez.github.io/Web-Executive-Metrics-Cockpit/)**

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

Developed by **[Miguel González Álvarez](https://github.com/MiguelGonzalezAlvarez)**.

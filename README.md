# Product Signal — AI Customer Intelligence & Strategy Workspace

<div align="center">

![Product Signal Banner](https://img.shields.io/badge/Product_Signal-AI_Decision_Workspace-3B82F6?style=for-the-badge&logo=react&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-product--signal--lake.vercel.app-emerald?style=for-the-badge&logo=vercel)](https://product-signal-lake.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

### ⚡ [Try the Live Web App on Vercel](https://product-signal-lake.vercel.app) ⚡

</div>

---

## 💡 What is Product Signal?

Product Managers spend 15+ hours every week reading support tickets, app reviews, and customer surveys. It is messy, confusing, and easy to miss critical problems.

**Product Signal** is an AI-powered decision workspace that turns chaotic customer feedback into clear, prioritized product decisions in seconds:

1. **Import Feedback**: Upload CSV files or paste customer reviews.
2. **AI Synthesis**: AI groups related complaints into clear problem themes.
3. **Inspect Evidence**: Every AI theme links directly to exact raw customer quotes so you know the AI isn't hallucinating.
4. **Take Action**: Convert validated problems into product roadmap decisions (*Prioritize / Investigate / Reject*).

---

## 🛡️ How It Works: Hybrid AI + Code Engine

To guarantee accuracy and trust, Product Signal combines **AI Intelligence** with **Strict Code Validation**:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ 1. AI RESPONSIBILITY (Semantic Understanding)                                     │
│ • Understands feedback even when users use different wording                     │
│ • Groups similar complaints into problem themes                                  │
│ • Writes clear 1-sentence problem statements & identifies affected user segments   │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 2. CODE RESPONSIBILITY (Accuracy & Validation)                                    │
│ • Validates IDs: Removes any quote ID not found in original user input            │
│ • Exact Mentions: Calculates problem count in code (no AI arithmetic errors)      │
│ • Zero Hallucination: Guarantees every theme links to real customer quotes       │
│ • Multi-Provider Failover: Uses Groq LLMs (sub-second) + OpenRouter fallback       │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- 📊 **Overview Dashboard**: Instant metrics on feedback volume, emerging signals, and top problems.
- 📥 **CSV & Data Import**: Ingest customer reviews or test data with 1-click synthesis.
- 🔍 **Traceable Evidence Panel**: Click any problem theme to see verbatim customer quotes supporting it.
- 🛠️ **Human Control (Split Theme)**: Easily override or re-cluster feedback if AI misgroups items.
- 🎯 **Opportunity Backlog Board**: Convert problem insights into product roadmap decisions (*Prioritize / Investigate / Reject*).

---

## 🚀 Quick Start Guide

### Option 1: 1-Click Launch (Windows)
Double-click **[`run.bat`](file:///f:/Antigravity/product-signal/run.bat)** in the project root folder!  
It automatically installs dependencies, starts servers, and opens `http://localhost:5173` in your browser.

### Option 2: Manual Command Line Setup
1. **Clone Repo**:
   ```bash
   git clone https://github.com/originsatyam/product-signal.git
   cd product-signal
   ```
2. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your web browser.

---

## 📂 Included Demo Dataset

We include a pre-formatted test dataset [`Josys_app_reviews - Josys_app_reviews.csv.csv`](file:///f:/Antigravity/product-signal/Josys_app_reviews%20-%20Josys_app_reviews.csv.csv) containing 25 realistic B2B customer reviews across 4 distinct problem categories:
- Onboarding & Role Assignment Friction
- PDF Report Export Formatting Bugs
- Dashboard Query Latency on Large Datasets
- Developer API & Webhook Integration Issues

---

## 👤 Author & Maintainer

**Satyam**  
- 🐙 GitHub: [@originsatyam](https://github.com/originsatyam)  
- 🌐 Live Deployment: [product-signal-lake.vercel.app](https://product-signal-lake.vercel.app)

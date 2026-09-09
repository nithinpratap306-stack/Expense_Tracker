# 🎓 CampusSpend — Student Expense Tracker

A modern, clean, student-focused personal finance web application tailored for college and university students. Built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## 👥 Team Responsibilities & Architecture

This project is co-developed by two team members with clear separation of concerns:

| Developer | Responsibilities | Routes |
|---|---|---|
| **Frontend Engineer 1 (Our Role)** | **Dashboard**, **Analytics**, **Budget**, Shared UI Components, Centralized Data Layer & Calculation Utilities | `/dashboard`, `/analytics`, `/budget` |
| **Frontend Engineer 2 (Teammate)** | **Add Expense**, **Transactions**, **Profile**, **Settings** | `/add-expense`, `/transactions`, `/profile`, `/settings` |

> ⚠️ *Teammate pages (`/transactions`, `/add-expense`, `/profile`, `/settings`) have reserved placeholder workspaces with navigation hooks, ensuring zero conflicts with teammate development.*

---

## ✨ Features Implemented

### 1. 📊 Financial Dashboard (`/dashboard`)
- **Student Header**: Personalized greeting (`Hey, Nithin 👋`), active month badge (`September 2026`), and financial health status.
- **4 Summary KPI Cards**:
  - **Money Left**: `₹3,240` (`40.5% remaining`), positive emerald visual treatment.
  - **Spent This Month**: `₹4,760` (`12.2% less than last month`).
  - **Monthly Budget**: `₹8,000` (`₹4,760 used`) with animated progress bar.
  - **Daily Average**: `₹158/day` based on September active days.
- **Spending Overview Chart**: Recharts `AreaChart` with smooth gradient fill and interactive **[Week] / [Month]** toggle.
- **Category Breakdown Donut**: Recharts `PieChart` donut with hover tooltips and an itemized category list with emojis and exact percentages.
- **Budget Progress**: Overall allowance tracking and per-category progress bars with warning states when exceeded.
- **Recent Spending Preview**: Latest 5 student transactions with icons, notes, and a `"View all transactions →"` link to the Transactions page.
- **Deterministic Spending Insight**: Smart frontend rule-based cards analyzing canteen spending, budget pace, and savings potential.

### 2. 📈 Analytics Page (`/analytics`)
- **Date Range Selector**: Instant filtering for **This Week**, **This Month**, **Last Month**, and **This Year**.
- **Analytics KPIs**: Total Spending, Daily Average, Top Category (🍔 Food), and Largest Single Expense.
- **Spending Trend**: Switchable **Daily** vs **Weekly** bar chart with custom student tooltips.
- **Category Analysis**: Ranked spending breakdown with transaction counts and proportional progress bars.
- **Month-over-Month Comparison**: Side-by-side September (`₹4,760`) vs August (`₹5,420`) comparison showing `-12.2%` decrease.
- **Highest Spending Days**: Peak expenditure ranking (`Sep 4 ₹780`, `Sep 11 ₹650`, `Sep 18 ₹520`).
- **Category Trend Over Time**: Multi-line chart comparing weekly trajectory for top categories.

### 3. 🎯 Budget Management (`/budget`)
- **Hero Overall Budget Card**: Large circular SVG progress ring displaying percentage spent, remaining allowance, and total allocation.
- **Contextual Budget Status**: Dynamic warning banner (`Good <70%`, `Warning 70-90%`, `Danger 90-100%`, `Exceeded >100%`).
- **Category Budgets Grid**: Dedicated cards for each student category (Food, Transport, Education, Entertainment, Shopping, Subscriptions, Accommodation, Other) displaying spent vs. cap and over-budget warnings.
- **Interactive Budget Edit Modal**: Form to adjust monthly and category budgets with instant `localStorage` persistence.
- **Data-Driven Recommendations**: Deterministic savings advice (e.g. food canteen reductions, transport comfort).

---

## 🛠️ Tech Stack & Tokens

- **Framework**: React 18 + Vite 6 (JavaScript/JSX)
- **Styling**: Tailwind CSS
- **Visualizations**: Recharts
- **Icons**: Lucide React
- **Design Tokens**:
  - Primary Accent: `#6366F1` (Indigo-500)
  - Neutral Background: `#F8FAFC`
  - Card Background: `#FFFFFF`
  - Text Primary: `#0F172A`
  - Border Radius: `12px - 16px` (`rounded-xl` / `rounded-2xl`)
  - Currency: Indian Rupee (`₹`) with Indian numbering formatting (`en-IN`)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Production build
npm run build
```
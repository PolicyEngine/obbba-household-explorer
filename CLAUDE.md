# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a **tax policy analysis project** that studies the effects of the "One Big Beautiful Bill Act" (OBBBA) on U.S. households. The project consists of two main components:

1. **Analysis engine** (`tax_impacts/`): Python scripts that use PolicyEngine-US to calculate household-level tax impacts
2. **Interactive dashboard** (`frontend/`): React + Mantine + Recharts web application for exploring the analysis results

## Architecture

### Frontend (React)

- **Framework**: Vite + React + TypeScript
- **UI library**: Mantine v8 (AppShell with sidebar for filters, Cards for results)
- **Charts**: Recharts (BarChart for waterfall, SegmentedControl for analysis type)
- **Data loading**: Papa Parse for CSV parsing (files in `frontend/public/data/`)
- **Testing**: Vitest + React Testing Library

### Data flow

1. Analysis scripts generate CSV files in the project root (also copied to `frontend/public/data/`)
2. React app loads CSVs via fetch + Papa Parse
3. Users can filter households by demographics, income, geography, and view detailed breakdowns
4. Four CSV variants: House/Senate x Current Law/Current Policy baselines

### Analysis engine

- **`tax_impacts/main.py`**: Entry point for running tax impact analysis
- **`tax_impacts/analysis.py`**: Core microsimulation analysis using PolicyEngine-US
- **`tax_impacts/reforms.py`**: Defines the specific tax reforms being analyzed

## Common development commands

### Frontend

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build (tsc + vite build)
npm test             # Run vitest
npm run test:watch   # Run vitest in watch mode
```

### Analysis

```bash
python tax_impacts/main.py   # Generate household impact data (takes significant time)
```

### Deployment

Deployed via Vercel. Config in `vercel.json` at repo root with `outputDirectory: frontend/dist`.

## Key file locations

- `frontend/src/App.tsx` - Main application component with state management
- `frontend/src/types/index.ts` - All TypeScript types, constants, and config
- `frontend/src/utils/analysis.ts` - Analysis logic (reform impacts, filtering, formatting)
- `frontend/src/hooks/useData.ts` - CSV data loading hook
- `frontend/src/components/` - All UI components:
  - `FilterSidebar.tsx` - Filter controls (weight, income, state, marital, dependents, age)
  - `HouseholdSelector.tsx` - Random/By ID/Interesting case selection
  - `WaterfallChart.tsx` - Recharts waterfall showing reform impacts
  - `BreakdownTable.tsx` - Financial impact summary table
  - `AnalysisTypeSelector.tsx` - Net Income/Federal Taxes/State Taxes/Benefits toggle
  - `ConfigSelector.tsx` - Baseline and reform type selection
  - `HouseholdAttributes.tsx` - Household demographic details
- `frontend/src/designTokens.ts` - Colors and fonts
- `frontend/src/__tests__/` - Test files

## Design tokens

- Primary teal: `#319795`
- Font: Inter
- See `frontend/src/designTokens.ts` for full palette

# AI Project Instructions: Aura Bank Dashboard

Welcome, AI Assistant! This document provides all the context, rules, and architecture guidelines you need to successfully contribute to this project. Please read it carefully before generating or modifying any code.

## 1. Project Overview
This project is a modern, responsive, client-side web application for a simple fictional bank ("Aura Bank"). It features a dashboard displaying user balances, a form to simulate money transfers, a recent transaction list with filtering, and a toggle for Light/Dark mode. 

## 2. Technology Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript & React
- **Styling**: Vanilla CSS with **CSS Modules** (NO Tailwind CSS)
- **Linting**: ESLint + standard Next.js rules

## 3. Architecture & File Structure
The project has been heavily refactored for strict modularity:
- `/app`
  - `page.tsx`: The main controller/orchestrator. Manages state (`balance`, `transactions`) and passes props down to components.
  - `globals.css`: Contains CSS reset, global typography, CSS variables for Light/Dark themes, and animated background fluid orbs.
- `/components`
  - Each component lives in its own dedicated folder (e.g., `/components/TransferForm/`).
  - The folder must contain the `.tsx` file (React component) and its corresponding `.module.css` file (scoped styles).
- `/types`
  - `index.ts`: Central location for shared TypeScript definitions (e.g., `Transaction`, `TxStatus`).

## 4. Styling & Design System (Liquid Glass)
This project uses a premium, highly-aesthetic "Liquid Glass" design system. 
**Crucial CSS Rules:**
- **No Inline Styles**: Never use `style={{ ... }}` in JSX. All styling MUST be done via CSS Modules (`import styles from './Component.module.css'`).
- **Cross-Browser Compatibility**: Always apply vendor prefixes (`-webkit-`, `-moz-`, `-ms-`) to modern CSS features like `backdrop-filter`, `transform`, `transition`, `background-clip`, and `box-shadow`.
- **CSS Variables & Theming**: All colors must reference CSS variables defined in `:root` (dark mode default) or `[data-theme="light"]` (light mode). Do not hardcode `#hex` or `rgba()` inside components unless absolutely necessary (e.g., an independent animation).
- **Glassmorphism**: Achieved using translucent background colors combined with `backdrop-filter: blur(...)` and subtle `box-shadow` insets.
- **Font**: "Outfit" (Google Font), imported in `globals.css`.

## 5. Development Rules & Best Practices
- **Strict TypeScript**: Avoid `any`. Always define explicit `interface Props { ... }` for components.
- **Client Components**: Because the app relies on hooks (`useState`, `useEffect`), components often require the `"use client";` directive at the top.
- **React Imports**: Use `import { useState, ReactElement } from "react";` instead of relying on `React.useState` to maintain clean imports and avoid linter errors.
- **State Management**: State is currently kept simple and lifted to `app/page.tsx`.
- **Verification**: If you refactor or add new logic, guarantee quality by ensuring it passes `npm run lint && npx tsc --noEmit`.

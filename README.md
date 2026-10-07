# Bara'em Qassim (براعم القصيم) — Kindergarten Educational Platform & AI Pedagogical Engine

[![GitHub Repository](https://img.shields.io/badge/GitHub-20021310%2FKindergarten-blue?logo=github)](https://github.com/20021310/Kindergarten)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Touch%20%7C%20Tablets-indigo)](#)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Cloud%20SQL-teal?logo=postgresql)](#)
[![AI Engine](https://img.shields.io/badge/AI-Natural%20Voice%20%26%20Pedagogical%20Synthesis-purple)](#)
[![Security](https://img.shields.io/badge/Security-Zero--Leakage%20Secrets-emerald)](#)

---

## 1. Central Project Guidance & Governing Directive

This document serves as the **master architectural specification, security standard, and development constitution** for **Bara'em Qassim (براعم القصيم)**.

Whenever continuing development on this repository:
1. **GitHub Repository Continuity**: All changes must branch from and synchronize with the authoritative repository: [`https://github.com/20021310/Kindergarten`](https://github.com/20021310/Kindergarten).
2. **Relational SQL Integrity**: Database operations and entity extensions must align with the structured PostgreSQL schema in [`src/db/schema.sql`](src/db/schema.sql).
3. **Strict Secrets Confidentiality**: API tokens, database connection strings, GitHub credentials, voice credentials, and environment keys must **never** be hardcoded or committed into Git. All secrets live exclusively in `.env` (ignored by `.gitignore`) or cloud secret managers.
4. **Natural Human-Like Educational Voice**: All spoken explanations must prioritize authentic human inflection, warmth, pauses, and clear pronunciation tailored for early childhood education (ages 4–6), strictly avoiding mechanical or robotic cadences.
5. **YouTube-to-Educational-Explanation-to-Video Engine**: Legitimate YouTube educational links provide source facts, from which the AI extracts focused concepts, generates pedagogical scripts with natural voice, and pairs them with visual slides, subtitles, and comprehension checkpoints while maintaining strict attribution between verified source facts and AI instructional scaffolding.

---

## 2. Platform Architecture Overview

```
                        ┌─────────────────────────────────────────────────────────┐
                        │             Client Presentation Layer (React 19)        │
                        │  Tajawal / Plus Jakarta Sans • RTL First • Touch-Ready  │
                        └───────┬───────────────────┬───────────────────┬─────────┘
                                │                   │                   │
                ┌───────────────▼────────┐ ┌────────▼──────────┐ ┌──────▼──────────────┐
                │       Child Mode       │ │ Parent Dashboard  │ │   Teacher Portal    │
                │  Math, Letters, Brain, │ │ KPIs, Screen Time │ │ Classes, Roster,    │
                │  Videos, Rewards Shop  │ │ PIN Gate, Reports │ │ CMS & AI Studio     │
                └───────────────┬────────┘ └────────┬──────────┘ └──────┬──────────────┘
                                │                   │                   │
                                └───────────────────┼───────────────────┘
                                                    │
                                ┌───────────────────▼─────────────────────┐
                                │       Service & Processing Layer        │
                                ├─────────────────────────────────────────┤
                                │ • aiVoice: Natural Pedagogical Prosody  │
                                │ • youtubeAiTransformer: Source Parsing  │
                                │ • sound: Web Audio API Low-Latency SFX  │
                                │ • store: Local Reactive State Adapter   │
                                └───────────────────┬─────────────────────┘
                                                    │
                                ┌───────────────────▼─────────────────────┐
                                │     Structured Data Layer (SQL / RDBMS) │
                                │  PostgreSQL / Cloud SQL (`schema.sql`)  │
                                └─────────────────────────────────────────┘
```

---

## 3. GitHub & Repository Engineering Discipline

- **Primary Repository**: `https://github.com/20021310/Kindergarten`
- **Default Branch**: `main`
- **Rules of Engagement**:
  - Always verify existing files and components before creating new abstractions.
  - Extend the established domain modules (`src/components/child`, `src/components/parent`, `src/components/teacher`, `src/components/ai`) rather than introducing competing architectures.
  - Validate with `npm run lint` (`tsc --noEmit`) and `npm run build` prior to any commit or push.
  - Ensure Git commits represent atomic, coherent progress with descriptive commit messages.

---

## 4. Security & Zero-Leakage Secret Management

This project strictly enforces **zero leakage** of sensitive credentials:

### Confidential Values Handled
- **GitHub Personal Access Tokens** (Push / CI/CD)
- **Database Connection Strings** (`DATABASE_URL`, usernames, passwords)
- **AI Service Keys** (`GEMINI_API_KEY`)
- **YouTube Data API Keys** (`YOUTUBE_DATA_API_KEY`)
- **Parental Security PINs** (Stored as hashes in production)

### Configuration Protocol
All secrets are provided via environment variables. An example template is maintained in [`.env.example`](.env.example):

```bash
# Example .env configuration (NEVER COMMIT ACTUAL SECRETS)
GEMINI_API_KEY="your-gemini-key"
DATABASE_URL="postgresql://user:password@host:5432/kindergarten_db"
YOUTUBE_DATA_API_KEY="your-youtube-key"
AI_VOICE_PROVIDER="browser_natural"
APP_URL="https://your-deployment-url.app"
```

### Git Exclusion Verification
The root [`.gitignore`](.gitignore) file explicitly ignores:
```gitignore
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
*.pem
*.key
*.cert
.secrets*
```

> **Security Mandate**: Never display, copy, or print private tokens in documentation, chat responses, or commit histories. If an environment token is ever detected in client code, rotate it immediately.

---

## 5. Structured SQL Database Architecture

The application uses a normalized relational database design optimized for PostgreSQL and Google Cloud SQL. The authoritative schema is documented in [`src/db/schema.sql`](src/db/schema.sql):

### Core Tables
1. **`users`**: Account identity for parents, teachers, and school administrators.
2. **`classes`**: Kindergarten classes belonging to the Qassim Education Directorate (e.g., `فصل الأبطال - روضة النخيل`).
3. **`children`**: Child profiles with age, gender, stars balance, current streak, and screen-time bounds.
4. **`activities`**: Standard curriculum exercises (levels 1–4 across Mathematics, Arabic Phonics, Brain Gym, and Attention).
5. **`activity_attempts`**: Granular completion records tracking score, accuracy, completion seconds, and earned stars.
6. **`youtube_source_lessons`**: AI-transformed educational lessons derived from YouTube sources with attribution records.
7. **`badges` & `child_badges`**: Gamification achievements (Top Achiever, Math Whiz, Reading Star).
8. **`screen_time_logs`**: Daily tracking ensuring healthy digital exposure according to parental limits.

---

## 6. High-Fidelity Natural Human-Like Voice Standard

The AI voice subsystem in [`src/services/aiVoice.ts`](src/services/aiVoice.ts) is engineered to deliver a realistic human voice that young children love listening to:

### Pedagogical Prosody Principles
- **Natural Pacing**: Delivery rate calibrated to `0.82x – 0.95x` to allow young ears to process phonetic sounds without cognitive fatigue.
- **Breath & Punctuation Pauses**: Sentences and clauses separated with intentional breath spaces (`. ! ؟ ،`), mimicking a patient classroom teacher.
- **Emotional Warmth & Intonation**:
  - `kindergarten_warmth`: Friendly, encouraging, smiling cadence for daily exercises.
  - `enthusiastic_explorer`: Lively, upbeat inflection for science and counting discovery.
  - `calm_storyteller`: Soothing, rhythmic cadence for bedtime or quiet listening stories.
- **Authentic Arabic Phonetics**: Accurate pronunciation of Modern Standard Arabic letters (e.g., الضاد، الثاء، القاف، الخاء).
- **Anti-Robotic Guarantee**: No pitch distortion, metallic reverberation, or monotonous flat frequency outputs.

---

## 7. YouTube-to-Educational-Explanation-to-Video Workflow

The platform provides a dedicated studio in [`src/components/ai/YouTubeConceptStudio.tsx`](src/components/ai/YouTubeConceptStudio.tsx) that turns YouTube educational sources into tailored kindergarten lessons:

```
[ User Inputs YouTube URL + Specific Educational Concept ]
                           │
                           ▼
[ Stage 1: Legitimate Source Extraction ]
• Identifies title, channel, description, chapters, timestamps, and caption signals.
• Filters content strictly to the requested educational subject.
                           │
                           ▼
[ Stage 2: Fact Extraction vs. AI Scaffolding ]
• Isolates verified direct statements from the source.
• Formulates kindergarten-friendly pedagogical explanations (Levels 1–4).
• Flags and eliminates unsupported claims or speculative hallucinations.
                           │
                           ▼
[ Stage 3: Natural Human Voice Narration ]
• Generates multi-slide pedagogical scripts.
• Synthesizes spoken explanation with chosen persona (Teacher, Explorer, Storyteller).
                           │
                           ▼
[ Stage 4: Visual Slides, Subtitles & Checkpoint Assessment ]
• Synchronizes subtitles and teleprompter display.
• Generates a comprehension checkpoint question to measure understanding.
                           │
                           ▼
[ Stage 5: Curriculum Integration ]
• One-click export to SQL database and student activity catalog.
```

---

## 8. Directory & File Organization

```
├── .env.example                       # Canonical environment variable specifications
├── .gitignore                         # Hardened Git ignore rules protecting credentials
├── PROJECT_STATE.md                   # Cumulative Engineering Ledger & Tech Brief
├── README.md                          # This master guidance document
├── index.html                         # HTML entry with Arabic & Latin web fonts
├── metadata.json                      # AI Studio application metadata
├── package.json                       # Dependencies and build scripts
├── tsconfig.json                      # TypeScript strict configuration
├── vite.config.ts                     # Vite build and dev server config
└── src/
    ├── App.tsx                        # Root orchestrator & role routing
    ├── index.css                      # Base styling, Tailwind CSS v4, Arabic typography
    ├── main.tsx                       # React application bootstrap
    ├── assets/
    │   └── images/                    # Approved high-res character & educational assets
    ├── components/
    │   ├── ai/
    │   │   └── YouTubeConceptStudio.tsx # YouTube-to-Voice AI lesson studio
    │   ├── child/
    │   │   ├── ArabicAlphabetGame.tsx # Interactive Arabic letters & phonics
    │   │   ├── BrainGymGame.tsx       # Memory matching & pattern sequencing
    │   │   ├── ChildHome.tsx          # Child dashboard (Learnly design system)
    │   │   ├── MathGame.tsx           # Visual fruit counting & addition
    │   │   ├── RewardsView.tsx        # Trophies, badges, and school gear shop
    │   │   └── VideoLibrary.tsx       # Child-safe video cinema with quizzes
    │   ├── common/
    │   │   ├── AudioSpeakerButton.tsx # Tactile voice instruction button
    │   │   ├── ConfettiCanvas.tsx     # Native canvas celebratory physics
    │   │   └── Header.tsx             # 3-Zone top navigation with parental gate PIN
    │   ├── landing/
    │   │   └── LandingHome.tsx        # Commercial landing page & FAQ
    │   ├── parent/
    │   │   └── ParentDashboard.tsx    # KPIs, progress bars, screen-time controls
    │   └── teacher/
    │       └── TeacherDashboard.tsx   # Classes, roster, assignments, content CMS
    ├── db/
    │   └── schema.sql                 # Production PostgreSQL schema definition
    ├── services/
    │   ├── aiVoice.ts                 # Natural human-like voice synthesis engine
    │   ├── sound.ts                   # Web Audio API audio synthesis
    │   ├── store.ts                   # Persistent state store with Qassim seed data
    │   └── youtubeAiTransformer.ts    # YouTube educational concept transformer
    └── types/
        └── index.ts                   # Domain TypeScript interfaces
```

---

## 9. Development & Verification Guide

### Installing Dependencies
```bash
npm install
```

### Running Local Development Server
```bash
npm run dev
# Starts server on http://localhost:3000
```

### Type Checking & Linting
```bash
npm run lint
# Executes tsc --noEmit
```

### Production Build
```bash
npm run build
# Compiles optimized production bundle into /dist
```

### Synchronizing with GitHub
```bash
git add .
git commit -m "feat: enhance AI YouTube lesson studio and SQL integration"
git push origin main
```

---

## 10. Living Contract for Future Sessions

When returning to this codebase:
1. **Always read this README and [`PROJECT_STATE.md`](PROJECT_STATE.md) first** to preserve architectural continuity.
2. **Never overwrite or delete working components** without a verified technical limitation.
3. **Keep secrets private**: Continue using `.env` for credentials, never hardcoding keys.
4. **Uphold the Arabic-First pedagogical mission** honoring the educational standards of the Kingdom of Saudi Arabia and the Qassim region.

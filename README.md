# Academic Portfolio (8th Semester) - 2026 Paradigm Edition

![Version](https://img.shields.io/badge/version-2026.1.0-blue.svg)
![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
[![CI](https://github.com/chirag127/Academic-Portfolio-8th-Semester-Retired-Archive/actions/workflows/ci.yml/badge.svg)](https://github.com/chirag127/Academic-Portfolio-8th-Semester-Retired-Archive/actions/workflows/ci.yml)

A modernized, frontend-only evolution of a final-semester academic portfolio, re-architected to meet 2026 AI-native standards. This project serves as a demonstration of a high-velocity, self-healing, and self-documenting system built on a serverless, browser-first philosophy.

## Mission & Principles

- **Frontend-Only Architecture:** Eliminate all backend dependencies. The application runs entirely within the browser, leveraging client-side processing and direct REST API calls to external services.
- **AI-Native Integration:** Implement a resilient, multi-provider AI orchestration layer with a fallback chain and exponential backoff, ensuring high availability and performance.
- **User-Centric Key Management:** Empower users to provide their own API keys at runtime via the UI, which are securely stored in `localStorage`.
- **Modern, Future-Proof Tech Stack:** Utilize a bleeding-edge technology stack aligned with late-2025/early-2026 standards, including Vite 7, TypeScript 6, Tailwind v4, and Biome.
- **Spatial-Adaptive UI:** Deliver a modern user experience with a "Spatial Glass" aesthetic and Bento Grid layout, ensuring a clean, intuitive, and responsive interface.

## Technology Overview

- **Framework:** React 19 (with Signals for state management)
- **Build Tool:** Vite 7
- **Language:** TypeScript 6.x
- **Styling:** Tailwind CSS v4
- **Linting & Formatting:** Biome
- **CI/CD:** GitHub Actions

## Architecture

This application adheres to a strict frontend-only architecture. All logic is executed in the browser, and data is persisted in client-side storage (`localStorage`).

### AI Orchestration Layer

The core of this application is the `AiProviderService`, which manages a fallback chain of AI providers:

1.  **Cerebras** (Primary)
2.  **Google Gemini** (Backup)
3.  **Groq** (Resilience)
4.  **Mistral** (Resilience)
5.  **NVIDIA NIM** (Resilience)
6.  **Cloudflare Workers AI** (Resilience)

This service uses exponential backoff to handle API failures, ensuring a seamless user experience even when a primary provider is unavailable.

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Academic-Portfolio-8th-Semester-Retired-Archive.git
    cd Academic-Portfolio-8th-Semester-Retired-Archive
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to `http://localhost:5173` in your browser.

5.  **Configure API Keys:**
    - In the application's UI, open the API Keys section.
    - Enter your API keys for the desired AI providers. These will be stored securely in your browser's `localStorage`.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**. See the [LICENSE](LICENSE) file for details.

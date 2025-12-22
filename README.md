# Apex-Portfolio

![Build Status](https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/ci.yml?style=flat-square&logo=github)
![Code Coverage](https://img.shields.io/codecov/c/github/{owner}/{repo}?style=flat-square&logo=codecov)
![Language](https://img.shields.io/badge/language-TypeScript-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-orange?style=flat-square&logo=creativecommons)
![GitHub Stars](https://img.shields.io/github/stars/{owner}/{repo}?style=flat-square&logo=github)

---

**A modern, frontend-only portfolio application built with Vite, TypeScript, and Tailwind CSS.**

---

## Project Overview

This repository contains a cutting-edge portfolio application, designed to showcase projects in a clean, modern, and efficient manner. It is built entirely as a frontend application, ensuring it can be deployed on any static hosting platform.

## Architecture

This project follows a strict frontend-only architecture. All data is either static or fetched from external APIs directly from the client-side.

mermaid
graph TD
    A[User] --> B{Vite Frontend};
    B --> C[Static Assets];
    B --> D[External APIs];

## Tech Stack

*   **Vite 7**: Next-generation frontend tooling.
*   **TypeScript 6.x**: Statically typed JavaScript.
*   **Tailwind CSS v4**: A utility-first CSS framework.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/{owner}/{repo}.git
    cd {repo}
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0). See the [LICENSE](LICENSE) file for more details.

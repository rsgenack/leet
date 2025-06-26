# LeetCode Stats Dashboard

A modern, visually rich dashboard for tracking a casual LeetCode contest between friends. Built with Next.js, React, and Tailwind CSS, this project makes it easy to compare progress, view stats, and see solved questions in a beautiful, mobile-friendly interface.

## Purpose

This dashboard is designed for groups of friends who want to compete or collaborate on LeetCode. It provides a central place to:
- Track everyone's progress in real time
- See who is leading the contest
- Browse solved questions and compare solutions
- Motivate each other with clear, visual stats

## Main Screens & Features

- **Stats Page**
  - View your up-to-date LeetCode stats, including problems solved, ranking, and contest history
  - Stats are displayed using dynamic SVG cards with custom fonts for a fun, personalized look

- **Leaderboard**
  - See a ranked list of all participants in your contest
  - Compare total problems solved, contest scores, and more
  - Fully responsive: shows a table on desktop and card layout on mobile

- **Questions**
  - Browse all solved questions by all participants
  - Color-coded by difficulty (Easy, Medium, Hard) and status (Solved, Attempted, etc.)
  - Filter and search to quickly find specific problems

- **Unified Modern UI**
  - Gradient backgrounds, bold Bebas Neue font, and color-coded badges for readability
  - Navigation tabs for quick switching between screens
  - Mobile-first design: all features work great on phones and tablets

## Demo

[Live Site: leet.rgnack.com](https://leet.rgnack.com)

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/rsgenack/leet.git
   cd leet
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Run locally:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `/app` — Next.js app directory (pages, API routes, components)
- `/components` — Shared React UI components
- `/public` — Static assets (images, favicon, etc.)
- `/styles` — Global CSS (Tailwind)
- `/api` — Legacy API scripts
- `/submission-scripts` — Scripts for fetching and updating LeetCode data

## Credits & Attributions

This project would not be possible without the amazing work of the following open-source projects:

- [JacobLinCool/LeetCode-Stats-Card](https://github.com/JacobLinCool/LeetCode-Stats-Card)
  - Provides the dynamic SVG stats card service and much of the inspiration for the stats UI and API integration.
- [KnlnKS/leetcode-stats](https://github.com/KnlnKS/leetcode-stats)
  - Inspired the leaderboard and question stats display, and provided ideas for API structure and theming.

Please check out and support these original repositories!

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

**Note:** This dashboard is a personal project and not affiliated with LeetCode. All trademarks and data belong to their respective owners.

# 🏎️ GSAP Scroll Animation Hero

A premium, interactive landing page hero section built with **Next.js**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

This project features a meticulously crafted "track wipe" scroll animation where a sports car drives across the screen, revealing hidden text and staggering corner statistics as the user scrolls downwards. 

## ✨ Features
- **Dynamic Track Wipe:** A sleek green mask layer that perfectly tracks the car's horizontal movement on scroll.
- **Scroll-Linked Animations:** The 4 statistics cards (Projects, Client Satisfaction, Brands, Team) dynamically stagger, fade in, and slide up depending on the user's exact scroll position.
- **Viewport-Responsive Typography:** The massive background text mathematically scales (`vw`) down to perfectly frame inside the window without overflowing or causing horizontal scrolling on smaller devices.
- **Intern-Friendly Codebase:** The entire `HeroSection.js` core component relies on highly verbose, beginner-friendly variable names and extensive line-by-line comments explaining the GSAP logic. No "magic numbers" without explanation!

## 🛠️ Tech Stack
- **Framework:** React / Next.js (App Router)
- **Styling:** Tailwind CSS (Vanilla utilities)
- **Animation Engine:** GSAP (GreenSock Animation Platform) + ScrollTrigger Plugin

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/tannuup123/Animation_Landing_page.git
cd Animation_Landing_page
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Scroll down to see the magic happen!

## 📂 Project Structure
- `src/components/HeroSection.js`: The core of the application. This file houses the layout, the CSS masking tricks, and all the GSAP `ScrollTrigger` timelines heavily commented for beginners.
- `public/car.png`: The sports car asset used in the animation sequence.

---
*Built with ❤️ focusing on premium motion design and highly-readable code.*

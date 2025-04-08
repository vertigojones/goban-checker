# Goban Capture Checker

This project is a React + TypeScript implementation of a Go (Baduk) stone capture visualiser and validator.

👉 **Repo:** [github.com/vertigojones/goban-checker](https://github.com/vertigojones/goban-checker)

## 📚 Background

The original version of this logic was written in **Python**, with tests verifying capture mechanics on small Go boards. Rather than building on top of that, I decided to convert the core logic into a **fully interactive React application**, written entirely in **TypeScript**.

This shift allowed me to:
- ✅ Build a visual, testable representation of the game board
- ✅ Apply a TDD approach using **Cucumber** and **React Testing Library**
- ✅ Explore dynamic board interactions using `useState` and props

## 🔧 Tech Stack

- **React** with **TypeScript**
- **styled-components** for component-based styling
- **jest-cucumber** for BDD-style tests
- **@testing-library/react** for DOM-based assertions

## 🛑 Why not Next.js?

Although I’ve used Next.js in other projects, I chose **not** to use it here for a few key reasons:

- The project doesn’t require routing, server-side rendering, or API endpoints
- Keeping things lightweight makes it easier to run, test, and share
- This is a pure frontend tool focused on interactivity and logic, not content delivery

That said, this could easily be converted to a Next.js app in the future if needed.

## 🎯 Features

- Switch between multiple predefined board setups
- Click any stone to check if it's captured
- See visual feedback on stone selection
- Cucumber tests validate each capture scenario

## 📁 Structure

- `components/GobanBoard.tsx` – main interactive board logic
- `utils/isTaken.ts` – logic for determining if a group is captured
- `mocks/boards.ts` – reusable mock board setups
- `tests/` – cucumber test bindings
- `features/` – cucumber-style `.feature` file

## 🚀 Running the Project

```bash
npm install
npm start
```

## 🧪 Running Tests

```bash
npm test
```

---

Want to contribute or fork it? Be my guest!

---

_Owen Liversidge – 2025_

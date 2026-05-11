# To-Do List App

**Live site:** https://jesskg.github.io/To-do-App/

---

## What this is

A fully functional to-do list app built during the **first two months of my internship at Flume Digital Marketing Agency** in 2025.

The project was built to test and strengthen my understanding of TypeScript - taking a JavaScript concept I already knew and rebuilding it with proper types, interfaces, and type-safe DOM manipulation.

You can add tasks, check them off, edit them by clicking, delete individual tasks, or clear everything at once. All tasks persist in `localStorage` between sessions.

---

## Features

- Add tasks by typing and pressing Enter or clicking Add
- Check off tasks (strikethrough + green tick)
- Click any task to edit it inline
- Delete individual tasks
- Delete all tasks at once
- Task count displayed at the bottom
- Data persists in `localStorage`

---

## The TypeScript angle

This project exists specifically because of TypeScript. By the time I built it, I already knew how to make a to-do app in JavaScript - I had done it before. The point here was to rebuild it properly:

- Defined a `TodoItem` interface with `text` and `disabled` properties
- Used explicit types on all DOM queries (`HTMLInputElement | null`, `HTMLElement | null`)
- Typed all function parameters and return types (`: void`, `: number`, `: string`)
- Used the nullish coalescing operator (`??`) and optional chaining (`?.`) instead of unsafe assumptions

The `src/` folder contains both `script.ts` (the TypeScript source) and `script.js` (an earlier plain JavaScript draft). Comparing the two shows exactly what TypeScript adds - and why it matters when you're working on a team or a larger codebase.

---

## Project structure

```
├── index.html          # App UI with inline CSS
├── src/
│   ├── script.ts       # TypeScript source
│   └── script.js       # Earlier JS draft
├── dist/
│   └── script.js       # Compiled output (what the browser runs)
├── tsconfig.json
└── package.json
```

---

## Built with

- HTML / CSS
- TypeScript
- localStorage (browser storage)

---

## Context

This was built in the first two months of my internship at **Flume Digital Marketing Agency** as part of an upskilling programme. Flume gave me the space to learn TypeScript properly - not just reading docs, but building something real with it.

It sits alongside a Weather App and a Subscription Login System (Node.js + Express + MySQL) as part of the same upskilling push during that internship.

---

*Jesse Gitau · [GitHub](https://github.com/Jesskg) · [Portfolio](https://jkgsolutions.co.za)*

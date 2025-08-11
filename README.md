
#  Blog App

A simple and aesthetic blog application built using **React**, **Vite**, **Tailwind CSS**, and **ShadCN UI**. Users can create, view, and scroll through blogs with a modern UI and infinite scrolling support.

---

## Features

- 🖼️ Aesthetic UI using Tailwind and ShadCN (brown & purple tones)
- ➕ Create new blog posts (title, content, optional image)
- 🧾 Read blog details in a clean, minimal layout
- ☁️ Blogs stored locally using `localStorage`
- 📱 Responsive design for mobile & desktop

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧩 Install Tailwind CSS

If not already installed:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Edit `tailwind.config.js` (if used) or define styles in `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🎨 Install ShadCN UI

```bash
npx shadcn-ui@latest init
```

Then install a component when needed:

```bash
npx shadcn-ui@latest add card
```

You can customize components in the `/components/ui/` folder.

---

## 📁 Project Structure

```bash
📁 src/
│
├── components/          # UI components (BlogCard, BlogModal, etc.)
├── data/                # Default blog data
├── pages/               # Home.jsx, BlogDetail.jsx
├── utils/               # Local storage helpers
├── App.jsx              # Main app wrapper
├── main.jsx             # Entry point
```

---
## React Profiler Report

Here is a screenshot of the React Profiler showing the flamegraph:

![Profiler Screenshot](https://github.com/Sowmiyaagv/Blog-app/blob/main/Screenshot%20(18).png)



## 📄 License

MIT — free to use and modify.

---

## 👤 Author

Made with ❤️ by [Sowmiyaa G V(]https://github.com/Sowmiyaagv)

```

---


```

# Library Management System

A modern web application for managing books and users in a library system. Built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (sign up/sign in)
- Book management (add, edit, delete, search)
- Dashboard with statistics
- Responsive design
- Real-time book filtering

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sahan-chinthaka/library-management-web.git
cd library-management-web
```

2. Install dependencies:

```bash
npm install
```

3. Update the `.env` file in the root directory with API's URL:

```env
VITE_PUBLIC_API_URL=http://localhost:5127
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [shadcn](https://ui.shadcn.com/)

## Project Structure

```
src/
  ├── assets/      # Static assets
  ├── components/  # React components
  │   ├── ui/     # UI components
  │   └── ...
  ├── hooks/      # Custom React hooks
  ├── lib/        # Utilities, types, schemas
  ├── pages/      # Page components
  └── main.tsx    # Application entry point
```


© 2025 Library Management. All rights reserved.

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { AuthContextProvider } from "./hooks/auth-context.tsx";
import "./index.css";
import SingleBookViewPage from "./pages/books/[id]/index.tsx";
import BooksPage from "./pages/books/index.tsx";
import HomePage from "./pages/index.tsx";
import SignInPage from "./pages/sign-in/index.tsx";
import SignUpPage from "./pages/sign-up/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/:id",
        element: <SingleBookViewPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);

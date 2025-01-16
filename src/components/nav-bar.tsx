import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-context";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [auth, authAction] = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        show &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [show]);

  return (
    <header className="flex h-[76px] items-center border-b bg-white p-5">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              to="/"
              className={cn(
                "font-semibold text-gray-400 hover:text-primary/50",
                location.pathname == "/" && "text-primary hover:text-primary",
              )}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className={cn(
                "font-semibold text-gray-400 hover:text-primary/50",
                location.pathname.startsWith("/books") &&
                  "text-primary hover:text-primary",
              )}
            >
              BOOKS
            </Link>
          </li>
        </ul>
      </nav>
      {auth === null && (
        <Link to="/sign-in" className="ml-auto">
          <Button>Sign in</Button>
        </Link>
      )}
      {auth && (
        <div ref={containerRef} className="relative ml-auto">
          <button
            onClick={() => setShow((a) => !a)}
            className="size-9 items-center justify-center rounded-full bg-primary text-center leading-9 text-white"
          >
            {auth.username[0].toUpperCase()}
          </button>
          {show && (
            <div className="absolute right-0 top-10 w-52 rounded border bg-white shadow">
              <div className="border-b bg-gray-100 p-4 text-left">
                {auth.username}
              </div>
              <Button
                onClick={() => {
                  setShow(false);
                  authAction.signOut();
                }}
                className="m-4"
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;

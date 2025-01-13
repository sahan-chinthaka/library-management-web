import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <header className="flex items-baseline border-b bg-white p-5">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              to="/"
              className={cn(
                "hover:text-primary/50 font-semibold text-gray-400",
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
                "hover:text-primary/50 font-semibold text-gray-400",
                location.pathname.startsWith("/books") &&
                  "text-primary hover:text-primary",
              )}
            >
              BOOKS
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/sign-in" className="ml-auto">
        <Button>Sign in</Button>
      </Link>
    </header>
  );
}

export default NavBar;

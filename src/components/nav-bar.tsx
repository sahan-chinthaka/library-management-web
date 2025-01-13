import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NavBar() {
  return (
    <header className="flex items-baseline border-b bg-white p-5">
      <nav>
        <ul className="flex gap-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/books">Books</NavLink>
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

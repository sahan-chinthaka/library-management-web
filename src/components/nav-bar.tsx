import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NavBar() {
  return (
    <header className="m-2 rounded bg-gray-200 p-5 flex items-baseline">
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
      <Button className="ml-auto">Sign in</Button>
    </header>
  );
}

export default NavBar;

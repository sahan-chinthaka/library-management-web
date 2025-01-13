import { Outlet } from "react-router-dom";
import NavBar from "./components/nav-bar.js";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;

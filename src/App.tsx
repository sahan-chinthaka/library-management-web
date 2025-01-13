import { Outlet } from "react-router-dom";
import NavBar from "./components/nav-bar.js";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

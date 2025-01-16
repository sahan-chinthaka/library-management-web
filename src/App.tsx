import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "./components/nav-bar.js";
import { useAuth } from "./hooks/auth-context.js";

function App() {
  const [auth] = useAuth();

  useEffect(() => {
    if (auth) {
      toast("Welcome " + auth.username, {
        type: "info",
      });
    }
  }, [auth]);

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

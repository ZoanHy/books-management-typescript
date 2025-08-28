import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";

function App() {
  return (
    <>
      <AppHeader />
      <h1>Book Management App</h1>
      <Outlet />
    </>
  );
}

export default App;

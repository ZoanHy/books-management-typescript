import AppHeader from "@/components/layout/app.header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default App;

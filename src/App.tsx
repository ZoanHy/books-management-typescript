import { useCurrentApp } from "@/components/context/app.context";
import AppHeader from "@/components/layout/app.header";
import { fetchAccountAPI } from "@/services/api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";

function App() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default App;

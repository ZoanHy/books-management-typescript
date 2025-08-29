import { useCurrentApp } from "@/components/context/app.context";
import AppHeader from "@/components/layout/app.header";
import { fetchAccountAPI } from "@/services/api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const { setUser, isAppLoading, setIsAppLoading } = useCurrentApp();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      // console.log(">>> check res", res);

      if (res.data) {
        setUser(res.data.user);
      }

      setIsAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default App;

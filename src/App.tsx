import { useCurrentApp } from "@/components/context/app.context";
import AppHeader from "@/components/layout/app.header";
import { fetchAccountAPI } from "@/services/api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";

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
      {isAppLoading ? (
        <HashLoader
          color="#4096FF"
          size={50}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <>
          <AppHeader />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;

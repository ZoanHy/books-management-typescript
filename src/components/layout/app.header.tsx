import { useCurrentApp } from "@/components/context/app.context";

const AppHeader = () => {
  const { user } = useCurrentApp();
  return (
    <header>
      <h1>app header</h1>
      <p>{JSON.stringify(user)}</p>
    </header>
  );
};

export default AppHeader;

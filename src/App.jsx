import NavigationBar from "./componenets/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

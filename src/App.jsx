import NavigationBar from "./componenets/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

function App() {
  // const cartID = 1;

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

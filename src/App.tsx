import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <span> HEADER </span>
      <Outlet />
    </div>
  );
}

export default App;

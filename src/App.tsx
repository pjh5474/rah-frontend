import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

function App() {
  return useReactiveVar(isLoggedInVar) ? (
    <LoggedInRouter />
  ) : (
    <LoggedOutRouter />
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LoggedInRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Logged In</h1>
              <button
                onClick={() => {
                  localStorage.removeItem(LOCALSTORAGE_TOKEN);
                  isLoggedInVar(false);
                }}
              >
                Log out now!
              </button>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

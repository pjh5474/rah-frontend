import { BrowserRouter, Route, Routes } from "react-router-dom";

export const LoggedInRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Logged In</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

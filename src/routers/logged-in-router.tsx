import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Stores } from "../pages/client/stores";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { UserRole } from "../__api__/types";

const ClientRouter = [
  <Route path="/" element={<Stores />} key="client" />,
  <Route path="/confirm" element={<ConfirmEmail />} key="confirmEmail" />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide text-sky-500 ">
          Loading ...
        </span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {data.me.role === UserRole.Client && ClientRouter}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

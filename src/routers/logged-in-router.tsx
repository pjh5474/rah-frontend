import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogOutBtn } from "../components/button";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Search } from "../pages/client/search";
import { Store } from "../pages/client/store";
import { Stores } from "../pages/client/stores";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { UserRole } from "../__api__/types";

const ClientRouter = [
  <Route path="/" element={<Stores />} key="client" />,
  <Route path="/confirm" element={<ConfirmEmail />} key="confirmEmail" />,
  <Route path="/edit-profile" element={<EditProfile />} key="editProfile" />,
  <Route path="/search" element={<Search />} key="search" />,
  <Route path="/category/:slug" element={<Category />} key="category" />,
  <Route path="/stores/:id" element={<Store />} key="store" />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide text-sky-500 ">
          Loading ...
        </span>
        <LogOutBtn />
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

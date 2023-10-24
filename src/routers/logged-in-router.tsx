import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogOutBtn } from "../components/button";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Search } from "../pages/client/search";
import { Store } from "../pages/client/store";
import { Stores } from "../pages/client/stores";
import { MyStores } from "../pages/creator/my-store";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { UserRole } from "../__api__/types";

const clientRoutes = [
  { path: "/", element: <Stores /> },
  { path: "/search", element: <Search /> },
  { path: "/category/:slug", element: <Category /> },
  { path: "/stores/:id", element: <Store /> },
];

const commonRoutes = [
  { path: "/confirm", element: <ConfirmEmail /> },
  { path: "/edit-profile", element: <EditProfile /> },
];

const CreatorRoutes = [
  { path: "/", element: <MyStores /> },
  { path: "/add-restaurant", element: <h1>Add Restaurant</h1> },
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
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route) => <Route {...route} key={route.path} />)}
        {data.me.role === UserRole.Creator &&
          CreatorRoutes.map((route) => <Route {...route} key={route.path} />)}
        {commonRoutes.map((route) => (
          <Route {...route} key={route.path} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

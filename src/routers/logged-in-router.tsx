import { nanoid } from "nanoid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogOutBtn } from "../components/button";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Search } from "../pages/client/search";
import { Store } from "../pages/client/store";
import { Stores } from "../pages/client/stores";
import { CreateCommission } from "../pages/creator/create-commission";
import { CreatePost } from "../pages/creator/create-post";
import { CreateStore } from "../pages/creator/create-store";
import { MyStore } from "../pages/creator/my-store";
import { MyStores } from "../pages/creator/my-stores";
import { CommissionDetail } from "../pages/user/commission-detail";
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
  {
    path: "/stores/:storeId/commissions/:commissionId",
    element: <CommissionDetail />,
  },
];

const CreatorRoutes = [
  { path: "/", element: <MyStores /> },
  { path: "/create-store", element: <CreateStore /> },
  { path: "/stores/:id", element: <MyStore /> },
  { path: "/stores/:id/create-commission", element: <CreateCommission /> },
  {
    path: "/stores/:storeId/commissions/:commissionId/create-post",
    element: <CreatePost />,
  },
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
          clientRoutes.map((route) => <Route {...route} key={nanoid()} />)}
        {data.me.role === UserRole.Creator &&
          CreatorRoutes.map((route) => <Route {...route} key={nanoid()} />)}
        {commonRoutes.map((route) => (
          <Route {...route} key={nanoid()} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

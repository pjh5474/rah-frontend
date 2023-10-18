import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Stores } from "../pages/client/stores";
import { MeQuery, UserRole } from "../__api__/types";

const ClientRouter = [<Route path="/" element={<Stores />} key="client" />];

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide text-sky-500 ">
          Loading ...
        </span>
      </div>
    );
  } else {
    console.log(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        {data.me.role === UserRole.Client && ClientRouter}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { Pagination } from "../../components/pagination";
import { STORE_FRAGMENT } from "../../fragments";
import {
  SearchStoreQuery,
  SearchStoreQueryVariables,
} from "../../__api__/types";

const SEARCH_STORE = gql`
  query searchStore($input: SearchStoreInput!) {
    searchStore(input: $input) {
      ok
      error
      totalPages
      totalResults
      stores {
        ...StoreParts
      }
    }
  }
  ${STORE_FRAGMENT}
`;

export const Search = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchStoreQuery,
    SearchStoreQueryVariables
  >(SEARCH_STORE);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return navigate("/", { replace: true });
    }
    callQuery({
      variables: {
        input: {
          page,
          query,
        },
      },
    });
  }, [location]);

  return (
    <div className="container mt-8 pb-20">
      <SetHelmet helmetTitle="Search" />
      <h1>Search</h1>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.searchStore.totalPages || 1}
      />
    </div>
  );
};

import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Categories } from "../../components/categories";
import { SetHelmet } from "../../components/helmet";
import { Pagination } from "../../components/pagination";
import { SearchStores } from "../../components/searchStores";
import { ShowStores } from "../../components/showStores";
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
  const [callQuery, { loading, data }] = useLazyQuery<
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
  }, [location, page, navigate, callQuery]);

  return (
    <div>
      <SetHelmet helmetTitle="Search Stores" />
      <SearchStores />
      {!loading && (
        <div className="container mt-8 pb-20">
          <Categories />
          {data?.searchStore.stores ? (
            <ShowStores stores={data?.searchStore.stores} />
          ) : (
            <h4 className="text-xl font-medium col-span-full">
              Stores not found.
            </h4>
          )}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.searchStore.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
};

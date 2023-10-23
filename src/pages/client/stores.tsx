import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Categories } from "../../components/categories";
import { SetHelmet } from "../../components/helmet";
import { StoresPageQuery, StoresPageQueryVariables } from "../../__api__/types";
import { STORE_FRAGMENT } from "../../fragments";
import { Pagination } from "../../components/pagination";
import { SearchStores } from "../../components/searchStores";
import { ShowStores } from "../../components/showStores";

const STORES_QUERY = gql`
  query storesPage($input: StoresInput!) {
    stores(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...StoreParts
      }
    }
  }
  ${STORE_FRAGMENT}
`;

export const Stores = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<StoresPageQuery, StoresPageQueryVariables>(
    STORES_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
  return (
    <div>
      <SetHelmet helmetTitle="Home" />
      <SearchStores />
      {!loading && (
        <div className="container mt-8 pb-20">
          <Categories />
          {data?.stores.results ? (
            <ShowStores stores={data?.stores.results} />
          ) : (
            <h4 className="text-xl font-medium col-span-full">
              Stores not found.
            </h4>
          )}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.stores.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
};

import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
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
    } else {
      console.log(query);
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [location]);

  console.log(loading, data, called);
  return (
    <div>
      <SetHelmet helmetTitle="Search" />
      <h1>Search</h1>
    </div>
  );
};

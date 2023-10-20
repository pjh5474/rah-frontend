import { gql, useQuery } from "@apollo/client";
import { SetHelmet } from "../../components/helmet";
import { StoresPageQuery, StoresPageQueryVariables } from "../../__api__/types";

const STORES_QUERY = gql`
  query storesPage($input: StoresInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        storeCount
      }
    }
    stores(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
      }
    }
  }
`;

export const Stores = () => {
  const { data, loading, error } = useQuery<
    StoresPageQuery,
    StoresPageQueryVariables
  >(STORES_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div>
      <SetHelmet helmetTitle="Home" />
      <h1>Stores</h1>
    </div>
  );
};

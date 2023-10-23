import { gql, useQuery } from "@apollo/client";
import { Categories } from "../../components/categories";
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
  const { data, loading } = useQuery<StoresPageQuery, StoresPageQueryVariables>(
    STORES_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );
  return (
    <div>
      <SetHelmet helmetTitle="Home" />
      <form className="bg-purple-300 w-full py-24 flex items-center justify-center">
        <input
          className="input rounded-md border-0 w-3/12"
          type="Search"
          placeholder="Search Stores..."
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <Categories categories={data?.allCategories.categories} />
        </div>
      )}
    </div>
  );
};

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
          <div className="flex justify-around max-w-screen-lg mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full bg-amber-300 hover:bg-amber-500 cursor-pointer"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="text-sm text-center font-medium mt-2">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

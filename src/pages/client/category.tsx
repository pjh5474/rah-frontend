import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Categories } from "../../components/categories";
import { SetHelmet } from "../../components/helmet";
import { Pagination } from "../../components/pagination";
import { SearchStores } from "../../components/searchStores";
import { ShowStores } from "../../components/showStores";
import { CATEGORY_FRAGMENT, STORE_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../__api__/types";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      stores {
        ...StoreParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${STORE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Category = () => {
  const [page, setPage] = useState(1);
  const params = useParams<"slug">();
  const { slug } = params;
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: slug || "",
        },
      },
    }
  );
  return (
    <div>
      <SetHelmet helmetTitle={`Category - ${slug}`} />
      <SearchStores />
      {!loading && (
        <div className="container mt-8 pb-20">
          <Categories selected={slug} />
          {data?.category.stores ? (
            <ShowStores stores={data?.category.stores} />
          ) : (
            <h4 className="text-xl font-medium col-span-full">
              Stores not found.
            </h4>
          )}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.category.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
};

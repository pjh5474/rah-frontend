import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { Pagination } from "../../components/pagination";
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
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug || "",
        },
      },
    }
  );

  return (
    <div className="container mt-8 pb-20">
      <SetHelmet helmetTitle="Category" />
      <h1>Category</h1>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.category.totalPages || 1}
      />
    </div>
  );
};

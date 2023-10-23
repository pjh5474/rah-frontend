import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { CATEGORY_FRAGMENT, STORE_FRAGMENT } from "../../fragments";

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
  const params = useParams<"slug">();

  return (
    <div>
      <SetHelmet helmetTitle="Category" />
      <h1>Category</h1>
    </div>
  );
};

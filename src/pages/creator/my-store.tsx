import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { STORE_FRAGMENT } from "../../fragments";
import { MyStoreQuery, MyStoreQueryVariables } from "../../__api__/types";

const MY_STORE_QUERY = gql`
  query myStore($input: MyStoreInput!) {
    myStore(input: $input) {
      ok
      error
      store {
        ...StoreParts
      }
    }
  }
  ${STORE_FRAGMENT}
`;

export const MyStore = () => {
  const params = useParams() as { id: string };
  const { data, loading, error } = useQuery<
    MyStoreQuery,
    MyStoreQueryVariables
  >(MY_STORE_QUERY, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data, loading, error);
  return <h1>My Store</h1>;
};

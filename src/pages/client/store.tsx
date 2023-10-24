import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { STORE_FRAGMENT } from "../../fragments";
import { StoreQuery, StoreQueryVariables } from "../../__api__/types";

const STORE_QUERY = gql`
  query store($input: StoreInput!) {
    store(input: $input) {
      ok
      error
      store {
        ...StoreParts
        commissions {
          id
          name
          price
        }
      }
    }
  }
  ${STORE_FRAGMENT}
`;

export const Store = () => {
  const { id } = useParams() as { id: string };
  const { loading, data } = useQuery<StoreQuery, StoreQueryVariables>(
    STORE_QUERY,
    {
      variables: {
        input: {
          storeId: +id || 0,
        },
      },
    }
  );

  return (
    <div>
      <SetHelmet helmetTitle="Store" />
      {!loading && (
        <div
          className="bg-amber-500 py-36 bg-center bg-cover"
          style={{ backgroundImage: `url(${data?.store.store?.coverImg})` }}
        >
          <div className="bg-white w-4/12 py-8 pl-4 lg:pl-48">
            <h4 className="text-4xl mb-3">{data?.store.store?.name}</h4>
            <h5 className="text-sm font-light mb-2">
              {data?.store.store?.category.name}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

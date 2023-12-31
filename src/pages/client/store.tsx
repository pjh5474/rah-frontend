import { gql, useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { Commission } from "../../components/commission";
import { SetHelmet } from "../../components/helmet";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { COMMISSION_FRAGMENT, STORE_FRAGMENT } from "../../fragments";
import { StoreQuery, StoreQueryVariables } from "../../__api__/types";

const STORE_QUERY = gql`
  query store($input: StoreInput!) {
    store(input: $input) {
      ok
      error
      store {
        ...StoreParts
        commissions {
          ...CommissionParts
        }
      }
    }
  }
  ${STORE_FRAGMENT}
  ${COMMISSION_FRAGMENT}
`;

export const Store = () => {
  const { id } = useParams() as { id: string };
  const { data } = useQuery<StoreQuery, StoreQueryVariables>(STORE_QUERY, {
    variables: {
      input: {
        storeId: +id || 0,
      },
    },
  });

  return (
    <div>
      <SetHelmet helmetTitle="Store" />
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
      <div className="container grid my-10 lg:grid-cols-3 gap-x-5 gap-y-7">
        {data?.store.store?.commissions.map((commission) => (
          <div key={nanoid()}>
            <Commission
              id={commission.id}
              name={commission.name}
              photo={commission.photo || DEFAULT_IMAGE_URL}
              description={commission.description || "No Description"}
              price={commission.price}
              isCustomer={true}
              options={commission.options}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

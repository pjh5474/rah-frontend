import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { COMMISSION_FRAGMENT, STORE_FRAGMENT } from "../../fragments";
import { MyStoreQuery, MyStoreQueryVariables } from "../../__api__/types";

export const MY_STORE_QUERY = gql`
  query myStore($input: MyStoreInput!) {
    myStore(input: $input) {
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

export const MyStore = () => {
  const { id } = useParams() as { id: string };
  const { data } = useQuery<MyStoreQuery, MyStoreQueryVariables>(
    MY_STORE_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  return (
    <div>
      <SetHelmet helmetTitle={`My Store - ${data?.myStore.store?.name}`} />
      <div
        className=" bg-amber-300 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myStore.store?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myStore.store?.name || "Loading..."}
        </h2>
        <Link
          to={`/stores/${id}/create-commission`}
          className="mr-8 text-white bg-amber-600 py-3 px-10"
        >
          Add Commission &rarr;
        </Link>
        <Link to={``} className="text-white bg-purple-600 py-3 px-10">
          Edit Store &rarr;
        </Link>
        <div className=" mt-10">
          {data?.myStore.ok && data?.myStore.store?.commissions.length === 0 ? (
            <h4 className="text-xl mb-5">Please make a commission menu.</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
};

import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { ShowStores } from "../../components/showStores";
import { STORE_FRAGMENT } from "../../fragments";
import { MyStoresQuery, MyStoresQueryVariables } from "../../__api__/types";

export const MY_STORES_QUERY = gql`
  query myStores {
    myStores {
      ok
      error
      stores {
        ...StoreParts
      }
    }
  }
  ${STORE_FRAGMENT}
`;

export const MyStores = () => {
  const { data } = useQuery<MyStoresQuery, MyStoresQueryVariables>(
    MY_STORES_QUERY
  );
  return (
    <div>
      <SetHelmet helmetTitle="My Stores" />
      <div className="container mt-32">
        <div className=" flex justify-between items-center">
          <h2 className="text-4xl font-medium mb-10">My Stores</h2>
          <Link to="/create-store" className="px-10">
            <span className=" text-center font-semibold text-md">
              Create Store &rarr;
            </span>
          </Link>
        </div>
        {data?.myStores.ok && data?.myStores.stores.length === 0 ? (
          <h4 className="text-xl mb-5">You have no stores.</h4>
        ) : (
          <ShowStores stores={data?.myStores.stores || []} />
        )}
      </div>
    </div>
  );
};

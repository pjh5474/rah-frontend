import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { Commission } from "../../components/commission";
import { SetHelmet } from "../../components/helmet";
import { DEFAULT_IMAGE_URL } from "../../constants";
import {
  COMMISSION_FRAGMENT,
  ORDERS_FRAGMENT,
  STORE_FRAGMENT,
} from "../../fragments";
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
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${STORE_FRAGMENT}
  ${COMMISSION_FRAGMENT}
  ${ORDERS_FRAGMENT}
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

  // const chartRawData = data?.myStore.store?.orders.map((order) => ({
  //   x: order.createdAt,
  //   y: order.total,
  // }));

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
          ) : (
            <div className="grid mt-10 lg:grid-cols-3 gap-x-5 gap-y-7">
              {data?.myStore.store?.commissions.map((commission) => (
                <Commission
                  name={commission.name}
                  photo={commission.photo || DEFAULT_IMAGE_URL}
                  description={commission.description || "No Description"}
                  price={commission.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          {data?.myStore.ok && data?.myStore.store?.orders.length === 0 ? (
            <div className=" mt-10">
              <h4 className="text-xl mb-5 text-center">
                You have no sales yet
              </h4>
            </div>
          ) : (
            <div className=" mt-10">
              <VictoryChart
                theme={VictoryTheme.material}
                width={window.innerWidth}
                height={500}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryLine
                  labels={({ datum }) => `￦ ${datum.y}`}
                  labelComponent={
                    <VictoryLabel
                      style={{ fontSize: 10 }}
                      renderInPortal
                      dy={-20}
                    />
                  }
                  data={
                    data?.myStore.store?.orders.map((order) => ({
                      x: order.createdAt,
                      y: order.total,
                    })) || []
                  }
                  interpolation="natural"
                  style={{
                    data: {
                      strokeWidth: 5,
                    },
                  }}
                />
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel renderInPortal />}
                  style={{ tickLabels: { fontSize: 20, fill: "#D97706" } }}
                  tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
                />
              </VictoryChart>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

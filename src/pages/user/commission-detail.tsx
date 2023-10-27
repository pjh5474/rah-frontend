import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import * as DOMPurify from "dompurify";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { COMMISSION_FRAGMENT } from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  GetCommissionQuery,
  GetCommissionQueryVariables,
  UserRole,
} from "../../__api__/types";
import { useState } from "react";
import { OptionComponent } from "../../components/option";
import { nanoid } from "nanoid";

export const GET_COMMISSION = gql`
  query getCommission($input: GetCommissionInput!) {
    getCommission(input: $input) {
      ok
      error
      commission {
        ...CommissionParts
      }
      post {
        id
        title
        content
      }
    }
  }
  ${COMMISSION_FRAGMENT}
`;

export const CommissionDetail = () => {
  const { storeId, commissionId } = useParams() as {
    storeId: string;
    commissionId: string;
  };
  const { data } = useMe();
  const isCreator = data?.me.role === UserRole.Creator;

  const [selectedOption, setSelectedOption] = useState<number[]>([]);

  const { data: commissionData, loading } = useQuery<
    GetCommissionQuery,
    GetCommissionQueryVariables
  >(GET_COMMISSION, {
    variables: {
      input: {
        id: +commissionId,
      },
    },
  });

  return (
    <div>
      <SetHelmet
        helmetTitle={`Commission - ${commissionData?.getCommission.commission?.name}`}
      />
      <div
        className=" bg-amber-300 py-20 bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            commissionData?.getCommission.commission?.photo || DEFAULT_IMAGE_URL
          })`,
        }}
      ></div>
      <div className="container mt-10">
        <div>
          <h4 className="text-4xl mb-3">
            {commissionData?.getCommission.commission?.name}
          </h4>
          <h5 className="text-sm font-light mb-2">
            {commissionData?.getCommission.commission?.description}
          </h5>
        </div>

        {commissionData?.getCommission.post ? (
          <div className="grid gap-3 grid-col-1 lg:grid-cols-4 w-full mb-10 px-5 pt-10 pb-20 ">
            <div className="lg:col-span-3 p-10 border-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    String(commissionData?.getCommission.post.content)
                  ),
                }}
              />
            </div>
            <div className="lg:col-span-1 bg-slate-200 ">
              {commissionData?.getCommission.commission?.options?.map(
                (option) => (
                  <div key={nanoid()}>
                    <OptionComponent
                      name={option.name}
                      extra={option.extra || 0}
                      choices={option.choices}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ) : isCreator ? (
          <Link
            className="ml-2"
            to={`/stores/${storeId}/commissions/${commissionId}/create-post`}
          >
            <h1 className="text-3xl font-bold">Please write a post. &rarr;</h1>
          </Link>
        ) : loading ? (
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        ) : (
          <h1 className="text-3xl font-bold">No post.</h1>
        )}
      </div>
    </div>
  );
};

import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import * as DOMPurify from "dompurify";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { COMMISSION_FRAGMENT } from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  DeleteCommissionMutation,
  DeleteCommissionMutationVariables,
  GetCommissionQuery,
  GetCommissionQueryVariables,
  UserRole,
} from "../../__api__/types";
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

export const DELETE_COMMISSION = gql`
  mutation deleteCommission($input: DeleteCommissionInput!) {
    deleteCommission(input: $input) {
      ok
      error
    }
  }
`;

export const CommissionDetail = () => {
  const { storeId, commissionId } = useParams() as {
    storeId: string;
    commissionId: string;
  };
  const { data } = useMe();
  const isCreator = data?.me.role === UserRole.Creator;

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

  const onDeleteComplete = () => {
    if (deleteMutationData?.deleteCommission.ok) {
      alert("Commission deleted!");
      window.location.href = `/stores/${storeId}`;
    }
  };

  const [deleteCommissionMutation, { data: deleteMutationData, error }] =
    useMutation<DeleteCommissionMutation, DeleteCommissionMutationVariables>(
      DELETE_COMMISSION,
      {
        onCompleted: onDeleteComplete,
      }
    );

  const onDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this commission?")) {
      deleteCommissionMutation({
        variables: {
          input: {
            commissionId: +commissionId,
          },
        },
      });
    }
  };

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
        <div className="flex justify-between">
          <Link to={`/stores/${storeId}`}>Back to Store &rarr;</Link>
          <button onClick={onDeleteClick}>Delete Commission</button>
        </div>

        {commissionData?.getCommission.post ? (
          <div className="grid gap-3 grid-col-1 lg:grid-cols-4 w-full mb-10 px-5 pt-10 pb-20 ">
            <div className="lg:col-span-3 p-10 border-2 rounded-md">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    String(commissionData?.getCommission.post.content)
                  ),
                }}
              />
            </div>

            <div className="lg:col-span-1 bg-slate-200 font-semibold rounded-md">
              <div>
                <div className="m-2 py-2 px-3 ring-2 mb-4 ring-purple-400 rounded-md bg-white">
                  <div className="grid grid-cols-3 gap-2">
                    <h6 className="col-span-2">
                      {commissionData?.getCommission.commission?.name}
                    </h6>
                    <h6 className="text-sm opacity-75 col-span-1 text-end">{`+ ￦ ${
                      commissionData?.getCommission.commission?.price || 0
                    }`}</h6>
                  </div>
                </div>
                <div className="px-2">
                  <hr className="border-4 border-amber-300 my-2 rounded-lg" />
                  <hr className="border-4 border-amber-300 my-2 rounded-lg" />
                </div>
              </div>
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

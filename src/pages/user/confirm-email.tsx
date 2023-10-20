import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { useMe } from "../../hooks/useMe";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../__api__/types";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const navigate = useNavigate();
  const onCompleted = (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      navigate("/");
    }
  };
  const [verifyEmail] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);

  return (
    <div className=" mt-52 flex flex-col items-center justify-center">
      <SetHelmet helmetTitle="Confirm Email" />
      <h2 className="text-lg mb-1 font-medium">Confirming Email...</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page
      </h4>
    </div>
  );
};

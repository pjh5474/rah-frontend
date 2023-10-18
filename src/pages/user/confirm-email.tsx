import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION);

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  });

  return (
    <div className=" mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming Email...</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page
      </h4>
    </div>
  );
};

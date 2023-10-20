import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { SetHelmet } from "../../components/helmet";
import { EMAIL_REGEX } from "../../constants";
import { useMe } from "../../hooks/useMe";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../../__api__/types";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, username: prevUsername },
      } = userData;
      const { email: newEmail, username: newUsername } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment EmailEditedUser on User {
              verified
              email
            }
          `,
          data: {
            verified: false,
            email: newEmail,
          },
        });
      }

      if (prevUsername !== newUsername) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment UsernameEditedUser on User {
              username
            }
          `,
          data: {
            username: newUsername,
          },
        });
      }

      alert("Profile updated!");
    }
  };
  const [editProfileMutation, { data: editProfileMutationResult, loading }] =
    useMutation<EditProfileMutation, EditProfileMutationVariables>(
      EDIT_PROFILE_MUTATION,
      {
        onCompleted,
      }
    );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
      username: userData?.me.username,
    },
  });
  const onSubmit = () => {
    const { email, username, password } = getValues();
    editProfileMutation({
      variables: {
        input: {
          email: email !== userData?.me.email ? email : undefined,
          username,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-28 flex flex-col justify-center items-center">
      <SetHelmet helmetTitle="Edit Profile" />
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3  mt-5 w-full mb-5 max-w-screen-sm"
      >
        <input
          {...register("email", {
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email",
            },
          })}
          className="input"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          {...register("username")}
          className="input"
          placeholder="Username"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        <input
          {...register("passwordConfirm", {
            validate: (value) =>
              value === getValues("password") || "Password is not matched",
          })}
          className="input"
          placeholder="PasswordConfirm"
        />
        {errors.passwordConfirm?.message && (
          <FormError errorMessage={errors.passwordConfirm?.message} />
        )}
        <Button
          canClick={isValid}
          loading={loading}
          actionText="Save Profile"
        />
        {editProfileMutationResult?.editProfile.error && (
          <FormError
            errorMessage={editProfileMutationResult.editProfile.error}
          />
        )}
      </form>
    </div>
  );
};

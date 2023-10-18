import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import rahLogo from "../images/rahodes.svg";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "../__api__/types";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      navigate("/");
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, username, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            username,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex  items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Sign In | RAH</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={rahLogo} alt="rahLogo" className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-10">SIGN IN</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            })}
            name="email"
            required
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 2,
                message: "Password must be more than 2 chars.",
              },
            })}
            name="password"
            required
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <input
            {...register("passwordConfirm", {
              required: "PasswordConfirm is required",
              validate: (value) => {
                if (value === getValues("password")) {
                  return true;
                } else {
                  return "Passwords do not match.";
                }
              },
            })}
            name="passwordConfirm"
            required
            placeholder="PasswordConfirm"
            className="input"
          />
          {errors.passwordConfirm?.message && (
            <FormError errorMessage={errors.passwordConfirm?.message} />
          )}
          <input
            {...register("username", {
              required: "username is required",
              minLength: {
                value: 2,
                message: "Username must be more than 2 chars.",
              },
            })}
            name="username"
            required
            placeholder="Username"
            className="input"
          />
          {errors.username?.message && (
            <FormError errorMessage={errors.username?.message} />
          )}
          <select
            {...register("role", {
              required: true,
            })}
            className=" input"
            name="role"
            required
          >
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={loading} actionText={"Sign In"} />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/" className=" link ">
            Log In Now
          </Link>
        </div>
      </div>
    </div>
  );
};

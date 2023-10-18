import { ApolloError, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { LoginMutation, LoginMutationVariables } from "../__api__/types";
import rahLogo from "../images/rahodes.svg";
import { Button } from "../components/button";
import { Link, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

interface LocationState {
  email: string;
  password: string;
}

export const Login = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const location = useLocation();
  const state = location?.state as LocationState;

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      email: state?.email,
      password: state?.password,
    },
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
      isLoggedInVar(true);
    }
  };

  const onError = (error: ApolloError) => {};

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex  items-center flex-col mt-10 lg:mt-28">
      <HelmetProvider>
        <Helmet>
          <title>Log In | RAH</title>
        </Helmet>
      </HelmetProvider>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={rahLogo} alt="rahLogo" className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-10">LOG IN</h4>
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
          <Button canClick={isValid} loading={loading} actionText={"Log In"} />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to RAH?{" "}
          <Link to="/create-account" className=" text-sky-400 hover:underline ">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

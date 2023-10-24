import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { SetHelmet } from "../../components/helmet";
import {
  CreateStoreMutation,
  CreateStoreMutationVariables,
} from "../../__api__/types";

const CREATE_STORE_MUTATION = gql`
  mutation createStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  coverImg: string;
  description: string;
  categoryName: string;
}

export const CreateStore = () => {
  const [createStoreMutation, { loading, data }] = useMutation<
    CreateStoreMutation,
    CreateStoreMutationVariables
  >(CREATE_STORE_MUTATION);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <SetHelmet helmetTitle="Create Store" />
      <h1>Create Store</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          className="input"
          required
          type="text"
          placeholder="Name"
        />
        <input
          {...register("categoryName", {
            required: "Category is required",
          })}
          className="input"
          required
          type="text"
          placeholder="Category Name"
        />
        <input
          {...register("description", {
            required: "Description is required",
          })}
          className="input"
          required
          type="text"
          placeholder="Description"
        />
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Create Store"
        />
      </form>
    </div>
  );
};

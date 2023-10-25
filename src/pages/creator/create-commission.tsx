import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { SetHelmet } from "../../components/helmet";
import {
  CreateCommissionMutation,
  CreateCommissionMutationVariables,
} from "../../__api__/types";
import { MY_STORE_QUERY } from "./my-store";

const CREATE_COMMISSION_MUTATION = gql`
  mutation createCommission($input: CreateCommissionInput!) {
    createCommission(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  price: string;
  description: string;
}

export const CreateCommission = () => {
  const { id: storeId } = useParams() as { id: string };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [createCommissionMutation, { loading, error, data }] = useMutation<
    CreateCommissionMutation,
    CreateCommissionMutationVariables
  >(CREATE_COMMISSION_MUTATION, {
    refetchQueries: [
      {
        query: MY_STORE_QUERY,
        variables: {
          input: {
            id: +storeId,
          },
        },
      },
    ],
  });
  const onSubmit = () => {
    const { name, price, description } = getValues();
    createCommissionMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          storeId: +storeId,
        },
      },
    });
    navigate(-1);
  };
  return (
    <div className=" contianer flex flex-col items-center mt-32">
      <SetHelmet helmetTitle="Add Commission" />
      <h4 className="font-semibold text-2xl mb-3">Create Commission</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mx-auto my-16 w-full mb-3"
      >
        <input
          {...register("name", { required: "Commission Name is required." })}
          className="input"
          type="text"
          name="name"
          placeholder="Commission Name"
          required
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
        <input
          {...register("price", {
            required: "Commission Price is required.",
            min: {
              value: 0,
              message: "Price should be greater than 0.",
            },
          })}
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Commission Price"
        />
        {errors.price?.message && (
          <FormError errorMessage={errors.price?.message} />
        )}
        <input
          {...register("description", {
            required: "Commission Description is required.",
            maxLength: {
              value: 200,
              message: "Description should be less than 200 chars.",
            },
          })}
          className="input"
          type="text"
          name="description"
          maxLength={200}
          placeholder="Commission Description"
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description?.message} />
        )}
        <Button
          canClick={isValid}
          loading={loading}
          actionText="Create Commission"
        />
        {data?.createCommission.error && (
          <FormError errorMessage={data.createCommission.error} />
        )}
      </form>
    </div>
  );
};

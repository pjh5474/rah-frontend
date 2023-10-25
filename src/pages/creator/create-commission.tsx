import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
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
  [key: string]: string;
}

export const CreateCommission = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setValue,
    unregister,
  } = useForm<IFormProps>({
    mode: "onChange",
    shouldUnregister: true,
  });

  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteOptionClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-OptionName`, "");
    setValue(`${idToDelete}-OptionExtra`, "");
    unregister(`${idToDelete}-OptionName`);
    unregister(`${idToDelete}-OptionExtra`);
  };

  const { id: storeId } = useParams() as { id: string };
  const navigate = useNavigate();
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
    const { name, price, description, ...rest } = getValues();
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-OptionName`],
      extra: +rest[`${theId}-OptionExtra`] || 0,
    }));
    createCommissionMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          storeId: +storeId,
          options: optionObjects,
        },
      },
    });
    navigate(-1);
  };
  return (
    <div className=" contianer flex flex-col items-center mt-32 ">
      <SetHelmet helmetTitle="Add Commission" />
      <h4 className="font-semibold text-2xl mb-3">Create Commission</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mx-auto my-16 w-full mb-3 px-4"
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
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Commission Options</h4>
          <span
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-amber-500 py-1 px-2 mt-5"
          >
            Add Commission Options
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div
                className="mt-5 grid grid-cols-3 gap-2"
                key={`DishOption-${id}`}
              >
                <input
                  {...register(`${id}-OptionName`)}
                  name={`${id}-OptionName`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3 w-auto"
                  type="text"
                  required
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-OptionExtra`)}
                  name={`${id}-OptionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3 w-auto"
                  type="number"
                  min={0}
                  placeholder="Option Extra Price"
                />
                <span
                  className="cursor-pointer text-white bg-purple-500 py-3 px-4 w-auto"
                  onClick={() => onDeleteOptionClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
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

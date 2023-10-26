import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { SetHelmet } from "../../components/helmet";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { CheckFileSize } from "../../hooks/checkImageSize";
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

interface IBasicFormProps {
  name: string;
  photo?: FileList;
  description: string;
  price: string;
}

interface IOptionFormProps {
  [key: string]: string;
}

type IFormProps = IBasicFormProps & IOptionFormProps;

interface IOptionChoicesProps {
  [key: number]: number[];
}

export const CreateCommission = () => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
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

  const [optionChoices, setOptionChoices] = useState<IOptionChoicesProps>({});

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

  const onAddOptionChoiceClick = (optionId: number) => {
    setOptionChoices((current) => ({
      ...current,
      [optionId]: [...(current[optionId] || []), Date.now()],
    }));
  };

  const onDeleteOptionChoiceClick = (optionId: number, choiceId: number) => {
    setOptionChoices((current) => ({
      ...current,
      [optionId]: current[optionId].filter((id) => id !== choiceId),
    }));
    setValue(`${optionId}-${choiceId}-OptionChoiceName`, "");
    setValue(`${optionId}-${choiceId}-OptionChoiceExtra`, "");
    unregister(`${optionId}-${choiceId}-OptionChoiceName`);
    unregister(`${optionId}-${choiceId}-OptionChoiceExtra`);
  };

  const { id: storeId } = useParams() as { id: string };
  const navigate = useNavigate();
  const [createCommissionMutation, { loading, data }] = useMutation<
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

  const onSubmit = async () => {
    try {
      const { name, photo, price, description, ...rest } = getValues();

      const actualCoverImg = photo?.[0];
      let imgUrl;
      if (actualCoverImg) {
        const formBody = new FormData();
        formBody.append("file", actualCoverImg);
        formBody.append("targetFolder", "commissionPhoto");
        const { url } = await (
          await fetch("http://localhost:4000/uploads", {
            method: "POST",
            body: formBody,
          })
        ).json();
        imgUrl = url;
      } else {
        imgUrl = DEFAULT_IMAGE_URL;
      }
      setImageUrl(imgUrl);

      const optionObjects = optionsNumber.map((id) => ({
        name: rest[`${id}-OptionName`],
        extra: +rest[`${id}-OptionExtra`] || 0,
        choices: optionChoices[id]?.map((choiceId) => ({
          name: rest[`${id}-${choiceId}-OptionChoiceName`],
          extra: +rest[`${id}-${choiceId}-OptionChoiceExtra`] || 0,
        })),
      })) as CreateCommissionMutationVariables["input"]["options"];

      createCommissionMutation({
        variables: {
          input: {
            name,
            price: +price,
            description,
            photo: imageUrl,
            storeId: +storeId,
            options:
              optionObjects as CreateCommissionMutationVariables["input"]["options"],
          },
        },
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
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
        <div>
          <input
            {...register("photo")}
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => {
              CheckFileSize(e);
            }}
          />
        </div>

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
          <h4 className="font-medium mb-3 text-lg ml-2">Commission Options</h4>
          <span
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-amber-500 ml-2 py-1 px-2 mt-5 hover:ring-2 hover:ring-amber-400 hover:ring-opacity-70"
          >
            Add Commission Options
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div
                key={`DishOption-${id}`}
                className="px-2 py-2 border-amber-500 focus-within:border-purple-500 focus-within:shadow-md focus-within:shadow-purple-400  hover:border-purple-500 border-2 mt-5"
              >
                <div className="grid grid-cols-5 gap-2 mb-5">
                  <input
                    {...register(`${id}-OptionName`)}
                    name={`${id}-OptionName`}
                    className="col-span-2 py-2 px-4 focus:outline-none focus:border-amber-500 border-2 mr-3 w-auto placeholder:text-sm"
                    type="text"
                    required
                    placeholder="Option"
                  />
                  <input
                    {...register(`${id}-OptionExtra`)}
                    name={`${id}-OptionExtra`}
                    className="col-span-2 py-2 px-4 focus:outline-none focus:border-amber-500 border-2 mr-3 w-auto placeholder:text-sm"
                    type="number"
                    min={0}
                    placeholder="Extra Price"
                  />
                  <span
                    className=" col-span-1 cursor-pointer text-white bg-red-500 py-3 px-4 w-auto text-center hover:ring-2 hover:ring-red-400 hover:ring-opacity-70"
                    onClick={() => onDeleteOptionClick(id)}
                  >
                    Delete
                  </span>
                </div>
                <span
                  onClick={() => onAddOptionChoiceClick(id)}
                  className=" cursor-pointer text-white bg-sky-600 py-1 px-2 hover:ring-2 hover:ring-sky-400 hover:ring-opacity-70"
                >
                  Add Option Choices
                </span>
                {optionChoices[id] &&
                  optionChoices[id].length !== 0 &&
                  optionChoices[id].map((choiceId) => (
                    <div
                      key={`${id}-${choiceId}`}
                      className="grid grid-cols-5 gap-2 mt-5 mb-5"
                    >
                      <input
                        {...register(`${id}-${choiceId}-OptionChoiceName`)}
                        name={`${id}-${choiceId}-OptionChoiceName`}
                        className="col-span-2 py-2 px-4 focus:outline-none focus:border-sky-600 border-2 mr-3 w-auto placeholder:text-sm"
                        type="text"
                        required
                        placeholder="Choice"
                      />
                      <input
                        {...register(`${id}-${choiceId}-OptionChoiceExtra`)}
                        name={`${id}-${choiceId}-OptionChoiceExtra`}
                        className="col-span-2 py-2 px-4 focus:outline-none focus:border-sky-600 border-2 mr-3 w-auto placeholder:text-sm"
                        type="number"
                        min={0}
                        placeholder="Extra Price"
                      />
                      <span
                        className=" col-span-1 cursor-pointer text-white bg-red-500 py-3 px-4 w-auto text-center hover:ring-2 hover:ring-red-400 hover:ring-opacity-70"
                        onClick={() => onDeleteOptionChoiceClick(id, choiceId)}
                      >
                        Delete
                      </span>
                    </div>
                  ))}
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

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { SetHelmet } from "../../components/helmet";
import { DEFAULT_IMAGE_URL } from "../../constants";
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
  description: string;
  categoryName: string;
  coverImg?: FileList;
}

export const CreateStore = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const onCompleted = (data: CreateStoreMutation) => {
    const {
      createStore: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
      alert("Store Created!");
      navigate("/");
    }
  };

  const [createStoreMutation, { data }] = useMutation<
    CreateStoreMutation,
    CreateStoreMutationVariables
  >(CREATE_STORE_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, description, categoryName, coverImg } = getValues();
      const actualCoverImg = coverImg?.[0];
      let imgUrl;
      if (actualCoverImg) {
        const formBody = new FormData();
        formBody.append("file", actualCoverImg);
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
      createStoreMutation({
        variables: {
          input: {
            name,
            description,
            categoryName,
            coverImg: imgUrl,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          name="name"
          required
          type="text"
          placeholder="Store Name"
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
        <input
          {...register("categoryName", {
            required: "Category is required",
          })}
          className="input"
          name="categoryName"
          required
          type="text"
          placeholder="Category Name"
        />
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName?.message} />
        )}
        <input
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 140,
              message: "Description should be less than 140 chars.",
            },
          })}
          className="input"
          name="description"
          required
          type="text"
          placeholder="Description"
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description?.message} />
        )}
        <div>
          <input
            {...register("coverImg")}
            type="file"
            name="coverImg"
            accept="image/*"
          />
        </div>
        <Button
          loading={uploading}
          canClick={isValid}
          actionText="Create Store"
        />
        {data?.createStore.error && (
          <FormError errorMessage={data.createStore.error} />
        )}
      </form>
    </div>
  );
};

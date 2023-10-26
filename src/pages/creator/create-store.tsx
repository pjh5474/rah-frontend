import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { SetHelmet } from "../../components/helmet";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { CheckFileSize } from "../../hooks/checkImageSize";
import {
  CreateStoreMutation,
  CreateStoreMutationVariables,
} from "../../__api__/types";
import { MY_STORES_QUERY } from "./my-stores";

const CREATE_STORE_MUTATION = gql`
  mutation createStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      ok
      error
      storeId
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
  const client = useApolloClient();
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const onCompleted = (data: CreateStoreMutation) => {
    const {
      createStore: { ok, storeId },
    } = data;
    if (ok) {
      const { name, description, categoryName, coverImg } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_STORES_QUERY,
      });
      client.writeQuery({
        query: MY_STORES_QUERY,
        data: {
          myStores: {
            ...queryResult.myStores,
            stores: [
              ...queryResult.myStores.stores,
              {
                name,
                description,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: storeId,
                __typename: "Store",
              },
            ],
          },
        },
      });
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
        formBody.append("targetFolder", "storePhoto");
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
    <div className="container flex flex-col items-center mt-32">
      <SetHelmet helmetTitle="Create Store" />
      <h4 className="font-semibold text-2xl mb-3">Create Store</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
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
            onChange={(e) => {
              CheckFileSize(e);
            }}
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

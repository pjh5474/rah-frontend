import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { gql, useMutation } from "@apollo/client";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../__api__/types";
import { useNavigate } from "react-router-dom";
import { FormError } from "./form-error";

if (!Quill.import("modules/imageResize")) {
  Quill.register("modules/imageResize", ImageResize);
  console.log("registered");
}

const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

interface IQuillComponentProps {
  storeId: number;
  commissionId: number;
  refetch: () => void;
}

export const QuillComponent: React.FC<IQuillComponentProps> = ({
  commissionId,
  storeId,
  refetch,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [createPostMutation, { loading, data, error }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CREATE_POST);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["image"],
      [{ align: [] }, { color: [] }, { background: [] }],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const onClick = () => {
    const today = new Date().toISOString().slice(0, 10);
    createPostMutation({
      variables: {
        input: {
          title: `${today} - ${commissionId}`,
          content: value,
          commissionId,
        },
      },
    });
    navigate(`/stores/${storeId}/commissions/${commissionId}`);
    refetch();
  };

  return (
    <>
      <div className="bg-white w-3/4 mb-10 px-5 pt-10 pb-20 shadow-lg">
        <ReactQuill
          style={{ height: "400px" }}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>
      <div className="flex justify-end items-center w-3/4 pb-10">
        <button
          className="bg-amber-500 text-white py-3 px-10 rounded-lg"
          onClick={onClick}
        >
          {loading ? "Loading..." : "Create Post"}
        </button>
        {error && <FormError errorMessage={error.message} />}
      </div>
    </>
  );
};

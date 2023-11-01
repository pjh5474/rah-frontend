import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../__api__/types";
import { useNavigate } from "react-router-dom";
import { FormError } from "./form-error";
import { IMAGE_FILE_SIZE } from "../constants";
import { GET_COMMISSION } from "../pages/user/commission-detail";

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
}

export const QuillComponent: React.FC<IQuillComponentProps> = ({
  commissionId,
  storeId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();

  const client = useApolloClient();

  const onCreateCompleted = () => {
    if (data?.createPost.ok) {
      alert("게시글이 작성되었습니다.");
    }
    const queryResult = client.readQuery({
      query: GET_COMMISSION,
      variables: {
        input: {
          id: +commissionId,
        },
      },
    });
    client.writeQuery({
      query: GET_COMMISSION,
      variables: {
        input: {
          id: +commissionId,
        },
      },
      data: {
        getCommission: {
          ...queryResult.getCommission,
          post: {
            content: value,
            __typename: "Post",
          },
        },
      },
    });
  };

  const [createPostMutation, { data, loading, error }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CREATE_POST, {
    onCompleted: onCreateCompleted,
  });

  const onClick = async (
    quillref: React.MutableRefObject<ReactQuill | null>
  ) => {
    if (isLoading) {
      return;
    } else {
      setIsLoading(true);
    }

    if (!quillref.current) {
      alert("에디터를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    const editor = quillref.current.getEditor();
    const images = editor
      .getContents()
      .ops?.filter((op) => op.insert.image)
      .map((op) => op.insert.image)
      .filter((image) => typeof image === "string") as string[];

    if (images.length > 0) {
      images.forEach((image) => {
        const maxSize = IMAGE_FILE_SIZE; // 3MB
        const size = image.length * (3 / 4) - 2;
        if (size > maxSize) {
          alert("각 이미지 사이즈는 3MB 이내로 등록 가능합니다.");
          return;
        }
      });
    }

    const imageBuffer = images.map((image) => {
      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    });

    try {
      if (imageBuffer.length > 0) {
        const formBody = new FormData();
        imageBuffer.forEach((image) => {
          formBody.append("images", image);
        });
        formBody.append("mainFolder", "postImages");
        formBody.append("targetFolder", `posts - ${commissionId}`);
        const { urls } = await (
          await fetch("http://localhost:4000/uploads/postImages", {
            method: "POST",
            body: formBody,
          })
        ).json();
        editor.getContents().ops?.forEach((op) => {
          if (op.insert.image) {
            op.insert.image = urls.shift();
          }
        });
        editor.setContents(editor.getContents());
        // get react quill value
        setValue(editor.root.innerHTML);
      }

      const today = new Date().toISOString().slice(0, 10);
      createPostMutation({
        variables: {
          input: {
            title: `${today} - ${commissionId}`,
            content: editor.root.innerHTML,
            commissionId,
          },
        },
      });
      setIsLoading(false);
      navigate(`/stores/${storeId}/commissions/${commissionId}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return;
    }
  };

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

  return (
    <>
      <div className="bg-white w-3/4 mb-10 px-5 pt-10 pb-20 shadow-lg">
        <ReactQuill
          ref={quillRef}
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
          onClick={() => onClick(quillRef)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Post"}
        </button>
        {error && <FormError errorMessage={error.message} />}
      </div>
    </>
  );
};

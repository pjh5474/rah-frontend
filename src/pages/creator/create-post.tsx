import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SetHelmet } from "../../components/helmet";
import { QuillComponent } from "../../components/quill";
import { DEFAULT_IMAGE_URL } from "../../constants";
import {
  GetCommissionQuery,
  GetCommissionQueryVariables,
} from "../../__api__/types";
import { GET_COMMISSION } from "../user/commission-detail";

export const CreatePost = () => {
  const { storeId, commissionId } = useParams() as {
    storeId: string;
    commissionId: string;
  };

  const { data: commissionData } = useQuery<
    GetCommissionQuery,
    GetCommissionQueryVariables
  >(GET_COMMISSION, {
    variables: {
      input: {
        id: +commissionId,
      },
    },
  });

  return (
    <div>
      <SetHelmet helmetTitle="Edit Post" />
      <div
        className=" bg-amber-300 py-20 bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            commissionData?.getCommission.commission?.photo || DEFAULT_IMAGE_URL
          })`,
        }}
      ></div>
      <div className="container mt-10 flex flex-col items-center">
        <div>
          <h4 className="text-4xl mb-3">
            {commissionData?.getCommission.commission?.name}
          </h4>
          <h5 className="text-sm font-light mb-2">
            {commissionData?.getCommission.commission?.description}
          </h5>
        </div>
        <QuillComponent storeId={+storeId} commissionId={+commissionId} />
      </div>
    </div>
  );
};

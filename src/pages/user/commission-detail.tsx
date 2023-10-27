import { useParams } from "react-router-dom";

export const CommissionDetail: React.FC = () => {
  const params = useParams() as { storeId: string; commissionId: string };
  console.log(params);
  return (
    <div>
      <h1>Commission Detail</h1>
    </div>
  );
};

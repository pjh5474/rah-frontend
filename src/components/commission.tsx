import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { CommissionOption } from "../__api__/types";
import { nanoid } from "nanoid";

interface ICommissionProps {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
  options?: CommissionOption[] | null;
}

export const Commission: React.FC<ICommissionProps> = ({
  id: commissionId,
  name,
  description,
  price,
  photo,
  isCustomer = false,
  options,
}) => {
  const { id: storeId } = useParams() as { id: string };
  return (
    <Link to={`/stores/${storeId}/commissions/${commissionId}`}>
      <div className="px-8 py-4 pb-8 border hover:border-amber-500 transition-all grid gap-5 grid-cols-3">
        <div className="col-span-2">
          <div className="mb-5">
            <h3 className="text-lg font-bold">{name}</h3>
            <h4 className="font-medium mb-5">{description}</h4>
          </div>
          <span>
            <FontAwesomeIcon className="mr-2" icon={faWonSign} />
            {price}
          </span>
          {isCustomer && options && options?.length !== 0 && (
            <div>
              <h5 className="font-medium mt-5">Commission Options &darr;</h5>
              <hr className="border-amber-500 my-3" />
              {options?.map((option) => (
                <div key={nanoid()} className="grid grid-cols-4 gap-2">
                  <h6 className="mr-2 col-span-3">{option.name}</h6>
                  <h6 className="text-sm opacity-75 col-span-1">{`￦ ${
                    option.extra || 0
                  }`}</h6>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="col-span-1 bg-cover bg-center"
          style={{
            backgroundImage: `url(${photo})`,
          }}
        ></div>
      </div>
    </Link>
  );
};

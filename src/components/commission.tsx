import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICommissionProps {
  name: string;
  description: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
}

export const Commission: React.FC<ICommissionProps> = ({
  name,
  description,
  price,
  photo,
  isCustomer = false,
}) => {
  return (
    <div
      key={name}
      className="px-8 py-4 pb-8 border hover:border-amber-500 transition-all grid gap-5 grid-cols-3"
    >
      <div className="col-span-2">
        <div className="mb-5">
          <h3 className="text-lg font-medium">{name}</h3>
          <h4 className="font-medium mb-5">{description}</h4>
        </div>
        <span>
          <FontAwesomeIcon className="mr-2" icon={faWonSign} />
          {price}
        </span>
      </div>
      <div
        className="col-span-1 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photo})`,
        }}
      ></div>
    </div>
  );
};

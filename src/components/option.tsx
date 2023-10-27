import { nanoid } from "nanoid";
import { CommissionChoice } from "../__api__/types";

interface IOptionProps {
  name: string;
  extra?: number;
  choices?: CommissionChoice[] | null;
}

export const OptionComponent: React.FC<IOptionProps> = ({
  name,
  extra,
  choices,
}) => {
  return (
    <div className="m-2 py-2 px-3 ring-2 mb-4 ring-amber-400 rounded-md bg-white">
      <div className="grid grid-cols-3 gap-2">
        <h6 className="col-span-2 font-medium">{name}</h6>
        <h6 className="text-sm opacity-75 col-span-1 text-end">{`+ ￦ ${
          extra || 0
        }`}</h6>
      </div>
      {choices && <hr className="border-1 border-amber-300 my-2" />}
      {choices?.map((choice) => (
        <div key={nanoid()} className="grid grid-cols-3 gap-2 mt-1">
          <h6 className="ml-4 col-span-2 font-light">{choice.name}</h6>
          <h6 className="text-sm opacity-75 col-span-1  text-end">{`+ ￦ ${
            choice.extra || 0
          }`}</h6>
        </div>
      ))}
    </div>
  );
};

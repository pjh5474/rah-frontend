import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormProps {
  searchTerm: string;
}

export const SearchStores = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();
  const onSearchSubmit = (data: IFormProps) => {
    const { searchTerm } = getValues();
    navigate({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <form
      className="bg-purple-300 w-full py-24 flex items-center justify-center"
      onSubmit={handleSubmit(onSearchSubmit)}
    >
      <input
        {...register("searchTerm", {
          required: true,
          min: 2,
        })}
        name="searchTerm"
        className="input rounded-md border-0 w-3/4 md:w-3/12"
        type="Search"
        placeholder="Search Stores..."
      />
    </form>
  );
};

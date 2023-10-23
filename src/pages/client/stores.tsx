import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../components/categories";
import { SetHelmet } from "../../components/helmet";
import { Store } from "../../components/store";
import { StoresPageQuery, StoresPageQueryVariables } from "../../__api__/types";
import { STORE_FRAGMENT, CATEGORY_FRAGMENT } from "../../fragments";
import { Pagination } from "../../components/pagination";

const STORES_QUERY = gql`
  query storesPage($input: StoresInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    stores(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...StoreParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${STORE_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Stores = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<StoresPageQuery, StoresPageQueryVariables>(
    STORES_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
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
    <div>
      <SetHelmet helmetTitle="Home" />
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
      {!loading && (
        <div className="container mt-8 pb-20">
          <Categories categories={data?.allCategories.categories} />
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10">
            {data?.stores.results?.map((store) => (
              <Store
                id={store.id + ""}
                name={store.name}
                coverImg={store.coverImg}
                categoryName={store.category?.name}
                key={`store-${store.id}`}
              />
            ))}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.stores.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
};

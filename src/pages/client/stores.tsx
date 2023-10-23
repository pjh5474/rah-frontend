import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../components/categories";
import { SetHelmet } from "../../components/helmet";
import { Store } from "../../components/store";
import { StoresPageQuery, StoresPageQueryVariables } from "../../__api__/types";
import { STORE_FRAGMENT, CATEGORY_FRAGMENT } from "../../fragments";

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
  const [pageInput, setPageInput] = useState(1);
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
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) return;
    if (
      data?.stores.totalPages &&
      Number(event.target.value) <= data?.stores.totalPages &&
      Number(event.target.value) > 0
    ) {
      setPage(Number(event.target.value));
    } else {
      return;
    }
  };
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
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page{" "}
              <input
                onBlur={handlePageChange}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPageInput(Number(event.target.value));
                }}
                className="w-12 text-center mx-2"
                type="number"
                value={pageInput}
              ></input>{" "}
              of {data?.stores.totalPages}
            </span>
            {page !== data?.stores.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

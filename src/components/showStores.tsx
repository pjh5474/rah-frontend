import { Store } from "./store";

interface IShowStoresProps {
  stores: {
    id: number;
    name: string;
    coverImg: string;
    category: {
      name: string;
    };
  }[];
}

export const ShowStores = ({ stores }: IShowStoresProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10">
      {stores?.length === 0 && (
        <h4 className="text-xl font-medium col-span-full">Stores not found.</h4>
      )}
      {stores?.map((store) => (
        <Store
          id={store.id + ""}
          name={store.name}
          coverImg={store.coverImg}
          categoryName={store.category?.name}
          key={`store-${store.id}`}
        />
      ))}
    </div>
  );
};

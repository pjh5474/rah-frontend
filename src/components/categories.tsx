interface ICategoriesProps {
  categories?:
    | {
        id: number;
        name: string;
        coverImg: string;
        slug: string;
        storeCount: number;
      }[]
    | null
    | undefined;
}

export const Categories: React.FC<ICategoriesProps> = ({ categories }) => {
  return (
    <div className="flex justify-around max-w-screen-lg mx-auto">
      {categories?.map((category) => (
        <div className="flex flex-col items-center group" key={category.name}>
          <div
            className="w-16 h-16 rounded-full bg-amber-300 group-hover:bg-amber-500"
            style={{ backgroundImage: `url(${category.coverImg})` }}
          ></div>
          <span className="text-sm text-center font-medium mt-2">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

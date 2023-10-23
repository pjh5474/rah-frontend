interface IStoreProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Store: React.FC<IStoreProps> = ({
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className=" bg-cover bg-center py-28 mb-3"
      ></div>
      <h3 className="text-xl">{name}</h3>
      <span className=" border-t-2 mt-2 py-2 text-xs opacity-50 border-purple-500">
        {categoryName}
      </span>
    </div>
  );
};

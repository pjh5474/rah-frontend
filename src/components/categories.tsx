import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { CATEGORY_FRAGMENT } from "../fragments";
import { CategoriesComponentQuery } from "../__api__/types";

const ALL_CATEGORIES_QUERY = gql`
  query categoriesComponent {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

interface ICategoriesProps {
  selected?: string;
}

export const Categories = ({ selected }: ICategoriesProps) => {
  const { data, loading } =
    useQuery<CategoriesComponentQuery>(ALL_CATEGORIES_QUERY);
  return (
    <div className="flex justify-around max-w-screen-lg mx-auto">
      {!loading &&
        data?.allCategories.categories?.map((category) => (
          <Link to={`/category/${category.slug}`} key={category.name}>
            <div className="flex flex-col items-center group">
              <div
                className={`w-16 h-16 rounded-full bg-amber-300 group-hover:bg-amber-500 ${
                  selected === category.slug &&
                  "border-2 border-amber-500 shadow-lg shadow-amber-700"
                }`}
                style={{ backgroundImage: `url(${category.coverImg})` }}
              ></div>
              <span className="text-sm text-center font-medium mt-2">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

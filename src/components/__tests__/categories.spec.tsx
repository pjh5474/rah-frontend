import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Categories } from "../categories";
import { gql } from "@apollo/client";
import { CATEGORY_FRAGMENT } from "../../fragments";

describe("<Categories />", () => {
  it("renders OK", async () => {
    const mocks = [
      {
        request: {
          query: gql`
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
          `,
        },
        result: {
          data: {
            allCategories: {
              ok: true,
              error: null,
              categories: [
                {
                  id: 1,
                  name: "Category 1",
                  coverImg: "coverImg",
                  slug: "category-1",
                  storeCount: 1,
                  __typename: "Category",
                },
              ],
            },
          },
        },
      },
    ];

    await waitFor(async () => {
      const { container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <Categories selected="category-1" />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(container.firstChild).toHaveClass("flex");
      // check Link
      expect(container.querySelector("a")).toHaveAttribute(
        "href",
        "/category/category-1"
      );
      // check selected
      expect(container.querySelector(".border-2")).toHaveClass(
        "border-amber-500"
      );
    });
  });
});

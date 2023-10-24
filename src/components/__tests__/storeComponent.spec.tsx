import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { StoreComponent } from "../storeComponent";

describe("<StoreComponent />", () => {
  it("renders OK with props", () => {
    const storeProps = {
      id: "1",
      coverImg: "testCoverImg",
      name: "testName",
      categoryName: "testCategoryName",
    };
    const { getByText, container } = render(
      <BrowserRouter>
        <StoreComponent {...storeProps} />
      </BrowserRouter>
    );
    getByText(storeProps.name);
    getByText(storeProps.categoryName);

    expect(container.firstChild).toHaveAttribute(
      "href",
      `/stores/${storeProps.id}`
    );
  });
});

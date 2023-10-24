import { render, RenderResult, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchStores } from "../searchStores";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useNavigate: () => {
      return mockUseNavigate;
    },
  };
});

describe("<SearchStores />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      renderResult = render(
        <BrowserRouter>
          <SearchStores />
        </BrowserRouter>
      );
    });
  });

  it("renders OK with props", () => {
    const { container } = renderResult;
    expect(container.firstChild).toHaveClass(
      "bg-purple-300 w-full py-24 flex items-center justify-center"
    );
    expect(container.querySelector("input")).toHaveClass(
      "input rounded-md border-0 w-3/4 md:w-3/12"
    );
    expect(container.querySelector("input")).toHaveAttribute(
      "placeholder",
      "Search Stores..."
    );
    expect(container.querySelector("input")).toHaveAttribute("type", "Search");
    expect(container.querySelector("input")).toHaveAttribute(
      "name",
      "searchTerm"
    );
  });

  it("call onSubmit with searchTerm", async () => {
    const { getByPlaceholderText } = renderResult;
    const input = getByPlaceholderText("Search Stores...");
    await waitFor(() => {
      userEvent.type(input, "test");
    });

    await waitFor(() => {
      expect(input).toHaveValue("test");
    });

    await waitFor(() => {
      userEvent.type(input, "{enter}");
    });

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith({
        pathname: "/search",
        search: `?term=test`,
      });
    });
  });
});

import { render, RenderResult, waitFor } from "../../test.utils";
import { Pagination } from "../pagination";

const mockPageProps = {
  page: 2,
  setPage: jest.fn(),
  totalPages: 3,
};

describe("<Pagination />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(<Pagination {...mockPageProps} />);
    });
  });

  it("should render OK", async () => {
    const { container, getByRole } = renderResult;

    expect(container.firstChild).toHaveClass(
      "grid grid-cols-3 text-center max-w-lg items-center mx-auto mt-10"
    );

    expect(container.querySelector("input")).toHaveClass("w-12 text-center");

    expect(container.querySelector("input")).toHaveAttribute(
      "value",
      mockPageProps.page.toString()
    );

    expect(container.querySelector("input")).toHaveAttribute("type", "number");

    expect(container.querySelector("span span")).toHaveClass(
      "text-center mx-2 "
    );

    expect(container.querySelector("span")).toHaveTextContent(
      mockPageProps.totalPages.toString()
    );

    expect(container.querySelector("span")).toHaveTextContent(`Page of 3`);

    expect(container.querySelector("button")).toHaveClass(
      "font-medium text-2xl focus:outline-none"
    );

    expect(container.querySelector("input")).toHaveAttribute(
      "value",
      mockPageProps.page.toString()
    );
  });
});

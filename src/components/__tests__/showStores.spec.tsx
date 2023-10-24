import { render } from "../../test.utils";
import { IShowStoresProps, ShowStores } from "../showStores";

let noStores: IShowStoresProps["stores"] = [];

const stores = [
  {
    id: 1,
    name: "test",
    coverImg: "testImg",
    category: {
      name: "testCategory",
    },
  },
  {
    id: 2,
    name: "test2",
    coverImg: "testImg2",
    category: {
      name: "testCategory2",
    },
  },
];

describe("<ShowStores />", () => {
  it("should render OK with no stores", () => {
    const { container } = render(<ShowStores stores={noStores} />);
    expect(container.firstChild).toHaveClass(
      "grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10"
    );
    expect(container.querySelector("h4")).toHaveTextContent(
      "Stores not found."
    );
  });

  it("should render OK with stores", () => {
    const { container } = render(<ShowStores stores={stores} />);
    expect(container.firstChild).toHaveClass(
      "grid md:grid-cols-3 gap-x-5 gap-y-7 mt-10"
    );
    expect(container.querySelectorAll("a").length).toBe(2);
  });
});

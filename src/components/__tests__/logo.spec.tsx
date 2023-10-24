import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Logo } from "../logo";
import rahLogo from "../../images/rahodes.svg";

describe("<Logo />", () => {
  it("renders OK with props", () => {
    const logoProps = {
      width: "w-12",
      margin: "mb-10",
      extra: "extra",
    };
    const { container, rerender } = render(
      <BrowserRouter>
        <Logo {...logoProps} />
      </BrowserRouter>
    );

    expect(container.firstChild).toHaveAttribute("href", "/");
    expect(container.querySelector("img")).toHaveAttribute("src", rahLogo);
    expect(container.querySelector("img")).toHaveAttribute("alt", "rahLogo");
    expect(container.querySelector("img")).toHaveClass(
      `${logoProps.width} ${logoProps.margin} ${logoProps.extra}`
    );

    rerender(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    expect(container.querySelector("img")).toHaveClass("w-52 mb-10");
  });
});

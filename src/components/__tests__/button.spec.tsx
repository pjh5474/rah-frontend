import { render, waitFor } from "@testing-library/react";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { Button, LogOutBtn } from "../button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const { getByText, rerender } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");

    rerender(<Button canClick={true} loading={true} actionText={"test"} />);
    getByText("Loading...");
  });

  it("should display loading", () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={true} actionText={"test"} />
    );
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});

describe("<LogOutBtn />", () => {
  it("should render OK", () => {
    render(<LogOutBtn />);
  });

  it("should log user out", () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, "location", {
      value: {
        reload: reloadMock,
      },
      writable: true,
    });

    localStorage.setItem(LOCALSTORAGE_TOKEN, "test");
    expect(localStorage.getItem(LOCALSTORAGE_TOKEN)).toBe("test");

    const { getByRole } = render(<LogOutBtn />);
    const button = getByRole("button");
    expect(button).toHaveClass("m-4");
    button.click();
    expect(localStorage.getItem(LOCALSTORAGE_TOKEN)).toBe(null);
    expect(reloadMock).toHaveBeenCalled();
  });
});

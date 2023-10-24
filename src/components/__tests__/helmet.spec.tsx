import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { SetHelmet } from "../helmet";

describe("<SetHelmet />", () => {
  it("renders OK with title", async () => {
    const helmetTitle = "test";
    render(
      <HelmetProvider>
        <SetHelmet helmetTitle={helmetTitle} />
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe(`${helmetTitle} | RAH`);
    });
  });
});

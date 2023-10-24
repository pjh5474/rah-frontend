import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";
import { Header } from "../header";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    username: "username",
                    email: "email",
                    role: "Client",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText("Please verify your email.");
    });
  });

  it("renders without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "email",
                    username: "username",
                    role: "Client",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText("Please verify your email.")).toBeNull();
    });
  });
});

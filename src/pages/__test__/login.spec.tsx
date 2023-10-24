import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { Login, LOGIN_MUTATION } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { LOCALSTORAGE_TOKEN } from "../../constants";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Log In | RAH");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(email, "invalid");
    });

    await waitFor(() => {
      const emailValidationError = getByRole("alert");
      expect(emailValidationError).toHaveTextContent(
        /please enter a valid email/i
      );
    });

    await waitFor(() => {
      userEvent.clear(email);
    });

    await waitFor(() => {
      const emailRequiredError = getByRole("alert");
      expect(emailRequiredError).toHaveTextContent(/email is required/i);
    });
  });

  it("displays password required errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    await waitFor(() => {
      userEvent.type(email, "real@email.com");
    });

    await waitFor(() => {
      userEvent.click(submitBtn);
    });

    await waitFor(() => {
      const passwordRequiredError = getByRole("alert");
      expect(passwordRequiredError).toHaveTextContent(/password is required/i);
    });

    await waitFor(() => {
      userEvent.type(password, "1");
    });

    await waitFor(() => {
      const passwordMinLengthError = getByRole("alert");
      expect(passwordMinLengthError).toHaveTextContent(
        /password must be more than 1 chars./i
      );
    });
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: "mutation-error",
        },
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        loginInput: {
          email: formData.email,
          password: formData.password,
        },
      });
    });

    await waitFor(() => {
      const errorMessage = getByRole("alert");
      expect(errorMessage).toHaveTextContent(/mutation-error/i);
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCALSTORAGE_TOKEN,
        "XXX"
      );
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});

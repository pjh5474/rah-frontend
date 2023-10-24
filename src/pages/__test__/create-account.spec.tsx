import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "../../test.utils";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
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

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Sign In | RAH");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    userEvent.type(email, "invalid");

    await waitFor(() => {
      const emailValidationError = getByRole("alert");
      expect(emailValidationError).toHaveTextContent(
        /please enter a valid email/i
      );
    });

    userEvent.clear(email);

    await waitFor(() => {
      const emailRequiredError = getByRole("alert");
      expect(emailRequiredError).toHaveTextContent(/email is required/i);
    });
  });

  it("displays password errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const password = getByPlaceholderText("Password");
    const passwordConfirm = getByPlaceholderText("PasswordConfirm");

    userEvent.type(password, "1");

    await waitFor(() => {
      const passwordMinLengthError = getByRole("alert");
      expect(passwordMinLengthError).toHaveTextContent(
        /password must be more than 2 chars./i
      );
    });

    userEvent.clear(password);

    await waitFor(() => {
      const passwordRequiredError = getByRole("alert");
      expect(passwordRequiredError).toHaveTextContent(/password is required/i);
    });

    userEvent.type(password, "123");
    userEvent.type(passwordConfirm, "1234");

    await waitFor(() => {
      const passwordMatchError = getByRole("alert");
      expect(passwordMatchError).toHaveTextContent("Passwords do not match.");
    });
  });

  it("displays username errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const username = getByPlaceholderText("Username");

    userEvent.type(username, "1");

    await waitFor(() => {
      const usernameMinLengthError = getByRole("alert");
      expect(usernameMinLengthError).toHaveTextContent(
        /username must be more than 2 chars./i
      );
    });

    userEvent.clear(username);

    await waitFor(() => {
      const usernameRequiredError = getByRole("alert");
      expect(usernameRequiredError).toHaveTextContent(/username is required/i);
    });
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText("Email");
    const password = getByPlaceholderText("Password");
    const passwordConfirm = getByPlaceholderText("PasswordConfirm");
    const username = getByPlaceholderText("Username");
    const submitBtn = getByRole("button");

    const formData = {
      email: "user@email.com",
      password: "123",
      passwordConfirm: "123",
      username: "username",
      role: "Client",
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });

    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedMutationResponse
    );

    jest.spyOn(window, "alert").mockImplementation(() => null);

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.type(passwordConfirm, formData.passwordConfirm);
    userEvent.type(username, formData.username);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          role: formData.role,
        },
      });
      expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now!");
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/");

      const mutationError = getByRole("alert");
      expect(mutationError).toHaveTextContent("mutation-error");
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

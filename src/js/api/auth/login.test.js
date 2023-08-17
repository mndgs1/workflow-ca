import { login } from "./login.js";
import localStorageMock from "../../../../mocks/localStorage.mock.js";
import userMock from "../../../../mocks/user.mock.js";

const USER_DATA = userMock;

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue(USER_DATA),
});

global.localStorage = localStorageMock;

global.fetch = mockFetchSuccess;

describe("login", () => {
  it("returns a user object if the call is successful", async () => {
    const data = await login({});
    expect(data).toEqual(USER_DATA);
  });
  it("Added an access token to localStorage", async () => {
    await login({});
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify(USER_DATA.accessToken),
    );
  });
});

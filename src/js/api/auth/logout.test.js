import { logout } from "./logout";
import localStorageMock from "../../../../mocks/localStorage.mock";

global.localStorage = localStorageMock;

describe("logout", () => {
  it("deletes the token from the browser storage", () => {
    logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});

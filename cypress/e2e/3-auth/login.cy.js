describe("Login Page", () => {
  it("Logins with valid inputs", () => {
    // visit home page
    cy.visit("http://localhost:8080/");

    //Waits for the Register modal to appear
    cy.wait(1000);

    // find the Login link in the menu
    cy.get(`#registerForm [data-auth="login"]`)
      .contains("Login")
      .should("exist");

    // Click the Login button
    cy.get(`#registerForm [data-auth="login"]`).contains("Login").click();

    //Waits for the Login modal to appear
    cy.wait(1000);

    // finds the login button in the login form
    cy.get(`#loginForm [type="submit"]`).contains("Login").should("exist");

    // enters valid email into the email input
    cy.get(`#loginForm #loginEmail`).type("MinBan66364@stud.noroff.no");

    // enters passwrd into the password input
    cy.get(`#loginForm #loginPassword`).type("Test1234");

    // Click the Login button
    cy.get(`#loginForm [type="submit"]`).contains("Login").click();
  });

  it("Logins with email that does not follow the pattern", () => {
    // visit home page
    cy.visit("http://localhost:8080/");

    //Waits for the Register modal to appear
    cy.wait(500);

    // find the Login link in the menu
    cy.get(`#registerForm [data-auth="login"]`)
      .contains("Login")
      .should("exist");

    // Click the Login button
    cy.get(`#registerForm [data-auth="login"]`).contains("Login").click();

    //Waits for the Login modal to appear
    cy.wait(500);

    // finds the login button in the login form
    cy.get(`#loginForm [type="submit"]`).contains("Login").should("exist");

    // enters email that does not follow the pattern into the email input
    cy.get(`#loginForm #loginEmail`).type("test@test.test");

    // enters passwrd into the password input
    cy.get(`#loginForm #loginPassword`).type("Test1234");

    // Click the Login button
    cy.get(`#loginForm [type="submit"]`).contains("Login").click();

    //Waits for the message to appear
    cy.wait(500);
  });

  it("Logins with email that follows the pattern, but is not in the DB", () => {
    // visit home page
    cy.visit("http://localhost:8080/");

    //Waits for the Register modal to appear
    cy.wait(500);

    // find the Login link in the menu
    cy.get(`#registerForm [data-auth="login"]`)
      .contains("Login")
      .should("exist");

    // Click the Login button
    cy.get(`#registerForm [data-auth="login"]`).contains("Login").click();

    //Waits for the Login modal to appear
    cy.wait(500);

    // finds the login button in the login form
    cy.get(`#loginForm [type="submit"]`).contains("Login").should("exist");

    // enters email that does follow the pattern, but is not in the DB. into the email input
    cy.get(`#loginForm #loginEmail`).type("MinBan123123@stud.noroff.no");

    // enters passwrd into the password input
    cy.get(`#loginForm #loginPassword`).type("Test1234");

    // Click the Login button
    cy.get(`#loginForm [type="submit"]`).contains("Login").click();

    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "login",
    );

    cy.wait("@login");

    // Intercept the window.alert method
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    //checks if the message appears
    cy.get("@windowAlert").should("exist");

    //checks if there is a logout button
    cy.get(".btn").contains("Logout").should("exist");
  });
});

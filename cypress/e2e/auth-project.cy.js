describe("Assignment 4 Auth and Project Flow", () => {
  const uniqueEmail = `test${Date.now()}@test.com`;
  const password = "123456";

  it("Sign Up, Sign In, Add project, Edit project, and Sign out", () => {
    // Sign Up
    cy.visit("http://localhost:5173/signup");

    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type(password);

    cy.contains("button", "Sign Up").click();
    cy.url().should("include", "/signin");

    // Sign In
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type(password);

    cy.contains("button", "Sign In").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.contains("Logout").should("exist");

    // Add one project
    cy.visit("http://localhost:5173/projects");

    cy.get('input[name="title"]').should("exist").type("Cypress Project");
    cy.get('input[name="completion"]').type("2026-04-10");
    cy.get('textarea[name="description"]').type("Created by Cypress test");

    cy.contains("button", "Add Project").click();
    cy.contains("Project added successfully!").should("exist");
    cy.contains("Cypress Project").should("exist");

    // Edit one project
    cy.contains("button", "Edit").first().click();
    cy.get('input[name="title"]').clear().type("Updated Cypress Project");
    cy.contains("button", "Update Project").click();

    cy.contains("Project updated successfully!").should("exist");
    cy.contains("Updated Cypress Project").should("exist");

    // Sign out
    cy.visit("http://localhost:5173/");
    cy.contains("Logout").click();
    cy.url().should("include", "/signin");
    cy.contains("Sign In").should("exist");
  });
});
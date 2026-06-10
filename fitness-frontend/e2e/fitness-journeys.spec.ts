import { expect, Page, test } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel(/^Password$/).fill("Password1!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
};

test("user can register a new account", async ({ page }) => {
  await page.goto("/auth/register");
  await page.getByLabel("First name").fill("Test");
  await page.getByLabel("Last name").fill("User");
  await page.getByLabel("Email").fill("test.user@example.com");
  await page.getByLabel(/^Password$/).fill("Password1!");
  await page.getByLabel("Confirm password").fill("Password1!");
  await page.getByLabel(/I agree to the terms/i).check();
  await page.getByRole("button", { name: /create account/i }).click();

  await expect(page.getByText(/registration successful/i)).toBeVisible();
});

test("user can log in and is redirected to dashboard", async ({ page }) => {
  await login(page);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("user can log an activity and see it in the recent list", async ({ page }) => {
  await login(page);
  await page.goto("/dashboard/activities");

  await page.getByRole("button", { name: /select hiking activity/i }).click();
  await page.getByLabel(/Duration/i).fill("77");
  await page.getByLabel(/Calories burned/i).fill("999");
  await page.getByRole("button", { name: /log activity/i }).click();

  await expect(page.getByText("HIKING").first()).toBeVisible();
  await expect(page.getByText("999 kcal").first()).toBeVisible();
});

test("user can generate and view an AI recommendation", async ({ page }) => {
  await login(page);
  await page.goto("/dashboard/recommendations");

  await page.getByRole("button", { name: /generate new recommendations/i }).click();
  await page.getByRole("button", { name: /view details/i }).first().click();

  await expect(page.getByRole("heading", { name: /recommendation detail/i })).toBeVisible();
});

test("user can update their profile and see changes reflected", async ({ page }) => {
  await login(page);
  await page.goto("/dashboard/profile");

  await page.getByLabel("First name").fill("Updated");
  await page.getByLabel("Last name").fill("Member");
  await page.getByRole("button", { name: /save changes/i }).click();

  await expect(page.getByText(/Updated Member/i)).toBeVisible();
});

test("unauthenticated user accessing /dashboard is redirected to login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/auth\/login/);

  await context.close();
});

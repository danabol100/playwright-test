import { test, expect } from "@playwright/test";

test.describe("тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });
  test("Проверка отображения элементов Heder", async ({ page }) => {
    test.step("Проверка отображения лого Playwraight logo", async () => {
      await expect(
        page.getByRole("link", { name: "Playwright logo Playwright" }),
      ).toBeVisible();
    });
    await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "MCP", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "CLI", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "API" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Node.js" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "GitHub repository" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Discord server" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Switch between dark and light" }),
    ).toBeVisible();
    console.log(
      await page.locator("button").evaluateAll((buttons) =>
        buttons.map((button) => ({
          text: button.textContent?.trim(),
          ariaLabel: button.getAttribute("aria-label"),
          title: button.getAttribute("title"),
        })),
      ),
    );
    await expect(
      page.getByRole("button", { name: "Search (Meta+k)" }),
    ).toBeVisible();
  });

  test("Проверка названия элемента Heder", async ({ page }) => {
    await expect(
      page.getByRole("navigation", { name: "Main" }).locator("b"),
    ).toContainText("Playwright");

    await expect(page.getByRole("navigation", { name: "Main" })).toContainText(
      "Docs",
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toContainText(
      "CLI",
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toContainText(
      "API",
    );
    await expect(page.getByRole("navigation", { name: "Main" })).toContainText(
      "Node.js",
    );
  });

  test("Проверка атребута href элементов навигации Heder", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    ).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs/intro",
    );
    await expect(
      page.getByRole("link", { name: "MCP", exact: true }),
    ).toHaveAttribute("href", "/mcp/introduction");
    await expect(
      page.getByRole("link", { name: "CLI", exact: true }),
    ).toHaveAttribute("href", "/agent-cli/introduction");
    await expect(page.getByRole("link", { name: "API" })).toHaveAttribute(
      "href",
      "/docs/api/class-playwright",
    );

    await expect(
      page.getByRole("link", { name: "GitHub repository" }),
    ).toHaveAttribute("href", "https://github.com/microsoft/playwright");
    await expect(
      page.getByRole("link", { name: "Discord server" }),
    ).toHaveAttribute("href", "https://aka.ms/playwright/discord");
  });
  test("Проверка переключения лайт мода", async ({ page }) => {
    await page.getByLabel("Switch between dark and light").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
  test("Проверка заголовка страницы ", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    ).toContainText(
      "Playwright enables reliable web automation for testing, scripting, and AI agents.",
    );
  });
  test("Проверка кнопки get start ", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();

    await expect(page.getByRole("banner")).toContainText("Get started");
  });
});

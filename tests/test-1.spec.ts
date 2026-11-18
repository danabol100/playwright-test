import { test, expect, Locator, Page } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo",
    text: "Playwright",
    attribute: {
      type: "href",
      value: "/",
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "Docs" }),
    name: "Docs",
    text: "Docs",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "MCP", exact: true }),
    name: "MCP",
    attribute: {
      type: "href",
      value: "/mcp/introduction",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "CLI", exact: true }),
    name: "CLI",
    text: "CLI",
    attribute: {
      type: "href",
      value: "/agent-cli/introduction",
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "API" }),
    name: "API",
    text: "API",
    attribute: {
      type: "href",
      value: "/docs/api/class-playwright",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Node.js" }),
    name: "Node.js",
    text: "Node.js",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "GitHub repository" }),
    name: "GitHub repository",
    attribute: {
      type: "href",
      value: "https://github.com/microsoft/playwright",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Discord server" }),
    name: "Discord server",
    attribute: {
      type: "href",
      value: "https://aka.ms/playwright/discord",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Switch between dark and light" }),
    name: "Switch between dark and light",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: /Search \((Meta|Control)\+k\)/ }),
    name: "Search",
  },
];

test.describe("тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });
  test("Проверка отображения элементов Heder", async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    });
  });

  test("Проверка названия элемента Heder", async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test("Проверка атребута href элементов навигации Heder", async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`проверка атрмута ${attribute.type} элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(
            attribute.type,
            attribute.value,
          );
        });
      }
    });
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

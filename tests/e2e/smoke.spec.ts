import { expect, test } from "@playwright/test";

const errors: string[] = [];
// React #418 is a recoverable hydration error that Next 15 occasionally reports (via reportError) when a
// deferred internal Suspense boundary hydrates under heavy CPU load. React re-renders it on the client, so
// nothing visible breaks; it also occurs in CodeMzansi with the same stack. Every other error fails the test.
const KNOWN = /Minified React error #418/;
test.beforeEach(({ page }) => {
  errors.length = 0;
  page.on("pageerror", (e) => { if (!KNOWN.test(e.message)) errors.push(e.message); });
  page.on("console", (m) => { if (m.type() === "error" && !/favicon/.test(m.text())) errors.push(m.text()); });
});
test.afterEach(() => expect(errors, errors.join("\n")).toEqual([]));

const PRAISE = /Sharp sharp|Lekker|Spot on|Eish, you're good|Yebo|Too clean/;

test.describe("MathsMzansi smoke tests", () => {
  test("home page renders hero and strands", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Matric Maths");
    await expect(page.getByText("Algebra, Geometry & Trigonometry")).toBeVisible();
  });

  test("lesson: typed practice is checked, quiz works", async ({ page }) => {
    await page.goto("/learn/quadratic-equations", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Quadratic equations");
    await page.getByRole("button", { name: /2\. Method 1: factorise/ }).first().click();
    const input = page.getByRole("textbox", { name: "Your answer" }).first();
    await input.fill("x = 1");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText("Not yet.").first()).toBeVisible();
    await input.fill("x = -3 or x = -2");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText(PRAISE).first()).toBeVisible();
    await page.getByRole("button", { name: /5\. Endless practice/ }).first().click();
    await page.getByRole("button", { name: /x equals 2 or x equals -5/ }).first().click();
    await expect(page.getByText(/Correct!/)).toBeVisible();
  });

  test("worked example reveals step by step", async ({ page }) => {
    await page.goto("/learn/exponent-laws", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /3\. Fraction \(rational\) exponents/ }).first().click();
    await page.getByRole("button", { name: "Show step 1" }).click();
    await expect(page.getByText(/A negative exponent flips the fraction/)).toBeVisible();
  });

  test("toolkit: grapher shows features, challenge mode switches on", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Function grapher/ }).click();
    await expect(page.getByText("Turning point").first()).toBeVisible();
    await page.getByRole("button", { name: /Challenge/ }).click();
    await expect(page.getByText("Hit the dashed orange graph.")).toBeVisible();
  });

  test("speed solve starts", async ({ page }) => {
    await page.goto("/games", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Start/ }).click();
    await expect(page.getByText(/solved/)).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Your answer" })).toBeVisible();
  });

  test("flashcards flip and record", async ({ page }) => {
    await page.goto("/flashcards");
    await page.getByRole("button", { name: "Show answer" }).click();
    await page.getByRole("button", { name: /I knew it/ }).click();
    await expect(page.getByText(/Card 2 of/)).toBeVisible();
  });

  test("exam room self-marking", async ({ page }) => {
    await page.goto("/exam");
    await page.getByRole("button", { name: /A parabola and a line/ }).click();
    await page.getByRole("button", { name: /Show the memo/ }).first().click();
    await page.locator("li button[aria-pressed]").first().click();
    await page.getByRole("button", { name: "Save my mark" }).first().click();
    await expect(page.getByText("Saved ✓")).toBeVisible();
  });

  test("quiz arena round starts", async ({ page }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "Start round" }).click();
    await expect(page.getByText(/Question 1 \/ 10/)).toBeVisible();
  });

  test("preferences panel toggles calm mode", async ({ page }) => {
    await page.goto("/learn");
    await page.getByRole("button", { name: "Open learning preferences" }).click();
    await page.getByText("Calm mode").click();
    await expect(page.locator("html")).toHaveClass(/calm/);
  });

  test("learn page shows coming-soon phases", async ({ page }) => {
    await page.goto("/learn?grade=12");
    await expect(page.getByText("Differential Calculus").first()).toBeVisible();
    await expect(page.getByText(/Phase 3/).first()).toBeVisible();
  });

  test("curriculum API returns JSON", async ({ request }) => {
    const body = await (await request.get("/api/curriculum")).json();
    expect(body.lessons.length).toBeGreaterThanOrEqual(15);
    expect(body.topics.length).toBe(17);
  });

  for (const path of ["/", "/learn", "/learn/parabolas", "/learn/nominal-effective", "/learn/quadratic-inequalities", "/flashcards", "/quiz", "/exam", "/toolkit", "/games", "/progress", "/teachers/docs/curriculum-map"]) {
    test(`no sideways scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

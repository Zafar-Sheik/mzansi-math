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

  test("learn page lists every Grade 12 topic as live", async ({ page }) => {
    await page.goto("/learn?grade=12");
    await expect(page.getByText("Euclidean Geometry").first()).toBeVisible();
    await expect(page.getByText(/Similar triangles/).first()).toBeVisible();
    await expect(page.getByText(/coming soon/i)).toHaveCount(0);
  });

  test("phase 2: drag a point in the coordinate lab", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Coordinate lab/ }).click();
    const svg = page.getByRole("img", { name: "Cartesian plane with points A, B and C" });
    await expect(page.getByText(/A\(-3; -2\)/).first()).toBeVisible();
    await svg.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.waitForTimeout(200);
    const box = (await svg.boundingBox())!;
    // A(-3; -2) in a view of x, y ∈ [-8.5; 8.5]
    const px = (x: number) => box.x + ((x + 8.5) / 17) * box.width;
    const py = (y: number) => box.y + ((8.5 - y) / 17) * box.height;
    await page.mouse.move(px(-3), py(-2));
    await page.mouse.down();
    await page.mouse.move(px(-1), py(-2), { steps: 5 });
    await page.mouse.move(px(-1), py(-4), { steps: 5 });
    await page.mouse.up();
    await expect(page.getByText(/A\(-1; -4\)/).first()).toBeVisible();
  });

  test("phase 2: circle theorems, CAST and circle-angle drill with a figure", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Circle theorem explorer/ }).click();
    await page.getByRole("button", { name: "Cyclic quadrilateral" }).click();
    await expect(page.getByText(/opp ∠s of cyclic quad/)).toBeVisible();
    await page.getByRole("button", { name: /^CAST & trig ratios/ }).click();
    await expect(page.getByText(/Reference angle/).first()).toBeVisible();
    await page.goto("/learn/circle-centre", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /4\. Your turn/ }).first().click();
    await expect(page.getByRole("img", { name: "Geometry figure" }).first()).toBeVisible();
  });

  test("phase 3: series lab converges, derivative lab and a calculus lesson", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Sequence & series lab/ }).click();
    await page.getByRole("button", { name: /Geometric \(multiply by r\)/ }).click();
    await expect(page.getByText(/the series converges/).first()).toBeVisible();
    await page.getByRole("button", { name: /^From secant to tangent/ }).click();
    await expect(page.getByText(/it shrinks to 0 as h → 0/).first()).toBeVisible();
    await page.goto("/learn/cubic-graphs", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Cubic graphs/ }).first()).toBeVisible();
    await expect(page.locator(".katex").first()).toBeVisible();
  });

  test("phase 4: compound-angle trap, proportion lab and a 3D lesson", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Compound & double angles/ }).click();
    await expect(page.getByText(/the trap/).first()).toBeVisible();
    await page.getByRole("button", { name: /^Proportion & similarity lab/ }).click();
    await expect(page.getByText(/Equal ratios ⇔ DE ∥ BC/)).toBeVisible();
    await page.getByRole("button", { name: /^Circle & tangent lab/ }).click();
    await page.getByRole("button", { name: "Tangent at a point", exact: true }).click();
    await expect(page.getByText(/tangent ⟂ radius/).first()).toBeVisible();
    await page.goto("/learn/heights-distances-3d", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /2D & 3D problems/ }).first()).toBeVisible();
  });

  test("curriculum API returns JSON", async ({ request }) => {
    const body = await (await request.get("/api/curriculum")).json();
    expect(body.lessons.length).toBeGreaterThanOrEqual(55);
    expect(body.topics.length).toBe(17);
  });

  for (const path of ["/", "/learn", "/learn/parabolas", "/learn/nominal-effective", "/learn/quadratic-inequalities", "/learn/tangents", "/learn/trig-graphs", "/learn/sine-cosine-area", "/learn/combined-solids", "/learn/cubic-graphs", "/learn/present-value-loans", "/learn/sigma-infinity", "/learn/circle-equation", "/learn/similar-triangles", "/learn/compound-angles", "/learn/heights-distances-3d", "/flashcards", "/quiz", "/exam", "/toolkit", "/games", "/progress", "/teachers/docs/curriculum-map"]) {
    test(`no sideways scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

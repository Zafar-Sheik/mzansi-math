import type { Lesson } from "../types";

const m = String.raw;

export const G12_ANALYTICAL: Lesson[] = [
  {
    slug: "circle-equation",
    topic: "g12-analytical",
    order: 1,
    title: "The equation of a circle",
    tagline: "Pythagoras, wrapped all the way round a centre.",
    emoji: "🎯",
    caps: "CAPS Gr 12 · Analytical geometry: the equation of a circle with centre the origin and with any centre (a; b); completing the square to find the centre and radius from the general form.",
    objectives: [
      "Derive the equation of a circle from the distance formula",
      "Write the equation of a circle with centre (a; b) and radius r",
      "Find the centre and radius from the general form by completing the square",
      "Decide whether a point lies on, inside or outside a circle",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Circle, centre the origin", def: m`$x^2 + y^2 = r^2$ – every point $(x;\ y)$ is a distance $r$ from $(0;\ 0)$.` },
      { term: "Circle, centre (a; b)", def: m`$(x - a)^2 + (y - b)^2 = r^2$. Watch the signs: $(x + 3)^2$ means $a = -3$.` },
      { term: "General form", def: m`$x^2 + y^2 + Dx + Ey + F = 0$ – the expanded equation. Complete the square to get the centre and radius back.` },
      { term: "Completing the square (circles)", def: m`Add $\left(\frac{\text{coefficient of } x}{2}\right)^2$ and $\left(\frac{\text{coefficient of } y}{2}\right)^2$ to both sides.` },
      { term: "Inside / on / outside", def: m`Compare the distance from the centre to the point with $r$: less → inside, equal → on, greater → outside.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "A cell tower's reach",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A cell tower at the origin covers everything within 5 km. Which houses get signal? A house at $(x;\ y)$ is exactly on the edge when its distance from the tower is 5:
$$\sqrt{x^2 + y^2} = 5 \quad\Rightarrow\quad x^2 + y^2 = 25$$
That's the equation of a circle – it's just the distance formula, squared.` },
          { type: "widget", widget: "circle-lab", props: { mode: "equation" } },
          { type: "callout", variant: "exam", md: m`Grade 12 analytical geometry (circles and tangents) is about 40 of the 150 marks in Paper 2 – together with the Grade 11 work on lines. It's one of the most reliable places to score.` },
        ],
      },
      {
        id: "origin",
        title: "Centre at the origin",
        minutes: 7,
        blocks: [
          { type: "text", md: m`A point $P(x;\ y)$ is on the circle with centre $O(0;\ 0)$ and radius $r$ exactly when $OP = r$:
$$\sqrt{(x - 0)^2 + (y - 0)^2} = r \quad\Rightarrow\quad x^2 + y^2 = r^2$$` },
          {
            type: "worked",
            title: "Through a given point",
            problem: m`Determine the equation of the circle with centre the origin that passes through $(-3;\ 4)$.`,
            steps: [
              { md: m`$r^2 = (-3)^2 + 4^2 = 25$`, why: "The radius is the distance from the centre to the point – you don't even need the square root." },
              { md: m`$x^2 + y^2 = 25$` },
            ],
          },
          {
            type: "practice",
            id: "origin-practice",
            problems: [
              { q: m`The circle $x^2 + y^2 = r^2$ passes through $(5;\ -12)$. Determine $r^2$.`, answer: "169", solution: m`$$r^2 = 5^2 + (-12)^2 = 25 + 144 = 169$$` },
              { q: m`Determine the radius of $x^2 + y^2 = 48$ in simplest surd form.`, answer: "4sqrt(3)", form: "simplified-surd", solution: m`$$r = \sqrt{48} = \sqrt{16 \times 3} = 4\sqrt{3}$$` },
              { q: m`The point $(k;\ 3)$ lies on $x^2 + y^2 = 34$. Determine the possible values of $k$.`, answer: "5; -5", kind: "set", solution: m`$$k^2 + 9 = 34 \Rightarrow k^2 = 25 \Rightarrow k = \pm 5$$` },
            ],
          },
        ],
      },
      {
        id: "any-centre",
        title: "Any centre (a; b)",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Move the centre to $M(a;\ b)$. The distance from $M$ to $P(x;\ y)$ is still $r$:
$$(x - a)^2 + (y - b)^2 = r^2$$` },
          { type: "callout", variant: "mistake", md: m`The signs inside the brackets are the **opposite** of the centre's coordinates. $(x + 4)^2 + (y - 1)^2 = 9$ has centre $(-4;\ 1)$, not $(4;\ -1)$. And the radius is $3$, not $9$!` },
          {
            type: "worked",
            title: "Centre and a point on the circle",
            problem: m`A circle has centre $M(2;\ -1)$ and passes through $P(5;\ 3)$. Determine its equation.`,
            steps: [
              { md: m`$r^2 = MP^2 = (5 - 2)^2 + (3 - (-1))^2 = 9 + 16 = 25$` },
              { md: m`$(x - 2)^2 + (y + 1)^2 = 25$`, why: m`$y - (-1) = y + 1$.` },
            ],
          },
          {
            type: "worked",
            title: "A diameter's endpoints",
            problem: m`$A(-1;\ 2)$ and $B(5;\ 10)$ are the endpoints of a diameter. Determine the equation of the circle.`,
            steps: [
              { md: m`Centre = midpoint of $AB$: $M\left(\frac{-1 + 5}{2};\ \frac{2 + 10}{2}\right) = M(2;\ 6)$`, why: "The centre is halfway along any diameter." },
              { md: m`$r^2 = MA^2 = (2 - (-1))^2 + (6 - 2)^2 = 9 + 16 = 25$` },
              { md: m`$(x - 2)^2 + (y - 6)^2 = 25$` },
            ],
          },
          {
            type: "practice",
            id: "any-centre-practice",
            problems: [
              { q: m`Write down the centre of $(x + 4)^2 + (y - 7)^2 = 20$.`, answer: "(-4; 7)", kind: "point", solution: m`Centre $(-4;\ 7)$ – the signs flip.` },
              { q: m`A circle has centre $(-3;\ 1)$ and passes through $(1;\ -2)$. Determine $r^2$.`, answer: "25", solution: m`$$r^2 = (1 - (-3))^2 + (-2 - 1)^2 = 16 + 9 = 25$$` },
              { q: m`Is the point $(4;\ 4)$ inside, on or outside the circle $(x - 1)^2 + (y - 2)^2 = 16$? Type the distance squared from the centre to the point.`, answer: "13", hint: "Compare (distance)² with r² = 16.", solution: m`$$(4 - 1)^2 + (4 - 2)^2 = 9 + 4 = 13 < 16$$ so the point is **inside** the circle.` },
            ],
          },
        ],
      },
      {
        id: "general-form",
        title: "From the general form",
        minutes: 9,
        blocks: [
          { type: "text", md: m`Exams often give the circle expanded: $x^2 + y^2 - 6x + 4y - 12 = 0$. To find the centre and radius, **complete the square** for $x$ and for $y$.` },
          {
            type: "worked",
            title: "Completing the square",
            problem: m`Determine the centre and radius of $x^2 + y^2 - 6x + 4y - 12 = 0$.`,
            steps: [
              { md: m`Group: $x^2 - 6x + y^2 + 4y = 12$`, why: "x-terms together, y-terms together, constant to the right." },
              { md: m`$x^2 - 6x + 9 + y^2 + 4y + 4 = 12 + 9 + 4$`, why: m`Half of $-6$ is $-3$, squared is $9$; half of $4$ is $2$, squared is $4$. Add to BOTH sides.` },
              { md: m`$(x - 3)^2 + (y + 2)^2 = 25$` },
              { md: m`Centre $(3;\ -2)$ and $r = 5$` },
            ],
          },
          {
            type: "sequence",
            id: "complete-square-circle",
            title: "Put the steps in order",
            steps: ["Move the constant to the right-hand side", "Group the x-terms and the y-terms", "Add (half the x-coefficient)² to both sides", "Add (half the y-coefficient)² to both sides", "Factorise into (x − a)² + (y − b)² = r²", "Read off the centre (a; b) and r"],
            explain: "Exactly the same as completing the square for a parabola – just done twice.",
          },
          {
            type: "practice",
            id: "general-form-practice",
            problems: [
              { q: m`Determine the centre of $x^2 + y^2 + 8x - 2y - 8 = 0$.`, answer: "(-4; 1)", kind: "point", hint: "Half of 8 is 4; half of −2 is −1.", solution: m`$$x^2 + 8x + 16 + y^2 - 2y + 1 = 8 + 16 + 1$$ $$(x + 4)^2 + (y - 1)^2 = 25$$ Centre $(-4;\ 1)$, $r = 5$.` },
              { q: m`Determine the radius of $x^2 + y^2 - 10y = 0$.`, answer: "5", solution: m`$$x^2 + y^2 - 10y + 25 = 25 \Rightarrow x^2 + (y - 5)^2 = 25 \Rightarrow r = 5$$` },
              { q: m`Determine the radius of $x^2 + y^2 + 2x + 6y - 8 = 0$ in simplest surd form.`, answer: "3sqrt(2)", form: "simplified-surd", solution: m`$$(x + 1)^2 + (y + 3)^2 = 8 + 1 + 9 = 18 \Rightarrow r = \sqrt{18} = 3\sqrt{2}$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["circle-centre-radius", "circle-point"], title: "Circle equation drill" } },
          { type: "keypoints", points: ["Centre at the origin: x² + y² = r².", "Centre (a; b): (x − a)² + (y − b)² = r² – the signs flip.", "General form → complete the square twice.", "The number on the right is r², not r."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "circle-equation-quiz",
            questions: [
              { q: m`The centre of $(x - 5)^2 + (y + 2)^2 = 49$ is…`, options: [m`$(-5;\ 2)$`, m`$(5;\ -2)$`, m`$(5;\ 2)$`, m`$(-5;\ -2)$`], answer: 1, explain: m`Flip the signs in the brackets: $a = 5$, $b = -2$.` },
              { q: m`The radius of $(x - 5)^2 + (y + 2)^2 = 49$ is…`, options: [m`$49$`, m`$24{,}5$`, m`$7$`, m`$\sqrt{7}$`], answer: 2, explain: m`$r^2 = 49$, so $r = 7$.` },
              { q: m`Which circle passes through the origin?`, options: [m`$x^2 + y^2 = 4$`, m`$(x - 3)^2 + (y - 4)^2 = 25$`, m`$(x - 1)^2 + y^2 = 4$`, m`$(x + 2)^2 + (y + 2)^2 = 4$`], answer: 1, explain: m`Substitute $(0;\ 0)$: $9 + 16 = 25$ ✓.` },
              { q: m`To complete the square for $x^2 - 8x$, add…`, options: [m`$8$`, m`$64$`, m`$16$`, m`$4$`], answer: 2, explain: m`$\left(\frac{-8}{2}\right)^2 = 16$.` },
              { q: m`The point $(2;\ 1)$ relative to $x^2 + y^2 = 4$ is…`, options: ["inside", "on", "outside"], answer: 2, explain: m`$2^2 + 1^2 = 5 > 4$, so it's further than $r$ from the centre.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "circle-tangents",
    topic: "g12-analytical",
    order: 2,
    title: "Tangents to a circle",
    tagline: "Perpendicular to the radius – that's the whole trick.",
    emoji: "📐",
    caps: "CAPS Gr 12 · Analytical geometry: the equation of a tangent to a circle at a given point on the circle; the length of a tangent from an external point.",
    objectives: [
      "Use tangent ⟂ radius to find the gradient of a tangent",
      "Determine the equation of the tangent at a point on a circle",
      "Find horizontal and vertical tangents",
      "Calculate the length of a tangent from a point outside the circle",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 65,
    terms: [
      { term: "Tangent", def: "A line that touches a circle at exactly one point (the point of contact)." },
      { term: "Tangent ⟂ radius", def: m`At the point of contact, $m_{\text{tangent}} \times m_{\text{radius}} = -1$.` },
      { term: "Equation of a tangent", def: m`Find $m_{\text{radius}}$, then $m_{\text{tangent}} = -\frac{1}{m_{\text{radius}}}$, then $y - y_1 = m(x - x_1)$ at the point of contact.` },
      { term: "Length of a tangent", def: m`From an external point $P$: $PT^2 = PM^2 - r^2$ (Pythagoras in $\triangle PTM$, right-angled at $T$).` },
      { term: "Horizontal/vertical tangents", def: m`A circle with centre $(a;\ b)$ and radius $r$ has tangents $y = b \pm r$ and $x = a \pm r$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Skimming the edge",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Swing a stone in a circle and let go – it flies off along the **tangent**, at right angles to the string. The same right angle is the key to every tangent question in Paper 2.` },
          { type: "widget", widget: "circle-lab", props: { mode: "tangent" } },
          { type: "callout", variant: "key", md: m`**Tangent ⟂ radius** at the point of contact (you proved this in Grade 11 Euclidean geometry). So the gradients multiply to $-1$.` },
        ],
      },
      {
        id: "tangent-equation",
        title: "The equation of a tangent",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Centre at the origin",
            problem: m`Determine the equation of the tangent to $x^2 + y^2 = 25$ at $P(3;\ 4)$.`,
            steps: [
              { md: m`$m_{OP} = \frac{4 - 0}{3 - 0} = \frac{4}{3}$`, why: "Gradient of the radius from the centre to the point of contact." },
              { md: m`$m_{\text{tan}} = -\frac{3}{4}$ (tan ⟂ radius)`, why: "Flip and change the sign." },
              { md: m`$y - 4 = -\frac{3}{4}(x - 3)$` },
              { md: m`$y = -\frac{3}{4}x + \frac{25}{4}$` },
            ],
          },
          {
            type: "worked",
            title: "Any centre",
            problem: m`Determine the equation of the tangent to $(x - 1)^2 + (y + 2)^2 = 13$ at $P(3;\ 1)$.`,
            steps: [
              { md: m`Centre $M(1;\ -2)$` },
              { md: m`$m_{MP} = \frac{1 - (-2)}{3 - 1} = \frac{3}{2}$` },
              { md: m`$m_{\text{tan}} = -\frac{2}{3}$` },
              { md: m`$y - 1 = -\frac{2}{3}(x - 3) \Rightarrow y = -\frac{2}{3}x + 3$` },
            ],
          },
          { type: "callout", variant: "tip", md: m`Check your answer: substitute $P$ into the tangent – it must satisfy it. For the last example: $-\frac{2}{3}(3) + 3 = 1$ ✓.` },
          {
            type: "practice",
            id: "tangent-eq-practice",
            problems: [
              { q: m`Determine the equation of the tangent to $x^2 + y^2 = 20$ at $(2;\ -4)$, in the form $y = mx + c$.`, answer: "x/2 - 5", kind: "expr", hint: "m_radius = −4/2 = −2.", solution: m`$$m_{OP} = -2 \Rightarrow m_{\text{tan}} = \tfrac{1}{2}$$ $$y + 4 = \tfrac{1}{2}(x - 2) \Rightarrow y = \tfrac{1}{2}x - 5$$` },
              { q: m`Determine the equation of the tangent to $(x + 2)^2 + (y - 1)^2 = 10$ at $(1;\ 2)$, in the form $y = mx + c$.`, answer: "-3x + 5", kind: "expr", solution: m`$$m_{MP} = \frac{2 - 1}{1 - (-2)} = \frac{1}{3} \Rightarrow m_{\text{tan}} = -3$$ $$y - 2 = -3(x - 1) \Rightarrow y = -3x + 5$$` },
            ],
          },
        ],
      },
      {
        id: "special",
        title: "Horizontal & vertical tangents",
        minutes: 6,
        blocks: [
          { type: "text", md: m`When the radius is vertical, the tangent is horizontal (and vice versa). For centre $(a;\ b)$ and radius $r$, the four "easy" tangents are
$$y = b + r,\quad y = b - r,\quad x = a + r,\quad x = a - r$$` },
          {
            type: "worked",
            title: "Parallel to the x-axis",
            problem: m`Determine the equations of the tangents to $(x - 3)^2 + (y + 1)^2 = 16$ that are parallel to the x-axis.`,
            steps: [
              { md: m`Centre $(3;\ -1)$, $r = 4$` },
              { md: m`$y = -1 + 4 = 3$ and $y = -1 - 4 = -5$`, why: "Go straight up and straight down by r from the centre." },
            ],
          },
          {
            type: "practice",
            id: "special-tangent-practice",
            problems: [
              { q: m`The lines $x = k$ are tangents to $(x + 2)^2 + (y - 5)^2 = 9$. Determine the values of $k$.`, answer: "1; -5", kind: "set", solution: m`Centre $(-2;\ 5)$, $r = 3$: $x = -2 + 3 = 1$ and $x = -2 - 3 = -5$.` },
              { q: m`A circle with centre $(4;\ 6)$ touches the x-axis. Determine its radius.`, answer: "6", hint: "Touching the x-axis means the x-axis is a horizontal tangent.", solution: m`The distance from the centre down to the x-axis is $6$, so $r = 6$.` },
            ],
          },
        ],
      },
      {
        id: "length",
        title: "Length of a tangent",
        minutes: 7,
        blocks: [
          { type: "text", md: m`From a point $P$ outside the circle, two tangents can be drawn, touching at $T$ and $S$. Since $MT \perp PT$, Pythagoras in $\triangle PTM$ gives
$$PT^2 = PM^2 - r^2$$` },
          {
            type: "widget",
            widget: "figure",
            props: { points: { M: [0, 0], T: [1.8, 2.4], S: [1.8, -2.4], P: [5, 0] }, circles: [{ centre: "M", r: 3 }], segments: [["P", "T"], ["P", "S"], ["M", "T"], { from: "M", to: "P", dashed: true }], angles: [{ at: "T", from: "M", to: "P", right: true }], caption: "PT = PS (tangents from a common point)." },
          },
          {
            type: "worked",
            title: "Length of a tangent",
            problem: m`Calculate the length of the tangent from $P(9;\ -2)$ to the circle $x^2 + y^2 - 4x + 6y - 12 = 0$.`,
            steps: [
              { md: m`$(x - 2)^2 + (y + 3)^2 = 25$: centre $M(2;\ -3)$, $r = 5$`, why: "Complete the square first." },
              { md: m`$PM^2 = (9 - 2)^2 + (-2 + 3)^2 = 49 + 1 = 50$` },
              { md: m`$PT^2 = 50 - 25 = 25 \Rightarrow PT = 5$` },
            ],
          },
          {
            type: "practice",
            id: "tangent-length-practice",
            problems: [
              { q: m`Calculate the length of the tangent from $P(7;\ 4)$ to $x^2 + y^2 = 16$.`, answer: "7", solution: m`$$PT^2 = (7^2 + 4^2) - 16 = 49 \Rightarrow PT = 7$$` },
              { q: m`Calculate the length of the tangent from $(5;\ 5)$ to $(x - 1)^2 + (y - 2)^2 = 5$, in simplest surd form.`, answer: "2sqrt(5)", form: "simplified-surd", solution: m`$$PM^2 = 16 + 9 = 25 \Rightarrow PT^2 = 25 - 5 = 20 \Rightarrow PT = 2\sqrt{5}$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["circle-tangent"], title: "Tangent drill" } },
          { type: "exam", question: { id: "circle-tangent-exam", q: m`The circle $x^2 + y^2 = 10$ has a tangent at $P(1;\ 3)$. Determine the equation of the tangent and the coordinates of the point where it cuts the x-axis.`, marks: 5, level: "routine", memo: [m`$m_{OP} = 3$`, m`$m_{\text{tan}} = -\frac{1}{3}$`, m`$y - 3 = -\frac{1}{3}(x - 1)$`, m`$y = -\frac{1}{3}x + \frac{10}{3}$`, m`$y = 0 \Rightarrow x = 10$: $(10;\ 0)$`] } },
          { type: "keypoints", points: ["Tangent ⟂ radius: m_tan × m_radius = −1.", "Always find the centre first (complete the square if needed).", "Horizontal tangents: y = b ± r. Vertical: x = a ± r.", "Length of tangent: PT² = PM² − r²."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "circle-tangents-quiz",
            questions: [
              { q: m`The radius to the point of contact has gradient $\frac{2}{5}$. The tangent's gradient is…`, options: [m`$\frac{2}{5}$`, m`$-\frac{2}{5}$`, m`$\frac{5}{2}$`, m`$-\frac{5}{2}$`], answer: 3, explain: m`Perpendicular: $-\frac{1}{2/5} = -\frac{5}{2}$.` },
              { q: m`Which is a tangent to $x^2 + y^2 = 9$?`, options: [m`$y = 9$`, m`$x = -3$`, m`$y = x$`, m`$x = 1$`], answer: 1, explain: m`$r = 3$, so $x = \pm 3$ and $y = \pm 3$ are tangents.` },
              { q: m`$PM = 13$ and $r = 5$. The tangent from $P$ has length…`, options: [m`$8$`, m`$12$`, m`$18$`, m`$\sqrt{194}$`], answer: 1, explain: m`$PT^2 = 169 - 25 = 144$.` },
              { q: "Two tangents from the same external point are…", options: ["perpendicular", "equal in length", "parallel", "always 90° apart"], answer: 1, explain: "Tangents from a common point are equal (Grade 11 theorem)." },
              { q: m`Before finding the tangent to $x^2 + y^2 - 2x + 4y = 20$, you should first…`, options: ["differentiate", "find the centre by completing the square", "find the y-intercept", "use the sine rule"], answer: 1, explain: "You need the centre to get the gradient of the radius." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "circles-and-lines",
    topic: "g12-analytical",
    order: 3,
    title: "Lines, circles & two circles",
    tagline: "Cut, touch or miss? Algebra decides.",
    emoji: "⭕",
    caps: "CAPS Gr 12 · Analytical geometry: points of intersection of a line and a circle; conditions for a line to be a tangent; the relative position of two circles (touching internally or externally, intersecting, separate).",
    objectives: [
      "Find where a line meets a circle by substitution",
      "Use the discriminant to decide if a line cuts, touches or misses a circle",
      "Compare the distance between centres with r₁ + r₂ and |r₁ − r₂|",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 65,
    terms: [
      { term: "Line meets circle", def: "Substitute the line into the circle, solve the quadratic: two, one or no solutions." },
      { term: "Tangent condition", def: m`The quadratic after substitution has $\Delta = 0$ (exactly one point of contact).` },
      { term: "Touch externally", def: m`Distance between centres $= r_1 + r_2$.` },
      { term: "Touch internally", def: m`Distance between centres $= |r_1 - r_2|$.` },
      { term: "Intersect at two points", def: m`$|r_1 - r_2| < d < r_1 + r_2$.` },
    ],
    chunks: [
      {
        id: "line-circle",
        title: "Where a line meets a circle",
        minutes: 9,
        blocks: [
          { type: "text", md: m`It's the Grade 11 "line meets parabola" method again: make $y$ the subject of the line, **substitute** into the circle, and solve the quadratic.` },
          {
            type: "worked",
            title: "Two points of intersection",
            problem: m`Determine where $y = x + 2$ meets $x^2 + y^2 = 10$.`,
            steps: [
              { md: m`$x^2 + (x + 2)^2 = 10$` },
              { md: m`$2x^2 + 4x - 6 = 0 \Rightarrow x^2 + 2x - 3 = 0$` },
              { md: m`$(x + 3)(x - 1) = 0 \Rightarrow x = -3$ or $x = 1$` },
              { md: m`$(-3;\ -1)$ and $(1;\ 3)$`, why: "Substitute back into the LINE (easier) to get y." },
            ],
          },
          {
            type: "worked",
            title: "When is the line a tangent?",
            problem: m`For which values of $k$ is $y = -x + k$ a tangent to $x^2 + y^2 = 8$?`,
            steps: [
              { md: m`$x^2 + (k - x)^2 = 8 \Rightarrow 2x^2 - 2kx + k^2 - 8 = 0$` },
              { md: m`Tangent ⇔ one point of contact ⇔ $\Delta = 0$`, why: "Two roots = cuts; one root = touches; no real roots = misses." },
              { md: m`$\Delta = 4k^2 - 8(k^2 - 8) = -4k^2 + 64 = 0$` },
              { md: m`$k = 4$ or $k = -4$` },
            ],
          },
          {
            type: "practice",
            id: "line-circle-practice",
            problems: [
              { q: m`Determine the x-coordinates of the points where $y = x - 1$ meets $x^2 + y^2 = 25$.`, answer: "4; -3", kind: "set", solution: m`$$x^2 + (x - 1)^2 = 25 \Rightarrow 2x^2 - 2x - 24 = 0 \Rightarrow x^2 - x - 12 = 0$$ $$(x - 4)(x + 3) = 0 \Rightarrow x = 4 \text{ or } x = -3$$` },
              { q: m`For which values of $k$ is $y = x + k$ a tangent to $x^2 + y^2 = 18$?`, answer: "6; -6", kind: "set", solution: m`$$2x^2 + 2kx + k^2 - 18 = 0$$ $$\Delta = 4k^2 - 8(k^2 - 18) = -4k^2 + 144 = 0 \Rightarrow k = \pm 6$$` },
            ],
          },
        ],
      },
      {
        id: "two-circles",
        title: "Two circles",
        minutes: 8,
        blocks: [
          { type: "text", md: m`For two circles, compare the distance $d$ between the centres with the radii:` },
          {
            type: "table",
            headers: ["Distance between centres", "The circles…"],
            rows: [[m`$d > r_1 + r_2$`, "are separate (no contact)"], [m`$d = r_1 + r_2$`, "touch externally"], [m`$|r_1 - r_2| < d < r_1 + r_2$`, "intersect at two points"], [m`$d = |r_1 - r_2|$`, "touch internally"], [m`$d < |r_1 - r_2|$`, "one is inside the other"]],
          },
          {
            type: "worked",
            title: "Do they touch?",
            problem: m`Show that $x^2 + y^2 = 4$ and $(x - 3)^2 + (y - 4)^2 = 9$ touch.`,
            steps: [
              { md: m`Centres $(0;\ 0)$ and $(3;\ 4)$; radii $2$ and $3$` },
              { md: m`$d = \sqrt{3^2 + 4^2} = 5$` },
              { md: m`$d = 2 + 3 = r_1 + r_2$, so they touch externally` },
            ],
          },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "two-circles-sort", title: "Separate, touching or intersecting?", buckets: ["Separate", "Touch externally", "Intersect", "Touch internally", "One inside"], colour: "var(--t-geometry)",
              items: [
                { text: m`$r_1 = 3,\ r_2 = 4,\ d = 7$`, bucket: "Touch externally" }, { text: m`$r_1 = 3,\ r_2 = 4,\ d = 5$`, bucket: "Intersect" },
                { text: m`$r_1 = 2,\ r_2 = 3,\ d = 9$`, bucket: "Separate" }, { text: m`$r_1 = 2,\ r_2 = 7,\ d = 1$`, bucket: "One inside" },
                { text: m`$r_1 = 6,\ r_2 = 2,\ d = 4$`, bucket: "Touch internally" }, { text: m`$r_1 = 5,\ r_2 = 5,\ d = 10$`, bucket: "Touch externally" },
                { text: m`$r_1 = 6,\ r_2 = 2,\ d = 6$`, bucket: "Intersect" }, { text: m`$r_1 = 1,\ r_2 = 1,\ d = 3$`, bucket: "Separate" },
              ],
            },
          },
          {
            type: "practice",
            id: "two-circles-practice",
            problems: [
              { q: m`Calculate the distance between the centres of $x^2 + y^2 - 2x - 4y = 4$ and $(x - 7)^2 + (y - 10)^2 = 49$.`, answer: "10", solution: m`$(x - 1)^2 + (y - 2)^2 = 9$: centre $(1;\ 2)$, $r = 3$. $$d = \sqrt{6^2 + 8^2} = 10 = 3 + 7$$ so the circles touch externally.` },
              { q: m`A circle with centre $(6;\ 8)$ touches $x^2 + y^2 = 25$ externally. Determine its radius.`, answer: "5", solution: m`$$d = \sqrt{36 + 64} = 10 = 5 + r \Rightarrow r = 5$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: ["Line and circle: substitute, then solve the quadratic.", "Tangent ⇔ Δ = 0.", "Two circles: compare d with r₁ + r₂ and |r₁ − r₂|."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "circles-lines-quiz",
            questions: [
              { q: "After substituting a line into a circle, Δ < 0. The line…", options: ["cuts the circle twice", "is a tangent", "misses the circle", "passes through the centre"], answer: 2, explain: "No real solutions means no points in common." },
              { q: m`Radii $4$ and $9$, centres $13$ apart. The circles…`, options: ["intersect", "touch externally", "touch internally", "are separate"], answer: 1, explain: m`$4 + 9 = 13$.` },
              { q: m`Radii $4$ and $9$, centres $5$ apart. The circles…`, options: ["touch internally", "intersect", "are separate", "touch externally"], answer: 0, explain: m`$9 - 4 = 5$.` },
              { q: m`$y = 5$ and $x^2 + y^2 = 25$…`, options: ["miss", "touch at $(0;\\ 5)$", "cut twice", "are parallel"], answer: 1, explain: m`$x^2 + 25 = 25 \Rightarrow x = 0$ only.` },
            ],
          },
        ],
      },
    ],
  },
];

import type { Lesson } from "../types";

const m = String.raw;

export const MEASUREMENT: Lesson[] = [
  {
    slug: "volume-surface-area",
    topic: "g11-measurement",
    order: 1,
    title: "Volume & surface area of solids",
    tagline: "Prisms, cylinders, pyramids, cones and spheres – formula sheet decoded.",
    emoji: "🧊",
    caps: "CAPS Gr 11 · Measurement: surface area and volume of right prisms, cylinders, right pyramids, right cones and spheres.",
    objectives: [
      "Choose and use the right volume and surface-area formula",
      "Find slant heights with Pythagoras",
      "Work backwards from a volume or area to a missing dimension",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Right prism / cylinder volume", def: m`$V = \text{area of base} \times h$; for a cylinder $V = \pi r^2 h$.` },
      { term: "Pyramid / cone volume", def: m`$V = \tfrac{1}{3} \times \text{area of base} \times h$; for a cone $V = \tfrac{1}{3}\pi r^2 h$.` },
      { term: "Sphere", def: m`$V = \tfrac{4}{3}\pi r^3$ and $SA = 4\pi r^2$.` },
      { term: "Cone surface area", def: m`$SA = \pi r^2 + \pi r s$, where $s$ is the slant height.` },
      { term: "Slant height", def: m`The distance from the apex down the side to the base edge. For a cone $s = \sqrt{r^2 + h^2}$ (Pythagoras).` },
      { term: "Perpendicular height", def: "The straight-down height from the apex to the base, at 90° to the base." },
    ],
    chunks: [
      {
        id: "hook",
        title: "How much ice cream?",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A cone of soft-serve, a JoJo water tank on a roof, a soccer ball, a pyramid-shaped tent – volume tells you how much fits **inside**, surface area tells you how much material covers the **outside** (paint, cardboard, fabric). The formulas are on the formula sheet in the exam – the skill is choosing and using them.` },
          { type: "widget", widget: "solid-viewer", props: { solid: "cone" } },
        ],
      },
      {
        id: "formulas",
        title: "The formula sheet, decoded",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["Solid", "Volume", "Total surface area"],
            rows: [
              ["Right prism", m`area of base × $h$`, "sum of all faces"],
              ["Cylinder", m`$\pi r^2 h$`, m`$2\pi r^2 + 2\pi r h$`],
              ["Right pyramid", m`$\tfrac{1}{3}$ × area of base × $h$`, m`area of base + $\tfrac{1}{2}$ × perimeter of base × slant height`],
              ["Right cone", m`$\tfrac{1}{3}\pi r^2 h$`, m`$\pi r^2 + \pi r s$`],
              ["Sphere", m`$\tfrac{4}{3}\pi r^3$`, m`$4\pi r^2$`],
            ],
          },
          {
            type: "worked",
            title: "A cone",
            problem: m`A solid cone has radius 3 cm and perpendicular height 4 cm. Find its volume and total surface area.`,
            steps: [
              { md: m`$V = \tfrac{1}{3}\pi(3)^2(4) = 12\pi = 37{,}70 \text{ cm}^3$` },
              { md: m`$s = \sqrt{3^2 + 4^2} = 5$ cm`, why: "The height, radius and slant height make a right-angled triangle." },
              { md: m`$SA = \pi(3)^2 + \pi(3)(5) = 24\pi = 75{,}40 \text{ cm}^2$` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Using the **perpendicular** height where the formula needs the **slant** height (cone and pyramid surface areas), or vice versa (volumes). Draw the right-angled triangle inside the solid every time.` },
          {
            type: "practice",
            id: "solid-practice",
            problems: [
              { q: m`A soccer ball has radius 11 cm. Calculate its surface area, correct to two decimal places.`, answer: "1520.53", tol: 0.011, solution: m`$$SA = 4\pi(11)^2 = 1520{,}53 \text{ cm}^2$$` },
              { q: m`A square pyramid has base side 6 m and perpendicular height 4 m. Calculate its volume.`, answer: "48", solution: m`$$V = \tfrac{1}{3}(6)^2(4) = 48 \text{ m}^3$$` },
              { q: m`For the same pyramid (base 6 m, height 4 m), calculate the total surface area.`, answer: "96", hint: "Slant height of each face: √(4² + 3²).", solution: m`$$h_s = \sqrt{4^2 + 3^2} = 5 \qquad SA = 6^2 + 4 \times \tfrac{1}{2}(6)(5) = 36 + 60 = 96 \text{ m}^2$$` },
              { q: m`A cylinder has volume $250\pi$ cm³ and radius 5 cm. Find its height.`, answer: "10", solution: m`$$\pi(5)^2 h = 250\pi \Rightarrow 25h = 250 \Rightarrow h = 10 \text{ cm}$$` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Endless practice & quick check",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["solid-measure"], title: "Volume & area drill" } },
          { type: "keypoints", points: ["Prism/cylinder: base × height. Pyramid/cone: ⅓ × base × height.", "Surface area of cones and pyramids uses the SLANT height.", "Pythagoras links r, h and s.", "Keep π in your calculator; round at the end."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "solid-quiz",
            questions: [
              { q: "A cone and a cylinder have the same radius and height. The cone's volume is…", options: ["the same", "half", "a third", "double"], answer: 2, explain: m`$\tfrac{1}{3}\pi r^2 h$ vs $\pi r^2 h$.` },
              { q: m`The slant height of a cone with $r = 6$ and $h = 8$ is…`, options: ["14", "10", "48", "√28"], answer: 1, explain: m`$\sqrt{36 + 64} = 10$.` },
              { q: "Which formula gives the volume of a sphere?", options: [m`$4\pi r^2$`, m`$\tfrac{4}{3}\pi r^3$`, m`$\tfrac{1}{3}\pi r^3$`, m`$2\pi r^3$`], answer: 1, explain: m`$V = \tfrac{4}{3}\pi r^3$; $4\pi r^2$ is its surface area.` },
              { q: "Units of volume are…", options: ["cm", "cm²", "cm³", "cm⁴"], answer: 2, explain: "Volume multiplies three lengths: cubic units." },
              { q: "The surface area of a closed cylinder includes…", options: ["only the curved side", "two circles and the curved side", "one circle and the curved side", "three circles"], answer: 1, explain: m`$2\pi r^2$ (top and bottom) $+ 2\pi r h$ (curved side).` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "combined-solids",
    topic: "g11-measurement",
    order: 2,
    title: "Combined solids & scaling",
    tagline: "Silos, tanks and ice-cream cones – and what happens when you double everything.",
    emoji: "🏗️",
    caps: "CAPS Gr 11 · Measurement: volume and surface area of combined objects; the effect on volume and surface area when dimensions are multiplied by a constant factor k.",
    objectives: [
      "Split a combined object into simple solids",
      "Avoid double-counting surfaces that are hidden where solids join",
      "Use the scale-factor rules: area × k², volume × k³",
    ],
    styles: ["visual", "read-write"],
    xp: 60,
    terms: [
      { term: "Combined solid", def: "An object made of two or more simple solids, e.g. a cylinder with a cone on top." },
      { term: "Hidden faces", def: "Surfaces where two solids join are inside the object – don't include them in the surface area." },
      { term: "Hemisphere", def: m`Half a sphere: $V = \tfrac{2}{3}\pi r^3$; curved surface $2\pi r^2$.` },
      { term: "Scale factor k (area)", def: m`If every length is multiplied by $k$, surface area is multiplied by $k^2$.` },
      { term: "Scale factor k (volume)", def: m`If every length is multiplied by $k$, volume is multiplied by $k^3$.` },
    ],
    chunks: [
      {
        id: "combined",
        title: "Combined objects",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A farm silo in the Free State is a cylinder with a cone roof. A wafer cone with a scoop of ice cream is a cone with a hemisphere on top. To find their volume, **add the volumes of the parts**. For surface area, add only the surfaces you can **see** from outside.` },
          {
            type: "worked",
            title: "The silo",
            problem: m`A silo is a cylinder (radius 2 m, height 6 m) with a cone roof (height 1,5 m). Find (a) the volume (b) the area of the roof.`,
            steps: [
              { md: m`(a) $V = \pi(2)^2(6) + \tfrac{1}{3}\pi(2)^2(1{,}5) = 24\pi + 2\pi = 26\pi = 81{,}68 \text{ m}^3$` },
              { md: m`(b) $s = \sqrt{2^2 + 1{,}5^2} = 2{,}5$ m`, why: "Pythagoras again – the roof is the curved surface of the cone." },
              { md: m`Roof $= \pi r s = \pi(2)(2{,}5) = 5\pi = 15{,}71 \text{ m}^2$`, why: "No base circle – it's hidden where the roof sits on the cylinder." },
            ],
          },
          {
            type: "practice",
            id: "combined-practice",
            problems: [
              { q: m`An ice cream is a cone (radius 3 cm, height 12 cm) filled to the top, with a hemisphere of ice cream (radius 3 cm) on top. Find the total volume, correct to two decimals.`, answer: "169.65", tol: 0.011, solution: m`$$V = \tfrac{1}{3}\pi(3)^2(12) + \tfrac{2}{3}\pi(3)^3 = 36\pi + 18\pi = 54\pi = 169{,}65 \text{ cm}^3$$` },
              { q: m`A water tank is a cylinder (radius 1 m, height 2 m) with a hemisphere on top. Find its volume, correct to two decimals.`, answer: "8.38", tol: 0.011, solution: m`$$V = \pi(1)^2(2) + \tfrac{2}{3}\pi(1)^3 = \tfrac{8}{3}\pi = 8{,}38 \text{ m}^3$$` },
            ],
          },
        ],
      },
      {
        id: "scaling",
        title: "Multiplying dimensions by k",
        minutes: 7,
        blocks: [
          { type: "text", md: m`If you multiply **every** length by $k$:

- lengths × $k$
- surface area × $k^2$ (area is length × length)
- volume × $k^3$ (volume is length × length × length)` },
          { type: "widget", widget: "solid-viewer", props: { solid: "cylinder" } },
          {
            type: "worked",
            title: "Double the silo",
            problem: m`Every dimension of the silo above is doubled. What is the new volume?`,
            steps: [{ md: m`$V_{\text{new}} = 2^3 \times 26\pi = 208\pi = 653{,}45 \text{ m}^3$`, why: "Double the lengths → 8 times the volume, not double!" }],
          },
          { type: "callout", variant: "mistake", md: m`If only **one** dimension changes (e.g. only the height is doubled), the $k^3$ rule doesn't apply – recalculate with the formula. For a cylinder, doubling only $h$ doubles $V$; doubling only $r$ multiplies $V$ by 4.` },
          {
            type: "practice",
            id: "scale-practice",
            problems: [
              { q: m`A sphere has a surface area of 50 cm². Its radius is tripled. What is the new surface area?`, answer: "450", solution: m`$$50 \times 3^2 = 450 \text{ cm}^2$$` },
              { q: m`A box has volume 24 cm³. All its dimensions are halved. What is the new volume?`, answer: "3", solution: m`$$24 \times \left(\tfrac{1}{2}\right)^3 = 3 \text{ cm}^3$$` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Combined volume: add the parts.", "Combined surface area: only the outside faces.", "All lengths × k → area × k², volume × k³.", "One dimension changes → use the formula, not k³."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "combined-quiz",
            questions: [
              { q: "All the dimensions of a cone are multiplied by 3. Its volume is multiplied by…", options: ["3", "6", "9", "27"], answer: 3, explain: m`$3^3 = 27$.` },
              { q: "All dimensions of a sphere are doubled. Its surface area is multiplied by…", options: ["2", "4", "8", "16"], answer: 1, explain: m`Area scales with $k^2 = 4$.` },
              { q: "A cylinder with a cone on top: the surface area includes…", options: ["the base of the cone", "the top of the cylinder", "the cylinder's base, curved side and the cone's curved surface", "all circles"], answer: 2, explain: "The cone's base and the cylinder's top are joined – hidden inside." },
              { q: "Only the radius of a cylinder is doubled. The volume is multiplied by…", options: ["2", "4", "8", "1"], answer: 1, explain: m`$\pi(2r)^2 h = 4\pi r^2 h$.` },
            ],
          },
        ],
      },
    ],
  },
];

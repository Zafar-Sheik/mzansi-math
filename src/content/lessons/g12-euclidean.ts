import type { Lesson } from "../types";

const m = String.raw;

// ΔABC with DE ∥ BC, AD : DB = 2 : 3.
const tri = { A: [3, 6] as [number, number], B: [0, 0] as [number, number], C: [9, 0] as [number, number] };
const D: [number, number] = [1.8, 3.6], E: [number, number] = [5.4, 3.6];
// Right angle at A with altitude AD: BD = 4, DC = 9, AD = 6.
const rt = { A: [4, 6] as [number, number], B: [0, 0] as [number, number], C: [13, 0] as [number, number], D: [4, 0] as [number, number] };

export const G12_EUCLIDEAN: Lesson[] = [
  {
    slug: "proportionality",
    topic: "g12-euclidean",
    order: 1,
    title: "Ratio & the proportionality theorem",
    tagline: "Draw a line parallel to one side – the other two sides split in the same ratio.",
    emoji: "📏",
    caps: "CAPS Gr 12 · Euclidean geometry: revise ratio and proportion; areas of triangles with equal heights; the proportionality theorem (a line parallel to one side of a triangle divides the other two sides proportionally) and its converse; the midpoint theorem as a special case. Proof of the proportionality theorem.",
    objectives: [
      "Work with ratios like AD : DB and AD/AB",
      "Use: triangles with the same height have areas in the ratio of their bases",
      "Prove and apply the proportionality theorem and its converse",
      "Recognise the midpoint theorem as a special case",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Ratio", def: m`A comparison of two quantities, e.g. $AD : DB = 2 : 3$ means $\frac{AD}{DB} = \frac{2}{3}$ and $AD = \frac{2}{5}AB$.` },
      { term: "Equal heights → areas ∝ bases", def: m`Triangles with the same height have areas in the same ratio as their bases.` },
      { term: "Line ∥ one side of △", def: m`If $DE \parallel BC$ in $\triangle ABC$, then $\frac{AD}{DB} = \frac{AE}{EC}$. Reason: (line ∥ one side of △) or (prop theorem; DE ∥ BC).` },
      { term: "Converse", def: m`If $\frac{AD}{DB} = \frac{AE}{EC}$, then $DE \parallel BC$. Reason: (line divides two sides of △ in prop).` },
      { term: "Midpoint theorem", def: m`The line joining the midpoints of two sides of a triangle is parallel to the third side and half its length.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Slicing a triangle",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Roof trusses, the struts of a crane, a ramp with a support halfway up – builders use parallel cross-pieces all the time. A cross-piece parallel to the base always cuts the two sloping sides **in the same ratio**. Try it.` },
          { type: "widget", widget: "proportion-lab", props: { mode: "parallel" } },
          { type: "callout", variant: "exam", md: m`Grade 12 Euclidean geometry (proportionality and similarity) carries roughly 40 marks of Paper 2 together with the Grade 11 circle theorems. The proof of the proportionality theorem is examinable.` },
        ],
      },
      {
        id: "ratio-area",
        title: "Ratios and areas",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Two facts you'll lean on:

- $AD : DB = 2 : 3$ means $AD$ is 2 parts and $DB$ 3 parts, so $AB$ is 5 parts: $\frac{AD}{AB} = \frac{2}{5}$.
- **Triangles with the same height have areas in the ratio of their bases**, because area $= \frac{1}{2} \times \text{base} \times \text{height}$ and the heights cancel.` },
          {
            type: "worked",
            title: "Areas with a shared vertex",
            problem: m`In $\triangle ABC$, $D$ lies on $BC$ with $BD : DC = 2 : 5$. Find $\frac{\text{area } \triangle ABD}{\text{area } \triangle ADC}$ and $\frac{\text{area } \triangle ABD}{\text{area } \triangle ABC}$.`,
            steps: [
              { md: m`Both triangles have the same height from $A$ to $BC$.` },
              { md: m`$\frac{\text{area } \triangle ABD}{\text{area } \triangle ADC} = \frac{BD}{DC} = \frac{2}{5}$` },
              { md: m`$\frac{\text{area } \triangle ABD}{\text{area } \triangle ABC} = \frac{BD}{BC} = \frac{2}{7}$` },
            ],
          },
          {
            type: "practice",
            id: "ratio-practice",
            problems: [
              { q: m`$AD : DB = 3 : 4$ and $AB = 28$ cm. Calculate $AD$.`, answer: "12", solution: m`$$AD = \frac{3}{7} \times 28 = 12 \text{ cm}$$` },
              { q: m`$D$ lies on $BC$ of $\triangle ABC$ with $BD = 6$ and $DC = 9$. The area of $\triangle ABC$ is 60. Calculate the area of $\triangle ABD$.`, answer: "24", solution: m`Same height, so $$\text{area } \triangle ABD = \frac{6}{15} \times 60 = 24$$` },
            ],
          },
        ],
      },
      {
        id: "theorem",
        title: "The proportionality theorem",
        minutes: 9,
        blocks: [
          { type: "text", md: m`**Theorem:** a line drawn parallel to one side of a triangle divides the other two sides proportionally.` },
          { type: "widget", widget: "figure", props: { points: { ...tri, D, E }, segments: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"], { from: "B", to: "E", dashed: true }, { from: "C", to: "D", dashed: true }], caption: "Given DE ∥ BC. Construction: join BE and CD." } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`**Given:** $\triangle ABC$ with $D$ on $AB$, $E$ on $AC$ and $DE \parallel BC$. **Prove:** $\frac{AD}{DB} = \frac{AE}{EC}$.`,
            steps: [
              { md: m`Join $BE$ and $CD$.`, why: "Construction – write it down." },
              { md: m`$\frac{\text{area } \triangle ADE}{\text{area } \triangle BDE} = \frac{AD}{DB}$ (same height from $E$)` },
              { md: m`$\frac{\text{area } \triangle ADE}{\text{area } \triangle CED} = \frac{AE}{EC}$ (same height from $D$)` },
              { md: m`area $\triangle BDE$ = area $\triangle CED$ (same base $DE$, same height; $DE \parallel BC$)`, why: "Parallel lines are the same distance apart everywhere." },
              { md: m`$\therefore \frac{AD}{DB} = \frac{AE}{EC}$` },
            ],
          },
          {
            type: "worked",
            title: "Using it",
            problem: m`In $\triangle ABC$, $DE \parallel BC$ with $AD = 6$, $DB = 4$ and $AE = 9$. Calculate $EC$.`,
            steps: [
              { md: m`$\frac{AD}{DB} = \frac{AE}{EC}$ (line ∥ one side of △)` },
              { md: m`$\frac{6}{4} = \frac{9}{EC} \Rightarrow EC = 6$` },
            ],
          },
          { type: "callout", variant: "key", title: "The midpoint theorem is a special case", md: m`If $D$ and $E$ are midpoints, then $\frac{AD}{DB} = \frac{AE}{EC} = 1$, so $DE \parallel BC$ – and $DE = \frac{1}{2}BC$. Press "Midpoints" in the lab above.` },
        ],
      },
      {
        id: "practice",
        title: "Two parallel lines",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Chaining ratios",
            problem: m`In $\triangle ABC$, $D$ is on $AB$, $E$ on $AC$ and $F$ on $BC$, with $DE \parallel BC$ and $EF \parallel AB$. $AD : DB = 2 : 3$. Determine $CF : FB$.`,
            steps: [
              { md: m`$\frac{AE}{EC} = \frac{AD}{DB} = \frac{2}{3}$ (line ∥ one side of △; $DE \parallel BC$)` },
              { md: m`$\frac{CF}{FB} = \frac{CE}{EA} = \frac{3}{2}$ (line ∥ one side of △; $EF \parallel AB$)`, why: "Now look at △CAB with the line EF – start from vertex C." },
              { md: m`$CF : FB = 3 : 2$` },
            ],
          },
          {
            type: "practice",
            id: "prop-practice",
            problems: [
              { q: m`In $\triangle ABC$, $DE \parallel BC$ with $AD = 4$, $DB = 6$ and $AE = 5$. Calculate $EC$.`, answer: "15/2", solution: m`$$\frac{4}{6} = \frac{5}{EC} \Rightarrow EC = \frac{30}{4} = 7{,}5$$` },
              { q: m`In $\triangle ABC$, $DE \parallel BC$ with $AE : EC = 3 : 5$ and $AB = 24$. Calculate $AD$.`, answer: "9", solution: m`$$\frac{AD}{AB} = \frac{AE}{AC} = \frac{3}{8} \Rightarrow AD = \frac{3}{8} \times 24 = 9$$` },
              { q: m`In $\triangle PQR$, $S$ is on $PQ$ and $T$ on $PR$ with $PS = 4$, $SQ = 6$, $PT = 6$ and $TR = 9$. Calculate $\frac{PS}{SQ} - \frac{PT}{TR}$ (and decide whether $ST \parallel QR$).`, answer: "0", solution: m`$$\frac{4}{6} - \frac{6}{9} = \frac{2}{3} - \frac{2}{3} = 0$$ The ratios are equal, so $ST \parallel QR$ (line divides two sides of △ in prop).` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["proportion"], title: "Proportionality drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: ["Same height → areas in the ratio of the bases.", "DE ∥ BC ⇒ AD/DB = AE/EC (line ∥ one side of △).", "Converse: equal ratios ⇒ parallel.", "Midpoint theorem: DE ∥ BC and DE = ½BC."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "proportionality-quiz",
            questions: [
              { q: m`$AD : DB = 1 : 3$. Then $\frac{AD}{AB} = $`, options: [m`$\frac{1}{3}$`, m`$\frac{1}{4}$`, m`$\frac{3}{4}$`, m`$3$`], answer: 1, explain: m`$AB$ is $1 + 3 = 4$ parts.` },
              { q: "The proportionality theorem is proved using…", options: ["congruent triangles", "areas of triangles with equal heights", "the cosine rule", "the angle at the centre"], answer: 1, explain: "Compare areas, then use equal areas between parallel lines." },
              { q: m`$DE \parallel BC$, $AD = 3$, $DB = 6$, $AE = 4$. $EC = $`, options: [m`$2$`, m`$8$`, m`$4{,}5$`, m`$12$`], answer: 1, explain: m`$\frac{3}{6} = \frac{4}{EC} \Rightarrow EC = 8$.` },
              { q: "D and E are midpoints of AB and AC; BC = 18. DE = ", options: ["18", "36", "9", "6"], answer: 2, explain: "Midpoint theorem: DE = ½BC." },
              { q: "Which reason proves two lines are parallel?", options: ["(line ∥ one side of △)", "(line divides two sides of △ in prop)", "(|||△s)", "(tan ⊥ radius)"], answer: 1, explain: "That's the converse of the proportionality theorem." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "similar-triangles",
    topic: "g12-euclidean",
    order: 2,
    title: "Similar triangles",
    tagline: "Same shape, different size – and every side scales by the same k.",
    emoji: "🔺",
    caps: "CAPS Gr 12 · Euclidean geometry: similar polygons; equiangular triangles are similar and have sides in proportion (and the converse). Proof of the theorem. Riders using similarity.",
    objectives: [
      "Know the two conditions for similar polygons",
      "Prove triangles similar using the angles (∠∠∠)",
      "Write the proportional sides in the correct order",
      "Use similarity to calculate lengths and prove products like AB·CD = EF·GH",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Similar polygons", def: "Polygons with (1) all corresponding angles equal AND (2) all corresponding sides in the same proportion. For triangles, either condition is enough." },
      { term: "|||", def: m`The symbol for "is similar to". The order of the letters matters: $\triangle ABC \,|||\, \triangle DEF$ means $\hat{A} = \hat{D}$, $\hat{B} = \hat{E}$, $\hat{C} = \hat{F}$.` },
      { term: "Equiangular ⇒ similar", def: m`If two triangles are equiangular, their sides are in proportion: $\frac{AB}{DE} = \frac{BC}{EF} = \frac{AC}{DF}$. Reason: (∠∠∠) or (equiangular △s).` },
      { term: "Sides in proportion ⇒ similar", def: "If the three pairs of sides are in proportion, the triangles are equiangular. Reason: (sides of △ in prop)." },
      { term: "Scale factor k", def: m`Corresponding sides are multiplied by $k$; areas by $k^2$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Same shape",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`How tall is that tree? Measure its shadow, your own height and your shadow at the same time of day. The sun's rays make **similar triangles**: $\frac{\text{tree}}{\text{tree's shadow}} = \frac{\text{you}}{\text{your shadow}}$. That's how Thales measured the pyramids.` },
          { type: "widget", widget: "proportion-lab", props: { mode: "similar" } },
          { type: "callout", variant: "mistake", md: m`For **polygons** you need both: equal angles AND sides in proportion. A square and a long rectangle both have four $90^\circ$ angles – but they are not similar! For **triangles**, one condition guarantees the other.` },
        ],
      },
      {
        id: "theorem",
        title: "Equiangular triangles",
        minutes: 8,
        blocks: [
          { type: "text", md: m`**Theorem:** if two triangles are equiangular, their corresponding sides are in proportion (so the triangles are similar).

**Proof idea (examinable):** mark off $AG = DE$ on $AB$ and $AH = DF$ on $AC$. Then $\triangle AGH \equiv \triangle DEF$ (SAS), so $A\hat{G}H = \hat{E} = \hat{B}$, which makes $GH \parallel BC$ (corresponding ∠s equal). Now the proportionality theorem gives $\frac{AG}{AB} = \frac{AH}{AC}$, i.e. $\frac{DE}{AB} = \frac{DF}{AC}$.` },
          {
            type: "worked",
            title: "A line parallel to a side",
            problem: m`In $\triangle ABC$, $DE \parallel BC$ with $D$ on $AB$ and $E$ on $AC$. $AD = 4$, $AB = 10$ and $BC = 15$. Calculate $DE$.`,
            steps: [
              { md: m`In $\triangle ADE$ and $\triangle ABC$: $\hat{A}$ is common; $A\hat{D}E = \hat{B}$ (corr ∠s, $DE \parallel BC$)` },
              { md: m`$\therefore \triangle ADE \,|||\, \triangle ABC$ (∠∠∠)`, why: "Two angles equal means the third is equal too (∠ sum of △)." },
              { md: m`$\frac{DE}{BC} = \frac{AD}{AB} \Rightarrow \frac{DE}{15} = \frac{4}{10}$` },
              { md: m`$DE = 6$` },
            ],
          },
          { type: "callout", variant: "tip", title: "Writing the ratios", md: m`Write the triangles with matching angles in the same order: $\triangle A\,D\,E \,|||\, \triangle A\,B\,C$. Then the sides pair up automatically: $\frac{AD}{AB} = \frac{DE}{BC} = \frac{AE}{AC}$ – first-two letters, last-two letters, first-and-last.` },
          {
            type: "match",
            id: "similar-sides-match",
            title: "△PQR ||| △XYZ – match each side with its partner",
            pairs: [{ left: "PQ", right: "XY" }, { left: "QR", right: "YZ" }, { left: "PR", right: "XZ" }],
          },
        ],
      },
      {
        id: "riders",
        title: "Riders: prove, then use",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Proving a product",
            problem: m`Chords $AB$ and $CD$ of a circle intersect at $E$. Prove that $AE \cdot EB = CE \cdot ED$.`,
            steps: [
              { md: m`Join $AC$ and $DB$. In $\triangle AEC$ and $\triangle DEB$:` },
              { md: m`$\hat{A} = \hat{D}$ (∠s in same seg)` },
              { md: m`$A\hat{E}C = D\hat{E}B$ (vert opp ∠s)` },
              { md: m`$\therefore \triangle AEC \,|||\, \triangle DEB$ (∠∠∠)` },
              { md: m`$\therefore \frac{AE}{DE} = \frac{CE}{BE}$ $\Rightarrow AE \cdot EB = CE \cdot ED$`, why: "Cross-multiply. To prove a product, find the two triangles that contain those four sides." },
            ],
          },
          {
            type: "sequence",
            id: "similarity-proof-steps",
            title: "A similarity rider, in order",
            steps: ["Find the two triangles containing the sides you need", "Name them with matching angles in the same order", "Prove two pairs of angles equal (with reasons)", "Conclude the triangles are similar (∠∠∠)", "Write the equal ratios", "Cross-multiply or substitute"],
            explain: "From the product you must prove, work backwards to the triangles – then forwards with angles.",
          },
          {
            type: "practice",
            id: "similar-practice",
            problems: [
              { q: m`$\triangle ABC \,|||\, \triangle DEF$ with $AB = 6$, $BC = 8$ and $DE = 9$. Calculate $EF$.`, answer: "12", solution: m`$$\frac{EF}{BC} = \frac{DE}{AB} = \frac{9}{6} \Rightarrow EF = 12$$` },
              { q: m`A 1,6 m learner casts a 2 m shadow at the same time that a tree casts a 15 m shadow. How tall is the tree (in m)?`, answer: "12", solution: m`Similar triangles: $$\frac{h}{15} = \frac{1{,}6}{2} \Rightarrow h = 12 \text{ m}$$` },
              { q: m`Chords $AB$ and $CD$ intersect at $E$ with $AE = 4$, $EB = 6$ and $CE = 3$. Calculate $ED$.`, answer: "8", solution: m`$$AE \cdot EB = CE \cdot ED \Rightarrow 24 = 3 \cdot ED \Rightarrow ED = 8$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["similar-sides", "proportion"], title: "Similarity drill" } },
          { type: "exam", question: { id: "similar-exam", q: m`In $\triangle PQR$, $S$ lies on $PQ$ and $T$ on $PR$ such that $P\hat{S}T = \hat{R}$. Prove that $\triangle PST \,|||\, \triangle PRQ$ and hence that $PS \cdot PQ = PT \cdot PR$.`, marks: 5, level: "complex", memo: [m`$\hat{P}$ common`, m`$P\hat{S}T = \hat{R}$ (given)`, m`$\triangle PST \,|||\, \triangle PRQ$ (∠∠∠)`, m`$\frac{PS}{PR} = \frac{PT}{PQ}$ (|||△s)`, m`$PS \cdot PQ = PT \cdot PR$`] } },
          { type: "keypoints", points: ["Triangles: equal angles ⇔ sides in proportion.", "Name similar triangles in matching order.", "Areas scale by k².", "To prove a product: find two similar triangles holding those sides."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "similar-quiz",
            questions: [
              { q: "Two rectangles both have four 90° angles. They are…", options: ["always similar", "similar only if their sides are in proportion", "never similar", "congruent"], answer: 1, explain: "Polygons need equal angles AND proportional sides." },
              { q: m`$\triangle ABC \,|||\, \triangle KLM$. Which ratio is correct?`, options: [m`$\frac{AB}{KM} = \frac{BC}{LM}$`, m`$\frac{AB}{KL} = \frac{AC}{KM}$`, m`$\frac{AB}{LM} = \frac{BC}{KL}$`, m`$\frac{AC}{KL} = \frac{AB}{KM}$`], answer: 1, explain: "Match letters by position: A↔K, B↔L, C↔M." },
              { q: "The sides of similar triangles are in the ratio 1 : 3. The areas are in the ratio…", options: ["1 : 3", "1 : 6", "1 : 9", "1 : 27"], answer: 2, explain: "Areas scale by k² = 9." },
              { q: "Which reason proves triangles similar from angles?", options: ["(SAS)", "(∠∠∠)", "(RHS)", "(line ∥ one side of △)"], answer: 1, explain: "Equiangular triangles are similar." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "similarity-pythagoras",
    topic: "g12-euclidean",
    order: 3,
    title: "Right triangles & Pythagoras by similarity",
    tagline: "Drop a perpendicular from the right angle – and get three similar triangles for free.",
    emoji: "📐",
    caps: "CAPS Gr 12 · Euclidean geometry: the perpendicular from the vertex of the right angle to the hypotenuse divides the triangle into two triangles that are similar to each other and to the original triangle; proof of Pythagoras' theorem using similar triangles.",
    objectives: [
      "Prove that the altitude to the hypotenuse creates three similar triangles",
      "Use AB² = BD·BC, AC² = CD·CB and AD² = BD·DC",
      "Prove Pythagoras' theorem with similar triangles",
    ],
    styles: ["visual", "read-write"],
    xp: 65,
    terms: [
      { term: "Altitude to the hypotenuse", def: m`In $\triangle ABC$ with $\hat{A} = 90^\circ$ and $AD \perp BC$: $\triangle ABD \,|||\, \triangle CBA \,|||\, \triangle CAD$.` },
      { term: "AB² = BD · BC", def: m`From $\triangle ABD \,|||\, \triangle CBA$: $\frac{AB}{CB} = \frac{BD}{BA}$.` },
      { term: "AC² = CD · CB", def: m`From $\triangle CAD \,|||\, \triangle CBA$: $\frac{AC}{BC} = \frac{CD}{CA}$.` },
      { term: "AD² = BD · DC", def: m`From $\triangle ABD \,|||\, \triangle CAD$: $\frac{AD}{CD} = \frac{BD}{AD}$.` },
      { term: "Pythagoras by similarity", def: m`Add $AB^2 = BD \cdot BC$ and $AC^2 = CD \cdot BC$: $AB^2 + AC^2 = BC(BD + DC) = BC^2$.` },
    ],
    chunks: [
      {
        id: "three-triangles",
        title: "Three similar triangles",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "figure", props: { points: rt, segments: [["A", "B"], ["B", "C"], ["C", "A"], { from: "A", to: "D", colour: "var(--curve-2)" }], angles: [{ at: "A", from: "B", to: "C", right: true }, { at: "D", from: "A", to: "C", right: true }, { at: "B", from: "A", to: "C", label: "x" }, { at: "A", from: "D", to: "C", label: "x" }], sideLabels: [{ from: "B", to: "D", label: "4" }, { from: "D", to: "C", label: "9" }], caption: "Â = 90° and AD ⟂ BC." } },
          { type: "text", md: m`Call $\hat{B} = x$. Then $\hat{C} = 90^\circ - x$ (∠ sum in △ABC), and in $\triangle ADC$, $D\hat{A}C = 90^\circ - \hat{C} = x$. Every one of the three triangles has angles $x$, $90^\circ - x$ and $90^\circ$ – so they are **all similar**:
$$\triangle ABD \,|||\, \triangle CBA \,|||\, \triangle CAD$$` },
          {
            type: "worked",
            title: "Proving AB² = BD · BC",
            problem: m`In $\triangle ABC$, $\hat{A} = 90^\circ$ and $AD \perp BC$. Prove that $AB^2 = BD \cdot BC$.`,
            steps: [
              { md: m`In $\triangle ABD$ and $\triangle CBA$: $\hat{B}$ common; $A\hat{D}B = C\hat{A}B = 90^\circ$` },
              { md: m`$\therefore \triangle ABD \,|||\, \triangle CBA$ (∠∠∠)` },
              { md: m`$\frac{AB}{CB} = \frac{BD}{BA}$ (|||△s)`, why: "Match the order: A↔C, B↔B, D↔A." },
              { md: m`$\therefore AB^2 = BD \cdot BC$` },
            ],
          },
        ],
      },
      {
        id: "numbers",
        title: "Using the results",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "From BD and DC",
            problem: m`In the figure, $BD = 4$ and $DC = 9$. Calculate $AD$ and $AB$.`,
            steps: [
              { md: m`$AD^2 = BD \cdot DC = 4 \times 9 = 36 \Rightarrow AD = 6$` },
              { md: m`$AB^2 = BD \cdot BC = 4 \times 13 = 52 \Rightarrow AB = 2\sqrt{13}$` },
              { md: m`Check: $AB^2 = AD^2 + BD^2 = 36 + 16 = 52$ ✓`, why: "Pythagoras in △ABD agrees." },
            ],
          },
          {
            type: "practice",
            id: "pyth-sim-practice",
            problems: [
              { q: m`$\hat{A} = 90^\circ$, $AD \perp BC$, $BD = 3$ and $DC = 12$. Calculate $AD$.`, answer: "6", solution: m`$$AD^2 = BD \cdot DC = 36 \Rightarrow AD = 6$$` },
              { q: m`Same triangle ($BD = 3$, $DC = 12$). Calculate $AB$ in simplest surd form.`, answer: "3sqrt(5)", form: "simplified-surd", solution: m`$$AB^2 = BD \cdot BC = 3 \times 15 = 45 \Rightarrow AB = 3\sqrt{5}$$` },
              { q: m`$\hat{A} = 90^\circ$, $AD \perp BC$, $AB = 6$ and $BC = 9$. Calculate $BD$.`, answer: "4", solution: m`$$AB^2 = BD \cdot BC \Rightarrow 36 = 9 \cdot BD \Rightarrow BD = 4$$` },
            ],
          },
        ],
      },
      {
        id: "pythagoras",
        title: "Pythagoras, proved",
        minutes: 6,
        blocks: [
          {
            type: "worked",
            title: "Proof of Pythagoras (examinable)",
            problem: m`**Given:** $\triangle ABC$ with $\hat{A} = 90^\circ$. **Prove:** $BC^2 = AB^2 + AC^2$.`,
            steps: [
              { md: m`Draw $AD \perp BC$.`, why: "Construction." },
              { md: m`$\triangle ABD \,|||\, \triangle CBA$ (∠∠∠) $\Rightarrow AB^2 = BD \cdot BC$` },
              { md: m`$\triangle CAD \,|||\, \triangle CBA$ (∠∠∠) $\Rightarrow AC^2 = CD \cdot BC$` },
              { md: m`$AB^2 + AC^2 = BC(BD + CD) = BC \cdot BC = BC^2$` },
            ],
          },
          { type: "callout", variant: "memory", md: m`**"Side squared = adjacent piece × whole hypotenuse."** $AB^2 = BD \cdot BC$ (the piece next to $AB$), $AC^2 = CD \cdot CB$ (the piece next to $AC$). And the altitude: $AD^2 = $ piece × piece.` },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "exam", question: { id: "pyth-sim-exam", q: m`In $\triangle PQR$, $\hat{P} = 90^\circ$ and $PS \perp QR$. $QS = 5$ and $SR = 7{,}8$. Calculate $PS$ (correct to one decimal) and $PQ$.`, marks: 4, level: "routine", memo: [m`$PS^2 = QS \cdot SR = 39$`, m`$PS = 6{,}2$`, m`$PQ^2 = QS \cdot QR = 5 \times 12{,}8 = 64$`, m`$PQ = 8$`] } },
          { type: "keypoints", points: ["Altitude to the hypotenuse → three similar triangles.", "Side² = adjacent piece × hypotenuse.", "Altitude² = piece × piece.", "Adding the two side results proves Pythagoras."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "pyth-sim-quiz",
            questions: [
              { q: m`$\hat{A} = 90^\circ$, $AD \perp BC$, $BD = 2$, $DC = 8$. $AD = $`, options: [m`$16$`, m`$4$`, m`$\sqrt{10}$`, m`$5$`], answer: 1, explain: m`$AD^2 = 2 \times 8 = 16$.` },
              { q: m`With the same triangle, $AC^2 = $`, options: [m`$16$`, m`$64$`, m`$80$`, m`$20$`], answer: 2, explain: m`$AC^2 = CD \cdot CB = 8 \times 10 = 80$.` },
              { q: "How many similar triangles does the altitude create (including the original)?", options: ["2", "3", "4", "none"], answer: 1, explain: "△ABD, △CAD and △CBA." },
            ],
          },
        ],
      },
    ],
  },
];

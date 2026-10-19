import type { Lesson } from "../types";

const m = String.raw;

/** A point on a circle of radius 3 centred at the origin, at an angle in degrees. */
const on = (deg: number, r = 3): [number, number] => [Math.round(r * Math.cos((deg * Math.PI) / 180) * 1000) / 1000, Math.round(r * Math.sin((deg * Math.PI) / 180) * 1000) / 1000];
const circle = [{ centre: "O", r: 3 }];
const O: [number, number] = [0, 0];

// Two tangents from P with ∠APB = 48°: ∠AOB = 132°, OP = 3 / cos 66°.
const tA = on(204), tB = on(336), tP: [number, number] = [0, -7.376];

export const EUCLIDEAN: Lesson[] = [
  {
    slug: "circle-centre",
    topic: "g11-euclidean",
    order: 1,
    title: "Chords, centres & the angle at the centre",
    tagline: "Three theorems that unlock almost every circle question.",
    emoji: "⭕",
    caps: "CAPS Gr 11 · Euclidean geometry: the line from the centre perpendicular to a chord bisects the chord (and converses); the angle at the centre is twice the angle at the circumference; the angle in a semicircle. Proofs of theorems.",
    objectives: [
      "Use the language of circles: chord, arc, subtend, segment",
      "Apply and prove: the line from the centre ⟂ a chord bisects the chord",
      "Apply and prove: the angle at the centre = 2 × the angle at the circumference",
      "Use the angle in a semicircle",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Chord", def: "A straight line joining two points on a circle." },
      { term: "Diameter", def: "A chord through the centre – the longest chord, twice the radius." },
      { term: "Arc", def: "Part of the circumference between two points." },
      { term: "Subtend", def: "A chord or arc subtends an angle at a point when lines from its endpoints meet at that point." },
      { term: "Line from centre ⟂ to chord", def: "The perpendicular from the centre to a chord bisects the chord. Reason: (line from centre ⟂ to chord)." },
      { term: "∠ at centre = 2 × ∠ at circumference", def: "The angle an arc subtends at the centre is double the angle it subtends at the circumference." },
      { term: "∠ in semi-circle", def: "An angle subtended by a diameter at the circumference is 90°." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Speaking circle",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`The centre circle of the pitch at FNB Stadium, a pizza cut into slices, the spokes of a taxi wheel – circles are everywhere, and Euclidean geometry gives you the rules for every angle inside them. In Paper 2, circle geometry is worth a big chunk of the 50 marks for Euclidean geometry & measurement.` },
          {
            type: "widget",
            widget: "figure",
            props: { title: "The vocabulary", points: { O, A: on(200), B: on(320), C: on(100), D: on(280) }, circles: [...circle], segments: [["A", "B"], ["C", "D"], { from: "O", to: "A", dashed: true }], caption: "AB is a chord, CD is a diameter, OA is a radius. AB divides the circle into two segments." },
          },
          { type: "callout", variant: "exam", md: m`In geometry, every statement needs a **reason** in brackets, using the official abbreviations: e.g. $\hat{O}_1 = 2\hat{C}$ (∠ at centre = 2 × ∠ at circumference). A correct statement without a reason usually earns only half the marks.` },
        ],
      },
      {
        id: "chord",
        title: "Theorem 1: centre ⟂ chord",
        minutes: 8,
        blocks: [
          { type: "text", md: m`**Theorem:** the line drawn from the centre of a circle perpendicular to a chord bisects the chord.

**Converses:** the line from the centre to the midpoint of a chord is perpendicular to it; and the perpendicular bisector of a chord passes through the centre.` },
          { type: "widget", widget: "circle-theorems", props: { mode: "chord" } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`**Given:** circle with centre $O$, chord $AB$ and $OM \perp AB$. **Prove:** $AM = MB$.`,
            steps: [
              { md: m`Join $OA$ and $OB$.`, why: "A construction – write it down; it earns a mark." },
              { md: m`In $\triangle OMA$ and $\triangle OMB$: $OA = OB$ (radii); $OM = OM$ (common); $O\hat{M}A = O\hat{M}B = 90^\circ$ (given)` },
              { md: m`$\therefore \triangle OMA \equiv \triangle OMB$ (RHS)` },
              { md: m`$\therefore AM = MB$` },
            ],
          },
          { type: "widget", widget: "figure", props: { points: { O, A: on(210), B: on(330), M: [0, -1.5] }, circles: [...circle], segments: [["A", "B"], ["O", "M"], { from: "O", to: "A", dashed: true }, { from: "O", to: "B", dashed: true }], angles: [{ at: "M", from: "O", to: "B", right: true }], ticks: [{ from: "A", to: "M" }, { from: "M", to: "B" }] } },
          {
            type: "worked",
            title: "Pythagoras + the theorem",
            problem: m`A circle has radius 13 cm. A chord of length 24 cm is drawn. How far is the chord from the centre?`,
            steps: [
              { md: m`$AM = 12$ cm (line from centre ⟂ to chord)` },
              { md: m`$OM^2 = 13^2 - 12^2 = 25 \Rightarrow OM = 5$ cm (Pythagoras)` },
            ],
          },
          {
            type: "practice",
            id: "chord-practice",
            problems: [
              { q: m`A circle has radius 10 cm. A chord is 6 cm from the centre. How long is the chord?`, answer: "16", hint: "Half-chord² + 6² = 10²", solution: m`$$\text{half-chord} = \sqrt{10^2 - 6^2} = 8 \Rightarrow \text{chord} = 16 \text{ cm}$$` },
              { q: m`A chord of length 30 cm is 8 cm from the centre. Find the radius.`, answer: "17", solution: m`$$r = \sqrt{15^2 + 8^2} = \sqrt{289} = 17 \text{ cm}$$` },
            ],
          },
        ],
      },
      {
        id: "centre-angle",
        title: "Theorem 2: the angle at the centre",
        minutes: 9,
        blocks: [
          { type: "text", md: m`**Theorem:** the angle subtended by an arc at the centre of a circle is **double** the angle it subtends at any point on the circumference. Drag $C$ around – it always works.` },
          { type: "widget", widget: "circle-theorems", props: { mode: "centre" } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`**Given:** circle with centre $O$; arc $AB$ subtends $A\hat{O}B$ at the centre and $A\hat{C}B$ at the circumference. **Prove:** $A\hat{O}B = 2A\hat{C}B$.`,
            steps: [
              { md: m`Join $CO$ and produce it to $D$.`, why: "Construction." },
              { md: m`$OA = OC$ (radii) $\Rightarrow \hat{A} = \hat{C}_1$ (∠s opp equal sides)` },
              { md: m`$\hat{O}_1 = \hat{A} + \hat{C}_1 = 2\hat{C}_1$ (ext ∠ of Δ)` },
              { md: m`Similarly $\hat{O}_2 = 2\hat{C}_2$` },
              { md: m`$A\hat{O}B = \hat{O}_1 + \hat{O}_2 = 2(\hat{C}_1 + \hat{C}_2) = 2A\hat{C}B$` },
            ],
          },
          { type: "widget", widget: "figure", props: { points: { O, A: on(220), B: on(320), C: on(90), D: on(270) }, circles: [...circle], segments: [["C", "A"], ["C", "B"], ["O", "A"], ["O", "B"], { from: "C", to: "D", dashed: true }], angles: [{ at: "C", from: "A", to: "D", label: "1" }, { at: "C", from: "D", to: "B", label: "2" }, { at: "O", from: "A", to: "D", label: "1" }, { at: "O", from: "D", to: "B", label: "2" }] } },
          { type: "callout", variant: "key", title: "Bonus: the angle in a semicircle", md: m`If $AB$ is a diameter, $A\hat{O}B = 180^\circ$, so the angle at the circumference is $\frac{180^\circ}{2} = 90^\circ$. Reason: (∠ in semi-circle).` },
          { type: "widget", widget: "circle-theorems", props: { mode: "semicircle" } },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Every question comes with a diagram. Find the angle, then check the reason in the worked solution.` },
          { type: "widget", widget: "drill", props: { generators: ["circle-angle"], title: "Circle angle drill" } },
          { type: "keypoints", points: ["Centre ⟂ chord ⇔ bisects the chord – often used with Pythagoras.", "∠ at centre = 2 × ∠ at circumference (same arc!).", "∠ in a semicircle = 90°.", "Radii are equal → look for isosceles triangles."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "circle-centre-quiz",
            questions: [
              { q: m`An arc subtends $70^\circ$ at the circumference. At the centre it subtends…`, options: [m`$35^\circ$`, m`$70^\circ$`, m`$140^\circ$`, m`$110^\circ$`], answer: 2, explain: "∠ at centre = 2 × ∠ at circumference." },
              { q: "The angle in a semicircle is…", options: [m`$45^\circ$`, m`$90^\circ$`, m`$180^\circ$`, "depends on the circle"], answer: 1, explain: "The diameter subtends 180° at the centre, so 90° at the circumference." },
              { q: "Which reason proves two radii make an isosceles triangle?", options: ["(tan ⊥ radius)", "(radii)", "(∠s in same seg)", "(ext ∠ of Δ)"], answer: 1, explain: "OA = OB (radii), then the base angles are equal (∠s opp equal sides)." },
              { q: "The perpendicular bisector of any chord passes through…", options: ["the point of contact", "the centre", "the midpoint of the arc only", "nowhere special"], answer: 1, explain: "A converse of the centre ⟂ chord theorem." },
              { q: m`$O$ is the centre and $A\hat{O}B = 100^\circ$. Then $O\hat{A}B = $`, options: [m`$50^\circ$`, m`$40^\circ$`, m`$80^\circ$`, m`$100^\circ$`], answer: 1, explain: m`$\triangle OAB$ is isosceles (radii): $\frac{180^\circ - 100^\circ}{2} = 40^\circ$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cyclic-quads",
    topic: "g11-euclidean",
    order: 2,
    title: "Same segment & cyclic quadrilaterals",
    tagline: "Equal angles, supplementary angles – and how to prove a quad is cyclic.",
    emoji: "🔷",
    caps: "CAPS Gr 11 · Euclidean geometry: angles subtended by a chord in the same segment are equal; opposite angles of a cyclic quadrilateral are supplementary; the exterior angle of a cyclic quadrilateral; converses (proving a quadrilateral cyclic). Riders.",
    objectives: [
      "Use angles in the same segment",
      "Use the opposite and exterior angle properties of a cyclic quadrilateral",
      "Prove the opposite-angles theorem",
      "Prove that a quadrilateral is cyclic using the converses",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Segment", def: "The region between a chord and an arc. A chord splits a circle into two segments." },
      { term: "∠s in the same seg", def: "Angles subtended by the same chord (or arc) on the same side of it are equal." },
      { term: "Cyclic quadrilateral", def: "A quadrilateral with all four vertices on a circle." },
      { term: "Opp ∠s of cyclic quad", def: "Opposite angles of a cyclic quadrilateral add up to 180° (they are supplementary)." },
      { term: "Ext ∠ of cyclic quad", def: "The exterior angle of a cyclic quadrilateral equals the interior opposite angle." },
      { term: "Concyclic", def: "Points that lie on the same circle." },
    ],
    chunks: [
      {
        id: "same-segment",
        title: "Angles in the same segment",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Stand anywhere on the curved stand behind one goal and look at the two goalposts at the other end: the **angle** between the posts is the same from every seat on that arc. That's exactly this theorem – it's why seat position matters less than you'd think.` },
          { type: "text", md: m`**Theorem:** angles subtended by a chord in the **same segment** are equal. (Both are half the same angle at the centre.)` },
          { type: "widget", widget: "circle-theorems", props: { mode: "segment" } },
          { type: "callout", variant: "mistake", md: m`The two angles must be on the **same side** of the chord. If they're on opposite sides they add up to 180° instead (that's a cyclic quad!).` },
        ],
      },
      {
        id: "cyclic",
        title: "Cyclic quadrilaterals",
        minutes: 9,
        blocks: [
          { type: "text", md: m`**Theorem:** the opposite angles of a cyclic quadrilateral are supplementary: $\hat{A} + \hat{C} = 180^\circ$ and $\hat{B} + \hat{D} = 180^\circ$.

**Corollary:** the exterior angle of a cyclic quad equals the interior opposite angle.` },
          { type: "widget", widget: "circle-theorems", props: { mode: "cyclic" } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`**Given:** cyclic quadrilateral $ABCD$ in a circle with centre $O$. **Prove:** $\hat{A} + \hat{C} = 180^\circ$.`,
            steps: [
              { md: m`Join $OB$ and $OD$. Let $\hat{O}_1$ be the angle facing $\hat{A}$'s arc and $\hat{O}_2$ the reflex angle facing $\hat{C}$'s arc.`, why: "Construction." },
              { md: m`$\hat{O}_1 = 2\hat{A}$ and $\hat{O}_2 = 2\hat{C}$ (∠ at centre = 2 × ∠ at circumference)` },
              { md: m`$\hat{O}_1 + \hat{O}_2 = 360^\circ$ (∠s round a pt)` },
              { md: m`$2\hat{A} + 2\hat{C} = 360^\circ \Rightarrow \hat{A} + \hat{C} = 180^\circ$` },
            ],
          },
          { type: "widget", widget: "figure", props: { title: "Exterior angle", points: { A: on(130), B: on(210), C: on(300), D: on(40), E: [on(300)[0] + (on(300)[0] - on(40)[0]) * 0.45, on(300)[1] + (on(300)[1] - on(40)[1]) * 0.45] }, circles: [{ centre: [0, 0], r: 3 }], segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["C", "E"]], angles: [{ at: "C", from: "B", to: "E", label: "ext" }, { at: "A", from: "B", to: "D", label: "=" }], caption: "B̂CE = Â (ext ∠ of cyclic quad)" } },
          {
            type: "worked",
            title: "A quick rider",
            problem: m`$ABCD$ is a cyclic quadrilateral with $\hat{A} = 2x$ and $\hat{C} = x + 30^\circ$. Find $x$ and $\hat{A}$.`,
            steps: [
              { md: m`$2x + x + 30^\circ = 180^\circ$ (opp ∠s of cyclic quad)` },
              { md: m`$3x = 150^\circ \Rightarrow x = 50^\circ$, so $\hat{A} = 100^\circ$` },
            ],
          },
        ],
      },
      {
        id: "converses",
        title: "Proving a quadrilateral is cyclic",
        minutes: 6,
        blocks: [
          { type: "text", md: m`To prove $ABCD$ is cyclic, show ONE of:

1. A pair of opposite angles is supplementary (converse: opp ∠s of quad supp)
2. An exterior angle equals the interior opposite angle (converse: ext ∠ = int opp ∠)
3. A side subtends equal angles at the other two vertices (converse: ∠s in the same seg / line subtends equal ∠s)` },
          {
            type: "match",
            id: "converse-match",
            title: "Match the given fact to the reason that proves ABCD cyclic",
            pairs: [
              { left: m`$\hat{A} + \hat{C} = 180^\circ$`, right: "converse: opp ∠s of quad supp" },
              { left: m`$\hat{B}_{\text{ext}} = \hat{D}$`, right: "converse: ext ∠ = int opp ∠" },
              { left: m`$A\hat{C}B = A\hat{D}B$`, right: "converse: line subtends equal ∠s" },
            ],
          },
          { type: "callout", variant: "exam", md: m`When you need to prove something is cyclic, the question is usually set up so ONE of these three is quick to show. Find the angles first, then pick the converse that fits.` },
        ],
      },
      {
        id: "check",
        title: "Practice & quick check",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["circle-angle"], title: "Circle angle drill" } },
          { type: "keypoints", points: ["Same chord, same side → equal angles.", "Cyclic quad: opposite angles add to 180°.", "Exterior angle = interior opposite angle.", "Three converses prove a quad is cyclic."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cyclic-quiz",
            questions: [
              { q: m`In cyclic quad $PQRS$, $\hat{P} = 105^\circ$. Then $\hat{R} = $`, options: [m`$105^\circ$`, m`$75^\circ$`, m`$255^\circ$`, m`$52{,}5^\circ$`], answer: 1, explain: "Opposite angles are supplementary: 180° − 105° = 75°." },
              { q: m`The exterior angle at $C$ of cyclic quad $ABCD$ is $68^\circ$. Which angle is also $68^\circ$?`, options: [m`$\hat{B}$`, m`$\hat{D}$`, m`$\hat{A}$`, m`$\hat{C}$`], answer: 2, explain: "Ext ∠ = interior OPPOSITE angle, which is Â." },
              { q: m`$A\hat{C}B = 40^\circ$ and $D$ is on the same arc as $C$. $A\hat{D}B = $`, options: [m`$40^\circ$`, m`$80^\circ$`, m`$140^\circ$`, m`$20^\circ$`], answer: 0, explain: "∠s in the same seg are equal." },
              { q: "Which is NOT a way to prove a quadrilateral cyclic?", options: ["Opposite angles supplementary", "Exterior angle = interior opposite angle", "Opposite sides equal", "A side subtends equal angles at the other vertices"], answer: 2, explain: "Equal opposite sides proves a parallelogram, not a cyclic quad." },
              { q: "Which quadrilateral is always cyclic?", options: ["rhombus", "rectangle", "parallelogram", "kite"], answer: 1, explain: "A rectangle's opposite angles are both 90° – supplementary." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "tangents",
    topic: "g11-euclidean",
    order: 3,
    title: "Tangents & the tan-chord theorem",
    tagline: "Lines that just kiss the circle – and the angles they create.",
    emoji: "🎯",
    caps: "CAPS Gr 11 · Euclidean geometry: tangent ⟂ radius; two tangents from a common point are equal; the tan-chord theorem (angle between tangent and chord = angle in the alternate segment) and its converse. Riders.",
    objectives: [
      "Use: a tangent is perpendicular to the radius at the point of contact",
      "Prove and use: two tangents from a common point are equal",
      "Use and prove the tan-chord theorem",
      "Solve riders by combining several theorems",
    ],
    styles: ["visual", "read-write"],
    xp: 80,
    terms: [
      { term: "Tangent", def: "A line that touches a circle at exactly one point (the point of contact)." },
      { term: "Tan ⊥ radius", def: "A tangent is perpendicular to the radius at the point of contact." },
      { term: "Tans from common pt", def: "Two tangents drawn from the same outside point are equal in length." },
      { term: "Tan chord theorem", def: "The angle between a tangent and a chord equals the angle subtended by the chord in the alternate segment." },
      { term: "Alternate segment", def: "The segment on the OTHER side of the chord from the angle between the tangent and the chord." },
    ],
    chunks: [
      {
        id: "tan-radius",
        title: "Tangent ⟂ radius, equal tangents",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A bicycle wheel touches the road at exactly one point – the road is a **tangent** to the wheel, and the spoke to that point is perpendicular to the road. A belt running around two pulleys? Two tangents.` },
          { type: "text", md: m`- A tangent is **perpendicular** to the radius at the point of contact (tan ⊥ radius).
- Two tangents from the same outside point are **equal** (tans from common pt).` },
          {
            type: "worked",
            title: "Proof: tangents from a common point",
            problem: m`**Given:** $PA$ and $PB$ are tangents to the circle with centre $O$. **Prove:** $PA = PB$.`,
            steps: [
              { md: m`Join $OA$, $OB$ and $OP$.`, why: "Construction." },
              { md: m`$O\hat{A}P = O\hat{B}P = 90^\circ$ (tan ⊥ radius); $OA = OB$ (radii); $OP$ common` },
              { md: m`$\triangle OAP \equiv \triangle OBP$ (RHS) $\Rightarrow PA = PB$` },
            ],
          },
          { type: "widget", widget: "figure", props: { points: { O, A: tA, B: tB, P: tP }, circles: [...circle], segments: [["P", "A"], ["P", "B"], ["O", "A"], ["O", "B"], { from: "O", to: "P", dashed: true }], angles: [{ at: "A", from: "O", to: "P", right: true }, { at: "B", from: "O", to: "P", right: true }], ticks: [{ from: "P", to: "A" }, { from: "P", to: "B" }] } },
        ],
      },
      {
        id: "tan-chord",
        title: "The tan-chord theorem",
        minutes: 8,
        blocks: [
          { type: "text", md: m`**Theorem:** the angle between a tangent and a chord is equal to the angle that the chord subtends in the **alternate segment**. Move $B$ and $C$ below.` },
          { type: "widget", widget: "circle-theorems", props: { mode: "tangent" } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`**Given:** tangent $TA$ at $A$, chord $AB$, and $C$ on the circle in the alternate segment. **Prove:** $T\hat{A}B = A\hat{C}B$.`,
            steps: [
              { md: m`Draw diameter $AF$ and join $FB$.`, why: "Construction." },
              { md: m`$F\hat{A}T = 90^\circ$ (tan ⊥ radius) and $A\hat{B}F = 90^\circ$ (∠ in semi-circle)` },
              { md: m`$T\hat{A}B = 90^\circ - F\hat{A}B$ and $A\hat{F}B = 90^\circ - F\hat{A}B$ (sum of ∠s in Δ)` },
              { md: m`$\therefore T\hat{A}B = A\hat{F}B = A\hat{C}B$ (∠s in the same seg)` },
            ],
          },
          { type: "callout", variant: "memory", md: m`**"Tan-chord: look ACROSS the chord."** The equal angle is on the other side of the chord from the tangent angle – at the circumference, using the same chord.` },
        ],
      },
      {
        id: "riders",
        title: "Riders: putting it together",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "A classic rider",
            problem: m`$PA$ and $PB$ are tangents to the circle with centre $O$, $C$ is on the major arc, and $A\hat{P}B = 48^\circ$. Calculate (a) $P\hat{A}B$ (b) $A\hat{C}B$ (c) $A\hat{O}B$.`,
            steps: [
              { md: m`(a) $PA = PB$ (tans from common pt), so $P\hat{A}B = P\hat{B}A = \dfrac{180^\circ - 48^\circ}{2} = 66^\circ$ (∠s opp equal sides; sum of ∠s in Δ)` },
              { md: m`(b) $A\hat{C}B = P\hat{A}B = 66^\circ$ (tan chord theorem)` },
              { md: m`(c) $A\hat{O}B = 2 \times 66^\circ = 132^\circ$ (∠ at centre = 2 × ∠ at circumference)`, why: m`Check: in quad $OAPB$, $90^\circ + 90^\circ + 48^\circ + 132^\circ = 360^\circ$ ✓` },
            ],
          },
          { type: "widget", widget: "figure", props: { points: { O, A: tA, B: tB, P: tP, C: on(100) }, circles: [...circle], segments: [["P", "A"], ["P", "B"], ["A", "B"], ["C", "A"], ["C", "B"], { from: "O", to: "A", dashed: true }, { from: "O", to: "B", dashed: true }], angles: [{ at: "P", from: "A", to: "B", label: "48°" }] } },
          { type: "callout", variant: "tip", title: "Rider strategy", md: m`1. Mark everything you're given on the diagram (equal sides, tangents, right angles).
2. Look for **isosceles triangles** (radii, tangents from a point).
3. Look for **tangents** → tan ⊥ radius and tan-chord.
4. Look for **cyclic quads** and **same-segment** angles.
5. Write every statement with its reason.` },
          {
            type: "practice",
            id: "tangent-practice",
            problems: [
              { q: m`Two tangents from $P$ touch the circle at $A$ and $B$, and $P\hat{A}B = 70^\circ$. Calculate $A\hat{P}B$.`, answer: "40", hint: "PA = PB, so triangle PAB is isosceles.", solution: m`$P\hat{B}A = 70^\circ$ (∠s opp equal sides, PA = PB tans from common pt)
$$A\hat{P}B = 180^\circ - 140^\circ = 40^\circ$$` },
              { q: m`A tangent at $A$ makes an angle of $35^\circ$ with chord $AB$. What angle does $AB$ subtend at a point $C$ in the alternate segment?`, answer: "35", solution: m`$A\hat{C}B = 35^\circ$ (tan chord theorem)` },
              { q: m`$PA$ is a tangent at $A$ to a circle with centre $O$ and radius 5 cm. $OP = 13$ cm. Find $PA$.`, answer: "12", hint: "tan ⊥ radius gives a right angle at A.", solution: m`$O\hat{A}P = 90^\circ$ (tan ⊥ radius)
$$PA = \sqrt{13^2 - 5^2} = 12 \text{ cm}$$` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Tangent ⟂ radius at the point of contact.", "Tangents from one outside point are equal → isosceles triangle.", "Tan-chord: the angle equals the angle in the alternate segment.", "Riders: statement + reason for every step."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "tangent-quiz",
            questions: [
              { q: "The angle between a tangent and the radius at the point of contact is…", options: [m`$45^\circ$`, m`$90^\circ$`, m`$180^\circ$`, "it varies"], answer: 1, explain: "(tan ⊥ radius)" },
              { q: m`Tangents $PA$ and $PB$ give $\triangle PAB$ that is…`, options: ["equilateral", "isosceles", "right-angled", "scalene"], answer: 1, explain: "PA = PB (tans from common pt)." },
              { q: "The tan-chord theorem compares the tangent–chord angle with an angle…", options: ["at the centre", "in the alternate segment", "on the tangent", "in the same segment as the tangent angle"], answer: 1, explain: "It equals the angle the chord subtends on the OTHER side – the alternate segment." },
              { q: m`From $P$, tangents meet the circle at $A$ and $B$ with $A\hat{P}B = 60^\circ$. Then $A\hat{O}B$ ($O$ the centre) is…`, options: [m`$60^\circ$`, m`$120^\circ$`, m`$90^\circ$`, m`$300^\circ$`], answer: 1, explain: m`Quad $OAPB$: $360^\circ - 90^\circ - 90^\circ - 60^\circ = 120^\circ$.` },
              { q: "A line that meets a circle at exactly one point is a…", options: ["chord", "secant", "tangent", "diameter"], answer: 2, explain: "That's the definition of a tangent." },
            ],
          },
          { type: "exam", question: { id: "tangent-exam", q: m`$PA$ and $PB$ are tangents to a circle at $A$ and $B$, and $C$ is a point on the major arc $AB$. If $A\hat{C}B = 58^\circ$, calculate $A\hat{P}B$. Give reasons.`, marks: 4, level: "complex", memo: [m`$P\hat{A}B = 58^\circ$ (tan chord theorem)`, m`$P\hat{B}A = 58^\circ$ (∠s opp equal sides; PA = PB tans from common pt)`, m`$A\hat{P}B = 180^\circ - 116^\circ$ (sum of ∠s in Δ)`, m`$A\hat{P}B = 64^\circ$`] } },
        ],
      },
    ],
  },
];

export interface Talent {
  id: string;
  name: string;
  handle: string;
  niche: string;
  description: string;
  longDescription: string;
  stats: { label: string; value: string }[];
}

export const talents: Talent[] = [
  {
    id: "jd_techh",
    name: "JD Tech",
    handle: "@jd_techh",
    niche: "Tech & Gadgets",
    description: "Gadget reviewer and tech enthusiast breaking down the latest in consumer technology.",
    longDescription:
      "JD Is One Of Karnataka’s Top Tech Content Creator, Known For Making Informative And Entertaining Videos In Kannada. He Covers The Latest Gadgets, Apps, Ai Tools, And Smart Tech Tips, Making It Easy For His Audience To Stay Updated And make Smarter Digital Choices.",
    stats: [
      { label: "Niche", value: "Tech & Gadgets" },
      { label: "Platform", value: "Instagram / Facebook" },
      { label: "Stage", value: "Karnataka's Top 2nd" },
    ],
  },
  {
    id: "one_type_rakshi",
    name: "Rakshith",
    handle: "@one_type_rakshi",
    niche: "Tech & Gadgets",
    description: "Fashion-forward lifestyle creator crafting authentic content that resonates.",
    longDescription:
      "Rakshith is Karnataka’s Top 1 tech and infotainment content creator, known for simplifying complex topics through engaging Kannada content. He covers the latest gadgets, apps, AI tools, and smart tech tips, helping his audience stay informed and make smarter digital decisions.",
    stats: [
      { label: "Niche", value: "Tech & Gadgets" },
      { label: "Platform", value: "Instagram / Facebook" },
      { label: "Stage", value: "Karnataka's Top 1" },
    ],
  },
  {
    id: "tech_kalki",
    name: "Tech Kalki",
    handle: "@tech_kalki",
    niche: "Tech & Gadgets",
    description: "Where cutting-edge tech meets pop culture — a creator bridging two worlds.",
    longDescription:
      "Tech Kalki is a gadget and infotainment influencer focused on trending topics, especially smartphone reviews, helping audiences stay updated with the latest in tech.",
    stats: [
      { label: "Niche", value: "Tech & Gadgets" },
      { label: "Platform", value: "Instagram / Facebook" },
      { label: "Stage", value: "Rising" },
    ],
  },
];

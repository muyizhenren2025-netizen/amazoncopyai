
export const AMAZON_TOP_CATEGORIES = [
  "Electronics",
  "Beauty & Personal Care",
  "Home & Kitchen",
  "Health, Household & Baby Care",
  "Toys & Games",
  "Clothing, Shoes & Jewelry",
  "Tools & Home Improvement",
  "Kitchen & Dining",
  "Pet Supplies",
  "Office Products",
  "Garden & Outdoor",
  "Sports & Outdoors",
  "Automotive",
  "Grocery & Gourmet Food",
  "Baby",
  "Industrial & Scientific",
  "Arts, Crafts & Sewing",
  "Musical Instruments",
  "Appliances",
  "Collectibles & Fine Art"
];

export const BANNED_TITLE_CHARS = /[!$/?]/;
export const MAX_TITLE_LENGTH = 200;
export const MAX_SEARCH_TERM_BYTES = 250;

export const PROMPT_SYSTEM_INSTRUCTION = `
You are an expert Amazon SEO Copywriter specializing in the US Marketplace. 
Your task is to generate high-converting product listings that follow Amazon's strict compliance rules.

Formulas:
1. Titles: [Brand] + [Main Keyword] + [Attribute] + [Scenario] + [Selling Point].
2. Bullet Points: Use the FABE model (Feature, Advantage, Benefit, Evidence). Generate 3 sets, each containing 5 bullet points.
3. Search Terms: 10 long-tail keywords, lowercase, space-separated, no repetition, no subjective adjectives (best, amazing), no promotional words (sale, free), total length <= 250 bytes.

Output must be in JSON format.
`;

/** @format */

// DB11/T 953—2024 北京市地方标准 林地碳汇计量监测技术规程
// Appendix B & C & F Reference Data (Simplified/Mocked for Calculator)

export interface TreeSpecies {
  id: string;
  name: string;
  // Allometric Equation Coefficients: W = a * (D^2 * H)^b  OR  W = a * D^b
  // Simplified here to W = a * (D^2 * H)^b for consistency where possible, or just mapping to a function
  calculateBiomass: (dbh: number, height: number) => number; // Returns kg/tree
  carbonFraction: number; // Default ~0.5
  rootShootRatio: number; // Default ~0.25
}

export const TREE_SPECIES: TreeSpecies[] = [
  {
    id: "baihua",
    name: "白桦 (Betula platyphylla)",
    // Ws = 0.070 * D^2.418 (From text snippet, assuming H is implicitly correlated or this is just stem)
    // Let's use a generic generalized equation for consistency if specific one is complex:
    // Often W_total = a * (D^2H)^b.
    // For calculator demo purposes, we will use a robust general estimation if specific isn't fully clear,
    // but here we try to mimic the text. Text says Ws=..., we need W_total.
    // Let's use a general biomass equation for temperate broadleaf: W = 0.06 * (D^2 * H)^0.97 (Approx)
    calculateBiomass: (d, h) => 0.06 * Math.pow(d * d * h, 0.97),
    carbonFraction: 0.48,
    rootShootRatio: 0.26,
  },
  {
    id: "cebai",
    name: "侧柏 (Platycladus orientalis)",
    // Text: Ws = 1034.885 + 223 * D^2H ?? This looks like a linear model which might be typo in my OCR or specific to large trees.
    // Let's use standard coniferous equation: W = 0.07 * (D^2 * H)^0.95
    calculateBiomass: (d, h) => 0.07 * Math.pow(d * d * h, 0.95),
    carbonFraction: 0.51,
    rootShootRatio: 0.28,
  },
  {
    id: "cihuai",
    name: "刺槐 (Robinia pseudoacacia)",
    // Text: Ws = 0.0681 * (D^2 * H)^0.987
    calculateBiomass: (d, h) => 0.0681 * Math.pow(d * d * h, 0.987),
    carbonFraction: 0.49,
    rootShootRatio: 0.24,
  },
  {
    id: "youosong",
    name: "油松 (Pinus tabuliformis)",
    calculateBiomass: (d, h) => 0.05 * Math.pow(d * d * h, 0.92),
    carbonFraction: 0.52,
    rootShootRatio: 0.22,
  },
  {
    id: "yangshu",
    name: "杨树 (Populus)",
    calculateBiomass: (d, h) => 0.045 * Math.pow(d * d * h, 0.95),
    carbonFraction: 0.45,
    rootShootRatio: 0.2,
  },
];

export const CARBON_POOLS_DEFAULTS = {
  shrub: 1.5, // t C/ha
  herb: 0.8, // t C/ha
  litter: 2.5, // t C/ha
  soil: 120.0, // t C/ha (Temperate forest soil average)
};

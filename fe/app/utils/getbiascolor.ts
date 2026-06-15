export function getBiasColor(bias: number) {
  if (bias <= 25) return "bias-low";
  if (bias <= 50) return "bias-medium";
  if (bias <= 75) return "bias-high";
  if (bias <= 100) return "bias-extreme";

  return "";
}

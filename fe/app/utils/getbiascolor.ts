export function getBiasColor(bias: number) {
  if (bias <= 25) {
    return "border-blue-500/50 text-blue-400";
  }

  if (bias <= 50) {
    return "border-cyan-500/50 text-cyan-400";
  }

  if (bias <= 75) {
    return "border-orange-500/50 text-orange-400";
  }
  if (bias <= 100) {
    return "border-red-500/50 text-red-400";
  }

  return "border-white/20 text-white";
}

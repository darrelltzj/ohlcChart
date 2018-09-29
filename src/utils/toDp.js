export default function ({ input = 0, dp = 2 } = {}) {
  return parseFloat(+input).toFixed(dp);
}

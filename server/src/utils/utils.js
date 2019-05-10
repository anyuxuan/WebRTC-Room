export function generateId(low = 10000, high = 99999) {
  return Math.floor(Math.random() * (high - low)) + low;
}

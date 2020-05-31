export function dateOut(dateIn) {
  // dateIn inbound as mongo ISO format
  return new Date(dateIn).toLocaleDateString()
}

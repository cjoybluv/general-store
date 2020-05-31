export function dateOut(dateIn) {
  // dateIn inbound as mongo ISO format
  if (dateIn) {
    return new Date(dateIn).toLocaleDateString()
  } else {
    return ''
  }
}

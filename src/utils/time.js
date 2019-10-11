export function formatTime(time) {
  const date = new Date(parseInt(time, 10) * 1000);
  let result = "";
  result += date.getFullYear();
  result += "-" + (date.getMonth() + 1);
  result += "-" + (date.getDate() + 1);
  return result;
}

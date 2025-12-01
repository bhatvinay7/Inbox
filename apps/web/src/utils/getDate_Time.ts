function formatDate(date:Date) {
  const str = date.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return str.replace(",", ""); 
}
export default formatDate

export default function formatCurrency(price: number) {
  const formatted = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "INR",
  })
    .format(price)
    .split(".")[0];

  return formatted;
}

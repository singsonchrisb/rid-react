export function currency(num) {
  let n = Number(num) || 0;
  const baseFormat = n
    .toFixed(2)
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  if (n < 0) {
    return <>({baseFormat.slice(1)})</>;
  }

  return <>{baseFormat}</>;
}

export function currencyString(num) {
  let n = Number(num) || 0;
  const baseFormat = n
    .toFixed(2)
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  if (n < 0) {
    return baseFormat.slice(1);
  }

  return baseFormat;
}

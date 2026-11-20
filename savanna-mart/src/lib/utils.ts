export const formatCurrency = (amount: number | string | { toNumber?(): number }) => {
  let value: number;
  
  if (typeof amount === "number") {
    value = amount;
  } else if (typeof amount === "string") {
    value = parseFloat(amount);
  } else if (amount && typeof amount.toNumber === "function") {
    value = amount.toNumber();
  } else {
    value = 0;
  }

  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace("RWF", "RWF ");
};

export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}
